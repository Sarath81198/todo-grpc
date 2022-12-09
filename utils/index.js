function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function wait(milliseconds) {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};

const utils = { getRandomInt, wait }

module.exports = utils