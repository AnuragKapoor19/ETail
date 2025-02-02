class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ?
            {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: 'i'
                }
            }
            : {}

        this.query = this.query.find({ ...keyword })
        return this;
    }

    filter(){
        const queryStrCopy = {...this.queryStr}

        //Removing fields from the query
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(e1 => delete queryStrCopy[e1])

        //Advance Filters for price, ratings etc
        let queryStr = JSON.stringify(queryStrCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `${match}`)

        this.query = this.query.find(JSON.parse(queryStr));
        return this
    }

    pagination(resPerPage){
        const currentPage = Number(this.queryStr.page) || 1
        const skip = resPerPage * (currentPage-1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures;