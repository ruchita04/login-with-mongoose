import { replaceComparisonStrings } from "../utils/utils.js";

class Abstrat {
  constructor(query, requestQuery) {
    this.query = query;
    this.requestQuery = requestQuery;
  }

  filter() {
    let queryString = JSON.stringify(this.requestQuery);
    queryString = replaceComparisonStrings(queryString);
    this.query.find(JSON.parse(queryString));
    return this;
  }

  sorting() {
    if (this.requestQuery.sort) {
      this.query = this.query.sort(this.requestQuery.sort);
    }
    return this;
  }

  fieldSet() {
    if (this.requestQuery.field) {
      this.query = this.query.select(this.requestQuery.field);
    } else {
      this.query = this.query.select("-_id");
    }
    return this;
  }

  Pagination() {
    const page = this.requestQuery.page * 1 || 1;
    const limit = this.requestQuery.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export default Abstrat;
