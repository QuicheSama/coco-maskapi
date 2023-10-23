
var initMaskApi = (() => {
  var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
  if (typeof __filename !== 'undefined') _scriptDir = _scriptDir || __filename;
  return (
function(moduleArg = {}) {

var f = moduleArg, ba, n;
f.ready = new Promise((a, b) => {
  ba = a;
  n = b;
});
var ca = Object.assign({}, f), da = "object" == typeof window, q = "function" == typeof importScripts, ea = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node, t = "", u, v, w;
if (ea) {
  var fs = require("fs"), x = require("path");
  t = q ? x.dirname(t) + "/" : __dirname + "/";
  u = (a, b) => {
    a = y(a) ? new URL(a) : x.normalize(a);
    return fs.readFileSync(a, b ? void 0 : "utf8");
  };
  w = a => {
    a = u(a, !0);
    a.buffer || (a = new Uint8Array(a));
    return a;
  };
  v = (a, b, c, d = !0) => {
    a = y(a) ? new URL(a) : x.normalize(a);
    fs.readFile(a, d ? void 0 : "utf8", (e, g) => {
      e ? c(e) : b(d ? g.buffer : g);
    });
  };
  process.argv.slice(2);
  f.inspect = () => "[Emscripten Module object]";
} else if (da || q) {
  q ? t = self.location.href : "undefined" != typeof document && document.currentScript && (t = document.currentScript.src), _scriptDir && (t = _scriptDir), 0 !== t.indexOf("blob:") ? t = t.substr(0, t.replace(/[?#].*/, "").lastIndexOf("/") + 1) : t = "", u = a => {
    var b = new XMLHttpRequest();
    b.open("GET", a, !1);
    b.send(null);
    return b.responseText;
  }, q && (w = a => {
    var b = new XMLHttpRequest();
    b.open("GET", a, !1);
    b.responseType = "arraybuffer";
    b.send(null);
    return new Uint8Array(b.response);
  }), v = (a, b, c) => {
    var d = new XMLHttpRequest();
    d.open("GET", a, !0);
    d.responseType = "arraybuffer";
    d.onload = () => {
      200 == d.status || 0 == d.status && d.response ? b(d.response) : c();
    };
    d.onerror = c;
    d.send(null);
  };
}
f.print || console.log.bind(console);
var z = f.printErr || console.error.bind(console);
Object.assign(f, ca);
ca = null;
var A;
f.wasmBinary && (A = f.wasmBinary);
"object" != typeof WebAssembly && B("no native wasm support detected");
var fa, ha = !1, C, E, F, G, H, I, ia, ja, ka = [], la = [], ma = [];
function na() {
  var a = f.preRun.shift();
  ka.unshift(a);
}
var J = 0, K = null, L = null;
function B(a) {
  if (f.onAbort) {
    f.onAbort(a);
  }
  a = "Aborted(" + a + ")";
  z(a);
  ha = !0;
  a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
  n(a);
  throw a;
}
var oa = a => a.startsWith("data:application/octet-stream;base64,"), y = a => a.startsWith("file://"), M;
M = "maskApi.wasm";
if (!oa(M)) {
  var pa = M;
  M = f.locateFile ? f.locateFile(pa, t) : t + pa;
}
function qa(a) {
  if (a == M && A) {
    return new Uint8Array(A);
  }
  if (w) {
    return w(a);
  }
  throw "both async and sync fetching of the wasm failed";
}
function ra(a) {
  if (!A && (da || q)) {
    if ("function" == typeof fetch && !y(a)) {
      return fetch(a, {credentials:"same-origin"}).then(b => {
        if (!b.ok) {
          throw "failed to load wasm binary file at '" + a + "'";
        }
        return b.arrayBuffer();
      }).catch(() => qa(a));
    }
    if (v) {
      return new Promise((b, c) => {
        v(a, d => b(new Uint8Array(d)), c);
      });
    }
  }
  return Promise.resolve().then(() => qa(a));
}
function sa(a, b, c) {
  return ra(a).then(d => WebAssembly.instantiate(d, b)).then(d => d).then(c, d => {
    z(`failed to asynchronously prepare wasm: ${d}`);
    B(d);
  });
}
function ta(a, b) {
  var c = M;
  return A || "function" != typeof WebAssembly.instantiateStreaming || oa(c) || y(c) || ea || "function" != typeof fetch ? sa(c, a, b) : fetch(c, {credentials:"same-origin"}).then(d => WebAssembly.instantiateStreaming(d, a).then(b, function(e) {
    z(`wasm streaming compile failed: ${e}`);
    z("falling back to ArrayBuffer instantiation");
    return sa(c, a, b);
  }));
}
var N = a => {
  for (; 0 < a.length;) {
    a.shift()(f);
  }
}, ua, O = a => {
  for (var b = ""; E[a];) {
    b += ua[E[a++]];
  }
  return b;
}, P = {}, va = {}, wa = {}, R;
function xa(a, b, c = {}) {
  var d = b.name;
  if (!a) {
    throw new R(`type "${d}" must have a positive integer typeid pointer`);
  }
  if (va.hasOwnProperty(a)) {
    if (c.o) {
      return;
    }
    throw new R(`Cannot register type '${d}' twice`);
  }
  va[a] = b;
  delete wa[a];
  P.hasOwnProperty(a) && (b = P[a], delete P[a], b.forEach(e => e()));
}
function S(a, b, c = {}) {
  if (!("argPackAdvance" in b)) {
    throw new TypeError("registerType registeredInstance requires argPackAdvance");
  }
  xa(a, b, c);
}
function ya() {
  this.g = [void 0];
  this.i = [];
}
var T = new ya(), za = a => {
  switch(a) {
    case void 0:
      return 1;
    case null:
      return 2;
    case !0:
      return 3;
    case !1:
      return 4;
    default:
      return T.l({s:1, value:a});
  }
};
function Aa(a) {
  return this.fromWireType(H[a >> 2]);
}
var Ba = (a, b) => {
  switch(b) {
    case 4:
      return function(c) {
        return this.fromWireType(ia[c >> 2]);
      };
    case 8:
      return function(c) {
        return this.fromWireType(ja[c >> 3]);
      };
    default:
      throw new TypeError(`invalid float width (${b}): ${a}`);
  }
}, Ca = (a, b, c) => {
  switch(b) {
    case 1:
      return c ? d => C[d >> 0] : d => E[d >> 0];
    case 2:
      return c ? d => F[d >> 1] : d => G[d >> 1];
    case 4:
      return c ? d => H[d >> 2] : d => I[d >> 2];
    default:
      throw new TypeError(`invalid integer width (${b}): ${a}`);
  }
};
function Da(a) {
  return this.fromWireType(I[a >> 2]);
}
for (var Ea = (a, b, c) => {
  var d = E;
  if (0 < c) {
    c = b + c - 1;
    for (var e = 0; e < a.length; ++e) {
      var g = a.charCodeAt(e);
      if (55296 <= g && 57343 >= g) {
        var l = a.charCodeAt(++e);
        g = 65536 + ((g & 1023) << 10) | l & 1023;
      }
      if (127 >= g) {
        if (b >= c) {
          break;
        }
        d[b++] = g;
      } else {
        if (2047 >= g) {
          if (b + 1 >= c) {
            break;
          }
          d[b++] = 192 | g >> 6;
        } else {
          if (65535 >= g) {
            if (b + 2 >= c) {
              break;
            }
            d[b++] = 224 | g >> 12;
          } else {
            if (b + 3 >= c) {
              break;
            }
            d[b++] = 240 | g >> 18;
            d[b++] = 128 | g >> 12 & 63;
          }
          d[b++] = 128 | g >> 6 & 63;
        }
        d[b++] = 128 | g & 63;
      }
    }
    d[b] = 0;
  }
}, Fa = a => {
  for (var b = 0, c = 0; c < a.length; ++c) {
    var d = a.charCodeAt(c);
    127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
  }
  return b;
}, Ga = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0, Ha = (a, b) => {
  var c = E, d = a + b;
  for (b = a; c[b] && !(b >= d);) {
    ++b;
  }
  if (16 < b - a && c.buffer && Ga) {
    return Ga.decode(c.subarray(a, b));
  }
  for (d = ""; a < b;) {
    var e = c[a++];
    if (e & 128) {
      var g = c[a++] & 63;
      if (192 == (e & 224)) {
        d += String.fromCharCode((e & 31) << 6 | g);
      } else {
        var l = c[a++] & 63;
        e = 224 == (e & 240) ? (e & 15) << 12 | g << 6 | l : (e & 7) << 18 | g << 12 | l << 6 | c[a++] & 63;
        65536 > e ? d += String.fromCharCode(e) : (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
      }
    } else {
      d += String.fromCharCode(e);
    }
  }
  return d;
}, Ia = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0, Ja = (a, b) => {
  var c = a >> 1;
  for (var d = c + b / 2; !(c >= d) && G[c];) {
    ++c;
  }
  c <<= 1;
  if (32 < c - a && Ia) {
    return Ia.decode(E.subarray(a, c));
  }
  c = "";
  for (d = 0; !(d >= b / 2); ++d) {
    var e = F[a + 2 * d >> 1];
    if (0 == e) {
      break;
    }
    c += String.fromCharCode(e);
  }
  return c;
}, Ka = (a, b, c) => {
  void 0 === c && (c = 2147483647);
  if (2 > c) {
    return 0;
  }
  c -= 2;
  var d = b;
  c = c < 2 * a.length ? c / 2 : a.length;
  for (var e = 0; e < c; ++e) {
    F[b >> 1] = a.charCodeAt(e), b += 2;
  }
  F[b >> 1] = 0;
  return b - d;
}, La = a => 2 * a.length, Ma = (a, b) => {
  for (var c = 0, d = ""; !(c >= b / 4);) {
    var e = H[a + 4 * c >> 2];
    if (0 == e) {
      break;
    }
    ++c;
    65536 <= e ? (e -= 65536, d += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023)) : d += String.fromCharCode(e);
  }
  return d;
}, Na = (a, b, c) => {
  void 0 === c && (c = 2147483647);
  if (4 > c) {
    return 0;
  }
  var d = b;
  c = d + c - 4;
  for (var e = 0; e < a.length; ++e) {
    var g = a.charCodeAt(e);
    if (55296 <= g && 57343 >= g) {
      var l = a.charCodeAt(++e);
      g = 65536 + ((g & 1023) << 10) | l & 1023;
    }
    H[b >> 2] = g;
    b += 4;
    if (b + 4 > c) {
      break;
    }
  }
  H[b >> 2] = 0;
  return b - d;
}, Oa = a => {
  for (var b = 0, c = 0; c < a.length; ++c) {
    var d = a.charCodeAt(c);
    55296 <= d && 57343 >= d && ++c;
    b += 4;
  }
  return b;
}, Ra = (a, b, c, d) => {
  var e = {string:h => {
    var p = 0;
    if (null !== h && void 0 !== h && 0 !== h) {
      p = Fa(h) + 1;
      var r = U(p);
      Ea(h, r, p);
      p = r;
    }
    return p;
  }, array:h => {
    var p = U(h.length);
    C.set(h, p);
    return p;
  }};
  a = f["_" + a];
  var g = [], l = 0;
  if (d) {
    for (var k = 0; k < d.length; k++) {
      var m = e[c[k]];
      m ? (0 === l && (l = Pa()), g[k] = m(d[k])) : g[k] = d[k];
    }
  }
  c = a.apply(null, g);
  return c = function(h) {
    0 !== l && Qa(l);
    return "string" === b ? h ? Ha(h) : "" : "boolean" === b ? !!h : h;
  }(c);
}, Sa = Array(256), V = 0; 256 > V; ++V) {
  Sa[V] = String.fromCharCode(V);
}
ua = Sa;
R = f.BindingError = class extends Error {
  constructor(a) {
    super(a);
    this.name = "BindingError";
  }
};
f.InternalError = class extends Error {
  constructor(a) {
    super(a);
    this.name = "InternalError";
  }
};
Object.assign(ya.prototype, {get(a) {
  return this.g[a];
}, has(a) {
  return void 0 !== this.g[a];
}, l(a) {
  var b = this.i.pop() || this.g.length;
  this.g[b] = a;
  return b;
}, m(a) {
  this.g[a] = void 0;
  this.i.push(a);
}});
T.g.push({value:void 0}, {value:null}, {value:!0}, {value:!1},);
T.j = T.g.length;
f.count_emval_handles = () => {
  for (var a = 0, b = T.j; b < T.g.length; ++b) {
    void 0 !== T.g[b] && ++a;
  }
  return a;
};
var Ta = {_embind_register_bigint:() => {
}, _embind_register_bool:(a, b, c, d) => {
  b = O(b);
  S(a, {name:b, fromWireType:function(e) {
    return !!e;
  }, toWireType:function(e, g) {
    return g ? c : d;
  }, argPackAdvance:8, readValueFromPointer:function(e) {
    return this.fromWireType(E[e]);
  }, h:null,});
}, _embind_register_emval:(a, b) => {
  b = O(b);
  S(a, {name:b, fromWireType:c => {
    if (!c) {
      throw new R("Cannot use deleted val. handle = " + c);
    }
    var d = T.get(c).value;
    c >= T.j && 0 === --T.get(c).s && T.m(c);
    return d;
  }, toWireType:(c, d) => za(d), argPackAdvance:8, readValueFromPointer:Aa, h:null,});
}, _embind_register_float:(a, b, c) => {
  b = O(b);
  S(a, {name:b, fromWireType:d => d, toWireType:(d, e) => e, argPackAdvance:8, readValueFromPointer:Ba(b, c), h:null,});
}, _embind_register_integer:(a, b, c, d, e) => {
  b = O(b);
  -1 === e && (e = 4294967295);
  e = k => k;
  if (0 === d) {
    var g = 32 - 8 * c;
    e = k => k << g >>> g;
  }
  var l = b.includes("unsigned") ? function(k, m) {
    return m >>> 0;
  } : function(k, m) {
    return m;
  };
  S(a, {name:b, fromWireType:e, toWireType:l, argPackAdvance:8, readValueFromPointer:Ca(b, c, 0 !== d), h:null,});
}, _embind_register_memory_view:(a, b, c) => {
  function d(g) {
    return new e(C.buffer, I[g + 4 >> 2], I[g >> 2]);
  }
  var e = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array,][b];
  c = O(c);
  S(a, {name:c, fromWireType:d, argPackAdvance:8, readValueFromPointer:d,}, {o:!0,});
}, _embind_register_std_string:(a, b) => {
  b = O(b);
  var c = "std::string" === b;
  S(a, {name:b, fromWireType:function(d) {
    var e = I[d >> 2], g = d + 4;
    if (c) {
      for (var l = g, k = 0; k <= e; ++k) {
        var m = g + k;
        if (k == e || 0 == E[m]) {
          l = l ? Ha(l, m - l) : "";
          if (void 0 === h) {
            var h = l;
          } else {
            h += String.fromCharCode(0), h += l;
          }
          l = m + 1;
        }
      }
    } else {
      h = Array(e);
      for (k = 0; k < e; ++k) {
        h[k] = String.fromCharCode(E[g + k]);
      }
      h = h.join("");
    }
    W(d);
    return h;
  }, toWireType:function(d, e) {
    e instanceof ArrayBuffer && (e = new Uint8Array(e));
    var g = "string" == typeof e;
    if (!(g || e instanceof Uint8Array || e instanceof Uint8ClampedArray || e instanceof Int8Array)) {
      throw new R("Cannot pass non-string to std::string");
    }
    var l = c && g ? Fa(e) : e.length;
    var k = X(4 + l + 1), m = k + 4;
    I[k >> 2] = l;
    if (c && g) {
      Ea(e, m, l + 1);
    } else {
      if (g) {
        for (g = 0; g < l; ++g) {
          var h = e.charCodeAt(g);
          if (255 < h) {
            throw W(m), new R("String has UTF-16 code units that do not fit in 8 bits");
          }
          E[m + g] = h;
        }
      } else {
        for (g = 0; g < l; ++g) {
          E[m + g] = e[g];
        }
      }
    }
    null !== d && d.push(W, k);
    return k;
  }, argPackAdvance:8, readValueFromPointer:Da, h(d) {
    W(d);
  },});
}, _embind_register_std_wstring:(a, b, c) => {
  c = O(c);
  if (2 === b) {
    var d = Ja;
    var e = Ka;
    var g = La;
    var l = () => G;
    var k = 1;
  } else {
    4 === b && (d = Ma, e = Na, g = Oa, l = () => I, k = 2);
  }
  S(a, {name:c, fromWireType:m => {
    for (var h = I[m >> 2], p = l(), r, D = m + 4, Q = 0; Q <= h; ++Q) {
      var aa = m + 4 + Q * b;
      if (Q == h || 0 == p[aa >> k]) {
        D = d(D, aa - D), void 0 === r ? r = D : (r += String.fromCharCode(0), r += D), D = aa + b;
      }
    }
    W(m);
    return r;
  }, toWireType:(m, h) => {
    if ("string" != typeof h) {
      throw new R(`Cannot pass non-string to C++ string type ${c}`);
    }
    var p = g(h), r = X(4 + p + b);
    I[r >> 2] = p >> k;
    e(h, r + 4, p + b);
    null !== m && m.push(W, r);
    return r;
  }, argPackAdvance:8, readValueFromPointer:Aa, h(m) {
    W(m);
  }});
}, _embind_register_void:(a, b) => {
  b = O(b);
  S(a, {u:!0, name:b, argPackAdvance:0, fromWireType:() => {
  }, toWireType:() => {
  },});
}, emscripten_memcpy_js:(a, b, c) => E.copyWithin(a, b, b + c), emscripten_resize_heap:() => {
  B("OOM");
}}, Y = function() {
  function a(c) {
    Y = c.exports;
    fa = Y.memory;
    c = fa.buffer;
    f.HEAP8 = C = new Int8Array(c);
    f.HEAP16 = F = new Int16Array(c);
    f.HEAPU8 = E = new Uint8Array(c);
    f.HEAPU16 = G = new Uint16Array(c);
    f.HEAP32 = H = new Int32Array(c);
    f.HEAPU32 = I = new Uint32Array(c);
    f.HEAPF32 = ia = new Float32Array(c);
    f.HEAPF64 = ja = new Float64Array(c);
    la.unshift(Y.__wasm_call_ctors);
    J--;
    f.monitorRunDependencies && f.monitorRunDependencies(J);
    0 == J && (null !== K && (clearInterval(K), K = null), L && (c = L, L = null, c()));
    return Y;
  }
  var b = {env:Ta, wasi_snapshot_preview1:Ta,};
  J++;
  f.monitorRunDependencies && f.monitorRunDependencies(J);
  if (f.instantiateWasm) {
    try {
      return f.instantiateWasm(b, a);
    } catch (c) {
      z(`Module.instantiateWasm callback failed with error: ${c}`), n(c);
    }
  }
  ta(b, function(c) {
    a(c.instance);
  }).catch(n);
  return {};
}();
f._rleInit = (a, b, c, d, e) => (f._rleInit = Y.rleInit)(a, b, c, d, e);
var X = f._malloc = a => (X = f._malloc = Y.malloc)(a);
f._rleFree = a => (f._rleFree = Y.rleFree)(a);
var W = f._free = a => (W = f._free = Y.free)(a);
f._rlesInit = (a, b) => (f._rlesInit = Y.rlesInit)(a, b);
f._rlesFree = (a, b) => (f._rlesFree = Y.rlesFree)(a, b);
f._rleEncode = (a, b, c, d, e) => (f._rleEncode = Y.rleEncode)(a, b, c, d, e);
f._rleDecode = (a, b, c) => (f._rleDecode = Y.rleDecode)(a, b, c);
f._rleMerge = (a, b, c, d) => (f._rleMerge = Y.rleMerge)(a, b, c, d);
f._rleArea = (a, b, c) => (f._rleArea = Y.rleArea)(a, b, c);
f._rleFrPoly = (a, b, c, d, e) => (f._rleFrPoly = Y.rleFrPoly)(a, b, c, d, e);
f._rleToString = a => (f._rleToString = Y.rleToString)(a);
f._rleFrString = (a, b, c, d) => (f._rleFrString = Y.rleFrString)(a, b, c, d);
f.__embind_initialize_bindings = () => (f.__embind_initialize_bindings = Y._embind_initialize_bindings)();
var Pa = () => (Pa = Y.stackSave)(), Qa = a => (Qa = Y.stackRestore)(a), U = a => (U = Y.stackAlloc)(a);
f.ccall = Ra;
f.cwrap = (a, b, c, d) => {
  var e = !c || c.every(g => "number" === g || "boolean" === g);
  return "string" !== b && e && !d ? f["_" + a] : function() {
    return Ra(a, b, c, arguments, d);
  };
};
var Z;
L = function Ua() {
  Z || Va();
  Z || (L = Ua);
};
function Va() {
  function a() {
    if (!Z && (Z = !0, f.calledRun = !0, !ha)) {
      N(la);
      ba(f);
      if (f.onRuntimeInitialized) {
        f.onRuntimeInitialized();
      }
      if (f.postRun) {
        for ("function" == typeof f.postRun && (f.postRun = [f.postRun]); f.postRun.length;) {
          var b = f.postRun.shift();
          ma.unshift(b);
        }
      }
      N(ma);
    }
  }
  if (!(0 < J)) {
    if (f.preRun) {
      for ("function" == typeof f.preRun && (f.preRun = [f.preRun]); f.preRun.length;) {
        na();
      }
    }
    N(ka);
    0 < J || (f.setStatus ? (f.setStatus("Running..."), setTimeout(function() {
      setTimeout(function() {
        f.setStatus("");
      }, 1);
      a();
    }, 1)) : a());
  }
}
if (f.preInit) {
  for ("function" == typeof f.preInit && (f.preInit = [f.preInit]); 0 < f.preInit.length;) {
    f.preInit.pop()();
  }
}
Va();



  return moduleArg.ready
}

);
})();
if (typeof exports === 'object' && typeof module === 'object')
  module.exports = initMaskApi;
else if (typeof define === 'function' && define['amd'])
  define([], () => initMaskApi);
