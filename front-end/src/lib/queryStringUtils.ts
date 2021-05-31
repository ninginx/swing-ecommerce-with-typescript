import {
  BasicQueryStringUtils,
  LocationLike,
  StringMap,
} from "@openid/appauth";

class QueryStringUtils extends BasicQueryStringUtils {
  parse = (input: LocationLike, useQuery?: boolean): StringMap =>
    this.parseQueryString(useQuery ? input.search : input.hash);
}

export default QueryStringUtils;
