declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseInt_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseListUserVO_ = {
    code?: number;
    data?: UserVO[];
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePageComplaintVO_ = {
    code?: number;
    data?: PageComplaintVO_;
    message?: string;
  };

  type BaseResponsePageNoticeVO_ = {
    code?: number;
    data?: PageNoticeVO_;
    message?: string;
  };

  type BaseResponsePagePaymentItem_ = {
    code?: number;
    data?: PagePaymentItem_;
    message?: string;
  };

  type BaseResponsePagePaymentItemVO_ = {
    code?: number;
    data?: PagePaymentItemVO_;
    message?: string;
  };

  type BaseResponsePagePaymentRecordVO_ = {
    code?: number;
    data?: PagePaymentRecordVO_;
    message?: string;
  };

  type BaseResponsePagePost_ = {
    code?: number;
    data?: PagePost_;
    message?: string;
  };

  type BaseResponsePagePostVO_ = {
    code?: number;
    data?: PagePostVO_;
    message?: string;
  };

  type BaseResponsePageRepairsVO_ = {
    code?: number;
    data?: PageRepairsVO_;
    message?: string;
  };

  type BaseResponsePageUser_ = {
    code?: number;
    data?: PageUser_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponsePageVisitorVO_ = {
    code?: number;
    data?: PageVisitorVO_;
    message?: string;
  };

  type BaseResponsePostVO_ = {
    code?: number;
    data?: PostVO;
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUserVO_ = {
    code?: number;
    data?: UserVO;
    message?: string;
  };

  type checkUsingGETParams = {
    /** echostr */
    echostr?: string;
    /** nonce */
    nonce?: string;
    /** signature */
    signature?: string;
    /** timestamp */
    timestamp?: string;
  };

  type ComplaintAddRequest = {
    content?: string;
    imageList?: string[];
    title?: string;
  };

  type ComplaintEditRequest = {
    content?: string;
    id?: number;
    imageList?: string[];
    title?: string;
  };

  type ComplaintQueryRequest = {
    current?: number;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    title?: string;
  };

  type ComplaintUpdateRequest = {
    id?: number;
    remark?: string;
    status?: number;
  };

  type ComplaintVO = {
    content?: string;
    createTime?: string;
    id?: number;
    imageList?: string[];
    remark?: string;
    status?: number;
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getPostVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getUserByIdUsingGETParams = {
    /** id */
    id: number;
  };

  type LoginUserVO = {
    createTime?: string;
    houseNumber?: string;
    houseSize?: string;
    id?: number;
    louDong?: string;
    unitNumber?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
  };

  type NoticeAddRequest = {
    content?: string;
    title?: string;
  };

  type NoticeQueryRequest = {
    current?: number;
    id?: number;
    pageSize?: number;
    publishTime?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    title?: string;
  };

  type NoticeUpdateRequest = {
    content?: string;
    id?: number;
    title?: string;
  };

  type NoticeVO = {
    content?: string;
    createTime?: string;
    id?: number;
    publishTime?: string;
    status?: number;
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type OrderItem = {
    asc?: boolean;
    column?: string;
  };

  type PageComplaintVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: ComplaintVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageNoticeVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: NoticeVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePaymentItem_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: PaymentItem[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePaymentItemVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: PaymentItemVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePaymentRecordVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: PaymentRecordVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePost_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: Post[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PagePostVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: PostVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageRepairsVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: RepairsVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUser_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: User[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageUserVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: UserVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PageVisitorVO_ = {
    countId?: string;
    current?: number;
    maxLimit?: number;
    optimizeCountSql?: boolean;
    orders?: OrderItem[];
    pages?: number;
    records?: VisitorVO[];
    searchCount?: boolean;
    size?: number;
    total?: number;
  };

  type PaymentItem = {
    amount?: string;
    createTime?: string;
    expirationTime?: string;
    id?: number;
    isDelete?: number;
    name?: string;
    profile?: string;
    updateTime?: string;
    userId?: number;
  };

  type PaymentItemAddRequest = {
    amount?: string;
    expirationTime?: string;
    name?: string;
    profile?: string;
  };

  type PaymentItemQueryRequest = {
    amount?: string;
    current?: number;
    expirationTime?: string;
    id?: number;
    name?: string;
    pageSize?: number;
    profile?: string;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type PaymentItemUpdateRequest = {
    expirationTime?: string;
    id?: number;
    name?: string;
    profile?: string;
  };

  type PaymentItemVO = {
    amount?: string;
    createUser?: UserVO;
    expirationTime?: string;
    id?: number;
    name?: string;
    profile?: string;
    userId?: number;
  };

  type PaymentRecordAddRequest = {
    paymentId?: number;
  };

  type PaymentRecordQueryRequest = {
    current?: number;
    id?: number;
    pageSize?: number;
    payDate?: string;
    paymentName?: string;
    sortField?: string;
    sortOrder?: string;
    userName?: string;
  };

  type PaymentRecordVO = {
    createTime?: string;
    id?: number;
    payAmount?: string;
    payDate?: string;
    paymentId?: number;
    paymentName?: string;
    userId?: number;
    userName?: string;
  };

  type Post = {
    content?: string;
    createTime?: string;
    favourNum?: number;
    id?: number;
    isDelete?: number;
    tags?: string;
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    userId?: number;
  };

  type PostAddRequest = {
    content?: string;
    tags?: string[];
    title?: string;
  };

  type PostEditRequest = {
    content?: string;
    id?: number;
    tags?: string[];
    title?: string;
  };

  type PostFavourAddRequest = {
    postId?: number;
  };

  type PostFavourQueryRequest = {
    current?: number;
    pageSize?: number;
    postQueryRequest?: PostQueryRequest;
    sortField?: string;
    sortOrder?: string;
    userId?: number;
  };

  type PostQueryRequest = {
    content?: string;
    current?: number;
    favourUserId?: number;
    id?: number;
    notId?: number;
    orTags?: string[];
    pageSize?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    tags?: string[];
    title?: string;
    userId?: number;
  };

  type PostThumbAddRequest = {
    postId?: number;
  };

  type PostUpdateRequest = {
    content?: string;
    id?: number;
    tags?: string[];
    title?: string;
  };

  type PostVO = {
    content?: string;
    createTime?: string;
    favourNum?: number;
    hasFavour?: boolean;
    hasThumb?: boolean;
    id?: number;
    tagList?: string[];
    thumbNum?: number;
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type RepairsAddRequest = {
    content?: string;
    imageList?: string[];
    title?: string;
  };

  type RepairsCommentRequest = {
    comment?: string;
    id?: number;
  };

  type RepairsEditRequest = {
    content?: string;
    id?: number;
    imageList?: string[];
    remark?: string;
    title?: string;
  };

  type RepairsQueryRequest = {
    current?: number;
    id?: number;
    pageSize?: number;
    servicemanId?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    title?: string;
  };

  type RepairsUpdateRequest = {
    id?: number;
    remark?: string;
    servicemanId?: number;
    status?: number;
  };

  type RepairsVO = {
    comment?: string;
    content?: string;
    createTime?: string;
    id?: number;
    imageList?: string[];
    remark?: string;
    servicemanId?: number;
    servicemanUser?: UserVO;
    status?: number;
    title?: string;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type uploadFileUsingPOSTParams = {
    biz?: string;
  };

  type User = {
    createTime?: string;
    houseNumber?: string;
    houseSize?: string;
    id?: number;
    isDelete?: number;
    louDong?: string;
    unitNumber?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPassword?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserAddRequest = {
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userRole?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserQueryRequest = {
    current?: number;
    id?: number;
    louDong?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    unitNumber?: string;
    userAccount?: string;
    userName?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userName?: string;
    userPassword?: string;
    userPhone?: string;
  };

  type UserUpdateMyRequest = {
    houseNumber?: string;
    houseSize?: string;
    louDong?: string;
    unitNumber?: string;
    userName?: string;
    userPhone?: string;
    userProfile?: string;
  };

  type UserUpdatePasswordRequest = {
    checkPassword?: string;
    id?: number;
    newPassword?: string;
    oldPassword?: string;
  };

  type UserUpdateRequest = {
    houseNumber?: string;
    houseSize?: string;
    id?: number;
    louDong?: string;
    unitNumber?: string;
    userAvatar?: string;
    userName?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    houseNumber?: string;
    houseSize?: string;
    id?: number;
    louDong?: string;
    unitNumber?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userPhone?: string;
    userProfile?: string;
    userRole?: string;
  };

  type VisitorAddRequest = {
    remark?: string;
    visitingTime?: string;
    visitorName?: string;
    visitorPhone?: string;
  };

  type VisitorEditRequest = {
    id?: number;
    remark?: string;
    visitingTime?: string;
    visitorName?: string;
    visitorPhone?: string;
  };

  type VisitorQueryRequest = {
    current?: number;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    status?: number;
    visitingTime?: string;
    visitorName?: string;
    visitorPhone?: string;
  };

  type VisitorUpdateRequest = {
    id?: number;
    reason?: string;
    status?: number;
  };

  type VisitorVO = {
    createTime?: string;
    id?: number;
    reason?: string;
    remark?: string;
    status?: number;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
    visitingTime?: string;
    visitorName?: string;
    visitorPhone?: string;
  };
}
