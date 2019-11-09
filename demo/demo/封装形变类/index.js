// 形变类
class Transform {
    constructor(selector) {
        this.el = document.querySelector(selector);

        this._queue = [];
        this._transform = {
            rotate: '',
            translate: '',
            scale: ''
        };

        this.defaultTime = Transform.CONFIG.defaultTime;
        this.el.style.transition = `all ${0.3}s`;
    }
    translate(value, time) {
        return this._add('translate', value, time);
    }
    scale(value, time) {
        return this._add('scale', value, time);
    }
    rotate(value, time) {
        return this._add('rotate', value, time);
    }
    // add animation
    _add(type, value, time = this.defaultTime) {
        this._queue.push({ type, value, time });
        return this;
    }
    // done begin move
    done() {
        this._start();
    }
    // begin move ,one by one do the work form _queue
    _start() {
        if (!this._queue.length) return;
        // first IN ,first OUT
        setTimeout(() => {
            const info = this._queue.shift();
            this.el.style.transition = `all ${info.time / 1000}s`;
            this.el.style.transform = this._getTransform(info);

            setTimeout(() => {
                this._start();
            }, info.time);
        }, 0);
    }
    _getTransform({ type, value, time }) {
        const _tsf = this._transform;

        switch (type) {
            case 'translate':
                _tsf.translate = `translate(${value})`;
                break;
            case 'scale':
                _tsf.scale = `scale(${value})`;
                break;
            case 'rotate':
                _tsf.rotate = `rotate(${value})`;
                break;
        }
        return `${_tsf.translate}${_tsf.scale}${_tsf.rotate}`;
    }
}
Transform.CONFIG = {
    defaultTime: 1000
};
class MultiTransform extends Transform {
    multi(value, time) {
        return this._add('multi', value, time);
    }

    sleep(value) {
        return this._add('sleep', '', value);
    }
    _getTransform({ time, value, type }) {
        const _tsf = this._transform;

        switch (type) {
            case 'translate':
                _tsf.translate = `translate(${value})`;
                break;
            case 'scale':
                _tsf.scale = `scale(${value})`;
                break;
            case 'rotate':
                _tsf.rotate = `rotate(${value}deg)`;

                break;
            case 'multi':
                value.forEach(item => {
                    this._getTransform(item);
                });
            case 'sleep':
                break;
        }

        return `${_tsf.translate} ${_tsf.scale} ${_tsf.rotate}`;
    }
}

const tf = new MultiTransform('.ball');

tf.translate('100px,100px')
    .scale(1.5)
    .sleep(1000)
    .rotate(180, 5000)
    .multi([
        {
            type: 'translate',
            value: '0, 0'
        },
        {
            type: 'scale',
            value: 0.3
        }
    ])
    .done();
