/**
 * Filters out invalid query parameters (null, undefined, or empty strings) and
 * sets the valid ones on the given URLSearchParams object.
 *
 * @param  params  The URLSearchParams object to set the query parameters on.
 * @param  queryParams  A Record containing the query parameters to filter and set.
 */
export const filterAndSetParams = ({
  params,
  queryParams,
}: {
  params: URLSearchParams;
  queryParams: Record<string, any>;
}) => {
  for (const [key, value] of Object.entries(queryParams)) {
    // Ensure value is neither null, undefined, nor an empty string
    if (
      value != null &&
      (!(typeof value === "string") || value.trim() !== "")
    ) {
      params.set(key, String(value));
    } else {
      // Remove the key if the value is invalid
      params.delete(key);
    }
  }
};
