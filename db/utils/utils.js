exports.formatDates = datum => {
  if(!datum.length) {
    return []
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

exports.makeRefObj = datum => {
  if(!datum.length) {
    return {}
  }
  const obj = {};
  datum.forEach(data => {
    console.log(data.topic);
    console.log(data.author_id);
    obj[data.topic] = data.author_id;
  });
  return obj;
};

exports.formatComments = (commentsData, articleRef) => {

  const formattedCommentsData = [];

  commentsData.forEach(comment => {
    const commentsCopy = { ...comment };
    commentsCopy.comment_id = articleRef[commentsCopy.]
  });
};
