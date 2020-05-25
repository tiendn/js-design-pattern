/**
 * This is a pattern of Javascript
 * Publisher and Subscriber
 * @description Pass value transparent in some modules without coupling
 * @author neit
 */

const MyPubSub = () => {
  const subscribers = {};

  /**
   *
   * @param {string} channel: Channel name
   * @param {function} callback: Callback function
   * @returns Callback unsubscribe event
   */
  const subscribe = (channel, callback) => {
    if (!Array.isArray(subscribers[channel])) {
      subscribers[channel] = [];
    }
    subscribers[channel].push(callback);
    const index = subscribers[channel].length - 1;

    return () => {
      subscribers[channel].splice(index, 1);
    };
  };

  /**
   *
   * @param {string} channel
   * @param {any} data
   */
  const publish = (channel, data) => {
    if (!Array.isArray(subscribers[channel])) return;
    subscribers[channel].forEach((s) => s(data));
  };

  return {
    subscribe,
    publish,
  };
};

// TEST
const pushMessage = (message) => {
  console.log(message);
};

const ps = MyPubSub();

ps.subscribe('me', pushMessage);
ps.publish('me', 'Hello World');
