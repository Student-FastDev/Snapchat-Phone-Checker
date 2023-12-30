"use strict";
(() => {
    var Ae = Object.create;
    var q = Object.defineProperty;
    var Fe = Object.getOwnPropertyDescriptor;
    var Oe = Object.getOwnPropertyNames;
    var He = Object.getPrototypeOf,
        qe = Object.prototype.hasOwnProperty;
    var je = (e, t, n) => t in e ? q(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: n
    }) : e[t] = n;
    var Q = (e, t) => () => (t || e((t = {
        exports: {}
    }).exports, t), t.exports);
    var Ne = (e, t, n, o) => {
        if (t && typeof t == "object" || typeof t == "function")
            for (let r of Oe(t)) !qe.call(e, r) && r !== n && q(e, r, {
                get: () => t[r],
                enumerable: !(o = Fe(t, r)) || o.enumerable
            });
        return e
    };
    var G = (e, t, n) => (n = e != null ? Ae(He(e)) : {}, Ne(t || !e || !e.__esModule ? q(n, "default", {
        value: e,
        enumerable: !0
    }) : n, e));
    var h = (e, t, n) => (je(e, typeof t != "symbol" ? t + "" : t, n), n);
    var se = Q((bt, j) => {
        "use strict";
        var w = typeof Reflect == "object" ? Reflect : null,
            J = w && typeof w.apply == "function" ? w.apply : function(t, n, o) {
                return Function.prototype.apply.call(t, n, o)
            },
            I;
        w && typeof w.ownKeys == "function" ? I = w.ownKeys : Object.getOwnPropertySymbols ? I = function(t) {
            return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))
        } : I = function(t) {
            return Object.getOwnPropertyNames(t)
        };

        function Ue(e) {
            console && console.warn && console.warn(e)
        }
        var Y = Number.isNaN || function(t) {
            return t !== t
        };

        function c() {
            c.init.call(this)
        }
        j.exports = c;
        j.exports.once = ze;
        c.EventEmitter = c;
        c.prototype._events = void 0;
        c.prototype._eventsCount = 0;
        c.prototype._maxListeners = void 0;
        var X = 10;

        function E(e) {
            if (typeof e != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e)
        }
        Object.defineProperty(c, "defaultMaxListeners", {
            enumerable: !0,
            get: function() {
                return X
            },
            set: function(e) {
                if (typeof e != "number" || e < 0 || Y(e)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
                X = e
            }
        });
        c.init = function() {
            (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
        };
        c.prototype.setMaxListeners = function(t) {
            if (typeof t != "number" || t < 0 || Y(t)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + t + ".");
            return this._maxListeners = t, this
        };

        function Z(e) {
            return e._maxListeners === void 0 ? c.defaultMaxListeners : e._maxListeners
        }
        c.prototype.getMaxListeners = function() {
            return Z(this)
        };
        c.prototype.emit = function(t) {
            for (var n = [], o = 1; o < arguments.length; o++) n.push(arguments[o]);
            var r = t === "error",
                a = this._events;
            if (a !== void 0) r = r && a.error === void 0;
            else if (!r) return !1;
            if (r) {
                var s;
                if (n.length > 0 && (s = n[0]), s instanceof Error) throw s;
                var i = new Error("Unhandled error." + (s ? " (" + s.message + ")" : ""));
                throw i.context = s, i
            }
            var f = a[t];
            if (f === void 0) return !1;
            if (typeof f == "function") J(f, this, n);
            else
                for (var p = f.length, C = re(f, p), o = 0; o < p; ++o) J(C[o], this, n);
            return !0
        };

        function ee(e, t, n, o) {
            var r, a, s;
            if (E(n), a = e._events, a === void 0 ? (a = e._events = Object.create(null), e._eventsCount = 0) : (a.newListener !== void 0 && (e.emit("newListener", t, n.listener ? n.listener : n), a = e._events), s = a[t]), s === void 0) s = a[t] = n, ++e._eventsCount;
            else if (typeof s == "function" ? s = a[t] = o ? [n, s] : [s, n] : o ? s.unshift(n) : s.push(n), r = Z(e), r > 0 && s.length > r && !s.warned) {
                s.warned = !0;
                var i = new Error("Possible EventEmitter memory leak detected. " + s.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
                i.name = "MaxListenersExceededWarning", i.emitter = e, i.type = t, i.count = s.length, Ue(i)
            }
            return e
        }
        c.prototype.addListener = function(t, n) {
            return ee(this, t, n, !1)
        };
        c.prototype.on = c.prototype.addListener;
        c.prototype.prependListener = function(t, n) {
            return ee(this, t, n, !0)
        };

        function Ke() {
            if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
        }

        function te(e, t, n) {
            var o = {
                    fired: !1,
                    wrapFn: void 0,
                    target: e,
                    type: t,
                    listener: n
                },
                r = Ke.bind(o);
            return r.listener = n, o.wrapFn = r, r
        }
        c.prototype.once = function(t, n) {
            return E(n), this.on(t, te(this, t, n)), this
        };
        c.prototype.prependOnceListener = function(t, n) {
            return E(n), this.prependListener(t, te(this, t, n)), this
        };
        c.prototype.removeListener = function(t, n) {
            var o, r, a, s, i;
            if (E(n), r = this._events, r === void 0) return this;
            if (o = r[t], o === void 0) return this;
            if (o === n || o.listener === n) --this._eventsCount === 0 ? this._events = Object.create(null) : (delete r[t], r.removeListener && this.emit("removeListener", t, o.listener || n));
            else if (typeof o != "function") {
                for (a = -1, s = o.length - 1; s >= 0; s--)
                    if (o[s] === n || o[s].listener === n) {
                        i = o[s].listener, a = s;
                        break
                    } if (a < 0) return this;
                a === 0 ? o.shift() : $e(o, a), o.length === 1 && (r[t] = o[0]), r.removeListener !== void 0 && this.emit("removeListener", t, i || n)
            }
            return this
        };
        c.prototype.off = c.prototype.removeListener;
        c.prototype.removeAllListeners = function(t) {
            var n, o, r;
            if (o = this._events, o === void 0) return this;
            if (o.removeListener === void 0) return arguments.length === 0 ? (this._events = Object.create(null), this._eventsCount = 0) : o[t] !== void 0 && (--this._eventsCount === 0 ? this._events = Object.create(null) : delete o[t]), this;
            if (arguments.length === 0) {
                var a = Object.keys(o),
                    s;
                for (r = 0; r < a.length; ++r) s = a[r], s !== "removeListener" && this.removeAllListeners(s);
                return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
            }
            if (n = o[t], typeof n == "function") this.removeListener(t, n);
            else if (n !== void 0)
                for (r = n.length - 1; r >= 0; r--) this.removeListener(t, n[r]);
            return this
        };

        function ne(e, t, n) {
            var o = e._events;
            if (o === void 0) return [];
            var r = o[t];
            return r === void 0 ? [] : typeof r == "function" ? n ? [r.listener || r] : [r] : n ? Ve(r) : re(r, r.length)
        }
        c.prototype.listeners = function(t) {
            return ne(this, t, !0)
        };
        c.prototype.rawListeners = function(t) {
            return ne(this, t, !1)
        };
        c.listenerCount = function(e, t) {
            return typeof e.listenerCount == "function" ? e.listenerCount(t) : oe.call(e, t)
        };
        c.prototype.listenerCount = oe;

        function oe(e) {
            var t = this._events;
            if (t !== void 0) {
                var n = t[e];
                if (typeof n == "function") return 1;
                if (n !== void 0) return n.length
            }
            return 0
        }
        c.prototype.eventNames = function() {
            return this._eventsCount > 0 ? I(this._events) : []
        };

        function re(e, t) {
            for (var n = new Array(t), o = 0; o < t; ++o) n[o] = e[o];
            return n
        }

        function $e(e, t) {
            for (; t + 1 < e.length; t++) e[t] = e[t + 1];
            e.pop()
        }

        function Ve(e) {
            for (var t = new Array(e.length), n = 0; n < t.length; ++n) t[n] = e[n].listener || e[n];
            return t
        }

        function ze(e, t) {
            return new Promise(function(n, o) {
                function r(s) {
                    e.removeListener(t, a), o(s)
                }

                function a() {
                    typeof e.removeListener == "function" && e.removeListener("error", r), n([].slice.call(arguments))
                }
                ae(e, t, a, {
                    once: !0
                }), t !== "error" && Qe(e, r, {
                    once: !0
                })
            })
        }

        function Qe(e, t, n) {
            typeof e.on == "function" && ae(e, "error", t, n)
        }

        function ae(e, t, n, o) {
            if (typeof e.on == "function") o.once ? e.once(t, n) : e.on(t, n);
            else if (typeof e.addEventListener == "function") e.addEventListener(t, function r(a) {
                o.once && e.removeEventListener(t, r), n(a)
            });
            else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e)
        }
    });
    var de = Q((Lt, d) => {
        d.exports.boot = function(e) {
            return e
        };
        d.exports.ssrMiddleware = function(e) {
            return e
        };
        d.exports.configure = function(e) {
            return e
        };
        d.exports.preFetch = function(e) {
            return e
        };
        d.exports.route = function(e) {
            return e
        };
        d.exports.store = function(e) {
            return e
        };
        d.exports.bexBackground = function(e) {
            return e
        };
        d.exports.bexContent = function(e) {
            return e
        };
        d.exports.bexDom = function(e) {
            return e
        };
        d.exports.ssrProductionExport = function(e) {
            return e
        };
        d.exports.ssrCreate = function(e) {
            return e
        };
        d.exports.ssrListen = function(e) {
            return e
        };
        d.exports.ssrClose = function(e) {
            return e
        };
        d.exports.ssrServeStaticContent = function(e) {
            return e
        };
        d.exports.ssrRenderPreloadTag = function(e) {
            return e
        }
    });
    var le = G(se());
    var N, R = 0,
        l = new Array(256);
    for (let e = 0; e < 256; e++) l[e] = (e + 256).toString(16).substring(1);
    var Ge = (() => {
            let e = typeof crypto != "undefined" ? crypto : typeof window != "undefined" ? window.crypto || window.msCrypto : void 0;
            if (e !== void 0) {
                if (e.randomBytes !== void 0) return e.randomBytes;
                if (e.getRandomValues !== void 0) return t => {
                    let n = new Uint8Array(t);
                    return e.getRandomValues(n), n
                }
            }
            return t => {
                let n = [];
                for (let o = t; o > 0; o--) n.push(Math.floor(Math.random() * 256));
                return n
            }
        })(),
        ie = 4096;

    function ce() {
        (N === void 0 || R + 16 > ie) && (R = 0, N = Ge(ie));
        let e = Array.prototype.slice.call(N, R, R += 16);
        return e[6] = e[6] & 15 | 64, e[8] = e[8] & 63 | 128, l[e[0]] + l[e[1]] + l[e[2]] + l[e[3]] + "-" + l[e[4]] + l[e[5]] + "-" + l[e[6]] + l[e[7]] + "-" + l[e[8]] + l[e[9]] + "-" + l[e[10]] + l[e[11]] + l[e[12]] + l[e[13]] + l[e[14]] + l[e[15]]
    }
    var Je = {
            undefined: () => 0,
            boolean: () => 4,
            number: () => 8,
            string: e => 2 * e.length,
            object: e => e ? Object.keys(e).reduce((t, n) => U(n) + U(e[n]) + t, 0) : 0
        },
        U = e => Je[typeof e](e),
        L = class extends le.EventEmitter {
            constructor(t) {
                super(), this.setMaxListeners(1 / 0), this.wall = t, t.listen(n => {
                    Array.isArray(n) ? n.forEach(o => this._emit(o)) : this._emit(n)
                }), this._sendingQueue = [], this._sending = !1, this._maxMessageSize = 32 * 1024 * 1024
            }
            send(t, n) {
                return this._send([{
                    event: t,
                    payload: n
                }])
            }
            getEvents() {
                return this._events
            }
            on(t, n) {
                return super.on(t, o => {
                    n({
                        ...o,
                        respond: r => this.send(o.eventResponseKey, r)
                    })
                })
            }
            _emit(t) {
                typeof t == "string" ? this.emit(t) : this.emit(t.event, t.payload)
            }
            _send(t) {
                return this._sendingQueue.push(t), this._nextSend()
            }
            _nextSend() {
                if (!this._sendingQueue.length || this._sending) return Promise.resolve();
                this._sending = !0;
                let t = this._sendingQueue.shift(),
                    n = t[0],
                    o = `${n.event}.${ce()}`,
                    r = o + ".result";
                return new Promise((a, s) => {
                    let i = [],
                        f = p => {
                            if (p !== void 0 && p._chunkSplit) {
                                let C = p._chunkSplit;
                                i = [...i, ...p.data], C.lastChunk && (this.off(r, f), a(i))
                            } else this.off(r, f), a(p)
                        };
                    this.on(r, f);
                    try {
                        let p = t.map(C => ({
                            ...C,
                            payload: {
                                data: C.payload,
                                eventResponseKey: r
                            }
                        }));
                        this.wall.send(p)
                    } catch (p) {
                        let C = "Message length exceeded maximum allowed length.";
                        if (p.message === C && Array.isArray(n.payload)) {
                            let T = U(n);
                            if (T > this._maxMessageSize) {
                                let b = Math.ceil(T / this._maxMessageSize),
                                    v = Math.ceil(n.payload.length / b),
                                    O = n.payload;
                                for (let k = 0; k < b; k++) {
                                    let H = Math.min(O.length, v);
                                    this.wall.send([{
                                        event: n.event,
                                        payload: {
                                            _chunkSplit: {
                                                count: b,
                                                lastChunk: k === b - 1
                                            },
                                            data: O.splice(0, H)
                                        }
                                    }])
                                }
                            }
                        }
                    }
                    this._sending = !1, setTimeout(() => this._nextSend(), 16)
                })
            }
        };
    var pe = (e, t) => {
        window.addEventListener("message", n => {
            if (n.source === window && n.data.from !== void 0 && n.data.from === t) {
                let o = n.data[0],
                    r = e.getEvents();
                for (let a in r) a === o.event && r[a](o.payload)
            }
        }, !1)
    };
    var ke = G(de());
    var Xe = chrome.runtime.getURL("assets/config.js"),
        fe, P = (fe = globalThis.browser) != null ? fe : globalThis.chrome;
    async function Ye() {
        let e = await P.storage.local.get("defaultConfig");
        if (e.defaultConfig) return e.defaultConfig;
        let t = {},
            n = ["DelayTime", "RepeatTimes"],
            o = ["enabledFor", "useCapsolver", "manualSolving", "useProxy"],
            r = /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm,
            i = (await (await fetch(Xe)).text()).replace(r, ""),
            f = i.slice(i.indexOf("{") + 1, i.lastIndexOf("}")),
            p = JSON.stringify(f).replaceAll('\\"', "'").replaceAll("\\n", "").replaceAll('"', "").replaceAll(" ", ""),
            C = p.indexOf("blackUrlList"),
            T = p.slice(C),
            b = T.indexOf("],"),
            v = T.slice(0, b + 1);
        p.replace(v, "").split(",").forEach(_e => {
            let [W, z] = _e.split(":");
            if (W && z) {
                let S = z.replaceAll("'", "").replaceAll('"', "");
                for (let y = 0; y < n.length; y++) W.endsWith(n[y]) && (S = Number(S));
                for (let y = 0; y < o.length; y++) W.startsWith(o[y]) && (S = S === "true");
                t[W] = S
            }
        }), v = v.replaceAll("'", "").replaceAll('"', "");
        let H = v.indexOf(":["),
            Be = v.slice(H + 2, v.length - 1);
        return t.blackUrlList = Be.split(","), P.storage.local.set({
            defaultConfig: t
        }), t
    }
    var M = {
            manualSolving: !1,
            apiKey: "",
            appId: "",
            enabledForImageToText: !0,
            enabledForRecaptchaV3: !0,
            enabledForHCaptcha: !0,
            enabledForGeetestV4: !1,
            recaptchaV3MinScore: .5,
            enabledForRecaptcha: !0,
            enabledForFunCaptcha: !0,
            enabledForDataDome: !1,
            enabledForAwsCaptcha: !0,
            useProxy: !1,
            proxyType: "http",
            hostOrIp: "",
            port: "",
            proxyLogin: "",
            proxyPassword: "",
            enabledForBlacklistControl: !1,
            blackUrlList: [],
            isInBlackList: !1,
            reCaptchaMode: "click",
            reCaptchaDelayTime: 0,
            reCaptchaCollapse: !1,
            reCaptchaRepeatTimes: 10,
            reCaptcha3Mode: "token",
            reCaptcha3DelayTime: 0,
            reCaptcha3Collapse: !1,
            reCaptcha3RepeatTimes: 10,
            reCaptcha3TaskType: "ReCaptchaV3TaskProxyLess",
            hCaptchaMode: "click",
            hCaptchaDelayTime: 0,
            hCaptchaCollapse: !1,
            hCaptchaRepeatTimes: 10,
            funCaptchaMode: "click",
            funCaptchaDelayTime: 0,
            funCaptchaCollapse: !1,
            funCaptchaRepeatTimes: 10,
            geetestMode: "click",
            geetestCollapse: !1,
            geetestDelayTime: 0,
            geetestRepeatTimes: 10,
            textCaptchaMode: "click",
            textCaptchaCollapse: !1,
            textCaptchaDelayTime: 0,
            textCaptchaRepeatTimes: 10,
            enabledForCloudflare: !1,
            cloudflareMode: "click",
            cloudflareCollapse: !1,
            cloudflareDelayTime: 0,
            cloudflareRepeatTimes: 10,
            datadomeMode: "click",
            datadomeCollapse: !1,
            datadomeDelayTime: 0,
            datadomeRepeatTimes: 10,
            awsCaptchaMode: "click",
            awsCollapse: !1,
            awsDelayTime: 0,
            awsRepeatTimes: 10,
            useCapsolver: !0,
            isInit: !1,
            solvedCallback: "captchaSolvedCallback",
            textCaptchaSourceAttribute: "capsolver-image-to-text-source",
            textCaptchaResultAttribute: "capsolver-image-to-text-result"
        },
        ue = {
            proxyType: ["socks5", "http", "https", "socks4"],
            mode: ["click", "token"]
        };
    async function ge() {
        let e = await Ye(),
            t = Object.keys(e);
        for (let n of t)
            if (!(n === "proxyType" && !ue[n].includes(e[n]))) {
                {
                    if (n.endsWith("Mode") && !ue.mode.includes(e[n])) continue;
                    if (n === "port") {
                        if (typeof e.port != "number") continue;
                        M.port = e.port
                    }
                }
                Reflect.has(M, n) && typeof M[n] == typeof e[n] && (M[n] = e[n])
            } return M
    }
    var Ze = ge(),
        g = {
            default: Ze,
            async get(e) {
                return (await this.getAll())[e]
            },
            async getAll() {
                let e = await ge(),
                    t = await P.storage.local.get("config");
                return g.joinConfig(e, t.config)
            },
            async set(e) {
                let t = await g.getAll(),
                    n = g.joinConfig(t, e);
                return P.storage.local.set({
                    config: n
                })
            },
            joinConfig(e, t) {
                let n = {};
                if (e)
                    for (let o in e) n[o] = e[o];
                if (t)
                    for (let o in t) n[o] = t[o];
                return n
            }
        };

    function he(e) {
        e.on("config", async ({
            respond: t
        }) => {
            let n = await g.getAll();
            t(n).then()
        }), e.on("registerCaptchaWidget", ({
            data: t,
            respond: n
        }) => {
            window.registerCaptchaWidget(t)
        })
    }

    function me() {
        let e = document.querySelector("head > capsolver-widgets");
        e || (e = document.createElement("capsolver-widgets"), document.head.appendChild(e)), window.registerCaptchaWidget = t => {
            let n = et(t);
            if (window.isCaptchaWidgetRegistered(n)) return;
            let o = document.createElement("capsolver-widget");
            for (let r in n) o.dataset[r] = n[r];
            e.appendChild(o)
        }, window.isCaptchaWidgetRegistered = t => {
            let {
                captchaType: n,
                widgetId: o
            } = t, r = e.children;
            for (let a = 0; a < r.length; a++) {
                let s = r[a],
                    i = s.dataset.captchaType,
                    f = s.dataset.widgetId;
                if (!(i !== n || f !== o)) return !0
            }
            return !1
        }, window.resetCaptchaWidget = t => {
            let {
                captchaType: n,
                widgetId: o
            } = t, r = e.children;
            for (let a = 0; a < r.length; a++) {
                let i = r[a].dataset;
                if (i.captchaType === n && i.widgetId === o) {
                    i.reset = String(!0);
                    break
                }
            }
        }, window.getCaptchaWidget = t => {
            let {
                captchaType: n
            } = t, o = `capsolver-widget[data-captcha-type="${n}"]`;
            return document.querySelector(o)
        }, window.getCaptchaWidgetDataset = (t, n) => {
            var o;
            return (o = window.getCaptchaWidget({
                captchaType: t,
                widgetId: n
            })) == null ? void 0 : o.dataset
        }, window.setCaptchaWidgetDataset = (t, n, o) => {
            let r;
            t ? r = `capsolver-widget[data-widget-id="${t}"]` : r = "capsolver-widget";
            let a = document.querySelector(r);
            a && (a.dataset[n] = o)
        }
    }

    function et(e) {
        let t = {};
        for (let n in e) e[n] === null || e[n] === void 0 || (t[n] = `${e[n]}`);
        return t
    }

    function K() {
        let e = document.createElement("div");
        e.id = "capsolver-solver-tip-button", e.classList.add("capsolver-solver"), e.dataset.state = "solving";
        let t = document.createElement("div");
        t.classList.add("capsolver-solver-image");
        let n = document.createElement("img");
        n.src = chrome.runtime.getURL("assets/images/logo_solved.png"), n.alt = "", t.appendChild(n);
        let o = document.createElement("div");
        return o.classList.add("capsolver-solver-info"), o.innerText = chrome.i18n.getMessage("solving"), e.appendChild(t), e.appendChild(o), e
    }

    function u(e, t) {
        let n = document.querySelector("#capsolver-solver-tip-button"),
            o = n == null ? void 0 : n.querySelector(".capsolver-solver-info");
        o && (o.innerHTML = e), t && n && (n.dataset.state = t)
    }
    var tt = "hCaptcha";
    var B = class {
        constructor() {
            h(this, "captchaType", tt)
        }
        setSolveButton(t, n) {
            let o = document.querySelector(`#${t.containerId}`),
                r = n;
            r.style.width = o.querySelector("iframe").offsetWidth + "px", o.append(r)
        }
        getParams(t, n) {
            return {
                url: location.href,
                sitekey: t.sitekey
            }
        }
        onSolved(t, n) {
            u(chrome.i18n.getMessage("solved"), "solved");
            let o = document.getElementById(t.containerId);
            if (!o) return;
            o.querySelectorAll("iframe[data-hcaptcha-widget-id]").forEach(a => {
                let s = a.attributes["data-hcaptcha-widget-id"].value,
                    i = JSON.stringify({
                        source: "hcaptcha",
                        label: "challenge-closed",
                        id: s,
                        contents: {
                            event: "challenge-passed",
                            response: n,
                            expiration: 120
                        }
                    });
                window.dispatchEvent(new MessageEvent("message", {
                    data: i
                }))
            })
        }
        getForm(t) {
            return document.querySelector(`#${t.containerId}`).querySelector("form")
        }
        getCallback(t) {
            return t.callback
        }
    };
    var nt = "reCaptcha";
    var D = class {
        constructor(t) {
            h(this, "captchaType", nt);
            this.captchaType = t
        }
        setSolveButton(t, n) {
            let o = n,
                r = this.getBindedElements(t);
            r.textarea && r.textarea.parentElement ? (r.textarea.parentElement.style.height = "auto", r.textarea.parentElement.insertBefore(o, r.textarea.nextSibling)) : r.button.parentElement.insertBefore(o, r.button.nextSibling)
        }
        getParams(t, n) {
            return {
                sitekey: t.sitekey,
                url: location.href,
                version: (t == null ? void 0 : t.version) || "v2",
                score: (n == null ? void 0 : n.recaptchaV3MinScore) || .7,
                action: (t == null ? void 0 : t.action) || "",
                invisible: (t == null ? void 0 : t.version) === "v2_invisible",
                enterprise: !!t.enterprise,
                s: (t == null ? void 0 : t.s) || ""
            }
        }
        onSolved(t, n) {
            var r;
            u(chrome.i18n.getMessage("solved"), "solved");
            let o = this.getBindedElements(t).textarea;
            o || (o = (r = this.getForm(t)) == null ? void 0 : r.querySelector("textarea[name=g-recaptcha-response]")), o.innerHTML = n, o.value = n
        }
        getForm(t) {
            var o;
            let n = this.getBindedElements(t);
            return n.textarea ? n.textarea.closest("form") : (o = n.button) == null ? void 0 : o.closest("form")
        }
        getCallback(t) {
            return t.callback
        }
        getBindedElements(t) {
            let n = {
                button: null,
                textarea: null
            };
            if (t.bindedButtonId) {
                let o = document.querySelector(`#${t.bindedButtonId}`);
                o && (n.button = o)
            } else {
                let o = document.querySelector(`#${t.containerId} textarea[name=g-recaptcha-response]`);
                o && (n.textarea = o)
            }
            return n
        }
    };
    var ot = "funCaptcha";
    var Ce = 304;

    function rt(e) {
        return e - Ce > 0 ? (e - Ce) / 2 : 0
    }
    var _ = class {
        constructor() {
            h(this, "captchaType", ot)
        }
        setSolveButton(t, n) {
            let o = document.querySelector("#" + t.containerId),
                r = n;
            r.style.width = o.querySelector("iframe").offsetWidth + "px", r.style.position = "absolute", r.style.left = rt(o.querySelector("iframe").offsetWidth) + "px", r.style.bottom = "20px", o.append(r)
        }
        getParams(t) {
            return {
                websiteURL: location.href,
                websitePublicKey: t.websitePublicKey
            }
        }
        onSolved(t, n) {}
        getCallback(t) {
            return "onSuccess"
        }
    };
    var at = "cloudflare";

    function st() {
        let t = location.href.split("/");
        return t.slice(t.indexOf("turnstile")).sort((o, r) => r.length - o.length)[0]
    }
    var A = class {
        constructor() {
            h(this, "captchaType", at)
        }
        getParams(t, n) {
            return {
                websiteURL: location.href,
                websiteKey: st(),
                type: "turnstile"
            }
        }
        setSolveButton(t, n) {
            let o = document.querySelector(`#${t.containerId}`),
                r = n;
            r.style.width = o.querySelector("iframe").offsetWidth + "px", o.append(r)
        }
        onSolved(t, n) {
            u(chrome.i18n.getMessage("solved"), "solved");
            let o = this.getResponseInput(t);
            o.value = n
        }
        getResponseInput(t) {
            let {
                containerId: n
            } = t, o = document.querySelector(`#${n}`);
            return o == null ? void 0 : o.querySelector('input[name="cf-turnstile-response"]')
        }
        getForm(t) {
            return null
        }
        getCallback(t) {
            return t == null ? void 0 : t.callback
        }
    };
    var it = "awsCaptcha";
    var F = class {
        constructor() {
            h(this, "captchaType", it)
        }
        setSolveButton(t, n) {
            let o = document.querySelector(`#${t.containerId}`),
                r = n;
            r.style.width = (o == null ? void 0 : o.offsetWidth) + "px", o == null || o.append(r)
        }
    };
    var $ = class {
            constructor() {
                h(this, "list", [])
            }
            register(t) {
                this.list[t.captchaType] = t
            }
            get(t) {
                return this.list[t]
            }
        },
        m = new $;

    function ve(e) {
        m.register(new B), m.register(new D("reCaptcha")), m.register(new D("reCaptcha3")), m.register(new _), m.register(new A), m.register(new F)
    }
    var ye = 0;

    function xe(e) {
        if (e != null && e.response) {
            let {
                action: t
            } = e.response;
            switch (t) {
                case "solver":
                    ct(e.response);
                    break;
                case "solved":
                    u(chrome.i18n.getMessage("solved"), "solved"), Te();
                    break
            }
        }
    }

    function ct(e) {
        var t;
        try {
            if ((t = e.request) != null && t.messageId) return pt(e);
            let n = {
                captchaType: e.request.captchaType,
                widgetId: e.request.widgetId
            };
            e.error ? (g.getAll().then(o => {
                e.error === "Error: Capsover: No API Kye set up yet!" && !(o != null && o.apiKey) && u("Please input your API key!", "error"), o[`${n.captchaType}RepeatTimes`] >= ye ? window.setCaptchaWidgetDataset(n.widgetId, "status", "ready") : (window.setCaptchaWidgetDataset(n.widgetId, "status", "error"), u(e.error, "error"))
            }), ye++) : (window.setCaptchaWidgetDataset(n.widgetId, "status", "success"), lt(e), Te())
        } catch (n) {
            console.error("handle error\uFF1A", n)
        }
    }

    function lt(e) {
        let t = window.getCaptchaWidgetDataset(e.request.captchaType, e.request.widgetId),
            n = m.get(e.request.captchaType);
        n.onSolved(t, e.response.code);
        let o = n.getCallback(t);
        if (o) {
            let r = document.createElement("textarea");
            r.id = "capsolver-callback-trigger", r.setAttribute("data-function", o), r.value = e.response.code, document.body.appendChild(r)
        }
    }

    function Te() {
        g.getAll().then(e => {
            window.postMessage({
                type: "capsolverCallback",
                callback: e.solvedCallback
            }, "*")
        })
    }

    function pt(e) {
        let t = document.querySelector("body > solver-ext-messages > solver-ext-message[data-message-id=" + e.request.messageId + "]");
        !t || (e.error ? be(t[0], {
            error: e.error
        }) : be(t[0], {
            response: e.response.code
        }))
    }

    function be(e, t) {
        e.dataset.response = encodeURIComponent(JSON.stringify(t))
    }

    function Se(e) {
        if (document.querySelector("#capsolver-solver-tip-button")) return;
        let t = m.get(e.captchaType),
            n = K();
        t.setSolveButton(e, n)
    }

    function dt(e, t) {
        if (document.querySelector("#capsolver-solver-tip-button")) return;
        let n = m.get(e.captchaType),
            o = K();
        o.onclick = () => {
            t === "token" ? window.onTaskByToken(e) : chrome.runtime.sendMessage({
                action: "execute"
            }), u(chrome.i18n.getMessage("solving"), "solving")
        }, n.setSolveButton(e, o), u(chrome.i18n.getMessage("solveWithCapsolver"), "ready")
    }

    function Le() {
        window.getSolverButton = e => {
            let {
                captchaType: t,
                widgetId: n
            } = e, o = `.capsolver-solver[data-captcha-type="${t}"][data-widget-id="${n}"]`;
            return document.querySelector(o)
        }, window.setSolverButtonState = (e, t, n) => {
            let o = window.getSolverButton(e);
            if (!o) return;
            o.setAttribute("data-state", t);
            let r = o.querySelector(".capsolver-solver-info");
            if (r && (r.innerHTML = n), t === "error") {
                let a = parseInt(o.dataset.countErrors || "0") + 1;
                o.dataset.countErrors = String(a)
            }
        }, window.onTaskByToken = e => {
            let {
                captchaType: t,
                widgetId: n
            } = e, o = window.getCaptchaWidgetDataset(t, n);
            g.getAll().then(r => {
                let s = m.get(t).getParams(o, r);
                try {
                    s.websiteURL = window.top.location.href
                } catch {}
                Se(e);
                let i = {
                    action: "solver",
                    captchaType: t,
                    widgetId: n,
                    params: s
                };
                window.setCaptchaWidgetDataset(n, "status", "processing"), chrome.runtime.sendMessage(i).then(xe)
            })
        }
    }
    var ut = (e, t) => {
        let n = new Map([
            ["funCaptcha", "enabledForFunCaptcha"],
            ["hCaptcha", "enabledForHCaptcha"],
            ["reCaptcha", "enabledForRecaptcha"],
            ["reCaptcha3", "enabledForRecaptchaV3"],
            ["cloudflare", "enabledForCloudflare"],
            ["awsCaptcha", "enabledForAwsCaptcha"]
        ]);
        return !!(e[n.get(t.captchaType)] && t.containerId)
    };

    function Me() {
        return setInterval(async () => {
            let e = await g.getAll(),
                t = document.querySelector("head").getElementsByTagName("capsolver-widget");
            for (let n = 0; n < t.length; n++) {
                let r = t.item(n).dataset;
                if (!(e != null && e.apiKey)) {
                    Se(r), u("Please input your API key!", "error");
                    return
                }!ut(e, r) || r.status !== "ready" || (e.manualSolving ? dt(r, e[`${r.captchaType}Mode`]) : e[`${r.captchaType}Mode`] === "token" && window.onTaskByToken(r))
            }
        }, 2e3)
    }
    var We = document.createElement("script");
    We.src = chrome.runtime.getURL("assets/inject/solvedCallback.js");
    var ft = document.head || document.documentElement;
    ft.appendChild(We);
    var Ie = [],
        gt = ["arkoselabs.com/fc", "funcaptcha.com/fc", "hcaptcha.com/captcha", "google.com/recaptcha", "recaptcha.net/recaptcha", "recaptcha.net/recaptcha"],
        ht = chrome.runtime.connect({
            name: "content"
        });
    ht.onDisconnect.addListener(e => {
        for (let t of Ie) t && clearInterval(t)
    });
    chrome.runtime.onMessage.addListener(e => {
        var o, r;
        let t = (o = e == null ? void 0 : e.response) == null ? void 0 : o.action,
            n = (r = e == null ? void 0 : e.response) == null ? void 0 : r.callback;
        switch (t) {
            case "solved":
                u(chrome.i18n.getMessage("solved"), "solved"), window.postMessage({
                    type: "capsolverCallback",
                    callback: n
                }, "*");
                break;
            default:
                break
        }
        return !1
    });
    var De, mt = (De = globalThis.browser) != null ? De : globalThis.chrome;
    mt.storage.local.set({
        platform: window.navigator.userAgent.includes("Chrome") ? "chrome" : "firefox"
    });

    function Ct() {
        try {
            let e = window.top.location.href;
            chrome.runtime.sendMessage({
                action: "getWebsiteUrl",
                websiteUrl: e
            })
        } catch {}
    }
    g.getAll().then(function(e) {
        me(), ve(e), Le();
        let t = window.location.origin,
            n = window.location.pathname,
            o = t + n,
            r = gt.some(s => o.indexOf(s) !== -1),
            a = e.blackUrlList.includes(o);
        g.set({
            isInBlackList: r ? e.isInBlackList : a,
            isInit: !0
        }).then(() => {
            (!e.enabledForBlacklistControl || !a) && e.useCapsolver && (Ie.push(Me()), Ct())
        })
    });
    var Ee = (0, ke.bexContent)(e => {
        he(e)
    });
    var V = chrome.runtime.connect({
            name: "contentScript"
        }),
        Re = !1;
    V.onDisconnect.addListener(() => {
        Re = !0
    });
    var Pe = new L({
        listen(e) {
            V.onMessage.addListener(e)
        },
        send(e) {
            Re || (V.postMessage(e), window.postMessage({
                ...e,
                from: "bex-content-script"
            }, "*"))
        }
    });

    function vt(e) {
        let t = document.createElement("script");
        t.src = e, t.onload = function() {
            this.remove()
        }, (document.head || document.documentElement).appendChild(t)
    }
    document instanceof HTMLDocument && vt(chrome.runtime.getURL("dom.js"));
    pe(Pe, "bex-dom");
    Ee(Pe);
})();