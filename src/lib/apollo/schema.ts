export const typeDefs = `#graphql
  type Developer {
    id: ID!
    name: String!
    logo: String
    description: String
    entryYears: Int
    projectsCount: Int
    rating: Float
    status: DeveloperStatus
    remark: String
    createdAt: Float
    updatedAt: Float
  }

  type Query {
    developers(
      page: Int = 1
      pageSize: Int = 10
      keyword: String
      status: DeveloperStatus
    ): DeveloperConnection!
    developer(id: ID!): Developer
  }

  type Mutation {
    createDeveloper(input: CreateDeveloperInput!): Developer!
    updateDeveloper(id: ID!, input: UpdateDeveloperInput!): Developer!
    deleteDeveloper(id: ID!): Boolean!
    batchDeleteDevelopers(ids: [ID!]!): BatchDeleteResult!
  }

  type Subscription {
    developerCreated: Developer!
    developerUpdated(id: ID!): Developer!
    developerDeleted(id: ID!): ID!
  }

  input CreateDeveloperInput {
    name: String!
    logo: String
    description: String
    entryYears: Int
    projectsCount: Int
    rating: Float
    status: DeveloperStatus = active
    remark: String
  }

  input UpdateDeveloperInput {
    name: String
    logo: String
    description: String
    entryYears: Int
    projectsCount: Int
    rating: Float
    status: DeveloperStatus
    remark: String
  }

  type DeveloperConnection {
    list: [Developer!]!
    total: Int!
    page: Int!
    pageSize: Int!
    hasMore: Boolean!
  }

  type BatchDeleteResult {
    success: Boolean!
    deletedCount: Int!
  }

  enum DeveloperStatus {
    active
    inactive
  }
`;