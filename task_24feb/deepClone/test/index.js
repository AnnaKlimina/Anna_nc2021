"use strict";

QUnit.module("[deepClone] tests:", () => {
  QUnit.test("test1", function (assert) {
    let obj = {
      number: 1,
      string: "blabla",
    };

    let test1 = deepClone(obj);
    let test2 = deepClone("not object");

    assert.strictEqual(checkClone(test1, obj), true, "No object-propeties");
    assert.strictEqual(test2, "not object", "Input is primitive");

    assert.strictEqual(deepClone(null), null, "Input is null");

    assert.strictEqual(deepClone(undefined), undefined, "Input is undefined");

    assert.strictEqual(
      checkClone(deepClone([1, 2, 3]), [1, 2, 3]),
      true,
      "Input is Array"
    );

    delete obj.number;

    assert.strictEqual(
      checkClone(test1, obj),
      false,
      "delete property from object"
    );
  });

  QUnit.test("test2", function (assert) {
    class A {
      constructor() {
        this.a = 1;
      }
    }

    let obj = {
      a: new A(),
    };

    let test1 = deepClone(obj);

    assert.strictEqual(
      checkClone(test1, obj),
      true,
      "Property is class element"
    );

    obj.date = new Date();
    let test2 = deepClone(obj);
    assert.strictEqual(
      checkClone(test2, obj),
      true,
      "Property is Date element"
    );
  });

  QUnit.test("test3", function (assert) {
    let obj = {
      name: "Иван",
      func: function () {
        console.log("yes");
      },
    };
    let test1 = deepClone(obj);

    let obj2 = {
      sizes: {
        someVal: 100,
        weight: 50,
      },
    };
    let test2 = deepClone(obj2);

    assert.strictEqual(checkClone(test1, obj), true, "Property is function");
    assert.strictEqual(
      checkClone(test2, obj2),
      true,
      "Property is user object"
    );
  });

  QUnit.test("test4", function (assert) {
    let obj = {
      sizes: {
        someVal: [120, 30, { prop: 3 }],
      },
    };

    let test1 = deepClone(obj);
    assert.strictEqual(checkClone(test1, obj), true, "Property is array");
  });

  QUnit.test("test5", function (assert) {
    class A {
      constructor() {
        this.a = 1;
      }
    }

    let obj = {
      name: "Иван",
      date: new Date("2017-01-01"),
      classObj: new A(),
      func: function () {
        console.log("yes");
      },
      sizes: {
        height: [120, 30, { prop: 3 }],
        width: 50,
      },
    };

    let anotherObj = {
      obj: obj,
    };

    let test1 = deepClone(anotherObj);
    assert.strictEqual(
      checkClone(test1, anotherObj),
      true,
      "Object with primitive and object propeties"
    );
  });
});

// функция для проверки объектов

function checkClone(objA, objB) {
  if (objA == objB) return false;
  if (Object.keys(objA).length != Object.keys(objB).length) return false;
  if (objA === undefined || objB === undefined) return false;
  for (let prop in objA) {
    if (typeof objA[prop] == "object") {
      let flag = checkClone(objA[prop], objB[prop]);
      if (!flag) return false;
      continue;
    }
    if (objA[prop] !== objB[prop]) return false;
  }
  return true;
}
