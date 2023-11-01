// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists
import { Judgement } from "./judgement";
import { Project } from "./project";
import { Registrant } from "./registrant";
import { School } from "./school";
import { Track } from "./track";
import { User } from "./user";

import type { Lists } from ".keystone/types";


export const lists = {
  Judgement,
  Project,
  Registrant,
  School,
  Track,
  User,
} as Lists;
