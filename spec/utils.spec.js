const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");

describe("formatDates", () => {
  it("returns an empty array when passed an empty object", () => {
    const data = [];
    const actual = formatDates(data);
    expect(actual).to.eql([]);
  });

  it("reformats the timestamp value to a stringified date, for one object in the array", () => {
    const data = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];
    const actual = formatDates(data);
    const expected = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: "2018-11-15T12:21:54.171Z",
        votes: 100
      }
    ];
    expect(actual).to.eql(expected);
  });

  it("reformats the date to a stringified date, for multiple arrays", () => {
    const data = [
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171
      },
      {
        title: "Student SUES Mitch!",
        topic: "mitch",
        author: "rogersop",
        body:
          "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
        created_at: 1163852514171
      },
      {
        title: "UNCOVERED: catspiracy to bring down democracy",
        topic: "cats",
        author: "rogersop",
        body: "Bastet walks amongst us, and the cats are taking arms!",
        created_at: 1037708514171
      }
    ];
    const actual = formatDates(data);
    const expected = [
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: "2010-11-17T12:21:54.171Z"
      },
      {
        title: "Student SUES Mitch!",
        topic: "mitch",
        author: "rogersop",
        body:
          "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
        created_at: "2006-11-18T12:21:54.171Z"
      },
      {
        title: "UNCOVERED: catspiracy to bring down democracy",
        topic: "cats",
        author: "rogersop",
        body: "Bastet walks amongst us, and the cats are taking arms!",
        created_at: "2002-11-19T12:21:54.171Z"
      }
    ];
    expect(actual).to.eql(expected);
  });
  it("does not mutate the original data", () => {
    const data = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];
    expect(formatDates(data)).to.not.equal(data);
    expect(data).to.eql([
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ]);
  });
});

// test for mutated data!!!!!

describe("makeRefObj", () => {
  it("returns an empty object when passed an empty array", () => {
    const data = [];
    expect(makeRefObj(data).to.eql({}));
  });
  it("returns the reference object with the key value pairs for one topic", () => {
    const data = [
      {
        author_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];
    const actual = makeRefObj(data);
    const expected = { mitch: 1 };
    expect(actual).to.eql(expected);
  });
  it("returns a reference object when passed multiple objects in the array", () => {
    const data = [
      {
        author_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      },
      {
        author_id: 2,
        title: "UNCOVERED: catspiracy to bring down democracy",
        topic: "cats",
        author: "rogersop",
        body: "Bastet walks amongst us, and the cats are taking arms!",
        created_at: 1037708514171
      }
    ];
    const actual = makeRefObj(data);
    const expected = { mitch: 1, cats: 2 };
    expect(actual).to.eql(expected);
  });
  it("does not mutate the original data", () => {
    const data = [
      {
        author_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ];
    expect(data).to.eql([
      {
        author_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      }
    ]);
  });
});

describe("formatComments", () => {
  it("returns and empty array when given an empty array of comments", () => {
    expect(formatComments([]).to.eql([]));
  });
  it.only("when given one object in the array, it will format 'created_by' to use 'author_id' instead", () => {
    const commentsData = [
      {
        comment_id: 1,
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      }
    ];
    const articleRef = { Mitch: 1 };
    const keyToAdd = "author_id";
    const keyToDelete = "comment_id";
    const expected = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
        author_id: 1
      }
    ];
    const actual = formatComments(
      commentsData,
      articleRef,
      keyToAdd,
      keyToDelete
    );
    expect(actual).to.eql(expected);
  });
  it("does not mutate the original data", () => {
    const input = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
        author_id: 1
      }
    ];
    const inputCopy = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
        author_id: 1
      }
    ];
    expect(input).to.eql(inputCopy);
  });
});
