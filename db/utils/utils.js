exports.formatDates = datum => {
  if (!datum.length) {
    return [];
  }
  let copiedData = JSON.parse(JSON.stringify(datum));
  //let test = new Date(datum[0].created_at).toString();

  copiedData.forEach(function(data) {
    let formattedDate = new Date(data.created_at).toJSON();
    //console.log(formattedDate, "FORMATTED DATE");

    data.created_at = formattedDate;
    //console.log(copiedData, "<<<<<COPIED DATA");
  });
  return copiedData;
};

exports.makeRefObj = data => {
  if (!data.length) {
    return {};
  }
  const obj = {};
  data.forEach(datum => {
    const title = datum.title;
    const id = datum.article_id;
    obj[title] = id;
  });
  //console.log(obj);
  return obj;
};

exports.formatComments = (commentsData, articleRef) => {
  const formattedCommentsData = [];

  commentsData.forEach(comment => {
    const commentsCopy = { ...comment };
    commentsCopy.article_id = articleRef[commentsCopy.belongs_to];

    commentsCopy.author = commentsCopy.created_by;

    let formattedDate = new Date(commentsCopy.created_at).toJSON();

    commentsCopy.created_at = formattedDate;
    delete commentsCopy.created_by;
    delete commentsCopy.belongs_to;

    formattedCommentsData.push(commentsCopy);
  });
  return formattedCommentsData;
};
