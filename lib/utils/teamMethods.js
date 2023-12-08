const getHome = async (params) => {
  return { stats: data[0], latestIssues };
};

const getIssues = async (params, searchParams) => {
  return { issues: data, page: parseInt(page), issueCount };
};

const getCustomIssues = async (
  params,
  searchParams,
  email,
  type = "",
  status = ""
) => {
  return { issues: data, page: parseInt(page), issueCount };
};

const getMembers = async ({ teamId = "", teamType = "" }) => {
  return data;
};

const getApiKeys = async (
  { teamId = "", teamType = "" },
  { order = "ASC", orderBy = "CreatedAt" }
) => {
  return apiKeys;
};

export const getTeamData = async (teamType, teamId, email) => {
  return data;
};

export const getTabData = async (
  params = { tab: "" },
  searchParams = {},
  email = ""
) => {
  return data;
};

export const getJoinTeam = async (teamType, teamId, email) => {
  if (teamType == "teams") {
    return null;
  }
  return data;
};

export const getIssueData = async (params) => {
  const { teamId, tab, issueId } = params;

  return issue;
};
