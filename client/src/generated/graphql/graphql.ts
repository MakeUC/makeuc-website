/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type AuthenticatedItem = User;

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BooleanFilter>;
};

export type CachedStatistic = {
  __typename?: 'CachedStatistic';
  id: Scalars['ID']['output'];
  linkToAllProjects?: Maybe<Scalars['String']['output']>;
  numberOfProject?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type CachedStatisticCreateInput = {
  linkToAllProjects?: InputMaybe<Scalars['String']['input']>;
  numberOfProject?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type CachedStatisticOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  linkToAllProjects?: InputMaybe<OrderDirection>;
  numberOfProject?: InputMaybe<OrderDirection>;
  year?: InputMaybe<OrderDirection>;
};

export type CachedStatisticUpdateArgs = {
  data: CachedStatisticUpdateInput;
  where: CachedStatisticWhereUniqueInput;
};

export type CachedStatisticUpdateInput = {
  linkToAllProjects?: InputMaybe<Scalars['String']['input']>;
  numberOfProject?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type CachedStatisticWhereInput = {
  AND?: InputMaybe<Array<CachedStatisticWhereInput>>;
  NOT?: InputMaybe<Array<CachedStatisticWhereInput>>;
  OR?: InputMaybe<Array<CachedStatisticWhereInput>>;
  id?: InputMaybe<IdFilter>;
  linkToAllProjects?: InputMaybe<StringFilter>;
  numberOfProject?: InputMaybe<IntFilter>;
  year?: InputMaybe<IntFilter>;
};

export type CachedStatisticWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateInitialUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type FileFieldInput = {
  upload: Scalars['Upload']['input'];
};

export type FileFieldOutput = {
  __typename?: 'FileFieldOutput';
  filename: Scalars['String']['output'];
  filesize: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export type IdFilter = {
  equals?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  not?: InputMaybe<IdFilter>;
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type KeystoneAdminMeta = {
  __typename?: 'KeystoneAdminMeta';
  list?: Maybe<KeystoneAdminUiListMeta>;
  lists: Array<KeystoneAdminUiListMeta>;
};


export type KeystoneAdminMetaListArgs = {
  key: Scalars['String']['input'];
};

export type KeystoneAdminUiFieldGroupMeta = {
  __typename?: 'KeystoneAdminUIFieldGroupMeta';
  description?: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  label: Scalars['String']['output'];
};

export type KeystoneAdminUiFieldMeta = {
  __typename?: 'KeystoneAdminUIFieldMeta';
  createView: KeystoneAdminUiFieldMetaCreateView;
  customViewsIndex?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  fieldMeta?: Maybe<Scalars['JSON']['output']>;
  isFilterable: Scalars['Boolean']['output'];
  isNonNull?: Maybe<Array<KeystoneAdminUiFieldMetaIsNonNull>>;
  isOrderable: Scalars['Boolean']['output'];
  itemView?: Maybe<KeystoneAdminUiFieldMetaItemView>;
  label: Scalars['String']['output'];
  listView: KeystoneAdminUiFieldMetaListView;
  path: Scalars['String']['output'];
  search?: Maybe<QueryMode>;
  viewsIndex: Scalars['Int']['output'];
};


export type KeystoneAdminUiFieldMetaItemViewArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type KeystoneAdminUiFieldMetaCreateView = {
  __typename?: 'KeystoneAdminUIFieldMetaCreateView';
  fieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaCreateViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden'
}

export enum KeystoneAdminUiFieldMetaIsNonNull {
  Create = 'create',
  Read = 'read',
  Update = 'update'
}

export type KeystoneAdminUiFieldMetaItemView = {
  __typename?: 'KeystoneAdminUIFieldMetaItemView';
  fieldMode?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldMode>;
  fieldPosition?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldPosition>;
};

export enum KeystoneAdminUiFieldMetaItemViewFieldMode {
  Edit = 'edit',
  Hidden = 'hidden',
  Read = 'read'
}

export enum KeystoneAdminUiFieldMetaItemViewFieldPosition {
  Form = 'form',
  Sidebar = 'sidebar'
}

export type KeystoneAdminUiFieldMetaListView = {
  __typename?: 'KeystoneAdminUIFieldMetaListView';
  fieldMode: KeystoneAdminUiFieldMetaListViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaListViewFieldMode {
  Hidden = 'hidden',
  Read = 'read'
}

export type KeystoneAdminUiListMeta = {
  __typename?: 'KeystoneAdminUIListMeta';
  description?: Maybe<Scalars['String']['output']>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  groups: Array<KeystoneAdminUiFieldGroupMeta>;
  hideCreate: Scalars['Boolean']['output'];
  hideDelete: Scalars['Boolean']['output'];
  initialColumns: Array<Scalars['String']['output']>;
  initialSort?: Maybe<KeystoneAdminUiSort>;
  isHidden: Scalars['Boolean']['output'];
  isSingleton: Scalars['Boolean']['output'];
  itemQueryName: Scalars['String']['output'];
  key: Scalars['String']['output'];
  label: Scalars['String']['output'];
  labelField: Scalars['String']['output'];
  listQueryName: Scalars['String']['output'];
  pageSize: Scalars['Int']['output'];
  path: Scalars['String']['output'];
  plural: Scalars['String']['output'];
  singular: Scalars['String']['output'];
};

export type KeystoneAdminUiSort = {
  __typename?: 'KeystoneAdminUISort';
  direction: KeystoneAdminUiSortDirection;
  field: Scalars['String']['output'];
};

export enum KeystoneAdminUiSortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type KeystoneMeta = {
  __typename?: 'KeystoneMeta';
  adminMeta: KeystoneAdminMeta;
};

export type Mutation = {
  __typename?: 'Mutation';
  authenticateUserWithPassword?: Maybe<UserAuthenticationWithPasswordResult>;
  createCachedStatistic?: Maybe<CachedStatistic>;
  createCachedStatistics?: Maybe<Array<Maybe<CachedStatistic>>>;
  createInitialUser: UserAuthenticationWithPasswordSuccess;
  createRegistrant?: Maybe<Registrant>;
  createRegistrants?: Maybe<Array<Maybe<Registrant>>>;
  createSchool?: Maybe<School>;
  createSchools?: Maybe<Array<Maybe<School>>>;
  createUser?: Maybe<User>;
  createUsers?: Maybe<Array<Maybe<User>>>;
  deleteCachedStatistic?: Maybe<CachedStatistic>;
  deleteCachedStatistics?: Maybe<Array<Maybe<CachedStatistic>>>;
  deleteRegistrant?: Maybe<Registrant>;
  deleteRegistrants?: Maybe<Array<Maybe<Registrant>>>;
  deleteSchool?: Maybe<School>;
  deleteSchools?: Maybe<Array<Maybe<School>>>;
  deleteUser?: Maybe<User>;
  deleteUsers?: Maybe<Array<Maybe<User>>>;
  endSession: Scalars['Boolean']['output'];
  seedSchoolIndiaData?: Maybe<Scalars['Boolean']['output']>;
  updateCachedStatistic?: Maybe<CachedStatistic>;
  updateCachedStatistics?: Maybe<Array<Maybe<CachedStatistic>>>;
  updateRegistrant?: Maybe<Registrant>;
  updateRegistrants?: Maybe<Array<Maybe<Registrant>>>;
  updateSchool?: Maybe<School>;
  updateSchools?: Maybe<Array<Maybe<School>>>;
  updateUser?: Maybe<User>;
  updateUsers?: Maybe<Array<Maybe<User>>>;
  verifyRegistrant?: Maybe<Registrant>;
};


export type MutationAuthenticateUserWithPasswordArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCreateCachedStatisticArgs = {
  data: CachedStatisticCreateInput;
};


export type MutationCreateCachedStatisticsArgs = {
  data: Array<CachedStatisticCreateInput>;
};


export type MutationCreateInitialUserArgs = {
  data: CreateInitialUserInput;
};


export type MutationCreateRegistrantArgs = {
  data: RegistrantCreateInput;
};


export type MutationCreateRegistrantsArgs = {
  data: Array<RegistrantCreateInput>;
};


export type MutationCreateSchoolArgs = {
  data: SchoolCreateInput;
};


export type MutationCreateSchoolsArgs = {
  data: Array<SchoolCreateInput>;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateUsersArgs = {
  data: Array<UserCreateInput>;
};


export type MutationDeleteCachedStatisticArgs = {
  where: CachedStatisticWhereUniqueInput;
};


export type MutationDeleteCachedStatisticsArgs = {
  where: Array<CachedStatisticWhereUniqueInput>;
};


export type MutationDeleteRegistrantArgs = {
  where: RegistrantWhereUniqueInput;
};


export type MutationDeleteRegistrantsArgs = {
  where: Array<RegistrantWhereUniqueInput>;
};


export type MutationDeleteSchoolArgs = {
  where: SchoolWhereUniqueInput;
};


export type MutationDeleteSchoolsArgs = {
  where: Array<SchoolWhereUniqueInput>;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteUsersArgs = {
  where: Array<UserWhereUniqueInput>;
};


export type MutationUpdateCachedStatisticArgs = {
  data: CachedStatisticUpdateInput;
  where: CachedStatisticWhereUniqueInput;
};


export type MutationUpdateCachedStatisticsArgs = {
  data: Array<CachedStatisticUpdateArgs>;
};


export type MutationUpdateRegistrantArgs = {
  data: RegistrantUpdateInput;
  where: RegistrantWhereUniqueInput;
};


export type MutationUpdateRegistrantsArgs = {
  data: Array<RegistrantUpdateArgs>;
};


export type MutationUpdateSchoolArgs = {
  data: SchoolUpdateInput;
  where: SchoolWhereUniqueInput;
};


export type MutationUpdateSchoolsArgs = {
  data: Array<SchoolUpdateArgs>;
};


export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};


export type MutationUpdateUsersArgs = {
  data: Array<UserUpdateArgs>;
};


export type MutationVerifyRegistrantArgs = {
  id: Scalars['ID']['input'];
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type PasswordState = {
  __typename?: 'PasswordState';
  isSet: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  authenticatedItem?: Maybe<AuthenticatedItem>;
  cachedStatistic?: Maybe<CachedStatistic>;
  cachedStatistics?: Maybe<Array<CachedStatistic>>;
  cachedStatisticsCount?: Maybe<Scalars['Int']['output']>;
  keystone: KeystoneMeta;
  registrant?: Maybe<Registrant>;
  registrants?: Maybe<Array<Registrant>>;
  registrantsCount?: Maybe<Scalars['Int']['output']>;
  school?: Maybe<School>;
  schools?: Maybe<Array<School>>;
  schoolsCount?: Maybe<Scalars['Int']['output']>;
  statistics?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']['output']>;
};


export type QueryCachedStatisticArgs = {
  where: CachedStatisticWhereUniqueInput;
};


export type QueryCachedStatisticsArgs = {
  cursor?: InputMaybe<CachedStatisticWhereUniqueInput>;
  orderBy?: Array<CachedStatisticOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: CachedStatisticWhereInput;
};


export type QueryCachedStatisticsCountArgs = {
  where?: CachedStatisticWhereInput;
};


export type QueryRegistrantArgs = {
  where: RegistrantWhereUniqueInput;
};


export type QueryRegistrantsArgs = {
  cursor?: InputMaybe<RegistrantWhereUniqueInput>;
  orderBy?: Array<RegistrantOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: RegistrantWhereInput;
};


export type QueryRegistrantsCountArgs = {
  where?: RegistrantWhereInput;
};


export type QuerySchoolArgs = {
  where: SchoolWhereUniqueInput;
};


export type QuerySchoolsArgs = {
  cursor?: InputMaybe<SchoolWhereUniqueInput>;
  orderBy?: Array<SchoolOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: SchoolWhereInput;
};


export type QuerySchoolsCountArgs = {
  where?: SchoolWhereInput;
};


export type QueryStatisticsArgs = {
  year: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
  where?: UserWhereInput;
};


export type QueryUsersCountArgs = {
  where?: UserWhereInput;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type Registrant = {
  __typename?: 'Registrant';
  age?: Maybe<Scalars['Int']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  degree?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  emailRegistrationYearCompoundKey?: Maybe<Scalars['String']['output']>;
  ethnicity?: Maybe<Scalars['String']['output']>;
  expectedGraduationYear?: Maybe<Scalars['Int']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  hackathonsAttended?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  major?: Maybe<Scalars['String']['output']>;
  mlhCodeOfConductAgreement?: Maybe<Scalars['Boolean']['output']>;
  mlhEmailAgreement?: Maybe<Scalars['Boolean']['output']>;
  mlhPrivacyPolicyAgreement?: Maybe<Scalars['Boolean']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  registrationYear?: Maybe<Scalars['Int']['output']>;
  resume?: Maybe<FileFieldOutput>;
  school?: Maybe<School>;
  verified?: Maybe<Scalars['Boolean']['output']>;
};

export type RegistrantCreateInput = {
  age?: InputMaybe<Scalars['Int']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  degree?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  ethnicity?: InputMaybe<Scalars['String']['input']>;
  expectedGraduationYear?: InputMaybe<Scalars['Int']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  hackathonsAttended?: InputMaybe<Scalars['Int']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  major?: InputMaybe<Scalars['String']['input']>;
  mlhCodeOfConductAgreement?: InputMaybe<Scalars['Boolean']['input']>;
  mlhEmailAgreement?: InputMaybe<Scalars['Boolean']['input']>;
  mlhPrivacyPolicyAgreement?: InputMaybe<Scalars['Boolean']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  resume?: InputMaybe<FileFieldInput>;
  school?: InputMaybe<SchoolRelateToOneForCreateInput>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RegistrantOrderByInput = {
  age?: InputMaybe<OrderDirection>;
  country?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  degree?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  emailRegistrationYearCompoundKey?: InputMaybe<OrderDirection>;
  ethnicity?: InputMaybe<OrderDirection>;
  expectedGraduationYear?: InputMaybe<OrderDirection>;
  firstName?: InputMaybe<OrderDirection>;
  gender?: InputMaybe<OrderDirection>;
  hackathonsAttended?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  lastName?: InputMaybe<OrderDirection>;
  major?: InputMaybe<OrderDirection>;
  mlhCodeOfConductAgreement?: InputMaybe<OrderDirection>;
  mlhEmailAgreement?: InputMaybe<OrderDirection>;
  mlhPrivacyPolicyAgreement?: InputMaybe<OrderDirection>;
  notes?: InputMaybe<OrderDirection>;
  registrationYear?: InputMaybe<OrderDirection>;
  verified?: InputMaybe<OrderDirection>;
};

export type RegistrantUpdateArgs = {
  data: RegistrantUpdateInput;
  where: RegistrantWhereUniqueInput;
};

export type RegistrantUpdateInput = {
  age?: InputMaybe<Scalars['Int']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  degree?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  ethnicity?: InputMaybe<Scalars['String']['input']>;
  expectedGraduationYear?: InputMaybe<Scalars['Int']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  hackathonsAttended?: InputMaybe<Scalars['Int']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  major?: InputMaybe<Scalars['String']['input']>;
  mlhCodeOfConductAgreement?: InputMaybe<Scalars['Boolean']['input']>;
  mlhEmailAgreement?: InputMaybe<Scalars['Boolean']['input']>;
  mlhPrivacyPolicyAgreement?: InputMaybe<Scalars['Boolean']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  resume?: InputMaybe<FileFieldInput>;
  school?: InputMaybe<SchoolRelateToOneForUpdateInput>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RegistrantWhereInput = {
  AND?: InputMaybe<Array<RegistrantWhereInput>>;
  NOT?: InputMaybe<Array<RegistrantWhereInput>>;
  OR?: InputMaybe<Array<RegistrantWhereInput>>;
  age?: InputMaybe<IntFilter>;
  country?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  degree?: InputMaybe<StringFilter>;
  email?: InputMaybe<StringFilter>;
  emailRegistrationYearCompoundKey?: InputMaybe<StringFilter>;
  ethnicity?: InputMaybe<StringFilter>;
  expectedGraduationYear?: InputMaybe<IntFilter>;
  firstName?: InputMaybe<StringFilter>;
  gender?: InputMaybe<StringFilter>;
  hackathonsAttended?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<IdFilter>;
  lastName?: InputMaybe<StringFilter>;
  major?: InputMaybe<StringFilter>;
  mlhCodeOfConductAgreement?: InputMaybe<BooleanFilter>;
  mlhEmailAgreement?: InputMaybe<BooleanFilter>;
  mlhPrivacyPolicyAgreement?: InputMaybe<BooleanFilter>;
  notes?: InputMaybe<StringFilter>;
  registrationYear?: InputMaybe<IntNullableFilter>;
  school?: InputMaybe<SchoolWhereInput>;
  verified?: InputMaybe<BooleanFilter>;
};

export type RegistrantWhereUniqueInput = {
  emailRegistrationYearCompoundKey?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type School = {
  __typename?: 'School';
  alias?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  county?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
};

export type SchoolCreateInput = {
  alias?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  county?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type SchoolOrderByInput = {
  alias?: InputMaybe<OrderDirection>;
  city?: InputMaybe<OrderDirection>;
  country?: InputMaybe<OrderDirection>;
  county?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  state?: InputMaybe<OrderDirection>;
};

export type SchoolRelateToOneForCreateInput = {
  connect?: InputMaybe<SchoolWhereUniqueInput>;
  create?: InputMaybe<SchoolCreateInput>;
};

export type SchoolRelateToOneForUpdateInput = {
  connect?: InputMaybe<SchoolWhereUniqueInput>;
  create?: InputMaybe<SchoolCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SchoolUpdateArgs = {
  data: SchoolUpdateInput;
  where: SchoolWhereUniqueInput;
};

export type SchoolUpdateInput = {
  alias?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  county?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type SchoolWhereInput = {
  AND?: InputMaybe<Array<SchoolWhereInput>>;
  NOT?: InputMaybe<Array<SchoolWhereInput>>;
  OR?: InputMaybe<Array<SchoolWhereInput>>;
  alias?: InputMaybe<StringFilter>;
  city?: InputMaybe<StringFilter>;
  country?: InputMaybe<StringFilter>;
  county?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  state?: InputMaybe<StringFilter>;
};

export type SchoolWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<PasswordState>;
};

export type UserAuthenticationWithPasswordFailure = {
  __typename?: 'UserAuthenticationWithPasswordFailure';
  message: Scalars['String']['output'];
};

export type UserAuthenticationWithPasswordResult = UserAuthenticationWithPasswordFailure | UserAuthenticationWithPasswordSuccess;

export type UserAuthenticationWithPasswordSuccess = {
  __typename?: 'UserAuthenticationWithPasswordSuccess';
  item: User;
  sessionToken: Scalars['String']['output'];
};

export type UserCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type UserOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type UserUpdateArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type GetStatisticsQueryVariables = Exact<{
  year: Scalars['Int']['input'];
}>;


export type GetStatisticsQuery = { __typename?: 'Query', statistics?: string | null, cachedStatistics?: Array<{ __typename?: 'CachedStatistic', numberOfProject?: number | null, linkToAllProjects?: string | null }> | null };


export const GetStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}]},{"kind":"Field","name":{"kind":"Name","value":"cachedStatistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"year"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"equals"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"numberOfProject"}},{"kind":"Field","name":{"kind":"Name","value":"linkToAllProjects"}}]}}]}}]} as unknown as DocumentNode<GetStatisticsQuery, GetStatisticsQueryVariables>;