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
  ID: { input: string; output: string; }
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

export type BooleanFilter = {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  not?: InputMaybe<BooleanFilter>;
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

export type FloatFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<FloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
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

export type Judgement = {
  __typename?: 'Judgement';
  applicableTracks?: Maybe<Array<Track>>;
  applicableTracksCount?: Maybe<Scalars['Int']['output']>;
  conceptCaliber?: Maybe<Scalars['Int']['output']>;
  demonstrationAbility?: Maybe<Scalars['Int']['output']>;
  disqualifiedBy?: Maybe<User>;
  disqualifyReason?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  implementationAttempt?: Maybe<Scalars['Int']['output']>;
  judge?: Maybe<User>;
  judgeProjectCompoundKey?: Maybe<Scalars['String']['output']>;
  overallScore?: Maybe<Scalars['Float']['output']>;
  presentationProfessionalism?: Maybe<Scalars['Int']['output']>;
  project?: Maybe<Project>;
};


export type JudgementApplicableTracksArgs = {
  cursor?: InputMaybe<TrackWhereUniqueInput>;
  orderBy?: Array<TrackOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TrackWhereInput;
};


export type JudgementApplicableTracksCountArgs = {
  where?: TrackWhereInput;
};

export type JudgementCreateInput = {
  applicableTracks?: InputMaybe<TrackRelateToManyForCreateInput>;
  conceptCaliber?: InputMaybe<Scalars['Int']['input']>;
  demonstrationAbility?: InputMaybe<Scalars['Int']['input']>;
  disqualifiedBy?: InputMaybe<UserRelateToOneForCreateInput>;
  disqualifyReason?: InputMaybe<Scalars['String']['input']>;
  implementationAttempt?: InputMaybe<Scalars['Int']['input']>;
  judge?: InputMaybe<UserRelateToOneForCreateInput>;
  overallScore?: InputMaybe<Scalars['Float']['input']>;
  presentationProfessionalism?: InputMaybe<Scalars['Int']['input']>;
  project?: InputMaybe<ProjectRelateToOneForCreateInput>;
};

export type JudgementManyRelationFilter = {
  every?: InputMaybe<JudgementWhereInput>;
  none?: InputMaybe<JudgementWhereInput>;
  some?: InputMaybe<JudgementWhereInput>;
};

export type JudgementOrderByInput = {
  conceptCaliber?: InputMaybe<OrderDirection>;
  demonstrationAbility?: InputMaybe<OrderDirection>;
  disqualifyReason?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  implementationAttempt?: InputMaybe<OrderDirection>;
  judgeProjectCompoundKey?: InputMaybe<OrderDirection>;
  overallScore?: InputMaybe<OrderDirection>;
  presentationProfessionalism?: InputMaybe<OrderDirection>;
};

export type JudgementRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<JudgementWhereUniqueInput>>;
  create?: InputMaybe<Array<JudgementCreateInput>>;
};

export type JudgementRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<JudgementWhereUniqueInput>>;
  create?: InputMaybe<Array<JudgementCreateInput>>;
  disconnect?: InputMaybe<Array<JudgementWhereUniqueInput>>;
  set?: InputMaybe<Array<JudgementWhereUniqueInput>>;
};

export type JudgementUpdateArgs = {
  data: JudgementUpdateInput;
  where: JudgementWhereUniqueInput;
};

export type JudgementUpdateInput = {
  applicableTracks?: InputMaybe<TrackRelateToManyForUpdateInput>;
  conceptCaliber?: InputMaybe<Scalars['Int']['input']>;
  demonstrationAbility?: InputMaybe<Scalars['Int']['input']>;
  disqualifiedBy?: InputMaybe<UserRelateToOneForUpdateInput>;
  disqualifyReason?: InputMaybe<Scalars['String']['input']>;
  implementationAttempt?: InputMaybe<Scalars['Int']['input']>;
  judge?: InputMaybe<UserRelateToOneForUpdateInput>;
  overallScore?: InputMaybe<Scalars['Float']['input']>;
  presentationProfessionalism?: InputMaybe<Scalars['Int']['input']>;
  project?: InputMaybe<ProjectRelateToOneForUpdateInput>;
};

export type JudgementWhereInput = {
  AND?: InputMaybe<Array<JudgementWhereInput>>;
  NOT?: InputMaybe<Array<JudgementWhereInput>>;
  OR?: InputMaybe<Array<JudgementWhereInput>>;
  applicableTracks?: InputMaybe<TrackManyRelationFilter>;
  conceptCaliber?: InputMaybe<IntFilter>;
  demonstrationAbility?: InputMaybe<IntFilter>;
  disqualifiedBy?: InputMaybe<UserWhereInput>;
  disqualifyReason?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  implementationAttempt?: InputMaybe<IntFilter>;
  judge?: InputMaybe<UserWhereInput>;
  judgeProjectCompoundKey?: InputMaybe<StringFilter>;
  overallScore?: InputMaybe<FloatFilter>;
  presentationProfessionalism?: InputMaybe<IntFilter>;
  project?: InputMaybe<ProjectWhereInput>;
};

export type JudgementWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  judgeProjectCompoundKey?: InputMaybe<Scalars['String']['input']>;
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
  createJudgement?: Maybe<Judgement>;
  createJudgements?: Maybe<Array<Maybe<Judgement>>>;
  createPassportStrategyStorage?: Maybe<PassportStrategyStorage>;
  createPassportStrategyStorages?: Maybe<Array<Maybe<PassportStrategyStorage>>>;
  createProject?: Maybe<Project>;
  createProjects?: Maybe<Array<Maybe<Project>>>;
  createRegistrant?: Maybe<Registrant>;
  createRegistrants?: Maybe<Array<Maybe<Registrant>>>;
  createSchool?: Maybe<School>;
  createSchools?: Maybe<Array<Maybe<School>>>;
  createTrack?: Maybe<Track>;
  createTracks?: Maybe<Array<Maybe<Track>>>;
  createUser?: Maybe<User>;
  createUsers?: Maybe<Array<Maybe<User>>>;
  deleteJudgement?: Maybe<Judgement>;
  deleteJudgements?: Maybe<Array<Maybe<Judgement>>>;
  deletePassportStrategyStorage?: Maybe<PassportStrategyStorage>;
  deletePassportStrategyStorages?: Maybe<Array<Maybe<PassportStrategyStorage>>>;
  deleteProject?: Maybe<Project>;
  deleteProjects?: Maybe<Array<Maybe<Project>>>;
  deleteRegistrant?: Maybe<Registrant>;
  deleteRegistrants?: Maybe<Array<Maybe<Registrant>>>;
  deleteSchool?: Maybe<School>;
  deleteSchools?: Maybe<Array<Maybe<School>>>;
  deleteTrack?: Maybe<Track>;
  deleteTracks?: Maybe<Array<Maybe<Track>>>;
  deleteUser?: Maybe<User>;
  deleteUsers?: Maybe<Array<Maybe<User>>>;
  disqualifyProject?: Maybe<Judgement>;
  endSession: Scalars['Boolean']['output'];
  massSendRegistrantEmail: Array<Maybe<Scalars['String']['output']>>;
  resendVerificationEmails?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  seedSchoolIndiaData?: Maybe<Scalars['Boolean']['output']>;
  updateJudgement?: Maybe<Judgement>;
  updateJudgements?: Maybe<Array<Maybe<Judgement>>>;
  updatePassportStrategyStorage?: Maybe<PassportStrategyStorage>;
  updatePassportStrategyStorages?: Maybe<Array<Maybe<PassportStrategyStorage>>>;
  updateProject?: Maybe<Project>;
  updateProjects?: Maybe<Array<Maybe<Project>>>;
  updateRegistrant?: Maybe<Registrant>;
  updateRegistrants?: Maybe<Array<Maybe<Registrant>>>;
  updateSchool?: Maybe<School>;
  updateSchools?: Maybe<Array<Maybe<School>>>;
  updateTrack?: Maybe<Track>;
  updateTracks?: Maybe<Array<Maybe<Track>>>;
  updateUser?: Maybe<User>;
  updateUsers?: Maybe<Array<Maybe<User>>>;
  verifyRegistrant?: Maybe<Registrant>;
};


export type MutationCreateJudgementArgs = {
  data: JudgementCreateInput;
};


export type MutationCreateJudgementsArgs = {
  data: Array<JudgementCreateInput>;
};


export type MutationCreatePassportStrategyStorageArgs = {
  data: PassportStrategyStorageCreateInput;
};


export type MutationCreatePassportStrategyStoragesArgs = {
  data: Array<PassportStrategyStorageCreateInput>;
};


export type MutationCreateProjectArgs = {
  data: ProjectCreateInput;
};


export type MutationCreateProjectsArgs = {
  data: Array<ProjectCreateInput>;
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


export type MutationCreateTrackArgs = {
  data: TrackCreateInput;
};


export type MutationCreateTracksArgs = {
  data: Array<TrackCreateInput>;
};


export type MutationCreateUserArgs = {
  data: UserCreateInput;
};


export type MutationCreateUsersArgs = {
  data: Array<UserCreateInput>;
};


export type MutationDeleteJudgementArgs = {
  where: JudgementWhereUniqueInput;
};


export type MutationDeleteJudgementsArgs = {
  where: Array<JudgementWhereUniqueInput>;
};


export type MutationDeletePassportStrategyStorageArgs = {
  where: PassportStrategyStorageWhereUniqueInput;
};


export type MutationDeletePassportStrategyStoragesArgs = {
  where: Array<PassportStrategyStorageWhereUniqueInput>;
};


export type MutationDeleteProjectArgs = {
  where: ProjectWhereUniqueInput;
};


export type MutationDeleteProjectsArgs = {
  where: Array<ProjectWhereUniqueInput>;
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


export type MutationDeleteTrackArgs = {
  where: TrackWhereUniqueInput;
};


export type MutationDeleteTracksArgs = {
  where: Array<TrackWhereUniqueInput>;
};


export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};


export type MutationDeleteUsersArgs = {
  where: Array<UserWhereUniqueInput>;
};


export type MutationDisqualifyProjectArgs = {
  projectId?: InputMaybe<Scalars['ID']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
};


export type MutationMassSendRegistrantEmailArgs = {
  sendGridId: Scalars['String']['input'];
  where?: InputMaybe<RegistrantWhereInput>;
};


export type MutationUpdateJudgementArgs = {
  data: JudgementUpdateInput;
  where: JudgementWhereUniqueInput;
};


export type MutationUpdateJudgementsArgs = {
  data: Array<JudgementUpdateArgs>;
};


export type MutationUpdatePassportStrategyStorageArgs = {
  data: PassportStrategyStorageUpdateInput;
  where: PassportStrategyStorageWhereUniqueInput;
};


export type MutationUpdatePassportStrategyStoragesArgs = {
  data: Array<PassportStrategyStorageUpdateArgs>;
};


export type MutationUpdateProjectArgs = {
  data: ProjectUpdateInput;
  where: ProjectWhereUniqueInput;
};


export type MutationUpdateProjectsArgs = {
  data: Array<ProjectUpdateArgs>;
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


export type MutationUpdateTrackArgs = {
  data: TrackUpdateInput;
  where: TrackWhereUniqueInput;
};


export type MutationUpdateTracksArgs = {
  data: Array<TrackUpdateArgs>;
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

export type PassportStrategyStorage = {
  __typename?: 'PassportStrategyStorage';
  data?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  strategyName?: Maybe<PassportStrategyStorageStrategyNameType>;
  strategyNameDataCompoundKey?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type PassportStrategyStorageCreateInput = {
  data?: InputMaybe<Scalars['String']['input']>;
  strategyName?: InputMaybe<PassportStrategyStorageStrategyNameType>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type PassportStrategyStorageOrderByInput = {
  data?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  strategyName?: InputMaybe<OrderDirection>;
  strategyNameDataCompoundKey?: InputMaybe<OrderDirection>;
};

export enum PassportStrategyStorageStrategyNameType {
  Google = 'google'
}

export type PassportStrategyStorageStrategyNameTypeNullableFilter = {
  equals?: InputMaybe<PassportStrategyStorageStrategyNameType>;
  in?: InputMaybe<Array<PassportStrategyStorageStrategyNameType>>;
  not?: InputMaybe<PassportStrategyStorageStrategyNameTypeNullableFilter>;
  notIn?: InputMaybe<Array<PassportStrategyStorageStrategyNameType>>;
};

export type PassportStrategyStorageUpdateArgs = {
  data: PassportStrategyStorageUpdateInput;
  where: PassportStrategyStorageWhereUniqueInput;
};

export type PassportStrategyStorageUpdateInput = {
  data?: InputMaybe<Scalars['String']['input']>;
  strategyName?: InputMaybe<PassportStrategyStorageStrategyNameType>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type PassportStrategyStorageWhereInput = {
  AND?: InputMaybe<Array<PassportStrategyStorageWhereInput>>;
  NOT?: InputMaybe<Array<PassportStrategyStorageWhereInput>>;
  OR?: InputMaybe<Array<PassportStrategyStorageWhereInput>>;
  data?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  strategyName?: InputMaybe<PassportStrategyStorageStrategyNameTypeNullableFilter>;
  strategyNameDataCompoundKey?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type PassportStrategyStorageWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  strategyNameDataCompoundKey?: InputMaybe<Scalars['String']['input']>;
};

export type Project = {
  __typename?: 'Project';
  countJudgements?: Maybe<Scalars['Int']['output']>;
  disqualified?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  judgements?: Maybe<Array<Judgement>>;
  judgementsCount?: Maybe<Scalars['Int']['output']>;
  judgingGroup?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  score?: Maybe<Scalars['Float']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};


export type ProjectJudgementsArgs = {
  cursor?: InputMaybe<JudgementWhereUniqueInput>;
  orderBy?: Array<JudgementOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: JudgementWhereInput;
};


export type ProjectJudgementsCountArgs = {
  where?: JudgementWhereInput;
};

export type ProjectCreateInput = {
  judgingGroup?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type ProjectOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  judgingGroup?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  url?: InputMaybe<OrderDirection>;
  year?: InputMaybe<OrderDirection>;
};

export type ProjectRelateToOneForCreateInput = {
  connect?: InputMaybe<ProjectWhereUniqueInput>;
  create?: InputMaybe<ProjectCreateInput>;
};

export type ProjectRelateToOneForUpdateInput = {
  connect?: InputMaybe<ProjectWhereUniqueInput>;
  create?: InputMaybe<ProjectCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProjectUpdateArgs = {
  data: ProjectUpdateInput;
  where: ProjectWhereUniqueInput;
};

export type ProjectUpdateInput = {
  judgingGroup?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type ProjectWhereInput = {
  AND?: InputMaybe<Array<ProjectWhereInput>>;
  NOT?: InputMaybe<Array<ProjectWhereInput>>;
  OR?: InputMaybe<Array<ProjectWhereInput>>;
  id?: InputMaybe<IdFilter>;
  judgements?: InputMaybe<JudgementManyRelationFilter>;
  judgingGroup?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  url?: InputMaybe<StringFilter>;
  year?: InputMaybe<IntFilter>;
};

export type ProjectWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  judgement?: Maybe<Judgement>;
  judgements?: Maybe<Array<Judgement>>;
  judgementsCount?: Maybe<Scalars['Int']['output']>;
  keystone: KeystoneMeta;
  passportStrategyStorage?: Maybe<PassportStrategyStorage>;
  passportStrategyStorages?: Maybe<Array<PassportStrategyStorage>>;
  passportStrategyStoragesCount?: Maybe<Scalars['Int']['output']>;
  project?: Maybe<Project>;
  projects?: Maybe<Array<Project>>;
  projectsCount?: Maybe<Scalars['Int']['output']>;
  registrant?: Maybe<Registrant>;
  registrants?: Maybe<Array<Registrant>>;
  registrantsCount?: Maybe<Scalars['Int']['output']>;
  school?: Maybe<School>;
  schools?: Maybe<Array<School>>;
  schoolsCount?: Maybe<Scalars['Int']['output']>;
  statistics?: Maybe<Scalars['String']['output']>;
  track?: Maybe<Track>;
  tracks?: Maybe<Array<Track>>;
  tracksCount?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<User>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars['Int']['output']>;
};


export type QueryJudgementArgs = {
  where: JudgementWhereUniqueInput;
};


export type QueryJudgementsArgs = {
  cursor?: InputMaybe<JudgementWhereUniqueInput>;
  orderBy?: Array<JudgementOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: JudgementWhereInput;
};


export type QueryJudgementsCountArgs = {
  where?: JudgementWhereInput;
};


export type QueryPassportStrategyStorageArgs = {
  where: PassportStrategyStorageWhereUniqueInput;
};


export type QueryPassportStrategyStoragesArgs = {
  cursor?: InputMaybe<PassportStrategyStorageWhereUniqueInput>;
  orderBy?: Array<PassportStrategyStorageOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: PassportStrategyStorageWhereInput;
};


export type QueryPassportStrategyStoragesCountArgs = {
  where?: PassportStrategyStorageWhereInput;
};


export type QueryProjectArgs = {
  where: ProjectWhereUniqueInput;
};


export type QueryProjectsArgs = {
  cursor?: InputMaybe<ProjectWhereUniqueInput>;
  orderBy?: Array<ProjectOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: ProjectWhereInput;
};


export type QueryProjectsCountArgs = {
  where?: ProjectWhereInput;
};


export type QueryRegistrantArgs = {
  where: RegistrantWhereUniqueInput;
};


export type QueryRegistrantsArgs = {
  cursor?: InputMaybe<RegistrantWhereUniqueInput>;
  orderBy?: Array<RegistrantOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
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


export type QueryTrackArgs = {
  where: TrackWhereUniqueInput;
};


export type QueryTracksArgs = {
  cursor?: InputMaybe<TrackWhereUniqueInput>;
  orderBy?: Array<TrackOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: TrackWhereInput;
};


export type QueryTracksCountArgs = {
  where?: TrackWhereInput;
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
  acceptPhotoRelease?: Maybe<Scalars['Boolean']['output']>;
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
  invitedInPerson?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  major?: Maybe<Scalars['String']['output']>;
  mlhCodeOfConductAgreement?: Maybe<Scalars['Boolean']['output']>;
  mlhEmailAgreement?: Maybe<Scalars['Boolean']['output']>;
  mlhPrivacyPolicyAgreement?: Maybe<Scalars['Boolean']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  registrationYear?: Maybe<Scalars['Int']['output']>;
  resume?: Maybe<FileFieldOutput>;
  school?: Maybe<School>;
  user?: Maybe<User>;
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
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type RegistrantManyRelationFilter = {
  every?: InputMaybe<RegistrantWhereInput>;
  none?: InputMaybe<RegistrantWhereInput>;
  some?: InputMaybe<RegistrantWhereInput>;
};

export type RegistrantOrderByInput = {
  acceptPhotoRelease?: InputMaybe<OrderDirection>;
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
  invitedInPerson?: InputMaybe<OrderDirection>;
  lastName?: InputMaybe<OrderDirection>;
  major?: InputMaybe<OrderDirection>;
  mlhCodeOfConductAgreement?: InputMaybe<OrderDirection>;
  mlhEmailAgreement?: InputMaybe<OrderDirection>;
  mlhPrivacyPolicyAgreement?: InputMaybe<OrderDirection>;
  notes?: InputMaybe<OrderDirection>;
  registrationYear?: InputMaybe<OrderDirection>;
  verified?: InputMaybe<OrderDirection>;
};

export type RegistrantRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<RegistrantWhereUniqueInput>>;
  create?: InputMaybe<Array<RegistrantCreateInput>>;
};

export type RegistrantRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<RegistrantWhereUniqueInput>>;
  create?: InputMaybe<Array<RegistrantCreateInput>>;
  disconnect?: InputMaybe<Array<RegistrantWhereUniqueInput>>;
  set?: InputMaybe<Array<RegistrantWhereUniqueInput>>;
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
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type RegistrantWhereInput = {
  AND?: InputMaybe<Array<RegistrantWhereInput>>;
  NOT?: InputMaybe<Array<RegistrantWhereInput>>;
  OR?: InputMaybe<Array<RegistrantWhereInput>>;
  acceptPhotoRelease?: InputMaybe<BooleanFilter>;
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
  invitedInPerson?: InputMaybe<BooleanFilter>;
  lastName?: InputMaybe<StringFilter>;
  major?: InputMaybe<StringFilter>;
  mlhCodeOfConductAgreement?: InputMaybe<BooleanFilter>;
  mlhEmailAgreement?: InputMaybe<BooleanFilter>;
  mlhPrivacyPolicyAgreement?: InputMaybe<BooleanFilter>;
  notes?: InputMaybe<StringFilter>;
  registrationYear?: InputMaybe<IntNullableFilter>;
  school?: InputMaybe<SchoolWhereInput>;
  user?: InputMaybe<UserWhereInput>;
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

export type Track = {
  __typename?: 'Track';
  id: Scalars['ID']['output'];
  judgements?: Maybe<Array<Judgement>>;
  judgementsCount?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};


export type TrackJudgementsArgs = {
  cursor?: InputMaybe<JudgementWhereUniqueInput>;
  orderBy?: Array<JudgementOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: JudgementWhereInput;
};


export type TrackJudgementsCountArgs = {
  where?: JudgementWhereInput;
};

export type TrackCreateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type TrackManyRelationFilter = {
  every?: InputMaybe<TrackWhereInput>;
  none?: InputMaybe<TrackWhereInput>;
  some?: InputMaybe<TrackWhereInput>;
};

export type TrackOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type TrackRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<TrackWhereUniqueInput>>;
  create?: InputMaybe<Array<TrackCreateInput>>;
};

export type TrackRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<TrackWhereUniqueInput>>;
  create?: InputMaybe<Array<TrackCreateInput>>;
  disconnect?: InputMaybe<Array<TrackWhereUniqueInput>>;
  set?: InputMaybe<Array<TrackWhereUniqueInput>>;
};

export type TrackUpdateArgs = {
  data: TrackUpdateInput;
  where: TrackWhereUniqueInput;
};

export type TrackUpdateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type TrackWhereInput = {
  AND?: InputMaybe<Array<TrackWhereInput>>;
  NOT?: InputMaybe<Array<TrackWhereInput>>;
  OR?: InputMaybe<Array<TrackWhereInput>>;
  id?: InputMaybe<IdFilter>;
  judgements?: InputMaybe<JudgementManyRelationFilter>;
  name?: InputMaybe<StringFilter>;
};

export type TrackWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  judgements?: Maybe<Array<Judgement>>;
  judgementsCount?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  registrations?: Maybe<Array<Registrant>>;
  registrationsCount?: Maybe<Scalars['Int']['output']>;
  roles?: Maybe<Array<UserRoleType>>;
};


export type UserJudgementsArgs = {
  cursor?: InputMaybe<JudgementWhereUniqueInput>;
  orderBy?: Array<JudgementOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: JudgementWhereInput;
};


export type UserJudgementsCountArgs = {
  where?: JudgementWhereInput;
};


export type UserRegistrationsArgs = {
  cursor?: InputMaybe<RegistrantWhereUniqueInput>;
  orderBy?: Array<RegistrantOrderByInput>;
  skip?: Scalars['Int']['input'];
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: RegistrantWhereInput;
};


export type UserRegistrationsCountArgs = {
  where?: RegistrantWhereInput;
};

export type UserCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  judgements?: InputMaybe<JudgementRelateToManyForCreateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  registrations?: InputMaybe<RegistrantRelateToManyForCreateInput>;
  roles?: InputMaybe<Array<UserRoleType>>;
};

export type UserOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type UserRelateToOneForCreateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
};

export type UserRelateToOneForUpdateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
  disconnect?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum UserRoleType {
  Admin = 'admin',
  Default = 'default',
  Judge = 'judge',
  Organizer = 'organizer'
}

export type UserUpdateArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  judgements?: InputMaybe<JudgementRelateToManyForUpdateInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  registrations?: InputMaybe<RegistrantRelateToManyForUpdateInput>;
  roles?: InputMaybe<Array<UserRoleType>>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  judgements?: InputMaybe<JudgementManyRelationFilter>;
  name?: InputMaybe<StringFilter>;
  registrations?: InputMaybe<RegistrantManyRelationFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type CreateRegistrantMutationVariables = Exact<{
  data: RegistrantCreateInput;
}>;


export type CreateRegistrantMutation = { __typename?: 'Mutation', createRegistrant?: { __typename?: 'Registrant', id: string } | null };

export type VerifyRegistrantMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type VerifyRegistrantMutation = { __typename?: 'Mutation', verifyRegistrant?: { __typename?: 'Registrant', id: string } | null };

export type GetSchoolsQueryVariables = Exact<{
  where: SchoolWhereInput;
  orderBy: Array<SchoolOrderByInput> | SchoolOrderByInput;
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
}>;


export type GetSchoolsQuery = { __typename?: 'Query', schools?: Array<{ __typename?: 'School', id: string, name?: string | null }> | null };


export const CreateRegistrantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRegistrant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegistrantCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRegistrant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateRegistrantMutation, CreateRegistrantMutationVariables>;
export const VerifyRegistrantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyRegistrant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyRegistrant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<VerifyRegistrantMutation, VerifyRegistrantMutationVariables>;
export const GetSchoolsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSchools"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SchoolWhereInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SchoolOrderByInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"schools"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetSchoolsQuery, GetSchoolsQueryVariables>;