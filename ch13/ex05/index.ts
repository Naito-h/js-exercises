import { wait } from "../wait.ts";

function g1(): Promise<void> {
    return wait(1000).then(() => {
        console.log("A");
        return wait(2000);
    }).then(() => {
        console.log("B");
        return wait(3000);
    }).then(() => {
        console.log("C");
    });
}
// g1();

function g2(): Promise<void> {
    return wait(1000)
        .then(() => console.log("A"))
        .then(() => wait(2000))
        .then(() => console.log("B"))
        .then(() => wait(3000))
        .then(() => console.log("C"));
}
// g2();

function g3(): Promise<void> {
    function fetchUser(): Promise<{id: number, name: string}> {
        return Promise.resolve({id: 42, name: "John"});
    }
    function fetchUserFriends(user: {id: number, name: string}): Promise<object[]> {
        return Promise.resolve([{id: 100, name: "Sam"}, {id: 1, name: "Bob"}]);
    }

    return fetchUser().then((user) => {
        return fetchUserFriends(user).then((friends) => {
            return { user, friends };
        });
    }).then(({ user, friends }) => {
        console.log(`${user.name} has ${friends.length} friends!`);
    });
}
// g3();

function g4(): Promise<number> {
    function someFunction() {
        return 42;
    }

    return Promise.resolve(someFunction());
}

g4().then((num) => {
    console.log(num);
});
