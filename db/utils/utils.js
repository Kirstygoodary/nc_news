exports.formatDates = datum => {
  if (!datum.length) {
    return [];
  }
  let copiedData = JSON.parse(JSON.stringify(datum));

  copiedData.forEach(function(data) {
    let formattedDate = new Date(data.created_at).toJSON();

    data.created_at = formattedDate;
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
