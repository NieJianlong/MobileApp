const preventDoublePress = {
  lastPressTime: 1, //  上次点击时间
  reponTime: 1000, //  间隔时间
  onPress(callback) {
    let curTime = Date.now();
    if (curTime - this.lastPressTime > this.reponTime) {
      this.lastPressTime = curTime;
      this.reponTime = 1000; //  这里的时间和上面的匹配
      callback();
    }
  },
};
export default preventDoublePress;
