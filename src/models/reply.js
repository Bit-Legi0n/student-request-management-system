class Reply{

    constructor(id ,req_id ,user_id ,datetime,body, attachment){
        this.id = id;
        this.req_id = req_id;
        this.user_id = user_id;
        this.datetime = datetime;
        this.body = body;
        this.attachment = attachment;
    }
}

export default Reply;
