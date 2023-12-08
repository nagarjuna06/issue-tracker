export const setSearchParams = (searchParams, orderBy) => {
  const order =
    searchParams?.order == "DESC" && searchParams?.orderBy == orderBy
      ? "ASC"
      : "DESC";
  return {
    ...searchParams,
    orderBy,
    order,
  };
};

export const isCurrentSearch = (searchParams, orderBy) => {
  return searchParams?.order == "DESC" && searchParams?.orderBy == orderBy;
};
