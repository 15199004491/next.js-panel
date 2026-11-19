import { gql } from '@apollo/client';

export const GET_DEVELOPERS = gql`
  query GetDevelopers($page: Int!, $pageSize: Int!, $keyword: String, $status: DeveloperStatus) {
    developers(page: $page, pageSize: $pageSize, keyword: $keyword, status: $status) {
      list {
        id
        name
        logo
        description
        entryYears
        projectsCount
        rating
        status
        remark
        createdAt
        updatedAt
      }
      total
      page
      pageSize
      hasMore
    }
  }
`;

export const GET_DEVELOPER = gql`
  query GetDeveloper($id: ID!) {
    developer(id: $id) {
      id
      name
      logo
      description
      entryYears
      projectsCount
      rating
      status
      remark
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_DEVELOPER = gql`
  mutation CreateDeveloper($input: CreateDeveloperInput!) {
    createDeveloper(input: $input) {
      id
      name
      logo
      description
      entryYears
      projectsCount
      rating
      status
      remark
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_DEVELOPER = gql`
  mutation UpdateDeveloper($id: ID!, $input: UpdateDeveloperInput!) {
    updateDeveloper(id: $id, input: $input) {
      id
      name
      logo
      description
      entryYears
      projectsCount
      rating
      status
      remark
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_DEVELOPER = gql`
  mutation DeleteDeveloper($id: ID!) {
    deleteDeveloper(id: $id)
  }
`;

export const BATCH_DELETE_DEVELOPERS = gql`
  mutation BatchDeleteDevelopers($ids: [ID!]!) {
    batchDeleteDevelopers(ids: $ids) {
      success
      deletedCount
    }
  }
`;