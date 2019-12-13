let navigation = [
  {
    id: 1,
    subitems: [
      {
        id: 2,
        subitems: [
          { id: 3, subitems: [], parent: 2 },
          {
            id: 4,
            subitems: [],
            parent: 2,
          },
        ],
        parent: 1,
      },
    ],
  },
  {
    id: 5,
    subitems: [],
  },
];
navigation = flatten(navigation);

function find(item, level = 0) {
  if (!item.parent) {
    return level;
  }
  return find(
    navigation.filter((parentItem) => parentItem.id === item.parent)[0],
    (level += 1),
  );
}

function flatten(arr) {
  return [].concat(
    ...arr.map((item) => [].concat(item, ...flatten(item.subitems))),
  );
}

navigation.forEach((item) => {
  item.level = find(item);
});

console.log(navigation);
