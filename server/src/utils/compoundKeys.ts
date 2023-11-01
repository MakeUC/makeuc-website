import { text } from "@keystone-6/core/fields";
import { camelCase } from "lodash";
import { z } from "zod";

import type { ListConfig } from "@keystone-6/core";
import type { BaseListTypeInfo } from "@keystone-6/core/types";


const connectRelationshipSchema = z.object({
  connect: z.object({
    id: z.string(),
  }),
});

function prepareValueForKey(value: unknown): string {
  if (typeof value !== "object" && typeof value !== "function" && typeof value !== "undefined") return value.toString();
  if (typeof value === "undefined") return "";

  const connectRelationshipParsed = connectRelationshipSchema.safeParse(value);
  if (connectRelationshipParsed.success) return connectRelationshipParsed.data.connect.id;

  throw new Error(`Unable to prepare value for compound key: ${value}`);
}

type NonNullableResolveInput<Config extends ListConfig<BaseListTypeInfo>> = Config & {
  hooks: NonNullable<Config["hooks"]> & {
    resolveInput: NonNullable<NonNullable<Config["hooks"]>["resolveInput"]>
  };
};

type AddCompoundKeyToConfig<Config extends ListConfig<BaseListTypeInfo>> = NonNullableResolveInput<Config>;

export function addCompoundKey<Config extends ListConfig<BaseListTypeInfo>>(
  listConfig: Config,
  fieldNames: (keyof Config["fields"])[],
): AddCompoundKeyToConfig<Config> {
  const fieldName = camelCase(`${fieldNames.join(" ")} CompoundKey`);

  let newListConfig = { ...listConfig };
  newListConfig.fields[fieldName] = text({
    isIndexed: "unique",
    ui: {
      createView: { fieldMode: "hidden" },
      itemView: { fieldMode: "hidden" },
      listView: { fieldMode: "hidden" },
    },
    graphql: { omit: { create: true, update: true } },
  });

  let hooks = newListConfig.hooks ?? {};
  const oldResolveInput = hooks.resolveInput;
  hooks.resolveInput = async args => {
    let resolvedData = args.resolvedData;

    // Process Existing Hooks
    if (typeof oldResolveInput !== "function") {
      if (args.operation === "create" && oldResolveInput?.create)
        resolvedData = await oldResolveInput.create({ ...args, resolvedData });
      else if (args.operation === "update" && oldResolveInput?.update)
        resolvedData = await oldResolveInput.update({ ...args, resolvedData });
    } else if (oldResolveInput) {
      resolvedData = await oldResolveInput({ ...args, resolvedData });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolvedData[fieldName] = fieldNames.map(field => prepareValueForKey((resolvedData as any)[field] || (args.item as any)?.[field])).join("-");

    return resolvedData;
  };

  newListConfig.hooks = hooks;

  return newListConfig as AddCompoundKeyToConfig<Config>;
}