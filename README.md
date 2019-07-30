### lock scrolling Element when you open a popup

### usage
```javascript
import ScrollLocker from './lib/index.js';

const locker = new ScrollLocker();

// lock scrolling Element
locker.lock();
// release scrolling Element
locker.release();
```

### 解决滚动穿透问题
代码来自[有赞UI库](https://github.com/youzan/vant/blob/dev/src/mixins/popup/index.js)
