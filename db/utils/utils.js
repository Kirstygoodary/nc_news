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
    // console.log(data.topic);
    // console.log(data.author_id);
    obj[datum.title] = datum.author_id;
  });
  return obj;
};

exports.formatComments = (commentsData, articleRef) => {
  const formattedCommentsData = [];

  commentsData.forEach(comment => {
    const commentsCopy = { ...comment };

    commentsCopy.author = commentsCopy.created_by;

    for (let key in articleRef) {
      commentsCopy.article_id = articleRef[key];
    }
    let formattedDate = new Date(commentsCopy.created_at).toJSON();

    commentsCopy.created_at = formattedDate;
    delete commentsCopy.created_by;
    delete commentsCopy.belongs_to;

    formattedCommentsData.push(commentsCopy);
  });
  return formattedCommentsData;
};
