// src/ccc_chart-pvc-r2.0.js

/*!
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
//VERSION TRUNK-20130531
var pvc = function(f, u) {
  function Ra() {
    if (i.debug && typeof console !== "undefined")["log", "info", ["trace", "debug"], "error", "warn", ["group", "groupCollapsed"], "groupEnd"].forEach(function(a) {
      a = a instanceof Array ? a : [a, a];
      va(i, a[0], a[1], "[pvChart]")
    });
    else {
      if (i.debug > 1) i.debug = 1;
      ["log", "info", "trace", "warn", "group", "groupEnd"].forEach(function(a) {
        i[a] = f.noop
      });
      i.error = function(a) {
        if (a && typeof a === "object" && a.message) a = a.message;
        a = "" + f.nullyTo(a, "");
        if (a.indexOf("[pvChart ERROR]: ") < 0) a = "[pvChart ERROR]: " +
          a;
        throw new Error(a);
      }
    }
    i.logError = i.error;
    u.error = i.error
  }

  function Sa() {
    var a = u.Behavior.tipsy;
    if (a && a.setDebug) {
      a.setDebug(i.debug);
      a.log = i.log
    }
  }

  function va(a, b, c, d) {
    c || (c = b);
    var e = console,
      g = e[c] || e.log,
      h;
    if (g) {
      var j = d + ": %s";
      if (f.fun.is(g))
        h = g.bind(e, j);
      else {
        var l = Function.prototype.apply;
        h = function() {
          l.call(g, e, f.array.append([j], arguments))
        }
      }
    }
    a[b] = h
  }

  function Ta(a, b) {
    if (a) {
      if (f.object.is(a))
        return a.abs;
      return b ? b + f.firstUpperCase(a) : a
    }
    return b
  }

  function wa(a) {
    a = u.color(a);
    var b = a.r,
      c = a.g;
    a = a.b;
    var d = (b + c + a) / 3;
    return Math.abs(b - d) <= 2 && Math.abs(c - d) <= 2 && Math.abs(a - d) <= 2
  }

  function xa(a) {
    a || f.fail.argumentRequired("keyArgs");
    var b = a.type || f.fail.argumentRequired("keyArgs.type");
    switch (b) {
      case "linear":
        return (new i.color.LinearScalesBuild(a)).buildMap();
      case "discrete":
        return (new i.color.DiscreteScalesBuild(a)).buildMap();
      case "normal":
        return (new i.color.NormalScalesBuild(a)).buildMap()
    }
    throw f.error.argumentInvalid("scaleType", "Unexistent scale type '{0}'.", [b]);
  }

  function ya(a) {
    a || f.fail.argumentRequired("keyArgs");
    var b = a.type || f.fail.argumentRequired("keyArgs.type");
    switch (b) {
      case "linear":
        return (new i.color.LinearScalesBuild(a)).build();
      case "discrete":
        return (new i.color.DiscreteScalesBuild(a)).build();
      case "normal":
        return (new i.color.NormalScalesBuild(a)).build()
    }
    throw f.error.argumentInvalid("scaleType", "Unexistent scale type '{0}'.", [b]);
  }

  function ea(a, b) {
    function c(o) {
      return (f.getOwn(n, o) || f.fail.operationInvalid("Undefined option '{0}'", [o])).resolve()
    }

    function d(o, p) {
      o = c(o);
      return p && !o.isSpecified ?
        undefined : o.value
    }

    function e(o) {
      return c(o).isSpecified
    }

    function g(o) {
      return d(o, true)
    }

    function h(o) {
      return f.hasOwn(n, o)
    }

    function j(o) {
      return k(o, false)
    }

    function l(o) {
      return k(o, true)
    }

    function m(o) {
      return c(o)._defaultValue
    }

    function k(o, p) {
      for (var q in o) {
        var s = f.getOwn(n, q);
        if (s) {
          var r = o[q];
          r !== undefined && s.set(r, p)
        }
      }
      return d
    }
    a || f.fail.argumentRequired("specs");
    var n = {};
    f.each(a, function(o, p) {
      o = new Ua(p, d, b, o);
      n[o.name] = o
    });
    d.option = d;
    d.specified = g;
    d.isSpecified = e;
    d.isDefined = h;
    d.defaultValue = m;
    d.specify = j;
    d.defaults = l;
    return d
  }

  function Va(a) {
    return function(b) {
      for (var c = 0, d = a.length; c < d; c++) {
        var e = a[c];
        if (f.string.is(e)) e = this[e];
        if (e.call(this, b) === true) return true
      }
    }
  }

  function Wa(a) {
    return function(b) {
      b.specify(a);
      return true
    }
  }

  function Xa(a) {
    return function(b) {
      var c = a.call(this, b);
      if (c !== undefined) {
        b.specify(c);
        return true
      }
    }
  }

  function Ya(a) {
    return function(b) {
      var c = a.call(this, b);
      if (c !== undefined) {
        b.defaultValue(c);
        return true
      }
    }
  }

  function ia(a, b) {
    if (a) {
      a.forEach(function(c) {
        if (b) c[b] = null;
        c.dispose()
      });
      a.length = 0
    }
  }

  function ja(a, b, c, d, e) {
    c && !c[d] || f.assert("Must not have a '" + d + "'.");
    c[d] = a;
    a = a[b] || (a[b] = []);
    e == null || e >= a.length ? a.push(c) : a.splice(e, 0, c)
  }

  function ka(a, b, c, d) {
    c && (!c[d] || c[d] === a) || f.assert("Not a child");
    if (a = a[b]) {
      b = a.indexOf(c);
      b >= 0 && f.array.removeAt(a, b)
    }
    c[d] = null
  }

  function Za(a) {
    this.playedVisualRoles.set(a.name, a);
    za.call(this.complexType, this)
  }

  function $a(a) {
    this.playedVisualRoles.rem(a.name);
    za.call(this.complexType, this)
  }

  function za() {
    this._isPctRoleDimTypeMap =
      null
  }

  function ab(a, b) {
    function c() {
      var e = {},
        g = f.query(d.source).select(function(h) {
          b(h, e);
          h = e.series;
          if (h != null && h.v != null) h = h.v;
          return h || null
        }).distinct().array();
      return d._createPlot2SeriesKeySet(a, g)
    }
    var d = this;
    return this._dataPartGet(c, b)
  }

  function bb(a, b) {
    return a.id - b.id
  }

  function cb(a, b) {
    return b.id - a.id
  }

  function Aa() {
    delete this.isSelected
  }

  function db(a) {
    return a.isNull || a.isSelected
  }

  function Ba(a, b, c, d, e, g) {
    if (this.owner === this) {
      if (e == null) e = (a = a._formatter) ? a(d, b) : d;
      e = "" + e;
      !e && i.debug >=
        2 && i.log("Only the null value should have an empty label.");
      b = new i.data.Atom(this, d, e, b, c);
      if (g) b.isVirtual = true
    } else {
      var h = this.parent || this.linkParent;
      b = h._atomsByKey[c] || Ba.call(h, a, b, c, d, e, g)
    }
    f.array.insert(this._atoms, b, this._atomComparer);
    fa.call(this);
    return this._atomsByKey[c] = b
  }

  function Ca(a) {
    var b = a.key;
    if (a.dimension === this) {
      this.owner === this || f.assert("Should be an owner dimension");
      if (!b && a === this._virtualNullAtom) a = this.intern(null);
      return a
    }
    if (!this._lazyInit) {
      var c = this._atomsByKey[b];
      if (c) {
        if (c !== a) throw f.error.operationInvalid("Atom is from a different root data.");
        return a
      }
      if (this.owner === this) throw f.error.operationInvalid("Atom is from a different root data.");
    }
    Ca.call(this.parent || this.linkParent, a);
    if (!this._lazyInit) {
      this._atomsByKey[b] = a;
      if (b) f.array.insert(this._atoms, a, this._atomComparer);
      else {
        this._nullAtom = a;
        this._atoms.unshift(a)
      }
      fa.call(this)
    }
    return a
  }

  function Da(a) {
    var b = f.get(a, "visible");
    a = f.get(a, "selected");
    return (b == null ? null : !!b) + ":" + (a == null ? null : !!a)
  }

  function ga(a) {
    var b =
      this._nullAtom;
    if (!b) {
      if (this.owner === this) {
        b = this.type._formatter;
        a = "" + (b ? b.call(null, null, a) : "");
        b = new i.data.Atom(this, null, a, null, "");
        this.data._atomsBase[this.name] = b
      } else b = ga.call(this.parent || this.linkParent, a);
      this._atomsByKey[""] = this._nullAtom = b;
      this._atoms.unshift(b)
    }
    return b
  }

  function eb() {
    this.owner === this || f.assert("Can only create atoms on an owner dimension.");
    if (!this._virtualNullAtom) {
      this._virtualNullAtom = new i.data.Atom(this, null, "", null, "");
      this.data._atomsBase[this.name] = this._virtualNullAtom
    }
    return this._virtualNullAtom
  }

  function fb() {
    this.owner === this || f.assert("Can only unintern atoms of an owner dimension.");
    var a = this._atoms;
    if (a) {
      for (var b = this._atomsByKey, c = 0, d = a.length; c < d;) {
        var e = a[c];
        if (e.visited) {
          delete e.visited;
          c++
        } else if (e !== this._virtualNullAtom) {
          a.splice(c, 1);
          d--;
          e = e.key;
          delete b[e];
          if (!e) {
            delete this._nullAtom;
            this.data._atomsBase[this.name] = this._virtualNullAtom
          }
        }
      }
      fa.call(this)
    }
  }

  function gb() {
    var a = this._atoms;
    if (a) {
      for (var b = this._atomsByKey, c = 0, d = a.length, e; c < d;) {
        var g = a[c];
        if (g.isVirtual) {
          a.splice(c,
            1);
          d--;
          e = true;
          g = g.key || f.assert("Cannot be the null or virtual null atom.");
          delete b[g]
        } else c++
      }
      e && fa.call(this)
    }
  }

  function fa() {
    this._atomVisibleDatumsCount = this._sumCache = this._visibleAtoms = this._visibleIndexes = null
  }

  function hb(a) {
    ja(this, "_children", a, "parent");
    a.owner = this.owner
  }

  function ib(a) {
    ka(this, "_children", a, "parent")
  }

  function jb(a) {
    ja(this, "_linkChildren", a, "linkParent");
    a.owner = this.owner
  }

  function kb(a) {
    ka(this, "_linkChildren", a, "linkParent")
  }

  function lb(a, b) {
    var c;
    if (!this._disposed &&
      (c = this._atomVisibleDatumsCount)) {
      a = a.atoms[this.name].key;
      f.hasOwn(this._atomsByKey, a) || f.assert("Atom must exist in this dimension.");
      var d = c[a];
      b || d > 0 || f.assert("Must have had accounted for at least one visible datum.");
      c[a] = (d || 0) + (b ? 1 : -1);
      this._visibleAtoms = this._sumCache = this._visibleIndexes = null
    }
  }

  function mb() {
    var a = this._atomVisibleDatumsCount;
    if (!a) {
      a = {};
      this.data.datums(null, {
        visible: true
      }).each(function(b) {
        b = b.atoms[this.name].key;
        a[b] = (a[b] || 0) + 1
      }, this);
      this._atomVisibleDatumsCount = a
    }
    return a
  }

  function nb(a) {
    var b = [];
    this._atoms.forEach(function(c, d) {
      this.isVisible(c) === a && b.push(d)
    }, this);
    return b
  }

  function ob(a) {
    return f.query(this._atoms).where(function(b) {
      return this.isVisible(b) === a
    }, this).array()
  }

  function pb(a, b) {
    this.insertAt(a, b);
    f.lazy(this, "_childrenByKey")[a.key] = a
  }

  function qb(a, b) {
    ja(this, "_linkChildren", a, "linkParent", b)
  }

  function rb(a) {
    ka(this, "_linkChildren", a, "linkParent")
  }

  function la() {
    ia(this._children, "parent");
    this._childrenByKey = null;
    ia(this._linkChildren, "linkParent");
    this._sumAbsCache = this._groupByCache = null
  }

  function Ea() {
    this.isOwner() || f.fail("Can only be called on the owner data.")
  }

  function sb(a, b) {
    !a.isNull || f.assert("Null datums do not notify selected changes");
    b ? this._selectedNotNullDatums.set(a.id, a) : this._selectedNotNullDatums.rem(a.id);
    this._sumAbsCache = null
  }

  function ma(a, b) {
    if (f.hasOwn(this._datumsById, a.id)) {
      !a.isNull || f.assert("Null datums do not notify visible changes");
      b ? this._visibleNotNullDatums.set(a.id, a) : this._visibleNotNullDatums.rem(a.id);
      this._sumAbsCache = null;
      f.eachOwn(this._dimensions, function(c) {
        lb.call(c, a, b)
      });
      this._children.forEach(function(c) {
        ma.call(c, a, b)
      });
      this._linkChildren && this._linkChildren.forEach(function(c) {
        ma.call(c, a, b)
      })
    }
  }

  function tb(a, b) {
    f.string.is(a) || f.fail.argumentInvalid("groupLevelText", "Invalid grouping specification.");
    return f.query(a.split(/\s*\|\s*/)).where(f.truthy).select(function(c) {
      var d = ub.exec(c) || f.fail.argumentInvalid("groupLevelText", "Invalid grouping level syntax '{0}'.", [c]);
      c = d[1];
      d = (d[2] ||
        "").toLowerCase() === "desc";
      return new i.data.GroupingDimensionSpec(c, d, b)
    })
  }

  function na(a, b) {
    function c(s) {
      if (s) {
        var r = s.key;
        if (!f.hasOwnProp.call(j, r)) {
          if (l) {
            var t = f.getOwn(l, r);
            if (t) {
              if (e) return;
              s = t
            }
          }
          j[r] = s;
          r = s.id;
          k[r] = s;
          oa.call(this, s, !!this._dimensions, d);
          if (!s.isNull) {
            h && s.isSelected && h.set(r, s);
            s.isVisible && g.set(r, s)
          }
          return s
        }
      }
    }
    a || f.fail.argumentRequired("newDatums");
    var d = f.get(b, "doAtomGC", false),
      e = f.get(b, "isAdditive", false),
      g = this._visibleNotNullDatums,
      h = this._selectedNotNullDatums,
      j = {},
      l;
    if (b = this._datums) {
      var m = e && d;
      l = f.query(b).uniqueIndex(function(s) {
        m && oa.call(this, s, false, true);
        return s.key
      }, this);
      if (e) this._sumAbsCache = null;
      else {
        la.call(this);
        h && h.clear();
        g.clear()
      }
    } else e = false;
    var k;
    k = e ? this._datumsById : (this._datumsById = {});
    if (f.array.is(a))
      for (var n = 0, o = a.length; n < o;) {
        var p = a[n],
          q = c.call(this, p);
        if (q) {
          if (q !== p) a[n] = q;
          n++
        } else {
          a.splice(n, 1);
          o--
        }
      } else if (a instanceof f.Query) a = a.select(c, this).where(f.notNully).array();
    else throw f.error.argumentInvalid("newDatums", "Argument is of invalid type.");
    d && f.eachOwn(this._dimensions, function(s) {
      fb.call(s)
    });
    if (e) {
      f.array.append(b, a);
      this._linkChildren && this._linkChildren.forEach(function(s) {
        pa.call(s, a)
      })
    } else this._datums = a
  }

  function oa(a, b, c) {
    var d = this._dimensions;
    d || (b = false);
    if (b || c) {
      a = a.atoms;
      for (var e in a) {
        var g = a[e];
        if (b) {
          var h = f.getOwn(d, e) || f.fail.argumentInvalid("Datum has atoms of foreign dimension.");
          Ca.call(h, g)
        }
        if (c) g.visited = true
      }
    }
  }

  function pa(a) {
    a || f.fail.argumentRequired("newDatums");
    var b = this._groupOper;
    if (b) a = b.executeAdd(this,
      a);
    else Fa.call(this, a);
    this._linkChildren && this._linkChildren.forEach(function(c) {
      pa.call(c, a)
    })
  }

  function Fa(a) {
    function b(h) {
      var j = h.id;
      e[j] = h;
      oa.call(this, h, true, false);
      if (!h.isNull) {
        d && h.isSelected && d.set(j, h);
        h.isVisible && c.set(j, h)
      }
      g.push(h)
    }
    var c = this._visibleNotNullDatums,
      d = this._selectedNotNullDatums;
    this._sumAbsCache = null;
    var e = this._datumsById,
      g = this._datums;
    a.forEach(b, this)
  }

  function Ga(a) {
    function b(e) {
      if (e != null) {
        typeof e === "object" || f.fail.invalidArgument("datumFilter");
        var g = {},
          h =
            false;
        for (var j in e) {
          var l = c.call(this, j, e[j]);
          if (l) {
            h = true;
            g[j] = l
          }
        }
        h && d.push(g)
      }
    }

    function c(e, g) {
      var h = this.dimensions(e);
      e = f.query(g).select(function(j) {
        return h.atom(j)
      }).where(f.notNully).distinct(f.propGet("key")).array();
      return e.length ? e : null
    }
    var d = [];
    (a = f.array.as(a)) && a.forEach(b, this);
    return d
  }

  function qa(a, b) {
    var c = f.get(b, "selected"),
      d = f.get(b, "visible"),
      e = f.get(b, "where"),
      g = f.get(b, "isNull");
    if (d != null) a = a.where(function(h) {
      return h.isVisible === d
    });
    if (g != null) a = a.where(function(h) {
      return h.isNull ===
        g
    });
    if (c != null) a = a.where(function(h) {
      return h.isSelected === c
    });
    if (e) a = a.where(e);
    return a
  }

  function Ha(a, b) {
    var c = f.array.as(f.get(b, "orderBy")),
      d = f.create(b || {}, {
        orderBy: null
      });
    return f.query(a).selectMany(function(e, g) {
      if (c) d.orderBy = c[g];
      return vb.call(this, e, d)
    }, this).distinct(f.propGet("id"))
  }

  function vb(a, b) {
    var c = b.orderBy;
    if (c) {
      if (c.indexOf("|") >= 0) throw f.error.argumentInvalid("keyArgs.orderBy", "Multi-dimension order by is not supported.");
    } else c = Object.keys(a).sort().join(",");
    var d = this.groupBy(c,
        b),
      e = d.treeHeight,
      g = [];
    return f.query(function() {
      var h;
      if (this._data) {
        if (this._datumsQuery) {
          this._data || f.assert("Must have a current data");
          g.length || f.assert("Must have a parent data");
          !this._dimAtomsOrQuery || f.assert();
          if (this._datumsQuery.next()) {
            this.item = this._datumsQuery.item;
            return 1
          }
          this._datumsQuery = null;
          h = g.pop();
          this._data = h.data;
          this._dimAtomsOrQuery = h.dimAtomsOrQuery
        }
      } else {
        this._data = d;
        this._dimAtomsOrQuery = f.query(a[d._groupLevelSpec.dimensions[0].name])
      }
      this._dimAtomsOrQuery || f.assert("Invalid programmer");
      this._data || f.assert("Must have a current data");
      var j = g.length;
      do {
        for (; this._dimAtomsOrQuery.next();)
          if ((h = this._data._childrenByKey[this._dimAtomsOrQuery.item.key]) && (j < e - 1 || h._datums.length)) {
            g.push({
              data: this._data,
              dimAtomsOrQuery: this._dimAtomsOrQuery
            });
            this._data = h;
            if (j < e - 1) {
              this._dimAtomsOrQuery = f.query(a[h._groupLevelSpec.dimensions[0].name]);
              j++
            } else {
              this._dimAtomsOrQuery = null;
              this._datumsQuery = f.query(h._datums);
              this._datumsQuery.next();
              this.item = this._datumsQuery.item;
              return 1
            }
          }
        if (!j) return 0;
        h = g.pop();
        this._data = h.data;
        this._dimAtomsOrQuery = h.dimAtomsOrQuery;
        j--
      } while (1);
      return 0
    })
  }

  function wb(a) {
    if (this._renderId !== a) {
      this._renderId = a;
      this.renderState = {}
    }
  }

  function Ia(a) {
    var b;
    if (a && (b = a.ownerScene)) a = b;
    if (this._active !== a) {
      this._active && Ja.call(this._active, false);
      (this._active = a || null) && Ja.call(this._active, true);
      return true
    }
    return false
  }

  function Ja(a) {
    if (this.isActive !== a)
      if (a) this.isActive = true;
      else delete this.isActive
  }

  function xb(a, b) {
    return function() {
      var c = this.vars[a];
      if (c ===
        undefined) {
        c = this[b]();
        if (c === undefined) c = null;
        this.vars[a] = c
      }
      return c
    }
  }

  function Ka(a, b) {
    this.event = b || u.event;
    this.pvMark = a;
    var c;
    if (a) {
      if (this.sign = a.sign || null) c = a.instance().data;
      if (c) this.index = c.childIndex();
      else {
        this.index = null;
        c = new i.visual.Scene(null, {
          panel: this.panel
        })
      }
    } else {
      this.index = this.sign = null;
      c = new i.visual.Scene(null, {
        panel: this.panel,
        source: this.chart.root.data
      })
    }
    this.scene = c
  }

  function yb(a) {
    var b = zb(a) || f.assert("There must exist an ancestor sign");
    b = new i.visual.BasicSign(b.panel,
      a);
    var c = a.scene,
      d, e;
    if (c && (d = a.index) != null && d >= 0 && (e = c[d])) b._inContext(e.data, e);
    return b
  }

  function zb(a) {
    var b;
    do a = a.parent; while (a && !(b = a.sign) && (!a.proto || !(b = a.proto.sign)));
    return b
  }

  function La(a) {
    return a.isDiscrete() ? "discrete" : a.firstDimensionValueType() === Date ? "timeSeries" : "numeric"
  }

  function Ab(a, b) {
    return i.parseDomainScope(a, b.orientation)
  }

  function Bb(a) {
    if (a) {
      if (f.hasOwn(F.namesSet, a)) return i.BasePanel[this.orientation === "y" ? "horizontalAlign" : "verticalAlign2"][a];
      i.debug >= 2 && i.log(f.format("Invalid axis position value '{0}'.", [a]))
    }
    return this.orientation === "x" ? "bottom" : "left"
  }

  function Ma(a) {
    var b = this.option("Position");
    return M.toOrtho(a, b)
  }

  function Na(a) {
    var b = this.option("Position");
    return M.to(a, {
      singleProp: i.BasePanel.orthogonalLength[b]
    })
  }

  function Cb(a) {
    var b;
    if (a) {
      var c;
      f.eachOwn(a, function(d, e) {
        c = true;
        a[e] = u.color(d)
      });
      if (c) b = a
    }
    return b
  }

  function Db() {
    var a;
    if (a = this.scaleType)
      if (a === "discrete")
        if (this.index === 0) a = i.createColorScheme();
        else {
          var b = this;
          a = function() {
            return b.chart._getRoleColorScale(b.role.name)
          }
        } else {
        ra ||
        (ra = ["red", "yellow", "green"].map(u.color));
        a = ra.slice()
      } else a = i.createColorScheme();
    return a
  }

  function Oa(a) {
    if (!f.object.is(a)) {
      var b = this.option("Position");
      a = (new M).setSize(a, {
        singleProp: i.BasePanel.orthogonalLength[b]
      })
    }
    return a
  }

  function Eb(a) {
    var b = this.option("Position");
    return i.parseAlign(b, a)
  }

  function Fb(a) {
    if (this.name === "trend") return null;
    var b = this.option("TrendType");
    if (!b && a) b = a.type;
    if (!b || b === "none") return null;
    a = a ? Object.create(a) : {};
    a.type = b;
    b = this.option("TrendLabel");
    if (b !==
      undefined) a.label = b;
    return a
  }

  function sa(a, b) {
    return {
      resolveV1: function(c) {
        if (this.globalIndex === 0) {
          this._specifyChartOption(c, "show" + a) || c.defaultValue(b);
          return true
        }
      }
    }
  }

  function Pa(a) {
    return {
      resolveV1: function(b) {
        this._specifyChartOption(b, "show" + a);
        return true
      }
    }
  }
  var i = f.globalSpace("pvc", {
    debug: 0
  });
  (function() {
    if (typeof window.location !== "undefined") {
      var a = window.location.href;
      if (a && /\bdebug=true\b/.test(a)) {
        a = /\bdebugLevel=(\d+)/.exec(a);
        i.debug = a ? +a[1] : 3
      }
    }
  })();
  var O = u.Mark;
  i.invisibleFill = "rgba(127,127,127,0.00001)";
  i.logSeparator = "------------------------------------------";
  var Gb = Array.prototype.slice;
  i.setDebug = function(a) {
    a = +a;
    i.debug = isNaN(a) ? 0 : a;
    Ra();
    Sa();
    return i.debug
  };
  i.setDebug(i.debug);
  i.defaultCompatVersion = function(a) {
    var b = i.BaseChart.prototype.defaults;
    if (a != null) return b.compatVersion = a;
    return b.compatVersion
  };
  i.cloneMatrix = function(a) {
    return a.map(function(b) {
      return b.slice()
    })
  };
  i.stringify = function(a, b) {
    var c = f.get(b, "maxLevel") || 5,
      d = [];
    i.stringifyRecursive(d, a, c, b);
    return d.join("")
  };
  i.stringifyRecursive =
    function(a, b, c, d) {
      if (c > 0) {
        c--;
        switch (typeof b) {
          case "undefined":
            return a.push("undefined");
          case "object":
            if (!b) {
              a.push("null");
              return true
            }
            if (f.fun.is(b.stringify)) return b.stringify(a, c, d);
            if (b instanceof Array) {
              a.push("[");
              b.forEach(function(j, l) {
                l && a.push(", ");
                i.stringifyRecursive(a, j, c, d) || a.pop()
              });
              a.push("]")
            } else {
              var e = f.get(d, "ownOnly", true);
              if (b === f.global) {
                a.push("<window>");
                return true
              }
              if (f.fun.is(b.cloneNode)) {
                a.push("<dom #" + (b.id || b.name || "?") + ">");
                return true
              }
              if (c > 1 && b.constructor !==
                Object) {
                c = 1;
                e = true
              }
              a.push("{");
              var g = true;
              for (var h in b)
                if (!e || f.hasOwnProp.call(b, h)) {
                  g || a.push(", ");
                  a.push(h + ": ");
                  if (i.stringifyRecursive(a, b[h], c, d)) {
                    if (g) g = false
                  } else {
                    a.pop();
                    g || a.pop()
                  }
                }
              if (g) {
                b = "" + b;
                b !== "[object Object]" && a.push("{" + b + "}")
              }
              a.push("}")
            }
            return true;
          case "number":
            a.push("" + Math.round(1E5 * b) / 1E5);
            return true;
          case "boolean":
            a.push("" + b);
            return true;
          case "string":
            a.push(JSON.stringify(b));
            return true;
          case "function":
            if (f.get(d, "funs", false)) {
              a.push(JSON.stringify(b.toString().substr(0,
                13) + "..."));
              return true
            }
            return false
        }
        a.push("'new ???'");
        return true
      }
    };
  i.orientation = {
    vertical: "vertical",
    horizontal: "horizontal"
  };
  i.extensionTag = "extension";
  i.extendType = function(a, b, c) {
    if (b) {
      var d, e = a.prototype._vars,
        g = function(h, j) {
          if (h !== undefined) {
            d || (d = {});
            if (e && e[j]) j = "_" + j + "EvalCore";
            d[j] = f.fun.to(h)
          }
        };
      c ? c.forEach(function(h) {
        g(b[h], h)
      }) : f.each(g);
      d && a.add(d)
    }
  };
  u.Color.prototype.stringify = function(a, b, c) {
    return i.stringifyRecursive(a, this.key, b, c)
  };
  O.prototype.hasDelegateValue = function(a,
                                          b) {
    var c = this.$propertiesMap[a];
    if (c) return !b || c.tag === b;
    if (this.proto) return this.proto.hasDelegateValue(a, b);
    return false
  };
  i.defaultColorScheme = null;
  i.brighterColorTransform = function(a) {
    return (a.rgb ? a : u.color(a)).brighter(0.6)
  };
  i.setDefaultColorScheme = function(a) {
    return i.defaultColorScheme = i.colorScheme(a)
  };
  i.defaultColor = u.Colors.category10()("?");
  i.colorScheme = function(a) {
    if (a == null) return null;
    if (typeof a === "function") {
      if (!a.hasOwnProperty("range")) return a;
      a = a.range()
    } else a = f.array.as(a);
    if (!a.length) return null;
    return function() {
      var b = u.colors(a);
      b.domain.apply(b, arguments);
      return b
    }
  };
  i.createColorScheme = function(a) {
    return i.colorScheme(a) || i.defaultColorScheme || u.Colors.category10
  };
  i.toGrayScale = function(a, b, c, d) {
    a = u.color(a);
    var e = 0.299 * a.r + 0.587 * a.g + 0.114 * a.b;
    if (c === undefined) c = 200;
    else if (c == null) c = 255;
    if (d === undefined) d = 30;
    else if (d == null) d = 0;
    var g = c - d;
    e = g <= 0 ? c : d + e / 255 * g;
    if (b == null) b = a.opacity;
    else if (b < 0) b = -b * a.opacity;
    e = Math.round(e);
    return u.rgb(e, e, e, b)
  };
  i.removeTipsyLegends =
    function() {
      try {
        $(".tipsy").remove()
      } catch (a) {}
    };
  i.createDateComparer = function(a, b) {
    if (!b) b = u.identity;
    return function(c, d) {
      return a.parse(b(c)) - a.parse(b(d))
    }
  };
  i.time = {
    intervals: {
      y: 31536E6,
      m: 2592E6,
      d30: 2592E6,
      w: 6048E5,
      d7: 6048E5,
      d: 864E5,
      h: 36E5,
      M: 6E4,
      s: 1E3,
      ms: 1
    },
    withoutTime: function(a) {
      return new Date(a.getFullYear(), a.getMonth(), a.getDate())
    },
    weekday: {
      previousOrSelf: function(a, b) {
        if (b = a.getDay() - b) a = new Date(a - (b < 0 ? 7 + b : b) * i.time.intervals.d);
        return a
      },
      nextOrSelf: function(a, b) {
        if (b = a.getDay() - b) a = new Date(a +
          (b > 0 ? 7 - b : -b) * i.time.intervals.d);
        return a
      },
      closestOrSelf: function(a, b) {
        if (b = a.getDay() - b) {
          var c = i.time.intervals.d,
            d = b > 0 ? 1 : -1;
          b = Math.abs(b);
          a = b >= 4 ? new Date(a.getTime() + d * (7 - b) * c) : new Date(a.getTime() - d * b * c)
        }
        return a
      }
    }
  };
  u.Format.createParser = function(a) {
    function b(c) {
      return a.parse(c)
    }
    return b
  };
  u.Format.createFormatter = function(a) {
    function b(c) {
      return c != null ? a.format(c) : ""
    }
    return b
  };
  i.buildTitleFromName = function(a) {
    return f.firstUpperCase(a).replace(/([a-z\d])([A-Z])/, "$1 $2")
  };
  i.buildIndexedId = function(a,
                              b) {
    if (b > 0) return a + "" + (b + 1);
    return a
  };
  i.splitIndexedId = function(a) {
    a = /^(.*?)(\d*)$/.exec(a);
    var b = null;
    if (a[2]) {
      b = Number(a[2]);
      if (b <= 1) b = 1;
      else b--
    }
    return [a[1], b]
  };
  var Hb = [null];
  i.makeExtensionAbsId = function(a, b) {
    if (!a) return b;
    return f.query(b || Hb).selectMany(function(c) {
      return f.query(a).select(function(d) {
        return Ta(d, c)
      })
    }).where(f.truthy).array()
  };
  i.makeEnumParser = function(a, b, c) {
    var d = {};
    b.forEach(function(e) {
      if (e) d[e.toLowerCase()] = e
    });
    if (c) c = c.toLowerCase();
    return function(e) {
      if (e) e = ("" + e).toLowerCase();
      if (!f.hasOwn(d, e)) {
        e && i.debug >= 2 && i.log("[Warning] Invalid '" + a + "' value: '" + e + "'. Assuming '" + c + "'.");
        e = c
      }
      return e
    }
  };
  i.parseDistinctIndexArray = function(a, b, c) {
    a = f.array.as(a);
    if (a == null) return null;
    if (b == null) b = 0;
    if (c == null) c = Infinity;
    a = f.query(a).select(function(d) {
      return +d
    }).where(function(d) {
      return !isNaN(d) && d >= b && d <= c
    }).distinct().array();
    return a.length ? a : null
  };
  i.parseLegendClickMode = i.makeEnumParser("legendClickMode", ["toggleSelected", "toggleVisible", "none"], "toggleVisible");
  i.parseTooltipAutoContent =
    i.makeEnumParser("tooltipAutoContent", ["summary", "value"], "value");
  i.parseSelectionMode = i.makeEnumParser("selectionMode", ["rubberBand", "focusWindow"], "rubberBand");
  i.parseClearSelectionMode = i.makeEnumParser("clearSelectionMode", ["emptySpaceClick", "manual"], "emptySpaceClick");
  i.parseShape = i.makeEnumParser("shape", ["square", "circle", "diamond", "triangle", "cross", "bar"], null);
  i.parseTreemapColorMode = i.makeEnumParser("colorMode", ["byParent", "bySelf"], "byParent");
  i.parseTreemapLayoutMode = i.makeEnumParser("layoutMode", ["squarify", "slice-and-dice", "slice", "dice"], "squarify");
  i.parseContinuousColorScaleType = function(a) {
    if (a) {
      a = ("" + a).toLowerCase();
      switch (a) {
        case "linear":
        case "normal":
        case "discrete":
          break;
        default:
          i.debug >= 2 && i.log("[Warning] Invalid 'ScaleType' option value: '" + a + "'.");
          a = null;
          break
      }
    }
    return a
  };
  i.parseDomainScope = function(a, b) {
    if (a) {
      a = ("" + a).toLowerCase();
      switch (a) {
        case "cell":
        case "global":
          break;
        case "section":
          if (!b) throw f.error.argumentRequired("orientation");
          a = b === "y" ? "row" : "column";
          break;
        case "column":
        case "row":
          if (b &&
            b !== (a === "row" ? "y" : "x")) {
            a = "section";
            i.debug >= 2 && i.log("[Warning] Invalid 'DomainScope' option value: '" + a + "' for the orientation: '" + b + "'.")
          }
          break;
        default:
          i.debug >= 2 && i.log("[Warning] Invalid 'DomainScope' option value: '" + a + "'.");
          a = null;
          break
      }
    }
    return a
  };
  i.parseDomainRoundingMode = function(a) {
    if (a) {
      a = ("" + a).toLowerCase();
      switch (a) {
        case "none":
        case "nice":
        case "tick":
          break;
        default:
          i.debug >= 2 && i.log("[Warning] Invalid 'DomainRoundMode' value: '" + a + "'.");
          a = null;
          break
      }
    }
    return a
  };
  i.parseOverlappedLabelsMode =
    function(a) {
      if (a) {
        a = ("" + a).toLowerCase();
        switch (a) {
          case "leave":
          case "hide":
          case "rotatethenhide":
            break;
          default:
            i.debug >= 2 && i.log("[Warning] Invalid 'OverlappedLabelsMode' option value: '" + a + "'.");
            a = null;
            break
        }
      }
      return a
    };
  i.castNumber = function(a) {
    if (a != null) {
      a = +a;
      if (isNaN(a)) a = null
    }
    return a
  };
  i.parseWaterDirection = function(a) {
    if (a) {
      a = ("" + a).toLowerCase();
      switch (a) {
        case "up":
        case "down":
          return a
      }
      i.debug >= 2 && i.log("[Warning] Invalid 'WaterDirection' value: '" + a + "'.")
    }
  };
  i.parseTrendType = function(a) {
    if (a) {
      a =
        ("" + a).toLowerCase();
      if (a === "none") return a;
      if (i.trends.has(a)) return a;
      i.debug >= 2 && i.log("[Warning] Invalid 'TrendType' value: '" + a + "'.")
    }
  };
  i.parseNullInterpolationMode = function(a) {
    if (a) {
      a = ("" + a).toLowerCase();
      switch (a) {
        case "none":
        case "linear":
        case "zero":
          return a
      }
      i.debug >= 2 && i.log("[Warning] Invalid 'NullInterpolationMode' value: '" + a + "'.")
    }
  };
  i.parseAlign = function(a, b) {
    if (b) b = ("" + b).toLowerCase();
    var c;
    if (a === "left" || a === "right") {
      a = b && i.BasePanel.verticalAlign[b];
      if (!a) {
        a = "middle";
        c = !!b
      }
    } else {
      a =
        b && i.BasePanel.horizontalAlign[b];
      if (!a) {
        a = "center";
        c = !!b
      }
    }
    c && i.debug >= 2 && i.log(f.format("Invalid alignment value '{0}'. Assuming '{1}'.", [b, a]));
    return a
  };
  i.parseAnchor = function(a) {
    if (a) {
      a = ("" + a).toLowerCase();
      switch (a) {
        case "top":
        case "left":
        case "center":
        case "bottom":
        case "right":
          return a
      }
      i.debug >= 2 && i.log(f.format("Invalid anchor value '{0}'.", [a]))
    }
  };
  i.parseAnchorWedge = function(a) {
    if (a) {
      a = ("" + a).toLowerCase();
      switch (a) {
        case "outer":
        case "inner":
        case "center":
        case "start":
        case "end":
          return a
      }
      i.debug >=
        2 && i.log(f.format("Invalid wedge anchor value '{0}'.", [a]))
    }
  };
  i.unionExtents = function(a, b) {
    if (a) {
      if (b) {
        if (b.min < a.min) a.min = b.min;
        if (b.max > a.max) a.max = b.max
      }
    } else {
      if (!b) return null;
      a = {
        min: b.min,
        max: b.max
      }
    }
    return a
  };
  var F = i.Sides = function(a) {
    a != null && this.setSides(a)
  };
  F.hnames = "left right".split(" ");
  F.vnames = "top bottom".split(" ");
  F.names = "left right top bottom".split(" ");
  F.namesSet = u.dict(F.names, f.retTrue);
  i.parsePosition = function(a, b) {
    if (a) {
      a = ("" + a).toLowerCase();
      if (!f.hasOwn(F.namesSet, a)) {
        var c =
          b || "left";
        i.debug >= 2 && i.log(f.format("Invalid position value '{0}. Assuming '{1}'.", [a, c]));
        a = c
      }
    }
    return a || b || "left"
  };
  F.as = function(a) {
    if (a != null && !(a instanceof F)) a = (new F).setSides(a);
    return a
  };
  F.prototype.stringify = function(a, b, c) {
    return i.stringifyRecursive(a, f.copyOwn(this), b, c)
  };
  F.prototype.setSides = function(a) {
    if (typeof a === "string") {
      var b = a.split(/\s+/).map(function(c) {
        return L.parse(c)
      });
      switch (b.length) {
        case 1:
          this.set("all", b[0]);
          return this;
        case 2:
          this.set("top", b[0]);
          this.set("left",
            b[1]);
          this.set("right", b[1]);
          this.set("bottom", b[0]);
          return this;
        case 3:
          this.set("top", b[0]);
          this.set("left", b[1]);
          this.set("right", b[1]);
          this.set("bottom", b[2]);
          return this;
        case 4:
          this.set("top", b[0]);
          this.set("right", b[1]);
          this.set("bottom", b[2]);
          this.set("left", b[3]);
          return this;
        case 0:
          return this
      }
    } else if (typeof a === "number") {
      this.set("all", a);
      return this
    } else if (typeof a === "object") {
      if (a instanceof L) this.set("all", a);
      else {
        this.set("all", a.all);
        for (b in a) b !== "all" && F.namesSet.hasOwnProperty(b) &&
        this.set(b, a[b])
      }
      return this
    }
    i.debug && i.log("Invalid 'sides' value: " + i.stringify(a));
    return this
  };
  F.prototype.set = function(a, b) {
    b = L.parse(b);
    if (b != null)
      if (a === "all") F.names.forEach(function(c) {
        this[c] = b
      }, this);
      else if (f.hasOwn(F.namesSet, a)) this[a] = b
  };
  F.prototype.resolve = function(a, b) {
    if (typeof a === "object") {
      b = a.height;
      a = a.width
    }
    var c = {};
    F.names.forEach(function(d) {
      var e = 0,
        g = this[d];
      if (g != null) e = typeof g === "number" ? g : g.resolve(d === "left" || d === "right" ? a : b);
      c[d] = e
    }, this);
    return F.updateSize(c)
  };
  F.updateSize =
    function(a) {
      a.width = (a.left || 0) + (a.right || 0);
      a.height = (a.bottom || 0) + (a.top || 0);
      return a
    };
  F.resolvedMax = function(a, b) {
    var c = {};
    F.names.forEach(function(d) {
      c[d] = Math.max(a[d] || 0, b[d] || 0)
    });
    return c
  };
  F.inflate = function(a, b) {
    var c = {};
    F.names.forEach(function(d) {
      c[d] = (a[d] || 0) + b
    });
    return F.updateSize(c)
  };
  var L = i.PercentValue = function(a) {
    this.percent = a
  };
  L.prototype.resolve = function(a) {
    return this.percent * a
  };
  L.parse = function(a) {
    if (a != null && a !== "") {
      switch (typeof a) {
        case "number":
          return a;
        case "string":
          var b =
            a.match(/^(.+?)\s*(%)?$/);
          if (b) {
            var c = +b[1];
            if (!isNaN(c))
              if (b[2]) {
                if (c >= 0) return new L(c / 100)
              } else return c
          }
          break;
        case "object":
          if (a instanceof L) return a;
          break
      }
      i.debug && i.log(f.format("Invalid margins component '{0}'", ["" + a]))
    }
  };
  L.resolve = function(a, b) {
    return a instanceof L ? a.resolve(b) : a
  };
  var Ib = O.prototype.renderCore,
    Qa = O.prototype.zOrder;
  O.prototype.zOrder = function(a) {
    var b = this.borderPanel;
    if (b && b !== this) return Qa.call(b, a);
    return Qa.call(this, a)
  };
  O.prototype.renderCore = function() {
    var a = this.root;
    a._renderId = (a._renderId || 0) + 1;
    i.debug >= 25 && i.log("BEGIN RENDER " + a._renderId);
    Ib.call(this);
    i.debug >= 25 && i.log("END RENDER " + a._renderId)
  };
  O.prototype.renderId = function() {
    return this.root._renderId
  };
  O.prototype.wrapper = function(a) {
    this._wrapper = a;
    return this
  };
  O.prototype.wrap = function(a, b) {
    if (a && f.fun.is(a) && this._wrapper && !a._cccWrapped) {
      a = this._wrapper(a, b);
      a._cccWrapped = true
    }
    return a
  };
  O.prototype.lock = function(a, b) {
    b !== undefined && this[a](b);
    (this._locked || (this._locked = {}))[a] = true;
    return this
  };
  O.prototype.isIntercepted = function(a) {
    return this._intercepted && this._intercepted[a]
  };
  O.prototype.isLocked = function(a) {
    return this._locked && this._locked[a]
  };
  O.prototype.ensureEvents = function(a) {
    var b = this.propertyValue("events", true);
    if (!b || b === "none") this.events(a || "all");
    return this
  };
  O.prototype.addMargin = function(a, b) {
    if (b !== 0) {
      var c = f.nullyTo(this.propertyValue(a), 0),
        d = u.functor(c);
      this[a](function() {
        return b + d.apply(this, Gb.call(arguments))
      })
    }
    return this
  };
  O.prototype.addMargins = function(a) {
    var b =
      f.get(a, "all", 0);
    this.addMargin("left", f.get(a, "left", b));
    this.addMargin("right", f.get(a, "right", b));
    this.addMargin("top", f.get(a, "top", b));
    this.addMargin("bottom", f.get(a, "bottom", b));
    return this
  };
  O.prototype.eachInstanceWithData = function(a, b) {
    this.eachInstance(function(c, d, e) {
      c.mark.sign && c[d].data && a.call(b, c, d, e)
    })
  };
  O.prototype.eachSceneWithDataOnRect = function(a, b, c, d) {
    function e(l, m) {
      if (l.intersectsRect(a))(l = m.data) && l.datum && b.call(c, l)
    }
    var g = this,
      h = g.sign;
    if (!(h && !h.selectable())) {
      if (d == null) d =
        g.rubberBandSelectionMode || "partial";
      var j = d === "center";
      g.eachInstanceWithData(function(l, m, k) {
        var n = g.getShape(l, m, 0.15);
        n = (j ? n.center() : n).apply(k);
        e(n, l[m], m)
      })
    }
  };
  O.prototype.eachDatumOnRect = function(a, b, c, d) {
    function e(l, m) {
      if (l.intersectsRect(a))(l = m.data) && l.datum && l.datums().each(function(k) {
        k.isNull || b.call(c, k)
      })
    }
    var g = this,
      h = g.sign;
    if (!(h && !h.selectable())) {
      if (d == null) d = g.rubberBandSelectionMode || "partial";
      var j = d === "center";
      g.eachInstanceWithData(function(l, m, k) {
        var n = g.getShape(l, m, 0.15);
        n = (j ? n.center() : n).apply(k);
        e(n, l[m], m)
      })
    }
  };
  u.Transform.prototype.transformHPosition = function(a) {
    return this.x + this.k * a
  };
  u.Transform.prototype.transformVPosition = function(a) {
    return this.y + this.k * a
  };
  u.Transform.prototype.transformLength = function(a) {
    return this.k * a
  };
  var M = f.type("pvc.Size").init(function(a, b) {
    if (arguments.length === 1) a != null && this.setSize(a);
    else {
      if (a != null) this.width = a;
      if (b != null) this.height = b
    }
  }).add({
    stringify: function(a, b, c) {
      return i.stringifyRecursive(a, f.copyOwn(this), b, c)
    },
    setSize: function(a,
                      b) {
      if (typeof a === "string") {
        var c = a.split(/\s+/).map(function(d) {
          return L.parse(d)
        });
        switch (c.length) {
          case 1:
            this.set(f.get(b, "singleProp", "all"), c[0]);
            return this;
          case 2:
            this.set("width", c[0]);
            this.set("height", c[1]);
            return this;
          case 0:
            return this
        }
      } else if (typeof a === "number") {
        this.set(f.get(b, "singleProp", "all"), a);
        return this
      } else if (typeof a === "object") {
        if (a instanceof L) this.set(f.get(b, "singleProp", "all"), a);
        else {
          this.set("all", a.all);
          for (c in a) c !== "all" && this.set(c, a[c])
        }
        return this
      }
      i.debug &&
      i.log("Invalid 'size' value: " + i.stringify(a));
      return this
    },
    set: function(a, b) {
      if (b != null && (a === "all" || f.hasOwn(M.namesSet, a))) {
        b = L.parse(b);
        if (b != null)
          if (a === "all") M.names.forEach(function(c) {
            this[c] = b
          }, this);
          else this[a] = b
      }
      return this
    },
    clone: function() {
      return new M(this.width, this.height)
    },
    intersect: function(a) {
      return new M(Math.min(this.width, a.width), Math.min(this.height, a.height))
    },
    resolve: function(a) {
      var b = {};
      M.names.forEach(function(c) {
        var d = this[c];
        if (d != null)
          if (typeof d === "number") b[c] = d;
          else if (a) {
            var e = a[c];
            if (e != null) b[c] = d.resolve(e)
          }
      }, this);
      return b
    }
  });
  M.names = ["width", "height"];
  M.namesSet = u.dict(M.names, f.retTrue);
  M.toOrtho = function(a, b) {
    if (a != null) {
      var c;
      if (b) c = i.BasePanel.orthogonalLength[b];
      a = M.to(a, {
        singleProp: c
      });
      b && delete a[i.BasePanel.oppositeLength[c]]
    }
    return a
  };
  M.to = function(a, b) {
    if (a != null && !(a instanceof M)) a = (new M).setSize(a, b);
    return a
  };
  var X = f.type("pvc.Offset").init(function(a, b) {
    if (arguments.length === 1) a != null && this.setOffset(a);
    else {
      if (a != null) this.x = a;
      if (b !=
        null) this.y = b
    }
  }).add({
    stringify: function(a, b, c) {
      return i.stringifyRecursive(a, f.copyOwn(this), b, c)
    },
    setOffset: function(a, b) {
      if (typeof a === "string") {
        var c = a.split(/\s+/).map(function(d) {
          return L.parse(d)
        });
        switch (c.length) {
          case 1:
            this.set(f.get(b, "singleProp", "all"), c[0]);
            return this;
          case 2:
            this.set("x", c[0]);
            this.set("y", c[1]);
            return this;
          case 0:
            return this
        }
      } else if (typeof a === "number") {
        this.set(f.get(b, "singleProp", "all"), a);
        return this
      } else if (typeof a === "object") {
        this.set("all", a.all);
        for (c in a) c !==
          "all" && this.set(c, a[c]);
        return this
      }
      i.debug && i.log("Invalid 'offset' value: " + i.stringify(a));
      return this
    },
    set: function(a, b) {
      if (b != null && f.hasOwn(X.namesSet, a)) {
        b = L.parse(b);
        if (b != null)
          if (a === "all") X.names.forEach(function(c) {
            this[c] = b
          }, this);
          else this[a] = b
      }
    },
    resolve: function(a) {
      var b = {};
      M.names.forEach(function(c) {
        var d = X.namesSizeToOffset[c],
          e = this[d];
        if (e != null)
          if (typeof e === "number") b[d] = e;
          else if (a) {
            c = a[c];
            if (c != null) b[d] = e.resolve(c)
          }
      }, this);
      return b
    }
  });
  X.addStatic({
    names: ["x", "y"]
  }).addStatic({
    namesSet: u.dict(X.names,
      f.retTrue),
    namesSizeToOffset: {
      width: "x",
      height: "y"
    },
    namesSidesToOffset: {
      left: "x",
      right: "x",
      top: "y",
      bottom: "y"
    },
    as: function(a) {
      if (a != null && !(a instanceof X)) a = (new X).setOffset(a);
      return a
    }
  });
  (function() {
    jQuery.support.svg = jQuery.support.svg || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")
  })(jQuery);
  i.text = {
    getFitInfo: function(a, b, c, d, e) {
      if (c === "") return {
        h: true,
        v: true,
        d: true
      };
      c = u.Text.measure(c, d).width;
      return {
        h: c <= a,
        v: c <= b,
        d: c <= Math.sqrt(a * a + b * b) - e
      }
    },
    trimToWidthB: function(a, b, c, d, e) {
      a -= u.Text.measure(d, c).width;
      return i.text.trimToWidth(a, b, c, d, e)
    },
    trimToWidth: function(a, b, c, d, e) {
      if (b === "") return b;
      var g = u.Text.measure(b, c).width;
      if (g <= a) return b;
      if (g > a * 1.5) return i.text.trimToWidthBin(a, b, c, d, e);
      for (; g > a;) {
        b = e ? b.slice(1) : b.slice(0, b.length - 1);
        g = u.Text.measure(b, c).width
      }
      return e ? d + b : b + d
    },
    trimToWidthBin: function(a, b, c, d, e) {
      for (var g = b.length, h = g - 2, j = 0, l, m; j <= h && h > 0;) {
        l = Math.ceil((j + h) / 2);
        var k = e ? b.slice(g - l) : b.slice(0, l);
        m = u.Text.measure(k, c).width;
        if (m > a) h = l - 1;
        else if (u.Text.measure(e ? b.slice(g - l - 1) : b.slice(0, l + 1), c).width < a) j = l + 1;
        else return e ? d + k : k + d
      }
      return e ? d + b.slice(g - h) : b.slice(0, h) + d
    },
    justify: function(a, b, c) {
      var d = [];
      if (b < u.Text.measure("a", c).width) return d;
      a = (a || "").split(/\s+/);
      for (var e = ""; a.length;) {
        var g = a.shift();
        if (g) {
          var h = e ? e + " " + g : g;
          if (u.Text.measure(h, c).width > b) {
            e && d.push(e);
            e = g
          } else e = h
        }
      }
      e && d.push(e);
      return d
    },
    getLabelBBox: function(a, b, c, d, e, g) {
      b = u.Label.getPolygon(a, b, c, d, e, g);
      d = b.bbox();
      d.source = b;
      d.sourceAngle = e;
      d.sourceAlign =
        c;
      d.sourceTextWidth = a;
      return d
    }
  };
  i.color = {
    scale: ya,
    scales: xa,
    toGray: i.toGrayScale,
    isGray: wa
  };
  f.type("pvc.color.ScalesBuild").init(function(a) {
    this.keyArgs = a;
    this.data = a.data || f.fail.argumentRequired("keyArgs.data");
    this.domainDimName = a.colorDimension || f.fail.argumentRequired("keyArgs.colorDimension");
    this.domainDim = this.data.dimensions(this.domainDimName);
    var b = this.domainDim.type;
    if (b.isComparable) this.domainComparer = function(c, d) {
      return b.compare(c, d)
    };
    else {
      this.domainComparer = null;
      i.log("Color value dimension should be comparable. Generated color scale may be invalid.")
    }
    this.nullRangeValue =
      a.colorMissing ? u.color(a.colorMissing) : u.Color.transparent;
    this.domainRangeCountDif = 0
  }).add({
    build: function() {
      this.range = this._getRange();
      this.desiredDomainCount = this.range.length + this.domainRangeCountDif;
      return this._createScale(this._getDomain())
    },
    buildMap: function() {
      this.range = this._getRange();
      this.desiredDomainCount = this.range.length + this.domainRangeCountDif;
      var a;
      if (this.keyArgs.normPerBaseCategory) a = function(b) {
        return this._createScale(this._ensureDomain(null, false, b))
      };
      else {
        a = this._createScale(this._getDomain());
        a = f.fun.constant(a)
      }
      return this._createCategoryScalesMap(a)
    },
    _createScale: f.method({
      isAbstract: true
    }),
    _createCategoryScalesMap: function(a) {
      return this.data.children().object({
        name: function(b) {
          return b.absKey
        },
        value: a,
        context: this
      })
    },
    _getRange: function() {
      var a = this.keyArgs,
        b = a.colors || ["red", "yellow", "green"];
      if (a.colorMin != null && a.colorMax != null) b = [a.colorMin, a.colorMax];
      else if (a.colorMin != null) b.unshift(a.colorMin);
      else a.colorMax != null && b.push(a.colorMax);
      return b.map(function(c) {
        return u.color(c)
      })
    },
    _getDataExtent: function(a) {
      var b = a.dimensions(this.domainDimName).extent({
        visible: true
      });
      if (!b) return null;
      a = b.min.value;
      b = b.max.value;
      if (b == a)
        if (b >= 1) a = b - 1;
        else b = a + 1;
      return {
        min: a,
        max: b
      }
    },
    _getDomain: function() {
      var a = this.keyArgs.colorDomain;
      if (a != null) {
        this.domainComparer && a.sort(this.domainComparer);
        if (a.length > this.desiredDomainCount) a = a.slice(0, this.desiredDomainCount)
      } else a = [];
      return this._ensureDomain(a, true, this.data)
    },
    _ensureDomain: function(a, b, c) {
      var d;
      if (a && b) {
        b = this.desiredDomainCount -
          a.length;
        if (b > 0)
          if (d = this._getDataExtent(c)) switch (b) {
            case 1:
              this.domainComparer ? f.array.insert(a, d.max, this.domainComparer) : a.push(d.max);
              break;
            case 2:
              if (this.domainComparer) {
                f.array.insert(a, d.min, this.domainComparer);
                f.array.insert(a, d.max, this.domainComparer)
              } else {
                a.unshift(d.min);
                a.push(d.max)
              }
              break;
            default:
              i.debug >= 2 && i.log("Ignoring option 'colorDomain' due to unsupported length." + f.format(" Should have '{0}', but instead has '{1}'.", [this.desiredDomainCount, a.length]));
              a = null
          }
      }
      if (!a) {
        d || (d =
          this._getDataExtent(c));
        if (d) {
          a = d.min;
          d = d.max;
          c = (d - a) / (this.desiredDomainCount - 1);
          a = u.range(a, d + c, c)
        }
      }
      return a
    }
  });
  f.type("pvc.color.LinearScalesBuild", i.color.ScalesBuild).add({
    _createScale: function(a) {
      var b = u.Scale.linear();
      a && b.domain.apply(b, a);
      b.range.apply(b, this.range);
      return b
    }
  });
  f.type("pvc.color.DiscreteScalesBuild", i.color.ScalesBuild).init(function(a) {
    this.base(a);
    this.domainRangeCountDif = 1
  }).add({
    _createScale: function(a) {
      function b(h) {
        if (h == null) return e;
        for (var j = 0; j < c; j++)
          if (h <= a[j +
            1]) return d[j];
        return d[g]
      }
      var c = a.length - 1,
        d = this.range,
        e = this.nullRangeValue,
        g = d.length - 1;
      f.copy(b, u.Scale.common);
      b.domain = function() {
        return a
      };
      b.range = function() {
        return d
      };
      return b
    }
  });
  f.space("pvc.trends", function(a) {
    var b = {};
    f.set(a, "define", function(c, d) {
      c || f.fail.argumentRequired("type");
      d || f.fail.argumentRequired("trendSpec");
      f.object.is(d) || f.fail.argumentInvalid("trendSpec", "Must be a trend specification object.");
      c = ("" + c).toLowerCase();
      i.debug >= 2 && f.hasOwn(b, c) && i.log(f.format("[WARNING] A trend type with the name '{0}' is already defined.", [c]));
      var e = d.label || f.fail.argumentRequired("trendSpec.label");
      d = d.model || f.fail.argumentRequired("trendSpec.model");
      f.fun.is(d) || f.fail.argumentInvalid("trendSpec.mode", "Must be a function.");
      b[c] = {
        dataPartAtom: {
          v: "trend",
          f: e
        },
        type: c,
        label: e,
        model: d
      }
    }, "get", function(c) {
      c || f.fail.argumentRequired("type");
      return f.getOwn(b, c) || f.fail.operationInvalid("Undefined trend type '{0}'.", [c])
    }, "has", function(c) {
      return f.hasOwn(b, c)
    }, "types", function() {
      return f.ownKeys(b)
    });
    a.define("linear", {
      label: "Linear trend",
      model: function(c) {
        for (var d = f.get(c, "rows"), e = f.get(c, "x"), g = f.get(c, "y"), h = 0, j = c = 0, l = 0, m = 0, k = 0, n = function(r) {
          return r != null ? +r : NaN
        }; d.next();) {
          var o = d.item,
            p = e ? n(e(o)) : h;
          if (!isNaN(p)) {
            o = n(g(o));
            if (!isNaN(o)) {
              c++;
              j += p;
              l += o;
              m += p * o;
              k += p * p
            }
          }
          h++
        }
        var q, s;
        if (c >= 2) {
          d = j / c;
          e = l / c;
          m = m / c;
          c = k / c - d * d;
          s = c === 0 ? 0 : (m - d * e) / c;
          q = e - s * d;
          return {
            alpha: q,
            beta: s,
            reset: f.noop,
            sample: function(r) {
              return q + s * +r
            }
          }
        }
      }
    });
    a.define("moving-average", {
      label: "Moving average",
      model: function(c) {
        var d = Math.max(+(f.get(c, "periods") || 3), 2),
          e =
            0,
          g = [];
        return {
          reset: function() {
            e = 0;
            g.length = 0
          },
          sample: function(h, j) {
            h = d;
            if (j != null) {
              g.unshift(j);
              e += j;
              h = g.length;
              if (h > d) {
                e -= g.pop();
                h = d
              }
            }
            return e / h
          }
        }
      }
    });
    a.define("weighted-moving-average", {
      label: "Weighted Moving average",
      model: function(c) {
        var d = Math.max(+(f.get(c, "periods") || 3), 2),
          e = 0,
          g = 0,
          h = [],
          j = 0,
          l = 0;
        return {
          reset: function() {
            e = g = l = j = 0;
            h.length = 0
          },
          sample: function(m, k) {
            if (k != null)
              if (j < d) {
                h.push(k);
                j++;
                l += j;
                g += j * k;
                e += k
              } else {
                g += j * k - e;
                e += k - h[0];
                for (m = 1; m < d; m++) h[m - 1] = h[m];
                h[d - 1] = k
              }
            return g / l
          }
        }
      }
    })
  });
  ea.resolvers =
    Va;
  ea.constant = Wa;
  ea.specify = Xa;
  ea.defaultValue = Ya;
  i.options = ea;
  var Ua = f.type().init(function(a, b, c, d) {
    this.name = a;
    this._context = c;
    this.option = b;
    this._cast = f.get(d, "cast");
    a = f.get(d, "value");
    if (a !== undefined) this._defaultValue = this.value = a;
    if (a = f.get(d, "resolve")) this._resolve = a;
    else this.isResolved = true;
    if (a = f.get(d, "getDefault")) this._getDefault = a;
    a = f.get(d, "data");
    if (a != null) this.data = a;
    this.alias = f.array.to(f.get(d, "alias"))
  }).add({
    isSpecified: false,
    isResolved: false,
    value: undefined,
    _defaultValue: undefined,
    resolve: function() {
      if (!this.isResolved) {
        this.isResolved = true;
        this._getFunProp("_resolve").call(this._context, this);
        if (this.value == null) {
          var a = this._dynDefault();
          if (a != null) {
            delete this.isSpecified;
            this.value = this._defaultValue = a
          }
        }
      }
      return this
    },
    specify: function(a) {
      return this.set(a, false)
    },
    defaultValue: function(a) {
      a !== undefined && this.set(a, true);
      return this._defaultValue
    },
    cast: function(a) {
      if (a != null) {
        var b = this._getFunProp("_cast");
        if (b) a = b.call(this._context, a, this)
      }
      return a
    },
    set: function(a, b) {
      if (a !=
        null) a = this.cast(a);
      if (a == null) {
        a = this._dynDefault();
        if (a != null) b = true
      }
      if (b) {
        delete this.isSpecified;
        this._defaultValue = a;
        if (!this.isSpecified) this.value = a
      } else {
        this.isResolved = this.isSpecified = true;
        this.value = a
      }
      return this
    },
    _dynDefault: function() {
      var a = this._getFunProp("_getDefault");
      return a && this.cast(a.call(this._context, this))
    },
    _getFunProp: function(a) {
      if (a = this[a]) {
        var b = this._context;
        if (b && f.string.is(a)) a = b[a]
      }
      return a
    }
  });
  f.global.NoDataException = function() {};
  i.data = {
    visibleKeyArgs: {
      visible: true
    }
  };
  f.type("pvc.data.DimensionType").init(function(a, b, c) {
    this.complexType = a;
    this.name = b;
    this.label = f.get(c, "label") || i.buildTitleFromName(b);
    a = i.splitIndexedId(b);
    this.group = a[0];
    this.groupLevel = f.nullyTo(a[1], 0);
    if (this.label.indexOf("{") >= 0) this.label = f.format(this.label, [this.groupLevel + 1]);
    this.playedVisualRoles = new f.Map;
    this.isHidden = !!f.get(c, "isHidden");
    a = f.get(c, "valueType") || null;
    b = i.data.DimensionType.valueTypeName(a);
    var d = f.getOwn(i.data.DimensionType.cast, b, null);
    this.valueType = a;
    this.valueTypeName =
      b;
    this.cast = d;
    this.isDiscreteValueType = this.valueType !== Number && this.valueType !== Date;
    this.isDiscrete = f.get(c, "isDiscrete");
    if (this.isDiscrete == null) this.isDiscrete = this.isDiscreteValueType;
    else {
      this.isDiscrete = !!this.isDiscrete;
      if (!this.isDiscrete && this.isDiscreteValueType) throw f.error.argumentInvalid("isDiscrete", "The only supported continuous value types are Number and Date.");
    }
    this._converter = f.get(c, "converter") || null;
    if (!this._converter)
      if (a = f.get(c, "rawFormat")) switch (this.valueType) {
        case Date:
          this._converter =
            u.Format.createParser(u.Format.date(a));
          break
      }
    this._key = f.get(c, "key") || null;
    this._comparer = f.get(c, "comparer");
    if (this._comparer === undefined) switch (this.valueType) {
      case Number:
      case Date:
        this._comparer = f.compare;
        break;
      default:
        this._comparer = null
    }
    this.isComparable = this._comparer != null;
    this._formatter = f.get(c, "formatter") || null;
    if (!this._formatter) switch (this.valueType) {
      case Number:
        this._formatter = u.Format.createFormatter(u.Format.number().fractionDigits(0, 2));
        break;
      case Date:
        a = f.get(c, "format");
        if (!a)
          if (a =
            f.get(c, "rawFormat")) a = a.replace(/-/g, "/");
        a || (a = "%Y/%m/%d");
        this._formatter = u.Format.createFormatter(u.Format.date(a));
        break
    }
  }).add({
    isCalculated: false,
    compare: function(a, b) {
      if (a == null) {
        if (b == null) return 0;
        return -1
      } else if (b == null) return 1;
      return this._comparer.call(null, a, b)
    },
    comparer: function(a) {
      if (!this.isComparable) return null;
      var b = this;
      if (a) return this._reverseComparer || (this._reverseComparer = function(c, d) {
        return b.compare(d, c)
      });
      return this._directComparer || (this._directComparer = function(c,
                                                                      d) {
        return b.compare(c, d)
      })
    },
    atomComparer: function(a) {
      if (a) return this._reverseAtomComparer || (this._reverseAtomComparer = this._createReverseAtomComparer());
      return this._directAtomComparer || (this._directAtomComparer = this._createDirectAtomComparer())
    },
    _toDiscrete: function() {
      this.isDiscrete = true
    },
    _toCalculated: function() {
      this.isCalculated = true
    },
    _createReverseAtomComparer: function() {
      function a(c, d) {
        if (c === d) return 0;
        return b.compare(d.value, c.value)
      }
      if (!this.isComparable) return cb;
      var b = this;
      return a
    },
    _createDirectAtomComparer: function() {
      function a(c, d) {
        if (c === d) return 0;
        return b.compare(c.value, d.value)
      }
      if (!this.isComparable) return bb;
      var b = this;
      return a
    },
    formatter: function() {
      return this._formatter
    },
    converter: function() {
      return this._converter
    },
    playingPercentVisualRole: function() {
      return f.query(this.playedVisualRoles.values()).any(function(a) {
        return a.isPercent
      })
    }
  });
  i.data.DimensionType.cast = {
    Date: function(a) {
      return a instanceof Date ? a : new Date(a)
    },
    Number: function(a) {
      a = Number(a);
      return isNaN(a) ?
        null : a
    },
    String: String,
    Boolean: Boolean,
    Object: Object,
    Any: null
  };
  i.data.DimensionType.dimensionGroupName = function(a) {
    return a.replace(/^(.*?)(\d*)$/, "$1")
  };
  i.data.DimensionType.valueTypeName = function(a) {
    if (a == null) return "Any";
    switch (a) {
      case Boolean:
        return "Boolean";
      case Number:
        return "Number";
      case String:
        return "String";
      case Object:
        return "Object";
      case Date:
        return "Date";
      default:
        throw f.error.argumentInvalid("valueType", "Invalid valueType function: '{0}'.", [a]);
    }
  };
  i.data.DimensionType.extendSpec = function(a,
                                             b, c) {
    a = i.data.DimensionType.dimensionGroupName(a);
    var d = f.get(c, "dimensionGroups");
    if (d)
      if (d = d[a]) b = f.create(d, b);
    b || (b = {});
    switch (a) {
      case "category":
        if (f.get(c, "isCategoryTimeSeries", false))
          if (b.valueType === undefined) b.valueType = Date;
        break;
      case "value":
        if (b.valueType === undefined) b.valueType = Number;
        if (b.valueType === Number)
          if (b.formatter === undefined && !b.format) b.formatter = f.get(c, "valueNumberFormatter");
        break
    }
    if (b.converter === undefined && b.valueType === Date && !b.rawFormat) b.rawFormat = f.get(c, "timeSeriesFormat");
    return b
  };
  f.type("pvc.data.ComplexType").init(function(a) {
    this._dims = {};
    this._dimsList = [];
    this._dimsNames = [];
    this._calculations = [];
    this._calculatedDimNames = {};
    this._dimsIndexByName = null;
    this._dimsByGroup = {};
    this._dimsNamesByGroup = {};
    if (a)
      for (var b in a) this.addDimension(b, a[b])
  }).add({
    describe: function() {
      var a = ["COMPLEX TYPE INFORMATION", i.logSeparator];
      this._dimsList.forEach(function(b) {
        var c = [];
        c.push(b.valueTypeName);
        b.isComparable && c.push("comparable");
        b.isDiscrete || c.push("continuous");
        b.isHidden &&
        c.push("hidden");
        a.push("  " + b.name + " (" + c.join(", ") + ")")
      });
      return a.join("\n")
    },
    dimensions: function(a, b) {
      if (a == null) return this._dims;
      var c = f.getOwn(this._dims, a, null);
      if (!c && f.get(b, "assertExists", true)) throw f.error.argumentInvalid("name", "Undefined dimension '{0}'", [a]);
      return c
    },
    dimensionsList: function() {
      return this._dimsList
    },
    calculatedDimensionsList: function() {
      return this._calcDimsList
    },
    dimensionsNames: function() {
      return this._dimsNames
    },
    groupDimensions: function(a, b) {
      var c = f.getOwn(this._dimsByGroup,
        a);
      if (!c && f.get(b, "assertExists", true)) throw f.error.operationInvalid("There is no dimension type group with name '{0}'.", [a]);
      return c
    },
    groupDimensionsNames: function(a, b) {
      var c = f.getOwn(this._dimsNamesByGroup, a);
      if (!c && f.get(b, "assertExists", true)) throw f.error.operationInvalid("There is no dimension type group with name '{0}'.", [a]);
      return c
    },
    addDimension: function(a, b) {
      a || f.fail.argumentRequired("name");
      !f.hasOwn(this._dims, a) || f.fail.operationInvalid("A dimension type with name '{0}' is already defined.", [a]);
      b = new i.data.DimensionType(this, a, b);
      this._dims[a] = b;
      this._dimsIndexByName = null;
      var c = b.group,
        d;
      if (c) {
        var e = f.getOwn(this._dimsByGroup, c);
        if (e) d = this._dimsNamesByGroup[c];
        else {
          e = this._dimsByGroup[c] = [];
          d = this._dimsNamesByGroup[c] = []
        }
        d = f.array.insert(d, a, f.compare);
        d = ~d;
        f.array.insertAt(e, d, b)
      }
      var g;
      e = this._dimsList.length;
      if (c) {
        d = b.groupLevel;
        for (var h = 0; h < e; h++) {
          var j = this._dimsList[h];
          if (j.group === c) {
            if (j.groupLevel > d) {
              g = h;
              break
            }
            g = h + 1
          }
        }
        if (g == null) g = e
      } else g = e;
      f.array.insertAt(this._dimsList,
        g, b);
      f.array.insertAt(this._dimsNames, g, a);
      if (b._calculate) {
        g = f.array.binarySearch(this._calcDimsList, b._calculationOrder, f.compare, function(l) {
          return l._calculationOrder
        });
        if (g >= 0) g++;
        else g = ~g;
        f.array.insertAt(this._calcDimsList, g, b)
      }
      this._isPctRoleDimTypeMap = null;
      return b
    },
    addCalculation: function(a, b) {
      a || f.fail.argumentRequired("calcSpec");
      var c = a.calculation || f.fail.argumentRequired("calculations[i].calculation");
      a = a.names;
      if ((a = typeof a === "string" ? a.split(/\s*\,\s*/) : f.array.as(a)) && a.length) {
        var d =
          this._calculatedDimNames;
        a.forEach(function(e) {
          if (e) {
            e = e.replace(/^\s*(.+?)\s*$/, "$1");
            !f.hasOwn(d, e) || f.fail.argumentInvalid("calculations[i].names", "Dimension name '{0}' is already being calculated.", [e]);
            var g = this._dims[e];
            if (!g) {
              var h = i.data.DimensionType.extendSpec(e, null, b);
              this.addDimension(e, h)
            }
            d[e] = true;
            g._toCalculated()
          }
        }, this)
      }
      this._calculations.push(c)
    },
    isCalculated: function(a) {
      return f.hasOwn(this._calculatedDimNames, a)
    },
    _calculate: function(a) {
      var b = this._calculations;
      if (b.length) {
        var c = {};
        b.forEach(function(d) {
          d(a, c)
        });
        return c
      }
    },
    getPlayingPercentVisualRoleDimensionMap: function() {
      var a = this._isPctRoleDimTypeMap;
      if (!a) a = this._isPctRoleDimTypeMap = new f.Map(f.query(f.own(this._dims)).where(function(b) {
        return b.playingPercentVisualRole()
      }).object({
        name: function(b) {
          return b.name
        }
      }));
      return a
    },
    sortDimensionNames: function(a, b) {
      var c = this._dimsIndexByName;
      if (!c) this._dimsIndexByName = c = f.query(this._dimsList).object({
        name: function(d) {
          return d.name
        },
        value: function(d, e) {
          return e
        }
      });
      a.sort(function(d,
                      e) {
        return f.compare(c[b ? b(d) : d], c[b ? b(e) : e])
      });
      return a
    }
  });
  f.type("pvc.data.ComplexTypeProject").init(function(a) {
    this._dims = {};
    this._dimList = [];
    this._dimGroupsDims = {};
    this._dimGroupSpecs = a || {};
    this._calcList = []
  }).add({
    _ensureDim: function(a, b) {
      a || f.fail.argumentInvalid("name", "Invalid dimension name '{0}'.", [a]);
      var c = f.getOwn(this._dims, a);
      if (c) b && f.setUDefaults(c.spec, b);
      else {
        c = this._dims[a] = this._createDim(a, b);
        this._dimList.push(c);
        b = f.array.lazy(this._dimGroupsDims, c.groupName);
        f.array.insert(b,
          a, f.compare)
      }
      return c
    },
    hasDim: function(a) {
      return f.hasOwn(this._dims, a)
    },
    setDim: function(a, b) {
      a = this._ensureDim(a).spec;
      b && f.copy(a, b);
      return this
    },
    setDimDefaults: function(a, b) {
      f.setUDefaults(this._ensureDim(a).spec, b);
      return this
    },
    _createDim: function(a, b) {
      var c = i.data.DimensionType.dimensionGroupName(a),
        d = this._dimGroupSpecs[c];
      if (d) b = f.create(d, b);
      return {
        name: a,
        groupName: c,
        spec: b || {}
      }
    },
    readDim: function(a, b) {
      b = this._ensureDim(a, b);
      if (b.isRead) throw f.error.operationInvalid("Dimension '{0}' already is the target of a reader.", [a]);
      if (b.isCalc) throw f.error.operationInvalid("Dimension '{0}' is being calculated, so it cannot be the target of a reader.", [a]);
      b.isRead = true
    },
    calcDim: function(a, b) {
      b = this._ensureDim(a, b);
      if (b.isCalc) throw f.error.operationInvalid("Dimension '{0}' already is being calculated.", [a]);
      if (b.isRead) throw f.error.operationInvalid("Dimension '{0}' is the target of a reader, so it cannot be calculated.", [a]);
      b.isCalc = true
    },
    isReadOrCalc: function(a) {
      if (a)
        if (a = f.getOwn(this._dims, a)) return a.isRead || a.isCalc;
      return false
    },
    groupDimensionsNames: function(a) {
      return this._dimGroupsDims[a]
    },
    setCalc: function(a) {
      a || f.fail.argumentRequired("calculations[i]");
      a.calculation || f.fail.argumentRequired("calculations[i].calculation");
      var b = a.names;
      (b = typeof b === "string" ? b.split(/\s*\,\s*/) : f.array.as(b)) && b.length && b.forEach(this.calcDim, this);
      this._calcList.push(a)
    },
    configureComplexType: function(a, b) {
      this._dimList.forEach(function(c) {
        var d = c.name;
        c = c.spec;
        c = i.data.DimensionType.extendSpec(d, c, b);
        a.addDimension(d, c)
      });
      this._calcList.forEach(function(c) {
        a.addCalculation(c)
      })
    }
  });
  f.type("pvc.data.TranslationOper").init(function(a, b, c, d, e) {
    this.chart = a;
    this.complexTypeProj = b;
    this.source = c;
    this.metadata = d || {};
    this.options = e || {};
    this._initType();
    if (i.debug >= 4) {
      this._logItems = true;
      this._logItemCount = 0
    }
  }).add({
    _logItems: false,
    logSource: f.method({
      isAbstract: true
    }),
    logVItem: f.method({
      isAbstract: true
    }),
    _translType: "Unknown",
    logTranslatorType: function() {
      return this._translType + " data source translator"
    },
    virtualItemSize: function() {
      return this.metadata.length
    },
    freeVirtualItemSize: function() {
      return this.virtualItemSize() - this._userUsedIndexesCount
    },
    setSource: function(a) {
      if (!a) throw f.error.argumentRequired("source");
      this.source = a
    },
    defReader: function(a) {
      a || f.fail.argumentRequired("readerSpec");
      var b;
      b = f.string.is(a) ? a : a.names;
      b = f.string.is(b) ? b.split(/\s*\,\s*/) : f.array.as(b);
      var c = f.array.as(a.indexes);
      c && c.forEach(this._userUseIndex, this);
      var d = !!(b && b.length);
      if (a = a.reader) {
        d || f.fail.argumentRequired("reader.names", "Required argument when a reader function is specified.");
        this._userRead(a, b)
      } else {
        if (d) return this._userCreateReaders(b, c);
        c && c.forEach(function(e) {
          this._userIndexesToSingleDim[e] = null
        }, this)
      }
      return c
    },
    configureType: function() {
      this._configureTypeCore()
    },
    _configureTypeCore: f.method({
      isAbstract: true
    }),
    _initType: function() {
      this._userDimsReaders = [];
      this._userDimsReadersByDim = {};
      this._userItem = [];
      this._userUsedIndexes = {};
      this._userUsedIndexesCount = 0;
      this._userIndexesToSingleDim = [];
      var a = this.options.readers;
      a && a.forEach(this.defReader, this);
      if (a = i.parseDistinctIndexArray(this.options.multiChartIndexes)) this._multiChartIndexes =
        this.defReader({
          names: "multiChart",
          indexes: a
        })
    },
    _userUseIndex: function(a) {
      a = +a;
      if (a < 0) throw f.error.argumentInvalid("index", "Invalid reader index: '{0}'.", [a]);
      if (f.hasOwn(this._userUsedIndexes, a)) throw f.error.argumentInvalid("index", "Virtual item index '{0}' is already assigned.", [a]);
      this._userUsedIndexes[a] = true;
      this._userUsedIndexesCount++;
      this._userItem[a] = true;
      return a
    },
    _userCreateReaders: function(a, b) {
      if (b) b.forEach(function(l, m) {
        b[m] = +l
      });
      else b = [];
      var c = b.length,
        d = a.length,
        e;
      if (d > c) {
        e = c >
          0 ? b[c - 1] + 1 : 0;
        do {
          e = this._nextAvailableItemIndex(e);
          b[c] = e;
          this._userUseIndex(e);
          c++
        } while (d > c)
      }
      for (var g = c === d ? d : d - 1, h, j = 0; j < g; j++) {
        e = a[j];
        h = b[j];
        this._userIndexesToSingleDim[h] = e;
        this._userRead(this._propGet(e, h), e)
      }
      if (g < d) {
        e = i.splitIndexedId(a[d - 1]);
        a = e[0];
        d = f.nullyTo(e[1], 0);
        for (g = g; g < c; g++, d++) {
          e = i.buildIndexedId(a, d);
          h = b[g];
          this._userIndexesToSingleDim[h] = e;
          this._userRead(this._propGet(e, h), e)
        }
      }
      return b
    },
    _userRead: function(a, b) {
      f.fun.is(a) || f.fail.argumentInvalid("reader", "Reader must be a function.");
      f.array.is(b) ? b.forEach(function(c) {
        this._readDim(c, a)
      }, this) : this._readDim(b, a);
      this._userDimsReaders.push(a)
    },
    _readDim: function(a, b) {
      var c, d;
      c = this._userIndexesToSingleDim.indexOf(a);
      if (c >= 0)
        if ((c = this._itemInfos[c]) && !this.options.ignoreMetadataLabels)
          if (c = c.label || c.name) d = {
            label: c
          };
      this.complexTypeProj.readDim(a, d);
      this._userDimsReadersByDim[a] = b
    },
    execute: function(a) {
      this.data = a;
      return this._executeCore()
    },
    _executeCore: function() {
      var a = this._getDimensionsReaders();
      return f.query(this._getItems()).select(function(b) {
        return this._readItem(b,
          a)
      }, this)
    },
    _getItems: function() {
      return this.source
    },
    _getDimensionsReaders: function() {
      return this._userDimsReaders
    },
    _readItem: function(a, b) {
      var c = this._logItems;
      if (c)
        if (this._logItemCount < 10) {
          i.log("virtual item [" + this._logItemCount + "]: " + i.stringify(a));
          this._logItemCount++
        } else {
          i.log("...");
          c = this._logItems = false
        }
      for (var d = 0, e = b.length, g = this.data, h = {}; d < e;) b[d++].call(g, a, h);
      if (c) {
        a = {};
        for (var j in h) {
          b = h[j];
          if (f.object.is(b)) b = "v" in b ? b.v : "value" in b ? b.value : "...";
          a[j] = b
        }
        i.log("-> read: " + i.stringify(a))
      }
      return h
    },
    _propGet: function(a, b) {
      function c(d, e) {
        e[a] = d[b]
      }
      return c
    },
    _nextAvailableItemIndex: function(a, b) {
      if (a == null) a = 0;
      if (b == null) b = Infinity;
      for (; a < b && f.hasOwn(this._userItem, a);) a++;
      return a < b ? a : -1
    },
    _getUnboundRoleDefaultDimNames: function(a, b, c, d) {
      if ((a = this.chart.visualRoles[a]) && !a.isPreBound())
        if (a = a.defaultDimensionName) {
          a = a.match(/^(.*?)(\*)?$/)[1];
          c || (c = []);
          if (d == null) d = 0;
          if (b == null) b = 1;
          for (; b--;) {
            var e = i.buildIndexedId(a, d++);
            this.complexTypeProj.isReadOrCalc(e) || c.push(e)
          }
          return c.length ? c : null
        }
    },
    collectFreeDiscreteAndConstinuousIndexes: function(a, b) {
      this._itemInfos.forEach(function(c, d) {
        if (!this._userUsedIndexes[d])(c = c.type === 1 ? b : a) && c.push(d)
      }, this)
    }
  });
  f.type("pvc.data.MatrixTranslationOper", i.data.TranslationOper).add({
    _initType: function() {
      this.J = this.metadata.length;
      this.I = this.source.length;
      this._processMetadata();
      this.base()
    },
    setSource: function(a) {
      this.base(a);
      this.I = this.source.length
    },
    _knownContinuousColTypes: {
      numeric: 1,
      number: 1,
      integer: 1
    },
    _processMetadata: function() {
      for (var a = this._knownContinuousColTypes,
             b = f.query(this.metadata).select(function(n, o) {
               n.colIndex = o;
               return n
             }).where(function(n) {
               n = n.colType;
               return !n || a[n.toLowerCase()] !== 1
             }).select(function(n) {
               return n.colIndex
             }).array(), c = f.array.create(this.J, 1), d = this.I, e = this.source, g = b.length, h = 0; h < d && g > 0; h++)
        for (var j = e[h], l = 0; l < g;) {
          var m = b[l],
            k = j[m];
          if (k != null) {
            c[m] = this._getSourceValueType(k);
            b.splice(l, 1);
            g--
          } else l++
        }
      this._columnTypes = c
    },
    _buildItemInfoFromMetadata: function(a) {
      var b = this.metadata[a];
      return {
        type: this._columnTypes[a],
        name: b.colName,
        label: b.colLabel
      }
    },
    _getSourceValueType: function(a) {
      switch (typeof a) {
        case "number":
          return 1;
        case "object":
          if (a instanceof Date) return 1
      }
      return 0
    },
    logSource: function() {
      var a = ["DATA SOURCE SUMMARY", i.logSeparator, "ROWS (" + Math.min(10, this.I) + "/" + this.I + ")"];
      f.query(this.source).take(10).each(function(c, d) {
        a.push("  [" + d + "] " + i.stringify(c))
      });
      this.I > 10 && a.push("  ...");
      a.push("COLS (" + this.J + ")");
      var b = this._columnTypes;
      this.metadata.forEach(function(c, d) {
        a.push("  [" + d + "] '" + c.colName + "' (type: " + c.colType +
          ", inspected: " + (b[d] ? "number" : "string") + (c.colLabel ? ", label: '" + c.colLabel + "'" : "") + ")")
      });
      a.push("");
      return a.join("\n")
    },
    _logVItem: function(a, b) {
      var c = ["VIRTUAL ITEM ARRAY", i.logSeparator],
        d = 4,
        e = 5,
        g = 9;
      this._itemInfos.forEach(function(j, l) {
        d = Math.max(d, (j.name || "").length);
        e = Math.max(e, (j.label || "").length);
        if (j = this._userIndexesToSingleDim[l]) g = Math.max(g, j.length)
      }, this);
      c.push("Index | Kind | Type   | " + f.string.padRight("Name", d) + " | " + f.string.padRight("Label", e) + " > Dimension", "------+------+--------+-" +
        f.string.padRight("", d, "-") + "-+-" + f.string.padRight("", e, "-") + "-+-" + f.string.padRight("", g, "-") + "-");
      var h = 0;
      a.forEach(function(j) {
        for (var l = 0, m = b[j]; l < m; l++) {
          var k = this._itemInfos[h],
            n = this._userIndexesToSingleDim[h];
          if (n === undefined) n = "";
          c.push(" " + h + "    | " + j + "    | " + (k.type ? "number" : "string") + " | " + f.string.padRight(k.name || "", d) + " | " + f.string.padRight(k.label || "", e) + " | " + n);
          h++
        }
      }, this);
      c.push("");
      return c.join("\n")
    },
    _createPlot2SeriesKeySet: function(a, b) {
      var c = null,
        d = b.length;
      f.query(a).each(function(e) {
        var g = +e;
        if (isNaN(g)) throw f.error.argumentInvalid("plot2DataSeriesIndexes", "Element is not a number '{0}'.", [e]);
        if (g < 0) {
          if (g <= -d) throw f.error.argumentInvalid("plot2DataSeriesIndexes", "Index is out of range '{0}'.", [g]);
          g = d + g
        } else if (g >= d) throw f.error.argumentInvalid("plot2DataSeriesIndexes", "Index is out of range '{0}'.", [g]);
        c || (c = {});
        c[b[g]] = true
      });
      return c
    },
    _dataPartGet: function(a, b) {
      function c(k, n) {
        if (!g) {
          h = a();
          g = d.data.dimensions(e);
          i.debug >= 3 && h && i.log("Second axis series values: " + i.stringify(f.keys(h)))
        }
        b(k,
          m);
        k = m.series;
        if (k != null && k.v != null) k = k.v;
        k = f.hasOwn(h, k) ? l || (l = g.intern("1")) : j || (j = g.intern("0"));
        n[e] = k
      }
      var d = this,
        e = this.options.dataPartDimName,
        g, h, j, l, m = {};
      return c
    }
  });
  f.type("pvc.data.CrosstabTranslationOper", i.data.MatrixTranslationOper).add({
    _translType: "Crosstab",
    virtualItemSize: function() {
      return this.R + this.C + this.M
    },
    _executeCore: function() {
      function a(j, l) {
        var m = g[j],
          k = 0;
        for (j = h[j]; j-- > 0;) e[m++] = l[k++]
      }

      function b(j, l) {
        var m = g.M;
        l = h._colGroupsIndexes[l];
        for (var k = h.M, n = 0; n < k; n++) {
          var o =
            l[n];
          e[m++] = o != null ? j[o] : null
        }
      }

      function c(j) {
        a("R", j);
        return f.query(this._colGroups).select(function(l, m) {
          a("C", l);
          b(j, m);
          return this._readItem(e, d)
        }, this)
      }
      if (!this.metadata.length) return f.query();
      var d = this._getDimensionsReaders(),
        e = new Array(this.virtualItemSize()),
        g = this._itemCrossGroupIndex,
        h = this;
      return f.query(this.source).selectMany(c, this)
    },
    _processMetadata: function() {
      this.base();
      this._separator = this.options.separator || "~";
      var a = this.R = 1;
      this.M = this.C = 1;
      this.measuresDirection = null;
      var b;
      b = this.metadata;
      b = this.options.seriesInRows ? b.map(function(g) {
        return g.colName
      }) : this.options.compatVersion <= 1 ? b.map(function(g) {
        return {
          v: g.colName
        }
      }) : b.map(function(g) {
        return {
          v: g.colName,
          f: g.colLabel
        }
      });
      var c = this._itemCrossGroupInfos = {};
      if (this.options.isMultiValued) {
        var d = f.get(this.options, "measuresInColumns", true);
        if (d || this.options.measuresIndex == null) {
          a = this.R = this._getCategoriesCount();
          b = b.slice(a);
          if (b.length > 0) {
            if (d) {
              this.measuresDirection = "columns";
              this._processEncodedColGroups(b)
            } else {
              this._colGroups =
                b;
              this._colGroupsIndexes = [];
              this._colGroups.forEach(function(g, h) {
                this._colGroups[h] = this._splitEncodedColGroupCell(g);
                this._colGroupsIndexes[h] = [this.R + h]
              }, this);
              c.M = [this._buildItemInfoFromMetadata(a)]
            }
            this.C = this._colGroups[0].length;
            c.C = f.range(0, this.C).select(function() {
              return {
                type: 0
              }
            }).array()
          } else {
            this.C = this.M = 0;
            c.M = [];
            c.C = []
          }
        } else {
          this.measuresDirection = "rows";
          this.R = +this.options.measuresIndex;
          d = this.options.measuresCount;
          if (d == null) d = 1;
          this.M = d;
          this._colGroups = b.slice(this.R + 1);
          this._colGroups.forEach(function(g,
                                           h) {
            this._colGroups[h] = [g]
          }, this)
        }
      } else {
        a = this.R = this._getCategoriesCount();
        this._colGroups = b.slice(a);
        this._colGroupsIndexes = new Array(this._colGroups.length);
        this._colGroups.forEach(function(g, h) {
          this._colGroups[h] = [g];
          this._colGroupsIndexes[h] = [a + h]
        }, this);
        c.C = [{
          type: 0
        }];
        c.M = [{
          type: this._columnTypes[a]
        }]
      }
      c.R = f.range(0, this.R).select(this._buildItemInfoFromMetadata, this).array();
      b = this.options.seriesInRows;
      d = this._itemCrossGroupIndex = {
        C: !b ? 0 : this.R,
        R: !b ? this.C : 0,
        M: this.C + this.R
      };
      var e = this._itemInfos =
        new Array(this.virtualItemSize());
      f.eachOwn(d, function(g, h) {
        c[h].forEach(function(j, l) {
          e[g + l] = j
        })
      });
      this._itemLogicalGroup = {
        series: b ? this.R : this.C,
        category: b ? this.C : this.R,
        value: this.M
      };
      this._itemLogicalGroupIndex = {
        series: 0,
        category: this._itemLogicalGroup.series,
        value: this.C + this.R
      }
    },
    logVItem: function() {
      return this._logVItem(["C", "R", "M"], {
        C: this.C,
        R: this.R,
        M: this.M
      })
    },
    _getCategoriesCount: function() {
      var a = this.options.categoriesCount;
      if (a != null && (!isFinite(a) || a < 0)) a = null;
      if (a == null)(a = f.query(this._columnTypes).whayl(function(b) {
        return b ===
          0
      }).count()) || (a = 1);
      return a
    },
    _splitEncodedColGroupCell: function(a) {
      var b = a.v,
        c;
      if (b == null) b = [];
      else {
        b = b.split(this._separator);
        if (c = a.f) c = c.split(this._separator)
      }
      return b.map(function(d, e) {
        return {
          v: d,
          f: c && c[e]
        }
      })
    },
    _processEncodedColGroups: function(a) {
      for (var b = a.length || f.assert("Must have columns"), c = this.R, d = [], e, g = {}, h = [], j = 0; j < b; j++) {
        var l = a[j],
          m = l.v,
          k = l.f,
          n = m.lastIndexOf(this._separator),
          o, p, q;
        if (n < 0) {
          l = m;
          o = k;
          m = "";
          p = []
        } else {
          l = m.substring(n + 1);
          m = m.substring(0, n);
          p = m.split(this._separator);
          if (k !=
            null) {
            q = k.split(this._separator);
            o = q.pop()
          }
          p.forEach(function(A, x) {
            p[x] = {
              v: A,
              f: q && q[x]
            }
          })
        }
        if (!e || e.encValues !== m) {
          e = {
            startIndex: j,
            encValues: m,
            values: p,
            measureNames: [l]
          };
          d.push(e)
        } else e.measureNames.push(l);
        m = j - e.startIndex;
        if (k = f.getOwn(g, l)) {
          if (m > k.groupIndex) k.groupIndex = m
        } else {
          g[l] = k = {
            name: l,
            label: o,
            type: this._columnTypes[c + j],
            groupIndex: m,
            index: j
          };
          h.push(k)
        }
      }
      h.sort(function(A, x) {
        return f.compare(A.groupIndex, x.groupIndex) || f.compare(A.index, x.index)
      });
      h.forEach(function(A, x) {
        A.groupIndex = x
      });
      a = d.length;
      var s = new Array(a),
        r = new Array(a),
        t = h.length;
      d.map(function(A, x) {
        s[x] = A.values;
        var v = A.startIndex,
          y = r[x] = new Array(t);
        A.measureNames.forEach(function(z, w) {
          y[g[z].groupIndex] = c + v + w
        })
      });
      this._colGroups = s;
      this._colGroupsIndexes = r;
      this._itemCrossGroupInfos.M = h;
      this.M = t
    },
    configureType: function() {
      if (this.measuresDirection === "rows") throw f.error.notImplemented();
      this.base()
    },
    _configureTypeCore: function() {
      function a(m, k, n) {
        for (var o = d[m] + n; n > 0;) {
          var p = i.buildIndexedId(m, k);
          if (!b.complexTypeProj.isReadOrCalc(p)) {
            e =
              b._nextAvailableItemIndex(e);
            if (e >= o) return;
            g.push({
              names: p,
              indexes: e
            });
            e++;
            n--
          }
          k++
        }
      }
      var b = this,
        c = b._itemLogicalGroup,
        d = b._itemLogicalGroupIndex,
        e = 0,
        g = [],
        h = this.options.dataPartDimName;
      if (h && this.C === 1 && !this.complexTypeProj.isReadOrCalc(h)) {
        var j = this.options.plot2DataSeriesIndexes;
        if (j != null) {
          var l = this._colGroups.map(function(m) {
            return "" + m[0].v
          });
          this._plot2SeriesKeySet = this._createPlot2SeriesKeySet(j, l)
        }
      }["series", "category", "value"].forEach(function(m) {
        var k = c[m];
        k > 0 && a(m, 0, k)
      });
      g && g.forEach(this.defReader,
        this);
      if (this._plot2SeriesKeySet)(j = this._userDimsReadersByDim.series) && this._userRead(this._dataPartGet(f.fun.constant(this._plot2SeriesKeySet), j), h)
    }
  });
  f.type("pvc.data.RelationalTranslationOper", i.data.MatrixTranslationOper).add({
    M: 0,
    C: 0,
    S: 0,
    _translType: "Relational",
    _processMetadata: function() {
      this.base();
      var a = this.metadata,
        b = this.J,
        c = this.options.categoriesCount;
      if (c != null && (!isFinite(c) || c < 0)) c = 0;
      var d, e, g;
      if (this.options.isMultiValued) g = (e = i.parseDistinctIndexArray(this.options.measuresIndexes,
        0, b - 1)) ? e.length : 0;
      var h;
      if (g == null)
        if (b > 0 && b <= 3 && (c == null || c === 1) && d == null) {
          g = 1;
          e = [b - 1];
          c = b >= 2 ? 1 : 0;
          d = b >= 3 ? 1 : 0;
          h = c + d
        } else if (c != null && c >= b) {
          c = h = b;
          g = d = 0
        } else {
          g = c != null ? b - c : Infinity;
          e = f.query(a).where(function(n, o) {
            return this._columnTypes[o] !== 0
          }, this).select(function(n) {
            return n.colIndex
          }).take(g).array();
          g = e.length
        }
      if (h == null) {
        h = b - g;
        if (h === 0) d = c = 0;
        else if (c != null)
          if (c > h) {
            c = h;
            d = 0
          } else d = h - c;
        else {
          d = h > 1 ? 1 : 0;
          c = h - d
        }
      }
      a = this.options.seriesInRows;
      var j = [];
      if (h) {
        d && !a && j.push({
          name: "S",
          count: d
        });
        c && j.push({
          name: "C",
          count: c
        });
        d && a && j.push({
          name: "S",
          count: d
        })
      }
      g && j.push({
        name: "M",
        count: g
      });
      var l = f.range(0, b).array();
      e && e.forEach(function(n) {
        l.splice(n, 1)
      });
      var m = {};
      j.forEach(function(n) {
        var o = n.count,
          p = n.name;
        m[p] = n;
        n.indexes = e && p === "M" ? e : l.splice(0, o)
      });
      this.M = g;
      this.S = d;
      this.C = c;
      var k = [];
      ["S", "C", "M"].forEach(function(n) {
        (n = m[n]) && f.array.append(k, n.indexes)
      });
      this._itemInfos = k.map(this._buildItemInfoFromMetadata, this);
      this._itemCrossGroupIndex = {
        S: 0,
        C: this.S,
        M: this.S + this.C
      };
      this._itemPerm = k
    },
    logVItem: function() {
      return this._logVItem(["S",
        "C", "M"
      ], {
        S: this.S,
        C: this.C,
        M: this.M
      })
    },
    _configureTypeCore: function() {
      function a(j, l, m, k) {
        for (l = b._itemCrossGroupIndex[l] + k; k > 0;) {
          var n = i.buildIndexedId(j, m);
          if (!b.complexTypeProj.isReadOrCalc(n)) {
            c = b._nextAvailableItemIndex(c);
            if (c >= l) return;
            d.push({
              names: n,
              indexes: c
            });
            c++;
            k--
          }
          m++
        }
      }
      var b = this,
        c = 0,
        d = [];
      this.S > 0 && a("series", "S", 0, this.S);
      this.C > 0 && a("category", "C", 0, this.C);
      this.M > 0 && a("value", "M", 0, this.M);
      d && d.forEach(this.defReader, this);
      var e = this.options.dataPartDimName;
      if (e && !this.complexTypeProj.isReadOrCalc(e)) {
        var g =
          this.options.plot2DataSeriesIndexes;
        if (g != null) {
          var h = this._userDimsReadersByDim.series;
          h && this._userRead(ab.call(this, g, h), e)
        }
      }
    },
    _executeCore: function() {
      var a = this._getDimensionsReaders(),
        b = this._itemPerm;
      return f.query(this._getItems()).select(function(c) {
        c = u.permute(c, b);
        return this._readItem(c, a)
      }, this)
    }
  });
  f.type("pvc.data.Atom").init(function(a, b, c, d, e) {
    this.dimension = a;
    this.id = b == null ? -f.nextId() : f.nextId();
    this.value = b;
    this.label = c;
    if (d !== undefined) this.rawValue = d;
    this.key = e
  }).add({
    isVirtual: false,
    rawValue: undefined,
    toString: function() {
      var a = this.label;
      if (a != null) return a;
      a = this.value;
      return a != null ? "" + a : ""
    }
  });
  var Jb = 1;
  f.type("pvc.data.Complex").init(function(a, b, c, d, e, g) {
    this.id = Jb++;
    var h;
    if (a) {
      h = a.owner;
      if (!d) d = a.atoms
    }
    this.owner = h || this;
    this.atoms = d ? Object.create(d) : {};
    var j = !!c;
    if (!c) c = h.type._dimsNames;
    var l = this.atoms;
    a = c.length;
    var m;
    if (b) {
      var k = h._dimensions,
        n = function(q, s) {
          var r = f.getOwn(k, q);
          if (s != null) {
            s = r.intern(s);
            if (!d || s !== d[q]) l[q] = s
          } else r.intern(null)
        };
      if (j)
        for (j = 0; j < a; j++) {
          m =
            c[j];
          n(m, b[m])
        } else
        for (m in b) n(m, b[m]);
      if (g) {
        j = h.type._calculate(this);
        for (m in j) f.hasOwnProp.call(l, m) || n(m, j[m])
      }
    }
    if (a)
      if (a === 1) {
        c = l[c[0]];
        this.value = c.value;
        this.rawValue = c.rawValue;
        this.key = c.key;
        if (e) this.label = c.label
      } else {
        var o, p;
        b = h.labelSep;
        h = h.keySep;
        for (j = 0; j < a; j++) {
          m = c[j];
          m = l[m];
          if (j) o += h + m.key;
          else o = m.key;
          if (e)
            if (m = m.label)
              if (p) p += b + m;
              else p = m
        }
        this.value = this.rawValue = this.key = o;
        if (e) this.label = p
      } else {
      this.value = null;
      this.key = "";
      if (e) this.label = ""
    }
  }).add({
    labelSep: " ~ ",
    keySep: "~",
    label: null,
    rawValue: undefined,
    ensureLabel: function() {
      var a = this.label;
      if (a == null) {
        a = "";
        var b = this.owner.labelSep;
        f.eachOwn(this.atoms, function(c) {
          if (c = c.label)
            if (a) a += b + c;
            else a = c
        });
        this.label = a
      }
      return a
    },
    view: function(a) {
      return new i.data.ComplexView(this, a)
    },
    toString: function() {
      var a = ["" + this.constructor.typeName];
      this.index != null && a.push("#" + this.index);
      this.owner.type.dimensionsNames().forEach(function(b) {
        a.push(b + ": " + i.stringify(this.atoms[b].value))
      }, this);
      return a.join(" ")
    }
  });
  i.data.Complex.values =
    function(a, b) {
      var c = a.atoms;
      return b.map(function(d) {
        return c[d].value
      })
    };
  i.data.Complex.compositeKey = function(a, b) {
    var c = a.atoms;
    return b.map(function(d) {
      return c[d].key
    }).join(a.owner.keySep)
  };
  i.data.Complex.labels = function(a, b) {
    var c = a.atoms;
    return b.map(function(d) {
      return c[d].label
    })
  };
  var Kb = f.propGet("id");
  f.type("pvc.data.ComplexView", i.data.Complex).init(function(a, b) {
    this.source = a;
    this.viewDimNames = b;
    this.base(a, a.atoms, b, a.owner.atoms, true)
  }).add({
    values: function() {
      return i.data.Complex.values(this,
        this.viewDimNames)
    },
    labels: function() {
      return i.data.Complex.labels(this, this.viewDimNames)
    }
  });
  f.type("pvc.data.Datum", i.data.Complex).init(function(a, b) {
    this.base(a, b, null, null, false, true)
  }).add({
    isSelected: false,
    isVisible: true,
    isNull: false,
    isVirtual: false,
    isTrend: false,
    trendType: null,
    isInterpolated: false,
    interpolation: null,
    setSelected: function(a) {
      if (this.isNull) return false;
      a = a == null || !!a;
      var b = this.isSelected !== a;
      if (b) {
        if (a) this.isSelected = true;
        else delete this.isSelected;
        sb.call(this.owner, this,
          a)
      }
      return b
    },
    toggleSelected: function() {
      return this.setSelected(!this.isSelected)
    },
    setVisible: function(a) {
      if (this.isNull) return false;
      a = a == null || !!a;
      var b = this.isVisible !== a;
      if (b) {
        this.isVisible = a;
        ma.call(this.owner, this, a)
      }
      return b
    },
    toggleVisible: function() {
      return this.setVisible(!this.isVisible)
    }
  });
  var ta = f.propGet("isSelected");
  f.type("pvc.data.Dimension").init(function(a, b) {
    this.data = a;
    this.type = b;
    this.root = this;
    this.owner = this;
    var c = b.name;
    this.name = c;
    this._atomComparer = b.atomComparer();
    this._atomsByKey = {};
    if (a.isOwner()) {
      this._atoms = [];
      eb.call(this)
    } else {
      b = a.parent;
      var d;
      if (b) {
        d = b._dimensions[c];
        hb.call(d, this);
        this.root = a.parent.root
      } else {
        (b = a.linkParent) || f.assert("Data must have a linkParent");
        d = b._dimensions[c];
        jb.call(d, this)
      }
      this._nullAtom = this.owner._nullAtom;
      this._lazyInit = function() {
        this._lazyInit = null;
        for (var e = this.data._datums, g = e.length, h = this._atomsByKey, j = 0; j < g; j++) {
          var l = e[j].atoms[c];
          h[l.key] = l
        }
        this._atoms = d.atoms().filter(function(m) {
          return f.hasOwnProp.call(h, m.key)
        })
      }
    }
  }).add({
    parent: null,
    linkParent: null,
    _children: null,
    _linkChildren: null,
    _atomsByKey: null,
    _atomVisibleDatumsCount: null,
    _disposed: false,
    _nullAtom: null,
    _virtualNullAtom: null,
    _visibleAtoms: null,
    _visibleIndexes: null,
    _atomComparer: null,
    _atoms: null,
    _sumCache: null,
    count: function() {
      this._lazyInit && this._lazyInit();
      return this._atoms.length
    },
    isVisible: function(a) {
      this._lazyInit && this._lazyInit();
      f.hasOwn(this._atomsByKey, a.key) || f.assert("Atom must exist in this dimension.");
      return mb.call(this)[a.key] > 0
    },
    atoms: function(a) {
      this._lazyInit &&
      this._lazyInit();
      a = f.get(a, "visible");
      if (a == null) return this._atoms;
      a = !!a;
      this._visibleAtoms || (this._visibleAtoms = {});
      return this._visibleAtoms[a] || (this._visibleAtoms[a] = ob.call(this, a))
    },
    indexes: function(a) {
      this._lazyInit && this._lazyInit();
      a = f.get(a, "visible");
      if (a == null) return u.range(0, this._atoms.length);
      a = !!a;
      this._visibleIndexes || (this._visibleIndexes = {});
      return this._visibleIndexes[a] || (this._visibleIndexes[a] = nb.call(this, a))
    },
    atom: function(a) {
      if (a == null || a === "") return this._nullAtom;
      if (a instanceof i.data.Atom) return a;
      this._lazyInit && this._lazyInit();
      return this._atomsByKey[this.type._key ? this.type._key.call(null, a) : a] || null
    },
    extent: function(a) {
      var b = this.atoms(a),
        c = b.length;
      if (c) {
        var d = this._nullAtom && b[0].value == null ? 1 : 0,
          e = c - d;
        if (e > 0) {
          d = b[d];
          c = b[c - 1];
          if (d !== c && f.get(a, "abs", false)) {
            a = c.value < 0 ? -1 : 1;
            if ((d.value < 0 ? -1 : 1) === a) {
              if (a < 0) {
                b = c;
                c = d;
                d = b
              }
            } else if (e > 2) {
              if (c.value < -d.value) c = d;
              d = f.array.binarySearch(b, 0, this.type.comparer(), function(g) {
                return g.value
              });
              if (d < 0) {
                d = ~d;
                e = b[d - 1];
                b = b[d];
                d = -e.value <
                  b.value ? e : b
              } else d = b[d]
            } else if (c.value < -d.value) {
              b = c;
              c = d;
              d = b
            }
          }
          return {
            min: d,
            max: c
          }
        }
      }
    },
    min: function(a) {
      a = this.atoms(a);
      var b = a.length;
      if (b) {
        var c = this._nullAtom && a[0].value == null ? 1 : 0;
        return b > c ? a[c] : undefined
      }
    },
    max: function(a) {
      a = this.atoms(a);
      var b = a.length;
      return b && a[b - 1].value != null ? a[b - 1] : undefined
    },
    sum: function(a) {
      var b = !!f.get(a, "abs", false),
        c = f.get(a, "zeroIfNone", true),
        d = Da(a) + ":" + b,
        e = f.getOwn(this._sumCache, d);
      if (e === undefined) {
        var g = this.name;
        e = this.data.datums(null, a).reduce(function(h, j) {
          j =
            j.atoms[g].value;
          if (b && j < 0) j = -j;
          return h != null ? h + j : j
        }, null);
        (this._sumCache || (this._sumCache = {}))[d] = e
      }
      return c ? e || 0 : e
    },
    percent: function(a, b) {
      a = a instanceof i.data.Atom ? a.value : a;
      if (!a) return 0;
      return (b = this.sum(f.create(b, {
        abs: true
      }))) ? Math.abs(a) / b : 0
    },
    percentOverParent: function(a) {
      var b = this.sum(a);
      if (!b) return 0;
      var c = this.data.parent;
      if (!c) return 1;
      return (a = c.dimensionsSumAbs(this.name, a)) ? Math.abs(b) / a : 0
    },
    format: function(a, b) {
      return "" + (this.type._formatter ? this.type._formatter.call(null, a, b) :
        "")
    },
    intern: function(a, b) {
      if (a == null || a === "") return this._nullAtom || ga.call(this, a);
      if (a instanceof i.data.Atom) {
        if (a.dimension !== this) throw f.error.operationInvalid("Atom is of a different dimension.");
        return a
      }
      var c, d, e = this.type;
      if (typeof a === "object" && "v" in a) {
        d = a.f;
        a = a.v;
        if (a == null || a === "") return this._nullAtom || ga.call(this)
      }
      if (b) c = a;
      else if (c = e._converter) {
        c = c(a);
        if (c == null || c === "") return this._nullAtom || ga.call(this, a)
      } else c = a;
      var g = e.cast;
      if (g) {
        c = g(c);
        if (c == null || c === "") return this._nullAtom ||
          ga.call(this)
      }
      g = e._key;
      (g = "" + (g ? g(c) : c)) || f.fail.operationInvalid("Only a null value can have an empty key.");
      var h = this._atomsByKey[g];
      if (h) {
        !b && h.isVirtual && delete h.isVirtual;
        return h
      }
      return Ba.call(this, e, a, g, c, d, b)
    },
    read: function(a, b) {
      if (a == null || a === "") return null;
      var c, d = this.type;
      if (typeof a === "object" && "v" in a) {
        b = a.f;
        a = a.v;
        if (a == null || a === "") return null
      }
      c = (c = d._converter) ? c(a) : a;
      if (c == null || c === "") return null;
      var e = d.cast;
      if (e) {
        c = e(c);
        if (c == null || c === "") return null
      }
      e = d._key;
      e = "" + (e ? e(c) :
        c);
      var g = this._atomsByKey[e];
      if (g) return {
        rawValue: a,
        key: e,
        value: g.value,
        label: "" + (b == null ? g.label : b)
      };
      if (b == null) b = (b = d._formatter) ? b(c, a) : c;
      b = "" + b;
      return {
        rawValue: a,
        key: e,
        value: c,
        label: b
      }
    },
    dispose: function() {
      if (!this._disposed) {
        ia(this._children, "parent");
        ia(this._linkChildren, "linkParent");
        this.parent && ib.call(this.parent, this);
        this.linkParent && kb.call(this.linkParent, this);
        fa.call(this);
        this._atoms = this._nullAtom = this._virtualNullAtom = this._lazyInit = null;
        this._disposed = true
      }
    }
  });
  f.type("pvc.data.Data",
      i.data.Complex).init(function(a) {
      a || f.fail.argumentRequired("keyArgs");
      this._visibleNotNullDatums = new f.Map;
      var b, c, d, e, g, h, j = this.parent = a.parent || null;
      if (j) {
        this.root = j.root;
        this.depth = j.depth + 1;
        this.type = j.type;
        g = a.datums || f.fail.argumentRequired("datums");
        b = j.owner;
        c = a.atoms || f.fail.argumentRequired("atoms");
        e = a.dimNames || f.fail.argumentRequired("dimNames");
        d = j.atoms
      } else {
        this.root = this;
        e = [];
        var l = a.linkParent || null;
        if (l) {
          b = l.owner;
          this.type = b.type;
          g = a.datums || f.fail.argumentRequired("datums");
          this._leafs = [];
          d = l.atoms;
          h = f.get(a, "index", null);
          qb.call(l, this, h)
        } else {
          b = this;
          d = {};
          if (a.labelSep) this.labelSep = a.labelSep;
          if (a.keySep) this.keySep = a.keySep;
          this.type = a.type || f.fail.argumentRequired("type");
          this._selectedNotNullDatums = new f.Map
        }
      }
      g && na.call(this, g);
      this.owner = b;
      this._atomsBase = d;
      this._dimensions = {};
      this.type.dimensionsList().forEach(this._initDimension, this);
      this.base(b, c, e, d, true);
      u.Dom.Node.call(this, null);
      delete this.nodeValue;
      this._children = this.childNodes;
      if (j) {
        h = f.get(a, "index",
          null);
        pb.call(j, this, h);
        this.absLabel = j.absLabel ? f.string.join(b.labelSep, j.absLabel, this.label) : this.label;
        this.absKey = j.absKey ? f.string.join(b.keySep, j.absKey, this.key) : this.key
      } else {
        this.absLabel = this.label;
        this.absKey = this.key
      }
    }).add(u.Dom.Node).add({
      parent: null,
      linkParent: null,
      _dimensions: null,
      _freeDimensionNames: null,
      _children: null,
      _linkChildren: null,
      _leafs: null,
      _childrenByKey: null,
      _visibleNotNullDatums: null,
      _selectedNotNullDatums: null,
      _groupByCache: null,
      _sumAbsCache: null,
      treeHeight: null,
      _groupOper: null,
      _groupSpec: null,
      _groupLevel: null,
      _datums: null,
      _datumsById: null,
      depth: 0,
      label: "",
      absLabel: "",
      _disposed: false,
      _isFlattenGroup: false,
      _isDegenerateFlattenGroup: false,
      _initDimension: function(a) {
        this._dimensions[a.name] = new i.data.Dimension(this, a)
      },
      dimensions: function(a, b) {
        if (a == null) return this._dimensions;
        var c = f.getOwn(this._dimensions, a);
        if (!c && f.get(b, "assertExists", true)) throw f.error.argumentInvalid("name", "Undefined dimension '{0}'.", [a]);
        return c
      },
      freeDimensionNames: function() {
        if (!this._freeDimensionNames) {
          var a =
            this._freeDimensionNames = [];
          f.eachOwn(this._dimensions, function(b, c) {
            b = this.atoms[c];
            if (!(b instanceof i.data.Atom) || b.value == null) a.push(c)
          }, this)
        }
        return this._freeDimensionNames
      },
      isOwner: function() {
        return this.owner === this
      },
      children: function() {
        return this._children ? f.query(this._children) : f.query()
      },
      child: function(a) {
        return this._childrenByKey ? this._childrenByKey[a] || null : null
      },
      childCount: function() {
        return this._children ? this._children.length : 0
      },
      leafs: function() {
        return f.query(this._leafs)
      },
      count: function() {
        return this._datums.length
      },
      firstDatum: function() {
        return this._datums.length ? this._datums[0] : null
      },
      singleDatum: function() {
        var a = this._datums;
        return a.length === 1 ? a[0] : null
      },
      dispose: function() {
        if (!this._disposed) {
          la.call(this);
          this._selectedNotNullDatums && this._selectedNotNullDatums.clear();
          this._visibleNotNullDatums.clear();
          f.eachOwn(this._dimensions, function(a) {
            a.dispose()
          });
          if (this.parent) {
            this.parent.removeChild(this);
            this.parent = null
          }
          this.linkParent && rb.call(this.linkParent, this);
          this._disposed = true
        }
      },
      disposeChildren: function() {
        la.call(this)
      }
    });
  i.data.Data.add({
    selectedCount: function() {
      if (!this.isOwner()) return this.datums(null, {
        selected: true
      }).count();
      return this._selectedNotNullDatums.count
    },
    selectedDatums: function() {
      if (!this.isOwner()) return this.datums(null, {
        selected: true
      }).array();
      return this._selectedNotNullDatums.values()
    },
    selectedDatumMap: function() {
      if (!this.isOwner()) {
        var a = this.datums(null, {
          selected: true
        }).object({
          name: f.propGet("id")
        });
        return new f.Set(a)
      }
      return this._selectedNotNullDatums.clone()
    },
    visibleCount: function() {
      return this._visibleNotNullDatums.count
    },
    replaceSelected: function(a) {
      f.array.is(a) || (a = a.array());
      var b = f.query(a).where(ta).object({
          name: Kb
        }),
        c = this.owner.clearSelected(function(d) {
          return !f.hasOwn(b, d.id)
        });
      c |= i.data.Data.setSelected(a, true);
      return c
    },
    clearSelected: function(a) {
      if (this.owner !== this) return this.owner.clearSelected(a);
      if (!this._selectedNotNullDatums.count) return false;
      var b;
      if (a) {
        b = false;
        this._selectedNotNullDatums.values().filter(a).forEach(function(c) {
          b = true;
          Aa.call(c);
          this._selectedNotNullDatums.rem(c.id)
        }, this)
      } else {
        b =
          true;
        this._selectedNotNullDatums.values().forEach(function(c) {
          Aa.call(c)
        });
        this._selectedNotNullDatums.clear()
      }
      return b
    }
  });
  i.data.Data.setSelected = function(a, b) {
    var c = 0;
    a && f.query(a).each(function(d) {
      c |= d.setSelected(b)
    });
    return !!c
  };
  i.data.Data.toggleSelected = function(a, b) {
    f.array.isLike(a) || (a = f.query(a).array());
    var c = f.query(a);
    b = b ? c.any(ta) : c.all(db);
    return this.setSelected(a, !b)
  };
  i.data.Data.setVisible = function(a, b) {
    var c = 0;
    a && f.query(a).each(function(d) {
      c |= d.setVisible(b)
    });
    return !!c
  };
  i.data.Data.toggleVisible =
    function(a) {
      f.array.isLike(a) || (a = f.query(a).array());
      var b = f.query(a).all(f.propGet("isVisible"));
      return i.data.Data.setVisible(a, !b)
    };
  f.space("pvc.data").FlatteningMode = f.set(f.makeEnum(["DfsPre", "DfsPost"]), "None", 0);
  f.type("pvc.data.GroupingSpec").init(function(a, b, c) {
    this.type = b || null;
    var d = [];
    this.hasCompositeLevels = false;
    var e = [];
    this.levels = f.query(a || undefined).where(function(g) {
      return g.dimensions.length > 0
    }).select(function(g) {
      d.push(g.id);
      f.array.append(e, g.dimensionNames());
      if (!this.hasCompositeLevels &&
        g.dimensions.length > 1) this.hasCompositeLevels = true;
      g._setAccDimNames(e.slice(0));
      return g
    }, this).array();
    this._dimNames = e;
    this.depth = this.levels.length;
    this.isSingleDimension = (this.isSingleLevel = this.depth === 1) && !this.hasCompositeLevels;
    this.firstDimension = this.depth > 0 ? this.levels[0].dimensions[0] : null;
    this.rootLabel = f.get(c, "rootLabel") || "";
    this.flatteningMode = f.get(c, "flatteningMode") || i.data.FlatteningMode.None;
    this._cacheKey = this._calcCacheKey();
    this.id = this._cacheKey + "##" + d.join("||")
  }).add({
    _calcCacheKey: function(a) {
      return [f.get(a,
        "flatteningMode") || this.flatteningMode, f.get(a, "reverse") || "false", f.get(a, "isSingleLevel") || this.isSingleLevel, f.get(a, "rootLabel") || this.rootLabel].join("#")
    },
    bind: function(a) {
      this.type = a || f.fail.argumentRequired("type");
      this.levels.forEach(function(b) {
        b.bind(a)
      })
    },
    dimensions: function() {
      return f.query(this.levels).prop("dimensions").selectMany()
    },
    dimensionNames: function() {
      return this._dimNames
    },
    view: function(a) {
      return a.view(this.dimensionNames())
    },
    isDiscrete: function() {
      var a;
      return !this.isSingleDimension ||
        !!(a = this.firstDimension) && a.type.isDiscrete
    },
    firstDimensionType: function() {
      var a = this.firstDimension;
      return a && a.type
    },
    firstDimensionName: function() {
      var a = this.firstDimensionType();
      return a && a.name
    },
    firstDimensionValueType: function() {
      var a = this.firstDimensionType();
      return a && a.valueType
    },
    isNull: function() {
      return !this.levels.length
    },
    ensure: function(a) {
      var b;
      if (a) {
        var c = this._calcCacheKey(a);
        if (c !== this._cacheKey) {
          var d = f.lazy(this, "_groupingCache");
          (b = f.getOwn(d, c)) || (b = d[c] = this._ensure(a))
        }
      }
      return b ||
        this
    },
    _ensure: function(a) {
      var b = this;
      if (f.get(a, "isSingleLevel") && !b.isSingleLevel) return b._singleLevelGrouping(a);
      if (f.get(a, "reverse")) return b._reverse(a);
      var c = f.get(a, "flatteningMode") || b.flatteningMode;
      a = f.get(a, "rootLabel") || b.rootLabel;
      if (c !== b.flatteningMode || a !== b.rootLabel) return new i.data.GroupingSpec(b.levels, b.type, {
        flatteningMode: c,
        rootLabel: a
      });
      return b
    },
    _singleLevelGrouping: function(a) {
      var b = !!f.get(a, "reverse"),
        c = this.dimensions().select(function(d) {
          return b ? new i.data.GroupingDimensionSpec(d.name, !d.reverse, d.type.complexType) : d
        });
      c = new i.data.GroupingLevelSpec(c, this.type);
      return new i.data.GroupingSpec([c], this.type, {
        flatteningMode: null,
        rootLabel: f.get(a, "rootLabel") || this.rootLabel
      })
    },
    _reverse: function(a) {
      var b = f.query(this.levels).select(function(c) {
        c = f.query(c.dimensions).select(function(d) {
          return new i.data.GroupingDimensionSpec(d.name, !d.reverse, d.type.complexType)
        });
        return new i.data.GroupingLevelSpec(c, this.type)
      });
      return new i.data.GroupingSpec(b, this.type, {
        flatteningMode: f.get(a,
          "flatteningMode") || this.flatteningMode,
        rootLabel: f.get(a, "rootLabel") || this.rootLabel
      })
    },
    toString: function() {
      return f.query(this.levels).select(function(a) {
        return "" + a
      }).array().join(", ")
    }
  });
  f.type("pvc.data.GroupingLevelSpec").init(function(a, b) {
    var c = [],
      d = [];
    this.dimensions = f.query(a).select(function(g) {
      c.push(g.id);
      d.push(g.name);
      return g
    }).array();
    this._dimNames = d;
    this.dimensionsInDefOrder = this.dimensions.slice(0);
    b && this._sortDimensions(b);
    this.id = c.join(",");
    this.depth = this.dimensions.length;
    var e = this;
    this.comparer = function(g, h) {
      return e.compare(g, h)
    }
  }).add({
    _sortDimensions: function(a) {
      a.sortDimensionNames(this.dimensionsInDefOrder, function(b) {
        return b.name
      })
    },
    _setAccDimNames: function(a) {
      this._accDimNames = a
    },
    accDimensionNames: function() {
      return this._accDimNames
    },
    dimensionNames: function() {
      return this._dimNames
    },
    bind: function(a) {
      this._sortDimensions(a);
      this.dimensions.forEach(function(b) {
        b.bind(a)
      })
    },
    compare: function(a, b) {
      for (var c = 0, d = this.depth; c < d; c++) {
        var e = this.dimensions[c].compareDatums(a,
          b);
        if (e !== 0) return e
      }
      return 0
    },
    key: function(a) {
      var b = "",
        c = {},
        d = a.atoms,
        e = this._dimNames;
      a = a.owner.keySep;
      for (var g = 0, h = this.depth; g < h; g++) {
        var j = e[g],
          l = d[j];
        c[j] = l;
        if (g) b += a + l.key;
        else b = l.key
      }
      return {
        key: b,
        atoms: c,
        dimNames: e
      }
    },
    toString: function() {
      return f.query(this.dimensions).select(function(a) {
        return "" + a
      }).array().join("|")
    }
  });
  f.type("pvc.data.GroupingDimensionSpec").init(function(a, b, c) {
    this.name = a;
    this.reverse = !!b;
    this.id = this.name + ":" + (this.reverse ? "0" : "1");
    c && this.bind(c)
  }).add({
    type: null,
    comparer: null,
    bind: function(a) {
      a || f.fail.argumentRequired("type");
      this.type = a.dimensions(this.name);
      this.comparer = this.type.atomComparer(this.reverse)
    },
    compareDatums: function(a, b) {
      return this.comparer(a.atoms[this.name], b.atoms[this.name])
    },
    toString: function() {
      return this.name + (this.reverse ? " desc" : "")
    }
  });
  i.data.GroupingSpec.parse = function(a, b) {
    if (!a) return new i.data.GroupingSpec(null, b);
    var c;
    if (f.array.is(a)) c = a;
    else if (f.string.is(a)) c = a.split(/\s*,\s*/);
    a = f.query(c).select(function(d) {
      d = tb(d,
        b);
      return new i.data.GroupingLevelSpec(d, b)
    });
    return new i.data.GroupingSpec(a, b)
  };
  var ub = /^\s*(.+?)(?:\s+(asc|desc))?\s*$/i;
  f.type("pvc.data.DataOper").init(function(a) {
    a || f.fail.argumentRequired("linkParent");
    this._linkParent = a
  }).add({
    key: null,
    execute: f.method({
      isAbstract: true
    })
  });
  f.type("pvc.data.GroupingOper", i.data.DataOper).init(function(a, b, c) {
    b || f.fail.argumentRequired("groupingSpecs");
    this.base(a, c);
    this._where = f.get(c, "where");
    this._visible = f.get(c, "visible", null);
    this._selected = f.get(c,
      "selected", null);
    this._isNull = f.get(c, "isNull", null);
    var d = this._selected == null,
      e = "";
    if (this._where) {
      e = f.get(c, "whereKey");
      if (!e)
        if (!c || e === null) d = false;
        else {
          e = "" + f.nextId("dataOperWhereKey");
          c.whereKey = e
        }
    }
    var g = [];
    this._groupSpecs = f.array.as(b).map(function(h) {
      if (h instanceof i.data.GroupingSpec) {
        if (h.type !== a.type) throw f.error.argumentInvalid("groupingSpecText", "Invalid associated complex type.");
      } else h = i.data.GroupingSpec.parse(h, a.type);
      g.push(h.id);
      return h
    });
    if (d) this.key = g.join("!!") + "||visible:" +
      this._visible + "||isNull:" + this._isNull + "||where:" + e
  }).add({
    execute: function() {
      return this._generateData(this._group(qa(f.query(this._linkParent._datums), {
        visible: this._visible,
        selected: this._selected,
        isNull: this._isNull,
        where: this._where
      })), null, this._linkParent)
    },
    executeAdd: function(a, b) {
      b = this._group(qa(f.query(b), {
        visible: this._visible,
        selected: this._selected,
        isNull: this._isNull,
        where: this._where
      }));
      this._generateData(b, null, this._linkParent, a);
      return b.datums
    },
    _group: function(a) {
      var b = {
        isRoot: true,
        treeHeight: f.query(this._groupSpecs).select(function(c) {
          var d = c.levels.length;
          if (!d) return 0;
          return c.flatteningMode ? 1 : d
        }).reduce(f.add, 0),
        datums: []
      };
      b.treeHeight > 0 && this._groupSpecRecursive(b, a, 0);
      return b
    },
    _groupSpecRecursive: function(a, b, c) {
      function d(n, o, p) {
        var q = g[p];
        if (!j) {
          n.children = [];
          n.groupSpec = e;
          n.groupLevelSpec = q
        }
        o = this._groupDatums(q, n, o, j);
        var s = p === h - 1;
        var r = (q = j && !m) ? [] : n.datums;
        o.forEach(function(t) {
          var A = t.datums;
          if (!(m && s)) t.datums = [];
          var x;
          if (j) {
            f.array.lazy(n, "_children").push(t);
            if (f.hasOwn(a.childrenByKey, t.key)) {
              f.array.append(r, A);
              return
            }
            x = a.children.length;
            if (!k) {
              a.children.push(t);
              a.childrenByKey[t.key] = t;
              n.isFlattenGroup = true
            }
          } else n.children.push(t);
          if (s) m || this._groupSpecRecursive(t, A, l);
          else d.call(this, t, A, p + 1);
          f.array.append(r, t.datums);
          if (j && k) {
            if (f.hasOwn(a.childrenByKey, t.key)) {
              t.isFlattenGroup || f.assert("Must be a parent for duplicate keys to exist.");
              if (t._children.length === 1) {
                a.children.splice(x, a.children.length - x);
                t.isDegenerateFlattenGroup = true
              }
            }
            a.children.push(t);
            a.childrenByKey[t.key] = t;
            n.isFlattenGroup = true
          }
        }, this);
        q && this._groupSpecRecursive(n, r, l)
      }
      var e = this._groupSpecs[c],
        g = e.levels,
        h = g.length,
        j = !!e.flatteningMode,
        l = c + 1,
        m = l >= this._groupSpecs.length,
        k = j && e.flatteningMode === i.data.FlatteningMode.DfsPost;
      if (j) {
        a.children = [];
        a.childrenByKey = {};
        c = {
          key: "",
          absKey: "",
          atoms: {},
          datums: [],
          label: e.rootLabel,
          dimNames: []
        };
        if (!k) {
          a.children.push(c);
          a.childrenByKey[""] = c
        }
      } else {
        if (a.isRoot) a.label = e.rootLabel;
        c = a
      }
      d.call(this, c, b, 0);
      if (j) {
        k && a.children.push(c);
        a.datums =
          c.datums
      }
    },
    _groupDatums: function(a, b, c, d) {
      var e = [],
        g = new f.OrderedMap;
      f.query(c).each(function(h) {
        var j = a.key(h),
          l = j.key,
          m = g.get(l);
        if (m) m.datums.push(h);
        else {
          m = j;
          m.datums = [h];
          if (d) {
            f.copy(m.atoms, b.atoms);
            if (b.dimNames.length) {
              j = h.owner.keySep;
              for (var k = j.length, n = m.absKey = b.absKey + j + l; n.lastIndexOf(j) === n.length - k;) n = n.substr(0, n.length - k);
              m.key = n
            } else m.absKey = l;
            m.dimNames = a.accDimensionNames()
          }
          h = f.array.insert(e, h, a.comparer);
          g.add(l, m, ~h)
        }
      });
      return g
    },
    _generateData: function(a, b, c, d) {
      var e, g;
      if (a.isRoot)
        if (d) {
          e = d;
          Fa.call(e, a.datums)
        } else {
          g = true;
          e = new i.data.Data({
            linkParent: c,
            datums: a.datums
          });
          e.treeHeight = a.treeHeight;
          e._groupOper = this
        } else {
        if (d)(e = f.get(c._childrenByKey, a.key)) && pa.call(e, a.datums);
        if (!e) {
          g = true;
          var h, j;
          if (d && (j = c._children)) h = ~f.array.binarySearch(j, a.datums[0], b.groupLevelSpec.comparer);
          e = new i.data.Data({
            parent: c,
            atoms: a.atoms,
            dimNames: a.dimNames,
            datums: a.datums,
            index: h
          })
        }
      }
      if (g) {
        if (a.isFlattenGroup) {
          e._isFlattenGroup = true;
          e._isDegenerateFlattenGroup = !!a.isDegenerateFlattenGroup
        }
        if (b =
          a.label) {
          e.label += b;
          e.absLabel += b
        }
      }
      if ((b = a.children) && b.length) {
        if (g) {
          e._groupSpec = a.groupSpec;
          e._groupLevelSpec = a.groupLevelSpec
        }
        b.forEach(function(l) {
          this._generateData(l, a, e, d)
        }, this)
      } else if (g && !a.isRoot) {
        g = e.root._leafs;
        e.leafIndex = g.length;
        g.push(e)
      }
      return e
    }
  });
  f.type("pvc.data.LinearInterpolationOper").init(function(a, b, c, d, e, g) {
    this._newDatums = [];
    this._data = b;
    a = c.flatten(a, {
      ignoreNulls: false
    })._children;
    var h = this._serDatas1 = d.isBound() ? d.flatten(b).children().array() : [null];
    this._isCatDiscrete =
      c.grouping.isDiscrete();
    this._firstCatDim = !this._isCatDiscrete ? b.owner.dimensions(c.firstDimensionName()) : null;
    this._stretchEnds = g;
    var j = this._valDim = b.owner.dimensions(e.firstDimensionName()),
      l = {
        visible: true,
        zeroIfNone: false
      };
    this._catInfos = a.map(function(m, k) {
      var n = b._childrenByKey[m.key],
        o = {
          data: n || m,
          value: m.value,
          isInterpolated: false,
          serInfos: null,
          index: k
        };
      o.serInfos = h.map(function(p) {
        var q = n;
        if (q && p) q = q._childrenByKey[p.key];
        var s = q ? q.dimensions(j.name).sum(l) : null;
        return {
          data: p,
          group: q,
          value: s,
          isNull: s == null,
          catInfo: o
        }
      }, this);
      return o
    });
    this._serCount = h.length;
    this._serStates = f.range(0, this._serCount).select(function(m) {
      return new i.data.LinearInterpolationOperSeriesState(this, m)
    }, this).array()
  }).add({
    interpolate: function() {
      for (var a; a = this._catInfos.shift();) a.serInfos.forEach(this._visitSeries, this);
      a = this._newDatums;
      a.length && this._data.owner.add(a)
    },
    _visitSeries: function(a, b) {
      this._serStates[b].visit(a)
    },
    nextUnprocessedNonNullCategOfSeries: function(a) {
      for (var b = 0, c = this._catInfos.length; b <
        c;) {
        var d = this._catInfos[b++].serInfos[a];
        if (!d.isNull) return d
      }
    }
  });
  f.type("pvc.data.LinearInterpolationOperSeriesState").init(function(a, b) {
    this.interpolation = a;
    this.index = b;
    this._lastNonNull(null)
  }).add({
    visit: function(a) {
      a.isNull ? this._interpolate(a) : this._lastNonNull(a)
    },
    _lastNonNull: function(a) {
      if (arguments.length) {
        this.__lastNonNull = a;
        this.__nextNonNull = undefined
      }
      return this.__lastNonNull
    },
    _nextNonNull: function() {
      return this.__nextNonNull
    },
    _initInterpData: function() {
      if (this.__nextNonNull ===
        undefined) {
        var a = this.__lastNonNull,
          b = this.__nextNonNull = this.interpolation.nextUnprocessedNonNullCategOfSeries(this.index) || null;
        if (b && a) {
          var c = b.value - a.value;
          if (this.interpolation._isCatDiscrete) {
            b = b.catInfo.index - a.catInfo.index;
            b >= 2 || f.assert("Must have at least one interpolation point.");
            this._stepValue = c / b;
            this._middleIndex = ~~(b / 2);
            this._isOdd = (b - 1) % 2 > 0
          } else {
            a = +a.catInfo.value;
            b = +b.catInfo.value;
            this._steep = c / (b - a);
            this._middleCat = (b + a) / 2
          }
        }
      }
    },
    _interpolate: function(a) {
      this._initInterpData();
      var b = this.__nextNonNull,
        c = this.__lastNonNull,
        d = b || c;
      if (d) {
        var e = this.interpolation,
          g = a.catInfo;
        if (b && c)
          if (e._isCatDiscrete) {
            d = g.index - c.catInfo.index;
            a = c.value + this._stepValue * d;
            b = this._isOdd ? d < this._middleIndex ? c.group : b.group : d <= this._middleIndex ? c.group : b.group
          } else {
            d = +g.value;
            a = c.value + this._steep * (d - +c.catInfo.value);
            b = d < this._middleCat ? c.group : b.group
          } else {
          if (!e._stretchEnds) return;
          a = d.value;
          b = d.group
        }
        c = Object.create(b._datums[0].atoms);
        f.copyOwn(c, g.data.atoms);
        a = e._valDim.intern(a, true);
        c[a.dimension.name] = a;
        a = new i.data.Datum(b.owner, c);
        a.isVirtual = true;
        a.isInterpolated = true;
        a.interpolation = "linear";
        e._newDatums.push(a)
      }
    }
  });
  f.type("pvc.data.ZeroInterpolationOper").init(function(a, b, c, d, e, g) {
    this._newDatums = [];
    this._data = b;
    a = c.flatten(a, {
      ignoreNulls: false
    })._children;
    var h = this._serDatas1 = d.isBound() ? d.flatten(b).children().array() : [null];
    this._isCatDiscrete = c.grouping.isDiscrete();
    this._firstCatDim = !this._isCatDiscrete ? b.owner.dimensions(c.firstDimensionName()) : null;
    this._stretchEnds =
      g;
    var j = this._valDim = b.owner.dimensions(e.firstDimensionName()),
      l = {
        visible: true,
        zeroIfNone: false
      };
    this._catInfos = a.map(function(m, k) {
      var n = b._childrenByKey[m.key],
        o = {
          data: n || m,
          value: m.value,
          isInterpolated: false,
          serInfos: null,
          index: k
        };
      o.serInfos = h.map(function(p) {
        var q = n;
        if (q && p) q = q._childrenByKey[p.key];
        var s = q ? q.dimensions(j.name).sum(l) : null;
        return {
          data: p,
          group: q,
          value: s,
          isNull: s == null,
          catInfo: o
        }
      }, this);
      return o
    });
    this._serCount = h.length;
    this._serStates = f.range(0, this._serCount).select(function(m) {
      return new i.data.ZeroInterpolationOperSeriesState(this,
        m)
    }, this).array()
  }).add({
    interpolate: function() {
      for (var a; a = this._catInfos.shift();) a.serInfos.forEach(this._visitSeries, this);
      a = this._newDatums;
      a.length && this._data.owner.add(a)
    },
    _visitSeries: function(a, b) {
      this._serStates[b].visit(a)
    },
    nextUnprocessedNonNullCategOfSeries: function(a) {
      for (var b = 0, c = this._catInfos.length; b < c;) {
        var d = this._catInfos[b++].serInfos[a];
        if (!d.isNull) return d
      }
    }
  });
  f.type("pvc.data.ZeroInterpolationOperSeriesState").init(function(a, b) {
    this.interpolation = a;
    this.index = b;
    this._lastNonNull(null)
  }).add({
    visit: function(a) {
      a.isNull ?
        this._interpolate(a) : this._lastNonNull(a)
    },
    _lastNonNull: function(a) {
      if (arguments.length) {
        this.__lastNonNull = a;
        this.__nextNonNull = undefined
      }
      return this.__lastNonNull
    },
    _nextNonNull: function() {
      return this.__nextNonNull
    },
    _initInterpData: function() {
      if (this.__nextNonNull === undefined) {
        var a = this.__lastNonNull,
          b = this.__nextNonNull = this.interpolation.nextUnprocessedNonNullCategOfSeries(this.index) || null;
        if (b && a)
          if (this.interpolation._isCatDiscrete) {
            a = b.catInfo.index - a.catInfo.index;
            a >= 2 || f.assert("Must have at least one interpolation point.");
            this._middleIndex = ~~(a / 2);
            this._isOdd = (a - 1) % 2 > 0
          } else this._middleCat = (+b.catInfo.value + +a.catInfo.value) / 2
      }
    },
    _interpolate: function(a) {
      this._initInterpData();
      var b = this.__nextNonNull,
        c = this.__lastNonNull,
        d = b || c;
      if (d) {
        var e = this.interpolation;
        a = a.catInfo;
        if (b && c)
          if (e._isCatDiscrete) {
            d = a.index - c.catInfo.index;
            b = this._isOdd ? d < this._middleIndex ? c.group : b.group : d <= this._middleIndex ? c.group : b.group
          } else b = +a.value < this._middleCat ? c.group : b.group;
        else {
          if (!e._stretchEnds) return;
          b = d.group
        }
        c = Object.create(b._datums[0].atoms);
        f.copyOwn(c, a.data.atoms);
        a = e._zeroAtom || (e._zeroAtom = e._valDim.intern(0, true));
        c[a.dimension.name] = a;
        a = new i.data.Datum(b.owner, c);
        a.isVirtual = true;
        a.isInterpolated = true;
        a.interpolation = "zero";
        e._newDatums.push(a)
      }
    }
  });
  i.data.Data.add({
    load: function(a, b) {
      Ea.call(this);
      var c = f.get(b, "where"),
        d = f.get(b, "isNull");
      a = f.query(a).select(function(e) {
        e = new i.data.Datum(this, e);
        if (d && d(e)) e.isNull = true;
        if (c && !c(e)) return null;
        return e
      }, this);
      na.call(this, a, {
        doAtomGC: true
      })
    },
    clearVirtuals: function() {
      var a = this._datums;
      if (a) {
        this._sumAbsCache = null;
        for (var b = this._visibleNotNullDatums, c = this._selectedNotNullDatums, d = 0, e = a.length, g; d < e;) {
          var h = a[d];
          if (h.isVirtual) {
            g = h.id;
            c && h.isSelected && c.rem(g);
            h.isVisible && b.rem(g);
            a.splice(d, 1);
            e--;
            g = true
          } else d++
        }
        if (g) {
          if (!a.length && this.parent) {
            this.dispose();
            return
          }
          if (a = this._children) {
            d = 0;
            for (e = a.length; d < e;) {
              b = a[d];
              b.clearVirtuals();
              if (b.parent) d++;
              else e--
            }
          }
          this._linkChildren && this._linkChildren.forEach(function(j) {
            j.clearVirtuals()
          })
        }
      }
      f.eachOwn(this._dimensions, function(j) {
        gb.call(j)
      })
    },
    add: function(a) {
      Ea.call(this);
      na.call(this, a, {
        isAdditive: true,
        doAtomGC: true
      })
    },
    groupBy: function(a, b) {
      a = new i.data.GroupingOper(this, a, b);
      b = a.key;
      var c, d;
      if (b) d = (c = this._groupByCache) && c[b];
      if (d) i.debug >= 7 && i.log("[GroupBy] Cache key hit '" + b + "'");
      else {
        if (i.debug >= 7) i.log("[GroupBy] " + (b ? "Cache key not found: '" + b + "'" : "No Cache key"));
        d = a.execute();
        if (b)(c || (this._groupByCache = {}))[b] = d
      }
      return d
    },
    where: function(a, b) {
      a = this.datums(a, b);
      return new i.data.Data({
        linkParent: this,
        datums: a
      })
    },
    datums: function(a,
                     b) {
      if (!a) {
        if (!b) return f.query(this._datums);
        return qa(f.query(this._datums), b)
      }
      a = Ga.call(this, a, b);
      return Ha.call(this, a, b)
    },
    datum: function(a, b) {
      a || f.fail.argumentRequired("whereSpec");
      a = Ga.call(this, a, b);
      return Ha.call(this, a, b).first() || null
    },
    dimensionsSumAbs: function(a, b) {
      var c = a + ":" + Da(b),
        d = f.getOwn(this._sumAbsCache, c);
      if (d == null) {
        d = this.children().where(function(e) {
          return !e._isFlattenGroup || e._isDegenerateFlattenGroup
        }).select(function(e) {
          return Math.abs(e.dimensions(a).sum(b))
        }, this).reduce(f.add,
            0);
        (this._sumAbsCache || (this._sumAbsCache = {}))[c] = d
      }
      return d
    }
  });
  i.data.Data.add({
    getInfo: function() {
      var a = ["DATA SUMMARY", i.logSeparator, "  Dimension", i.logSeparator];
      f.eachOwn(this.dimensions(), function(b, c) {
        var d = b.count(),
          e = b.type,
          g = [];
        g.push('"' + e.label + '"');
        g.push(e.valueTypeName);
        e.isComparable && g.push("comparable");
        e.isDiscrete || g.push("continuous");
        e.isHidden && g.push("hidden");
        a.push("  " + c + " (" + g.join(", ") + ") (" + d + ")\n\t" + b.atoms().slice(0, 10).map(function(h) {
          return h.label
        }).join(", ") +
          (d > 10 ? "..." : ""))
      });
      return a.join("\n")
    },
    getValues: function() {
      return u.range(0, this.getCategoriesSize()).map(function(a) {
        return this._getValuesForCategoryIndex(a)
      }, this)
    },
    _getDimensionValues: function(a) {
      return this.dimensions(a).atoms().map(function(b) {
        return b.value
      })
    },
    _getDimensionVisibleValues: function(a) {
      return this.dimensions(a).atoms({
        visible: true
      }).map(function(b) {
        return b.value
      })
    },
    getSeries: function() {
      return this._getDimensionValues("series")
    },
    getVisibleSeriesIndexes: function() {
      return this.dimensions("series").indexes({
        visible: true
      })
    },
    getVisibleCategoriesIndexes: function() {
      return this.dimensions("category").indexes({
        visible: true
      })
    },
    getVisibleSeries: function() {
      return this._getDimensionVisibleValues("series")
    },
    getCategories: function() {
      return this._getDimensionValues("category")
    },
    getVisibleCategories: function() {
      return this._getDimensionVisibleValues("category")
    },
    _getValuesForCategoryIndex: function(a) {
      var b = this.datums({
        category: this.dimensions("category").atoms()[a]
      }).uniqueIndex(function(c) {
        return c.atoms.series.key
      });
      return this.dimensions("series").atoms().map(function(c) {
        return (c =
          f.getOwn(b, c.key)) ? c.atoms.value.value : null
      })
    },
    getSeriesSize: function() {
      var a = this.dimensions("series", {
        assertExists: false
      });
      return a ? a.count() : 0
    },
    getCategoriesSize: function() {
      var a = this.dimensions("category", {
        assertExists: false
      });
      return a ? a.count() : 0
    }
  });
  f.scope(function() {
    var a = f.makeEnum(["Interactive", "ShowsActivity", "ShowsSelection", "ShowsTooltip", "Selectable", "Unselectable", "Hoverable", "Clickable", "DoubleClickable", "SelectableByClick", "SelectableByRubberband", "SelectableByFocusWindow", "Animatable"]);
    a.ShowsInteraction = a.ShowsActivity | a.ShowsSelection;
    a.Actionable = a.Hoverable | a.Clickable | a.DoubleClickable | a.SelectableByClick;
    a.HandlesEvents = a.Actionable | a.ShowsTooltip;
    a.HandlesClickEvent = a.Clickable | a.SelectableByClick;
    f.type("pvc.visual.Interactive").addStatic(a).addStatic({
      ShowsAny: a.ShowsInteraction | a.ShowsTooltip,
      SelectableAny: a.Selectable | a.SelectableByClick | a.SelectableByRubberband | a.SelectableByFocusWindow
    }).add({
      _ibits: -1
    }).add(f.query(f.ownKeys(a)).object({
        name: f.firstLowerCase,
        value: function(b) {
          var c =
            a[b];
          return function() {
            return !!(this._ibits & c)
          }
        }
      }))
  });
  f.type("pvc.visual.Scene").init(function(a, b) {
    if (i.debug >= 4) this.id = f.nextId("scene");
    this._renderId = 0;
    this.renderState = {};
    u.Dom.Node.call(this, null);
    this.parent = a || null;
    if (a) {
      this.root = a.root;
      var c = f.get(b, "index", null);
      a.insertAt(this, c)
    } else {
      this.root = this;
      this._active = null;
      this._panel = f.get(b, "panel") || f.fail.argumentRequired("panel", "Argument is required on root scene.")
    }
    var d, e, g, h, j, l;
    if ((b = f.array.to(f.get(b, "source"))) && b.length) {
      this.source =
        b;
      d = b[0];
      if (d instanceof i.data.Data) {
        e = d;
        j = b;
        g = e.firstDatum() || f.query(j).select(function(m) {
          return m.firstDatum()
        }).first(f.notNully)
      } else {
        d instanceof i.data.Datum || f.assert("not a datum");
        g = d;
        h = b
      }
      b = d.atoms;
      l = g && g.atoms || d.atoms
    } else b = a ? (l = Object.create(a.atoms)) : (l = {});
    this.atoms = b;
    this.firstAtoms = l;
    j && (this.groups = j);
    e && (this.group = e);
    h && (this._datums = h);
    g && (this.datum = g);
    if (!d || d.isNull) this.isNull = true;
    this.vars = a ? Object.create(a.vars) : {}
  }).add(u.Dom.Node).add(i.visual.Interactive).add({
    source: null,
    groups: null,
    group: null,
    _datums: null,
    datum: null,
    isNull: false,
    data: function() {
      var a = this.group;
      if (!a) {
        for (var b = this; !a && (b = b.parent);) a = b.group;
        if (!a) a = this.panel.data
      }
      return a
    },
    datums: function() {
      return this.groups ? f.query(this.groups).selectMany(function(a) {
        return a.datums()
      }) : this._datums ? f.query(this._datums) : f.query()
    },
    format: function(a) {
      return f.format(a, this._formatScope, this)
    },
    _formatScope: function(a) {
      if (a.charAt(0) === "#") {
        a = a.substr(1).split(".");
        if (a.length > 2) throw f.error.operationInvalid("Scene format mask is invalid.");
        var b = this.firstAtoms[a[0]];
        if (b) {
          if (a.length > 1) switch (a[1]) {
            case "value":
              return b.value;
            case "label":
              break;
            default:
              throw f.error.operationInvalid("Scene format mask is invalid.");
          }
          return b
        }
        return null
      }
      return f.getPath(this.vars, a)
    },
    isRoot: function() {
      return this.root === this
    },
    panel: function() {
      return this.root._panel
    },
    chart: function() {
      return this.root._panel.chart
    },
    compatVersion: function() {
      return this.root._panel.compatVersion()
    },
    children: function() {
      return this.childNodes ? f.query(this.childNodes) : f.query()
    },
    leafs: function() {
      function a(c) {
        for (; c.childNodes.length;) c = c.childNodes[0];
        return c
      }
      var b = this;
      return f.query(function(c) {
        if (!c) {
          c = a(b);
          if (c === b) return 0;
          this.item = c;
          return 1
        }
        if (c = this.item.nextSibling) {
          this.item = c;
          return 1
        }
        for (var d = this.item; d !== b && (d = d.parentNode);)
          if (c = d.nextSibling) {
            this.item = a(c);
            return 1
          }
        return 0
      })
    },
    anyInteraction: function() {
      return !!this.root._active || this.anySelected()
    },
    isActive: false,
    setActive: function(a) {
      a = !!a;
      if (this.isActive !== a) Ia.call(this.root, this.isActive ? null : this)
    },
    clearActive: function() {
      return Ia.call(this.root, null)
    },
    anyActive: function() {
      return !!this.root._active
    },
    active: function() {
      return this.root._active
    },
    activeSeries: function() {
      var a = this.active(),
        b;
      return a && (b = a.vars.series) && b.value
    },
    isActiveSeries: function() {
      if (this.isActive) return true;
      var a = this.renderState.isActiveSeries;
      if (a == null) {
        var b;
        a = (b = this.activeSeries()) != null && b === this.vars.series.value;
        this.renderState.isActiveSeries = a
      }
      return a
    },
    isActiveDatum: function() {
      if (this.isActive) return true;
      var a =
        this.renderState.isActiveDatum;
      if (a == null) {
        a = (a = this.active()) ? this.group && a.group === this.group || this.datum && a.datum === this.datum : false;
        this.renderState.isActiveDatum = a
      }
      return a
    },
    isActiveDescendantOrSelf: function() {
      if (this.isActive) return true;
      return f.lazy(this.renderState, "isActiveDescOrSelf", this._calcIsActiveDescOrSelf, this)
    },
    _calcIsActiveDescOrSelf: function() {
      var a = this.active();
      if (a)
        for (; a = a.parent;)
          if (a === this) return true;
      return false
    },
    isVisible: function() {
      return this._visibleData().is
    },
    anyVisible: function() {
      return this._visibleData().any
    },
    _visibleData: function() {
      return f.lazy(this.renderState, "_visibleData", this._createVisibleData, this)
    },
    _createVisibleData: function() {
      var a = this.chart().data.owner.visibleCount() > 0,
        b = a && this.datums().any(f.propGet("isVisible"));
      return {
        any: a,
        is: b
      }
    },
    isSelected: function() {
      return this._selectedData().is
    },
    anySelected: function() {
      return this._selectedData().any
    },
    _selectedData: function() {
      return f.lazy(this.renderState, "_selectedData", this._createSelectedData, this)
    },
    _createSelectedData: function() {
      var a = this.chart().data.owner.selectedCount() >
          0,
        b = a && this.datums().any(ta);
      return {
        any: a,
        is: b
      }
    },
    select: function(a) {
      var b = this,
        c = b.datums().array();
      if (c.length) {
        var d = b.chart();
        d._updatingSelections(function() {
          if ((c = d._onUserSelection(c)) && c.length) d.options.ctrlSelectMode && f.get(a, "replace", true) ? d.data.replaceSelected(c) : i.data.Data.toggleSelected(c)
        })
      }
    },
    isSelectedDescendantOrSelf: function() {
      if (this.isSelected()) return true;
      return f.lazy(this.renderState, "isSelectedDescOrSelf", this._calcIsSelectedDescOrSelf, this)
    },
    _calcIsSelectedDescOrSelf: function() {
      var a =
        this.firstChild;
      if (a) {
        do
          if (a.isSelectedDescendantOrSelf()) return true;
        while (a = a.nextSibling)
      }
      return false
    },
    toggleVisible: function() {
      i.data.Data.toggleVisible(this.datums()) && this.chart().render(true, true, false)
    }
  });
  i.visual.Scene.prototype.variable = function(a, b) {
    var c = this,
      d;
    if (a in c) {
      if (b !== undefined) d = f.set({}, "_" + a + "EvalCore", f.fun.to(b))
    } else {
      if (!c.hasOwnProperty("_vars")) c._vars = f.create(c._vars);
      c._vars[a] = true;
      d = {};
      var e = "_" + a + "Eval";
      d[a] = xb(a, e);
      a = e + "Core";
      f.hasOwn(c, e) || (d[e] = f.methodCaller(a));
      f.hasOwn(c, a) || (d[a] = f.fun.to(b === undefined ? null : b))
    }
    d && c.constructor.add(d);
    return c
  };
  var I = i.visual.ValueLabelVar = function(a, b, c, d) {
    this.value = a;
    this.label = b;
    if (c !== undefined) this.rawValue = c;
    if (d !== undefined) this.absLabel = d
  };
  f.set(I.prototype, "rawValue", undefined, "absLabel", undefined, "setValue", function(a) {
    this.value = a;
    return this
  }, "setLabel", function(a) {
    this.label = a;
    return this
  }, "clone", function() {
    return new I(this.value, this.label, this.rawValue)
  }, "toString", function() {
    var a = this.label || this.value;
    return a == null ? "" : typeof a !== "string" ? "" + a : a
  });
  I.fromComplex = function(a) {
    return a ? new I(a.value, a.label, a.rawValue, a.absLabel) : new I(null, "", null)
  };
  I.fromAtom = I.fromComplex;
  f.type("pvc.visual.Context").init(function(a, b, c) {
    this.chart = a.chart;
    this.panel = a;
    Ka.call(this, b, c)
  }).add({
    isPinned: false,
    pin: function() {
      this.isPinned = true;
      return this
    },
    compatVersion: function() {
      return this.panel.compatVersion()
    },
    finished: function(a) {
      return this.sign.finished(a)
    },
    delegate: function(a) {
      return this.sign.delegate(a)
    },
    getV1Series: function() {
      var a;
      return f.nullyTo(this.scene.firstAtoms && (a = this.scene.firstAtoms[this.panel._getV1DimName("series")]) && a.rawValue, "Series")
    },
    getV1Category: function() {
      var a;
      return this.scene.firstAtoms && (a = this.scene.firstAtoms[this.panel._getV1DimName("category")]) && a.rawValue
    },
    getV1Value: function() {
      var a;
      return this.scene.firstAtoms && (a = this.scene.firstAtoms[this.panel._getV1DimName("value")]) && a.value
    },
    getV1Datum: function() {
      return this.panel._getV1Datum(this.scene)
    },
    select: function(a) {
      return this.scene.select(a)
    },
    toggleVisible: function() {
      return this.scene.toggleVisible()
    },
    click: function() {
      var a = this;
      a.clickable() && a.panel._onClick(a);
      if (a.selectableByClick()) {
        var b = a.event;
        a.select({
          replace: !b || !b.ctrlKey
        })
      }
    },
    doubleClick: function() {
      this.doubleClickable() && this.panel._onDoubleClick(this)
    },
    clickable: function() {
      var a = this;
      return (a.sign ? a.sign.clickable() : a.panel.clickable()) && (!a.scene || a.scene.clickable())
    },
    selectableByClick: function() {
      var a = this;
      return (a.sign ? a.sign.selectableByClick() : a.panel.selectableByClick()) &&
        (!a.scene || a.scene.selectableByClick())
    },
    doubleClickable: function() {
      var a = this;
      return (a.sign ? a.sign.doubleClickable() : a.panel.doubleClickable()) && (!a.scene || a.scene.doubleClickable())
    },
    hoverable: function() {
      var a = this;
      return (a.sign ? a.sign.hoverable() : a.panel.hoverable()) && (!a.scene || a.scene.hoverable())
    }
  });
  if (Object.defineProperty) try {
    Object.defineProperty(i.visual.Context.prototype, "parent", {
      get: function() {
        throw f.error.operationInvalid("The 'this.parent.index' idiom has no equivalent in this version. Please try 'this.pvMark.parent.index'.");
      }
    })
  } catch (Sb) {}
  f.space("pvc.visual").TraversalMode = f.makeEnum(["Tree", "FlattenedSingleLevel", "FlattenDfsPre", "FlattenDfsPost"]);
  f.type("pvc.visual.Role").init(function(a, b) {
    this.name = a;
    this.label = f.get(b, "label") || i.buildTitleFromName(a);
    this.index = f.get(b, "index") || 0;
    this.dimensionDefaults = f.get(b, "dimensionDefaults") || {};
    if (f.get(b, "isRequired", false)) this.isRequired = true;
    if (f.get(b, "autoCreateDimension", false)) this.autoCreateDimension = true;
    if (a = f.get(b, "defaultSourceRole")) this.defaultSourceRoleName =
      a;
    if (a = f.get(b, "defaultDimension")) this.defaultDimensionName = a;
    if (!a && this.autoCreateDimension) throw f.error.argumentRequired("defaultDimension");
    var c;
    a = f.get(b, "requireIsDiscrete");
    if (a != null) a || (c = true);
    if (c != null)
      if (c = f.get(b, "requireSingleDimension", false)) {
        if (f.get(b, "isMeasure", false)) {
          this.isMeasure = true;
          if (f.get(b, "isPercent", false)) this.isPercent = true
        }
        var d = f.get(b, "valueType", null);
        if (d !== this.valueType) {
          this.valueType = d;
          this.dimensionDefaults.valueType = d
        }
      }
    if (c !== this.requireSingleDimension) this.requireSingleDimension =
      c;
    if (a != this.requireIsDiscrete) {
      this.requireIsDiscrete = !!a;
      this.dimensionDefaults.isDiscrete = this.requireIsDiscrete
    }
    b = f.get(b, "traversalMode");
    if (b != null && b !== this.traversalMode) this.traversalMode = b
  }).add({
    isRequired: false,
    requireSingleDimension: false,
    valueType: null,
    requireIsDiscrete: null,
    isMeasure: false,
    isPercent: false,
    defaultSourceRoleName: null,
    defaultDimensionName: null,
    grouping: null,
    traversalMode: i.visual.TraversalMode.FlattenedSingleLevel,
    rootLabel: "",
    autoCreateDimension: false,
    isReversed: false,
    label: null,
    sourceRole: null,
    isDefaultSourceRole: false,
    firstDimensionType: function() {
      var a = this.grouping;
      return a && a.firstDimensionType()
    },
    firstDimensionName: function() {
      var a = this.grouping;
      return a && a.firstDimensionName()
    },
    firstDimensionValueType: function() {
      var a = this.grouping;
      return a && a.firstDimensionValueType()
    },
    isDiscrete: function() {
      var a = this.grouping;
      return a && a.isDiscrete()
    },
    setSourceRole: function(a, b) {
      this.sourceRole = a;
      this.isDefaultSourceRole = !!b
    },
    setIsReversed: function(a) {
      if (a) this.isReversed =
        true;
      else delete this.isReversed
    },
    setTraversalMode: function(a) {
      var b = i.visual.TraversalMode;
      a = f.nullyTo(a, b.FlattenedSingleLevel);
      if (a !== this.traversalMode)
        if (a === b.FlattenedSingleLevel) delete this.traversalMode;
        else this.traversalMode = a
    },
    setRootLabel: function(a) {
      if (a !== this.rootLabel) {
        if (a) this.rootLabel = a;
        else delete this.rootLabel;
        this.grouping && this._updateBind(this.grouping)
      }
    },
    flatten: function(a, b) {
      var c = this.flattenedGrouping(b) || f.fail.operationInvalid("Role is unbound.");
      return a.groupBy(c,
        b)
    },
    flattenedGrouping: function(a) {
      var b = this.grouping;
      if (b) {
        a || (a = {});
        var c = a.flatteningMode;
        if (c == null) c = a.flatteningMode = this._flatteningMode();
        if (a.isSingleLevel == null && !c) a.isSingleLevel = true;
        if (a.flatteningMode == null) a.flatteningMode = this._flatteningMode();
        return b.ensure(a)
      }
    },
    _flatteningMode: function() {
      var a = i.visual.TraversalMode,
        b = i.data.FlatteningMode;
      switch (this.traversalMode) {
        case a.FlattenDfsPre:
          return b.DfsPre;
        case a.FlattenDfsPost:
          return b.DfsPost
      }
      return a.None
    },
    select: function(a, b) {
      var c =
        this.grouping;
      if (c) {
        f.setUDefaults(b, "flatteningMode", i.data.FlatteningMode.None);
        return a.groupBy(c.ensure(b), b)
      }
    },
    view: function(a) {
      var b = this.grouping;
      if (b) return b.view(a)
    },
    preBind: function(a) {
      this.__grouping = a;
      return this
    },
    isPreBound: function() {
      return !!this.__grouping
    },
    preBoundGrouping: function() {
      return this.__grouping
    },
    isBound: function() {
      return !!this.grouping
    },
    postBind: function(a) {
      var b = this.__grouping;
      if (b) {
        delete this.__grouping;
        b.bind(a);
        this.bind(b)
      }
      return this
    },
    bind: function(a) {
      a = this._validateBind(a);
      this._updateBind(a);
      return this
    },
    _validateBind: function(a) {
      if (a)
        if (a.isNull()) a = null;
        else {
          if (this.requireSingleDimension && !a.isSingleDimension) throw f.error.operationInvalid("Role '{0}' only accepts a single dimension.", [this.name]);
          var b = this.valueType,
            c = this.requireIsDiscrete;
          a.dimensions().each(function(d) {
            d = d.type;
            if (b && d.valueType !== b) throw f.error.operationInvalid("Role '{0}' cannot be bound to dimension '{1}'. \nIt only accepts dimensions of type '{2}' and not of type '{3}'.", [this.name, d.name,
              i.data.DimensionType.valueTypeName(b), d.valueTypeName
            ]);
            if (c != null && d.isDiscrete !== c)
              if (c) d._toDiscrete();
              else throw f.error.operationInvalid("Role '{0}' cannot be bound to dimension '{1}'. \nIt only accepts {2} dimensions.", [this.name, d.name, c ? "discrete" : "continuous"]);
          }, this)
        }
      return a
    },
    _updateBind: function(a) {
      this.grouping && this.grouping.dimensions().each(function(b) {
        b.type && $a.call(b.type, this)
      }, this);
      if (this.grouping = a) {
        this.grouping = this.grouping.ensure({
          reverse: this.isReversed,
          rootLabel: this.rootLabel
        });
        this.grouping.dimensions().each(function(b) {
          Za.call(b.type, this)
        }, this)
      }
    }
  });
  f.type("pvc.visual.RoleVarHelper").init(function(a, b, c) {
    var d = f.get(c, "hasPercentSubVar", false),
      e = f.get(c, "roleVar"),
      g = this.grouping = b && b.grouping;
    if (g) {
      this.role = b;
      this.sourceRoleName = b.sourceRole && b.sourceRole.name;
      var h = a.panel();
      this.panel = h;
      if (!g.isDiscrete()) {
        this.rootContDim = h.data.owner.dimensions(g.firstDimensionName());
        if (d) this.percentFormatter = h.chart.options.percentValueFormat
      }
    }
    if (!e) {
      if (!b) throw f.error.operationInvalid("Role is not defined, so the roleVar argument is required.");
      e = b.name
    }
    if (!g) {
      b = a.vars[e] = new I(null, "");
      if (d) b.percent = new I(null, "")
    }
    this.roleVarName = e;
    a["is" + f.firstUpperCase(e) + "Bound"] = !!g;
    if (f.get(c, "allowNestedVars")) this.allowNestedVars = true
  }).add({
    allowNestedVars: false,
    isBound: function() {
      return !!this.grouping
    },
    onNewScene: function(a, b) {
      if (this.grouping) {
        var c = this.roleVarName;
        if (!(this.allowNestedVars ? f.hasOwnProp.call(a.vars, c) : a.vars[c])) {
          var d = this.sourceRoleName;
          if (d)
            if (d = f.getOwn(a.vars, d)) {
              a.vars[c] = d.clone();
              return
            }
          if (b) {
            var e;
            if (b = this.rootContDim) {
              var g;
              var h = (d = a.group) ? d.singleDatum() : a.datum;
              if (h) {
                if (!h.isNull) {
                  e = I.fromAtom(h.atoms[b.name]);
                  if (e.value != null && this.percentFormatter)
                    if (d) {
                      d = d.dimensions(b.name);
                      g = d.percentOverParent({
                        visible: true
                      })
                    } else g = a.data().dimensions(b.name).percent(e.value)
                }
              } else if (d) {
                d = d.dimensions(b.name);
                h = d.sum({
                  visible: true,
                  zeroIfNone: false
                });
                if (h != null) {
                  e = b.format(h);
                  e = new I(h, e, h);
                  if (this.percentFormatter) g = d.percentOverParent({
                    visible: true
                  })
                }
              }
              if (e && this.percentFormatter) e.percent = e.value == null ? new I(null, "") : new I(g,
                this.percentFormatter.call(null, g))
            } else if ((g = a.datum) && !g.isNull) {
              e = this.grouping.view(g);
              e = I.fromComplex(e)
            }
            if (!e) {
              e = new I(null, "");
              if (this.percentFormatter) e.percent = new I(null, "")
            }
            a.vars[c] = e
          }
        }
      }
    }
  });
  O.prototype.getSign = function() {
    return this.sign || yb(this)
  };
  O.prototype.getScene = function() {
    return this.getSign().scene
  };
  O.prototype.getContext = function() {
    return this.getSign().context()
  };
  f.type("pvc.visual.BasicSign").init(function(a, b) {
    this.chart = a.chart;
    this.panel = a;
    this.pvMark = b;
    !b.sign || f.assert("Mark already has an attached Sign.");
    b.sign = this;
    b.__buildInstance = b.buildInstance;
    b.buildInstance = this._dispatchBuildInstance
  }).add({
    compatVersion: function() {
      return this.chart.compatVersion()
    },
    localProperty: function(a, b) {
      this.pvMark.localProperty(a, b);
      return this
    },
    lock: function(a, b) {
      return this.lockMark(a, this._bindWhenFun(b, a))
    },
    optional: function(a, b, c) {
      return this.optionalMark(a, this._bindWhenFun(b, a), c)
    },
    lockMark: function(a, b) {
      this.pvMark.lock(a, b);
      return this
    },
    optionalMark: function(a, b, c) {
      this.pvMark[a](b, c);
      return this
    },
    delegate: function(a,
                       b) {
      return this.pvMark.delegate(a, b)
    },
    delegateExtension: function(a) {
      return this.pvMark.delegate(a, i.extensionTag)
    },
    hasDelegate: function(a) {
      return this.pvMark.hasDelegate(a)
    },
    _createPropInterceptor: function(a, b) {
      var c = this,
        d = a === "data";
      return function() {
        var e = this.sign;
        if (!e || e !== c) return c._getPvSceneProp(a, this.index);
        if (!d) {
          var g = this.scene[this.index];
          if (!e.scene || e.scene !== g.data) c._inContext(g.data, g)
        }
        return b.apply(c, arguments)
      }
    },
    _getPvSceneProp: function(a, b) {
      var c = this.pvMark,
        d = c.scene;
      if (d) {
        b =
          c.hasOwnProperty("index") ? c.index : Math.min(b, d.length - 1);
        if (b != null) return d[b][a]
      }
      throw f.error.operationInvalid("Cannot evaluate inherited property.");
    },
    _bindWhenFun: function(a, b) {
      if (f.fun.is(a)) {
        var c = this;
        return c._createPropInterceptor(b, function(d) {
          return a.call(c, d)
        })
      }
      return a
    },
    _lockDynamic: function(a, b) {
      var c = this;
      return c.lockMark(a, c._createPropInterceptor(a, function(d) {
        return c[b].call(c, d)
      }))
    },
    _dispatchBuildInstance: function(a) {
      function b() {
        this.__buildInstance(a)
      }
      this.sign._inContext(a.data,
        a, b, this)
    },
    _inContext: function(a, b, c, d) {
      var e = this.pvMark;
      b || (b = e.scene[e.index]);
      a || (a = b.data || f.assert("A scene is required!"));
      var g = a.childIndex(),
        h, j, l, m = this.pvInstance;
      if (m) {
        h = this.scene;
        j = this.index;
        l = this.state
      }
      this.pvInstance = b;
      this.scene = a;
      this.index = g < 0 ? 0 : g;
      wb.call(a, e.renderId());
      this.state = {};
      if (c) try {
        return c.call(d, b)
      } finally {
        this.state = l;
        this.pvInstance = m;
        this.scene = h;
        this.index = j
      }
    },
    context: function(a) {
      var b;
      if (a || !(b = this.state)) return this._createContext();
      return b.context || (b.context =
        this._createContext())
    },
    _createContext: function() {
      return new i.visual.Context(this.panel, this.pvMark)
    }
  });
  f.type("pvc.visual.Sign", i.visual.BasicSign).init(function(a, b, c) {
    var d = this;
    d.base(a, b, c);
    d._ibits = a._ibits;
    var e = f.get(c, "extensionId");
    if (e != null) d.extensionAbsIds = f.array.to(a._makeExtensionAbsId(e));
    d.isActiveSeriesAware = f.get(c, "activeSeriesAware", true);
    if (d.isActiveSeriesAware) {
      a = (a = a.visualRoles) && a.series;
      if (!a || !a.isBound()) d.isActiveSeriesAware = false
    }
    b.wrapper(f.get(c, "wrapper") || d.createDefaultWrapper());
    f.get(c, "freeColor", true) || d._bindProperty("fillStyle", "fillColor", "color")._bindProperty("strokeStyle", "strokeColor", "color")
  }).postInit(function(a, b, c) {
    this._addInteractive(c);
    a._addSign(this)
  }).add({
    createDefaultWrapper: function() {
      var a = this;
      return function(b) {
        return function(c) {
          return b.call(a.context(), c)
        }
      }
    },
    property: function(a) {
      var b = f.firstUpperCase(a),
        c = "base" + b,
        d = "default" + b,
        e = "normal" + b,
        g = "interactive" + b;
      b = {};
      b[a] = function(h) {
        this._finished = false;
        this._arg = h;
        var j = this[c](h);
        if (j == null) return null;
        if (this._finished) return j;
        j = this.showsInteraction() && this.anyInteraction() ? this[g](j, h) : this[e](j, h);
        this._arg = null;
        return j
      };
      b[c] = function() {
        return this.delegateExtension()
      };
      b[d] = function() {};
      b[e] = function(h) {
        return h
      };
      b[g] = function(h) {
        return h
      };
      this.constructor.add(b);
      return this
    },
    anyInteraction: function() {
      return this.scene.anyInteraction()
    },
    finished: function(a) {
      this._finished = true;
      return a
    },
    applyExtensions: function() {
      if (!this._extended) {
        this._extended = true;
        var a = this.extensionAbsIds;
        a && a.forEach(function(b) {
          this.panel.extendAbs(this.pvMark,
            b)
        }, this)
      }
      return this
    },
    intercept: function(a, b) {
      b = this._createPropInterceptor(a, b);
      return this._intercept(a, b)
    },
    lockDimensions: function() {
      this.pvMark.lock("left").lock("right").lock("top").lock("bottom").lock("width").lock("height");
      return this
    },
    _extensionKeyArgs: {
      tag: i.extensionTag
    },
    _bindProperty: function(a, b, c) {
      var d = this;
      c || (c = b);
      var e = "default" + f.firstUpperCase(c);
      if (f.fun.is(d[e])) d.pvMark.hasDelegateValue(a, i.extensionTag) || d.pvMark.intercept(a, function() {
        return d[e](d._arg)
      }, d._extensionKeyArgs);
      c = this._createPropInterceptor(a, function() {
        return d[b]()
      });
      return d._intercept(a, c)
    },
    _intercept: function(a, b) {
      var c = this.pvMark,
        d = this.extensionAbsIds;
      d && f.query(d).select(function(e) {
        return this.panel._getExtensionAbs(e, a)
      }, this).where(f.notUndef).each(function(e) {
        e = c.wrap(e, a);
        c.intercept(a, e, this._extensionKeyArgs)
      }, this);
      (c._intercepted || (c._intercepted = {}))[a] = true;
      c.intercept(a, b);
      return this
    }
  }).prototype.property("color").constructor.add(i.visual.Interactive).add({
      extensionAbsIds: null,
      _addInteractive: function(a) {
        var b =
            this,
          c = f.get;
        if (b.interactive()) {
          var d = b._ibits,
            e = i.visual.Interactive;
          if (c(a, "noTooltip")) d &= ~e.ShowsTooltip;
          if (c(a, "noHover")) d &= ~e.Hoverable;
          if (c(a, "noClick")) d &= ~e.Clickable;
          if (c(a, "noDoubleClick")) d &= ~e.DoubleClickable;
          if (c(a, "noSelect")) d &= ~e.SelectableAny;
          else if (this.selectable()) {
            if (c(a, "noClickSelect")) d &= ~e.SelectableByClick;
            if (c(a, "noRubberSelect")) d &= ~e.SelectableByRubberband
          }
          if (b.showsInteraction()) {
            if (c(a, "showsInteraction") === false) d &= ~e.ShowsInteraction;
            if (b.showsActivity())
              if (c(a,
                "showsActivity") === false) d &= ~e.ShowsActivity;
            if (b.showsSelection())
              if (c(a, "showsSelection") === false) d &= ~e.ShowsSelection
          }
          b._ibits = d
        }
        if (b.handlesEvents()) {
          b.showsTooltip() && b._addPropTooltip(c(a, "tooltipArgs"));
          b.hoverable() && b._addPropHoverable();
          b.handlesClickEvent() && b._addPropClick();
          b.doubleClickable() && b._addPropDoubleClick()
        } else b.pvMark.events("none")
      },
      fillColor: function() {
        return this.color("fill")
      },
      strokeColor: function() {
        return this.color("stroke")
      },
      defaultColor: function() {
        return this.defaultColorSceneScale()(this.scene)
      },
      dimColor: function(a, b) {
        if (b === "text") return i.toGrayScale(a, -0.75, null, null);
        return i.toGrayScale(a, -0.3, null, null)
      },
      defaultColorSceneScale: function() {
        return f.lazy(this, "_defaultColorSceneScale", this._initDefColorScale, this)
      },
      _initDefColorScale: function() {
        var a = this.panel.axes.color;
        return a ? a.sceneScale({
          sceneVarName: "color"
        }) : f.fun.constant(i.defaultColor)
      },
      mayShowActive: function(a) {
        if (!this.showsActivity()) return false;
        var b = this.scene;
        return b.isActive || !a && this.isActiveSeriesAware && b.isActiveSeries() ||
          b.isActiveDatum()
      },
      mayShowNotAmongSelected: function() {
        return this.mayShowAnySelected() && !this.scene.isSelected()
      },
      mayShowSelected: function() {
        return this.showsSelection() && this.scene.isSelected()
      },
      mayShowAnySelected: function() {
        return this.showsSelection() && this.scene.anySelected()
      },
      _addPropTooltip: function(a) {
        if (!this.pvMark.hasTooltip) {
          var b = f.create(this.chart._tooltipOptions, f.get(a, "options"));
          b.isLazy = f.get(a, "isLazy", true);
          var c = f.get(a, "buildTooltip") || this._getTooltipFormatter(b);
          if (c) {
            b.isEnabled =
              this._isTooltipEnabled.bind(this);
            (a = f.get(a, "tipsyEvent")) || (a = "mouseover");
            this.pvMark.localProperty("tooltip").tooltip(this._createTooltipProp(c, b.isLazy)).title(f.fun.constant("")).ensureEvents().event(a, u.Behavior.tipsy(b)).hasTooltip = true
          }
        }
      },
      _getTooltipFormatter: function(a) {
        return this.panel._getTooltipFormatter(a)
      },
      _isTooltipEnabled: function() {
        return this.panel._isTooltipEnabled()
      },
      _createTooltipProp: function(a, b) {
        var c = this,
          d;
        d = b ? function() {
          var e = c.context(true),
            g;
          return function() {
            if (e) {
              g =
                a(e);
              e = null
            }
            return g
          }
        } : function() {
          var e = c.context();
          return a(e)
        };
        return function() {
          var e = c.scene;
          if (e && !e.isIntermediate && e.showsTooltip()) return d()
        }
      },
      _addPropHoverable: function() {
        var a = this.panel;
        this.pvMark.ensureEvents().event("mouseover", function(b) {
          if (b.hoverable() && !a.selectingByRubberband() && !a.animating()) {
            b.setActive(true);
            a.renderInteractive()
          }
        }).event("mouseout", function(b) {
          b.hoverable() && !a.selectingByRubberband() && !a.animating() && b.clearActive() && a.renderInteractive()
        })
      },
      _ignoreClicks: 0,
      _propCursorClick: function(a) {
        a = this._ibits & a._ibits;
        var b = i.visual.Interactive;
        return a & b.HandlesClickEvent || a & b.DoubleClickable ? "pointer" : null
      },
      _addPropClick: function() {
        var a = this;
        a.pvMark.cursor(a._propCursorClick.bind(a)).ensureEvents().event("click", a._handleClick.bind(a))
      },
      _addPropDoubleClick: function() {
        var a = this;
        a.pvMark.cursor(a._propCursorClick.bind(a)).ensureEvents().event("dblclick", a._handleDoubleClick.bind(a))
      },
      _handleClick: function() {
        var a = this,
          b = a.pvMark,
          c = b.instance().data;
        if (a.doubleClickable() &&
          c.doubleClickable()) {
          var d = b.scene,
            e = b.index,
            g = u.event;
          window.setTimeout(function() {
            if (a._ignoreClicks) a._ignoreClicks--;
            else try {
              u.event = g;
              b.context(d, e, function() {
                a._handleClickCore()
              })
            } catch (h) {
              u.error(h)
            } finally {
              delete u.event
            }
          }, a.chart.options.doubleClickMaxDelay || 300)
        } else if (a._ignoreClicks) a._ignoreClicks--;
        else a._handleClickCore()
      },
      _handleClickCore: function() {
        var a = this,
          b = a.pvMark.instance();
        a._inContext(b.data, b, function() {
          a._onClick(a.context())
        }, a)
      },
      _handleDoubleClick: function() {
        var a =
            this,
          b = a.pvMark.instance();
        if (b.data.doubleClickable()) {
          a._ignoreClicks = 2;
          a._inContext(b.data, b, function() {
            a._onDoubleClick(a.context())
          }, a)
        }
      },
      _onClick: function(a) {
        a.click()
      },
      _onDoubleClick: function(a) {
        a.doubleClick()
      }
    });
  f.type("pvc.visual.Panel", i.visual.Sign).init(function(a, b, c) {
    var d = f.get(c, "panel");
    if (!d) {
      d = f.get(c, "panelType") || u.Panel;
      d = b.add(d)
    }
    this.base(a, d, c)
  }).add({
    _addInteractive: function(a) {
      a = f.setDefaults(a, "noSelect", true, "noHover", true, "noTooltip", true, "noClick", true, "noDoubleClick",
        true);
      this.base(a)
    }
  });
  f.type("pvc.visual.Label", i.visual.Sign).init(function(a, b, c) {
    b = b.add(u.Label);
    this.base(a, b, c)
  }).add({
    _addInteractive: function(a) {
      a = f.setDefaults(a, "noSelect", true, "noHover", true, "noTooltip", true, "noClick", true, "noDoubleClick", true, "showsInteraction", false);
      this.base(a)
    },
    defaultColor: f.fun.constant(u.Color.names.black)
  });
  f.type("pvc.visual.ValueLabel", i.visual.Label).init(function(a, b, c) {
    b = f.get(c, "noAnchor", false) ? b : b.anchor(a.valuesAnchor);
    if (c && c.extensionId == null) c.extensionId =
      "label";
    this.base(a, b, c);
    this._bindProperty("text", "text");
    this.pvMark.font(a.valuesFont);
    this._bindProperty("textStyle", "textColor", "color")
  }).prototype.property("text").property("textStyle").constructor.addStatic({
      maybeCreate: function(a, b, c) {
        return a.valuesVisible && a.valuesMask ? new i.visual.ValueLabel(a, b, c) : null
      },
      isNeeded: function(a) {
        return a.valuesVisible && a.valuesMask
      }
    }).add({
      _addInteractive: function(a) {
        a = f.setDefaults(a, "showsInteraction", true, "noSelect", true, "noTooltip", true, "noClick", true,
          "noDoubleClick", true, "noHover", true);
        this.base(a)
      },
      defaultText: function() {
        return this.scene.format(this.panel.valuesMask)
      },
      normalText: function(a) {
        return this.trimText(a)
      },
      interactiveText: function(a) {
        return this.showsActivity() && this.scene.isActive ? a : this.trimText(a)
      },
      trimText: function(a) {
        return a
      },
      textColor: function() {
        return this.color("text")
      },
      backgroundColor: function(a) {
        var b = this.state;
        if (!b) return this.calcBackgroundColor(a);
        b = f.lazy(b, "bgColorCache");
        var c = f.getOwn(b, a);
        c || (c = b[a] = this.calcBackgroundColor(a));
        return c
      },
      calcBackgroundColor: f.fun.constant(u.Color.names.white),
      optimizeLegibilityColor: function(a) {
        if (this.panel.valuesOptimizeLegibility) return this.backgroundColor().isDark() ? a.complementary().alpha(0.9) : a;
        return a
      },
      normalColor: function(a, b) {
        return this.optimizeLegibilityColor(a, b)
      },
      interactiveColor: function(a, b) {
        if (!this.mayShowActive() && this.mayShowNotAmongSelected()) return this.dimColor(a, b);
        return this.optimizeLegibilityColor(a, b)
      }
    });
  f.type("pvc.visual.Dot", i.visual.Sign).init(function(a,
                                                        b, c) {
    b = b.add(u.Dot);
    var d = f.get(c, "proto");
    d && b.extend(d);
    c = f.setDefaults(c, "freeColor", false);
    this.base(a, b, c);
    if (!f.get(c, "freePosition", false)) {
      c = a.isOrientationVertical() ? "left" : "bottom";
      a = a.anchorOrtho(c);
      this._lockDynamic(c, "x")._lockDynamic(a, "y")
    }
    this._bindProperty("shape", "shape")._bindProperty("shapeRadius", "radius")._bindProperty("shapeSize", "size");
    this.optional("strokeDasharray", undefined).optional("lineWidth", 1.5)
  }).prototype.property("size").property("shape").constructor.add({
      y: f.fun.constant(0),
      x: f.fun.constant(0),
      radius: function() {
        this.state.radius = this.delegateExtension()
      },
      baseSize: function() {
        var a = this.state.radius;
        return a != null ? f.sqr(a) : this.base()
      },
      defaultSize: function() {
        return 12
      },
      interactiveSize: function(a) {
        return this.mayShowActive(true) ? Math.max(a, 5) * 2.5 : a
      },
      interactiveColor: function(a, b) {
        if (this.mayShowActive(true)) {
          if (b === "stroke") return a.brighter(1)
        } else if (this.mayShowNotAmongSelected()) {
          if (this.mayShowActive()) return a.alpha(0.8);
          switch (b) {
            case "fill":
              return this.dimColor(a,
                b);
            case "stroke":
              return a.alpha(0.45)
          }
        }
        return this.base(a, b)
      }
    });
  f.type("pvc.visual.DotSizeColor", i.visual.Dot).init(function(a, b, c) {
    this.base(a, b, c);
    var d = this.compatVersion() <= 1;
    this._bindProperty("lineWidth", "strokeWidth").intercept("visible", function() {
      if (!this.canShow()) return false;
      var g = this.delegateExtension();
      if (g == null) g = d || this.defaultVisible();
      return g
    });
    this._initColor();
    this._initSize();
    if (this.isSizeBound)
      if (a.axes.size.scaleUsesAbs()) {
        this.isSizeAbs = true;
        var e = this._sceneDefColor;
        this._sceneDefColor =
          function(g, h) {
            return h === "stroke" && g.vars.size.value < 0 ? u.Color.names.black : e.call(this, g, h)
          };
        this.pvMark.lineCap("round").strokeDasharray(function(g) {
          return g.vars.size.value < 0 ? "dash" : null
        })
      }
  }).prototype.property("strokeWidth").constructor.add({
      isColorBound: false,
      isColorDiscrete: false,
      isSizeBound: false,
      isSizeAbs: false,
      canShow: function() {
        return !this.scene.isIntermediate
      },
      defaultVisible: function() {
        var a = this.scene;
        return !a.isNull && (!this.isSizeBound && !this.isColorBound || this.isSizeBound && a.vars.size.value !=
          null || this.isColorBound && (this.isColorDiscrete || a.vars.color.value != null))
      },
      _initColor: function() {
        var a, b, c = this.panel,
          d = c.visualRoles.color;
        if (d) {
          this.isColorDiscrete = d.isDiscrete();
          c = c.axes.color;
          if (d.isBound()) {
            this.isColorBound = true;
            b = c.sceneScale({
              sceneVarName: "color"
            })
          } else if (c) a = c.option("Unbound")
        }
        b || (b = f.fun.constant(a || i.defaultColor));
        this._sceneDefColor = b
      },
      _initSize: function() {
        var a = this.panel,
          b = a.plot,
          c = b.option("Shape"),
          d = b.option("NullShape");
        b = a.visualRoles.size;
        var e, g;
        if (b) {
          var h =
            (a = a.axes.size) && a.scale;
          if (h && b.isBound()) {
            this.isSizeBound = true;
            var j = h.min + (h.max - h.min) * 0.05;
            this.nullSizeShapeHasStrokeOnly = d === "cross";
            g = function(l) {
              return l.vars.size.value != null ? c : d
            };
            e = function(l) {
              l = l.vars.size.value;
              return l != null ? h(l) : d ? j : 0
            }
          }
        }
        if (!e) {
          g = f.fun.constant(c);
          e = function(l) {
            return this.base(l)
          }
        }
        this._sceneDefSize = e;
        this._sceneDefShape = g
      },
      defaultColor: function(a) {
        return this._sceneDefColor(this.scene, a)
      },
      normalColor: function(a, b) {
        return b === "stroke" ? a.darker() : this.base(a, b)
      },
      interactiveColor: function(a,
                                 b) {
        var c = this.scene;
        if (this.mayShowActive(true)) switch (b) {
          case "fill":
            return this.isSizeBound ? a.alpha(0.75) : a;
          case "stroke":
            return a.darker()
        } else if (this.showsSelection()) {
          var d = c.isSelected();
          if (!d && c.anySelected()) {
            if (this.mayShowActive()) return a.alpha(0.8);
            switch (b) {
              case "fill":
                return this.dimColor(a, b);
              case "stroke":
                return a.alpha(0.45)
            }
          }
          if (d && wa(a)) {
            if (b === "stroke") a = a.darker(3);
            return a.darker(2)
          }
        }
        if (b === "stroke") return a.darker();
        return a
      },
      defaultSize: function() {
        return this._sceneDefSize(this.scene)
      },
      defaultShape: function() {
        return this._sceneDefShape(this.scene)
      },
      interactiveSize: function(a) {
        if (!this.mayShowActive(true)) return a;
        a = Math.sqrt(a);
        var b = Math.max(1, Math.min(1.1 * a, 2));
        return f.sqr(a + b)
      },
      defaultStrokeWidth: function() {
        return this.nullSizeShapeHasStrokeOnly && this.scene.vars.size.value == null ? 1.8 : 1
      },
      interactiveStrokeWidth: function(a) {
        return this.mayShowActive(true) ? 2 * a : this.mayShowSelected() ? 1.5 * a : a
      }
    });
  f.type("pvc.visual.Line", i.visual.Sign).init(function(a, b, c) {
    b = b.add(u.Line);
    this.base(a,
      b, c);
    this.lock("segmented", "smart").lock("antialias", true);
    if (!f.get(c, "freePosition", false)) {
      c = a.isOrientationVertical() ? "left" : "bottom";
      this._lockDynamic(a.anchorOrtho(c), "y")._lockDynamic(c, "x")
    }
    this._bindProperty("strokeStyle", "strokeColor", "color")._bindProperty("lineWidth", "strokeWidth")
  }).prototype.property("strokeWidth").constructor.add({
      _addInteractive: function(a) {
        a = f.setDefaults(a, "noTooltip", true);
        this.base(a)
      },
      y: f.fun.constant(0),
      x: f.fun.constant(0),
      defaultStrokeWidth: f.fun.constant(1.5),
      interactiveStrokeWidth: function(a) {
        return this.mayShowActive() ? Math.max(1, a) * 2.5 : a
      },
      interactiveColor: function(a, b) {
        if (this.mayShowNotAmongSelected()) return this.mayShowActive() ? u.Color.names.darkgray.darker().darker() : this.dimColor(a, b);
        return this.base(a, b)
      }
    });
  f.type("pvc.visual.Area", i.visual.Sign).init(function(a, b, c) {
    b = b.add(u.Area);
    c || (c = {});
    c.freeColor = true;
    this.base(a, b, c);
    b = f.get(c, "antialias", true);
    this.lock("segmented", "smart").lock("antialias", b);
    if (!f.get(c, "freePosition", false)) {
      c = a.isOrientationVertical() ?
        "left" : "bottom";
      b = a.anchorOrtho(c);
      a = a.anchorOrthoLength(b);
      this._lockDynamic(c, "x")._lockDynamic(b, "y")._lockDynamic(a, "dy")
    }
    this._bindProperty("fillStyle", "fillColor", "color");
    this.lock("strokeStyle", null).lock("lineWidth", 0)
  }).add({
    _addInteractive: function(a) {
      a = f.setDefaults(a, "noTooltip", true);
      this.base(a)
    },
    y: f.fun.constant(0),
    x: f.fun.constant(0),
    dy: f.fun.constant(0),
    interactiveColor: function(a, b) {
      if (b === "fill" && this.mayShowNotAmongSelected()) return this.dimColor(a, b);
      return this.base(a, b)
    }
  });
  f.type("pvc.visual.Bar", i.visual.Sign).init(function(a, b, c) {
    b = b.add(u.Bar);
    c = f.setDefaults(c, "freeColor", false);
    this.base(a, b, c);
    this.normalStroke = f.get(c, "normalStroke", false);
    this._bindProperty("lineWidth", "strokeWidth")
  }).prototype.property("strokeWidth").constructor.add({
      normalColor: function(a, b) {
        if (b === "stroke" && !this.normalStroke) return null;
        return a
      },
      interactiveColor: function(a, b) {
        if (b === "stroke") {
          if (this.mayShowActive(true)) return a.brighter(1.3).alpha(0.7);
          if (!this.normalStroke) return null;
          if (this.mayShowNotAmongSelected()) {
            if (this.mayShowActive()) return u.Color.names.darkgray.darker().darker();
            return this.dimColor(a, b)
          }
          if (this.mayShowActive()) return a.brighter(1).alpha(0.7)
        } else if (b === "fill") {
          if (this.mayShowActive(true)) return a.brighter(0.2).alpha(0.8);
          if (this.mayShowNotAmongSelected()) {
            if (this.mayShowActive()) return u.Color.names.darkgray.darker(2).alpha(0.8);
            return this.dimColor(a, b)
          }
          if (this.mayShowActive()) return a.brighter(0.2).alpha(0.8)
        }
        return this.base(a, b)
      },
      defaultStrokeWidth: function() {
        return 0.5
      },
      interactiveStrokeWidth: function(a) {
        if (this.mayShowActive(true)) return Math.max(1, a) * 1.3;
        return a
      }
    });
  u.PieSlice = function() {
    u.Wedge.call(this)
  };
  u.PieSlice.prototype = u.extend(u.Wedge).property("offsetRadius");
  u.PieSlice.prototype.midAngle = function() {
    var a = this.instance();
    return a.startAngle + a.angle / 2
  };
  u.PieSlice.prototype.defaults = (new u.PieSlice).extend(u.Wedge.prototype.defaults).offsetRadius(0);
  f.type("pvc.visual.PieSlice", i.visual.Sign).init(function(a, b, c) {
    b = b.add(u.PieSlice);
    c = f.setDefaults(c,
      "freeColor", false);
    this.base(a, b, c);
    this._activeOffsetRadius = f.get(c, "activeOffsetRadius", 0);
    this._maxOffsetRadius = f.get(c, "maxOffsetRadius", 0);
    this._resolvePctRadius = f.get(c, "resolvePctRadius");
    this._center = f.get(c, "center");
    this.optional("lineWidth", 0.6)._bindProperty("angle", "angle")._bindProperty("offsetRadius", "offsetRadius")._lockDynamic("bottom", "y")._lockDynamic("left", "x").lock("top", null).lock("right", null)
  }).prototype.property("offsetRadius").constructor.add({
      angle: f.fun.constant(0),
      x: function() {
        return this._center.x +
          this._offsetSlice("cos")
      },
      y: function() {
        return this._center.y - this._offsetSlice("sin")
      },
      _offsetSlice: function(a) {
        var b = this.pvMark.offsetRadius() || 0;
        if (b) b *= Math[a](this.pvMark.midAngle());
        return b
      },
      defaultColor: function(a) {
        return a === "stroke" ? null : this.base(a)
      },
      interactiveColor: function(a, b) {
        if (this.mayShowActive(true)) switch (b) {
          case "fill":
            return a.brighter(0.2).alpha(0.8);
          case "stroke":
            return a.brighter(1.3).alpha(0.7)
        } else if (this.mayShowNotAmongSelected())
          if (b === "fill") return this.dimColor(a,
            b);
        return this.base(a, b)
      },
      offsetRadius: function() {
        var a = this.base();
        return Math.min(Math.max(0, a), this._maxOffsetRadius)
      },
      baseOffsetRadius: function() {
        var a = this.base() || 0;
        return this._resolvePctRadius(L.parse(a))
      },
      interactiveOffsetRadius: function(a) {
        return a + (this.mayShowActive(true) ? this._activeOffsetRadius : 0)
      }
    });
  f.type("pvc.visual.Rule", i.visual.Sign).init(function(a, b, c) {
    b = b.add(u.Rule);
    var d = f.get(c, "proto");
    d && b.extend(d);
    this.base(a, b, c);
    f.get(c, "freeStyle") || this._bindProperty("strokeStyle",
      "strokeColor", "color")._bindProperty("lineWidth", "strokeWidth")
  }).prototype.property("strokeWidth").constructor.add({
      _addInteractive: function(a) {
        a = f.setDefaults(a, "noHover", true, "noSelect", true, "noTooltip", true, "noClick", true, "noDoubleClick", true, "showsInteraction", false);
        this.base(a)
      },
      defaultStrokeWidth: function() {
        return 1
      },
      interactiveStrokeWidth: function(a) {
        if (this.mayShowActive(true)) return Math.max(1, a) * 2.2;
        return a
      },
      interactiveColor: function(a, b) {
        if (this.scene.datum && !this.mayShowActive(true) &&
          this.mayShowNotAmongSelected()) return this.dimColor(a, b);
        return this.base(a, b)
      }
    });
  f.type("pvc.visual.OptionsBase").init(function(a, b, c, d) {
    this.chart = a;
    this.type = b;
    this.index = c == null ? 0 : c;
    this.name = f.get(d, "name");
    this.id = this._buildId();
    this.optionId = this._buildOptionId();
    this._registerResolversFull(this._resolvers = [], d);
    this.option = i.options(this._getOptionsDefinition(), this)
  }).add({
    _buildId: function() {
      return i.buildIndexedId(this.type, this.index)
    },
    _buildOptionId: function() {
      return this.id
    },
    _getOptionsDefinition: f.method({
      isAbstract: true
    }),
    _chartOption: function(a) {
      return this.chart.options[a]
    },
    _registerResolversFull: function(a, b) {
      var c = f.get(b, "fixed");
      if (c) {
        this._fixed = c;
        a.push(i.options.specify(function(d) {
          return c[d.name]
        }))
      }
      this._registerResolversNormal(a, b);
      if (b = f.get(b, "defaults")) this._defaults = b;
      a.push(this._resolveDefault)
    },
    _registerResolversNormal: function(a, b) {
      this.chart.compatVersion() <= 1 && a.push(this._resolveByV1OnlyLogic);
      this.name && a.push(i.options.specify(function(c) {
        return this._chartOption(this.name + f.firstUpperCase(c.name))
      }));
      a.push(this._resolveByOptionId);
      f.get(b, "byNaked", !this.index) && a.push(this._resolveByNaked)
    },
    _resolveFull: function(a) {
      for (var b = this._resolvers, c = 0, d = b.length; c < d; c++)
        if (b[c].call(this, a)) return true;
      return false
    },
    _resolveFixed: i.options.specify(function(a) {
      if (this._fixed) return this._fixed[a.name]
    }),
    _resolveByV1OnlyLogic: function(a) {
      var b = a.data,
        c;
      if (b && (c = b.resolveV1)) return c.call(this, a)
    },
    _resolveByName: i.options.specify(function(a) {
      if (this.name) return this._chartOption(this.name + f.firstUpperCase(a.name))
    }),
    _resolveByOptionId: i.options.specify(function(a) {
      return this._chartOption(this.optionId + f.firstUpperCase(a.name))
    }),
    _resolveByNaked: i.options.specify(function(a) {
      if (!this.index) return this._chartOption(f.firstLowerCase(a.name))
    }),
    _resolveDefault: function(a) {
      var b = a.data,
        c;
      if (b && (c = b.resolveDefault))
        if (c.call(this, a)) return true;
      if (this._defaults) {
        b = this._defaults[a.name];
        if (b !== undefined) {
          a.defaultValue(b);
          return true
        }
      }
    },
    _specifyChartOption: function(a, b) {
      b = this._chartOption(b);
      if (b != null) {
        a.specify(b);
        return true
      }
    }
  });
  var ua = f.type("pvc.visual.Axis", i.visual.OptionsBase).init(function(a, b, c, d) {
      this.base(a, b, c, d);
      a._addAxis(this)
    }).add({
      isVisible: true,
      scaleTreatsNullAs: function() {
        return "null"
      },
      scaleNullRangeValue: function() {
        return null
      },
      scaleUsesAbs: function() {
        return false
      },
      bind: function(a) {
        var b = this;
        a || f.fail.argumentRequired("dataCells");
        !b.dataCells || f.fail.operationInvalid("Axis is already bound.");
        b.dataCells = f.array.to(a);
        b.dataCell = b.dataCells[0];
        b.role = b.dataCell && b.dataCell.role;
        b.scaleType =
          La(b.role.grouping);
        b._checkRoleCompatibility();
        return this
      },
      isDiscrete: function() {
        return this.role && this.role.isDiscrete()
      },
      isBound: function() {
        return !!this.role
      },
      setScale: function(a, b) {
        this.role || f.fail.operationInvalid("Axis is unbound.");
        this.scale = a ? b ? a : this._wrapScale(a) : null;
        return this
      },
      _wrapScale: function(a) {
        a.type = this.scaleType;
        var b;
        if (a.type !== "discrete") {
          b = this.scaleUsesAbs();
          var c = this.scaleTreatsNullAs();
          if (c && c !== "null") {
            var d = c === "min";
            b = b ? function(g) {
              return a(g == null ? d ? a.domain()[0] :
                0 : g < 0 ? -g : g)
            } : function(g) {
              return a(g == null ? d ? a.domain()[0] : 0 : g)
            }
          } else {
            var e = this.scaleNullRangeValue();
            b = b ? function(g) {
              return g == null ? e : a(g < 0 ? -g : g)
            } : function(g) {
              return g == null ? e : a(g)
            }
          }
        } else b = function(g) {
          return a(g == null ? "" : g)
        };
        return f.copy(b, a)
      },
      sceneScale: function(a) {
        var b = f.get(a, "sceneVarName") || this.role.name,
          c = this.role.grouping;
        if (c.isSingleDimension && c.firstDimensionValueType() === Number) {
          var d = this.scale,
            e = f.get(a, "nullToZero", true);
          a = function(g) {
            g = g.vars[b].value;
            if (g == null) {
              if (!e) return g;
              g = 0
            }
            return d(g)
          };
          f.copy(a, d);
          return a
        }
        return this.scale.by1(function(g) {
          return g.vars[b].value
        })
      },
      _checkRoleCompatibility: function() {
        var a = this.dataCells.length;
        if (a > 1) {
          var b = this.role.grouping,
            c;
          if (this.scaleType === "discrete")
            for (c = 1; c < a; c++) {
              if (b.id !== this.dataCells[c].role.grouping.id) throw f.error.operationInvalid("Discrete roles on the same axis must have equal groupings.");
            } else {
            if (!b.firstDimensionType().isComparable) throw f.error.operationInvalid("Continuous roles on the same axis must have 'comparable' groupings.");
            for (c = 1; c < a; c++)
              if (this.scaleType !== La(this.dataCells[c].role.grouping)) throw f.error.operationInvalid("Continuous roles on the same axis must have scales of the same type.");
          }
        }
      },
      _getOptionsDefinition: function() {
        return ca
      }
    }),
    ca = {},
    da = f.type("pvc.visual.CartesianAxis", ua).init(function(a, b, c, d) {
      this.orientation = da.getOrientation(b, a.options.orientation);
      this.orientedId = da.getOrientedId(this.orientation, c);
      if (a._allowV1SecondAxis && c === 1) this.v1SecondOrientedId = "second" + this.orientation.toUpperCase();
      this.base(a, b, c, d);
      a = this.extensionPrefixes = [this.id + "Axis", this.orientedId + "Axis"];
      this.v1SecondOrientedId && a.push(this.v1SecondOrientedId + "Axis");
      this._extPrefAxisPosition = a.length;
      a.push("axis")
    }).add({
      bind: function(a) {
        this.base(a);
        this._syncExtensionPrefixes();
        return this
      },
      _syncExtensionPrefixes: function() {
        var a = this.extensionPrefixes;
        a.length = this._extPrefAxisPosition;
        var b = this.scaleType;
        if (b) {
          a.push(b + "Axis");
          b !== "discrete" && a.push("continuousAxis")
        }
        a.push("axis")
      },
      setScale: function(a) {
        var b =
          this.scale;
        this.base(a);
        if (b) {
          delete this.domain;
          delete this.ticks;
          delete this._roundingPaddings
        }
        if (a)
          if (!a.isNull && this.scaleType !== "discrete") {
            this.domain = a.domain();
            this.domain.minLocked = !!a.minLocked;
            this.domain.maxLocked = !!a.maxLocked;
            if (this.scaleType === "numeric") {
              this.option("DomainRoundMode") === "nice" && a.nice();
              (b = this.option("TickFormatter")) && a.tickFormatter(b)
            }
          }
        return this
      },
      setTicks: function(a) {
        var b = this.scale;
        b && !b.isNull || f.fail.operationInvalid("Scale must be set and non-null.");
        this.ticks =
          a;
        if (b.type === "numeric" && this.option("DomainRoundMode") === "tick") {
          delete this._roundingPaddings;
          (b = a && a.length) ? this.scale.domain(a[0], a[b - 1]): this.scale.domain(this.domain[0], this.domain[1])
        }
      },
      setScaleRange: function(a) {
        var b = this.scale;
        b.min = 0;
        b.max = a;
        b.size = a;
        if (b.type === "discrete") {
          if (b.domain().length > 0) b.splitBandedCenter(b.min, b.max, this.chart.options.panelSizeRatio || 0.8)
        } else b.range(b.min, b.max);
        return b
      },
      getScaleRoundingPaddings: function() {
        var a = this._roundingPaddings;
        if (!a) {
          a = {
            begin: 0,
            end: 0,
            beginLocked: false,
            endLocked: false
          };
          var b = this.scale;
          if (b && !b.isNull && b.type !== "discrete") {
            var c = this.domain;
            a.beginLocked = c.minLocked;
            a.endLocked = c.maxLocked;
            if (b.type === "numeric" && this.option("DomainRoundMode") !== "none") {
              b = b.domain();
              c = this.domain || f.assert("Original domain must be set");
              var d = b[1] - b[0];
              if (d) {
                var e = c[0] - b[0];
                if (e > 0) a.begin = e / d;
                e = b[1] - c[1];
                if (e > 0) a.end = e / d
              }
            }
          }
          this._roundingPaddings = a
        }
        return a
      },
      calcContinuousTicks: function(a) {
        if (a == null) a = this.option("DesiredTickCount");
        return this.scale.ticks(a, {
          roundInside: this.option("DomainRoundMode") !== "tick",
          numberExponentMin: this.option("TickExponentMin"),
          numberExponentMax: this.option("TickExponentMax")
        })
      },
      _getOptionsDefinition: function() {
        return Lb
      },
      _buildOptionId: function() {
        return this.id + "Axis"
      },
      _registerResolversNormal: function(a) {
        this.chart.compatVersion() <= 1 && a.push(this._resolveByV1OnlyLogic);
        a.push(this._resolveByOptionId, this._resolveByOrientedId);
        this.index === 1 && a.push(this._resolveByV1OptionId);
        a.push(this._resolveByScaleType, this._resolveByCommonId)
      },
      _resolveByOrientedId: i.options.specify(function(a) {
        return this._chartOption(this.orientedId + "Axis" + a.name)
      }),
      _resolveByV1OptionId: i.options.specify(function(a) {
        return this._chartOption("secondAxis" + a.name)
      }),
      _resolveByScaleType: i.options.specify(function(a) {
        var b = this.scaleType;
        if (b) {
          a = a.name;
          var c = this._chartOption(b + "Axis" + a);
          if (c === undefined && b !== "discrete") c = this._chartOption("continuousAxis" + a);
          return c
        }
      }),
      _resolveByCommonId: i.options.specify(function(a) {
        return this._chartOption("axis" + a.name)
      })
    });
  da.getOrientation = function(a, b) {
    return a === "base" === (b === "vertical") ? "x" : "y"
  };
  da.getOrientedId = function(a, b) {
    if (b === 0) return a;
    return a + (b + 1)
  };
  var Y = {
      resolve: "_resolveFull",
      data: {
        resolveV1: function(a) {
          !this.index && this.type === "ortho" && this._specifyChartOption(a, this.id + a.name);
          return true
        }
      },
      cast: i.castNumber
    },
    Z = {
      resolveV1: function(a) {
        if (this.index) {
          if (this._resolveByV1OptionId(a)) return true
        } else if (this._resolveByOrientedId(a)) return true;
        this._resolveDefault(a);
        return true
      }
    },
    Mb = i.options.defaultValue(function() {
      if (!this.typeIndex) return this.orientation ===
        "x" ? "bottom" : "left";
      var a = this.chart.axesByType[this.type].first.option("Position");
      return i.BasePanel.oppositeAnchor[a]
    }),
    Lb = f.create(ca, {
      Visible: {
        resolve: "_resolveFull",
        data: {
          resolveV1: function(a) {
            if (this.index <= 1) {
              var b = this.index === 0 ? f.firstUpperCase(this.orientation) : "Second";
              this._specifyChartOption(a, "show" + b + "Scale")
            }
            return true
          }
        },
        cast: Boolean,
        value: true
      },
      Composite: {
        resolve: function(a) {
          if (this.index > 0) {
            a.specify(false);
            return true
          }
          return this._resolveFull(a)
        },
        data: {
          resolveV1: function(a) {
            this._specifyChartOption(a,
              "useCompositeAxis");
            return true
          }
        },
        cast: Boolean,
        value: false
      },
      Size: {
        resolve: "_resolveFull",
        data: Z,
        cast: Ma
      },
      SizeMax: {
        resolve: "_resolveFull",
        cast: Ma
      },
      Position: {
        resolve: "_resolveFull",
        data: {
          resolveV1: Z.resolveV1,
          resolveDefault: Mb
        },
        cast: Bb
      },
      FixedMin: Y,
      FixedMax: Y,
      OriginIsZero: {
        resolve: "_resolveFull",
        data: {
          resolveV1: function(a) {
            switch (this.index) {
              case 0:
                this._specifyChartOption(a, "originIsZero");
                break;
              case 1:
                this.chart._allowV1SecondAxis && this._specifyChartOption(a, "secondAxisOriginIsZero");
                break
            }
            return true
          }
        },
        cast: Boolean,
        value: true
      },
      DomainScope: {
        resolve: "_resolveFull",
        cast: Ab,
        value: "global"
      },
      Offset: {
        resolve: "_resolveFull",
        data: {
          resolveV1: function(a) {
            switch (this.index) {
              case 0:
                this._specifyChartOption(a, "axisOffset");
                break;
              case 1:
                if (this.chart._allowV1SecondAxis) {
                  this._specifyChartOption(a, "secondAxisOffset");
                  break
                }
                break
            }
            return true
          }
        },
        cast: i.castNumber
      },
      LabelSpacingMin: {
        resolve: "_resolveFull",
        cast: i.castNumber
      },
      OverlappedLabelsMode: {
        resolve: "_resolveFull",
        cast: i.parseOverlappedLabelsMode,
        value: "rotatethenhide"
      },
      Grid: {
        resolve: "_resolveFull",
        data: {
          resolveV1: function(a) {
            this.index || this._specifyChartOption(a, this.orientation + "AxisFullGrid");
            return true
          }
        },
        cast: Boolean,
        value: false
      },
      GridCrossesMargin: {
        resolve: "_resolveFull",
        cast: Boolean,
        value: true
      },
      EndLine: {
        resolve: "_resolveFull",
        cast: Boolean
      },
      ZeroLine: {
        resolve: "_resolveFull",
        cast: Boolean,
        value: true
      },
      RuleCrossesMargin: {
        resolve: "_resolveFull",
        cast: Boolean,
        value: true
      },
      Ticks: {
        resolve: "_resolveFull",
        cast: Boolean
      },
      DesiredTickCount: {
        resolve: "_resolveFull",
        data: {
          resolveV1: Z.resolveV1,
          resolveDefault: function(a) {
            if (this.chart.compatVersion() <= 1) {
              a.defaultValue(5);
              return true
            }
          }
        },
        cast: i.castNumber
      },
      MinorTicks: {
        resolve: "_resolveFull",
        data: Z,
        cast: Boolean,
        value: true
      },
      TickFormatter: {
        resolve: "_resolveFull",
        cast: f.fun.as
      },
      DomainRoundMode: {
        resolve: "_resolveFull",
        data: {
          resolveV1: Z.resolveV1,
          resolveDefault: function(a) {
            if (this.chart.compatVersion() <= 1) {
              a.defaultValue("none");
              return true
            }
          }
        },
        cast: i.parseDomainRoundingMode,
        value: "tick"
      },
      TickExponentMin: {
        resolve: "_resolveFull",
        cast: i.castNumber
      },
      TickExponentMax: {
        resolve: "_resolveFull",
        cast: i.castNumber
      },
      Title: {
        resolve: "_resolveFull",
        cast: String
      },
      TitleSize: {
        resolve: "_resolveFull",
        cast: Na
      },
      TitleSizeMax: {
        resolve: "_resolveFull",
        cast: Na
      },
      TitleFont: {
        resolve: "_resolveFull",
        cast: String
      },
      TitleMargins: {
        resolve: "_resolveFull",
        cast: F.as
      },
      TitlePaddings: {
        resolve: "_resolveFull",
        cast: F.as
      },
      TitleAlign: {
        resolve: "_resolveFull",
        cast: function(a) {
          var b = this.option("Position");
          return i.parseAlign(b, a)
        }
      },
      Font: {
        resolve: "_resolveFull",
        cast: String
      },
      ClickAction: {
        resolve: "_resolveFull",
        data: Z
      },
      DoubleClickAction: {
        resolve: "_resolveFull",
        data: Z
      },
      TooltipEnabled: {
        resolve: "_resolveFull",
        cast: Boolean,
        value: true
      },
      TooltipFormat: {
        resolve: "_resolveFull",
        cast: f.fun.as,
        value: null
      },
      TooltipAutoContent: {
        resolve: "_resolveFull",
        cast: i.parseTooltipAutoContent,
        value: "value"
      }
    });
  f.type("pvc.visual.CartesianAxisRootScene", i.visual.Scene);
  f.type("pvc.visual.CartesianAxisTickScene", i.visual.Scene).init(function(a, b) {
    this.base(a, b);
    this.vars.tick = new I(f.get(b, "tick"), f.get(b, "tickLabel"), f.get(b, "tickRaw"));
    if (f.get(b, "isHidden")) this.isHidden = true
  }).add({
    isHidden: false
  });
  f.type("pvc.visual.CartesianFocusWindow", i.visual.OptionsBase).init(function(a) {
    this.base(a, "focusWindow", 0, {
      byNaked: false
    });
    this.base = new i.visual.CartesianFocusWindowAxis(this, a.axes.base)
  }).add({
    _getOptionsDefinition: function() {
      return Nb
    },
    _exportData: function() {
      return {
        base: f.copyProps(this.base, i.visual.CartesianFocusWindow.props)
      }
    },
    _importData: function(a) {
      a = a.base;
      this.base.option.specify({
        Begin: a.begin,
        End: a.end,
        Length: a.length
      })
    },
    _initFromOptions: function() {
      this.base._initFromOptions()
    },
    _onAxisChanged: function() {
      var a = this.option("Changed");
      a && a.call(this.chart.basePanel.context())
    }
  });
  var Nb = f.create(ca, {
    Changed: {
      resolve: "_resolveFull",
      cast: f.fun.as
    }
  });
  f.type("pvc.visual.CartesianFocusWindowAxis", i.visual.OptionsBase).init(function(a, b) {
    this.window = a;
    this.axis = b;
    this.isDiscrete = b.isDiscrete();
    this.base(b.chart, "focusWindow" + f.firstUpperCase(b.type), 0, {
      byNaked: false
    })
  }).addStatic({
    props: ["begin", "end", "length"]
  }).add({
    _getOptionsDefinition: function() {
      return Ob
    },
    _initFromOptions: function() {
      var a = this.option;
      this.set({
        begin: a("Begin"),
        end: a("End"),
        length: a("Length")
      })
    },
    set: function(a) {
      var b = this,
        c = f.get(a, "render"),
        d = f.get(a, "select", true),
        e, g, h;
      if (a = b._readArgs(a)) {
        e = a.begin;
        g = a.end;
        h = a.length
      } else if (this.begin != null && this.end != null && this.length != null) return;
      a = b.axis;
      var j = a.scale,
        l = b.isDiscrete;
      a = !l ? a.role.firstDimensionType().cast : null;
      j = j.domain();
      var m;
      if (l) {
        l = j.length;
        var k, n;
        if (e != null) {
          a = +e;
          if (!isNaN(a))
            if (a === Infinity) {
              k = l - 1;
              e = j[k]
            } else if (a === -Infinity) {
              k =
                0;
              e = j[k]
            }
          if (k == null) {
            k = j.indexOf("" + e);
            if (k < 0) {
              k = 0;
              e = j[k]
            }
          }
        }
        if (g != null) {
          a = +g;
          if (!isNaN(a))
            if (a === Infinity) {
              n = l - 1;
              g = j[n]
            } else if (a === -Infinity) {
              n = 0;
              g = j[n]
            }
          if (n == null) {
            n = j.indexOf("" + g);
            if (n < 0) {
              n = l - 1;
              g = j[n]
            }
          }
        }
        if (h != null) {
          h = +h;
          if (isNaN(h)) h = null;
          else if (h < 0 && (e != null || g != null)) {
            m = e;
            a = k;
            e = g;
            k = n;
            g = m;
            n = a;
            h = -h
          }
        }
        if (e != null)
          if (g != null) {
            if (k > n) {
              m = e;
              a = k;
              e = g;
              k = n;
              g = m;
              n = a
            }
            h = n - k + 1
          } else {
            if (h == null) h = l - k;
            n = k + h - 1;
            if (n > l - 1) {
              n = l - 1;
              h = n - k + 1
            }
            g = j[n]
          } else if (g != null) {
          if (h == null) h = n;
          k = n - h + 1;
          if (k < 0) {
            k = 0;
            h = n - k + 1
          }
          e = j[k]
        } else {
          if (h ==
            null) h = Math.max(~~(l / 3), 1);
          if (h > l) {
            h = l;
            k = 0;
            n = l - 1
          } else {
            a = ~~(l / 2);
            k = a - ~~(h / 2);
            n = k + h - 1
          }
          e = j[k];
          g = j[n]
        }
      } else {
        if (h != null) {
          h = +h;
          if (isNaN(h)) h = null;
          else if (h < 0 && (e != null || g != null)) {
            m = e;
            e = g;
            g = m;
            h = -h
          }
        }
        k = j[0];
        n = j[1];
        l = n - k;
        if (e != null) {
          if (e < k) e = k;
          if (e > n) e = n
        }
        if (g != null) {
          if (g < k) g = k;
          if (g > n) g = n
        }
        if (e != null)
          if (g != null) {
            if (e > g) {
              m = e;
              e = g;
              g = m
            }
            h = g - e
          } else {
            if (h == null) h = n - e;
            g = e + h;
            if (g > n) {
              g = n;
              h = g - e
            }
          } else if (g != null) {
          if (h == null) h = g - k;
          e = g - h;
          if (e < k) {
            e = k;
            h = g - e
          }
        } else {
          if (h == null) h = Math.max(~~(l / 3), 1);
          if (h > l) {
            h = l;
            e = k;
            g = n
          } else {
            m = ~~(l /
              2);
            e = m - ~~(h / 2);
            g = +e + +h
          }
        }
        e = a(e);
        g = a(g);
        h = a(h);
        if (j = b.option("Constraint")) {
          g = {
            type: "new",
            target: "begin",
            value: e,
            length: h,
            length0: h,
            min: k,
            max: n,
            minView: k,
            maxView: n
          };
          j(g);
          e = a(g.value);
          h = a(g.length);
          g = a(+e + +h)
        }
      }
      b._set(e, g, h, d, c)
    },
    _updatePosition: function(a, b, c, d) {
      var e = this,
        g = e.axis.scale;
      if (e.isDiscrete) {
        e = g.invertIndex(a);
        b = g.invertIndex(b) - 1;
        g = g.domain();
        a = g[e];
        g = g[b];
        e = b - e + 1
      } else {
        a = g.invert(a);
        g = g.invert(b);
        e = g - a
      }
      this._set(a, g, e, c, d)
    },
    _constraintPosition: function(a) {
      var b = this,
        c = b.axis,
        d = c.scale;
      if (b.isDiscrete) {
        c = Math.floor(d.invertIndex(a.point, true));
        if (c >= 0) {
          b = d.range();
          d = d.domain().length;
          b = (b.max - b.min) / d;
          if (c >= d && (a.type === "new" || a.type === "resize-begin")) c = d - 1;
          a.point = c * b
        }
      } else if (b = b.option("Constraint")) {
        var e = c.role.firstDimensionType().cast,
          g = e(d.invert(a.point));
        c = a.target === "begin" ? 1 : -1;
        var h = e(d.invert(a.point + c * a.length));
        h = e(c * (h - g));
        var j, l;
        if (a.length === a.length0) j = h;
        else {
          l = a.point + c * a.length0;
          l = e(d.invert(l));
          j = c * (l - g)
        }
        l = e(d.invert(a.min));
        var m = e(d.invert(a.max));
        e = {
          type: a.type,
          target: a.target,
          value: g,
          length: h,
          length0: j,
          min: l,
          max: m,
          minView: e(d.invert(a.minView)),
          maxView: e(d.invert(a.maxView))
        };
        b(e);
        if (+e.value !== +g) {
          g = e.value;
          a.point = d(g)
        }
        b = e.length;
        if (+b !== +h)
          if (+b === +j) a.length = a.length0;
          else {
            b = d(+g + c * +b);
            a.length = b - c * a.point
          }
        if (+e.min !== +l) a.min = d(e.min);
        if (+e.max !== +m) a.max = d(e.max)
      }
    },
    _compare: function(a, b) {
      return this.isDiscrete ? "" + a === "" + b : +a === +b
    },
    _set: function(a, b, c, d, e) {
      var g = this,
        h = false;
      if (!g._compare(a, g.begin)) {
        g.begin = a;
        h = true
      }
      if (!g._compare(b, g.end)) {
        g.end =
          b;
        h = true
      }
      if (!g._compare(c, g.length)) {
        g.length = c;
        h = true
      }
      h && g.window._onAxisChanged(this);
      d && g._updateSelection({
        render: e
      });
      return h
    },
    _readArgs: function(a) {
      if (a) {
        var b = {},
          c = 0;
        i.visual.CartesianFocusWindowAxis.props.forEach(function(d) {
          var e = a[d];
          if (e != null) c = true;
          else e = this[d];
          b[d] = e
        }, this);
        if (c) return b
      }
    },
    _updateSelection: function(a) {
      var b = this,
        c, d = b.axis,
        e = d.isDiscrete(),
        g = d.chart,
        h = d.dataCell;
      d = h.role;
      h = g.partData(h.dataPartValue, {
        visible: true
      });
      var j;
      if (e) {
        j = d.flatten(h);
        d = j._childrenByKey[b.begin];
        e = j._childrenByKey[b.end];
        if (d && e) {
          c = d.childIndex();
          e = e.childIndex();
          c = f.range(c, e - c + 1).select(function(m) {
            return j._children[m]
          }).selectMany(function(m) {
            return m._datums
          }).distinct(function(m) {
            return m.key
          })
        }
      } else {
        j = h;
        var l = d.firstDimensionName();
        c = f.query(h._datums).where(function(m) {
          m = m.atoms[l].value;
          return m != null && m >= b.begin && m <= b.end
        })
      }
      if (c) {
        g.data.replaceSelected(c);
        g.root.updateSelections(a)
      }
    }
  });
  var Ob = f.create(ca, {
    Resizable: {
      resolve: "_resolveFull",
      cast: Boolean,
      value: true
    },
    Movable: {
      resolve: "_resolveFull",
      cast: Boolean,
      value: true
    },
    Begin: {
      resolve: "_resolveFull"
    },
    End: {
      resolve: "_resolveFull"
    },
    Length: {
      resolve: "_resolveFull"
    },
    Constraint: {
      resolve: "_resolveFull",
      cast: f.fun.as
    }
  });
  f.type("pvc.visual.ColorAxis", ua).add({
    scaleNullRangeValue: function() {
      return this.option("Missing") || null
    },
    scaleUsesAbs: function() {
      return this.option("UseAbs")
    },
    bind: function(a) {
      this.base(a);
      this._plotList = f.query(a).select(function(b) {
        return b.plot
      }).distinct(function(b) {
        return b && b.id
      }).array();
      return this
    },
    _wrapScale: function(a) {
      if (this.scaleType ===
        "discrete" ? this.option.isSpecified("Transform") || !this.option.isSpecified("Colors") && !this.option.isSpecified("Map") : true) {
        var b = this.option("Transform");
        if (b) a = a.transform(b)
      }
      return this.base(a)
    },
    scheme: function() {
      return f.lazy(this, "_scheme", this._createScheme, this)
    },
    _createColorMapFilter: function(a) {
      var b = f.uniqueIndex(a, function(c) {
        return c.key
      });
      return {
        domain: function(c) {
          return !f.hasOwn(a, c)
        },
        color: function(c) {
          return !f.hasOwn(b, c.key)
        }
      }
    },
    _createScheme: function() {
      var a = this,
        b = a.option("Colors");
      if (a.scaleType !== "discrete") return function() {
        var e = b.apply(null, arguments);
        return a._wrapScale(e)
      };
      var c = a.option("Map");
      if (!c) return function() {
        var e = b.apply(null, arguments);
        return a._wrapScale(e)
      };
      var d = this._createColorMapFilter(c);
      return function(e) {
        var g;
        e instanceof Array || (e = f.array.copy(arguments));
        e = e.filter(d.domain);
        var h = b(e);
        g = h.range().filter(d.color);
        h.range(g);
        g = function(m) {
          return f.getOwn(c, m) || h(m)
        };
        f.copy(g, h);
        var j, l;
        g.domain = function() {
          if (arguments.length) throw f.operationInvalid("The scale cannot be modified.");
          j || (j = f.array.append(f.ownKeys(c), e));
          return j
        };
        g.range = function() {
          if (arguments.length) throw f.operationInvalid("The scale cannot be modified.");
          l || (l = f.array.append(f.own(c), e));
          return l
        };
        return a._wrapScale(g)
      }
    },
    sceneScale: function(a) {
      var b = f.get(a, "sceneVarName") || this.role.name,
        c = this.scalesByCateg;
      if (c) {
        var d = this.option("Missing");
        return function(e) {
          var g = e.vars[b].value;
          if (g == null) return d;
          return c[e.group.parent.absKey](g)
        }
      }
      return this.scale.by1(function(e) {
        return e && e.vars[b].value
      })
    },
    _buildOptionId: function() {
      return this.id +
        "Axis"
    },
    _getOptionsDefinition: function() {
      return Pb
    },
    _resolveByNaked: i.options.specify(function(a) {
      if (!this.index) return this._chartOption(this.id + f.firstUpperCase(a.name))
    }),
    _specifyV1ChartOption: function(a, b) {
      if (!this.index && this.chart.compatVersion() <= 1 && this._specifyChartOption(a, b)) return true
    }
  });
  Y = {
    resolveDefault: function(a) {
      if (!this.index && this._specifyChartOption(a, f.firstLowerCase(a.name))) return true
    }
  };
  var ra, Pb = f.create(ca, {
    Colors: {
      resolve: "_resolveFull",
      getDefault: Db,
      data: {
        resolveV1: function(a) {
          if (this.scaleType ===
            "discrete")
            if (this.index === 0) this._specifyChartOption(a, "colors");
            else this.index === 1 && this.chart._allowV1SecondAxis && this._specifyChartOption(a, "secondAxisColor");
          else this._specifyChartOption(a, "colorRange");
          return true
        },
        resolveDefault: function(a) {
          this.index === 0 && this._specifyChartOption(a, "colors")
        }
      },
      cast: i.colorScheme
    },
    Map: {
      resolve: "_resolveFull",
      cast: Cb
    },
    Transform: {
      resolve: "_resolveFull",
      data: {
        resolveDefault: function(a) {
          var b = this._plotList;
          if (b.length <= 2)
            if (f.query(b).all(function(c) {
              c = c.name;
              return c === "plot2" || c === "trend"
            })) {
              a.defaultValue(i.brighterColorTransform);
              return true
            }
        }
      },
      cast: f.fun.to
    },
    NormByCategory: {
      resolve: function(a) {
        if (!this.chart._allowColorPerCategory) {
          a.specify(false);
          return true
        }
        return this._resolveFull(a)
      },
      data: {
        resolveV1: function(a) {
          this._specifyV1ChartOption(a, "normPerBaseCategory");
          return true
        }
      },
      cast: Boolean,
      value: false
    },
    ScaleType: {
      resolve: "_resolveFull",
      data: {
        resolveV1: function(a) {
          this._specifyV1ChartOption(a, "scalingType");
          return true
        }
      },
      cast: i.parseContinuousColorScaleType,
      value: "linear"
    },
    UseAbs: {
      resolve: "_resolveFull",
      cast: Boolean,
      value: false
    },
    Domain: {
      resolve: "_resolveFull",
      data: {
        resolveV1: function(a) {
          this._specifyV1ChartOption(a, "colorRangeInterval");
          return true
        }
      },
      cast: f.array.to
    },
    Min: {
      resolve: "_resolveFull",
      data: {
        resolveV1: function(a) {
          this._specifyV1ChartOption(a, "minColor");
          return true
        }
      },
      cast: u.color
    },
    Max: {
      resolve: "_resolveFull",
      data: {
        resolveV1: function(a) {
          this._specifyV1ChartOption(a, "maxColor");
          return true
        }
      },
      cast: u.color
    },
    Missing: {
      resolve: "_resolveFull",
      data: {
        resolveV1: function(a) {
          this._specifyV1ChartOption(a,
            "nullColor");
          return true
        }
      },
      cast: u.color,
      value: u.color("lightgray")
    },
    Unbound: {
      resolve: "_resolveFull",
      getDefault: function() {
        return this.option("Colors")().range()[0] || i.defaultColor
      },
      cast: u.color
    },
    LegendVisible: {
      resolve: "_resolveFull",
      data: Y,
      cast: Boolean,
      value: true
    },
    LegendClickMode: {
      resolve: "_resolveFull",
      data: Y,
      cast: i.parseLegendClickMode,
      value: "togglevisible"
    },
    LegendDrawLine: {
      resolve: "_resolveFull",
      data: Y,
      cast: Boolean,
      value: false
    },
    LegendDrawMarker: {
      resolve: "_resolveFull",
      data: Y,
      cast: Boolean,
      value: true
    },
    LegendShape: {
      resolve: "_resolveFull",
      data: Y,
      cast: i.parseShape
    }
  });
  f.type("pvc.visual.SizeAxis", ua).init(function(a, b, c, d) {
    d = f.set(d, "byNaked", false);
    this.base(a, b, c, d)
  }).add({
    _buildOptionId: function() {
      return this.id + "Axis"
    },
    scaleTreatsNullAs: function() {
      return "min"
    },
    scaleUsesAbs: function() {
      return this.option("UseAbs")
    },
    setScaleRange: function(a) {
      var b = this.scale;
      b.min = a.min;
      b.max = a.max;
      b.size = a.max - a.min;
      b.range(b.min, b.max);
      i.debug >= 4 && i.log("Scale: " + i.stringify(f.copyOwn(b)));
      return this
    },
    _getOptionsDefinition: function() {
      return Qb
    }
  });
  var Qb = f.create(ca, {
    OriginIsZero: {
      resolve: "_resolveFull",
      cast: Boolean,
      value: false
    },
    FixedMin: {
      resolve: "_resolveFull",
      cast: i.castNumber
    },
    FixedMax: {
      resolve: "_resolveFull",
      cast: i.castNumber
    },
    UseAbs: {
      resolve: "_resolveFull",
      cast: Boolean,
      value: false
    }
  });
  f.type("pvc.visual.Legend", i.visual.OptionsBase).init(function(a, b, c, d) {
    d = f.set(d, "byNaked", false);
    this.base(a, b, c, d)
  }).add({
    _getOptionsDefinition: function() {
      return Rb
    }
  });
  var Rb = {
    Position: {
      resolve: "_resolveFull",
      cast: i.parsePosition,
      value: "bottom"
    },
    Size: {
      resolve: "_resolveFull",
      cast: Oa
    },
    SizeMax: {
      resolve: "_resolveFull",
      cast: Oa
    },
    Align: {
      resolve: "_resolveFull",
      data: {
        resolveDefault: function(a) {
          var b = this.option("Position"),
            c;
          if (b !== "top" && b !== "bottom") c = "top";
          else if (this.chart.compatVersion() <= 1) c = "left";
          a.defaultValue(c);
          return true
        }
      },
      cast: Eb
    },
    Margins: {
      resolve: "_resolveFull",
      data: {
        resolveDefault: function(a) {
          if (this.chart.compatVersion() > 1) {
            var b = this.option("Position");
            b = f.set({}, i.BasePanel.oppositeAnchor[b], 5);
            a.defaultValue(b)
          }
          return true
        }
      },
      cast: F.as
    },
    Paddings: {
      resolve: "_resolveFull",
      cast: F.as,
      value: 5
    },
    Font: {
      resolve: "_resolveFull",
      cast: String,
      value: "10px sans-serif"
    }
  };
  f.type("pvc.visual.legend.BulletRootScene", i.visual.Scene).init(function(a, b) {
    this.base(a, b);
    a = f.get(b, "markerSize", 15);
    var c = (new F(f.get(b, "itemPadding", 5))).resolve(a, a);
    f.set(this.vars, "horizontal", f.get(b, "horizontal", false), "font", f.get(b, "font"), "markerSize", a, "textMargin", f.get(b, "textMargin", 6), "itemPadding", c)
  }).add({
    layout: function(a) {
      function b(q) {
        var s = q.labelTextSize(),
          r = !s || !s.width || !s.height;
        q.isHidden =
          r;
        if (!r) {
          s = {
            width: h + s.width + 0,
            height: Math.max(s.height, g)
          };
          var t;
          if (n) t = !n.items.length;
          else {
            n = new i.visual.legend.BulletItemSceneRow(0);
            t = true
          }
          r = n.size.width + s[l];
          t || (r += j[l]);
          if (!t && r > k) {
            c(false);
            r = s[l]
          }
          t = n.size;
          t.width = r;
          t.height = Math.max(t.height, s[m]);
          r = n.items.length;
          n.items.push(q);
          f.set(q.vars, "row", n, "rowIndex", r, "clientSize", s)
        }
      }

      function c(q) {
        var s = n.size;
        p.height += s.height;
        if (o.length) p.height += j[m];
        p.width = Math.max(p.width, s.width);
        o.push(n);
        q || (n = new i.visual.legend.BulletItemSceneRow(o.length))
      }
      var d = a.clientSize;
      if (!(d.width > 0 && d.height > 0)) return new M(0, 0);
      var e = a.desiredClientSize,
        g = this.vars.markerSize,
        h = g + this.vars.textMargin,
        j = this.vars.itemPadding,
        l = this.vars.horizontal ? "width" : "height",
        m = i.BasePanel.oppositeLength[l],
        k = e[l];
      if (!k || k < 0) k = d[l];
      var n, o = [],
        p = {
          width: 0,
          height: 0
        };
      this.childNodes.forEach(function(q) {
        q.childNodes.forEach(b, this)
      }, this);
      if (!n) return new M(0, 0);
      c(true);
      f.set(this.vars, "rows", o, "rowCount", n, "size", p);
      a = this.compatVersion() <= 1 ? k : p.width;
      e = e[m];
      if (!e || e < 0) e = p.height;
      return f.set({}, l, Math.min(a, d[l]), m, Math.min(e, d[m]))
    },
    defaultGroupSceneType: function() {
      var a = this._bulletGroupType;
      if (!a) this._bulletGroupType = a = f.type(i.visual.legend.BulletGroupScene);
      return a
    },
    createGroup: function(a) {
      return new(this.defaultGroupSceneType())(this, a)
    }
  });
  f.type("pvc.visual.legend.BulletItemSceneRow").init(function(a) {
    this.index = a;
    this.items = [];
    this.size = {
      width: 0,
      height: 0
    }
  });
  f.type("pvc.visual.legend.BulletGroupScene", i.visual.Scene).init(function(a, b) {
    this.base(a, b);
    this.extensionPrefix =
      f.get(b, "extensionPrefix") || "";
    this._renderer = f.get(b, "renderer");
    this.colorAxis = f.get(b, "colorAxis");
    this.clickMode = f.get(b, "clickMode");
    if (!this.clickMode && this.colorAxis) this.clickMode = this.colorAxis.option("LegendClickMode")
  }).add({
    hasRenderer: function() {
      return !!this._renderer
    },
    renderer: function(a) {
      if (a != null) this._renderer = a;
      else {
        a = this._renderer;
        if (!a) {
          var b;
          if (a = this.colorAxis) b = {
            drawRule: a.option("LegendDrawLine"),
            drawMarker: a.option("LegendDrawMarker"),
            markerShape: a.option("LegendShape")
          };
          this._renderer = a = new i.visual.legend.BulletItemDefaultRenderer(b)
        }
      }
      return a
    },
    itemSceneType: function() {
      var a = this._itemSceneType;
      if (!a) {
        a = f.type(i.visual.legend.BulletItemScene);
        switch (this.clickMode) {
          case "toggleselected":
            a.add(i.visual.legend.BulletItemSceneSelection);
            break;
          case "togglevisible":
            a.add(i.visual.legend.BulletItemSceneVisibility);
            break
        }
        var b = this.panel();
        b._extendSceneType("item", a, ["isOn", "executable", "execute", "value"]);
        var c = i.makeExtensionAbsId(i.makeExtensionAbsId("ItemScene", [this.extensionPrefix,
          "$"
        ]), b._getExtensionPrefix());
        b = b.chart._getExtension(c, "value");
        b !== undefined && a.prototype.variable("value", b);
        this._itemSceneType = a
      }
      return a
    },
    createItem: function(a) {
      return new(this.itemSceneType())(this, a)
    }
  });
  f.type("pvc.visual.legend.BulletItemScene", i.visual.Scene).init(function() {
    this.base.apply(this, arguments);
    if (!this.executable()) {
      var a = i.visual.Interactive;
      this._ibits = a.Interactive | a.ShowsInteraction | a.Hoverable | a.SelectableAny
    }
  }).add({
    isOn: f.fun.constant(true),
    executable: f.fun.constant(false),
    execute: f.fun.constant(),
    labelTextSize: function() {
      return u.Text.measure(this.value().label, this.vars.font)
    },
    _valueEval: function() {
      var a = this._valueEvalCore();
      a instanceof I || (a = new I(a, a));
      return a
    },
    _valueEvalCore: function() {
      var a, b, c, d = this.group || this.datum;
      if (d) {
        a = d.value;
        b = d.rawValue;
        c = d.ensureLabel() + this._getTrendLineSuffix(d)
      }
      return new I(a || null, c || "", b)
    },
    _getTrendLineSuffix: function(a) {
      var b = this.chart()._getDataPartDimName();
      if (b) {
        a = a.atoms[b];
        if (isNaN(+a.value)) return " (" + a.label + ")"
      }
      return ""
    }
  }).prototype.variable("value");
  f.type("pvc.visual.legend.BulletItemSceneSelection").add({
    isOn: function() {
      return !(this.group || this.datum).owner.selectedCount() || this.isSelected()
    },
    executable: function() {
      return this.chart().selectableByClick()
    },
    execute: function() {
      var a = this.datums().array();
      if (a.length) {
        var b = this.chart();
        b._updatingSelections(function() {
          (a = b._onUserSelection(a)) && a.length && i.data.Data.toggleSelected(a, true)
        })
      }
    }
  });
  f.type("pvc.visual.legend.BulletItemSceneVisibility").add({
    isOn: function() {
      return this.datums().any(function(a) {
        return !a.isNull &&
          a.isVisible
      })
    },
    executable: f.fun.constant(true),
    execute: function() {
      i.data.Data.toggleVisible(this.datums()) && this.chart().render(true, true, false)
    }
  });
  f.type("pvc.visual.legend.BulletItemRenderer");
  f.type("pvc.visual.legend.BulletItemDefaultRenderer", i.visual.legend.BulletItemRenderer).init(function(a) {
    if (this.drawRule = f.get(a, "drawRule", false)) this.rulePvProto = f.get(a, "rulePvProto");
    if (this.drawMarker = !this.drawRule || f.get(a, "drawMarker", true)) {
      this.markerShape = f.get(a, "markerShape", "square");
      this.markerPvProto =
        f.get(a, "markerPvProto")
    }
  }).add({
    drawRule: false,
    drawMarker: true,
    markerShape: null,
    rulePvProto: null,
    markerPvProto: null,
    create: function(a, b, c, d) {
      var e = {},
        g = this.drawRule,
        h = function(m) {
          return m.color
        };
      if (g) {
        var j = (new O).left(0).top(function() {
            return this.parent.height() / 2
          }).width(function() {
            return this.parent.width()
          }).lineWidth(1, i.extensionTag).strokeStyle(h, i.extensionTag),
          l = this.rulePvProto;
        if (l) j = l.extend(j);
        e.pvRule = (new i.visual.Rule(a, b, {
          proto: j,
          noSelect: false,
          noHover: false,
          activeSeriesAware: false,
          extensionId: c + "Rule",
          showsInteraction: true,
          wrapper: d
        })).pvMark
      }
      if (this.drawMarker) {
        g = (new O).left(function() {
          return this.parent.width() / 2
        }).top(function() {
          return this.parent.height() / 2
        }).shapeSize(function() {
          return this.parent.width()
        }, i.extensionTag).lineWidth(2, i.extensionTag).fillStyle(h, i.extensionTag).strokeStyle(h, i.extensionTag).shape(this.markerShape, i.extensionTag).angle(g ? 0 : Math.PI / 2, i.extensionTag).antialias(function() {
            var m = Math.abs(Math.cos(this.angle()));
            if (m !== 0 && m !== 1) switch (this.shape()) {
              case "square":
              case "bar":
                return false
            }
            return true
          },
          i.extensionTag);
        if (h = this.markerPvProto) g = h.extend(g);
        e.pvDot = (new i.visual.Dot(a, b, {
          proto: g,
          freePosition: true,
          activeSeriesAware: false,
          noTooltip: true,
          noClick: true,
          extensionId: c + "Dot",
          wrapper: d
        })).pvMark
      }
      return e
    }
  });
  f.type("pvc.visual.DataCell").init(function(a, b, c, d, e) {
    this.plot = a;
    this.axisType = b;
    this.axisIndex = c;
    this.role = a.chart.visualRoles[d];
    this.dataPartValue = e
  }).add({
    isBound: function() {
      return this.role && this.role.isBound()
    },
    domainData: function() {
      return f.lazy(this, "_domainData", this._resolveDomainData,
        this)
    },
    domainItemDatas: function() {
      var a = this.domainData();
      return f.query((a || undefined) && a.children())
    },
    domainItemDataValue: function(a) {
      return f.nullyTo(a.value, "")
    },
    domainItemValues: function() {
      return this.domainItemDatas().select(this.domainItemDataValue, this).distinct()
    },
    _resolveDomainData: function() {
      var a = this.role;
      if (a && a.isBound()) {
        var b = this.plot.chart.partData(this.dataPartValue);
        if (b) return a.flatten(b)
      }
      return null
    }
  });
  f.type("pvc.visual.Plot", i.visual.OptionsBase).init(function(a, b) {
    var c =
      f.getPath(a, ["plotsByType", this.type]);
    c = c ? c.length : 0;
    b = f.set(b, "byNaked", !a.plotList.length);
    this.base(a, this.type, c, b);
    a._addPlot(this);
    a = this.extensionPrefixes = [this.id];
    this.globalIndex || a.push("");
    this.name && a.push(this.name)
  }).add({
    _getOptionsDefinition: function() {
      return i.visual.Plot.optionsDef
    },
    _resolveByNaked: i.options.specify(function(a) {
      if (!this.globalIndex) return this._chartOption(f.firstLowerCase(a.name))
    }),
    collectDataCells: function(a) {
      var b = this._getColorDataCell();
      b && a.push(b)
    },
    _getColorDataCell: function() {
      var a =
        this.option("ColorRole");
      if (a) return new i.visual.DataCell(this, "color", this.option("ColorAxis") - 1, a, this.option("DataPart"))
    }
  });
  i.visual.Plot.optionsDef = {
    Orientation: {
      resolve: function(a) {
        a.specify(this._chartOption("orientation") || "vertical");
        return true
      },
      cast: String
    },
    ValuesVisible: {
      resolve: "_resolveFull",
      data: {
        resolveV1: function(a) {
          if (this.globalIndex === 0) {
            var b = this._chartOption("showValues");
            if (b !== undefined) a.specify(b);
            else {
              b = this.type !== "point";
              a.defaultValue(b)
            }
            return true
          }
        }
      },
      cast: Boolean,
      value: false
    },
    ValuesAnchor: {
      resolve: "_resolveFull",
      cast: i.parseAnchor
    },
    ValuesFont: {
      resolve: "_resolveFull",
      cast: String,
      value: "10px sans-serif"
    },
    ValuesMask: {
      resolve: "_resolveFull",
      cast: String,
      value: "{value}"
    },
    ValuesOptimizeLegibility: {
      resolve: "_resolveFull",
      cast: Boolean,
      value: false
    },
    DataPart: {
      resolve: "_resolveFixed",
      cast: String,
      value: "0"
    },
    ColorRole: {
      resolve: "_resolveFixed",
      cast: String,
      value: "color"
    },
    ColorAxis: {
      resolve: i.options.resolvers([function(a) {
        if (this.globalIndex === 0) {
          a.specify(1);
          return true
        }
      },
        "_resolveFull"
      ]),
      cast: function(a) {
        a = i.castNumber(a);
        return a = a != null ? f.between(a, 1, 10) : 1
      },
      value: 1
    }
  };
  f.type("pvc.visual.CartesianPlot", i.visual.Plot).add({
    _getOptionsDefinition: function() {
      return i.visual.CartesianPlot.optionsDef
    }
  });
  i.visual.CartesianPlot.optionsDef = f.create(i.visual.Plot.optionsDef, {
    BaseAxis: {
      value: 1
    },
    BaseRole: {
      resolve: "_resolveFixed",
      cast: String
    },
    OrthoAxis: {
      resolve: function(a) {
        if (this.globalIndex === 0) {
          a.specify(1);
          return true
        }
        return this._resolveFull(a)
      },
      data: {
        resolveV1: function(a) {
          this.name ===
            "plot2" && this.chart._allowV1SecondAxis && this._chartOption("secondAxisIndependentScale") && a.specify(2);
          return true
        }
      },
      cast: function(a) {
        a = i.castNumber(a);
        return a = a != null ? f.between(a, 1, 10) : 1
      },
      value: 1
    },
    OrthoRole: {
      resolve: i.options.resolvers(["_resolveFixed", "_resolveDefault"])
    },
    Trend: {
      resolve: "_resolveFull",
      data: {
        resolveDefault: function(a) {
          var b = this.option("TrendType");
          if (b) {
            a.defaultValue({
              type: b
            });
            return true
          }
        }
      },
      cast: Fb
    },
    TrendType: {
      resolve: "_resolveFull",
      cast: i.parseTrendType
    },
    TrendLabel: {
      resolve: "_resolveFull",
      cast: String
    },
    NullInterpolationMode: {
      resolve: "_resolveFull",
      cast: i.parseNullInterpolationMode,
      value: "none"
    }
  });
  f.type("pvc.visual.CategoricalPlot", i.visual.CartesianPlot).add({
    _getOptionsDefinition: function() {
      return i.visual.CategoricalPlot.optionsDef
    }
  });
  i.visual.CategoricalPlot.optionsDef = f.create(i.visual.CartesianPlot.optionsDef, {
    Stacked: {
      resolve: "_resolveFull",
      cast: Boolean,
      value: false
    },
    BaseRole: {
      value: "category"
    },
    OrthoRole: {
      value: "value"
    }
  });
  f.type("pvc.visual.BarPlotAbstract", i.visual.CategoricalPlot).add({
    _getOptionsDefinition: function() {
      return i.visual.BarPlotAbstract.optionsDef
    }
  });
  i.visual.BarPlotAbstract.optionsDef = f.create(i.visual.CategoricalPlot.optionsDef, {
    BarSizeRatio: {
      resolve: "_resolveFull",
      cast: function(a) {
        a = i.castNumber(a);
        if (a == null) a = 1;
        else if (a < 0.05) a = 0.05;
        else if (a > 1) a = 1;
        return a
      },
      value: 0.9
    },
    BarSizeMax: {
      resolve: "_resolveFull",
      data: {
        resolveV1: function(a) {
          this._specifyChartOption(a, "maxBarSize");
          return true
        }
      },
      cast: function(a) {
        a = i.castNumber(a);
        if (a == null) a = Infinity;
        else if (a < 1) a = 1;
        return a
      },
      value: 2E3
    },
    BarStackedMargin: {
      resolve: "_resolveFull",
      cast: function(a) {
        a = i.castNumber(a);
        if (a != null && a < 0) a = 0;
        return a
      },
      value: 0
    },
    OverflowMarkersVisible: {
      resolve: "_resolveFull",
      cast: Boolean,
      value: true
    },
    ValuesAnchor: {
      value: "center"
    }
  });
  f.type("pvc.visual.BarPlot", i.visual.BarPlotAbstract).add({
    type: "bar"
  });
  f.type("pvc.visual.NormalizedBarPlot", i.visual.BarPlotAbstract).add({
    type: "bar",
    _getOptionsDefinition: function() {
      return i.visual.NormalizedBarPlot.optionsDef
    }
  });
  i.visual.NormalizedBarPlot.optionsDef = f.create(i.visual.BarPlotAbstract.optionsDef, {
    Stacked: {
      resolve: null,
      value: true
    }
  });
  f.type("pvc.visual.WaterfallPlot",
      i.visual.BarPlotAbstract).add({
      type: "water",
      _getOptionsDefinition: function() {
        return i.visual.WaterfallPlot.optionsDef
      }
    });
  i.visual.WaterfallPlot.optionsDef = f.create(i.visual.BarPlotAbstract.optionsDef, {
    Stacked: {
      resolve: null,
      value: true
    },
    TotalLineLabel: {
      resolve: "_resolveFull",
      cast: String,
      value: "Accumulated"
    },
    TotalValuesVisible: {
      resolve: "_resolveFull",
      data: {
        resolveDefault: function(a) {
          a.defaultValue(this.option("ValuesVisible"));
          return true
        }
      },
      cast: Boolean
    },
    Direction: {
      resolve: "_resolveFull",
      cast: i.parseWaterDirection,
      value: "down"
    },
    AreasVisible: {
      resolve: "_resolveFull",
      cast: Boolean,
      value: true
    },
    AllCategoryLabel: {
      resolve: "_resolveFull",
      cast: String,
      value: "All"
    }
  });
  f.type("pvc.visual.PointPlot", i.visual.CategoricalPlot).add({
    type: "point",
    _getOptionsDefinition: function() {
      return i.visual.PointPlot.optionsDef
    }
  });
  i.visual.PointPlot.optionsDef = f.create(i.visual.CategoricalPlot.optionsDef, {
    DotsVisible: {
      resolve: "_resolveFull",
      data: sa("Dots", true),
      cast: Boolean,
      value: false
    },
    LinesVisible: {
      resolve: "_resolveFull",
      data: sa("Lines",
        true),
      cast: Boolean,
      value: false
    },
    AreasVisible: {
      resolve: "_resolveFull",
      data: sa("Areas", false),
      cast: Boolean,
      value: false
    },
    ValuesAnchor: {
      value: "right"
    }
  });
  f.type("pvc.visual.MetricXYPlot", i.visual.CartesianPlot).add({
    _getOptionsDefinition: function() {
      return i.visual.MetricXYPlot.optionsDef
    }
  });
  i.visual.MetricXYPlot.optionsDef = f.create(i.visual.CartesianPlot.optionsDef, {
    BaseRole: {
      value: "x"
    },
    OrthoAxis: {
      resolve: null
    },
    OrthoRole: {
      value: "y"
    }
  });
  f.type("pvc.visual.MetricPointPlot", i.visual.MetricXYPlot).add({
    type: "scatter",
    _getOptionsDefinition: function() {
      return i.visual.MetricPointPlot.optionsDef
    }
  });
  i.visual.MetricPointPlot.optionsDef = f.create(i.visual.MetricXYPlot.optionsDef, {
    SizeRole: {
      resolve: "_resolveFixed",
      value: "size"
    },
    SizeAxis: {
      resolve: "_resolveFixed",
      value: 1
    },
    Shape: {
      resolve: "_resolveFull",
      cast: i.parseShape,
      value: "circle"
    },
    NullShape: {
      resolve: "_resolveFull",
      cast: i.parseShape,
      value: "cross"
    },
    DotsVisible: {
      resolve: "_resolveFull",
      data: Pa("Dots"),
      cast: Boolean,
      value: false
    },
    LinesVisible: {
      resolve: "_resolveFull",
      data: Pa("Lines"),
      cast: Boolean,
      value: false
    },
    ValuesAnchor: {
      value: "right"
    },
    ValuesMask: {
      value: "{x},{y}"
    }
  });
  f.type("pvc.visual.PiePlot", i.visual.Plot).add({
    type: "pie",
    _getOptionsDefinition: function() {
      return i.visual.PiePlot.optionsDef
    }
  });
  i.visual.PiePlot.optionsDef = f.create(i.visual.Plot.optionsDef, {
    ActiveSliceRadius: {
      resolve: "_resolveFull",
      cast: L.parse,
      value: new L(0.05)
    },
    ExplodedSliceRadius: {
      resolve: "_resolveFull",
      cast: L.parse,
      value: 0
    },
    ExplodedSliceIndex: {
      resolve: "_resolveFull",
      cast: i.castNumber,
      value: null
    },
    ValuesAnchor: {
      cast: i.parseAnchorWedge,
      value: "outer"
    },
    ValuesVisible: {
      value: true
    },
    ValuesLabelStyle: {
      resolve: function(a) {
        if (this.chart.compatVersion() <= 1) {
          a.specify("inside");
          return true
        }
        return this._resolveFull(a)
      },
      cast: function(a) {
        switch (a) {
          case "inside":
          case "linked":
            return a
        }
        i.debug >= 2 && i.log("[Warning] Invalid 'ValuesLabelStyle' value: '" + a + "'.");
        return "linked"
      },
      value: "linked"
    },
    ValuesMask: {
      resolve: "_resolveFull",
      data: {
        resolveDefault: function(a) {
          a.defaultValue(this.option("ValuesLabelStyle") === "linked" ? "{value} ({value.percent})" : "{value}");
          return true
        }
      }
    },
    LinkInsetRadius: {
      resolve: "_resolveFull",
      cast: L.parse,
      value: new L(0.05)
    },
    LinkOutsetRadius: {
      resolve: "_resolveFull",
      cast: L.parse,
      value: new L(0.025)
    },
    LinkMargin: {
      resolve: "_resolveFull",
      cast: L.parse,
      value: new L(0.025)
    },
    LinkHandleWidth: {
      resolve: "_resolveFull",
      cast: i.castNumber,
      value: 0.5
    },
    LinkLabelSize: {
      resolve: "_resolveFull",
      cast: L.parse,
      value: new L(0.15)
    },
    LinkLabelSpacingMin: {
      resolve: "_resolveFull",
      cast: i.castNumber,
      value: 0.5
    }
  });
  f.type("pvc.visual.HeatGridPlot", i.visual.CategoricalPlot).add({
    type: "heatGrid",
    _getOptionsDefinition: function() {
      return i.visual.HeatGridPlot.optionsDef
    }
  });
  i.visual.HeatGridPlot.optionsDef = f.create(i.visual.CategoricalPlot.optionsDef, {
    SizeRole: {
      value: "size"
    },
    SizeAxis: {
      value: 1
    },
    UseShapes: {
      resolve: "_resolveFull",
      cast: Boolean,
      value: false
    },
    Shape: {
      resolve: "_resolveFull",
      cast: i.parseShape,
      value: "square"
    },
    NullShape: {
      resolve: "_resolveFull",
      cast: i.parseShape,
      value: "cross"
    },
    ValuesVisible: {
      getDefault: function() {
        return !this.option("UseShapes")
      },
      value: null
    },
    ValuesMask: {
      value: null
    },
    ValuesAnchor: {
      value: "center"
    },
    OrthoRole: {
      value: "series"
    },
    OrthoAxis: {
      resolve: null
    },
    NullInterpolationMode: {
      resolve: null,
      value: "none"
    },
    Stacked: {
      resolve: null,
      value: false
    }
  });
  f.type("pvc.visual.BoxPlot", i.visual.CategoricalPlot).add({
    type: "box",
    _getOptionsDefinition: function() {
      return i.visual.BoxPlot.optionsDef
    }
  });
  i.visual.BoxPlot.optionsDef = f.create(i.visual.CategoricalPlot.optionsDef, {
    Stacked: {
      resolve: null,
      value: false
    },
    OrthoRole: {
      value: ["median", "lowerQuartil", "upperQuartil", "minimum", "maximum"]
    },
    BoxSizeRatio: {
      resolve: "_resolveFull",
      cast: function(a) {
        a = i.castNumber(a);
        if (a == null) a = 1;
        else if (a < 0.05) a = 0.05;
        else if (a > 1) a = 1;
        return a
      },
      value: 1 / 3
    },
    BoxSizeMax: {
      resolve: "_resolveFull",
      data: {
        resolveV1: function(a) {
          this._specifyChartOption(a, "maxBoxSize");
          return true
        }
      },
      cast: function(a) {
        a = i.castNumber(a);
        if (a == null) a = Infinity;
        else if (a < 1) a = 1;
        return a
      },
      value: Infinity
    }
  });
  f.type("pvc.visual.BulletPlot", i.visual.Plot).add({
    type: "bullet",
    _getOptionsDefinition: function() {
      return i.visual.BulletPlot.optionsDef
    }
  });
  i.visual.BulletPlot.optionsDef = f.create(i.visual.Plot.optionsDef, {
    ValuesVisible: {
      value: true
    },
    ColorRole: {
      value: null
    }
  });
  f.type("pvc.visual.TreemapColorDataCell", i.visual.DataCell).init(function() {
    this.base.apply(this, arguments);
    var a = this.role.grouping;
    this._valueProp = !a || a.isSingleDimension ? "value" : "absKey"
  }).add({
    domainItemDatas: function() {
      var a = this.domainData();
      a = f.query((a || undefined) && a.nodes());
      if (this.plot.option("ColorMode") === "byparent") return a.where(function(b) {
        return (!b.parent || b.value != null) && b.children().any(function(c) {
          return c.value != null && c.children().prop("value").all(f.nully)
        })
      });
      return a.where(function(b) {
        if (!b.childCount()) return !b.parent || b.value != null;
        return b.value != null && !b.children().prop("value").any(f.notNully)
      })
    },
    domainItemDataValue: function(a) {
      return f.nullyTo(a[this._valueProp], "")
    },
    _resolveDomainData: function() {
      var a = this.role;
      if (a && a.isBound()) {
        var b = this.plot.chart.partData(this.dataPartValue);
        if (b) return a.select(b)
      }
      return null
    }
  });
  f.type("pvc.visual.TreemapPlot", i.visual.Plot).add({
    type: "treemap",
    _getOptionsDefinition: function() {
      return i.visual.TreemapPlot.optionsDef
    },
    collectDataCells: function(a) {
      this.base(a);
      var b = this.option("SizeRole");
      b && a.push(new i.visual.DataCell(this, "size", this.option("SizeAxis") - 1, b, this.option("DataPart")))
    },
    _getColorDataCell: function() {
      var a = this.option("ColorRole");
      if (a) return new i.visual.TreemapColorDataCell(this, "color", this.option("ColorAxis") - 1, a, this.option("DataPart"))
    }
  });
  i.visual.TreemapPlot.optionsDef = f.create(i.visual.Plot.optionsDef, {
    SizeRole: {
      resolve: "_resolveFixed",
      value: "size"
    },
    SizeAxis: {
      resolve: "_resolveFixed",
      value: 1
    },
    ValuesAnchor: {
      cast: i.parseAnchor,
      value: "center"
    },
    ValuesVisible: {
      value: true
    },
    ValuesMask: {
      resolve: "_resolveFull",
      value: "{category}"
    },
    ValuesOptimizeLegibility: {
      value: true
    },
    LayoutMode: {
      resolve: "_resolveFull",
      cast: i.parseTreemapLayoutMode,
      value: "squarify"
    },
    ColorMode: {
      resolve: "_resolveFull",
      cast: i.parseTreemapColorMode,
      value: "byparent"
    },
    RootCategoryLabel: {
      resolve: "_resolveFull",
      cast: String,
      value: "All"
    }
  });
  f.type("pvc.Abstract").init(function() {
    this._syncLog()
  }).add({
    invisibleLineWidth: 0.0010,
    defaultLineWidth: 1.5,
    _logInstanceId: null,
    _syncLog: function() {
      if (i.debug && typeof console !== "undefined") {
        var a = this._getLogInstanceId();
        ["log", "info", ["trace", "debug"], "error", "warn", ["group", "groupCollapsed"], "groupEnd"].forEach(function(b) {
          b = b instanceof Array ? b : [b, b];
          va(this, "_" + b[0], b[1], a)
        }, this)
      }
    },
    _getLogInstanceId: function() {
      return this._logInstanceId || (this._logInstanceId = this._processLogInstanceId(this._createLogInstanceId()))
    },
    _createLogInstanceId: function() {
      return "" + this.constructor
    },
    _processLogInstanceId: function(a) {
      a =
        a.substr(0, 30);
      if (a.length < 30) a += f.array.create(30 - a.length, " ").join("");
      return "[" + a + "]"
    }
  });
  f.scope(function() {
    var a = i.Abstract.prototype,
      b = function() {
        this._syncLog()
      };
    ["log", "info", "trace", "error", "warn", "group", "groupEnd"].forEach(function(c) {
      a["_" + c] = b
    })
  });
  f.type("pvc.BaseChart", i.Abstract).add(i.visual.Interactive).init(function(a) {
    var b = a,
      c = this.parent = f.get(a, "parent") || null;
    if (c) a || f.fail.argumentRequired("options");
    else a = f.mixin.copy({}, this.defaults, a);
    this.options = a;
    if (c) {
      this.root = c.root;
      this.smallColIndex = a.smallColIndex;
      this.smallRowIndex = a.smallRowIndex
    } else this.root = this;
    this.base();
    i.debug >= 3 && this._info("NEW CHART\n" + i.logSeparator.replace(/-/g, "=") + "\n  DebugLevel: " + i.debug);
    if (i.debug >= 3 && !c && b) {
      this._info("OPTIONS:\n", b);
      i.debug >= 5 && this._trace(i.stringify(a, {
        ownOnly: false,
        funs: true
      }))
    }
    c && c._addChild(this);
    this._constructData(a);
    this._constructVisualRoles(a)
  }).add({
    _disposed: false,
    _animatable: false,
    parent: null,
    children: null,
    root: null,
    isPreRendered: false,
    _createVersion: 0,
    renderCallback: undefined,
    multiChartPageCount: null,
    multiChartPageIndex: null,
    left: 0,
    top: 0,
    width: null,
    height: null,
    margins: null,
    paddings: null,
    _allowV1SecondAxis: false,
    compatVersion: function(a) {
      return (a || this.options).compatVersion
    },
    _createLogInstanceId: function() {
      return "" + this.constructor + this._createLogChildSuffix()
    },
    _createLogChildSuffix: function() {
      return this.parent ? " (" + (this.smallRowIndex + 1) + "," + (this.smallColIndex + 1) + ")" : ""
    },
    _addChild: function(a) {
      a.parent === this || f.assert("Not a child of this chart.");
      this.children.push(a)
    },
    _preRender: function(a) {
      this._preRenderPhase1(a);
      this._preRenderPhase2(a)
    },
    _preRenderPhase1: function(a) {
      this._createVersion++;
      this.isPreRendered = false;
      i.debug >= 3 && this._log("Prerendering");
      this.children = [];
      this.parent || i.removeTipsyLegends();
      this._processOptions();
      this._checkNoDataI();
      if (!this.parent && !this.data) {
        this._initVisualRoles();
        this._bindVisualRolesPreI();
        this._complexTypeProj = this._createComplexTypeProject();
        this._bindVisualRolesPreII()
      }
      this._initData(a);
      this._checkNoDataII();
      a = this.visualRoles.multiChart.isBound();
      this._initPlots(a);
      this._initAxes(a);
      this._bindAxes(a);
      if (this.parent || !a) {
        this._interpolate(a);
        this._generateTrends(a)
      }
      this._setAxesScales(a)
    },
    _preRenderPhase2: function() {
      this._initChartPanels(this.visualRoles.multiChart.isBound());
      this.isPreRendered = true
    },
    _setSmallLayout: function(a) {
      if (a) {
        var b = this.basePanel;
        this._setProp("left", a) | this._setProp("top", a) && b && f.set(b.position, "left", this.left, "top", this.top);
        if (this._setProp("width", a) | this._setProp("height",
          a))
          if (b) b.size = new M(this.width, this.height);
        if (this._setProp("margins", a) && b) b.margins = new F(this.margins);
        if (this._setProp("paddings", a) && b) b.paddings = new F(this.paddings)
      }
    },
    _setProp: function(a, b) {
      b = b[a];
      if (b != null) {
        this[a] = b;
        return true
      }
    },
    _processOptions: function() {
      var a = this.options;
      if (!this.parent) {
        this.width = a.width;
        this.height = a.height;
        this.margins = a.margins;
        this.paddings = a.paddings
      }
      if (this.compatVersion() <= 1) a.plot2 = this._allowV1SecondAxis && !!a.secondAxis;
      this._processOptionsCore(a);
      this._processExtensionPoints();
      return a
    },
    _processOptionsCore: function(a) {
      if (this.parent) {
        this._ibits = this.parent._ibits;
        this._tooltipOptions = this.parent._tooltipOptions
      } else {
        var b = u.renderer() !== "batik";
        if (b) {
          b = a.interactive;
          if (b == null) b = true
        }
        if (b) {
          var c = i.visual.Interactive;
          b = c.Interactive | c.ShowsInteraction;
          if (this._processTooltipOptions(a)) b |= c.ShowsTooltip;
          if (a.animate && $.support.svg) b |= c.Animatable;
          if (a.selectable) {
            b |= c.Selectable;
            switch (i.parseSelectionMode(a.selectionMode)) {
              case "rubberband":
                b |= c.SelectableByRubberband |
                  c.SelectableByClick;
                break;
              case "focuswindow":
                b |= c.SelectableByFocusWindow;
                break
            }
          }
          if (i.parseClearSelectionMode(a.clearSelectionMode) === "emptyspaceclick") b |= c.Unselectable;
          if (a.hoverable) b |= c.Hoverable;
          if (a.clickable) b |= c.Clickable | c.DoubleClickable
        } else b = 0;
        this._ibits = b
      }
    },
    _tooltipDefaults: {
      gravity: "s",
      delayIn: 200,
      delayOut: 80,
      offset: 2,
      opacity: 0.9,
      html: true,
      fade: true,
      useCorners: false,
      arrowVisible: true,
      followMouse: false,
      format: undefined
    },
    _processTooltipOptions: function(a) {
      var b = this.compatVersion() <=
          1,
        c = a.tooltip,
        d = a.tooltipEnabled;
      if (d == null) {
        if (c) d = c.enabled;
        if (d == null) {
          if (b) d = a.showTooltips;
          if (d == null) d = true
        }
      }
      if (d) {
        c || (c = {});
        b && this._importV1TooltipOptions(c, a);
        f.eachOwn(this._tooltipDefaults, function(e, g) {
          var h = a["tooltip" + f.firstUpperCase(g)];
          if (h !== undefined) c[g] = h;
          else if (c[g] === undefined) c[g] = e
        })
      } else c = {};
      this._tooltipOptions = c;
      return d
    },
    _importV1TooltipOptions: function(a, b) {
      if (b = b.tipsySettings) {
        this.extend(b, "tooltip");
        for (var c in b)
          if (a[c] === undefined) a[c] = b[c];
        if (a.html == null) a.html =
          false
      }
    },
    render: function(a, b, c) {
      var d;
      i.debug > 1 && i.group("CCC RENDER");
      this._suspendSelectionUpdate();
      try {
        this.useTextMeasureCache(function() {
          try {
            if (!this.isPreRendered || b) this._preRender({
              reloadData: c
            });
            else !this.parent && this.isPreRendered && i.removeTipsyLegends();
            this.basePanel.render({
              bypassAnimation: a,
              recreate: b
            })
          } catch (e) {
            if (e instanceof NoDataException) {
              i.debug > 1 && this._log("No data found.");
              this._addErrorPanelMessage("No data found", true)
            } else {
              d = true;
              i.logError(e.message);
              i.debug > 0 && this._addErrorPanelMessage("Error: " +
                e.message, false)
            }
          }
        })
      } finally {
        d || this._resumeSelectionUpdate();
        i.debug > 1 && i.groupEnd()
      }
      return this
    },
    _addErrorPanelMessage: function(a, b) {
      var c = this.options;
      c = (new u.Panel).canvas(c.canvas).width(this.width).height(this.height);
      a = c.anchor("center").add(u.Label).text(a);
      b && this.extend(a, "noDataMessage");
      c.render()
    },
    useTextMeasureCache: function(a, b) {
      var c = this.root;
      c = c._textMeasureCache || (c._textMeasureCache = u.Text.createCache());
      return u.Text.usingCache(c, a, b || this)
    },
    animate: function(a, b) {
      return this.basePanel.animate(a,
        b)
    },
    animatingStart: function() {
      return this.basePanel.animatingStart()
    },
    animatable: function() {
      return this._animatable && this.base()
    },
    isOrientationVertical: function(a) {
      return (a || this.options.orientation) === i.orientation.vertical
    },
    isOrientationHorizontal: function(a) {
      return (a || this.options.orientation) === i.orientation.horizontal
    },
    dispose: function() {
      if (!this._disposed) this._disposed = true
    },
    defaults: {
      width: 400,
      height: 300,
      orientation: "vertical",
      ignoreNulls: true,
      crosstabMode: true,
      isMultiValued: false,
      seriesInRows: false,
      groupedLabelSep: undefined,
      animate: true,
      titlePosition: "top",
      titleAlign: "center",
      legend: false,
      legendPosition: "bottom",
      v1StyleTooltipFormat: function(a, b, c, d) {
        return a + ", " + b + ":  " + this.chart.options.valueFormat(c) + (d && d.percent ? " (" + d.percent.label + ")" : "")
      },
      valueFormat: f.scope(function() {
        var a = u.Format.number().fractionDigits(0, 2);
        return function(b) {
          return a.format(b)
        }
      }),
      percentValueFormat: f.scope(function() {
        var a = u.Format.number().fractionDigits(0, 1);
        return function(b) {
          return a.format(b * 100) + "%"
        }
      }),
      clickable: false,
      doubleClickMaxDelay: 300,
      hoverable: false,
      selectable: false,
      selectionMode: "rubberband",
      ctrlSelectMode: true,
      clearSelectionMode: "emptySpaceClick",
      compatVersion: Infinity
    }
  });
  i.BaseChart.add({
    visualRoles: null,
    visualRoleList: null,
    _serRole: null,
    _dataPartRole: null,
    _measureVisualRoles: null,
    visualRole: function(a) {
      var b = f.getOwn(this.visualRoles, a);
      if (!b) throw f.error.operationInvalid("roleName", "There is no visual role with name '{0}'.", [a]);
      return b
    },
    measureVisualRoles: function() {
      return this._measureVisualRoles
    },
    measureDimensionsNames: function() {
      return f.query(this._measureVisualRoles).select(function(a) {
        return a.firstDimensionName()
      }).where(f.notNully).array()
    },
    _constructVisualRoles: function() {
      var a = this.parent;
      if (a) {
        this.visualRoles = a.visualRoles;
        this.visualRoleList = a.visualRoleList;
        this._measureVisualRoles = a._measureVisualRoles;
        ["_multiChartRole", "_serRole", "_colorRole", "_dataPartRole"].forEach(function(b) {
          var c = a[b];
          if (c) this[b] = c
        }, this)
      } else {
        this.visualRoles = {};
        this.visualRoleList = [];
        this._measureVisualRoles = []
      }
    },
    _hasDataPartRole: f.fun.constant(false),
    _getSeriesRoleSpec: f.fun.constant(null),
    _getColorRoleSpec: f.fun.constant(null),
    _addVisualRole: function(a, b) {
      b = f.set(b, "index", this.visualRoleList.length);
      b = new i.visual.Role(a, b);
      this.visualRoleList.push(b);
      this.visualRoles[a] = b;
      b.isMeasure && this._measureVisualRoles.push(b);
      return b
    },
    _initVisualRoles: function() {
      this._multiChartRole = this._addVisualRole("multiChart", {
        defaultDimension: "multiChart*",
        requireIsDiscrete: true
      });
      if (this._hasDataPartRole()) this._dataPartRole =
        this._addVisualRole("dataPart", {
          defaultDimension: "dataPart",
          requireSingleDimension: true,
          requireIsDiscrete: true,
          dimensionDefaults: {
            isHidden: true,
            comparer: f.compare
          }
        });
      var a = this._getSeriesRoleSpec();
      if (a) this._serRole = this._addVisualRole("series", a);
      if (a = this._getColorRoleSpec()) this._colorRole = this._addVisualRole("color", a)
    },
    _assertUnboundRoleIsOptional: function(a) {
      if (a.isRequired) throw f.error.operationInvalid("Chart type requires unassigned role '{0}'.", [a.name]);
    },
    _bindVisualRolesPreI: function() {
      f.eachOwn(this.visualRoles,
        function(g) {
          g.setIsReversed(false)
        });
      var a = [],
        b = this.options,
        c = b.visualRoles;
      this.visualRoleList.forEach(function(g) {
        g = g.name;
        var h = b[g + "Role"];
        if (h !== undefined) {
          if (!c) c = b.visualRoles = {};
          if (c[g] === undefined) c[g] = h
        }
      });
      var d;
      if (c) {
        d = {};
        var e = f.query(f.keys(c)).select(this.visualRole, this).array();
        e.sort(function(g, h) {
          return g.index - h.index
        });
        e.forEach(function(g) {
          var h = g.name,
            j = c[h],
            l, m;
          if (f.object.is(j)) {
            f.nullyTo(j.isReversed, false) && g.setIsReversed(true);
            if ((m = j.from) && m !== h) {
              h = this.visualRoles[m] ||
                f.fail.operationInvalid("Source role '{0}' is not supported by the chart type.", [m]);
              g.setSourceRole(h);
              a.push(g)
            } else l = j.dimensions
          } else l = j;
          if (l !== undefined) {
            l || this._assertUnboundRoleIsOptional(g);
            l = i.data.GroupingSpec.parse(l);
            g.preBind(l);
            l.dimensions().each(function(k) {
              if (f.hasOwn(d, k.name)) delete d[k.name];
              else d[k.name] = g
            })
          }
        }, this)
      }
      this._sourcedRoles = a;
      this._dimsBoundToSingleRole = d
    },
    _bindVisualRolesPreII: function() {
      var a = this._dimsBoundToSingleRole;
      if (a) {
        delete this._dimsBoundToSingleRole;
        f.eachOwn(a, this._setRoleBoundDimensionDefaults, this)
      }
      var b = this._sourcedRoles;
      delete this._sourcedRoles;
      f.query(this.visualRoleList).where(function(c) {
        return c.defaultSourceRoleName && !c.sourceRole && !c.isPreBound()
      }).each(function(c) {
        var d = this.visualRoles[c.defaultSourceRoleName];
        if (d) {
          c.setSourceRole(d, true);
          b.push(c)
        }
      }, this);
      b.forEach(function(c) {
        var d = c.sourceRole;
        d.isReversed && c.setIsReversed(!c.isReversed);
        !c.defaultDimensionName && d.isPreBound() && c.preBind(d.preBoundGrouping())
      })
    },
    _setRoleBoundDimensionDefaults: function(a,
                                             b) {
      this._complexTypeProj.setDimDefaults(b, a.dimensionDefaults)
    },
    _bindVisualRolesPostI: function() {
      function a(p, q) {
        f.array.lazy(n, p).push(q)
      }

      function b(p) {
        return k.hasDim(p)
      }

      function c(p, q) {
        f.array.is(q) ? q.forEach(function(s) {
          a(s, p)
        }) : a(q, p);
        p.setSourceRole(null);
        p.preBind(i.data.GroupingSpec.parse(q))
      }

      function d(p, q) {
        if (q.length) p.requireSingleDimension ? c(p, q[0]) : c(p, q)
      }

      function e(p, q) {
        k.setDim(q, {
          isHidden: true
        });
        c(p, q)
      }

      function g(p) {
        m._assertUnboundRoleIsOptional(p);
        p.bind(null);
        p.setSourceRole(null)
      }

      function h(p) {
        p.preBoundGrouping().dimensionNames().forEach(a)
      }

      function j(p) {
        if (p.sourceRole && !p.isDefaultSourceRole) o.push(p);
        else {
          var q = p.defaultDimensionName;
          if (q) {
            var s = q.match(/^(.*?)(\*)?$/) || f.fail.argumentInvalid("defaultDimensionName");
            q = s[1];
            if (s[2]) {
              if (s = k.groupDimensionsNames(q)) {
                d(p, s);
                return
              }
            } else if (b(q)) {
              c(p, q);
              return
            }
            if (p.autoCreateDimension) e(p, q);
            else p.sourceRole ? o.push(p) : g(p)
          } else p.sourceRole ? o.push(p) : g(p)
        }
      }

      function l(p) {
        var q = p.sourceRole;
        q.isPreBound() ? p.preBind(q.preBoundGrouping()) :
          g(p)
      }
      var m = this,
        k = m._complexTypeProj,
        n = {},
        o = [];
      f.query(m.visualRoleList).where(function(p) {
        return p.isPreBound()
      }).each(h);
      f.query(m.visualRoleList).where(function(p) {
        return !p.isPreBound()
      }).each(j);
      o.forEach(l);
      f.query(f.ownKeys(n)).where(function(p) {
        return n[p].length === 1
      }).each(function(p) {
        m._setRoleBoundDimensionDefaults(n[p][0], p)
      })
    },
    _bindVisualRolesPostII: function(a) {
      f.query(this.visualRoleList).where(function(b) {
        return b.isPreBound()
      }).each(function(b) {
        b.postBind(a)
      })
    },
    _logVisualRoles: function() {
      var a =
          f.ownKeys(this.visualRoles),
        b = Math.max(10, f.query(a).select(function(d) {
          return d.length
        }).max());
      a = f.string.padRight("VisualRole", b) + " < Dimension(s)";
      var c = ["VISUAL ROLES MAP SUMMARY", i.logSeparator, a, f.string.padRight("", b + 1, "-") + "+--------------"];
      f.eachOwn(this.visualRoles, function(d, e) {
        c.push(f.string.padRight(e, b) + " | " + (d.grouping || "-"))
      });
      c.push("");
      this._log(c.join("\n"))
    },
    _getDataPartDimName: function() {
      var a = this._dataPartRole;
      if (a) {
        if (a.isBound()) return a.firstDimensionName();
        var b = a.preBoundGrouping();
        if (b) return b.firstDimensionName();
        return a.defaultDimensionName
      }
    }
  });
  i.BaseChart.add({
    dataEngine: null,
    data: null,
    _partData: null,
    _visibleDataCache: null,
    resultset: [],
    metadata: [],
    _constructData: function(a) {
      if (this.parent) this.dataEngine = this.data = a.data || f.fail.argumentRequired("options.data")
    },
    _checkNoDataI: function() {
      if (!this.parent && !this.allowNoData && this.resultset.length === 0) throw new NoDataException;
    },
    _checkNoDataII: function() {
      if (!this.parent && !this.allowNoData && (!this.data || !this.data.count())) {
        this.data =
          null;
        throw new NoDataException;
      }
    },
    _initData: function(a) {
      if (!this.parent) {
        var b = this.data;
        if (b)
          if (f.get(a, "reloadData", true)) this._onReloadData();
          else {
            b.clearVirtuals();
            b.disposeChildren()
          } else this._onLoadData()
      }
      delete this._partData;
      delete this._visibleDataCache;
      i.debug >= 3 && this._log(this.data.getInfo())
    },
    _onLoadData: function() {
      var a = this.data,
        b = this._translation;
      !a && !b || f.assert("Invalid state.");
      a = this.options;
      var c = this._getDataPartDimName(),
        d = this._complexTypeProj || f.assert("Invalid state."),
        e = this._createTranslationOptions(c);
      b = this._translation = this._createTranslation(e);
      if (i.debug >= 3) {
        this._log(b.logSource());
        this._log(b.logTranslatorType())
      }
      b.configureType();
      c && !d.isReadOrCalc(c) && this._addDefaultDataPartCalculation(c);
      i.debug >= 3 && this._log(b.logVItem());
      this._bindVisualRolesPostI();
      c = new i.data.ComplexType;
      d.configureComplexType(c, e);
      this._bindVisualRolesPostII(c);
      i.debug >= 10 && this._log(c.describe());
      i.debug >= 3 && this._logVisualRoles();
      a = this.dataEngine = this.data = new i.data.Data({
        type: c,
        labelSep: a.groupedLabelSep,
        keySep: e.separator
      });
      d = {
        where: this._getLoadFilter(),
        isNull: this._getIsNullDatum()
      };
      b = b.execute(a);
      a.load(b, d)
    },
    _onReloadData: function() {
      var a = this.data,
        b = this._translation;
      a && b || f.assert("Invalid state.");
      b.setSource(this.resultset);
      i.debug >= 3 && this._log(b.logSource());
      var c = {
        where: this._getLoadFilter(),
        isNull: this._getIsNullDatum()
      };
      b = b.execute(a);
      a.load(b, c)
    },
    _createComplexTypeProject: function() {
      var a = this.options,
        b = new i.data.ComplexTypeProject(a.dimensionGroups),
        c = a.dimensions;
      for (var d in c) b.setDim(d, c[d]);
      if (c = this._getDataPartDimName()) {
        b.setDim(c);
        this._addPlot2SeriesDataPartCalculation(b, c)
      }(a = a.calculations) && a.forEach(function(e) {
        b.setCalc(e)
      });
      return b
    },
    _getLoadFilter: function() {
      if (this.options.ignoreNulls) {
        var a = this;
        return function(b) {
          (b = b.isNull) && i.debug >= 4 && a._info("Datum excluded.");
          return !b
        }
      }
    },
    _getIsNullDatum: function() {
      var a = this.measureDimensionsNames(),
        b = a.length;
      if (b) return function(c) {
        c = c.atoms;
        for (var d = 0; d < b; d++)
          if (c[a[d]].value != null) return false;
        return true
      }
    },
    _createTranslation: function(a) {
      return new(this._getTranslationClass(a))(this, this._complexTypeProj, this.resultset, this.metadata, a)
    },
    _getTranslationClass: function(a) {
      return a.crosstabMode ? i.data.CrosstabTranslationOper : i.data.RelationalTranslationOper
    },
    _createTranslationOptions: function(a) {
      var b = this.options,
        c = b.dataOptions || {},
        d = b.dataSeparator;
      if (d === undefined) d = c.separator;
      d || (d = "~");
      var e = b.dataMeasuresInColumns;
      if (e === undefined) e = c.measuresInColumns;
      var g = b.dataCategoriesCount;
      if (g === undefined) g = c.categoriesCount;
      var h = b.dataIgnoreMetadataLabels;
      if (h === undefined) h = c.ignoreMetadataLabels;
      var j = b.plot2,
        l = b.valueFormat,
        m;
      if (l && l !== this.defaults.valueFormat) m = function(o) {
        return o != null ? l(o) : ""
      };
      var k, n;
      if (j) {
        if (this._allowV1SecondAxis && this.compatVersion() <= 1) n = b.secondAxisIdx;
        else {
          k = this._serRole != null && b.plot2Series && f.array.as(b.plot2Series);
          if (!k || !k.length) {
            k = null;
            n = b.plot2SeriesIndexes
          }
        }
        k || (n = i.parseDistinctIndexArray(n, -Infinity) || -1)
      }
      return {
        compatVersion: this.compatVersion(),
        plot2DataSeriesIndexes: n,
        seriesInRows: b.seriesInRows,
        crosstabMode: b.crosstabMode,
        isMultiValued: b.isMultiValued,
        dataPartDimName: a,
        dimensionGroups: b.dimensionGroups,
        dimensions: b.dimensions,
        readers: b.readers,
        measuresIndexes: b.measuresIndexes,
        multiChartIndexes: b.multiChartIndexes,
        separator: d,
        measuresInColumns: e,
        categoriesCount: g,
        measuresIndex: c.measuresIndex || c.measuresIdx,
        measuresCount: c.measuresCount || c.numMeasures,
        isCategoryTimeSeries: b.timeSeries,
        timeSeriesFormat: b.timeSeriesFormat,
        valueNumberFormatter: m,
        ignoreMetadataLabels: h
      }
    },
    _addPlot2SeriesDataPartCalculation: function(a, b) {
      if (!(this.compatVersion() <= 1)) {
        var c = this.options,
          d = this._serRole;
        if ((c = d != null && c.plot2 && c.plot2Series && f.array.as(c.plot2Series)) && c.length) {
          var e = false,
            g = f.query(c).uniqueIndex(),
            h, j, l, m;
          a.setCalc({
            names: b,
            calculation: function(k, n) {
              if (!e) {
                if (d.isBound()) {
                  h = d.grouping.dimensionNames();
                  j = k.owner.dimensions(b)
                }
                e = true
              }
              if (j) {
                k = i.data.Complex.compositeKey(k, h);
                n[b] = f.hasOwnProp.call(g, k) ? m || (m = j.intern("1")) : l || (l = j.intern("0"))
              }
            }
          })
        }
      }
    },
    _addDefaultDataPartCalculation: function(a) {
      var b, c;
      this._complexTypeProj.setCalc({
        names: a,
        calculation: function(d, e) {
          b || (b = d.owner.dimensions(a));
          e[a] = c || (c = b.intern("0"))
        }
      })
    },
    partData: function(a) {
      var b = this._dataPartRole;
      if (!this._partData) {
        if (!b || !b.grouping) return this._partData = this.data;
        this._partData = b.flatten(this.data)
      }
      if (!a || !b || !b.grouping) return this._partData;
      b = b.firstDimensionName();
      if (f.array.is(a)) {
        if (a.length > 1) return this._partData.where([f.set({}, b, a)]);
        a = a[0]
      }
      var c = this._partData._childrenByKey[a +
        ""];
      if (!c) {
        c = {
          v: a
        };
        if (a === "trend")
          if (a = this._firstTrendAtomProto) c.f = a.f;
        c = new i.data.Data({
          parent: this._partData,
          atoms: f.set({}, b, c),
          dimNames: [b],
          datums: []
        })
      }
      return c
    },
    visibleData: function(a, b) {
      var c = f.get(b, "ignoreNulls", true),
        d = f.get(b, "inverted", false);
      if (c && this.options.ignoreNulls) c = false;
      var e = f.lazy(this, "_visibleDataCache");
      d = d + "|" + c + "|" + a;
      var g = e[d];
      if (!g) {
        b = b ? Object.create(b) : {};
        b.ignoreNulls = c;
        g = e[d] = this._createVisibleData(a, b)
      }
      return g
    },
    _createVisibleData: function(a, b) {
      a = this.partData(a);
      if (!a) return null;
      b = f.get(b, "ignoreNulls");
      var c = this._serRole;
      return c && c.grouping ? c.flatten(a, {
        visible: true,
        isNull: b ? false : null
      }) : a
    },
    _generateTrends: function() {
      this._dataPartRole && f.query(f.own(this.axes)).selectMany(f.propGet("dataCells")).where(f.propGet("trend")).distinct(function(a) {
        return a.role.name + "|" + (a.dataPartValue || "")
      }).each(this._generateTrendsDataCell, this)
    },
    _interpolate: function() {
      f.query(f.own(this.axes)).selectMany(f.propGet("dataCells")).where(function(a) {
        a = a.nullInterpolationMode;
        return !!a && a !== "none"
      }).distinct(function(a) {
        return a.role.name + "|" + (a.dataPartValue || "")
      }).each(this._interpolateDataCell, this)
    },
    _interpolateDataCell: function() {},
    _generateTrendsDataCell: function() {},
    setData: function(a, b) {
      this.setResultset(a.resultset);
      this.setMetadata(a.metadata);
      $.extend(this.options, b);
      return this
    },
    setResultset: function(a) {
      !this.parent || f.fail.operationInvalid("Can only set resultset on root chart.");
      this.resultset = a;
      a.length || this._log("Warning: Resultset is empty");
      return this
    },
    setMetadata: function(a) {
      !this.parent || f.fail.operationInvalid("Can only set resultset on root chart.");
      this.metadata = a;
      a.length || this._log("Warning: Metadata is empty");
      return this
    }
  });
  i.BaseChart.add({
    _initPlots: function(a) {
      this.plotPanelList = null;
      if (this.parent) {
        a = this.root;
        this.plots = a.plots;
        this.plotList = a.plotList;
        this.plotsByType = a.plotsByType
      } else {
        this.plots = {};
        this.plotList = [];
        this.plotsByType = {};
        this._initPlotsCore(a)
      }
    },
    _initPlotsCore: function() {},
    _addPlot: function(a) {
      var b = this.plotsByType,
        c = this.plots,
        d = a.type,
        e = a.index,
        g = a.name,
        h = a.id;
      if (g && f.hasOwn(c, g)) throw f.error.operationInvalid("Plot name '{0}' already taken.", [g]);
      if (f.hasOwn(c, h)) throw f.error.operationInvalid("Plot id '{0}' already taken.", [h]);
      b = f.array.lazy(b, d);
      if (f.hasOwn(b, e)) throw f.error.operationInvalid("Plot index '{0}' of type '{1}' already taken.", [e, d]);
      a.globalIndex = this.plotList.length;
      b[e] = a;
      this.plotList.push(a);
      c[h] = a;
      if (g) c[g] = a
    },
    _collectPlotAxesDataCells: function(a, b) {
      var c = [];
      a.collectDataCells(c);
      c.length &&
      f.query(c).where(function(d) {
        return d.isBound()
      }).each(function(d) {
        var e = f.array.lazy(b, d.axisType);
        f.array.lazy(e, d.axisIndex).push(d)
      })
    },
    _addPlotPanel: function(a) {
      f.lazy(this, "plotPanels")[a.plot.id] = a;
      f.array.lazy(this, "plotPanelList").push(a)
    },
    _createPlotPanels: function() {
      throw f.error.notImplemented();
    }
  });
  i.BaseChart.add({
    colors: null,
    axes: null,
    axesList: null,
    axesByType: null,
    _axisClassByType: {
      color: i.visual.ColorAxis,
      size: i.visual.SizeAxis,
      base: da,
      ortho: da
    },
    _axisCreateWhere: {
      color: 1,
      size: 2,
      base: 3,
      ortho: 3
    },
    _axisCreationOrder: ["color", "size", "base", "ortho"],
    _axisCreateIfUnbound: {},
    _initAxes: function(a) {
      this.axes = {};
      this.axesList = [];
      this.axesByType = {};
      delete this._rolesColorScale;
      var b;
      if (this.parent) b = this.root._dataCellsByAxisTypeThenIndex;
      else {
        b = {};
        this.plotList.forEach(function(d) {
          this._collectPlotAxesDataCells(d, b)
        }, this);
        this._fixTrendsLabel(b)
      }
      this._dataCellsByAxisTypeThenIndex = b;
      var c = 0;
      this.parent || (c |= 1);
      if (this.parent || !a) c |= 2;
      this._axisCreateHere = c;
      this._axisCreationOrder.forEach(function(d) {
        if ((this._axisCreateWhere[d] &
          c) !== 0) {
          var e, g = b[d];
          if (g)(e = this._axisClassByType[d]) && g.forEach(function(h, j) {
            new e(this, d, j)
          }, this);
          else if (this._axisCreateIfUnbound[d])(e = this._axisClassByType[d]) && new e(this, d, 0)
        }
      }, this);
      this.parent && this.root.axesList.forEach(function(d) {
        f.hasOwn(this.axes, d.id) || this._addAxis(d)
      }, this)
    },
    _fixTrendsLabel: function(a) {
      if (this._getDataPartDimName()) {
        var b = f.query(f.ownKeys(a)).selectMany(function(d) {
          return a[d]
        }).selectMany().first(function(d) {
          return !!d.trend
        });
        if (b) {
          var c = i.trends.get(b.trend.type).dataPartAtom;
          b = b.trend.label;
          if (b === undefined) b = c.f;
          this._firstTrendAtomProto = {
            v: c.v,
            f: b
          }
        } else delete this._firstTrendAtomProto
      }
    },
    _addAxis: function(a) {
      this.axes[a.id] = a;
      if (a.chart === this) a.axisIndex = this.axesList.length;
      this.axesList.push(a);
      var b = f.array.lazy(this.axesByType, a.type),
        c = b.count || 0;
      a.typeIndex = c;
      b[a.index] = a;
      if (!c) b.first = a;
      b.count = c + 1;
      a.type === "color" && a.isBound() && this._onColorAxisScaleSet(a);
      return this
    },
    _getAxis: function(a, b) {
      if ((a = this.axesByType[a]) && b != null && +b >= 0) return a[b]
    },
    _bindAxes: function() {
      var a =
        this._axisCreateHere;
      f.eachOwn(this._dataCellsByAxisTypeThenIndex, function(b, c) {
        this._axisCreateWhere[c] & a && b.forEach(function(d, e) {
          e = this.axes[i.buildIndexedId(c, e)];
          e.isBound() || e.bind(d)
        }, this)
      }, this)
    },
    _setAxesScales: function() {
      if (!this.parent) {
        var a = this.axesByType.color;
        a && a.forEach(function(b) {
          if (b.isBound()) {
            this._createColorAxisScale(b);
            this._onColorAxisScaleSet(b)
          }
        }, this)
      }
    },
    _createAxisScale: function(a) {
      var b = this._createScaleByAxis(a);
      b.isNull && i.debug >= 3 && this._log(f.format("{0} scale for axis '{1}'- no data", [a.scaleType, a.id]));
      return a.setScale(b).scale
    },
    _createScaleByAxis: function(a) {
      return this["_create" + f.firstUpperCase(a.scaleType) + "ScaleByAxis"].call(this, a)
    },
    _createDiscreteScaleByAxis: function(a) {
      var b = this.visibleData(a.dataCells.map(function(c) {
        return c.dataPartValue
      }), {
        ignoreNulls: false
      });
      b = b && a.role.flatten(b);
      a = new u.Scale.ordinal;
      if (!b || !b.count()) a.isNull = true;
      else {
        b = b.children().select(function(c) {
          return f.nullyTo(c.value, "")
        }).array();
        a.domain(b)
      }
      return a
    },
    _createTimeSeriesScaleByAxis: function(a) {
      a =
        this._getContinuousVisibleExtent(a);
      var b = new u.Scale.linear;
      if (a) {
        var c = a.min,
          d = a.max;
        if (d - c === 0) d = new Date(d.getTime() + 36E5);
        b.domain(c, d);
        b.minLocked = a.minLocked;
        b.maxLocked = a.maxLocked
      } else b.isNull = true;
      return b
    },
    _createNumericScaleByAxis: function(a) {
      var b = this._getContinuousVisibleExtentConstrained(a),
        c = new u.Scale.linear;
      if (b) {
        var d = b.min,
          e = b.max,
          g = function() {
            var h = e - d;
            if (h && Math.abs(h) <= 1.0E-10) {
              d = (d + e) / 2;
              d = e = +d.toFixed(10);
              h = 0
            }
            if (h) {
              if (h < 0)
                if (!b.maxLocked || b.minLocked) e = Math.abs(d) > 1.0E-10 ?
                  d * 1.01 : +0.1;
                else d = Math.abs(e) > 1.0E-10 ? e * 0.99 : -0.1
            } else {
              b.minLocked || (d = Math.abs(d) > 1.0E-10 ? d * 0.99 : -0.1);
              if (!b.maxLocked || b.minLocked) e = Math.abs(e) > 1.0E-10 ? e * 1.01 : +0.1
            }
          };
        g();
        if (a.option("OriginIsZero"))
          if (d === 0) b.minLocked = true;
          else if (e === 0) b.maxLocked = true;
          else if (d * e > 0)
            if (d > 0) {
              if (!b.minLocked) {
                b.minLocked = true;
                d = 0
              }
            } else if (!b.maxLocked) {
              b.maxLocked = true;
              e = 0
            }
        g();
        c.domain(d, e);
        c.minLocked = b.minLocked;
        c.maxLocked = b.maxLocked
      } else c.isNull = true;
      return c
    },
    _warnSingleContinuousValueRole: function(a) {
      a.grouping.isSingleDimension ||
      this._warn("A linear scale can only be obtained for a single dimension role.");
      a.grouping.isDiscrete() && this._warn(f.format("The single dimension of role '{0}' should be continuous.", [a.name]))
    },
    _getContinuousVisibleExtentConstrained: function(a, b, c) {
      var d = false,
        e = false;
      if (b == null) {
        b = a.option("FixedMin");
        d = b != null
      }
      if (c == null) {
        c = a.option("FixedMax");
        e = c != null
      }
      if (b == null || c == null) {
        a = this._getContinuousVisibleExtent(a);
        if (!a) return null;
        if (b == null) b = a.min;
        if (c == null) c = a.max
      }
      return {
        min: b,
        max: c,
        minLocked: d,
        maxLocked: e
      }
    },
    _getContinuousVisibleExtent: function(a) {
      var b = a.dataCells;
      if (b.length === 1) return this._getContinuousVisibleCellExtent(a, b[0]);
      return f.query(b).select(function(c) {
        return this._getContinuousVisibleCellExtent(a, c)
      }, this).reduce(i.unionExtents, null)
    },
    _getContinuousVisibleCellExtent: function(a, b) {
      var c = b.role;
      this._warnSingleContinuousValueRole(c);
      if (c.name === "series") throw f.error.notImplemented();
      a = a.scaleUsesAbs();
      if (b = (b = this.visibleData(b.dataPartValue)) && b.dimensions(c.firstDimensionName()).extent({
        abs: a
      })) {
        c =
          b.min.value;
        b = b.max.value;
        return {
          min: a ? Math.abs(c) : c,
          max: a ? Math.abs(b) : b
        }
      }
    },
    _createColorAxisScale: function(a) {
      var b;
      if (a.dataCells) b = a.scaleType === "discrete" ? this._createDiscreteColorAxisScale(a) : this._createContinuousColorAxisScale(a);
      return a.setScale.apply(a, b)
    },
    _createDiscreteColorAxisScale: function(a) {
      var b = f.query(a.dataCells).selectMany(function(c) {
        return c.domainItemValues()
      }).array();
      a.domainValues = b;
      return [a.scheme()(b), true]
    },
    _createContinuousColorAxisScale: function(a) {
      if (a.dataCells.length ===
        1) {
        this._warnSingleContinuousValueRole(a.role);
        var b = this.root.visibleData(a.dataCell.dataPartValue),
          c = a.option("NormByCategory");
        b = {
          type: a.option("ScaleType"),
          colors: a.option("Colors")().range(),
          colorDomain: a.option("Domain"),
          colorMin: a.option("Min"),
          colorMax: a.option("Max"),
          colorMissing: a.option("Missing"),
          data: b,
          colorDimension: a.role.firstDimensionName(),
          normPerBaseCategory: c
        };
        if (!c) return [ya(b)];
        a.scalesByCateg = xa(b)
      }
      return []
    },
    _onColorAxisScaleSet: function(a) {
      switch (a.index) {
        case 0:
          this.colors =
            a.scheme();
          break;
        case 1:
          if (this._allowV1SecondAxis) this.secondAxisColor = a.scheme();
          break
      }
    },
    _getRoleColorScale: function(a) {
      return f.lazy(f.lazy(this, "_rolesColorScale"), a, this._createRoleColorScale, this)
    },
    _createRoleColorScale: function(a) {
      function b(g) {
        var h = "" + g;
        f.hasOwnProp.call(e, h) || (e[h] = d(g))
      }
      var c, d, e = {};
      this.axesByType.color.forEach(function(g) {
        var h = g.role;
        if ((h.name === a || h.sourceRole && h.sourceRole.name === a) && g.scale && (g.index === 0 || g.option.isSpecified("Colors") || g.option.isSpecified("Map"))) {
          d =
            g.scale;
          c || (c = d);
          g.domainValues.forEach(b)
        }
      }, this);
      if (!c) return i.createColorScheme()();
      d = function(g) {
        var h = "" + g;
        if (f.hasOwnProp.call(e, h)) return e[h];
        g = c(g);
        return e[h] = g
      };
      f.copy(d, c);
      return d
    },
    _onLaidOut: function() {}
  });
  i.BaseChart.add({
    basePanel: null,
    titlePanel: null,
    legendPanel: null,
    _multiChartPanel: null,
    _initChartPanels: function(a) {
      this._initBasePanel();
      this._initTitlePanel();
      var b = a && !this.parent,
        c = this._initLegendPanel();
      b && this._initMultiChartPanel();
      c && this._initLegendScenes(c);
      if (!b) {
        b = this.options;
        this._preRenderContent({
          margins: a ? b.smallContentMargins : b.contentMargins,
          paddings: a ? b.smallContentPaddings : b.contentPaddings,
          clickAction: b.clickAction,
          doubleClickAction: b.doubleClickAction
        })
      }
    },
    _preRenderContent: function() {},
    _initBasePanel: function() {
      var a = this.parent;
      this.basePanel = new i.BasePanel(this, a && a._multiChartPanel, {
        margins: this.margins,
        paddings: this.paddings,
        size: {
          width: this.width,
          height: this.height
        }
      })
    },
    _initTitlePanel: function() {
      var a = this,
        b = a.options,
        c = b.title;
      if (!f.empty(c)) this.titlePanel =
        new i.TitlePanel(a, a.basePanel, {
          title: c,
          font: b.titleFont,
          anchor: b.titlePosition,
          align: b.titleAlign,
          alignTo: b.titleAlignTo,
          offset: b.titleOffset,
          keepInBounds: b.titleKeepInBounds,
          margins: b.titleMargins,
          paddings: b.titlePaddings,
          titleSize: b.titleSize,
          titleSizeMax: b.titleSizeMax
        })
    },
    _initLegendPanel: function() {
      var a = this.options;
      if (a.legend) {
        var b = new i.visual.Legend(this, "legend", 0);
        return this.legendPanel = new i.LegendPanel(this, this.basePanel, {
          anchor: b.option("Position"),
          align: b.option("Align"),
          alignTo: a.legendAlignTo,
          offset: a.legendOffset,
          keepInBounds: a.legendKeepInBounds,
          size: b.option("Size"),
          sizeMax: b.option("SizeMax"),
          margins: b.option("Margins"),
          paddings: b.option("Paddings"),
          font: b.option("Font"),
          scenes: f.getPath(a, "legend.scenes"),
          textMargin: a.legendTextMargin,
          itemPadding: a.legendItemPadding,
          markerSize: a.legendMarkerSize
        })
      }
    },
    _getLegendBulletRootScene: function() {
      return this.legendPanel && this.legendPanel._getBulletRootScene()
    },
    _initMultiChartPanel: function() {
      var a = this.basePanel,
        b = this.options;
      this._multiChartPanel =
        new i.MultiChartPanel(this, a, {
          margins: b.contentMargins,
          paddings: b.contentPaddings
        });
      this._multiChartPanel.createSmallCharts();
      a._children.unshift(a._children.pop())
    },
    _coordinateSmallChartsLayout: function() {},
    _initLegendScenes: function(a) {
      function b(h, j) {
        var l = j.option("LegendClickMode") === "togglevisible",
          m = h.domainData();
        d || (d = a._getBulletRootScene());
        var k;
        if (l)
          if ((l = m.atoms[g]) && l.value === "trend") k = "none";
        var n = d.createGroup({
          source: m,
          colorAxis: j,
          clickMode: k,
          extensionPrefix: i.buildIndexedId("",
            e++)
        });
        h.legendBulletGroupScene = n;
        h.domainItemDatas().each(function(o) {
          var p = n.createItem({
            source: o
          });
          o = h.domainItemDataValue(o);
          p.color = j.scale(o)
        })
      }
      var c = this.axesByType.color;
      if (c) {
        var d, e = 0,
          g = this._getDataPartDimName();
        f.query(c).where(function(h) {
          return h.option("LegendVisible")
        }).each(function(h) {
          h.dataCells && h.dataCells.forEach(function(j) {
            j.role.isDiscrete() && b(j, h)
          })
        })
      }
    }
  });
  i.BaseChart.add({
    _updateSelectionSuspendCount: 0,
    _lastSelectedDatums: null,
    clearSelections: function() {
      this.data.owner.clearSelected() &&
      this.updateSelections();
      return this
    },
    _updatingSelections: function(a, b) {
      this._suspendSelectionUpdate();
      try {
        a.call(b || this)
      } finally {
        this._resumeSelectionUpdate()
      }
    },
    _suspendSelectionUpdate: function() {
      if (this === this.root) this._updateSelectionSuspendCount++;
      else this.root._suspendSelectionUpdate()
    },
    _resumeSelectionUpdate: function() {
      if (this === this.root) {
        if (this._updateSelectionSuspendCount > 0) --this._updateSelectionSuspendCount || this.updateSelections()
      } else this.root._resumeSelectionUpdate()
    },
    updateSelections: function(a) {
      if (this ===
        this.root) {
        if (this._inUpdateSelections || this._updateSelectionSuspendCount) return this;
        var b = this._calcSelectedChangedDatums();
        if (!b) return this;
        i.removeTipsyLegends();
        this._inUpdateSelections = true;
        try {
          var c = this.options.selectionChangedAction;
          if (c) {
            var d = this.data.selectedDatums(),
              e = b.values();
            c.call(this.basePanel.context(), d, e)
          }
          f.get(a, "render", true) && this.useTextMeasureCache(function() {
            this.basePanel.renderInteractive()
          }, this)
        } finally {
          this._inUpdateSelections = false
        }
      } else this.root.updateSelections();
      return this
    },
    _calcSelectedChangedDatums: function() {
      if (this.data) {
        var a, b = this.data.selectedDatumMap();
        if (a = this._lastSelectedDatums) {
          a = a.symmetricDifference(b);
          if (!a.count) return
        } else {
          if (!b.count) return;
          a = b.clone()
        }
        this._lastSelectedDatums = b;
        return a
      }
    },
    _onUserSelection: function(a) {
      if (!a || !a.length) return a;
      if (this === this.root) {
        var b = this.options.userSelectionAction;
        return b ? b.call(this.basePanel.context(), a) || a : a
      }
      return this.root._onUserSelection(a)
    }
  });
  i.BaseChart.add({
    _processExtensionPoints: function() {
      var a;
      if (this.parent) a = this.parent._components;
      else {
        var b = this.options.extensionPoints;
        a = {};
        if (b)
          for (var c in b) {
            var d, e;
            e = c.indexOf("_");
            if (e > 0) {
              d = c.substring(0, e);
              e = c.substr(e + 1);
              if (d && e)(f.getOwn(a, d) || (a[d] = new f.OrderedMap)).add(e, b[c])
            }
          }
      }
      this._components = a
    },
    extend: function(a, b, c) {
      f.array.is(b) ? b.forEach(function(d) {
        this._extendCore(a, d, c)
      }, this) : this._extendCore(a, b, c)
    },
    _extendCore: function(a, b, c) {
      if (a) {
        var d = f.getOwn(this._components, b);
        if (d) {
          if (a.borderPanel) a = a.borderPanel;
          var e = i.debug >= 3 ? [] :
              null,
            g = f.get(c, "constOnly", false),
            h = a.wrap,
            j = {
              tag: i.extensionTag
            },
            l = a instanceof O;
          d.forEach(function(m, k) {
            if (a.isLocked && a.isLocked(k)) e && e.push(k + ": locked extension point!");
            else if (a.isIntercepted && a.isIntercepted(k)) e && e.push(k + ":" + i.stringify(m) + " (controlled)");
            else {
              e && e.push(k + ": " + i.stringify(m));
              if (m != null) {
                var n = typeof m;
                if (n === "object") {
                  if (k === "svg" || k === "css")
                    if (n = a.propertyValue(k)) m = f.copy(n, m)
                } else if (l && (h || g) && n === "function") {
                  if (g) return;
                  if (k !== "add") m = h.call(a, m, k)
                }
              }
              if (typeof a[k] ===
                "function") k != "add" && a.intercept ? a.intercept(k, m, j) : a[k](m);
              else a[k] = m
            }
          });
          if (e)
            if (e.length) this._log("Applying Extension Points for: '" + b + "'\n\t* " + e.join("\n\t* "));
            else i.debug >= 5 && this._log("No Extension Points for: '" + b + "'")
        }
      } else i.debug >= 4 && this._log("Applying Extension Points for: '" + b + "' (target mark does not exist)")
    },
    _getExtension: function(a, b) {
      var c;
      if (f.array.is(a))
        for (var d = a.length - 1, e; d >= 0;) {
          if ((c = f.getOwn(this._components, a[d--])) && (e = c.get(b)) !== undefined) return e
        } else if (c = f.getOwn(this._components,
        a)) return c.get(b)
    },
    _getComponentExtensions: function(a) {
      return f.getOwn(this._components, a)
    },
    _getConstantExtension: function(a, b) {
      a = this._getExtension(a, b);
      if (!f.fun.is(a)) return a
    }
  });
  f.type("pvc.BasePanel", i.Abstract).add(i.visual.Interactive).init(function(a, b, c) {
    this.chart = a;
    this.base();
    this.axes = {};
    if (c) {
      if (c.scenes) {
        this._sceneTypeExtensions = c.scenes;
        delete c.scenes
      }
      var d = c.axes;
      if (d) {
        f.copy(this.axes, d);
        delete c.axes
      }
    }
    $.extend(this, c);
    if (!this.axes.color) this.axes.color = a.axes.color;
    this.position = {};
    d = c && c.margins;
    if (!b && d === undefined) d = 3;
    this.margins = new F(d);
    this.paddings = new F(c && c.paddings);
    this.size = new M(c && c.size);
    this.sizeMax = new M(c && c.sizeMax);
    if (b) {
      this.parent = b;
      this.isTopRoot = false;
      this.root = (this.isRoot = b.chart !== a) ? this : b.root;
      this.topRoot = b.topRoot;
      this._ibits = b._ibits;
      if (this.isRoot) {
        this.position.left = a.left;
        this.position.top = a.top
      }
      b._addChild(this)
    } else {
      this.parent = null;
      this.root = this;
      this.topRoot = this;
      this.isTopRoot = this.isRoot = true;
      this._ibits = a._ibits
    }
    this.data = (this.isRoot ?
      a : b).data;
    if (this.isRoot) this.offset = this.alignTo = this.align = this.anchor = null;
    else {
      this.align = i.parseAlign(this.anchor, this.align);
      b = this.alignTo;
      c = this.anchor;
      if (b != null && b !== "" && (c === "left" || c === "right")) {
        if (b !== "page-middle") b = isNaN(+b.charAt(0)) ? i.parseAlign(c, b) : L.parse(b)
      } else b = this.align;
      this.alignTo = b;
      this.offset = new X(this.offset)
    }
    if (this.borderWidth == null) {
      var e;
      if (b = this._getExtensionId())
        if (this._getExtension(b, "strokeStyle") != null) {
          e = +this._getConstantExtension(b, "lineWidth");
          if (isNaN(e) ||
            !isFinite(e)) e = null
        }
      this.borderWidth = e == null ? 0 : 1.5
    }
    e = i.visual.Interactive;
    b = this._ibits;
    b = f.bit.set(b, e.Clickable, a._ibits & e.Clickable && !!this.clickAction);
    this._ibits = b = f.bit.set(b, e.DoubleClickable, a._ibits & e.DoubleClickable && !!this.doubleClickAction)
  }).add({
    chart: null,
    parent: null,
    _children: null,
    type: u.Panel,
    _extensionPrefix: "",
    _rubberSelectableMarks: null,
    height: null,
    width: null,
    borderWidth: null,
    anchor: "top",
    pvPanel: null,
    margins: null,
    paddings: null,
    isRoot: false,
    isTopRoot: false,
    root: null,
    topRoot: null,
    _layoutInfo: null,
    _signs: null,
    data: null,
    dataPartValue: null,
    _animating: 0,
    _selectingByRubberband: false,
    _v1DimRoleName: {
      series: "series",
      category: "category",
      value: "value"
    },
    _sceneTypeExtensions: null,
    clickAction: null,
    doubleClickAction: null,
    compatVersion: function(a) {
      return this.chart.compatVersion(a)
    },
    _createLogInstanceId: function() {
      return "" + this.constructor + this.chart._createLogChildSuffix()
    },
    defaultVisibleBulletGroupScene: function() {
      var a = this.axes.color;
      if (a && a.option("LegendVisible")) {
        var b = this.dataPartValue;
        return f.query(a.dataCells).where(function(c) {
          return c.dataPartValue === b
        }).select(function(c) {
          return c.legendBulletGroupScene
        }).first(f.truthy)
      }
      return null
    },
    _getLegendBulletRootScene: function() {
      return this.chart._getLegendBulletRootScene()
    },
    _addChild: function(a) {
      a.parent === this || f.assert("Child has a != parent.");
      (this._children || (this._children = [])).push(a)
    },
    _addSign: function(a) {
      f.array.lazy(this, "_signs").push(a);
      a.selectableByRubberband() && f.array.lazy(this, "_rubberSelectableMarks").push(a.pvMark)
    },
    visibleData: function(a) {
      return this.chart.visibleData(this.dataPartValue, a)
    },
    partData: function() {
      return this.chart.partData(this.dataPartValue)
    },
    layout: function(a, b) {
      if (!this._layoutInfo || f.get(b, "force", false)) {
        var c = f.get(b, "referenceSize");
        if (!c && a) c = f.copyOwn(a);
        var d = this.size.resolve(c),
          e = this.sizeMax.resolve(c);
        if (!a) {
          if (d.width == null || d.height == null) throw f.error.operationInvalid("Panel layout without width or height set.");
          a = f.copyOwn(d)
        }
        if (!c && a) c = f.copyOwn(a);
        if (e.width != null && a.width >
          e.width) a.width = e.width;
        if (e.height != null && a.height > e.height) a.height = e.height;
        e = this.borderWidth / 2;
        var g = (f.get(b, "margins") || this.margins).resolve(c),
          h = (f.get(b, "paddings") || this.paddings).resolve(c),
          j = F.inflate(g, e),
          l = F.inflate(h, e),
          m = j.width + l.width,
          k = j.height + l.height;
        e = new M(Math.max(a.width - m, 0), Math.max(a.height - k, 0));
        var n = f.copyOwn(d);
        if (n.width != null) n.width = Math.max(n.width - m, 0);
        if (n.height != null) n.height = Math.max(n.height - k, 0);
        d = this._layoutInfo || null;
        b = f.get(b, "canChange", true);
        c = this._layoutInfo = {
          canChange: b,
          referenceSize: c,
          realMargins: g,
          realPaddings: h,
          borderWidth: this.borderWidth,
          margins: j,
          paddings: l,
          desiredClientSize: n,
          clientSize: e,
          pageClientSize: d ? d.pageClientSize : e.clone(),
          previous: d
        };
        if (d) {
          delete d.previous;
          delete d.pageClientSize
        }
        if (g = this._calcLayout(c)) {
          c.clientSize = g;
          a = {
            width: g.width + m,
            height: g.height + k
          }
        } else {
          a = a;
          g = e
        }
        this.isVisible = g.width > 0 && g.height > 0;
        delete c.desiredClientSize;
        this.width = a.width;
        this.height = a.height;
        !b && d && delete c.previous;
        if (i.debug >= 5) {
          this._log("Size       = " +
            i.stringify(a));
          this._log("Margins    = " + i.stringify(c.margins));
          this._log("Paddings   = " + i.stringify(c.paddings));
          this._log("ClientSize = " + i.stringify(c.clientSize))
        }
        this._onLaidOut()
      }
    },
    _onLaidOut: function() {
      this.isRoot && this.chart._onLaidOut()
    },
    _calcLayout: function(a) {
      function b(v, y, z) {
        for (var w = 0; v--;) {
          if (y.call(z, v, w) === false) return true;
          w++
        }
        return false
      }

      function c(v, y) {
        o && m._group("LayoutCycle #" + (y + 1) + " (remaining: " + v + ")");
        try {
          v = v > 0;
          k = new F(0);
          n = f.copyOwn(l);
          var z;
          y = 0;
          for (var w = A.length; y <
            w;) {
            z = A[y];
            o && m._group("SIDE Child #" + (y + 1) + " at " + z.anchor);
            try {
              if (d.call(this, z, v)) return true
            } finally {
              o && m._groupEnd()
            }
            y++
          }
          y = 0;
          for (w = t.length; y < w;) {
            z = t[y];
            o && m._group("FILL Child #" + (y + 1));
            try {
              if (d.call(this, z, v)) return true
            } finally {
              o && m._groupEnd()
            }
            y++
          }
          return false
        } finally {
          o && m._groupEnd()
        }
      }

      function d(v, y) {
        var z = false,
          w;
        x.canChange = y;
        b(3, function(B, H) {
          o && m._group("Attempt #" + (H + 1));
          try {
            x.paddings = w;
            x.canChange = B > 0;
            v.layout(new M(n), x);
            if (v.isVisible) {
              if (z = g.call(this, v, y)) return false;
              var K = v._layoutInfo.requestPaddings;
              if (e(w, K)) {
                w = K;
                if (B > 0) {
                  w = new F(w);
                  o && this._log("Child requested paddings change: " + i.stringify(w));
                  return true
                }
                i.debug >= 2 && this._warn("Child requests paddings change but iterations limit has been reached.")
              }
              h.call(this, v);
              v.anchor !== "fill" && j.call(this, v)
            }
            return false
          } finally {
            o && m._groupEnd()
          }
        }, this);
        return z
      }

      function e(v, y) {
        if (!y) return false;
        return f.query(F.names).each(function(z) {
          if (Math.abs((y && y[z] || 0) - (v && v[z] || 0)) >= 0.1) return false
        })
      }

      function g(v, y) {
        var z = false,
          w = v.width - n.width;
        if (w > 0) {
          i.debug >=
            3 && this._log("Child added width = " + w);
          if (y) {
            z = true;
            n.width += w;
            l.width += w
          } else i.debug >= 2 && this._warn("Child wanted more width, but layout iterations limit has been reached.")
        }
        v = v.height - n.height;
        if (v > 0) {
          i.debug >= 3 && this._log("Child added height =" + v);
          if (y) {
            z = true;
            n.height += v;
            l.height += v
          } else i.debug >= 2 && this._warn("Child wanted more height, but layout iterations limit has been reached.")
        }
        return z
      }

      function h(v) {
        var y = v.anchor,
          z = v.align,
          w = v.alignTo,
          B;
        if (y === "fill") {
          y = "left";
          B = k.left + n.width / 2 - v.width /
            2;
          z = w = "middle"
        } else B = k[y];
        var H, K;
        switch (z) {
          case "top":
          case "bottom":
          case "left":
          case "right":
            H = z;
            K = 0;
            break;
          case "center":
          case "middle":
            H = s[q[y]];
            K = -v[p[H]] / 2;
            break
        }
        var S, J;
        switch (w) {
          case "top":
          case "bottom":
          case "left":
          case "right":
            J = w;
            S = J !== H ? n[p[H]] : 0;
            break;
          case "center":
          case "middle":
            J = s[q[y]];
            S = n[p[H]] / 2;
            break;
          case "page-center":
          case "page-middle":
            J = s[q[y]];
            z = p[H];
            S = Math.min(n[z], a.pageClientSize[z]) / 2;
            break
        }
        K = k[J] + S + K;
        if (J = v.offset.resolve(n)) {
          B += J[r[y]] || 0;
          K += J[r[H]] || 0
        }
        if (v.keepInBounds) {
          if (B <
            0) B = 0;
          if (K < 0) K = 0
        }
        v.setPosition(f.set({}, y, B, H, K))
      }

      function j(v) {
        var y = v.anchor,
          z = p[y];
        v = v[z];
        k[y] += v;
        n[z] -= v
      }
      var l, m = this,
        k, n, o;
      if (m._children) {
        var p = i.BasePanel.orthogonalLength,
          q = i.BasePanel.relativeAnchor,
          s = i.BasePanel.leftTopAnchor,
          r = X.namesSidesToOffset,
          t = [],
          A = [];
        m._children.forEach(function(v) {
          var y = v.anchor;
          if (y)
            if (y === "fill") t.push(v);
            else {
              f.hasOwn(q, y) || f.fail.operationInvalid("Unknown anchor value '{0}'", [y]);
              A.push(v)
            }
        });
        o = i.debug >= 5;
        l = f.copyOwn(a.clientSize);
        var x = {
          force: true,
          referenceSize: l
        };
        o && m._group("CCC DOCK LAYOUT clientSize = " + i.stringify(l));
        try {
          b(5, c, m)
        } finally {
          o && m._groupEnd()
        }
      }
      return l
    },
    invalidateLayout: function() {
      this._layoutInfo = null;
      this._children && this._children.forEach(function(a) {
        a.invalidateLayout()
      })
    },
    _create: function(a) {
      if (!this.pvPanel || a) {
        this.pvPanel = null;
        delete this._signs;
        this.layout();
        if (this.isVisible) {
          this.isRoot && this._creating();
          var b = this._layoutInfo.margins;
          a = this._layoutInfo.paddings;
          if (this.isTopRoot) {
            this.pvRootPanel = this.pvPanel = (new u.Panel).canvas(this.chart.options.canvas);
            this.pvRootPanel.lock("data", [new i.visual.Scene(null, {
              panel: this
            })]);
            if (b.width > 0 || b.height > 0) {
              this.pvPanel.width(this.width).height(this.height);
              this.pvPanel = this.pvPanel.add(u.Panel)
            }
          } else this.pvPanel = this.parent.pvPanel.add(this.type);
          var c = this.pvPanel,
            d = this.width - b.width,
            e = this.height - b.height;
          c.width(d).height(e);
          if (i.debug >= 15 && (b.width > 0 || b.height > 0))(this.isTopRoot ? this.pvRootPanel : this.parent.pvPanel).add(this.type).width(this.width).height(this.height).left(this.position.left != null ?
            this.position.left : null).right(this.position.right != null ? this.position.right : null).top(this.position.top != null ? this.position.top : null).bottom(this.position.bottom != null ? this.position.bottom : null).strokeStyle("orange").lineWidth(1).strokeDasharray("- .");
          var g = {};
          f.eachOwn(this.position, function(j, l) {
            c[l](j + b[l]);
            g[this.anchorLength(l)] = true
          }, this);
          if (!g.width) {
            b.left > 0 && c.left(b.left);
            b.right > 0 && c.right(b.right)
          }
          if (!g.height) {
            b.top > 0 && c.top(b.top);
            b.bottom > 0 && c.bottom(b.bottom)
          }
          if (a.width > 0 || a.height >
            0) this.pvPanel = c.add(u.Panel).width(d - a.width).height(e - a.height).left(a.left).top(a.top);
          c.borderPanel = c;
          c.paddingPanel = this.pvPanel;
          this.pvPanel.paddingPanel = this.pvPanel;
          this.pvPanel.borderPanel = c;
          if (i.debug >= 15) {
            this.pvPanel.strokeStyle("lightgreen").lineWidth(1).strokeDasharray("- ");
            this.pvPanel !== c && c.strokeStyle("blue").lineWidth(1).strokeDasharray(". ")
          }
          a = this._getExtensionId();
          new i.visual.Panel(this, null, {
            panel: c,
            extensionId: a
          });
          this._createCore(this._layoutInfo);
          this.isTopRoot && this._initRubberBand();
          this.applyExtensions();
          if (this.isRoot && i.debug > 5) {
            var h = ["SCALES SUMMARY", i.logSeparator];
            this.chart.axesList.forEach(function(j) {
              var l = j.scale;
              if (l) {
                var m = l.domain && l.domain();
                l = l.range && l.range();
                h.push(j.id);
                h.push("    domain: " + (!m ? "?" : i.stringify(m)));
                h.push("    range : " + (!l ? "?" : i.stringify(l)))
              }
            }, this);
            this._log(h.join("\n"))
          }
        }
      }
    },
    _creating: function() {
      this._children && this._children.forEach(function(a) {
        a._creating()
      })
    },
    _createCore: function() {
      this._children && this._children.forEach(function(a) {
        a._create()
      })
    },
    render: function(a) {
      if (!this.isTopRoot) return this.topRoot.render(a);
      this._create(f.get(a, "recreate", false));
      if (this.isVisible) {
        this._onRender();
        var b = this.pvRootPanel;
        this._animating = this.chart.animatable() && !f.get(a, "bypassAnimation", false) ? 1 : 0;
        try {
          b.render();
          if (this._animating) {
            this._animating = 2;
            var c = this;
            b.transition().duration(2E3).ease("cubic-in-out").start(function() {
              c._animating = 0;
              c._onRenderEnd(true)
            })
          } else this._onRenderEnd(false)
        } finally {
          this._animating = 0
        }
      }
    },
    _onRender: function() {
      var a =
        this.chart.options.renderCallback;
      if (a)
        if (this.compatVersion() <= 1) a.call(this.chart);
        else {
          var b = this.context();
          a.call(b, b.scene)
        }
    },
    _onRenderEnd: function(a) {
      this._children && this._children.forEach(function(b) {
        b._onRenderEnd(a)
      })
    },
    renderInteractive: function() {
      if (this.isVisible) {
        var a = this._getSelectableMarks();
        if (a && a.length) a.forEach(function(b) {
          b.render()
        });
        else if (!this._children) {
          this.pvPanel.render();
          return
        }
        this._children && this._children.forEach(function(b) {
          b.renderInteractive()
        })
      }
    },
    _getSelectableMarks: function() {
      return this._rubberSelectableMarks
    },
    animate: function(a, b) {
      return this.topRoot._animating === 1 ? a : b
    },
    animatingStart: function() {
      return this.topRoot._animating === 1
    },
    animating: function() {
      return this.topRoot._animating > 0
    },
    setPosition: function(a) {
      for (var b in a)
        if (f.hasOwn(F.namesSet, b)) {
          var c = a[b];
          if (c === null) delete this.position[b];
          else {
            c = +c;
            if (!isNaN(c) && isFinite(c)) this.position[b] = c
          }
        }
    },
    createAnchoredSize: function(a, b) {
      if (this.isAnchorTopOrBottom()) return new M(b.width, Math.min(b.height, a));
      return new M(Math.min(b.width, a), b.height)
    },
    applyExtensions: function() {
      this._signs &&
      this._signs.forEach(function(a) {
        a.applyExtensions()
      })
    },
    extend: function(a, b, c) {
      this.chart.extend(a, this._makeExtensionAbsId(b), c)
    },
    extendAbs: function(a, b, c) {
      this.chart.extend(a, b, c)
    },
    _extendSceneType: function(a, b, c) {
      (a = f.get(this._sceneTypeExtensions, a)) && i.extendType(b, a, c)
    },
    _absBaseExtId: {
      abs: "base"
    },
    _absSmallBaseExtId: {
      abs: "smallBase"
    },
    _getExtensionId: function() {
      if (this.isRoot) return !this.chart.parent ? this._absBaseExtId : this._absSmallBaseExtId
    },
    _getExtensionPrefix: function() {
      return this._extensionPrefix
    },
    _makeExtensionAbsId: function(a) {
      return i.makeExtensionAbsId(a, this._getExtensionPrefix())
    },
    _getExtension: function(a, b) {
      return this.chart._getExtension(this._makeExtensionAbsId(a), b)
    },
    _getExtensionAbs: function(a, b) {
      return this.chart._getExtension(a, b)
    },
    _getConstantExtension: function(a, b) {
      return this.chart._getConstantExtension(this._makeExtensionAbsId(a), b)
    },
    getPvPanel: function(a) {
      var b = this.pvPanel;
      if (!a) return b;
      if (!this.parent) throw f.error.operationInvalid("Layers are not possible in a root panel.");
      if (!b) throw f.error.operationInvalid("Cannot access layer panels without having created the main panel.");
      var c = null;
      if (this._layers) c = this._layers[a];
      else this._layers = {};
      if (!c) {
        var d = c = this.parent.pvPanel.borderPanel.add(this.type).extend(b.borderPanel);
        if (b !== b.borderPanel) c = d.add(u.Panel).extend(b);
        d.borderPanel = d;
        d.paddingPanel = c;
        c.paddingPanel = c;
        c.borderPanel = d;
        this.initLayerPanel(c, a);
        this._layers[a] = c
      }
      return c
    },
    initLayerPanel: function() {},
    _getV1DimName: function(a) {
      var b = this._v1DimName || (this._v1DimNameCache = {}),
        c = b[a];
      if (c == null) {
        c = (c = this.chart.visualRoles[this._v1DimRoleName[a]]) ? c.firstDimensionName() : "";
        b[a] = c
      }
      return c
    },
    _getV1Datum: function(a) {
      return a.datum
    },
    context: function() {
      var a = this._context;
      if (!a || a.isPinned) a = this._context = new i.visual.Context(this);
      else Ka.call(a);
      return a
    },
    _isTooltipEnabled: function() {
      return !this.selectingByRubberband() && !this.animating()
    },
    _getTooltipFormatter: function(a) {
      var b = this.compatVersion() <= 1,
        c = a.format;
      if (!c) {
        if (!b) return this._summaryTooltipFormatter;
        c = this.chart.options.v1StyleTooltipFormat;
        if (!c) return
      }
      if (b) return function(d) {
        return c.call(d.panel, d.getV1Series(), d.getV1Category(), d.getV1Value() || "", d.getV1Datum())
      };
      return function(d) {
        return c.call(d, d.scene)
      }
    },
    _summaryTooltipFormatter: function(a) {
      function b(q, s) {
        m.push("<b>" + q + "</b>: " + (f.html.escape(s) || " - ") + "<br/>")
      }

      function c(q, s) {
        q = e ? e.dimensions(s).percentOverParent(l) : j.dimensions(s).percent(q.value, l);
        return n(q)
      }
      var d = a.scene;
      if (!d.datum) return "";
      var e = d.group,
        g = e && e.count() > 1,
        h = d.datum;
      if (!g && (!h || h.isNull)) return "";
      var j =
          d.data(),
        l = {
          visible: true
        },
        m = [];
      if (h.isInterpolated) m.push("<i>Interpolation</i>: " + f.html.escape(h.interpolation) + "<br/>");
      else h.isTrend && m.push("<i>Trend</i>: " + f.html.escape(h.trendType) + "<br/>");
      h = j.type;
      var k = a.panel.stacked === false ? null : h.getPlayingPercentVisualRoleDimensionMap(),
        n = k ? a.chart.options.percentValueFormat : null,
        o = g ? e.atoms : d.datum.atoms,
        p = false;
      h.sortDimensionNames(f.keys(o)).forEach(function(q) {
        var s = o[q];
        if (!s.dimension.type.isHidden)
          if (!g || s.value != null) {
            p = true;
            var r = s.label;
            if (k && k.has(q)) r += " (" + c(s, q) + ")";
            b(f.html.escape(s.dimension.type.label), r)
          }
      });
      if (g) {
        p && m.push("<hr />");
        m.push("<b>#</b>: " + e._datums.length + "<br/>");
        h.sortDimensionNames(e.freeDimensionNames()).forEach(function(q) {
          var s = e.dimensions(q);
          if (!s.type.isHidden) {
            var r = f.html.escape(s.type.label);
            if (s.type.valueType === Number) {
              s = s.format(s.sum(l));
              if (k && k.has(q)) s += " (" + c(null, q) + ")";
              r = "&sum; " + r
            } else s = s.atoms(l).map(function(t) {
              return t.label || "- "
            }).join(", ");
            b(r, s)
          }
        })
      }
      return '<div style="text-align: left;">' +
        m.join("\n") + "</div>"
    },
    _onClick: function(a) {
      var b = this.clickAction;
      if (b) this.compatVersion() <= 1 ? this._onV1Click(a, b) : b.call(a, a.scene)
    },
    _onDoubleClick: function(a) {
      var b = this.doubleClickAction;
      if (b) this.compatVersion() <= 1 ? this._onV1DoubleClick(a, b) : b.call(a, a.scene)
    },
    _onV1Click: function(a, b) {
      b.call(a.pvMark, a.getV1Series(), a.getV1Category(), a.getV1Value(), a.event, a.getV1Datum())
    },
    _onV1DoubleClick: function(a, b) {
      b.call(a.pvMark, a.getV1Series(), a.getV1Category(), a.getV1Value(), a.event, a.getV1Datum())
    },
    selectingByRubberband: function() {
      return this.topRoot._selectingByRubberband
    },
    _initRubberBand: function() {
      var a = this,
        b = a.chart;
      if (b.interactive()) {
        var c = b.options.clearSelectionMode === "emptySpaceClick",
          d = this.chart.selectableByRubberband();
        if (d || c) {
          var e = b.data,
            g = a.pvRootPanel || a.pvPanel.paddingPanel;
          a._getExtensionAbs("base", "fillStyle") || g.fillStyle(i.invisibleFill);
          g.lock("events", "all");
          if (d) {
            this._selectingByRubberband = false;
            var h, j, l = this.selectBar = (new i.visual.Bar(this, g, {
                extensionId: "rubberBand",
                normalStroke: true,
                noHover: true,
                noSelect: true,
                noClick: true,
                noDoubleClick: true,
                noTooltip: true
              })).override("defaultStrokeWidth", f.fun.constant(1.5)).override("defaultColor", function(k) {
                  return k === "stroke" ? "#86fe00" : "rgba(203, 239, 163, 0.6)"
                }).override("interactiveColor", function(k) {
                  return k
                }).pvMark.lock("visible", function() {
                  return !!j
                }).lock("left", function() {
                  return j.x
                }).lock("right").lock("top", function() {
                  return j.y
                }).lock("bottom").lock("width", function() {
                  return j.dx
                }).lock("height", function() {
                  return j.dy
                }).lock("cursor").lock("events",
                  "none"),
              m;
            g.intercept("data", function() {
              var k = this.delegate();
              k && k.forEach(function(n) {
                if (n.x == null) n.x = n.y = n.dx = n.dy = 0
              });
              return k
            }).event("mousedown", u.Behavior.select().autoRender(false)).event("select", function(k) {
              if (j) j = new u.Shape.Rect(k.x, k.y, k.dx, k.dy);
              else {
                if (a.animating()) return;
                if (k.dx * k.dx + k.dy * k.dy <= 4) return;
                j = new u.Shape.Rect(k.x, k.y, k.dx, k.dy);
                a._selectingByRubberband = true;
                h || (h = g.toScreenTransform());
                a.rubberBand = j.apply(h)
              }
              l.render()
            }).event("selectend", function() {
              if (j) {
                var k = arguments[arguments.length -
                  1];
                h || (h = g.toScreenTransform());
                var n = j.apply(h);
                j = null;
                a._selectingByRubberband = false;
                l.render();
                try {
                  a._processRubberBand(n, k)
                } finally {
                  m = new Date
                }
              }
            });
            c && g.event("click", function() {
              if (m)
                if (new Date - m < 300) {
                  m = null;
                  return
                }
              e.owner.clearSelected() && b.updateSelections()
            })
          } else c && g.event("click", function() {
            e.owner.clearSelected() && b.updateSelections()
          })
        }
      }
    },
    _processRubberBand: function(a, b, c) {
      this.rubberBand = a;
      try {
        this._onRubberBandSelectionEnd(b, c)
      } finally {
        this.rubberBand = null
      }
    },
    _onRubberBandSelectionEnd: function(a,
                                        b) {
      i.debug >= 20 && this._log("rubberBand " + i.stringify(this.rubberBand));
      b = Object.create(b || {});
      b.toggle = false;
      var c = this._getDatumsOnRubberBand(a, b);
      if (c) {
        var d = this.chart;
        d._updatingSelections(function() {
          if (!a.ctrlKey && d.options.ctrlSelectMode) {
            d.data.owner.clearSelected();
            i.data.Data.setSelected(c, true)
          } else b.toggle ? i.data.Data.toggleSelected(c) : i.data.Data.setSelected(c, true)
        })
      }
    },
    _getDatumsOnRubberBand: function(a, b) {
      a = new f.Map;
      this._getDatumsOnRect(a, this.rubberBand, b);
      b = a.values();
      if (b.length)
        if ((b =
          this.chart._onUserSelection(b)) && !b.length) b = null;
      return b
    },
    _getDatumsOnRect: function(a, b, c) {
      this._getOwnDatumsOnRect(a, b, c);
      var d = this._children;
      d && d.forEach(function(e) {
        e._getDatumsOnRect(a, b, c)
      })
    },
    _getOwnDatumsOnRect: function(a, b, c) {
      var d = this;
      if (!d.isVisible) return false;
      d = d._getSelectableMarks();
      if (!d || !d.length) return false;
      var e = a.count,
        g = f.get(c, "markSelectionMode"),
        h = function(l) {
          l.isNull || a.set(l.id, l)
        },
        j = function(l) {
          l.selectableByRubberband() && l.datums().each(h)
        };
      d.forEach(function(l) {
        l.eachSceneWithDataOnRect(b,
          j, null, g)
      });
      return e < a.count
    },
    isAnchorTopOrBottom: function(a) {
      if (!a) a = this.anchor;
      return a === "top" || a === "bottom"
    },
    isOrientationVertical: function(a) {
      return this.chart.isOrientationVertical(a)
    },
    isOrientationHorizontal: function(a) {
      return this.chart.isOrientationHorizontal(a)
    }
  }).addStatic({
    relativeAnchor: {
      top: "left",
      bottom: "left",
      left: "bottom",
      right: "bottom"
    },
    leftBottomAnchor: {
      top: "bottom",
      bottom: "bottom",
      left: "left",
      right: "left"
    },
    leftTopAnchor: {
      top: "top",
      bottom: "top",
      left: "left",
      right: "left"
    },
    horizontalAlign: {
      top: "right",
      bottom: "left",
      middle: "center",
      right: "right",
      left: "left",
      center: "center"
    },
    verticalAlign: {
      top: "top",
      bottom: "bottom",
      middle: "middle",
      right: "bottom",
      left: "top",
      center: "middle"
    },
    verticalAlign2: {
      top: "top",
      bottom: "bottom",
      middle: "middle",
      right: "top",
      left: "bottom",
      center: "middle"
    },
    relativeAnchorMirror: {
      top: "right",
      bottom: "right",
      left: "top",
      right: "top"
    },
    oppositeAnchor: {
      top: "bottom",
      bottom: "top",
      left: "right",
      right: "left"
    },
    parallelLength: {
      top: "width",
      bottom: "width",
      right: "height",
      left: "height"
    },
    orthogonalLength: {
      top: "height",
      bottom: "height",
      right: "width",
      left: "width"
    },
    oppositeLength: {
      width: "height",
      height: "width"
    }
  });
  f.scope(function() {
    var a = i.BasePanel,
      b = {};
    f.eachOwn({
      anchorOrtho: "relativeAnchor",
      anchorOrthoMirror: "relativeAnchorMirror",
      anchorOpposite: "oppositeAnchor",
      anchorLength: "parallelLength",
      anchorOrthoLength: "orthogonalLength"
    }, function(c, d) {
      var e = a[c];
      b[d] = function(g) {
        return e[g || this.anchor]
      }
    });
    a.add(b)
  });
  f.type("pvc.PlotPanel", i.BasePanel).init(function(a, b, c, d) {
    this.base(a, b, d);
    this.plot = c;
    this._extensionPrefix =
      c.extensionPrefixes;
    this.dataPartValue = c.option("DataPart");
    this.axes.color = a._getAxis("color", (c.option("ColorAxis") || 0) - 1);
    this.orientation = c.option("Orientation");
    this.valuesVisible = c.option("ValuesVisible");
    this.valuesAnchor = c.option("ValuesAnchor");
    this.valuesMask = c.option("ValuesMask");
    this.valuesFont = c.option("ValuesFont");
    this.valuesOptimizeLegibility = c.option("ValuesOptimizeLegibility");
    b = this.visualRoles = Object.create(a.visualRoles);
    c = c.option("ColorRole");
    b.color = c ? a.visualRole(c) : null;
    this.chart._addPlotPanel(this)
  }).add({
    anchor: "fill",
    visualRoles: null,
    _getExtensionId: function() {
      var a = ["chart", "plot"];
      this.plotName && a.push(this.plotName);
      return a
    },
    isOrientationVertical: function() {
      return this.orientation === i.orientation.vertical
    },
    isOrientationHorizontal: function() {
      return this.orientation === i.orientation.horizontal
    }
  });
  f.type("pvc.MultiChartPanel", i.BasePanel).add({
    anchor: "fill",
    _multiInfo: null,
    createSmallCharts: function() {
      var a = this.chart,
        b = a.options,
        c = Number(b.multiChartMax);
      if (isNaN(c) ||
        c < 1) c = Infinity;
      var d = a.visualRoles.multiChart.flatten(a.data, {
          visible: true
        }),
        e = Math.min(d._children.length, c);
      if (e !== 0) {
        b = +b.multiChartColumnsMax;
        if (isNaN(b) || c < 1) b = 3;
        c = Math.min(e, b);
        c >= 1 && isFinite(c) || f.assert("Must be at least 1 and finite");
        var g = Math.ceil(e / c);
        g >= 1 || f.assert("Must be at least 1");
        var h = this._getCoordinatedRootAxesByScopeType(),
          j, l, m;
        if (h) {
          j = {};
          l = function(r, t, A) {
            t = f.array.lazy(j, t);
            f.array.lazy(t, A).push(r)
          };
          m = function(r) {
            h.row && l(r, "row", r.smallRowIndex);
            h.column && l(r, "column",
              r.smallColIndex);
            h.global && l(r, "global", 0)
          }
        }
        for (var k = this._buildSmallChartsBaseOptions(), n = a.constructor, o = 0; o < e; o++) {
          var p = d._children[o],
            q = o % c,
            s = Math.floor(o / c);
          p = f.set(Object.create(k), "smallColIndex", q, "smallRowIndex", s, "title", p.absLabel, "data", p);
          p = new n(p);
          if (h) {
            p._preRenderPhase1();
            m(p)
          } else p._preRender()
        }
        if (h) {
          f.eachOwn(h, function(r, t) {
            r.forEach(function(A) {
              j[t].forEach(function(x) {
                this._coordinateScopeAxes(A.id, x)
              }, this)
            }, this)
          }, this);
          a.children.forEach(function(r) {
            r._preRenderPhase2()
          })
        }
        this._multiInfo = {
          data: d,
          count: e,
          rowCount: g,
          colCount: c,
          multiChartColumnsMax: b,
          coordScopesByType: j
        }
      }
    },
    _getCoordinatedRootAxesByScopeType: function() {
      var a = false,
        b = f.query(this.chart.axesList).multipleIndex(function(c) {
          if (c.scaleType !== "discrete" && c.option.isDefined("DomainScope")) {
            c = c.option("DomainScope");
            if (c !== "cell") {
              a = true;
              return c
            }
          }
        });
      return a ? b : null
    },
    _coordinateScopeAxes: function(a, b) {
      var c = f.query(b).select(function(d) {
        d = d.axes[a].scale;
        if (!d.isNull) {
          d = d.domain();
          return {
            min: d[0],
            max: d[1]
          }
        }
      }).reduce(i.unionExtents,
          null);
      c && b.forEach(function(d) {
        d = d.axes[a];
        var e = d.scale;
        if (!e.isNull) {
          e.domain(c.min, c.max);
          d.setScale(e)
        }
      })
    },
    _buildSmallChartsBaseOptions: function() {
      var a = this.chart,
        b = a.options;
      return f.set(Object.create(b), "parent", a, "legend", false, "titleFont", b.smallTitleFont, "titlePosition", b.smallTitlePosition, "titleAlign", b.smallTitleAlign, "titleAlignTo", b.smallTitleAlignTo, "titleOffset", b.smallTitleOffset, "titleKeepInBounds", b.smallTitleKeepInBounds, "titleMargins", b.smallTitleMargins, "titlePaddings", b.smallTitlePaddings,
        "titleSize", b.smallTitleSize, "titleSizeMax", b.smallTitleSizeMax)
    },
    _calcLayout: function(a) {
      var b = this._multiInfo;
      if (b) {
        var c = this.chart.options,
          d = a.clientSize,
          e = a.previous,
          g = e ? e.initialClientWidth : d.width;
        e = e ? e.initialClientHeight : d.height;
        var h = L.parse(c.smallWidth);
        if (h != null) h = L.resolve(h, g);
        var j = L.parse(c.smallHeight);
        if (j != null) j = L.resolve(j, e);
        var l = +c.smallAspectRatio;
        if (isNaN(l) || l <= 0) l = this._calulateDefaultAspectRatio();
        if (h == null)
          if (isFinite(b.multiChartColumnsMax)) h = d.width / b.colCount;
          else {
            if (j == null) j = e;
            h = l * j
          }
        if (j == null) j = b.rowCount === 1 && f.get(c, "multiChartSingleRowFillsHeight", true) || b.colCount === 1 && f.get(c, "multiChartSingleColFillsHeight", true) ? e : h / l;
        f.set(a, "initialClientWidth", g, "initialClientHeight", e, "width", h, "height", j);
        return {
          width: h * b.colCount,
          height: Math.max(d.height, j * b.rowCount)
        }
      }
    },
    _calulateDefaultAspectRatio: function() {
      if (this.chart instanceof i.PieChart) return 10 / 7;
      return 1.25
    },
    _getExtensionId: function() {
      return "content"
    },
    _createCore: function(a) {
      var b = this._multiInfo;
      if (b) {
        var c = this.chart,
          d = c.options,
          e = d.smallMargins;
        e = e == null ? new F(new L(0.02)) : new F(e);
        var g = new F(d.smallPaddings);
        c.children.forEach(function(h) {
          h._setSmallLayout({
            left: h.smallColIndex * a.width,
            top: h.smallRowIndex * a.height,
            width: a.width,
            height: a.height,
            margins: this._buildSmallMargins(h, e),
            paddings: g
          })
        }, this);
        (b = b.coordScopesByType) && c._coordinateSmallChartsLayout(b);
        this.base(a)
      }
    },
    _buildSmallMargins: function(a, b) {
      var c = this._multiInfo,
        d = c.colCount - 1;
      c = c.rowCount - 1;
      var e = a.smallColIndex;
      a = a.smallRowIndex;
      var g = {};
      if (e > 0) g.left = b.left;
      if (e < d) g.right = b.right;
      if (a > 0) g.top = b.top;
      if (a < c) g.bottom = b.bottom;
      return g
    }
  });
  f.type("pvc.TitlePanelAbstract", i.BasePanel).init(function(a, b, c) {
    c || (c = {});
    var d = c.anchor || this.anchor;
    if (c.size == null) {
      var e = c.titleSize;
      if (e != null) c.size = (new M).setSize(e, {
        singleProp: this.anchorOrthoLength(d)
      })
    }
    if (c.sizeMax == null) {
      e = c.titleSizeMax;
      if (e != null) c.sizeMax = (new M).setSize(e, {
        singleProp: this.anchorOrthoLength(d)
      })
    }
    if (c.paddings == null) c.paddings = this.defaultPaddings;
    this.base(a,
      b, c);
    if (c.font === undefined) {
      a = this._getExtension("label", "font");
      if (typeof a === "string") this.font = a
    }
  }).add({
    pvLabel: null,
    anchor: "top",
    title: null,
    titleSize: undefined,
    font: "12px sans-serif",
    defaultPaddings: 2,
    _extensionPrefix: "title",
    _calcLayout: function(a) {
      var b = new M,
        c = this.anchor,
        d = this.anchorLength(c);
      c = this.anchorOrthoLength(c);
      var e = u.Text.measure(this.title, this.font).width + 2,
        g = a.clientSize[d],
        h = a.desiredClientSize[d];
      if (h == null) h = e > g ? g : e;
      else if (h > g) h = g;
      e = e > h ? i.text.justify(this.title, h, this.font) :
        this.title ? [this.title] : [];
      g = u.Text.fontHeight(this.font);
      var j = e.length * g,
        l = a.clientSize[c],
        m = a.desiredClientSize[c];
      if (m == null) m = j;
      else if (m > l) m = l;
      if (j > m) {
        l = Math.max(1, Math.floor(m / g));
        if (e.length > l) {
          var k = e[l];
          e.length = l;
          j = m = l * g;
          e[l - 1] = i.text.trimToWidthB(h, e[l - 1] + " " + k, this.font, "..")
        }
      }
      a.lines = e;
      a.topOffset = (m - j) / 2;
      a.lineSize = {
        width: h,
        height: g
      };
      a.a_width = d;
      a.a_height = c;
      b[d] = h;
      b[c] = m;
      return b
    },
    _createCore: function(a) {
      var b = this._buildScene(a),
        c = {
          top: 0,
          right: Math.PI / 2,
          bottom: 0,
          left: -Math.PI / 2
        },
        d = i.BasePanel.horizontalAlign[this.align],
        e = i.BasePanel.leftTopAnchor[this.anchor],
        g;
      if (this.compatVersion() <= 1) g = function(h) {
        return function() {
          return h.call(this)
        }
      };
      this.pvLabel = (new i.visual.Label(this, this.pvPanel, {
        extensionId: "label",
        wrapper: g
      })).lock("data", b.lineScenes).pvMark[e](function(h) {
        return a.topOffset + h.vars.size.height / 2 + this.index * h.vars.size.height
      }).textAlign(d)[this.anchorOrtho(e)](function(h) {
        switch (this.textAlign()) {
          case "center":
            return h.vars.size.width / 2;
          case "left":
            return 0;
          case "right":
            return h.vars.size.width
        }
      }).text(function(h) {
        return h.vars.textLines[this.index]
      }).font(this.font).textBaseline("middle").textAngle(c[this.anchor])
    },
    _buildScene: function(a) {
      var b = new i.visual.Scene(null, {
          panel: this,
          source: this.chart.data
        }),
        c = a.lines;
      b.vars.size = a.lineSize;
      b.vars.textLines = c;
      b.lineScenes = f.array.create(c.length, b);
      return b
    },
    _getExtensionId: f.fun.constant("")
  });
  f.type("pvc.TitlePanel", i.TitlePanelAbstract).init(function(a, b, c) {
    c || (c = {});
    if (a.compatVersion() <= 1)
      if (c.titleSize ==
        null) c.titleSize = 25;
    this._extensionPrefix = !a.parent ? "title" : "smallTitle";
    this.base(a, b, c)
  }).add({
    font: "14px sans-serif",
    defaultPaddings: 4
  });
  f.type("pvc.LegendPanel", i.BasePanel).init(function(a, b, c) {
    this.base(a, b, c);
    a = i.visual.Interactive;
    if (this._ibits & a.Interactive) this._ibits |= a.Clickable
  }).add({
    pvRule: null,
    pvDot: null,
    pvLabel: null,
    anchor: "bottom",
    pvLegendPanel: null,
    textMargin: 6,
    itemPadding: 2.5,
    markerSize: 15,
    font: "10px sans-serif",
    _calcLayout: function(a) {
      return this._getBulletRootScene().layout(a)
    },
    _createCore: function(a) {
      var b = a.clientSize;
      a = this._getBulletRootScene();
      var c = a.vars.itemPadding,
        d = a.vars.size,
        e = this.isAnchorTopOrBottom(),
        g = e ? "top" : "left",
        h = this.anchorOpposite(g),
        j = this.anchorLength(g),
        l = this.anchorOrthoLength(g),
        m = e ? "center" : "middle",
        k = e ? "left" : "top",
        n = this.anchorOpposite(k),
        o = 0;
      switch (this.align) {
        case n:
          o = b[j] - d.width;
          break;
        case m:
          o = (b[j] - d.width) / 2;
          break
      }
      this.pvPanel.overflow("hidden");
      b = this.pvPanel.add(u.Panel).data(a.vars.rows)[k](o)[g](function() {
        var t = this.sibling();
        return t ?
          t[g] + t[l] + c[l] : 0
      })[j](function(t) {
        return t.size.width
      })[l](function(t) {
        return t.size.height
      });
      var p;
      if (this.compatVersion() <= 1) p = function(t) {
        return function(A) {
          return t.call(this, A.vars.value.rawValue)
        }
      };
      this.pvLegendPanel = (new i.visual.Panel(this, b, {
        extensionId: "panel",
        wrapper: p,
        noSelect: false,
        noHover: true,
        noClick: false,
        noClickSelect: true
      })).lockMark("data", function(t) {
          return t.items
        }).lock(n, null).lock(h, null).lockMark(k, function(t) {
          t = t.vars.itemPadding;
          var A = this.sibling();
          return A ? A[k] + A[j] + t[j] :
            0
        }).lockMark("height", function(t) {
          return t.vars.clientSize.height
        }).lockMark(g, e ? function(t) {
          t = t.vars;
          return t.row.size.height / 2 - t.clientSize.height / 2
        } : 0).lockMark("width", e ? function(t) {
          return t.vars.clientSize.width
        } : function() {
          return this.parent.width()
        }).pvMark.def("hidden", "false").fillStyle(function() {
          return this.hidden() == "true" ? "rgba(200,200,200,1)" : "rgba(200,200,200,0.0001)"
        });
      var q = (new i.visual.Panel(this, this.pvLegendPanel)).pvMark.left(0).top(0).right(null).bottom(null).width(function(t) {
        return t.vars.markerSize
      }).height(function(t) {
        return t.vars.clientSize.height
      });
      if (i.debug >= 20) {
        b.strokeStyle("red");
        this.pvLegendPanel.strokeStyle("green");
        q.strokeStyle("blue")
      }
      a.childNodes.forEach(function(t) {
        var A = (new i.visual.Panel(this, q)).pvMark.visible(function(x) {
          return x.parent === t
        });
        t.renderer().create(this, A, t.extensionPrefix, p)
      }, this);
      this.pvLabel = (new i.visual.Label(this, q.anchor("right"), {
        extensionId: "label",
        wrapper: p
      })).intercept("textStyle", function(t) {
          var A = this.delegateExtension() || "black";
          return t.isOn() ? A : i.toGrayScale(A, null, undefined, 150)
        }).pvMark.textAlign("left").text(function(t) {
          return t.vars.value.label
        }).lock("textMargin",
        function(t) {
          return t.vars.textMargin - 4
        }).font(function(t) {
          return t.vars.font
        }).textDecoration(function(t) {
          return t.isOn() ? "" : "line-through"
        });
      if (i.debug >= 16) {
        var s = this.font,
          r = u.Text.fontHeight(s) * 2 / 3;
        q.anchor("right").add(u.Panel)[this.anchorLength()](0)[this.anchorOrthoLength()](0).fillStyle(null).strokeStyle(null).lineWidth(0).add(u.Line).data(function(t) {
          t = i.text.getLabelBBox(u.Text.measure(t.vars.value.label, s).width, r, "left", "middle", 0, 2).source.points();
          if (t.length > 1) t = t.concat(t[0]);
          return t
        }).left(function(t) {
          return t.x
        }).top(function(t) {
          return t.y
        }).strokeStyle("red").lineWidth(0.5).strokeDasharray("-")
      }
    },
    _onClick: function(a) {
      a = a.scene;
      f.fun.is(a.execute) && a.executable() && a.execute()
    },
    _getExtensionPrefix: function() {
      return "legend"
    },
    _getExtensionId: function() {
      return "area"
    },
    _getSelectableMarks: function() {
      return [this.pvLegendPanel]
    },
    _getBulletRootScene: function() {
      var a = this._rootScene;
      if (!a) this._rootScene = a = new i.visual.legend.BulletRootScene(null, {
        panel: this,
        source: this.chart.data,
        horizontal: this.isAnchorTopOrBottom(),
        font: this.font,
        markerSize: this.markerSize,
        textMargin: this.textMargin,
        itemPadding: this.itemPadding
      });
      return a
    }
  });
  f.type("pvc.CartesianAbstract", i.BaseChart).init(function(a) {
    this.axesPanels = {};
    this.base(a)
  }).add({
    _gridDockPanel: null,
    axesPanels: null,
    yAxisPanel: null,
    xAxisPanel: null,
    secondXAxisPanel: null,
    secondYAxisPanel: null,
    yScale: null,
    xScale: null,
    _getSeriesRoleSpec: function() {
      return {
        isRequired: true,
        defaultDimension: "series*",
        autoCreateDimension: true,
        requireIsDiscrete: true
      }
    },
    _getColorRoleSpec: function() {
      return {
        isRequired: true,
        defaultDimension: "color*",
        defaultSourceRole: "series",
        requireIsDiscrete: true
      }
    },
    _collectPlotAxesDataCells: function(a, b) {
      this.base(a, b);
      if (a.option.isDefined("BaseAxis")) {
        var c = f.array.lazy(b, "base");
        f.array.lazy(c, a.option("BaseAxis") - 1).push({
          plot: a,
          role: this.visualRole(a.option("BaseRole")),
          dataPartValue: a.option("DataPart")
        })
      }
      if (a.option.isDefined("OrthoAxis")) {
        c = a.option("Trend");
        var d = a.option.isDefined("Stacked") ? a.option("Stacked") : undefined;
        b = f.array.lazy(b, "ortho");
        var e = f.array.to(a.option("OrthoRole")),
          g = {
            dataPartValue: a.option("DataPart"),
            isStacked: d,
            trend: c,
            nullInterpolationMode: a.option("NullInterpolationMode")
          },
          h = f.array.lazy(b, a.option("OrthoAxis") - 1);
        e.forEach(function(j) {
          var l = Object.create(g);
          l.role = this.visualRole(j);
          h.push(l)
        }, this)
      }
    },
    _addAxis: function(a) {
      this.base(a);
      switch (a.type) {
        case "base":
        case "ortho":
          this.axes[a.orientedId] = a;
          if (a.v1SecondOrientedId) this.axes[a.v1SecondOrientedId] = a;
          break
      }
      return this
    },
    _generateTrendsDataCell: function(a) {
      var b = a.trend;
      if (b) {
        b = i.trends.get(b.type);
        var c = [];
        this._generateTrendsDataCellCore(c, a, b);
        c.length && this.data.owner.add(c)
      }
    },
    _generateTrendsDataCellCore: function() {},
    _setAxesScales: function(a) {
      this.base(a);
      if (!a || this.parent)["base", "ortho"].forEach(function(b) {
        (b = this.axesByType[b]) && b.forEach(this._createAxisScale, this)
      }, this)
    },
    _createAxisScale: function(a) {
      var b = this.base(a),
        c = a.type === "ortho";
      if (c || a.type === "base")
        if (c && a.index === 1) this.secondScale = b;
        else a.index || (this[a.orientation + "Scale"] = b);
      return b
    },
    _preRenderContent: function(a) {
      this._createFocusWindow();
      this._gridDockPanel = new i.CartesianGridDockingPanel(this, this.basePanel, {
        margins: a.margins,
        paddings: a.paddings
      });
      ["base", "ortho"].forEach(function(b) {
        (b = this.axesByType[b]) && f.query(b).reverse().each(function(c) {
          this._createAxisPanel(c)
        }, this)
      }, this);
      this._createPlotPanels(this._gridDockPanel, {
        clickAction: a.clickAction,
        doubleClickAction: a.doubleClickAction
      })
    },
    _createFocusWindow: function() {
      if (this.selectableByFocusWindow()) {
        var a, b = this.focusWindow;
        if (b) a = b._exportData();
        b = this.focusWindow = new i.visual.CartesianFocusWindow(this);
        a && b._importData(a);
        b._initFromOptions()
      } else this.focusWindow && delete this.focusWindow
    },
    _createAxisPanel: function(a) {
      if (a.option("Visible")) {
        var b, c = a.option("Title");
        f.empty(c) || (b = new i.AxisTitlePanel(this, this._gridDockPanel, a, {
          title: c,
          font: a.option("TitleFont") || a.option("Font"),
          anchor: a.option("Position"),
          align: a.option("TitleAlign"),
          margins: a.option("TitleMargins"),
          paddings: a.option("TitlePaddings"),
          titleSize: a.option("TitleSize"),
          titleSizeMax: a.option("TitleSizeMax")
        }));
        c = new i.AxisPanel(this, this._gridDockPanel, a, {
          anchor: a.option("Position"),
          size: a.option("Size"),
          sizeMax: a.option("SizeMax"),
          clickAction: a.option("ClickAction"),
          doubleClickAction: a.option("DoubleClickAction"),
          useCompositeAxis: a.option("Composite"),
          font: a.option("Font"),
          labelSpacingMin: a.option("LabelSpacingMin"),
          grid: a.option("Grid"),
          gridCrossesMargin: a.option("GridCrossesMargin"),
          ruleCrossesMargin: a.option("RuleCrossesMargin"),
          zeroLine: a.option("ZeroLine"),
          desiredTickCount: a.option("DesiredTickCount"),
          showTicks: a.option("Ticks"),
          showMinorTicks: a.option("MinorTicks")
        });
        if (b) c.titlePanel = b;
        this.axesPanels[a.id] = c;
        this.axesPanels[a.orientedId] =
          c;
        if (a.index <= 1 && a.v1SecondOrientedId) this[a.v1SecondOrientedId + "AxisPanel"] = c;
        return c
      }
    },
    _onLaidOut: function() {
      this.plotPanelList && this.plotPanelList[0] && ["base", "ortho"].forEach(function(a) {
        (a = this.axesByType[a]) && a.forEach(this._setCartAxisScaleRange, this)
      }, this)
    },
    _setCartAxisScaleRange: function(a) {
      var b = this.plotPanelList[0]._layoutInfo.clientSize;
      a.setScaleRange(a.orientation === "x" ? b.width : b.height);
      return a.scale
    },
    _getAxesRoundingPaddings: function() {
      function a(e, g, h) {
        var j = c[e];
        if (j == null ||
          g > j) {
          c[e] = g;
          c[e + "Locked"] = h
        } else if (h) c[e + "Locked"] = h
      }

      function b(e) {
        if (e) {
          var g = e.getScaleRoundingPaddings();
          if (g) {
            e = e.orientation === "x";
            a(e ? "left" : "bottom", g.begin, g.beginLocked);
            a(e ? "right" : "top", g.end, g.endLocked)
          }
        }
      }
      var c = {},
        d = this.axesByType;
      ["base", "ortho"].forEach(function(e) {
        (e = d[e]) && e.forEach(b)
      });
      return c
    },
    markEventDefaults: {
      strokeStyle: "#5BCBF5",
      lineWidth: "0.5",
      textStyle: "#5BCBF5",
      verticalOffset: 10,
      verticalAnchor: "bottom",
      horizontalAnchor: "right",
      forceHorizontalAnchor: false,
      horizontalAnchorSwapLimit: 80,
      font: "10px sans-serif"
    },
    markEvent: function(a, b, c) {
      var d = this,
        e = d.axes.base,
        g = d.axes.ortho,
        h = e.scale,
        j = d.data.owner.dimensions(e.role.grouping.firstDimensionName());
      if (e.isDiscrete()) {
        d._warn("Can only mark events in charts with a continuous base scale.");
        return d
      }
      c = $.extend({}, d.markEventDefaults, c);
      a = j.read(a, b);
      b = h(a.value);
      h = h.range();
      e = h[1];
      if (b < h[0] || b > e) {
        this._warn("Cannot mark event because it is outside the base scale's domain.");
        return this
      }
      h = this.plotPanelList[0].pvPanel;
      g = g.scale.range()[1];
      j = c.horizontalAnchor;
      if (!c.forceHorizontalAnchor) {
        var l = j === "right";
        e = l ? e - b : b;
        var m = u.Text.measure(a.label, c.font).width;
        if (e < m) j = l ? "left" : "right"
      }
      e = c.verticalAnchor === "top" ? c.verticalOffset : g - c.verticalOffset;
      h.add(u.Line).data([0, g]).bottom(f.identity).left(b).lineWidth(c.lineWidth).strokeStyle(c.strokeStyle).anchor(j).visible(function() {
        return !this.index
      }).top(e).add(u.Label).font(c.font).text(a.label).textStyle(c.textStyle);
      return d
    },
    defaults: {
      panelSizeRatio: 0.9,
      timeSeries: false,
      timeSeriesFormat: "%Y-%m-%d"
    }
  });
  f.type("pvc.GridDockingPanel", i.BasePanel).add({
    anchor: "fill",
    _calcLayout: function(a) {
      function b(D, C) {
        if (s) q._group("LayoutCycle " + (V ? "- Disaster MODE" : "#" + (C + 1)));
        try {
          var G, N, Q = a.canChange !== false && !V && D > 0,
            R;
          C = false;
          var E;
          G = 0;
          for (N = B.length; G < N;) {
            s && q._group("SIDE Child #" + (G + 1));
            try {
              R = h(B[G], Q);
              if (!V && R) {
                E = false;
                if ((R & J) !== 0) {
                  s && q._log("SIDE Child #" + (G + 1) + " changed overflow paddings");
                  if (!C) {
                    C = true;
                    a.requestPaddings = a.paddings
                  }
                }
                if ((R & S) !== 0)
                  if (D > 0) {
                    s && q._log("SIDE Child #" + (G + 1) + " changed normal paddings");
                    E = true
                  } else i.debug >= 2 && q._warn("SIDE Child #" + (G + 1) + " changed paddings but no more iterations possible.");
                if ((R & K) !== 0) {
                  V = true;
                  b(0);
                  return false
                }
                if (E) return true
              }
            } finally {
              s && q._groupEnd()
            }
            G++
          }
          if (C) {
            s && q._log("Restarting due to overflowPaddings change");
            return false
          }
          G = 0;
          for (N = w.length; G < N;) {
            s && q._group("FILL Child #" + (G + 1));
            try {
              R = g(w[G], Q);
              if (!V && R) {
                E = false;
                if ((R & S) !== 0)
                  if (D > 0) {
                    i.debug >= 5 && q._log("FILL Child #" + (G + 1) + " increased paddings");
                    E = true
                  } else i.debug >= 2 && q._warn("FILL Child #" + (G + 1) + " increased paddings but no more iterations possible.");
                if ((R & K) !== 0) {
                  V = true;
                  b(0);
                  return false
                }
                if (E) return true
              }
            } finally {
              s && q._groupEnd()
            }
            G++
          }
          return false
        } finally {
          s && q._groupEnd()
        }
      }

      function c(D, C) {
        for (var G = 0; D--;) {
          if (C(D, G) === false) return true;
          G++
        }
        return false
      }

      function d(D) {
        var C = D.anchor;
        if (C)
          if (C === "fill") {
            w.push(D);
            D = D.paddings.resolve(z.referenceSize);
            t = F.resolvedMax(t, D)
          } else {
            f.hasOwn(v, C) || f.fail.operationInvalid("Unknown anchor value '{0}'", [C]);
            B.push(D)
          }
      }

      function e(D, C) {
        s && q._group("SIDE Child #" + (C + 1));
        try {
          C = 0;
          var G = D.anchor;
          z.paddings = k(G,
            t);
          D.layout(new M(A), z);
          if (D.isVisible) {
            C |= n(G, t, D);
            j(G, D);
            l(G, D)
          }
          return C
        } finally {
          s && q._groupEnd()
        }
      }

      function g(D, C) {
        var G = 0,
          N = D.anchor;
        z.paddings = k(N, t);
        z.canChange = C;
        D.layout(new M(A), z);
        if (D.isVisible) {
          G |= n(N, t, D, C);
          j(N, D);
          m(D, N)
        }
        return G
      }

      function h(D, C) {
        var G = 0;
        if (D.isVisible) {
          var N = D.anchor,
            Q = y[N],
            R = x[N];
          Q = new M(f.set({}, Q, A[Q], R, D[R]));
          z.paddings = k(N, t);
          z.canChange = C;
          D.layout(Q, z);
          if (D.isVisible)(G = n(N, t, D, C) | o(N, a.paddings, D, C)) || m(D, D.align)
        }
        return G
      }

      function j(D, C) {
        var G;
        if (D === "fill") {
          D =
            "left";
          G = r.left + A.width / 2 - C.width / 2
        } else G = r[D];
        C.setPosition(f.set({}, D, G))
      }

      function l(D, C) {
        var G = x[D];
        C = C[G];
        r[D] += C;
        A[G] -= C
      }

      function m(D, C) {
        var G;
        if (C === "fill") C = "middle";
        var N;
        switch (C) {
          case "top":
          case "bottom":
          case "left":
          case "right":
            G = C;
            N = r[G];
            break;
          case "middle":
            G = "bottom";
            N = r.bottom + A.height / 2 - D.height / 2;
            break;
          case "center":
            G = "left";
            N = r.left + A.width / 2 - D.width / 2;
            break
        }
        D.setPosition(f.set({}, G, N))
      }

      function k(D, C) {
        var G = new F;
        p(D).forEach(function(N) {
          G.set(N, C[N])
        });
        return G
      }

      function n(D, C,
                 G, N) {
        var Q = G._layoutInfo.requestPaddings,
          R = 0;
        if (Q) {
          if (s && i.debug >= 10) {
            q._log("=> clientSize=" + i.stringify(G._layoutInfo.clientSize));
            q._log("<= requestPaddings=" + i.stringify(Q))
          }
          p(D).forEach(function(E) {
            var P = C[E] || 0,
              U = Math.floor(1E4 * (Q[E] || 0)) / 1E4,
              T = U - P;
            P = Math.max(1, Math.abs(0.01 * P));
            if (T !== 0 && Math.abs(T) >= P)
              if (N) {
                R |= S;
                C[E] = U;
                s && q._log("Changed padding " + E + " <- " + U)
              } else i.debug >= 2 && q._warn("CANNOT change but child wanted to: " + E + "=" + U)
          });
          if (R) {
            D = F.names.map(function(E) {
              return (C[E] || 0).toFixed(0)
            }).join("|");
            if (f.hasOwn(H, D)) {
              i.debug >= 2 && q._warn("LOOP detected!!!!");
              R |= K
            } else H[D] = true;
            C.width = C.left + C.right;
            C.height = C.top + C.bottom
          }
        }
        return R
      }

      function o(D, C, G, N) {
        var Q = G._layoutInfo.overflowPaddings || W,
          R = 0;
        s && i.debug >= 10 && q._log("<= overflowPaddings=" + i.stringify(Q));
        p(D).forEach(function(E) {
          if (Q.hasOwnProperty(E)) {
            var P = C[E] || 0,
              U = Math.floor(1E4 * (Q[E] || 0)) / 1E4;
            U -= r[E];
            var T = U - P;
            P = Math.max(1, Math.abs(0.05 * P));
            if (T >= P)
              if (N) {
                R |= J;
                C[E] = U;
                s && q._log("changed overflow padding " + E + " <- " + U)
              } else i.debug >= 2 && q._warn("CANNOT change overflow padding but child wanted to: " +
                E + "=" + U)
          }
        });
        if (R) {
          C.width = C.left + C.right;
          C.height = C.top + C.bottom
        }
        return R
      }

      function p(D) {
        switch (D) {
          case "left":
          case "right":
            return F.vnames;
          case "top":
          case "bottom":
            return F.hnames;
          case "fill":
            return F.names
        }
      }
      var q = this;
      if (q._children) {
        var s = i.debug >= 5,
          r = new F(0),
          t = new F(0),
          A = f.copyOwn(a.clientSize),
          x = i.BasePanel.orthogonalLength,
          v = i.BasePanel.relativeAnchor,
          y = i.BasePanel.parallelLength,
          z = {
            force: true,
            referenceSize: a.clientSize
          },
          w = [],
          B = [],
          H = {},
          K = 1,
          S = 2,
          J = 4,
          W = new F,
          V = false;
        s && q._group("CCC GRID LAYOUT clientSize = " +
          i.stringify(A));
        try {
          this._children.forEach(d);
          s && q._group("Phase 1 - Determine MARGINS and FILL SIZE from SIDE panels");
          try {
            B.forEach(e)
          } finally {
            if (s) {
              q._groupEnd();
              q._log("Final FILL margins = " + i.stringify(r));
              q._log("Final FILL border size = " + i.stringify(A))
            }
          }
          s && q._group("Phase 2 - Determine COMMON PADDINGS");
          try {
            c(9, b)
          } finally {
            if (s) {
              q._groupEnd();
              q._log("Final FILL clientSize = " + i.stringify({
                width: A.width - t.width,
                height: A.height - t.height
              }));
              q._log("Final COMMON paddings = " + i.stringify(t))
            }
          }
          a.gridMargins =
            new F(r);
          a.gridPaddings = new F(t);
          a.gridSize = new M(A)
        } finally {
          s && q._groupEnd()
        }
      }
    }
  });
  f.type("pvc.CartesianGridDockingPanel", i.GridDockingPanel).init(function(a, b, c) {
    this.base(a, b, c);
    this._plotBgPanel = new i.PlotBgPanel(a, this)
  }).add({
    _getExtensionId: function() {
      return !this.chart.parent ? "content" : "smallContent"
    },
    _createCore: function(a) {
      var b = this.chart,
        c = b.axes,
        d = c.x,
        e = c.y;
      if (d.option("Grid")) this.xGridRule = this._createGridRule(d);
      if (e.option("Grid")) this.yGridRule = this._createGridRule(e);
      this.base(a);
      b.focusWindow && this._createFocusWindow(a);
      if (b.compatVersion() <= 1 ? !!(d.option("EndLine") || e.option("EndLine")) : f.get(b.options, "plotFrameVisible", true)) this.pvFrameBar = this._createFrame(a, c);
      if (d.scaleType !== "discrete" && d.option("ZeroLine")) this.xZeroLine = this._createZeroLine(d, a);
      if (e.scaleType !== "discrete" && e.option("ZeroLine")) this.yZeroLine = this._createZeroLine(e, a)
    },
    _createGridRule: function(a) {
      var b = a.scale;
      if (!b.isNull) {
        var c = a.role.grouping.isDiscrete(),
          d = this._getAxisGridRootScene(a);
        if (d) {
          var e =
              this._layoutInfo.gridMargins,
            g = this._layoutInfo.gridPaddings,
            h = a.orientation === "x" ? "left" : "bottom",
            j = this.anchorLength(h),
            l = this.anchorOrtho(h),
            m = this.anchorOpposite(l),
            k = e[h] + g[h];
          g = e[l];
          e = e[m];
          d = d.leafs().array();
          var n = d.length;
          c && n && d.push(d[n - 1]);
          var o;
          if (this.compatVersion() <= 1) o = function(q) {
            return function(s) {
              return q.call(this, s.vars.tick.rawValue)
            }
          };
          a = (new i.visual.Rule(this, this.pvPanel, {
            extensionId: a.extensionPrefixes.map(function(q) {
              return q + "Grid"
            }),
            wrapper: o
          })).lock("data", d).lock(j,
              null).override("defaultColor", function() {
              return u.color("#f0f0f0")
            }).pvMark.lineWidth(1).antialias(true)[l](g)[m](e).zOrder(-12).events("none");
          if (c) {
            var p = b.range().step / 2;
            a.lock(h, function(q) {
              return k + b(q.vars.tick.value) + (this.index === n ? p : -p)
            })
          } else a.lock(h, function(q) {
            return k + b(q.vars.tick.value)
          });
          return a
        }
      }
    },
    _getAxisGridRootScene: function(a) {
      var b = this.data,
        c = a.isDiscrete();
      if (c) b = a.role.flatten(b, {
        visible: true
      });
      var d = new i.visual.CartesianAxisRootScene(null, {
        panel: this,
        source: b
      });
      c ? b._children.forEach(function(e) {
        new i.visual.CartesianAxisTickScene(d, {
          source: e,
          tick: e.value,
          tickRaw: e.rawValue,
          tickLabel: e.label
        })
      }) : (a.ticks || a.calcContinuousTicks()).forEach(function(e) {
        new i.visual.CartesianAxisTickScene(d, {
          tick: e,
          tickRaw: e,
          tickLabel: a.scale.tickFormat(e)
        })
      }, this);
      return d
    },
    _createFrame: function(a, b) {
      if (!(b.base.scale.isNull || b.ortho.scale.isNull && (!b.ortho2 || b.ortho2.scale.isNull))) {
        var c = a.gridMargins;
        a = c.left;
        b = c.right;
        var d = c.top;
        c = c.bottom;
        var e = [];
        if (this.compatVersion() <= 1) {
          e.push("xAxisEndLine");
          e.push("yAxisEndLine")
        }
        e.push("plotFrame");
        return (new i.visual.Panel(this, this.pvPanel, {
          extensionId: e
        })).pvMark.lock("left", a).lock("right", b).lock("top", d).lock("bottom", c).lock("fillStyle", null).events("none").strokeStyle("#666666").lineWidth(1).antialias(false).zOrder(-8)
      }
    },
    _createZeroLine: function(a, b) {
      var c = a.scale;
      if (!c.isNull) {
        var d = c.domain();
        if (d[0] * d[1] < -1.0E-12) {
          d = a.orientation === "x" ? "left" : "bottom";
          var e = this.anchorLength(d),
            g = this.anchorOrtho(d),
            h = this.anchorOpposite(g),
            j = b.gridMargins;
          b = j[d] + b.gridPaddings[d] + c(0);
          c = j[g];
          j = j[h];
          var l = new i.visual.Scene(null, {
            panel: this
          });
          return (new i.visual.Rule(this, this.pvPanel, {
            extensionId: a.extensionPrefixes.map(function(m) {
              return m + "ZeroLine"
            })
          })).lock("data", [l]).lock(e, null).lock(g, c).lock(h, j).lock(d, b).override("defaultColor", function() {
              return u.color("#666666")
            }).pvMark.events("none").lineWidth(1).antialias(true).zOrder(-9)
        }
      }
    },
    _createFocusWindow: function(a) {
      function b() {
        J[y] = 0 - w[q];
        J[z] = H + w[q] + w[A]
      }

      function c() {
        var E = arguments[arguments.length - 1].drag.phase === "end";
        g._selectingByRubberband = !E;
        C.render();
        G.render();
        var P = J[x],
          U = J[x] + J[v];
        if (!o) {
          var T = B - P;
          P = B - U;
          U = T
        }
        j._updatePosition(P, U, E, true)
      }

      function d(E, P) {
        var U = E.m,
          T = U[Q],
          aa, ba = J[R],
          ha;
        switch (P) {
          case "new":
            aa = 0;
            ha = "begin";
            break;
          case "resize-begin":
            aa = ba;
            ha = "begin";
            break;
          case "move":
            aa = ba;
            ha = "begin";
            break;
          case "resize-end":
            aa = T - J[Q];
            ha = "end";
            break
        }
        T = {
          type: P,
          target: ha,
          point: T,
          length: aa,
          length0: ba,
          min: E.min[Q],
          max: E.max[Q],
          minView: 0,
          maxView: B
        };
        j._constraintPosition(T);
        U[Q] = T.point;
        switch (P) {
          case "resize-begin":
            T.max = Math.min(T.max,
              J[Q] + J[R]);
            break;
          case "resize-end":
            T.min = Math.max(T.min, J[Q]);
            break
        }
        E.min[Q] = T.min;
        E.max[Q] = T.max
      }
      var e = this,
        g = e.topRoot,
        h = e.chart,
        j = h.focusWindow.base,
        l = j.axis,
        m = l.scale;
      if (!m.isNull) {
        var k = j.option("Resizable"),
          n = j.option("Movable");
        l = l.isDiscrete();
        var o = h.isOrientationVertical(),
          p = o ? "left" : "top",
          q = o ? "top" : "left",
          s = e.anchorOrthoLength(p),
          r = e.anchorOpposite(p),
          t = e.anchorOrthoLength(q),
          A = e.anchorOpposite(q),
          x = o ? "x" : "y",
          v = "d" + x,
          y = o ? "y" : "x",
          z = "d" + y;
        h = a.gridMargins;
        var w = a.gridPaddings;
        h = {
          left: h.left +
            w.left,
          right: h.right + w.right,
          top: h.top + w.top,
          bottom: h.bottom + w.bottom
        };
        h.width = h.left + h.right;
        h.height = h.top + h.bottom;
        a = a.clientSize;
        var B = a[s] - h[s],
          H = a[t] - h[t],
          K = w[p],
          S = w[r],
          J = new i.visual.Scene(null, {
            panel: this
          });
        a = l ? m.range().step : 0;
        l = a / 2;
        J[x] = m(j.begin) - l;
        J[v] = a + (m(j.end) - l) - J[x];
        b();
        var W = function(E) {
            return function() {
              return J[E]
            }
          },
          V = function() {
            return Math.max(0, Math.min(B, J[x]))
          },
          D = function() {
            var E = V(),
              P = J[x] + J[v];
            P = Math.max(0, Math.min(B, P));
            return P - E
          };
        m = function(E, P) {
          return (new i.visual.Bar(e,
            E, {
              extensionId: P,
              normalStroke: true,
              noHover: true,
              noSelect: true,
              noClick: true,
              noDoubleClick: true,
              noTooltip: true,
              showsInteraction: false
            })).pvMark.lock("data").lock("visible").lock(p, V).lock(s, D).lock(q, W(y)).lock(t, W(z)).lock(A).lock(r).sign
        };
        var C = this._plotBgPanel.pvPanel.borderPanel;
        C.lock("data", [J]);
        n && k ? C.paddingPanel.lock("events", "all").lock("cursor", "crosshair").event("mousedown", u.Behavior.select().autoRender(false).collapse(o ? "y" : "x").positionConstraint(function(E) {
            return d(E, E.phase === "start" ?
              "new" : "resize-end")
          })).event("selectstart", function(E) {
          b();
          c(E)
        }).event("select", c).event("selectend", c) : C.paddingPanel.events("all");
        a = m(C.paddingPanel, "focusWindowBg").override("defaultColor", function() {
          return i.invisibleFill
        }).pvMark;
        n ? a.lock("events", "all").lock("cursor", "move").event("mousedown", u.Behavior.drag().autoRender(false).collapse(o ? "y" : "x").positionConstraint(function(E) {
          d(E, "move")
        })).event("drag", c).event("dragend", c) : a.events("none");
        var G = (new i.visual.Panel(e, e.pvPanel)).pvMark.lock("data", [J]).lock("visible").lock("fillStyle", i.invisibleFill).lock("left", h.left).lock("right", h.right).lock("top", h.top).lock("bottom", h.bottom).lock("zOrder", 10).lock("events", function() {
          var E = J.drag;
          return E && E.phase !== "end" ? "all" : "none"
        }).lock("cursor", function() {
          var E = J.drag;
          return E && E.phase !== "end" ? E.type === "drag" || E.type === "select" && !k ? "move" : o ? "ew-resize" : "ns-resize" : null
        }).antialias(false);
        (new i.visual.Bar(e, G, {
          extensionId: "focusWindowBaseCurtain",
          normalStroke: true,
          noHover: true,
          noSelect: true,
          noClick: true,
          noDoubleClick: true,
          noTooltip: true,
          showsInteraction: false
        })).override("defaultColor", function(E) {
            return E === "stroke" ? null : "rgba(20, 20, 20, 0.1)"
          }).pvMark.lock("data", [J, J]).lock("visible").lock("events", "none").lock(p, function() {
            return !this.index ? -K : V() + D()
          }).lock(r, function() {
            return !this.index ? null : -S
          }).lock(s, function() {
            return !this.index ? K + V() : null
          }).lock(q, W(y)).lock(t, W(z)).lock(A);
        var N = m(G, "focusWindow").override("defaultColor", function() {
          return null
        }).pvMark.lock("events", "none");
        n = function(E) {
          var P = E === "left" || E === "top" ? "begin" : "end",
            U = "linear-gradient(to " + e.anchorOpposite(E) + ", rgba(20, 20, 20, 0.1), #444 90%)",
            T = (new i.visual.Bar(e, N.anchor(E), {
              extensionId: j.id + "Grip" + f.firstUpperCase(P),
              normalStroke: true,
              noHover: true,
              noSelect: true,
              noClick: true,
              noDoubleClick: true,
              noTooltip: true,
              showsInteraction: false
            })).override("defaultColor", function(ba) {
                return ba === "stroke" ? null : U
              }).pvMark.lock("data").lock("visible")[q](J[y])[t](J[z]);
          if (k) {
            var aa = "resize-" + P;
            T.lock("events", "all")[s](5).cursor(o ?
                "ew-resize" : "ns-resize").event("mousedown", u.Behavior.resize(E).autoRender(false).positionConstraint(function(ba) {
                d(ba, aa)
              }).preserveOrtho(true)).event("resize", c).event("resizeend", c)
          } else T.events("none")[s](1);
          return T
        };
        n(p);
        n(r);
        var Q = x,
          R = v
      }
    },
    _getDatumsOnRect: function(a, b, c) {
      var d = this.chart,
        e = d.axesPanels.x,
        g = d.axesPanels.y,
        h, j;
      if (e) {
        h = new f.Map;
        e._getDatumsOnRect(h, b, c);
        h.count || (h = null)
      }
      if (g) {
        j = new f.Map;
        g._getOwnDatumsOnRect(j, b, c);
        j.count || (j = null)
      }
      if (h && j) {
        h.intersect(j, a);
        c.toggle = true
      } else if (h) a.copy(h);
      else j ? a.copy(j) : d.plotPanelList.forEach(function(l) {
          l._getDatumsOnRect(a, b, c)
        }, this)
    }
  });
  f.type("pvc.CartesianAbstractPanel", i.PlotPanel).init(function(a, b, c, d) {
    function e(n) {
      j[n.type] = n;
      j[n.orientedId] = n;
      if (n.v1SecondOrientedId) j[n.v1SecondOrientedId] = n
    }

    function g(n, o) {
      var p = l[n];
      if (p == null || o > p) {
        m = true;
        l[n] = o
      }
    }

    function h(n) {
      var o = n && n.option("Offset");
      if (o != null && o > 0 && o < 1)
        if (n.orientation === "x") {
          g("left", o);
          g("right", o)
        } else {
          g("top", o);
          g("bottom", o)
        }
    }
    this.base(a, b, c, d);
    var j = this.axes;
    e(a._getAxis("base",
      c.option("BaseAxis") - 1));
    e(a._getAxis("ortho", c.option("OrthoAxis") - 1));
    var l = {},
      m = false,
      k = a.axesByType;
    ["base", "ortho"].forEach(function(n) {
      (n = k[n]) && n.forEach(h)
    });
    if (m) this.offsetPaddings = l
  }).add({
    offsetPaddings: null,
    _calcLayout: function(a) {
      a.requestPaddings = this._calcRequestPaddings(a)
    },
    _calcRequestPaddings: function(a) {
      var b, c = this.offsetPaddings;
      if (c) {
        var d = this.chart._getAxesRoundingPaddings(),
          e = a.clientSize,
          g = a.paddings;
        F.names.forEach(function(h) {
          var j = i.BasePanel.orthogonalLength[h],
            l = e[j];
          j = l + g[j];
          if (!d[h + "Locked"]) {
            j = j * (c[h] || 0);
            l = l * (d[h] || 0);
            (b || (b = {}))[h] = Math.max(j - l, 0)
          }
        }, this)
      }
      return b
    },
    _createCore: function() {
      this.pvPanel.zOrder(-10);
      var a = this.chart.options.leafContentOverflow || "auto";
      (a === "auto" ? f.query(["ortho", "base"]).select(function(b) {
        return this.axes[b]
      }, this).any(function(b) {
        return b.option("FixedMin") != null || b.option("FixedMax") != null
      }) : a === "hidden") && this.pvPanel.borderPanel.overflow("hidden")
    }
  });
  f.type("pvc.PlotBgPanel", i.BasePanel).init(function(a, b, c) {
    this.base(a,
      b, c)
  }).add({
    anchor: "fill",
    _getExtensionId: function() {
      return "plotBg"
    },
    _createCore: function(a) {
      this.pvPanel.borderPanel.lock("zOrder", -13).antialias(false);
      this.base(a)
    }
  });
  f.type("pvc.CategoricalAbstract", i.CartesianAbstract).init(function(a) {
    this.base(a);
    if (a = this.parent) this._catRole = a._catRole
  }).add({
    _initVisualRoles: function() {
      this.base();
      this._catRole = this._addVisualRole("category", this._getCategoryRoleSpec())
    },
    _getCategoryRoleSpec: function() {
      return {
        isRequired: true,
        defaultDimension: "category*",
        autoCreateDimension: true
      }
    },
    _generateTrendsDataCellCore: function(a, b, c) {
      function d(s) {
        var r = n ? null : function(v) {
            return v.atoms[k].value
          },
          t = function(v) {
            if ((v = p._childrenByKey[v.key]) && s) v = v._childrenByKey[s.key];
            return v ? v.dimensions(m).sum(o) : null
          };
        r = f.create(j, {
          rows: f.query(q),
          x: r,
          y: t
        });
        var A = c.model(r),
          x = p.owner.dimensions(l).intern(this.root._firstTrendAtomProto);
        A && q.forEach(function(v, y) {
          y = A.sample(n ? y : v.atoms[k].value, t(v), y);
          if (y != null) {
            var z = p._childrenByKey[v.key];
            v = z || v;
            if (s)
              if (z = z && z._childrenByKey[s.key]) z =
                Object.create(z._datums[0].atoms);
              else {
                z = Object.create(v._datums[0].atoms);
                f.copyOwn(z, s.atoms)
              } else z = Object.create(v._datums[0].atoms);
            z[m] = y;
            z[l] = x;
            a.push(f.set(new i.data.Datum(v.owner, z), "isVirtual", true, "isTrend", true, "trendType", c.type))
          }
        }, this)
      }
      var e = this._serRole,
        g = this._catRole,
        h = b.role,
        j = b.trend;
      this._warnSingleContinuousValueRole(h);
      var l = this._dataPartRole.firstDimensionName(),
        m = h.firstDimensionName(),
        k, n = g.isDiscrete();
      n || (k = g.firstDimensionName());
      var o = {
        zeroIfNone: false
      };
      h = {
        ignoreNulls: false
      };
      var p = this.visibleData(b.dataPartValue);
      b = this.visibleData(null, h);
      var q = g.flatten(b, h)._children;
      f.scope(function() {
        return e && e.isBound() ? e.flatten(p).children() : f.query([null])
      }).each(d, this)
    },
    _interpolateDataCell: function(a) {
      var b = a.nullInterpolationMode;
      if (b) {
        var c;
        switch (a.nullInterpolationMode) {
          case "linear":
            c = i.data.LinearInterpolationOper;
            break;
          case "zero":
            c = i.data.ZeroInterpolationOper;
            break;
          case "none":
            break;
          default:
            throw f.error.argumentInvalid("nullInterpolationMode", "" + b);
        }
        if (c) {
          this._warnSingleContinuousValueRole(a.role);
          b = this.visibleData(a.dataPartValue);
          if (b.childCount() > 0) {
            var d = this.visibleData(null, {
              ignoreNulls: false
            });
            (new c(d, b, this._catRole, this._serRole, a.role, true)).interpolate()
          }
        }
      }
    },
    _createVisibleData: function(a, b) {
      var c = this._serRole && this._serRole.flattenedGrouping(),
        d = this._catRole.flattenedGrouping();
      a = this.partData(a);
      var e = f.get(b, "ignoreNulls");
      b = f.get(b, "inverted", false);
      e = {
        visible: true,
        isNull: e ? false : null
      };
      return c ? a.groupBy(b ? [c, d] : [d, c], e) : a.groupBy(d, e)
    },
    _getContinuousVisibleCellExtent: function(a,
                                              b) {
      var c = b.role;
      switch (c.name) {
        case "series":
        case "category":
          return this.base(a, b)
      }
      this._warnSingleContinuousValueRole(c);
      var d = b.dataPartValue,
        e = c.firstDimensionName();
      c = this.visibleData(d);
      var g = a.scaleUsesAbs();
      if (a.type !== "ortho" || !b.isStacked) return c.leafs().select(function(h) {
        h = h.dimensions(e).sum();
        return g && h < 0 ? -h : h
      }).range();
      return c.children().select(function(h) {
        var j = this._getStackedCategoryValueExtent(h, e, g);
        if (j) return {
          range: j,
          group: h
        }
      }, this).where(f.notNully).reduce(function(h, j) {
          return this._reduceStackedCategoryValueExtent(h,
            j.range, j.group)
        }.bind(this), null)
    },
    _getStackedCategoryValueExtent: function(a, b, c) {
      var d = null,
        e = null;
      a.children().select(function(g) {
        g = g.dimensions(b).sum();
        return c && g < 0 ? -g : g
      }).each(function(g) {
        if (g != null)
          if (g >= 0) d += g;
          else e += g
      });
      if (d == null && e == null) return null;
      return {
        max: d || 0,
        min: e || 0
      }
    },
    _reduceStackedCategoryValueExtent: function(a, b) {
      return i.unionExtents(a, b)
    },
    _coordinateSmallChartsLayout: function(a) {
      this.base(a);
      var b = 0,
        c, d = null,
        e = {};
      this.children.forEach(function(g) {
        g.basePanel.layout();
        var h,
          j = g.titlePanel;
        if (j) {
          c || (c = j.anchorOrthoLength());
          h = j[c];
          if (h > b) b = h
        }
        var l = g.axesPanels;
        d || (d = f.query(f.ownKeys(l)).where(function(m) {
          return m === l[m].axis.id
        }).select(function(m) {
          e[m] = {
            axis: 0,
            title: 0
          };
          return m
        }).array());
        d.forEach(function(m) {
          var k = l[m];
          m = e[m];
          var n = k.axis.orientation === "x" ? "height" : "width";
          h = k[n];
          if (h > m.axis) m.axis = h;
          if (k = k.titlePanel) {
            h = k[n];
            if (h > m.title) m.title = h
          }
        })
      }, this);
      this.children.forEach(function(g) {
        if (b > 0) {
          var h = g.titlePanel;
          h.size = h.size.clone().set(c, b)
        }
        var j = g.axesPanels;
        d.forEach(function(l) {
          var m = j[l];
          l = e[l];
          var k = m.axis.orientation === "x" ? "height" : "width";
          m.size = m.size.clone().set(k, l.axis);
          if (m = m.titlePanel) m.size = m.size.clone().set(k, l.title)
        });
        g.basePanel.invalidateLayout()
      }, this)
    },
    defaults: {
      orthoAxisOrdinal: false
    }
  });
  f.type("pvc.CategoricalAbstractPanel", i.CartesianAbstractPanel).init(function(a, b, c, d) {
    this.base(a, b, c, d);
    this.stacked = c.option("Stacked")
  });
  f.type("pvc.AxisPanel", i.BasePanel).init(function(a, b, c, d) {
    d = f.create(d, {
      anchor: c.option("Position")
    });
    var e =
      d.anchor || this.anchor;
    this.axis = c;
    this.base(a, b, d);
    this.roleName = c.role.name;
    this.isDiscrete = c.role.isDiscrete();
    this._extensionPrefix = c.extensionPrefixes;
    if (this.labelSpacingMin == null) this.labelSpacingMin = this.isDiscrete ? 0.25 : 1.5;
    if (this.showTicks == null) this.showTicks = !this.isDiscrete;
    if (d.font === undefined)
      if (a = this._getConstantExtension("label", "font")) this.font = a;
    if (d.tickLength === undefined) {
      d = +this._getConstantExtension("ticks", this.anchorOrthoLength(e));
      if (!isNaN(d) && isFinite(d)) this.tickLength =
        d
    }
  }).add({
    pvRule: null,
    pvTicks: null,
    pvLabel: null,
    pvRuleGrid: null,
    pvScale: null,
    isDiscrete: false,
    roleName: null,
    axis: null,
    anchor: "bottom",
    tickLength: 6,
    scale: null,
    ruleCrossesMargin: true,
    font: "9px sans-serif",
    labelSpacingMin: null,
    desiredTickCount: null,
    showMinorTicks: true,
    showTicks: null,
    hiddenLabelText: "\u00b7",
    _isScaleSetup: false,
    _createLogInstanceId: function() {
      return this.base() + " - " + this.axis.id
    },
    getTicks: function() {
      return this._layoutInfo && this._layoutInfo.ticks
    },
    _calcLayout: function(a) {
      var b = this.axis.scale;
      if (!this._isScaleSetup) {
        this.scale = this.pvScale = b;
        this.extend(b, "scale");
        this._isScaleSetup = true
      }
      if (b.isNull) a.axisSize = 0;
      else this._calcLayoutCore(a);
      return this.createAnchoredSize(a.axisSize, a.clientSize)
    },
    _calcLayoutCore: function(a) {
      var b = a.desiredClientSize[this.anchorOrthoLength()];
      a.axisSize = b;
      if (this.isDiscrete && this.useCompositeAxis) {
        if (a.axisSize == null) a.axisSize = 50
      } else {
        this._readTextProperties(a);
        this._calcTicks();
        if (this.scale.type === "discrete") this._tickIncludeModulo = this._calcDiscreteTicksIncludeModulo();
        this._calcAxisSizeFromLabel(a);
        if (a.axisSize == null) a.axisSize = a.requiredAxisSize;
        this._calcMaxTextLengthThatFits();
        this._calcOverflowPaddings()
      }
    },
    _calcAxisSizeFromLabel: function(a) {
      this._calcTicksLabelBBoxes(a);
      this._calcAxisSizeFromLabelBBox(a)
    },
    _readTextProperties: function(a) {
      var b = this._getExtension("label", "textAngle");
      a.isTextAngleFixed = b != null;
      a.textAngle = f.number.as(b, 0);
      a.textMargin = f.number.as(this._getExtension("label", "textMargin"), 3);
      b = this._getExtension("label", "textAlign");
      if (typeof b !==
        "string") b = this.isAnchorTopOrBottom() ? "center" : this.anchor == "left" ? "right" : "left";
      a.textAlign = b;
      b = this._getExtension("label", "textBaseline");
      if (typeof b !== "string") switch (this.anchor) {
        case "right":
        case "left":
        case "center":
          b = "middle";
          break;
        case "bottom":
          b = "top";
          break;
        default:
          b = "bottom"
      }
      a.textBaseline = b
    },
    _calcAxisSizeFromLabelBBox: function(a) {
      var b = a.maxLabelBBox,
        c = this.tickLength + this._getLabelBBoxQuadrantLength(b, this.anchor);
      b.sourceAngle === 0 && this.isAnchorTopOrBottom() || (c += this.tickLength);
      a.requiredAxisSize =
        c
    },
    _getLabelBBoxQuadrantLength: function(a, b) {
      var c;
      switch (b) {
        case "left":
          c = -a.x;
          break;
        case "right":
          c = a.x2;
          break;
        case "top":
          c = -a.y;
          break;
        case "bottom":
          c = a.y2;
          break
      }
      return Math.max(c, 0)
    },
    _calcOverflowPaddings: function() {
      if (this._layoutInfo.canChange) this._calcOverflowPaddingsFromLabelBBox();
      else i.debug >= 2 && this._warn("Layout cannot change. Skipping calculation of overflow paddings.")
    },
    _calcOverflowPaddingsFromLabelBBox: function() {
      var a = null,
        b = this,
        c = b._layoutInfo,
        d = c.ticks;
      if (d.length) {
        var e = c.ticksBBoxes,
          g = c.paddings,
          h = b.isAnchorTopOrBottom(),
          j = h ? "left" : "bottom",
          l = h ? "right" : "top",
          m = b.scale,
          k = m.type === "discrete",
          n = c.clientSize[b.anchorLength()];
        this.axis.setScaleRange(n);
        var o = function(p, q, s, r) {
          p = b._getLabelBBoxQuadrantLength(p, q);
          if (p > 1) {
            r = m(k ? d[r].value : d[r]);
            r = s ? r - p : r + p;
            s = Math.max(0, s ? -r : r - n);
            if (s > 1) {
              s -= g[q] || 0;
              if (s > 1) {
                if (k) s *= 1.05;
                if (a) {
                  r = a[q];
                  if (r == null || r < s) a[q] = s
                } else a = f.set({}, q, s)
              }
            }
          }
        };
        e.forEach(function(p, q) {
          o(p, j, true, q);
          o(p, l, false, q)
        });
        i.debug >= 6 && a && b._log("OverflowPaddings = " + i.stringify(a))
      }
      c.overflowPaddings =
        a
    },
    _calcMaxTextLengthThatFits: function() {
      var a = this._layoutInfo;
      if (this.compatVersion() <= 1) a.maxTextWidth = null;
      else {
        var b = a.clientSize[this.anchorOrthoLength()],
          c = Math.min(a.axisSize, b);
        if (c >= a.requiredAxisSize - this.tickLength) a.maxTextWidth = null;
        else {
          b = a.maxLabelBBox;
          c = c - 2 * this.tickLength;
          var d, e;
          switch (this.anchor) {
            case "left":
              e = u.vector(0, 1);
              d = u.vector(-c, 0);
              break;
            case "right":
              e = u.vector(0, 1);
              d = u.vector(c, 0);
              break;
            case "top":
              e = u.vector(1, 0);
              d = u.vector(0, -c);
              break;
            case "bottom":
              e = u.vector(1, 0);
              d = u.vector(0, c);
              break
          }
          var g = d.norm(),
            h = b.source.points(),
            j = h[0],
            l = h[1],
            m = h[2];
          h = h[3];
          var k = m.minus(h),
            n = l.minus(j),
            o = u.SvgScene.lineIntersect;
          n = o(d, e, j, n);
          d = o(d, e, h, k);
          o = e = b.sourceTextWidth;
          var p = n.minus(j),
            q = p.length();
          if (q <= e && p.dot(k) >= 0) o = j.dot(g) < l.dot(g) ? q : n.minus(l).length();
          j = d.minus(h);
          l = j.length();
          if (l <= e && j.dot(k) >= 0) o = h.dot(g) < m.dot(g) ? Math.min(o, l) : Math.min(o, d.minus(m).length());
          if (b.sourceAlign === "center") o -= e - o;
          a.maxTextWidth = o;
          i.debug >= 3 && this._log("Trimming labels' text at length " +
            o.toFixed(2) + "px maxOrthoLength=" + c.toFixed(2) + "px")
        }
      }
    },
    _calcTicks: function() {
      var a = this._layoutInfo;
      a.textHeight = u.Text.fontHeight(this.font) * 2 / 3;
      a.maxTextWidth = null;
      this.axis.setTicks(null);
      switch (this.scale.type) {
        case "discrete":
          this._calcDiscreteTicks();
          break;
        case "timeSeries":
          this._calcTimeSeriesTicks();
          break;
        case "numeric":
          this._calcNumberTicks(a);
          break;
        default:
          throw f.error.operationInvalid("Undefined axis scale type");
      }
      this.axis.setTicks(a.ticks);
      this.axis.setScaleRange(a.clientSize[this.anchorLength()]);
      a.maxTextWidth == null && this._calcTicksTextLength(a)
    },
    _calcDiscreteTicks: function() {
      var a = this._layoutInfo,
        b = this.axis.role,
        c = b.flatten(this.data, {
          visible: true
        });
      a.data = c;
      a.ticks = c._children;
      var d, e;
      b = b.grouping;
      if (b.isSingleDimension && (e = b.firstDimensionType()) && e.valueType === Date)
        if ((e = c.dimensions(e.name).extent()) && e.min !== e.max) {
          var g = new u.Scale.linear(e.min.value, e.max.value);
          g.ticks();
          (d = this.axis.option("TickFormatter")) && g.tickFormatter(d);
          d = function(h) {
            return g.tickFormat(h.value)
          }
        }
      d || (d =
        function(h) {
          return h.absLabel
        });
      a.ticksText = c._children.map(d);
      this._clearTicksTextDeps(a)
    },
    _clearTicksTextDeps: function(a) {
      a.maxTextWidth = a.ticksTextLength = a.ticksBBoxes = null
    },
    _calcTimeSeriesTicks: function() {
      this._calcContinuousTicks(this._layoutInfo)
    },
    _calcNumberTicks: function() {
      var a = this.desiredTickCount;
      if (a == null) {
        if (this.isAnchorTopOrBottom()) {
          this._calcNumberHTicks();
          return
        }
        a = this._calcNumberVDesiredTickCount()
      }
      this._calcContinuousTicks(this._layoutInfo, a)
    },
    _calcContinuousTicks: function(a,
                                   b) {
      this._calcContinuousTicksValue(a, b);
      this._calcContinuousTicksText(a)
    },
    _calcContinuousTicksValue: function(a, b) {
      a.ticks = this.axis.calcContinuousTicks(b);
      if (i.debug > 4) {
        this._log("DOMAIN: " + i.stringify(this.scale.domain()));
        this._log("TICKS:  " + i.stringify(a.ticks))
      }
    },
    _calcContinuousTicksText: function(a) {
      var b = a.ticksText = a.ticks.map(function(c) {
        return this.scale.tickFormat(c)
      }, this);
      this._clearTicksTextDeps(a);
      return b
    },
    _calcTicksTextLength: function(a) {
      var b = 0,
        c = this.font,
        d = a.ticksText || this._calcContinuousTicksText(a);
      d = a.ticksTextLength = d.map(function(e) {
        e = u.Text.measure(e, c).width;
        if (e > b) b = e;
        return e
      });
      a.maxTextWidth = b;
      a.ticksBBoxes = null;
      return d
    },
    _calcTicksLabelBBoxes: function(a) {
      var b = this,
        c = b._layoutInfo,
        d = a.ticksTextLength || b._calcTicksTextLength(a),
        e, g = c.maxTextWidth;
      a.ticksBBoxes = d.map(function(h) {
        var j = b._calcLabelBBox(h);
        if (!e && h === g) e = j;
        return j
      }, b);
      c.maxLabelBBox = e
    },
    _calcLabelBBox: function(a) {
      var b = this._layoutInfo;
      return i.text.getLabelBBox(a, b.textHeight, b.textAlign, b.textBaseline, b.textAngle, b.textMargin)
    },
    _calcDiscreteTicksIncludeModulo: function() {
      var a = this.axis.option("OverlappedLabelsMode");
      if (a !== "hide" && a !== "rotatethenhide") return 1;
      var b = this._layoutInfo;
      a = b.ticks.length;
      if (a <= 2) return 1;
      var c = this.scale.range().step,
        d = b.textHeight,
        e = b.maxTextWidth;
      if (!(e > 0 && d > 0 && c > 0)) return 1;
      var g = d * this.labelSpacingMin,
        h = u.Text.measure("x", this.font).width + g,
        j = b.textAngle,
        l = this.isAnchorTopOrBottom();
      b = Math.abs(Math[l ? "sin" : "cos"](j));
      j = Math.abs(Math[l ? "cos" : "sin"](j));
      d = b < 1.0E-8 ? Infinity : Math.ceil((g + d) /
        (c * b));
      c = j < 1.0E-8 ? Infinity : Math.ceil((h + e) / (c * j));
      c = Math.min(d, c);
      if (!isFinite(c) || c < 1 || Math.ceil(a / c) < 2) c = 1;
      c > 1 && i.debug >= 3 && this._info("Showing only one in every " + c + " tick labels");
      return c
    },
    _tickMultipliers: [1, 2, 5, 10],
    _calcNumberVDesiredTickCount: function() {
      var a = this._layoutInfo,
        b = a.textHeight * (1 + Math.max(0, this.labelSpacingMin));
      a = a.clientSize[this.anchorLength()];
      a = Math.max(1, ~~(a / b));
      if (a <= 1) return 1;
      b = this.scale.domain();
      b = b[1] - b[0];
      if (b <= 0) return a;
      a = b / a;
      var c = Math.floor(u.log(a, 10));
      c =
        Math.pow(10, c);
      for (var d, e = this._tickMultipliers, g = 0; g < e.length; g++) {
        d = e[g] * c;
        if (d >= a) break
      }
      return Math.max(1, Math.floor(b / d))
    },
    _calcNumberHTicks: function() {
      var a = this._layoutInfo,
        b = a.clientSize[this.anchorLength()],
        c = a.textHeight * Math.max(0, this.labelSpacingMin),
        d = this._calcNumberHDesiredTickCount(c),
        e = i.debug >= 7,
        g, h, j, l, m;
      do {
        e && this._log("calculateNumberHTicks TickCount IN desired = " + d);
        j = {};
        this._calcContinuousTicksValue(j, d);
        var k = j.ticks,
          n = k.length;
        if (k.exponentOverflow)
          if (g == null)
            if (k.exponent ===
              this.exponentMin) {
              l = j;
              g = 1
            } else {
              m = j;
              g = -1
            } else {
            if (g === 1) {
              if (l) j = l
            } else if (m) j = m;
            break
          } else if (h == null || n !== h) {
          e && this._log("calculateNumberHTicks TickCount desired/resulting = " + d + " -> " + n);
          h = n;
          this._calcContinuousTicksText(j);
          var o = this._calcNumberHLength(j, c),
            p = j.excessLength = o - b,
            q = j.error = Math.abs(p / b);
          if (e) {
            this._log("calculateNumberHTicks error=" + (p >= 0 ? "+" : "-") + (j.error * 100).toFixed(0) + "% count=" + n + " step=" + k.step);
            this._log("calculateNumberHTicks Length client/resulting = " + b + " / " + o + " spacing = " +
              c)
          }
          if (p > 0) {
            if (d === 1) {
              if (n === 3 && q <= 1) {
                j.ticks.splice(1, 1);
                j.ticksText.splice(1, 1);
                j.ticks.step *= 2
              } else {
                j.ticks.length = 1;
                j.ticksText.length = 1
              }
              delete j.maxTextWidth;
              break
            }
            if (l) {
              j = l;
              break
            }
            m = j;
            g = -1
          } else {
            if (q <= 0.05 || g === -1) break;
            l = j;
            g = +1
          }
        }
        d += g
      } while (1);
      if (j) {
        a.ticks = j.ticks;
        a.ticksText = j.ticksText;
        a.maxTextWidth = j.maxTextWidth;
        if (i.debug >= 5) this._log("calculateNumberHTicks RESULT error=" + (j.excessLength >= 0 ? "+" : "-") + (j.error * 100).toFixed(0) + "% count=" + j.ticks.length + " step=" + j.ticks.step)
      }
      e && this._log("calculateNumberHTicks END")
    },
    _calcNumberHDesiredTickCount: function(a) {
      var b = this._layoutInfo,
        c = this.scale.domain().map(function(d) {
          d = +d.toFixed(2);
          d = this.scale.tickFormat(d);
          return u.Text.measure(d, this.font).width
        }, this);
      c = Math.max((c[1] + c[0]) / 2, b.textHeight);
      b = b.clientSize[this.anchorLength()];
      return Math.max(1, ~~(b / (c + a)))
    },
    _calcNumberHLength: function(a, b) {
      a = a.ticksText;
      var c = f.query(a).select(function(d) {
        return u.Text.measure(d, this.font).width
      }, this).max();
      return Math.max(c, (a.length - 1) * (c + b))
    },
    _createCore: function() {
      if (!this.scale.isNull) {
        var a =
            this._layoutInfo.clientSize,
          b = this._layoutInfo.paddings,
          c = this.anchorOrtho(),
          d = this.anchorOpposite(c),
          e = this.anchorOrthoLength(c),
          g = this.ruleCrossesMargin ? -b[c] : 0;
        this._rSize = a = a[e] + (this.ruleCrossesMargin ? b[d] : 0) - g;
        b = this._getRootScene();
        this.pvRule = (new i.visual.Rule(this, this.pvPanel, {
          extensionId: "rule"
        })).lock("data", [b]).override("defaultColor", f.fun.constant("#666666")).lock(this.anchorOpposite(), 0).lock(c, g).lock(e, a).pvMark.zOrder(30).strokeDasharray(null).lineCap("square");
        if (this.isDiscrete) this.useCompositeAxis ?
          this.renderCompositeOrdinalAxis() : this.renderOrdinalAxis();
        else this.renderLinearAxis()
      }
    },
    _getExtensionId: function() {
      return ""
    },
    _getRootScene: function() {
      if (!this._rootScene) {
        var a = this._rootScene = new i.visual.CartesianAxisRootScene(null, {
            panel: this,
            source: this._getRootData()
          }),
          b = this._layoutInfo,
          c = b.ticks,
          d = b.ticksText;
        if (this.isDiscrete)
          if (this.useCompositeAxis) this._buildCompositeScene(a);
          else {
            var e = this._tickIncludeModulo;
            b = this.hiddenLabelText;
            a.vars.tickIncludeModulo = e;
            a.vars.hiddenLabelText =
              b;
            var g, h, j, l;
            if (e > 2) {
              var m = a.group.owner.keySep;
              j = function() {
                var k = g.map(function(o) {
                    return o.key
                  }).join(m),
                  n = h.slice(0, 10).join(", ") + (h.length > 10 ? ", ..." : "");
                (new i.visual.CartesianAxisTickScene(a, {
                  source: g,
                  tick: k,
                  tickRaw: k,
                  tickLabel: n,
                  isHidden: true
                })).dataIndex = l;
                g = h = l = null
              }
            }
            c.forEach(function(k, n) {
              var o = n % e !== 0;
              if (o && e > 2) {
                if (l == null) l = n;
                (g || (g = [])).push(k);
                (h || (h = [])).push(d[n])
              } else {
                g && j();
                (new i.visual.CartesianAxisTickScene(a, {
                  source: k,
                  tick: k.value,
                  tickRaw: k.rawValue,
                  tickLabel: d[n],
                  isHidden: o
                })).dataIndex =
                  n
              }
            });
            g && j()
          } else c.forEach(function(k, n) {
          (new i.visual.CartesianAxisTickScene(a, {
            tick: k,
            tickRaw: k,
            tickLabel: d[n]
          })).dataIndex = n
        }, this)
      }
      return this._rootScene
    },
    _buildCompositeScene: function(a) {
      function b(d) {
        var e = d.group;
        if (c) {
          var g = d.vars.tick;
          d.nodeValue = d.value = g.rawValue;
          d.nodeLabel = d.label = g.label
        }
        e.childCount() && e.children().each(function(h) {
          var j = new i.visual.CartesianAxisTickScene(d, {
            source: h,
            tick: h.value,
            tickRaw: h.rawValue,
            tickLabel: h.label
          });
          j.dataIndex = h.childIndex();
          b(j)
        })
      }
      var c = this.compatVersion() <=
        1;
      a.vars.tick = new I("", "");
      b(a)
    },
    _getRootData: function() {
      var a = this.chart,
        b = a.data;
      if (this.isDiscrete && this.useCompositeAxis) {
        var c = this.anchor;
        b = a.visualRoles[this.roleName].select(b, {
          visible: true,
          reverse: c == "bottom" || c == "left"
        })
      }
      return b
    },
    renderOrdinalAxis: function() {
      var a = this.scale,
        b = this.hiddenLabelText,
        c = this._tickIncludeModulo * a.range().step / 2,
        d = this.anchorOpposite(),
        e = this.anchorLength(),
        g = this.anchorOrtho(),
        h = this.anchorOrthoLength(),
        j = this.pvRule,
        l = this._getRootScene(),
        m = this._layoutInfo,
        k = this.compatVersion() <= 1,
        n;
      if (k) {
        var o = function(s) {
          this.value = this.absValue = s.rawValue;
          this.path = (this.nodeName = "" + (this.value || "")) ? [this.nodeName] : [];
          this.label = this.absLabel = s.label
        };
        o.prototype.toString = function() {
          return "" + this.value
        };
        n = function(s) {
          return function(r) {
            var t = Object.create(this);
            t.index = this.parent.index;
            return s.call(t, new o(r.vars.tick))
          }
        }
      }
      l = (new i.visual.Panel(this, this.pvPanel, {
        extensionId: "ticksPanel"
      })).lock("data", l.childNodes).lock(d, 0).lockMark(g, function(s) {
          return s.isHidden ?
            a(s.previousSibling.vars.tick.value) + c : a(s.vars.tick.value)
        }).lock("strokeDasharray", null).lock("strokeStyle", null).lock("fillStyle", null).lock("lineWidth", 0).pvMark.zOrder(20);
      if (k || this.showTicks) this.pvTicks = (new i.visual.Rule(this, l, {
        extensionId: "ticks",
        wrapper: n
      })).lock("data").intercept("visible", function() {
          return !this.scene.isHidden && this.delegateExtension(true)
        }).optional("lineWidth", 1).lock(d, 0).lock(g, 0).lock(e, null).optional(h, this.tickLength * 2 / 3).override("defaultColor", function() {
          if (k) return u.Color.names.transparent;
          return j.scene ? j.scene[0].strokeStyle : "#666666"
        }).pvMark;
      var p = this.font,
        q = this._layoutInfo.maxTextWidth;
      isFinite(q) || (q = 0);
      this.pvLabel = (new i.visual.Label(this, l, {
        extensionId: "label",
        showsInteraction: true,
        noClick: false,
        noDoubleClick: false,
        noSelect: false,
        noTooltip: false,
        noHover: false,
        wrapper: n
      })).intercept("visible", function(s) {
          return !s.isHidden ? this.delegateExtension(true) : !!s.vars.hiddenLabelText
        }).intercept("text", function(s) {
          var r;
          if (s.isHidden) r = b;
          else {
            r = this.delegateExtension();
            if (r === undefined) r =
              s.vars.tick.label;
            if (q && (!this.showsInteraction() || !this.scene.isActive)) r = i.text.trimToWidthB(q, r, p, "..", false)
          }
          return r
        }).pvMark.zOrder(40).lock(d, this.tickLength).lock(g, 0).font(p).textStyle("#666666").textAlign(m.textAlign).textBaseline(m.textBaseline);
      this._debugTicksPanel(l)
    },
    _getTooltipFormatter: function(a) {
      if (this.axis.option("TooltipEnabled")) {
        a.gravity = this._calcTipsyGravity();
        var b = this.axis.option("TooltipFormat");
        if (b) return function(d) {
          return b.call(d, d.scene)
        };
        var c = this.axis.option("TooltipAutoContent");
        if (c === "summary") return this._summaryTooltipFormatter;
        if (c === "value") {
          a.isLazy = false;
          return function(d) {
            return d.scene.vars.tick.label
          }
        }
      }
    },
    _debugTicksPanel: function(a) {
      if (i.debug >= 16) {
        var b = this._layoutInfo,
          c = b.ticksBBoxes || this._calcTicksLabelBBoxes(b);
        a.add(u.Panel)[this.anchorOpposite()](this.tickLength)[this.anchorOrtho()](0)[this.anchorLength()](0)[this.anchorOrthoLength()](0).fillStyle(null).strokeStyle(null).lineWidth(0).visible(function(d) {
          return !d.isHidden
        }).add(u.Line).data(function(d) {
          d =
            c[d.dataIndex].source.points();
          if (d.length > 1) d = d.concat(d[0]);
          return d
        }).left(function(d) {
          return d.x
        }).top(function(d) {
          return d.y
        }).strokeStyle("red").lineWidth(0.5).strokeDasharray("-")
      }
    },
    renderLinearAxis: function() {
      var a = this.scale,
        b = this.pvRule,
        c = this.anchorOpposite(),
        d = this.anchorLength(),
        e = this.anchorOrtho(),
        g = this.anchorOrthoLength(),
        h = this._getRootScene(),
        j;
      if (this.compatVersion() <= 1) j = function(n) {
        return function(o) {
          var p = Object.create(this);
          p.index = this.parent.index;
          return n.call(p, o.vars.tick.rawValue)
        }
      };
      h = (new i.visual.Panel(this, this.pvPanel, {
        extensionId: "ticksPanel"
      })).lock("data", h.childNodes).lock(c, 0).lockMark(e, function(n) {
          return a(n.vars.tick.value)
        }).lock("strokeStyle", null).lock("fillStyle", null).lock("lineWidth", 0).pvMark.zOrder(20);
      if (this.showTicks) {
        var l = this.pvTicks = (new i.visual.Rule(this, h, {
          extensionId: "ticks",
          wrapper: j
        })).lock("data").override("defaultColor", function() {
            return b.scene ? b.scene[0].strokeStyle : "#666666"
          }).lock(c, 0).lock(e, 0).lock(d, null).optional(g, this.tickLength).pvMark;
        if (this.showMinorTicks) {
          var m = this._layoutInfo.ticks,
            k = m.length;
          m = k > 1 ? Math.abs(a(m[1]) - a(m[0])) / 2 : 0;
          this.pvMinorTicks = (new i.visual.Rule(this, this.pvTicks, {
            extensionId: "minorTicks",
            wrapper: j
          })).lock("data").intercept("visible", function() {
              return this.index < k - 1 && (!l.scene || l.scene[0].visible) && this.delegateExtension(true)
            }).override("defaultColor", function() {
              return l.scene ? l.scene[0].strokeStyle : u.Color.names.d
            }).lock(c, 0).lock(d, null).optional(g, this.tickLength / 2).lockMark(e, m).pvMark
        }
      }
      this.renderLinearAxisLabel(h,
        j);
      this._debugTicksPanel(h)
    },
    renderLinearAxisLabel: function(a, b) {
      var c = this.anchorOpposite(),
        d = this.anchorOrtho(),
        e = this.font,
        g = this._layoutInfo.maxTextWidth;
      isFinite(g) || (g = 0);
      var h = this.pvLabel = (new i.visual.Label(this, a, {
          extensionId: "label",
          noHover: false,
          showsInteraction: true,
          wrapper: b
        })).lock("data").intercept("text", function(l) {
            l = l.vars.tick.label;
            if (g && (!this.showsInteraction() || !this.scene.isActive)) l = i.text.trimToWidthB(g, l, e, "..", false);
            return l
          }).pvMark.lock(c, this.tickLength).lock(d, 0).zOrder(40).font(this.font).textStyle("#666666"),
        j = this.pvPanel.root;
      this.isAnchorTopOrBottom() ? h.textBaseline(c).textAlign(function(l) {
        if (this.index === 0) {
          l = h.toScreenTransform().transformHPosition(h.left());
          if (l <= 0) return "left"
        } else if (this.index === l.parent.childNodes.length - 1) {
          l = h.toScreenTransform().transformHPosition(h.left());
          if (l >= j.width()) return "right"
        }
        return "center"
      }) : h.textAlign(c).textBaseline(function(l) {
        if (this.index === 0) {
          l = h.toScreenTransform().transformVPosition(h.top());
          if (l >= j.height()) return "bottom"
        } else if (this.index === l.parent.childNodes.length -
          1) {
          l = h.toScreenTransform().transformVPosition(h.top());
          if (l <= 0) return "top"
        }
        return "middle"
      })
    },
    _onV1Click: function(a, b) {
      this.isDiscrete && this.useCompositeAxis && b.call(a.pvMark, a.scene, a.event)
    },
    _onV1DoubleClick: function(a, b) {
      this.isDiscrete && this.useCompositeAxis && b.call(a.pvMark, a.scene, a.event)
    },
    _getSelectableMarks: function() {
      if (this.isDiscrete && this.isVisible && this.pvLabel) return this.base()
    },
    renderCompositeOrdinalAxis: function() {
      var a = this.isAnchorTopOrBottom(),
        b = a ? "h" : "v",
        c = 2,
        d = 2,
        e = this.font,
        g =
          u.Text.fontHeight(e) / 2,
        h = this._pvLayout = this.getLayoutSingleCluster();
      h.node.def("fitInfo", null).height(function(m) {
        var k = i.text.getFitInfo(m.dx, m.dy, m.vars.tick.label, e, g);
        if (!k.h)
          if (b === "v" && k.v) d = Math.min(c, m.depth);
          else c = Math.min(c, m.depth);
        this.fitInfo(k);
        return m.dy
      });
      h.node.add(u.Bar).fillStyle("rgba(127,127,127,.001)").strokeStyle(function(m) {
        if (m.maxDepth === 1 || !m.maxDepth) return null;
        return "rgba(127,127,127,0.3)"
      }).lineWidth(function(m) {
        if (m.maxDepth === 1 || !m.maxDepth) return 0;
        return 0.5
      }).text(function(m) {
        return m.vars.tick.label
      });
      var j = a ? "center" : this.anchor == "left" ? "right" : "left",
        l;
      if (this.compatVersion() <= 1) l = function(m) {
        return function(k) {
          return m.call(this, k)
        }
      };
      this.pvLabel = (new i.visual.Label(this, h.label, {
        extensionId: "label",
        noClick: false,
        noDoubleClick: false,
        noSelect: false,
        noTooltip: false,
        noHover: false,
        showsInteraction: true,
        wrapper: l,
        tooltipArgs: {
          options: {
            offset: g * 2
          }
        }
      })).pvMark.def("lblDirection", "h").textAngle(function(m) {
          if (m.depth >= d && m.depth < c) {
            this.lblDirection("v");
            return -Math.PI / 2
          }
          if (m.depth >= c) {
            m = Math.atan(m.dy /
              m.dx);
            if (m > 1.27) {
              this.lblDirection("v");
              return -Math.PI / 2
            }
            if (m > 0.3) {
              this.lblDirection("d");
              return -m
            }
          }
          this.lblDirection("h");
          return 0
        }).textMargin(1).textAlign(function(m) {
          return b != "v" || m.depth >= d || m.depth >= c ? "center" : j
        }).left(function(m) {
          return b != "v" || m.depth >= d || m.depth >= c ? m.x + m.dx / 2 : j == "right" ? m.x + m.dx : m.x
        }).font(e).textStyle("#666666").text(function(m) {
          var k = m.vars.tick.label,
            n = this.sign;
          if (!n.scene.isActive || !n.showsInteraction()) {
            n = this.fitInfo();
            switch (this.lblDirection()) {
              case "h":
                if (!n.h) return i.text.trimToWidthB(m.dx,
                  k, e, "..");
                break;
              case "v":
                if (!n.v) return i.text.trimToWidthB(m.dy, k, e, "..");
                break;
              case "d":
                if (!n.d) {
                  m = Math.sqrt(f.sqr(m.dy) + f.sqr(m.dx));
                  return i.text.trimToWidthB(m - g, k, e, "..")
                }
                break
            }
          }
          return k
        })
    },
    getLayoutSingleCluster: function() {
      var a = this._getRootScene(),
        b = this.anchor,
        c = a.group.treeHeight,
        d = this._layoutInfo.axisSize;
      c++;
      var e = d / c;
      e -= c > 2 ? 1 / 12 * d : 0;
      c = c / (c - 1);
      var g = i.BasePanel.orthogonalLength[b];
      e = g == "width" ? b === "left" ? [-e, 0] : [e, 0] : b === "top" ? [0, -e] : [0, e];
      this.pvRule.sign.override("defaultColor", f.fun.constant(null)).override("defaultStrokeWidth",
        f.fun.constant(0));
      d = this.pvRule.add(u.Panel)[g](d).strokeStyle(null).lineWidth(0).add(u.Panel)[g](d * c).strokeStyle(null).lineWidth(0);
      d.transform(u.Transform.identity.translate(e[0], e[1]));
      return d.add(u.Layout.Cluster.Fill).nodes(a.nodes()).orient(b)
    },
    _calcTipsyGravity: function() {
      switch (this.anchor) {
        case "bottom":
          return "s";
        case "top":
          return "n";
        case "left":
          return "w";
        case "right":
          return "e"
      }
      return "s"
    }
  });
  f.type("pvc.AxisTitlePanel", i.TitlePanelAbstract).init(function(a, b, c, d) {
    this.axis = c;
    this.base(a,
      b, d);
    this._extensionPrefix = c.extensionPrefixes.map(function(e) {
      return e + "Title"
    })
  }).add({
    _calcLayout: function(a) {
      var b = this.axis.scale;
      if (!b || b.isNull) return new M(0, 0);
      return this.base(a)
    },
    _createCore: function(a) {
      var b = this.axis.scale;
      if (!(!b || b.isNull)) return this.base(a)
    }
  });
  f.type("pvc.PiePanel", i.PlotPanel).init(function(a, b, c, d) {
    var e = c.option("ValuesLabelStyle");
    this.base(a, b, c, d);
    this.explodedOffsetRadius = c.option("ExplodedSliceRadius");
    this.explodedSliceIndex = c.option("ExplodedSliceIndex");
    this.activeOffsetRadius = c.option("ActiveSliceRadius");
    this.labelStyle = e;
    if (e === "linked") {
      this.linkInsetRadius = c.option("LinkInsetRadius");
      this.linkOutsetRadius = c.option("LinkOutsetRadius");
      this.linkMargin = c.option("LinkMargin");
      this.linkHandleWidth = c.option("LinkHandleWidth");
      this.linkLabelSize = c.option("LinkLabelSize");
      this.linkLabelSpacingMin = c.option("LinkLabelSpacingMin")
    }
  }).add({
    pvPie: null,
    pvPieLabel: null,
    valueRoleName: "value",
    _getV1Datum: function(a) {
      var b = a.datum;
      if (b) {
        b = Object.create(b);
        b.percent =
          a.vars.value.percent;
        b = b
      }
      return b
    },
    _calcLayout: function(a) {
      function b(t) {
        return f.between(L.resolve(t, g), 0, g)
      }

      function c(t) {
        return f.between(L.resolve(t, e), 0, e)
      }
      var d = a.clientSize,
        e = d.width,
        g = Math.min(e, d.height) / 2;
      if (!g) return new M(0, 0);
      d = u.vector(d.width / 2, d.height / 2);
      var h = this._getConstantExtension("label", "font");
      if (!f.string.is(h)) h = this.valuesFont;
      var j = g;
      if (this.valuesVisible && this.labelStyle === "linked") {
        var l = b(this.linkInsetRadius),
          m = b(this.linkOutsetRadius),
          k = c(this.linkMargin),
          n = c(this.linkLabelSize),
          o = f.number.to(this._getConstantExtension("label", "textMargin"), 3),
          p = u.Text.fontHeight(h) * 2 / 3,
          q = this.linkHandleWidth * p;
        k += q;
        var s = this.linkLabelSpacingMin * p,
          r = Math.max(0, e / 2 - g);
        r = Math.max(0, m + k + n - r);
        r = Math.max(0, m + p, r);
        if (r >= j) {
          this.valuesVisible = false;
          i.debug >= 2 && this._log("Hiding linked labels due to insufficient space.")
        } else {
          j -= r;
          a.link = {
            insetRadius: l,
            outsetRadius: m,
            elbowRadius: j + m,
            linkMargin: k,
            handleWidth: q,
            labelSize: n,
            maxTextWidth: n - o,
            labelSpacingMin: s,
            textMargin: o,
            lineHeight: p
          }
        }
      }
      l = b(this.explodedOffsetRadius);
      m = 0;
      if (this.hoverable()) m = b(this.activeOffsetRadius);
      k = l + m;
      j = j - k;
      if (j < 0) return new M(0, 0);
      a.resolvePctRadius = b;
      a.center = d;
      a.clientRadius = g;
      a.normalRadius = j;
      a.explodedOffsetRadius = l;
      a.activeOffsetRadius = m;
      a.maxOffsetRadius = k;
      a.labelFont = h
    },
    _createCore: function(a) {
      var b = this,
        c = b.chart,
        d = this._buildScene(),
        e = a.center,
        g = a.normalRadius,
        h, j = ["slice"];
      if (this.compatVersion() <= 1) {
        j.push("");
        h = function(k) {
          return function(n) {
            return k.call(this, n.vars.value.value)
          }
        }
      }
      this.pvPie = (new i.visual.PieSlice(this, this.pvPanel, {
        extensionId: j,
        center: e,
        activeOffsetRadius: a.activeOffsetRadius,
        maxOffsetRadius: a.maxOffsetRadius,
        resolvePctRadius: a.resolvePctRadius,
        wrapper: h,
        tooltipArgs: {
          options: {
            useCorners: true,
            gravity: function() {
              var k = this.midAngle(),
                n = Math.cos(k) >= 0;
              k = Math.sin(k) >= 0;
              return n ? k ? "nw" : "sw" : k ? "ne" : "se"
            }
          }
        }
      })).lock("data", d.childNodes).override("angle", function() {
          return this.scene.vars.value.angle
        }).override("defaultOffsetRadius", function() {
          var k = b.explodedSliceIndex;
          if (k == null || k == this.pvMark.index) return a.explodedOffsetRadius;
          return 0
        }).lock("outerRadius", function() {
          return c.animate(0, g)
        }).localProperty("innerRadiusEx", L.parse).intercept("innerRadius", function() {
          var k = this.delegateExtension();
          if (k == null) {
            k = this.pvMark.innerRadiusEx();
            k = k != null ? L.resolve(k, this.pvMark.outerRadius()) || 0 : 0
          }
          return k > 0 ? c.animate(0, k) : 0
        }).pvMark;
      if (this.valuesVisible) {
        this.valuesFont = a.labelFont;
        if (this.labelStyle === "inside") this.pvPieLabel = i.visual.ValueLabel.maybeCreate(this, this.pvPie, {
          wrapper: h
        }).intercept("visible", function(k) {
          return k.vars.value.angle >=
            0.0010 && this.delegateExtension(true)
        }).override("defaultText", function() {
          return this.scene.vars.value.sliceLabel
        }).pvMark.textMargin(10);
        else if (this.labelStyle === "linked") {
          var l = a.link;
          d.layoutLinkLabels(a);
          this.pvLinkPanel = this.pvPanel.add(u.Panel).data(d.childNodes).localProperty("pieSlice").pieSlice(function() {
            return b.pvPie.scene[this.index]
          });
          this.pvLinkLine = (new i.visual.Line(this, this.pvLinkPanel, {
            extensionId: "linkLine",
            freePosition: true,
            noClick: true,
            noDoubleClick: true,
            noSelect: true,
            noTooltip: true,
            noHover: true,
            showsActivity: false
          })).lockMark("data", function(k) {
              var n = this.parent.pieSlice(),
                o = n.startAngle + n.angle / 2,
                p = n.outerRadius - l.insetRadius,
                q = n.left + p * Math.cos(o);
              n = n.top + p * Math.sin(o);
              o = k.childNodes[0];
              if (!o || !o._isFirstDynamicScene) {
                o = new i.visual.PieLinkLineScene(k, q, n, 0);
                o._isFirstDynamicScene = true
              } else {
                o.x = q;
                o.y = n
              }
              return k.childNodes
            }).override("defaultColor", function(k) {
              return k === "stroke" ? "black" : this.base(k)
            }).override("defaultStrokeWidth", f.fun.constant(0.5)).pvMark.lock("visible").lock("top",
            function(k) {
              return k.y
            }).lock("left", function(k) {
              return k.x
            });
          this.pvPieLabel = (new i.visual.Label(this, this.pvLinkPanel, {
            extensionId: "label",
            noClick: false,
            noDoubleClick: false,
            noSelect: false,
            noHover: false,
            showsInteraction: true
          })).lockMark("data", function(k) {
              return k.lineScenes
            }).intercept("textStyle", function() {
              this._finished = false;
              var k = this.delegate();
              if (k && !this._finished && !this.mayShowActive() && this.mayShowNotAmongSelected()) k = this.dimColor(k, "text");
              return k
            }).pvMark.lock("visible").left(function(k) {
              return k.vars.link.labelX
            }).top(function(k) {
              return k.vars.link.labelY +
                (this.index + 1) * l.lineHeight
            }).textAlign(function(k) {
              return k.vars.link.labelAnchor
            }).textMargin(l.textMargin).textBaseline("bottom").text(function(k) {
              return k.vars.link.labelLines[this.index]
            });
          if (i.debug >= 20) {
            this.pvPanel.add(u.Panel).zOrder(-10).left(e.x - a.clientRadius).top(e.y - a.clientRadius).width(a.clientRadius * 2).height(a.clientRadius * 2).strokeStyle("red");
            this.pvPanel.strokeStyle("green");
            var m = u.Colors.category10();
            this.pvLinkLine.segmented(true).strokeStyle(function() {
              return m(this.index)
            })
          }
        }
        this.pvPieLabel.font(a.labelFont)
      }
    },
    _getExtensionId: function() {
      var a = [{
        abs: "content"
      }];
      this.chart.parent && a.push({
        abs: "smallContent"
      });
      return a.concat(this.base())
    },
    renderInteractive: function() {
      this.pvPanel.render()
    },
    _buildScene: function() {
      var a = new i.visual.PieRootScene(this);
      this.sum = a.vars.sumAbs.value;
      return a
    }
  });
  f.type("pvc.visual.PieRootScene", i.visual.Scene).init(function(a) {
    function b(n, o) {
      if (o) {
        o = o._datums;
        if (o.length === 1) return o[0].atoms[g].label
      }
      return h.format(n)
    }

    function c() {
      var n = this.vars.value;
      n.angle = this.parent.angleScale(n.value);
      var o = Math.abs(n.value) / m;
      n.percent = new I(o, j(o));
      n.sliceLabel = this.sliceLabel()
    }
    var d = a.visualRoles.category.flatten(a.data, i.data.visibleKeyArgs);
    this.base(null, {
      panel: a,
      source: d
    });
    var e = new i.visual.RoleVarHelper(this, a.visualRoles.color, {
        roleVar: "color"
      }),
      g = a.visualRoles[a.valueRoleName].firstDimensionName(),
      h = d.dimensions(g),
      j = a.chart.options.percentValueFormat,
      l = this,
      m = 0,
      k = f.type(i.visual.PieCategoryScene).init(function(n, o) {
        this.base(l, {
          source: n
        });
        this.vars.category = I.fromComplex(n);
        m += Math.abs(o);
        this.vars.value = new I(o, b(o, n));
        e.onNewScene(this, true)
      });
    a._extendSceneType("category", k, ["sliceLabel", "sliceLabelMask"]);
    d.children().each(function(n) {
      var o = n.dimensions(g).sum(i.data.visibleKeyArgs);
      o !== 0 && new k(n, o)
    });
    this.angleScale = u.Scale.linear(0, m).range(0, 2 * Math.PI).by1(Math.abs);
    this.vars.sumAbs = new I(m, b(m));
    this.childNodes.forEach(function(n) {
      c.call(n)
    })
  }).add({
    layoutLinkLabels: function(a) {
      var b = -Math.PI / 2,
        c = [],
        d = [];
      this.childNodes.forEach(function(e) {
        b = e.layoutI(a, b);
        (e.vars.link.dir >
          0 ? d : c).push(e)
      });
      this._distributeLabels(-1, c, a);
      this._distributeLabels(+1, d, a)
    },
    _distributeLabels: function(a, b, c) {
      b.sort(function(d, e) {
        return f.compare(d.vars.link.targetY, e.vars.link.targetY)
      });
      this._distributeLabelsDownwards(b, c) && this._distributeLabelsUpwards(b, c) && this._distributeLabelsEvenly(b, c);
      b.forEach(function(d) {
        d.layoutII(c)
      })
    },
    _distributeLabelsDownwards: function(a, b) {
      var c = b.link.labelSpacingMin;
      b = b.clientSize.height;
      for (var d = false, e = 0, g = a.length - 1; e < g; e++) {
        var h = a[e].vars.link;
        if (!e &&
          h.labelTop() < 0) d = true;
        var j = a[e + 1].vars.link,
          l = h.labelBottom() + c;
        if (j.labelTop() < l) {
          h = j.labelHeight / 2;
          l = l + h;
          h = b - h;
          if (l > h) {
            d = true;
            j.targetY = h
          } else j.targetY = l
        }
      }
      return d
    },
    _distributeLabelsUpwards: function(a, b) {
      b = b.link.labelSpacingMin;
      for (var c = false, d = a.length - 1; d > 0; d--) {
        var e = a[d - 1].vars.link,
          g = a[d].vars.link;
        if (d === 1 && e.labelTop() < 0) c = true;
        var h = g.labelTop() - b;
        if (e.labelBottom() > h) {
          g = e.labelHeight / 2;
          h = h - g;
          if (h < g) {
            c = true;
            e.targetY = g
          } else e.targetY = h
        }
      }
      return c
    },
    _distributeLabelsEvenly: function(a, b) {
      var c =
        0;
      a.forEach(function(g) {
        c += g.vars.link.labelHeight
      });
      var d = b.clientSize.height - c;
      if (a.length > 1) d /= a.length - 1;
      var e = 0;
      a.forEach(function(g) {
        g = g.vars.link;
        var h = g.labelHeight / 2;
        e += h;
        g.targetY = e;
        e += h + d
      });
      return true
    }
  });
  f.type("pvc.visual.PieLinkLabelVar").add({
    labelTop: function() {
      return this.targetY - this.labelHeight / 2
    },
    labelBottom: function() {
      return this.targetY + this.labelHeight / 2
    }
  });
  f.type("pvc.visual.PieCategoryScene", i.visual.Scene).add({
    sliceLabelMask: function() {
      return this.panel().valuesMask
    },
    sliceLabel: function() {
      return this.format(this.sliceLabelMask())
    },
    layoutI: function(a, b) {
      var c = this.vars.value,
        d = b + c.angle,
        e = (b + d) / 2;
      b = this.vars.link = new i.visual.PieLinkLabelVar;
      var g = a.link;
      c = i.text.justify(c.sliceLabel, g.maxTextWidth, a.labelFont);
      var h = c.length;
      b.labelLines = c;
      b.labelHeight = h * g.lineHeight;
      this.lineScenes = f.array.create(h, this);
      c = Math.cos(e);
      var j = Math.sin(e);
      e = (h = c >= 0) ? 1 : -1;
      b.labelAnchor = h ? "left" : "right";
      a = a.center;
      h = g.elbowRadius;
      j = a.y + h * j;
      var l = a.x + e * h;
      g = l + e * g.linkMargin;
      new i.visual.PieLinkLineScene(this, a.x + h * c, j);
      new i.visual.PieLinkLineScene(this,
        l, j);
      b.elbowY = j;
      b.targetY = j + 0;
      b.targetX = g;
      b.dir = e;
      return d
    },
    layoutII: function(a) {
      var b = this.vars.link,
        c = b.targetY,
        d = b.targetX;
      a = a.link.handleWidth;
      a > 0 && new i.visual.PieLinkLineScene(this, d - b.dir * a, c);
      new i.visual.PieLinkLineScene(this, d, c);
      b.labelX = d;
      b.labelY = c - b.labelHeight / 2
    }
  });
  f.type("pvc.visual.PieLinkLineScene", i.visual.Scene).init(function(a, b, c, d) {
    this.base(a, {
      source: a.group,
      index: d
    });
    this.x = b;
    this.y = c
  }).add(u.Vector);
  f.type("pvc.PieChart", i.BaseChart).add({
    _animatable: true,
    pieChartPanel: null,
    _getColorRoleSpec: function() {
      return {
        isRequired: true,
        defaultSourceRole: "category",
        defaultDimension: "color*",
        requireIsDiscrete: true
      }
    },
    _initVisualRoles: function() {
      this.base();
      this._addVisualRole("category", {
        isRequired: true,
        defaultDimension: "category*",
        autoCreateDimension: true
      });
      this._addVisualRole("value", {
        isMeasure: true,
        isRequired: true,
        isPercent: true,
        requireSingleDimension: true,
        requireIsDiscrete: false,
        valueType: Number,
        defaultDimension: "value"
      })
    },
    _initPlotsCore: function() {
      new i.visual.PiePlot(this)
    },
    _preRenderContent: function(a) {
      this.base();
      if (this.compatVersion() <= 1) {
        var b = i.castNumber(this.options.innerGap) || 0.95;
        b = f.between(b, 0.1, 1);
        a.paddings = ((1 - b) * 100 / 2).toFixed(2) + "%"
      } else if (a.paddings == null) a.paddings = new L(0.025);
      this.pieChartPanel = new i.PiePanel(this, this.basePanel, this.plots.pie, f.create(a, {
        scenes: f.getPath(this.options, "pie.scenes")
      }))
    }
  });
  f.type("pvc.BarAbstractPanel", i.CategoricalAbstractPanel).add({
    pvBar: null,
    pvBarLabel: null,
    pvCategoryPanel: null,
    pvSecondLine: null,
    pvSecondDot: null,
    _creating: function() {
      var a = this.defaultVisibleBulletGroupScene();
      if (a && !a.hasRenderer()) {
        var b = a.colorAxis,
          c = b.option("LegendDrawLine");
        if (!c || b.option("LegendDrawMarker")) {
          b = {
            drawMarker: true,
            markerShape: b.option("LegendShape"),
            drawRule: c,
            markerPvProto: new O
          };
          this.extend(b.markerPvProto, "", {
            constOnly: true
          });
          a.renderer(new i.visual.legend.BulletItemDefaultRenderer(b))
        }
      }
    },
    _createCore: function() {
      this.base();
      var a = this,
        b = a.chart,
        c = a.plot,
        d = !!a.stacked,
        e = a.isOrientationVertical(),
        g = a.visibleData({
          ignoreNulls: false
        }),
        h = a.visualRoles.series.flatten(g);
      g = a._buildScene(g, h);
      var j = a.axes.ortho,
        l = a.axes.base,
        m = j.scale,
        k = m(0),
        n = j.sceneScale({
          sceneVarName: "value",
          nullToZero: false
        });
      j = l.sceneScale({
        sceneVarName: "category"
      });
      m = c.option("BarSizeRatio");
      var o = c.option("BarSizeMax"),
        p = c.option("BarStackedMargin"),
        q = l.scale.range();
      l = q.band;
      q = q.step;
      var s = e === d;
      if (d) h = l;
      else {
        h = h.childCount();
        h = h > 0 ? l * m / h : 0
      }
      if (h > o) h = o;
      a.barWidth = h;
      a.barStepWidth = q;
      var r;
      if (a.compatVersion() <= 1) r = function(t) {
        return function(A) {
          var x = Object.create(this.parent),
            v = Object.create(this);
          v.parent = x;
          var y = A.parent.childIndex(),
            z = A.childIndex();
          if (d) {
            x.index = y;
            v.index = z
          } else {
            x.index = z;
            v.index = y
          }
          return t.call(v, A.vars.value.rawValue)
        }
      };
      a.pvBarPanel = (new i.visual.Panel(a, a.pvPanel, {
        panelType: u.Layout.Band,
        extensionId: "panel"
      })).lock("layers", g.childNodes).lockMark("values", function(t) {
          return t.childNodes
        }).lockMark("orient", e ? "bottom-left" : "left-bottom").lockMark("layout", d ? "stacked" : "grouped").lockMark("verticalMode", a._barVerticalMode()).lockMark("yZero", k).pvMark.band.x(j).w(l).differentialControl(a._barDifferentialControl()).item.order(s ?
          "reverse" : null).h(function(t) {
          t = n(t);
          return t != null ? b.animate(0, t - k) : null
        }).w(h).horizontalRatio(m).verticalMargin(p).end;
      this.pvBar = (new i.visual.Bar(a, a.pvBarPanel.item, {
        extensionId: "",
        freePosition: true,
        wrapper: r
      })).lockDimensions().pvMark.antialias(false);
      c.option("OverflowMarkersVisible") && this._addOverflowMarkers(r);
      if (c = i.visual.ValueLabel.maybeCreate(a, a.pvBar, {
        wrapper: r
      })) a.pvBarLabel = c.pvMark.visible(function() {
        return this.scene.target[this.index][e ? "height" : "width"] >= 4
      })
    },
    _barVerticalMode: function() {
      return null
    },
    _barDifferentialControl: function() {
      return null
    },
    _getV1Datum: function(a) {
      var b = a.datum;
      if (b) {
        b = Object.create(b);
        b.percent = a.vars.value.percent;
        b = b
      }
      return b
    },
    _addOverflowMarkers: function(a) {
      var b = this.axes.ortho;
      if (b.option("FixedMax") != null) this.pvOverflowMarker = this._addOverflowMarker(false, b.scale, a);
      if (b.option("FixedMin") != null) this.pvUnderflowMarker = this._addOverflowMarker(true, b.scale, a)
    },
    _addOverflowMarker: function(a, b, c) {
      var d = this.isOrientationVertical(),
        e = d ? "bottom" : "left",
        g = this.anchorOpposite(e),
        h = this.anchorOrthoLength(e),
        j = this.anchorLength(e),
        l = this._layoutInfo.paddings,
        m = a ? b.min - l[e] : b.max + l[g];
      b = a ? d ? 0 : Math.PI / 2 : d ? Math.PI : -Math.PI / 2;
      return (new i.visual.Dot(this, this.pvBar.anchor("center"), {
        noSelect: true,
        noHover: true,
        noClick: true,
        noDoubleClick: true,
        noTooltip: true,
        freePosition: true,
        extensionId: a ? "underflowMarker" : "overflowMarker",
        wrapper: c
      })).intercept("visible", function(k) {
          var n = this.delegateExtension();
          if (n !== undefined && !n) return false;
          k = k.vars.value.value;
          if (k == null) return false;
          n = this.pvMark.scene.target[this.index];
          k = n[e] + (k > 0 ? n[h] : 0);
          return a ? k < m : k > m
        }).lock(g, null).lock("shapeSize").pvMark.shape("triangle").shapeRadius(function() {
          return Math.min(Math.sqrt(10), this.scene.target[this.index][j] / 2)
        }).shapeAngle(b).lineWidth(1.5).strokeStyle("red").fillStyle("white")[e](function() {
        return m + (a ? 1 : -1) * (this.shapeRadius() + 2)
      })
    },
    renderInteractive: function() {
      this.pvPanel.render()
    },
    _buildScene: function(a, b) {
      function c(l) {
        var m = new i.visual.Scene(d, {
            source: l
          }),
          k = l.key;
        m.vars.series = I.fromComplex(l);
        j.onNewScene(m, false);
        e.forEach(function(n) {
          var o = new i.visual.Scene(m, {
            source: a._childrenByKey[n.key]._childrenByKey[k]
          });
          (o.vars.category = I.fromComplex(n)).group = n;
          h.onNewScene(o, true);
          j.onNewScene(o, true)
        })
      }
      var d = new i.visual.Scene(null, {
          panel: this,
          source: a
        }),
        e = a._children,
        g = this.visualRoles,
        h = new i.visual.RoleVarHelper(d, g.value, {
          roleVar: "value",
          hasPercentSubVar: this.stacked
        }),
        j = new i.visual.RoleVarHelper(d, g.color, {
          roleVar: "color"
        });
      b.children().each(c);
      return d
    }
  });
  f.type("pvc.BarAbstract", i.CategoricalAbstract).init(function(a) {
    this.base(a);
    if (a = this.parent) this._valueRole = a._valueRole
  }).add({
    _initVisualRoles: function() {
      this.base();
      this._addVisualRole("value", {
        isMeasure: true,
        isRequired: true,
        isPercent: this.options.stacked,
        requireSingleDimension: true,
        requireIsDiscrete: false,
        valueType: Number,
        defaultDimension: "value"
      });
      this._valueRole = this.visualRoles.value
    },
    _getCategoryRoleSpec: function() {
      var a = this.base();
      a.requireIsDiscrete = true;
      return a
    },
    _initData: function() {
      this.base.apply(this, arguments);
      this._valueDim = this.data.dimensions(this._valueRole.firstDimensionName())
    }
  });
  f.type("pvc.BarPanel", i.BarAbstractPanel).add({});
  f.type("pvc.BarChart", i.BarAbstract).add({
    _animatable: true,
    _allowV1SecondAxis: true,
    _initPlotsCore: function() {
      var a = this.options,
        b = (new i.visual.BarPlot(this)).option("Trend");
      if (a.plot2) {
        a = new i.visual.PointPlot(this, {
          name: "plot2",
          fixed: {
            DataPart: "1"
          },
          defaults: {
            ColorAxis: 2,
            LinesVisible: true,
            DotsVisible: true
          }
        });
        b || (b = a.option("Trend"))
      }
      b && new i.visual.PointPlot(this, {
        name: "trend",
        fixed: {
          DataPart: "trend",
          TrendType: "none",
          ColorRole: "series",
          NullInterpolatioMode: "none"
        },
        defaults: {
          ColorAxis: 2,
          LinesVisible: true,
          DotsVisible: false
        }
      })
    },
    _hasDataPartRole: function() {
      return true
    },
    _createPlotPanels: function(a, b) {
      var c = this.plots,
        d = new i.BarPanel(this, a, c.bar, Object.create(b));
      this.barChartPanel = d;
      var e = c.plot2;
      if (e) {
        i.debug >= 3 && this._log("Creating Point panel.");
        e = new i.PointPanel(this, a, e, Object.create(b));
        d.pvSecondLine = e.pvLine;
        d.pvSecondDot = e.pvDot;
        e._applyV1BarSecondExtensions = true
      }
      if (c = c.trend) {
        i.debug >= 3 && this._log("Creating Trends Point panel.");
        new i.PointPanel(this,
          a, c, Object.create(b))
      }
    }
  });
  f.type("pvc.NormalizedBarPanel", i.BarAbstractPanel).add({
    _barVerticalMode: function() {
      return "expand"
    }
  });
  f.type("pvc.NormalizedBarChart", i.BarAbstract).add({
    _processOptionsCore: function(a) {
      a.stacked = true;
      this.base(a)
    },
    _getContinuousVisibleExtentConstrained: function(a, b, c) {
      if (a.type === "ortho") return {
        min: 0,
        max: 100,
        minLocked: true,
        maxLocked: true
      };
      return this.base(a, b, c)
    },
    _initPlotsCore: function() {
      new i.visual.NormalizedBarPlot(this)
    },
    _createPlotPanels: function(a, b) {
      this.barChartPanel =
        new i.NormalizedBarPanel(this, a, this.plots.bar, Object.create(b))
    }
  });
  f.type("pvc.visual.legend.WaterfallBulletGroupScene", i.visual.legend.BulletGroupScene).init(function(a, b) {
    b = f.set(b, "clickMode", "none");
    this.base(a, b);
    this.createItem(b)
  }).add({
    renderer: function(a) {
      if (a != null) this._renderer = a;
      return this._renderer
    },
    itemSceneType: function() {
      return i.visual.legend.WaterfallBulletItemScene
    }
  });
  f.type("pvc.visual.legend.WaterfallBulletItemScene", i.visual.legend.BulletItemScene).init(function(a, b) {
    this.base.apply(this,
      arguments);
    var c = i.visual.Interactive;
    this._ibits = c.Interactive | c.ShowsInteraction;
    this.color = f.get(b, "color");
    this.vars.value = new I(null, f.get(b, "label"))
  });
  f.type("pvc.WaterfallPanel", i.BarAbstractPanel).add({
    pvWaterfallLine: null,
    ruleData: null,
    _barDifferentialControl: function() {
      var a = this.chart._isFalling;
      return function(b) {
        if (a && !this.index) return 1;
        b = b.vars.category.group;
        if (b._isFlattenGroup && !b._isDegenerateFlattenGroup) return -2;
        return a ? -1 : 1
      }
    },
    _creating: function() {
      var a = this._getLegendBulletRootScene();
      if (a)
        if ((a = a.firstChild) && !a.hasRenderer()) {
          var b = {
            drawRule: true,
            drawMarker: false,
            rulePvProto: new O
          };
          this.extend(b.rulePvProto, "line", {
            constOnly: true
          });
          a.renderer(new i.visual.legend.BulletItemDefaultRenderer(b))
        }
    },
    _createCore: function() {
      this.base();
      var a = this.chart,
        b = this.isOrientationVertical(),
        c = b ? "bottom" : "left",
        d = this.anchorOrtho(c),
        e = this._buildRuleScene(),
        g = a.axes.ortho.scale,
        h = g(0),
        j = a.axes.ortho.sceneScale({
          sceneVarName: "value"
        }),
        l = a.axes.base.sceneScale({
          sceneVarName: "category"
        }),
        m = a.axes.base.scale,
        k = this.barWidth / 2,
        n = this.barWidth,
        o = this.barStepWidth,
        p = a._isFalling,
        q = a._waterColor;
      if (this.plot.option("AreasVisible")) {
        var s = u.Colors.category10(),
          r = this._buildWaterGroupScene(),
          t = g.range(),
          A = 0.04 * (t[1] - t[0]);
        this.pvWaterfallGroupPanel = (new i.visual.Panel(this, this.pvPanel, {
          extensionId: "group"
        })).lock("data", r.childNodes).pvMark.zOrder(-1).fillStyle(function() {
            return s(0).alpha(0.15)
          })[d](function(x) {
          return m(x.vars.category.valueLeft) - o / 2
        })[this.anchorLength(c)](function(x) {
          x = x.vars.category;
          return Math.abs(m(x.valueRight) - m(x.valueLeft)) + o
        })[c](function(x) {
          x = g(x.vars.value.valueBottom) - A / 2;
          return a.animate(h, x)
        })[this.anchorOrthoLength(c)](function(x) {
          x = x.vars.value;
          x = g(x.valueTop) - g(x.valueBottom) + A;
          return a.animate(0, x)
        })
      }
      this.pvBar.sign.override("baseColor", function(x) {
        var v = this.base(x);
        if (x === "fill")
          if (!this.scene.vars.category.group._isFlattenGroup) return u.color(v).alpha(0.5);
        return v
      });
      this.pvWaterfallLine = (new i.visual.Rule(this, this.pvPanel, {
        extensionId: "line",
        noTooltip: false,
        noHover: false,
        noSelect: false,
        noClick: false,
        noDoubleClick: false
      })).lock("data", e.childNodes).optional("visible", function() {
          return p && !!this.scene.previousSibling || !p && !!this.scene.nextSibling
        }).optional(c, function() {
          return h + a.animate(0, j(this.scene) - h)
        }).optional(this.anchorLength(c), o + n).optional(d, p ? function() {
          return l(this.scene) - o - k
        } : function() {
          return l(this.scene) - k
        }).override("defaultColor", function() {
          return q
        }).pvMark.antialias(true).lineCap("butt");
      if (this.plot.option("TotalValuesVisible")) this.pvWaterfallLabel =
        (new i.visual.Label(this, this.pvWaterfallLine, {
          extensionId: "lineLabel"
        })).intercept("visible", function(x) {
            if (x.vars.category.group._isFlattenGroup) return false;
            return p || !!x.nextSibling
          }).pvMark[c](function(x) {
          return h + a.animate(0, j(x) - h)
        })[this.anchorOrtho(c)](l).textAlign(b ? "center" : "left").textBaseline(function(x) {
          if (!b) return "middle";
          x = x.vars.direction;
          if (x == null) return "bottom";
          return !p === (x === "up") ? "bottom" : "top"
        }).textStyle(u.Color.names.darkgray.darker(2)).textMargin(5).text(function(x) {
          return x.vars.value.label
        })
    },
    _buildRuleScene: function() {
      function a(h) {
        var j = h.group,
          l = new i.visual.Scene(c, {
            source: j
          });
        (l.vars.category = I.fromComplex(j)).group = j;
        h = h.offset;
        l.vars.value = new I(h, this.chart._valueDim.format(h))
      }

      function b(h, j) {
        var l = h.vars.value.value;
        h.vars.direction = !j || d === l ? null : e === d < l ? "up" : "down";
        d = l
      }
      var c = new i.visual.Scene(null, {
          panel: this,
          source: this.visibleData({
            ignoreNulls: false
          })
        }),
        d, e, g = this.chart._ruleInfos;
      if (g) {
        g.forEach(a, this);
        g = f.query(c.childNodes);
        (e = !this.chart._isFalling) || (g = g.reverse());
        g.each(b, this)
      }
      return c
    },
    _buildWaterGroupScene: function() {
      function a(k, n) {
        var o = k.children().where(function(p) {
          return p.key !== ""
        });
        if (o.next()) {
          n && b(k, n);
          n++;
          do a(o.item, n); while (o.next())
        }
      }

      function b(k, n) {
        var o = new i.visual.Scene(h, {
            source: k
          }),
          p = o.vars.category = I.fromComplex(k);
        p.group = k;
        p.level = n;
        n = o.vars.value = {};
        var q = j[k.absKey],
          s = q.offset,
          r = q.range;
        o = -r.min + r.max;
        var t;
        if (l) {
          k = d(k);
          t = j[k.absKey];
          k = q.group.value;
          q = t.group.value
        } else {
          k = c(k);
          t = j[k.absKey];
          k = t.group.value;
          q = q.group.value
        }
        s = s - r.max;
        p.valueLeft = k;
        p.valueRight = q;
        n.valueHeight = o;
        n.valueBottom = s;
        n.valueTop = s + o
      }

      function c(k) {
        var n = k._children;
        return (n = n && n[0]) ? c(n) : k
      }

      function d(k) {
        var n = k._children;
        return (n = n && n[n.length - 1]) ? d(n) : k
      }
      var e = this.chart,
        g = e._catRole.select(e.partData(this.dataPartValue), {
          visible: true
        }),
        h = new i.visual.Scene(null, {
          panel: this,
          source: g
        }),
        j, l, m = e._ruleInfos;
      if (m) {
        j = f.query(m).object({
          name: function(k) {
            return k.group.absKey
          }
        });
        l = e._isFalling;
        a(g, 0)
      }
      return h
    }
  });
  f.type("pvc.WaterfallChart", i.BarAbstract).init(function(a) {
    this.base(a);
    if (a = this.parent) this._isFalling = a._isFalling
  }).add({
    _animatable: true,
    _isFalling: true,
    _ruleInfos: null,
    _waterColor: u.color("#1f77b4").darker(),
    _processOptionsCore: function(a) {
      a.stacked = true;
      a.baseAxisComposite = false;
      this.base(a);
      a.plot2 = false
    },
    _initPlotsCore: function() {
      var a = new i.visual.WaterfallPlot(this);
      this._isFalling = a.option("Direction") === "down";
      this._catRole.setTraversalMode(i.visual.TraversalMode[this._isFalling ? "FlattenDfsPre" : "FlattenDfsPost"]);
      this._catRole.setRootLabel(a.option("AllCategoryLabel"))
    },
    _initLegendScenes: function(a) {
      var b = this.plots.water,
        c = this._getConstantExtension(i.makeExtensionAbsId("line", b.extensionPrefixes), "strokeStyle");
      if (c) this._waterColor = u.color(c);
      c = a._getBulletRootScene();
      new i.visual.legend.WaterfallBulletGroupScene(c, {
        extensionPrefix: i.buildIndexedId("", 1),
        label: b.option("TotalLineLabel"),
        color: this._waterColor
      });
      this.base(a)
    },
    _reduceStackedCategoryValueExtent: function(a, b, c) {
      var d = a ? a.offset : 0,
        e = b.min + b.max;
      if (!a) {
        if (b) {
          e = d + e;
          this._ruleInfos = [{
            offset: e,
            group: c,
            range: b
          }];
          return {
            min: b.min,
            max: b.max,
            offset: e
          }
        }
        return null
      }
      var g = this._isFalling;
      if (c._isFlattenGroup && !c._isDegenerateFlattenGroup) {
        e = -b.min;
        if (e > 0) {
          e = d + e;
          if (e > a.max) a.max = e
        }
        e = -b.max;
        if (e < 0) {
          e = d + e;
          if (e < a.min) a.min = e
        }
      } else {
        e = a.offset = d + (g ? -1 : 1) * e;
        if (e > a.max) a.max = e;
        else if (e < a.min) a.min = e
      }
      this._ruleInfos.push({
        offset: g ? d : a.offset,
        group: c,
        range: b
      });
      return a
    },
    _createPlotPanels: function(a, b) {
      this.wfChartPanel = new i.WaterfallPanel(this, a, this.plots.water, f.create(b, {
        waterfall: this.options.waterfall
      }))
    }
  });
  f.type("pvc.PointPanel", i.CategoricalAbstractPanel).init(function(a, b, c, d) {
    this.base(a, b, c, d);
    this.linesVisible = c.option("LinesVisible");
    this.dotsVisible = c.option("DotsVisible");
    this.areasVisible = c.option("AreasVisible");
    if (!this.linesVisible && !this.dotsVisible && !this.areasVisible) {
      this.linesVisible = true;
      c.option.specify({
        LinesVisible: true
      })
    }
    this.visualRoles.value = a.visualRole(c.option("OrthoRole"))
  }).add({
    pvLine: null,
    pvArea: null,
    pvDot: null,
    pvLabel: null,
    pvScatterPanel: null,
    _creating: function() {
      var a =
        this.defaultVisibleBulletGroupScene();
      if (a && !a.hasRenderer()) {
        var b = a.colorAxis,
          c = f.nullyTo(b.option("LegendDrawMarker", true), this.dotsVisible || this.areasVisible),
          d = !c || f.nullyTo(b.option("LegendDrawLine", true), this.linesVisible && !this.areasVisible);
        if (c || d) {
          var e = {
            drawMarker: c,
            drawRule: d
          };
          if (c) {
            b = b.option("LegendShape", true);
            if (this.dotsVisible) {
              b || (b = "circle");
              e.markerPvProto = (new u.Dot).lineWidth(1.5, i.extensionTag).shapeSize(12, i.extensionTag)
            } else e.markerPvProto = new O;
            e.markerShape = b;
            this._applyV1BarSecondExtensions &&
            this.chart.extend(e.markerPvProto, "barSecondDot", {
              constOnly: true
            });
            this.extend(e.markerPvProto, "dot", {
              constOnly: true
            })
          }
          if (d) {
            e.rulePvProto = (new u.Line).lineWidth(1.5, i.extensionTag);
            this._applyV1BarSecondExtensions && this.chart.extend(e.rulePvProto, "barSecondLine", {
              constOnly: true
            });
            this.extend(e.rulePvProto, "line", {
              constOnly: true
            })
          }
          a.renderer(new i.visual.legend.BulletItemDefaultRenderer(e))
        }
      }
    },
    _createCore: function() {
      this.base();
      var a = this,
        b = this.chart,
        c = this.stacked,
        d = this.dotsVisible,
        e = this.areasVisible,
        g = this.linesVisible,
        h = this.isOrientationVertical() ? "bottom" : "left",
        j = this.axes.base.role.grouping.isDiscrete(),
        l = this._buildScene(this.visibleData({
          ignoreNulls: false
        }), j);
      e ? this.pvPanel.zOrder(-7) : this.pvPanel.zOrder(1);
      this.pvScatterPanel = (new i.visual.Panel(this, this.pvPanel, {
        extensionId: "panel"
      })).lock("data", l.childNodes).pvMark;
      var m = e && g && !c ? 0.5 : null,
        k;
      if (this.compatVersion() <= 1) k = c ? function(r) {
        return function(t) {
          return r.call(this, t.vars.value.rawValue)
        }
      } : function(r) {
        return function(t) {
          var A = {
              category: t.vars.category.rawValue,
              value: t.vars.value.rawValue
            },
            x = Object.create(this);
          x.index = t.dataIndex;
          return r.call(x, A)
        }
      };
      var n = j && c ? function(r) {
        return !r.isNull || r.isIntermediate
      } : function(r) {
        return !r.isNull
      };
      l = b.selectableByFocusWindow();
      this.pvArea = (new i.visual.Area(this, this.pvScatterPanel, {
        extensionId: "area",
        noTooltip: false,
        wrapper: k,
        noSelect: l,
        noRubberSelect: true,
        showsSelection: !l
      })).lockMark("data", function(r) {
          return r.childNodes
        }).lockMark("visible", n).override("x", function() {
          return this.scene.basePosition
        }).override("y",
        function() {
          return this.scene.orthoPosition
        }).override("dy", function() {
          return b.animate(0, this.scene.orthoLength)
        }).override("color", function(r) {
          return e ? this.base(r) : null
        }).override("baseColor", function(r) {
          r = this.base(r);
          if (!this._finished && r && m != null) r = r.alpha(m);
          return r
        }).override("dimColor", function(r, t) {
          return c ? i.toGrayScale(r, 1, null, null).brighter() : this.base(r, t)
        }).lock("events", e ? "painted" : "none").pvMark;
      var o = d && !g && !e,
        p = c && e,
        q = ["line"];
      this._applyV1BarSecondExtensions && q.push({
        abs: "barSecondLine"
      });
      n = !o && n;
      o = e && !g;
      this.pvLine = (new i.visual.Line(this, this.pvArea.anchor(this.anchorOpposite(h)), {
        extensionId: q,
        freePosition: true,
        wrapper: k,
        noTooltip: o,
        noDoubleClick: o,
        noClick: o,
        noHover: o,
        noSelect: o || l,
        showsSelection: !l
      })).lockMark("visible", n).override("defaultColor", function(r) {
          r = this.base(r);
          if (!this._finished && p && r) r = r.darker(0.6);
          return r
        }).override("normalColor", function(r) {
          return g ? r : null
        }).override("interactiveColor", function(r, t) {
          if (!g && !this.mayShowAnySelected() && !this.mayShowActive()) return null;
          return this.base(r, t)
        }).override("baseStrokeWidth", function() {
          var r;
          if (g) r = this.base();
          return r == null ? 1.5 : r
        }).intercept("strokeDasharray", function() {
          var r = this.delegateExtension();
          if (r === undefined) {
            r = this.scene;
            var t = r.isInterpolated;
            if (!t) {
              t = (t = r.nextSibling) && t.isIntermediate && t.isInterpolated;
              if (!t) t = (t = r.previousSibling) && r.isIntermediate && t.isInterpolated
            }
            r = t ? ". " : null
          }
          return r
        }).pvMark;
      var s = !(e && j && c);
      q = ["dot"];
      this._applyV1BarSecondExtensions && q.push({
        abs: "barSecondDot"
      });
      this.pvDot = (new i.visual.Dot(this,
        this.pvLine, {
          extensionId: q,
          freePosition: true,
          wrapper: k
        })).intercept("visible", function() {
          var r = this.scene;
          return !r.isNull && !r.isIntermediate && this.delegateExtension(true)
        }).override("color", function(r) {
          if (!d)
            if (!(this.scene.isActive || !s && this.scene.isSingle || s && this.scene.isAlone)) return i.invisibleFill;
          var t = this.base(r);
          if (this.scene.isInterpolated && r === "fill") return t && u.color(t).brighter(0.5);
          return t
        }).override("defaultColor", function(r) {
          r = this.base(r);
          if (!this._finished && p && r) r = r.darker(0.6);
          return r
        }).override("baseSize", function() {
          if (!d)
            if ((this.scene.isActive || !s && this.scene.isSingle || s && this.scene.isAlone) && !this.scene.isActive) {
              var r = Math.max(a.pvLine.lineWidth(), 0.2) / 2;
              return f.sqr(r)
            }
          if (this.scene.isInterpolated) return 0.8 * this.base();
          return this.base()
        }).pvMark;
      if (h = i.visual.ValueLabel.maybeCreate(this, this.pvDot, {
        wrapper: k
      })) this.pvLabel = h.pvMark
    },
    renderInteractive: function() {
      this.pvScatterPanel.render()
    },
    _buildScene: function(a, b) {
      function c(v) {
        for (var y = [], z = v.childNodes, w,
               B = 0, H = null, K = 0, S = 0, J = z.length; K < J; K++, S++) {
          var W = z[S],
            V = K * 2;
          y[V] = W;
          d.call(this, w, W, x && x[V]);
          if (W.isAlone && !H) H = W;
          W.isNull || B++;
          if (w)
            if (w = e.call(this, v, w, W, S, x && x[V - 1])) {
              y[V - 1] = w;
              S++
            }
          w = W
        }
        if (B === 1 && H && J === 1) H.isSingle = true;
        if (k) x = y
      }

      function d(v, y, z) {
        var w = y.vars.value.accValue;
        if (z) {
          if (y.isNull && !b) w = r;
          else w += z.vars.value.accValue;
          y.vars.value.accValue = w
        }
        y.basePosition = A(y);
        y.orthoPosition = t;
        y.orthoLength = s(w) - t;
        if (v = (!v || v.isNull) && !y.isNull) {
          v = y.nextSibling;
          v = !v || v.isNull
        }
        y.isAlone = v;
        y.isSingle =
          false
      }

      function e(v, y, z, w, B) {
        var H = y.isNull || z.isNull;
        if (H && !this.areasVisible) return null;
        var K, S;
        if (H) {
          if (B && b) {
            B = B.vars.value;
            K = B.accValue;
            B = B[m.name]
          } else B = K = r;
          S = k && b ? z.basePosition - A.range().step / 2 : y.isNull ? z.basePosition : y.basePosition
        } else {
          K = y.vars.value;
          S = z.vars.value;
          B = (S.value + K.value) / 2;
          K = (S.accValue + K.accValue) / 2;
          S = (z.basePosition + y.basePosition) / 2
        }
        v = new i.visual.Scene(v, {
          index: w,
          source: z.source
        });
        v.dataIndex = z.dataIndex;
        v.vars.category = z.vars.category;
        w = new I(B, q.format(B), B);
        w.accValue =
          K;
        v.vars.value = w;
        v.ownerScene = z;
        v.isInterpolated = z.isInterpolated;
        v.isIntermediate = true;
        v.isSingle = false;
        v.isNull = H;
        v.isAlone = H && z.isNull && y.isNull;
        v.basePosition = S;
        v.orthoPosition = t;
        v.orthoLength = s(K) - t;
        o.onNewScene(v, true);
        return v
      }

      function g(v) {
        for (var y = v.childNodes, z = y.length, w, B; z && (w = y[0]).isNull;) {
          if ((B = w.nextSibling) && !B.isNull) break;
          v.removeAt(0);
          z--
        }
        for (; z && (w = y[z - 1]).isNull;) {
          if ((B = w.previousSibling) && !B.isNull) break;
          v.removeAt(z - 1);
          z--
        }
      }
      var h = new i.visual.Scene(null, {
          panel: this,
          source: a
        }),
        j = a._children,
        l = this.visualRoles.series,
        m = this.visualRoles.value,
        k = this.stacked,
        n = new i.visual.RoleVarHelper(h, m, {
          roleVar: "value",
          hasPercentSubVar: k
        }),
        o = new i.visual.RoleVarHelper(h, this.visualRoles.color, {
          roleVar: "color"
        }),
        p = m.firstDimensionName(),
        q = a.owner.dimensions(p),
        s = this.axes.ortho.scale,
        r = f.scope(function() {
          var v = s.domain(),
            y = v[0];
          v = v[1];
          if (y * v >= 0) return y >= 0 ? y : v;
          return 0
        }),
        t = s(r),
        A = this.axes.base.sceneScale({
          sceneVarName: "category"
        });
      f.scope(function() {
        return l && l.grouping ? l.flatten(a).children() :
          f.query([null])
      }).each(function(v) {
        var y = new i.visual.Scene(h, {
          source: v || a
        });
        y.vars.series = I.fromComplex(v);
        o.onNewScene(y, false);
        j.forEach(function(z, w) {
          var B = z;
          if (v) B = B._childrenByKey[v.key];
          var H = new i.visual.Scene(y, {
            source: B
          });
          H.dataIndex = w;
          H.vars.category = I.fromComplex(z);
          n.onNewScene(H, true);
          w = H.vars.value;
          z = w.value;
          w.accValue = z != null ? z : r;
          o.onNewScene(H, true);
          B = B != null && B.datums().prop("isInterpolated").any(f.truthy);
          H.isInterpolated = B;
          H.isNull = z == null;
          H.isIntermediate = false
        }, this)
      }, this);
      p = h.children().reverse().array();
      var x;
      p.forEach(c, this);
      p.forEach(g, this);
      return h
    }
  });
  f.type("pvc.PointAbstract", i.CategoricalAbstract).add({
    _animatable: true,
    _processOptionsCore: function(a) {
      a.panelSizeRatio = 1;
      this.base(a)
    },
    _hasDataPartRole: function() {
      return true
    },
    _initVisualRoles: function() {
      this.base();
      this._addVisualRole("value", {
        isMeasure: true,
        isRequired: true,
        isPercent: this.options.stacked,
        requireSingleDimension: true,
        requireIsDiscrete: false,
        valueType: Number,
        defaultDimension: "value"
      })
    },
    _initPlotsCore: function() {
      var a =
          this.options,
        b = this._createPointPlot().option("Trend");
      if (a.plot2) {
        a = new i.visual.PointPlot(this, {
          name: "plot2",
          fixed: {
            DataPart: "1"
          },
          defaults: {
            ColorAxis: 2,
            LinesVisible: true,
            DotsVisible: true
          }
        });
        b || (b = a.option("Trend"))
      }
      b && new i.visual.PointPlot(this, {
        name: "trend",
        fixed: {
          DataPart: "trend",
          TrendType: "none",
          ColorRole: "series",
          NullInterpolatioMode: "none"
        },
        defaults: {
          ColorAxis: 2,
          LinesVisible: true,
          DotsVisible: false
        }
      })
    },
    _bindAxes: function(a) {
      this.base(a);
      (a = this.axesByType.base) && a.forEach(function(b) {
        b.scaleType ===
          "discrete" || b.option.defaults({
          Offset: 0.01
        })
      });
      (a = this.axesByType.ortho) && a.forEach(function(b) {
        b.option.defaults({
          Offset: 0.04
        })
      })
    },
    _createPlotPanels: function(a, b) {
      var c = this.plots;
      this.scatterChartPanel = new i.PointPanel(this, a, c.point, Object.create(b));
      var d = c.plot2;
      if (d) {
        i.debug >= 3 && this._log("Creating second Point panel.");
        new i.PointPanel(this, a, d, Object.create(b))
      }
      if (c = c.trend) {
        i.debug >= 3 && this._log("Creating Trends Point panel.");
        new i.PointPanel(this, a, c, Object.create(b))
      }
    },
    defaults: {
      tooltipOffset: 10
    }
  });
  f.type("pvc.DotChart", i.PointAbstract).add({
    _createPointPlot: function() {
      return new i.visual.PointPlot(this, {
        fixed: {
          DotsVisible: true
        }
      })
    }
  });
  f.type("pvc.LineChart", i.PointAbstract).add({
    _createPointPlot: function() {
      return new i.visual.PointPlot(this, {
        fixed: {
          LinesVisible: true
        }
      })
    }
  });
  f.type("pvc.AreaChart", i.PointAbstract).add({
    _createPointPlot: function() {
      return new i.visual.PointPlot(this, {
        fixed: {
          AreasVisible: true
        }
      })
    }
  });
  i.mStackedLineChart = f.type("pvc.StackedLineChart", i.PointAbstract).add({
    _createPointPlot: function() {
      return new i.visual.PointPlot(this, {
        fixed: {
          LinesVisible: true,
          Stacked: true
        }
      })
    }
  });
  f.type("pvc.StackedDotChart", i.PointAbstract).add({
    _createPointPlot: function() {
      return new i.visual.PointPlot(this, {
        fixed: {
          DotsVisible: true,
          Stacked: true
        }
      })
    }
  });
  i.mStackedAreaChart = f.type("pvc.StackedAreaChart", i.PointAbstract).add({
    _createPointPlot: function() {
      return new i.visual.PointPlot(this, {
        fixed: {
          AreasVisible: true,
          Stacked: true
        },
        defaults: {
          LinesVisible: true
        }
      })
    }
  });
  f.type("pvc.HeatGridPanel", i.CategoricalAbstractPanel).init(function(a, b, c, d) {
    this.base(a,
      b, c, d);
    this.axes.size = a._getAxis("size", c.option("SizeAxis") - 1);
    b = this.visualRoles;
    d = c.option("SizeRole");
    b.size = a.visualRole(d);
    this.useShapes = c.option("UseShapes");
    this.shape = c.option("Shape");
    this.nullShape = c.option("NullShape")
  }).add({
    defaultBorder: 1,
    nullBorder: 2,
    selectedBorder: 2,
    _createCore: function() {
      var a = this;
      a.base();
      var b = a._calcCellSize(),
        c = a.isOrientationVertical() ? "bottom" : "left",
        d = i.BasePanel.relativeAnchor[c],
        e = i.BasePanel.parallelLength[c],
        g = i.BasePanel.orthogonalLength[c],
        h = a.visualRoles.series.flatten(a.data, {
          visible: true
        }),
        j = a._buildScene(a.visibleData({
          ignoreNulls: false
        }), h, b);
      h = j.isColorBound;
      var l = j.isSizeBound,
        m = a._buildSignsWrapper(j),
        k = a.compatVersion() <= 1,
        n = this.axes.base.scale,
        o = this.axes.ortho.scale,
        p = n.range().step,
        q = o.range().step,
        s = p / 2,
        r = q / 2;
      c = (new i.visual.Panel(a, a.pvPanel)).pvMark.data(j.childNodes)[c](function(t) {
        return o(t.vars.series.value) - r
      })[g](q);
      g = ["panel"];
      k && g.push("");
      g = {
        extensionId: g,
        wrapper: m
      };
      a.useShapes || f.copy(g, {
        noSelect: false,
        noHover: false,
        noClick: false,
        noDoubleClick: false,
        freeColor: false,
        noTooltip: k
      });
      a.pvHeatGrid = (new i.visual.Panel(a, c, g)).lock("data", function(t) {
        return t.childNodes
      }).pvMark.lock(d, function(t) {
          return n(t.vars.category.value) - s
        }).lock(e, p).antialias(false);
      a.shapes = a.useShapes ? a._createShapesHeatMap(b, m, h, l) : a._createNoShapesHeatMap(h);
      if (a.valuesVisible && !a.valuesMask) a.valuesMask = a._getDefaultValuesMask(h, l);
      if (b = i.visual.ValueLabel.maybeCreate(a, a.pvHeatGrid, {
        wrapper: m
      })) a.pvHeatGridLabel = b.pvMark
    },
    _calcCellSize: function() {
      var a = this.axes.x.scale,
        b = this.axes.y.scale;
      a = (a.max - a.min) / a.domain().length;
      b = (b.max - b.min) / b.domain().length;
      if (!this.isOrientationVertical()) {
        var c = a;
        a = b;
        b = c
      }
      return {
        width: a,
        height: b
      }
    },
    _buildSignsWrapper: function(a) {
      if (this.compatVersion() > 1) return null;
      var b = f.query(a.childNodes).object({
        name: function(c) {
          return "" + c.vars.series.value
        },
        value: function(c) {
          return f.query(c.childNodes).object({
            name: function(d) {
              return "" + d.vars.category.value
            },
            value: function(d) {
              return (d = d.vars.color) ? "" + d.value : null
            }
          })
        }
      });
      return function(c) {
        return function(d) {
          var e =
              b[d.vars.series.value],
            g = d.vars.category.rawValue,
            h = Object.create(this.parent),
            j = Object.create(this);
          j.parent = h;
          var l = d.childIndex();
          d = d.parent.childIndex();
          h.index = l;
          j.index = d;
          return c.call(j, e, g)
        }
      }
    },
    _getDefaultValuesMask: function(a, b) {
      var c = this.visualRoles;
      if (a = a ? "color" : b ? "size" : null) return "{#" + c[a].firstDimensionName() + "}"
    },
    _createNoShapesHeatMap: function(a) {
      var b = this._buildGetBaseFillColor(a);
      return this.pvHeatGrid.sign.override("defaultColor", function(c) {
        if (c === "stroke") return null;
        return b.call(this.pvMark,
          this.scene)
      }).override("interactiveColor", function(c, d) {
        var e = this.scene;
        if (e.isActive) return c.alpha(0.6);
        if (e.anySelected() && !e.isSelected()) return this.dimColor(c, d);
        return this.base(c, d)
      }).override("dimColor", function(c) {
        return i.toGrayScale(c, 0.6)
      }).pvMark.lineWidth(1.5)
    },
    _buildGetBaseFillColor: function(a) {
      var b = this.axes.color;
      return a ? b.sceneScale({
        sceneVarName: "color"
      }) : f.fun.constant(b.option("Unbound"))
    },
    _createShapesHeatMap: function(a, b, c, d) {
      var e = this;
      a = e._calcDotAreaRange(a);
      d && e.axes.size.setScaleRange(a);
      b = {
        extensionId: "dot",
        freePosition: true,
        activeSeriesAware: false,
        wrapper: b,
        tooltipArgs: e._buildShapesTooltipArgs(c, d)
      };
      e = (new i.visual.DotSizeColor(e, e.pvHeatGrid, b)).override("dimColor", function(g) {
        return i.toGrayScale(g, 0.6)
      }).pvMark.lock("shapeAngle");
      d || e.sign.override("defaultSize", f.fun.constant(a.max));
      return e
    },
    _calcDotAreaRange: function(a) {
      a = Math.min(a.width, a.height) / 2;
      if (this.shape === "diamond") a /= Math.SQRT2;
      a -= 2;
      a = f.sqr(a);
      var b = 12,
        c = a - b;
      if (c <= 1) {
        a = Math.max(a, 2);
        b = 1;
        c = a - b;
        i.debug >= 2 && this._warn("Using rescue mode dot area calculation due to insufficient space.")
      }
      return {
        min: b,
        max: a,
        span: c
      }
    },
    _buildShapesTooltipArgs: function(a, b) {
      var c = this.chart;
      if (this.compatVersion() <= 1 && this.showsTooltip()) {
        var d = c.options,
          e = d.customTooltip;
        e || (e = function(j, l, m) {
          if (m != null && m[0] !== undefined) return m.join(", ");
          return m
        });
        c = this.visualRoles;
        var g = c.series.grouping.dimensionNames(),
          h = c.category.grouping.dimensionNames();
        return {
          buildTooltip: d.isMultiValued ? function(j) {
            var l = j.scene.group;
            if (!l) return "";
            var m = i.data.Complex.values(l, g);
            l = i.data.Complex.values(l, h);
            var k = [];
            j = j.scene.vars;
            if (b) k[d.sizeValIdx || 0] = j.size.value;
            if (a) k[d.colorValIdx || 0] = j.color.value;
            return e.call(d, m, l, k)
          } : function(j) {
            j = j.scene.vars;
            var l = j[a ? "color" : "size"];
            return e.call(d, j.series.rawValue, j.category.rawValue, l ? l.value : null)
          }
        }
      }
    },
    renderInteractive: function() {
      this.pvPanel.render()
    },
    _buildScene: function(a, b, c) {
      function d(n) {
        var o = new i.visual.Scene(h, {
          source: n
        });
        o.vars.series = I.fromComplex(n);
        j.forEach(function(p) {
          e.call(g, o, p, n)
        })
      }

      function e(n, o, p) {
        n = new i.visual.Scene(n, {
          source: a._childrenByKey[o.key]._childrenByKey[p.key]
        });
        n.vars.category = I.fromComplex(o);
        m.onNewScene(n, true);
        k.onNewScene(n, true)
      }
      var g = this,
        h = new i.visual.Scene(null, {
          panel: g,
          source: a
        }),
        j = a._children,
        l = g.visualRoles,
        m = new i.visual.RoleVarHelper(h, l.color, {
          roleVar: "color"
        }),
        k = new i.visual.RoleVarHelper(h, l.size, {
          roleVar: "size"
        });
      h.cellSize = c;
      b.children().each(d);
      return h
    }
  });
  f.type("pvc.HeatGridChart", i.CategoricalAbstract).add({
    _allowColorPerCategory: true,
    _axisCreateIfUnbound: {
      color: true
    },
    _processOptionsCore: function(a) {
      this.base(a);
      f.set(a, "orthoAxisOrdinal",
        true, "legend", false, "panelSizeRatio", 1);
      a = "value";
      var b = "value2";
      if (this.compatVersion() <= 1) {
        switch (this.options.colorValIdx) {
          case 0:
            a = "value";
            break;
          case 1:
            a = "value2";
            break;
          default:
            a = "value"
        }
        switch (this.options.sizeValIdx) {
          case 0:
            b = "value";
            break;
          case 1:
            b = "value2";
            break;
          default:
            b = "value"
        }
      }
      this._colorDimName = a;
      this._sizeDimName = b
    },
    _getCategoryRoleSpec: function() {
      var a = this.base();
      a.requireIsDiscrete = true;
      return a
    },
    _getColorRoleSpec: function() {
      return {
        isMeasure: true,
        requireSingleDimension: true,
        requireIsDiscrete: false,
        valueType: Number,
        defaultDimension: this._colorDimName
      }
    },
    _initVisualRoles: function() {
      this.base();
      this._addVisualRole("size", {
        isMeasure: true,
        requireSingleDimension: true,
        requireIsDiscrete: false,
        valueType: Number,
        defaultDimension: this._sizeDimName
      })
    },
    _initPlotsCore: function() {
      new i.visual.HeatGridPlot(this)
    },
    _collectPlotAxesDataCells: function(a, b) {
      this.base(a, b);
      if (a.type === "heatGrid" && a.option("UseShapes")) {
        var c = this.visualRole(a.option("SizeRole"));
        if (c.isBound()) {
          b = f.array.lazy(b, "size");
          f.array.lazy(b,
              a.option("SizeAxis") - 1).push({
              plot: a,
              role: c,
              dataPartValue: a.option("DataPart")
            })
        }
      }
    },
    _setAxesScales: function(a) {
      this.base(a);
      if (!a || this.parent)(a = this.axes.size) && a.isBound() && this._createAxisScale(a)
    },
    _createPlotPanels: function(a, b) {
      this.heatGridChartPanel = new i.HeatGridPanel(this, a, this.plots.heatGrid, Object.create(b))
    },
    defaults: {
      colorValIdx: 0,
      sizeValIdx: 1,
      measuresIndexes: [2],
      axisOffset: 0,
      plotFrameVisible: false,
      colorNormByCategory: true,
      numSD: 2
    }
  });
  f.type("pvc.MetricXYAbstract", i.CartesianAbstract).add({
    _processOptionsCore: function(a) {
      this.base(a);
      a.panelSizeRatio = 1
    },
    _initVisualRoles: function() {
      this.base();
      this._addVisualRole("x", {
        isMeasure: true,
        isRequired: true,
        requireSingleDimension: true,
        requireIsDiscrete: false,
        defaultDimension: "x",
        dimensionDefaults: {
          valueType: this.options.timeSeries ? Date : Number
        }
      });
      this._addVisualRole("y", {
        isMeasure: true,
        isRequired: true,
        requireSingleDimension: true,
        requireIsDiscrete: false,
        defaultDimension: "y",
        dimensionDefaults: {
          valueType: Number
        }
      })
    },
    _generateTrendsDataCellCore: function(a, b, c) {
      function d(o) {
        var p = function(x) {
            return x.atoms[m].value
          },
          q = function(x) {
            return x.atoms[k].value
          },
          s = o.datums().sort(null, p).array(),
          r = f.create(j, {
            rows: f.query(s),
            x: p,
            y: q
          }),
          t = c.model(r);
        if (t) {
          var A = n.owner.dimensions(l).intern(this.root._firstTrendAtomProto);
          s.forEach(function(x, v) {
            var y = p(x);
            if (y) {
              x = t.sample(y, q(x), v);
              if (x != null) {
                y = f.set(Object.create(o.atoms), m, y, k, x, l, A);
                a.push(f.set(new i.data.Datum(n.owner, y), "isVirtual", true, "isTrend", true, "trendType", c.type))
              }
            }
          })
        }
      }
      var e = this._serRole,
        g = this.visualRoles.x,
        h = b.role,
        j = b.trend;
      this._warnSingleContinuousValueRole(h);
      var l = this._dataPartRole.firstDimensionName(),
        m = g.firstDimensionName(),
        k = h.firstDimensionName(),
        n = this.visibleData(b.dataPartValue);
      f.scope(function() {
        return e.isBound() ? n.children() : f.query([n])
      }).each(d, this)
    }
  });
  f.type("pvc.data.MetricPointChartTranslationOper").add({
    _meaLayoutRoles: ["x", "y", "color", "size"],
    configureType: function() {
      var a = [],
        b = [];
      this.collectFreeDiscreteAndConstinuousIndexes(b, a);
      var c, d = [];
      c = a.length;
      if (c > 0) {
        for (var e = this._meaLayoutRoles.length, g = 0; g < e && d.length < c;) {
          this._getUnboundRoleDefaultDimNames(this._meaLayoutRoles[g],
            1, d);
          g++
        }
        c = d.length;
        if (c > 0) {
          a.length = c;
          this.defReader({
            names: d,
            indexes: a
          })
        }
      }
      c = b.length;
      if (c > 0) {
        d.length = 0;
        this._getUnboundRoleDefaultDimNames("series", c, d);
        c = d.length;
        if (c > 0) {
          b.length = c;
          this.defReader({
            names: d,
            indexes: b
          })
        }
      }
    }
  });
  f.type("pvc.MetricPointPanel", i.CartesianAbstractPanel).init(function(a, b, c, d) {
    this.base(a, b, c, d);
    this.axes.size = a._getAxis("size", (c.option("SizeAxis") || 0) - 1);
    b = c.option("SizeRole");
    this.visualRoles.size = b ? a.visualRole(b) : null;
    this.linesVisible = c.option("LinesVisible");
    this.dotsVisible =
      c.option("DotsVisible");
    if (!this.linesVisible && !this.dotsVisible) {
      this.linesVisible = true;
      c.option.specify({
        LinesVisible: true
      })
    }
    if (!this.offsetPaddings) this.offsetPaddings = new F(0.01)
  }).add({
    sizeAxisRatio: 0.2,
    sizeAxisRatioTo: "minWidthHeight",
    autoPaddingByDotSize: true,
    _v1DimRoleName: {
      category: "x",
      value: "y"
    },
    _creating: function() {
      var a = this.defaultVisibleBulletGroupScene();
      if (a && !a.hasRenderer()) {
        var b = a.colorAxis,
          c = f.nullyTo(b.option("LegendDrawMarker", true), this.dotsVisible),
          d = f.nullyTo(b.option("LegendDrawLine",
            true), this.linesVisible);
        if (c || d) {
          var e = {
            drawMarker: c,
            drawRule: d
          };
          if (c) {
            e.markerShape = b.option("LegendShape", true) || "circle";
            e.markerPvProto = (new u.Dot).lineWidth(1.5, i.extensionTag).shapeSize(12, i.extensionTag);
            this.extend(e.markerPvProto, "dot", {
              constOnly: true
            })
          }
          if (d) {
            e.rulePvProto = (new u.Line).lineWidth(1.5, i.extensionTag);
            this.extend(e.rulePvProto, "line", {
              constOnly: true
            })
          }
          a.renderer(new i.visual.legend.BulletItemDefaultRenderer(e))
        }
      }
    },
    _getRootScene: function() {
      return f.lazy(this, "_rootScene", this._buildScene,
        this)
    },
    _calcLayout: function(a) {
      var b = this._getRootScene();
      b.isSizeBound && this.axes.size.setScaleRange(this._calcDotAreaRange(a));
      this._calcAxesPadding(a, b)
    },
    _getDotDiameterRefLength: function(a) {
      var b = a.clientSize,
        c = a.paddings;
      switch (this.sizeAxisRatioTo) {
        case "minWidthHeight":
          return Math.min(b.width + c.width, b.height + c.height);
        case "width":
          return b.width + c.width;
        case "height":
          return b.height + c.height
      }
      i.debug >= 2 && this._log(f.format("Invalid option 'sizeAxisRatioTo' value. Assuming 'minWidthHeight'.", [this.sizeAxisRatioTo]));
      this.sizeRatioTo = "minWidthHeight";
      return this._getDotDiameterRefLength(a)
    },
    _calcDotRadiusRange: function(a) {
      a = this.sizeAxisRatio / 2 * this._getDotDiameterRefLength(a);
      return {
        min: Math.sqrt(12),
        max: a
      }
    },
    _calcDotAreaRange: function(a) {
      var b = this._calcDotRadiusRange(a);
      if (this.shape === "diamond") {
        b.max /= Math.SQRT2;
        b.min /= Math.SQRT2
      }
      a = f.sqr(b.max);
      b = f.sqr(b.min);
      var c = a - b;
      if (c <= 1) {
        a = Math.max(a, 2);
        b = 1;
        c = a - b;
        i.debug >= 3 && this._log("Using rescue mode dot area calculation due to insufficient space.")
      }
      return {
        min: b,
        max: a,
        span: c
      }
    },
    _calcAxesPadding: function(a, b) {
      var c;
      if (this.autoPaddingByDotSize) {
        var d = this.axes,
          e = a.clientSize,
          g = a.paddings;
        c = {};
        d.x.setScaleRange(e.width);
        d.y.setScaleRange(e.height);
        var h = d.base.sceneScale({
            sceneVarName: "x"
          }),
          j = d.ortho.sceneScale({
            sceneVarName: "y"
          }),
          l = d.base.scale.max,
          m = d.ortho.scale.max,
          k = b.isSizeBound,
          n = k ? this.axes.size.scale : null;
        if (!n) {
          d = f.number.as(this._getExtension("dot", "shapeRadius"), 0);
          if (d <= 0) {
            d = f.number.as(this._getExtension("dot", "shapeSize"), 0);
            if (d <= 0) d = 12
          } else d =
            f.sqr(d);
          n = f.fun.constant(d)
        }
        c = {};
        var o;
        if (this.offsetPaddings) {
          o = {};
          F.names.forEach(function(q) {
            var s = i.BasePanel.orthogonalLength[q];
            o[q] = (this.offsetPaddings[q] || 0) * (e[s] + g[s])
          }, this)
        }
        var p = function(q, s) {
          if (o) s += o[q] || 0;
          if (s < 0) s = 0;
          var r = c[q];
          if (r == null || s > r) c[q] = s
        };
        b.children().selectMany(function(q) {
          return q.childNodes
        }).each(function(q) {
          var s = h(q),
            r = j(q);
          q = Math.sqrt(n(k ? q.vars.size.value : 0));
          p("left", q - s);
          p("bottom", q - r);
          p("right", s + q - l);
          p("top", r + q - m)
        })
      } else c = this._calcRequestPaddings(a);
      a.requestPaddings =
        c
    },
    _createCore: function() {
      var a = this;
      a.base();
      var b = a.chart,
        c = a._getRootScene(),
        d = a._buildSignsWrapper(),
        e = a.compatVersion() <= 1;
      this._finalizeScene(c);
      a.pvPanel.zOrder(1);
      this.pvScatterPanel = (new i.visual.Panel(a, a.pvPanel, {
        extensionId: "panel"
      })).lock("data", c.childNodes).pvMark;
      b = b.selectableByFocusWindow();
      var g = c.isColorBound && this.visualRoles.color.isDiscrete();
      b = (new i.visual.Line(a, a.pvScatterPanel, {
        extensionId: "line",
        wrapper: d,
        noTooltip: false,
        noSelect: b,
        showsSelection: !b
      })).lockMark("data",
        function(h) {
          return h.childNodes
        }).intercept("visible", function(h) {
          if (!a.linesVisible) return false;
          var j = this.delegateExtension();
          if (j == null) j = !h.isNull && (!c.isSizeBound && !c.isColorBound || c.isSizeBound && h.vars.size.value != null || c.isColorBound && (g || h.vars.color.value != null));
          return j
        }).override("x", function() {
          return this.scene.basePosition
        }).override("y", function() {
          return this.scene.orthoPosition
        });
      a.pvLine = b.pvMark;
      b = (new i.visual.DotSizeColor(a, a.pvLine, {
        extensionId: "dot",
        wrapper: d,
        activeSeriesAware: a.linesVisible
      })).override("x",
        function() {
          return this.scene.basePosition
        }).override("y", function() {
          return this.scene.orthoPosition
        }).override("color", function(h) {
          if (!a.dotsVisible && !this.scene.isActive && !this.scene.isSingle) return i.invisibleFill;
          return this.base(h)
        });
      if (c.isSizeBound) a.autoPaddingByDotSize && a.sizeAxisRatioTo === "minWidthHeight" || a.pvPanel.borderPanel.overflow("hidden");
      else b.override("baseSize", function() {
        if (!a.dotsVisible)
          if (this.scene.isSingle) {
            var h = Math.max(a.pvLine.scene[this.pvMark.index].lineWidth, 0.2) /
              2;
            return f.sqr(h)
          }
        return this.base()
      });
      a.pvDot = b.pvMark;
      a.pvDot.rubberBandSelectionMode = "center";
      if (i.visual.ValueLabel.isNeeded(a)) {
        b = ["label"];
        e && b.push("lineLabel");
        if (d = i.visual.ValueLabel.maybeCreate(a, a.pvDot, {
          extensionId: b,
          wrapper: d
        })) a.pvHeatGridLabel = d.pvMark
      }
    },
    _buildSignsWrapper: function() {
      if (this.compatVersion() > 1) return null;
      return function(a) {
        return function(b) {
          var c = {
              category: b.vars.x.rawValue,
              value: b.vars.y.rawValue
            },
            d = Object.create(this);
          d.index = b.dataIndex;
          return a.call(d, c)
        }
      }
    },
    renderInteractive: function() {
      this.pvScatterPanel.render()
    },
    _buildScene: function() {
      function a(k) {
        var n = new i.visual.Scene(e, {
          source: k
        });
        n.vars.series = I.fromComplex(k);
        h.onNewScene(n, false);
        k.datums().each(function(o, p) {
          var q = o.atoms[l.name];
          if (q.value != null) {
            var s = o.atoms[m.name];
            if (s.value != null) {
              o = new i.visual.Scene(n, {
                source: o
              });
              o.dataIndex = p;
              o.vars.x = I.fromAtom(q);
              o.vars.y = I.fromAtom(s);
              j.onNewScene(o, true);
              h.onNewScene(o, true);
              o.isIntermediate = false
            }
          }
        })
      }

      function b(k) {
        for (var n = k.childNodes, o, p = 0, q = 0, s = n.length; p < s; p++, q++) {
          var r = n[q];
          r.isSingle = !o && !r.nextSibling;
          o && c(k, o, r, q) && q++;
          o = r
        }
      }

      function c(k, n, o, p) {
        var q = m.type.cast.call(null, (+o.vars.y.value + +n.vars.y.value) / 2);
        n = l.type.cast.call(null, (+o.vars.x.value + +n.vars.x.value) / 2);
        k = new i.visual.Scene(k, {
          index: p,
          source: o.datum
        });
        k.dataIndex = o.dataIndex;
        k.vars.x = new I(n, l.format(n), n);
        k.vars.y = new I(q, m.format(q), q);
        j.onNewScene(k, true);
        h.onNewScene(k, true);
        k.ownerScene = o;
        k.isIntermediate = true;
        k.isSingle = false;
        return k
      }
      var d = this.visibleData({
          ignoreNulls: false
        }),
        e = new i.visual.Scene(null, {
          panel: this,
          source: d
        }),
        g = this.visualRoles,
        h = new i.visual.RoleVarHelper(e, g.color, {
          roleVar: "color"
        }),
        j = new i.visual.RoleVarHelper(e, g.size, {
          roleVar: "size"
        }),
        l = d.owner.dimensions(g.x.firstDimensionName()),
        m = d.owner.dimensions(g.y.firstDimensionName());
      d.children().each(a, this);
      e.children().each(b, this);
      return e
    },
    _finalizeScene: function(a) {
      var b = this.axes,
        c = b.base.sceneScale({
          sceneVarName: "x"
        }),
        d = b.ortho.sceneScale({
          sceneVarName: "y"
        });
      a.children().selectMany(function(e) {
        return e.childNodes
      }).each(function(e) {
        e.basePosition =
          c(e);
        e.orthoPosition = d(e)
      });
      return a
    }
  });
  f.type("pvc.MetricPointAbstract", i.MetricXYAbstract).add({
    _initPlotsCore: function() {
      this._createPointPlot().option("Trend") && new i.visual.MetricPointPlot(this, {
        name: "trend",
        fixed: {
          DataPart: "trend",
          TrendType: "none",
          NullInterpolatioMode: "none",
          ColorRole: "series",
          SizeRole: null,
          SizeAxis: null,
          OrthoAxis: 1
        },
        defaults: {
          ColorAxis: 2,
          LinesVisible: true,
          DotsVisible: false
        }
      })
    },
    _hasDataPartRole: function() {
      return true
    },
    _getColorRoleSpec: function() {
      return {
        defaultSourceRole: "series",
        defaultDimension: "color*",
        dimensionDefaults: {
          valueType: Number
        }
      }
    },
    _initVisualRoles: function() {
      this.base();
      this._addVisualRole("size", {
        isMeasure: true,
        requireSingleDimension: true,
        requireIsDiscrete: false,
        defaultDimension: "size",
        dimensionDefaults: {
          valueType: Number
        }
      })
    },
    _getTranslationClass: function(a) {
      return f.type(this.base(a)).add(i.data.MetricPointChartTranslationOper)
    },
    _collectPlotAxesDataCells: function(a, b) {
      this.base(a, b);
      if (a.type === "scatter" && a.option("DotsVisible")) {
        var c = a.option("SizeRole");
        if (c) {
          c =
            this.visualRole(c);
          if (c.isBound()) {
            b = f.array.lazy(b, "size");
            f.array.lazy(b, a.option("SizeAxis") - 1).push({
              plot: a,
              role: c,
              dataPartValue: a.option("DataPart")
            })
          }
        }
      }
    },
    _setAxesScales: function(a) {
      this.base(a);
      if (!a || this.parent)(a = this.axes.size) && a.isBound() && this._createAxisScale(a)
    },
    _createPlotPanels: function(a, b) {
      var c = this.options;
      b = f.set(Object.create(b), "sizeAxisRatio", c.sizeAxisRatio, "sizeAxisRatioTo", c.sizeAxisRatioTo, "autoPaddingByDotSize", c.autoPaddingByDotSize);
      this.scatterChartPanel = new i.MetricPointPanel(this,
        a, this.plots.scatter, b);
      (c = this.plots.trend) && new i.MetricPointPanel(this, a, c, Object.create(b))
    },
    defaults: {
      axisOriginIsZero: false,
      tooltipOffset: 10
    }
  });
  f.type("pvc.MetricDotChart", i.MetricPointAbstract).add({
    _createPointPlot: function() {
      return new i.visual.MetricPointPlot(this, {
        fixed: {
          DotsVisible: true
        }
      })
    }
  });
  f.type("pvc.MetricLineChart", i.MetricPointAbstract).add({
    _createPointPlot: function() {
      return new i.visual.MetricPointPlot(this, {
        fixed: {
          LinesVisible: true
        }
      })
    }
  });
  f.type("pvc.BulletChart", i.BaseChart).init(function(a) {
    a =
      a || {};
    var b = a.dimensionGroups || (a.dimensionGroups = {}),
      c = b.range || (b.range = {});
    if (c.valueType === undefined) c.valueType = Number;
    b = b.marker || (b.marker = {});
    if (b.valueType === undefined) b.valueType = Number;
    this.base(a)
  }).add({
    bulletChartPanel: null,
    allowNoData: true,
    _processOptionsCore: function(a) {
      a.legend = false;
      a.selectable = false;
      this.base(a)
    },
    _initVisualRoles: function() {
      this.base();
      this._addVisualRole("title", {
        defaultDimension: "title*"
      });
      this._addVisualRole("subTitle", {
        defaultDimension: "subTitle*"
      });
      this._addVisualRole("value", {
        isMeasure: true,
        requireIsDiscrete: false,
        valueType: Number,
        defaultDimension: "value*"
      });
      this._addVisualRole("marker", {
        isMeasure: true,
        requireIsDiscrete: false,
        valueType: Number,
        defaultDimension: "marker*"
      });
      this._addVisualRole("range", {
        isMeasure: true,
        requireIsDiscrete: false,
        valueType: Number,
        defaultDimension: "range*"
      })
    },
    _createTranslation: function(a) {
      a = this.base(a);
      var b = a.virtualItemSize();
      if (b) switch (b) {
        case 1:
          a.defReader({
            names: "value"
          });
          break;
        case 2:
          a.defReader({
            names: ["title", "value"]
          });
          break;
        case 3:
          a.defReader({
            names: ["title",
              "value", "marker"
            ]
          });
          break;
        default:
          a.defReader({
            names: ["title", "subTitle", "value", "marker"]
          });
          b > 4 && a.defReader({
            names: "range",
            indexes: u.range(4, b)
          });
          break
      }
      return a
    },
    _initPlotsCore: function() {
      new i.visual.BulletPlot(this)
    },
    _preRenderContent: function(a) {
      this.bulletChartPanel = new i.BulletChartPanel(this, this.basePanel, this.plots.bullet, a)
    },
    defaults: {
      compatVersion: 1,
      orientation: "horizontal",
      bulletSize: 30,
      bulletSpacing: 50,
      bulletMargin: 100,
      bulletTitle: "Title",
      bulletSubtitle: "",
      bulletTitlePosition: "left",
      tooltipFormat: function(a, b, c) {
        return this.chart.options.valueFormat(c)
      },
      crosstabMode: false,
      seriesInRows: false
    }
  });
  f.type("pvc.BulletChartPanel", i.PlotPanel).add({
    pvBullets: null,
    pvBullet: null,
    data: null,
    onSelectionChange: null,
    _createCore: function(a) {
      var b = this.chart,
        c = b.options,
        d = this.buildData(),
        e = c.orientation == "horizontal" ? "left" : "bottom",
        g, h, j, l, m, k, n, o;
      if (c.orientation == "horizontal") {
        a = a.clientSize.width - this.chart.options.bulletMargin - 20;
        g = 0;
        switch (c.bulletTitlePosition) {
          case "top":
            k = this.chart.options.bulletMargin;
            j = 0;
            h = "left";
            l = -12;
            o = parseInt(c.titleSize / 2, 10);
            break;
          case "bottom":
            k = this.chart.options.bulletMargin;
            j = 0;
            h = "left";
            l = c.bulletSize + 32;
            o = 0;
            break;
          case "right":
            k = 5;
            j = a + 5;
            h = "left";
            l = parseInt(c.bulletSize / 2, 10);
            o = 0;
            break;
          case "left":
          default:
            k = this.chart.options.bulletMargin;
            j = 0;
            l = parseInt(c.bulletSize / 2, 10);
            h = "right";
            o = 0
        }
        m = "bottom";
        n = function() {
          return this.index * (c.bulletSize + c.bulletSpacing) + o
        }
      } else {
        a = a.clientSize.height - this.chart.options.bulletMargin - 20;
        switch (c.bulletTitlePosition) {
          case "top":
            k = this.chart.options.bulletMargin;
            j = 0;
            h = "left";
            l = -20;
            g = 0;
            n = undefined;
            break;
          case "bottom":
            k = this.chart.options.bulletMargin;
            j = 0;
            h = "left";
            l = a + 20;
            g = 0;
            n = 20;
            break;
          case "right":
            k = 5;
            j = this.chart.options.bulletSize + 40;
            h = "left";
            l = a;
            g = -Math.PI / 2;
            n = undefined;
            break;
          case "left":
          default:
            k = this.chart.options.bulletMargin;
            j = -12;
            l = this.height - this.chart.options.bulletMargin - 20;
            h = "left";
            g = -Math.PI / 2;
            n = undefined
        }
        m = "right";
        k = function() {
          return c.bulletMargin + this.index * (c.bulletSize + c.bulletSpacing)
        }
      }
      this.pvBullets = this.pvPanel.add(u.Panel).data(d)[i.BasePanel.orthogonalLength[e]](a)[i.BasePanel.parallelLength[e]](this.chart.options.bulletSize).margin(20).left(k).top(n);
      this.pvBullet = this.pvBullets.add(u.Layout.Bullet).orient(e).ranges(function(r) {
        return r.ranges
      }).measures(function(r) {
        return r.measures
      }).markers(function(r) {
        return r.markers
      });
      if (b.clickable() && this.clickAction) {
        var p = this;
        this.pvBullet.cursor("pointer").event("click", function(r) {
          return p.clickAction(r.title, r.subtitle, r.measures, u.event)
        })
      }
      this.pvBulletRange = this.pvBullet.range.add(u.Bar);
      this.pvBulletMeasure = this.pvBullet.measure.add(u.Bar).text(function(r, t) {
        return t.formattedMeasures[this.index]
      });
      this.pvBulletMarker = this.pvBullet.marker.add(u.Dot).shape("square").fillStyle("white").text(function(r, t) {
        return t.formattedMarkers[this.index]
      });
      if (this.showsTooltip()) {
        var q = this;
        this.pvBulletMeasure.localProperty("tooltip").tooltip(function(r, t) {
          return b.options.tooltipFormat.call(q, t.title, t.subtitle, r)
        });
        this.pvBulletMarker.localProperty("tooltip").tooltip(function(r, t) {
          return b.options.tooltipFormat.call(q, t.title, t.subtitle, r)
        });
        this.pvBulletMeasure.event("mouseover", u.Behavior.tipsy(this.chart._tooltipOptions));
        this.pvBulletMarker.event("mouseover", u.Behavior.tipsy(this.chart._tooltipOptions))
      }
      this.pvBulletRule = this.pvBullet.tick.add(u.Rule);
      this.pvBulletRuleLabel = this.pvBulletRule.anchor(m).add(u.Label).text(this.pvBullet.x.tickFormat);
      this.pvBulletTitle = this.pvBullet.anchor(e).add(u.Label).font("bold 12px sans-serif").textAngle(g).left(-10).textAlign(h).textBaseline("bottom").left(j).top(l).text(function(r) {
        return r.formattedTitle
      });
      this.pvBulletSubtitle = this.pvBullet.anchor(e).add(u.Label).textStyle("#666").textAngle(g).textAlign(h).textBaseline("top").left(j).top(l).text(function(r) {
        return r.formattedSubtitle
      });
      var s = typeof c.axisDoubleClickAction == "function" ? function(r, t) {
        c.axisDoubleClickAction(r, t)
      } : null;
      if (b.doubleClickable() && s) {
        this.pvBulletTitle.cursor("pointer").events("all").event("dblclick", function(r) {
          s(r, arguments[arguments.length - 1])
        });
        this.pvBulletSubtitle.cursor("pointer").events("all").event("dblclick", function(r) {
          s(r, arguments[arguments.length - 1])
        })
      }
    },
    applyExtensions: function() {
      this.base();
      this.extend(this.pvBullets, "bulletsPanel");
      this.extend(this.pvBullet, "bulletPanel");
      this.extend(this.pvBulletRange,
        "bulletRange");
      this.extend(this.pvBulletMeasure, "bulletMeasure");
      this.extend(this.pvBulletMarker, "bulletMarker");
      this.extend(this.pvBulletRule, "bulletRule");
      this.extend(this.pvBulletRuleLabel, "bulletRuleLabel");
      this.extend(this.pvBulletTitle, "bulletTitle");
      this.extend(this.pvBulletSubtitle, "bulletSubtitle")
    },
    _getExtensionId: function() {
      return [{
        abs: "content"
      }].concat(this.base())
    },
    buildData: function() {
      var a = this.chart,
        b = a.options,
        c = a.visualRoles.title.grouping,
        d = a.visualRoles.subTitle.grouping,
        e = a.visualRoles.value.grouping,
        g = a.visualRoles.marker.grouping,
        h = a.visualRoles.range.grouping,
        j = {
          title: b.bulletTitle,
          formattedTitle: b.bulletTitle,
          subtitle: b.bulletSubtitle,
          formattedSubtitle: b.bulletSubtitle,
          ranges: f.array.to(b.bulletRanges) || [],
          measures: f.array.to(b.bulletMeasures) || [],
          markers: f.array.to(b.bulletMarkers) || []
        };
      f.set(j, "formattedRanges", j.ranges.map(String), "formattedMeasures", j.measures.map(String), "formattedMarkers", j.markers.map(String));
      return !e && !c && !g && !d && !h ? [j] : a.data.datums().select(function(l) {
        var m = Object.create(j),
          k;
        if (e) {
          k = e.view(l);
          m.measures = k.values();
          m.formattedMeasures = k.labels()
        }
        if (c) {
          k = c.view(l);
          m.title = k.value;
          m.formattedTitle = k.label
        }
        if (d) {
          k = d.view(l);
          m.subtitle = k.value;
          m.formattedSubtitle = k.label
        }
        if (g) {
          k = g.view(l);
          m.markers = k.values();
          m.formattedMarkers = k.labels()
        }
        if (h) {
          k = h.view(l);
          m.ranges = k.values();
          m.formattedRanges = k.labels()
        }
        return m
      }, this).array()
    }
  });
  f.type("pvc.ParallelCoordinates", i.BaseChart).init(function(a) {
    a = a || {};
    a.dimensions = a.dimensions || {};
    if (!a.dimensions.value) a.dimensions.value = {
      valueType: null
    };
    this.base(a)
  }).add({
    parCoordPanel: null,
    _preRenderContent: function(a) {
      this.parCoordPanel = new i.ParCoordPanel(this, this.basePanel, f.create(a, {
        topRuleOffset: this.options.topRuleOffset,
        botRuleOffset: this.options.botRuleOffset,
        leftRuleOffset: this.options.leftRuleOffset,
        rightRuleOffset: this.options.rightRuleOffset,
        sortCategorical: this.options.sortCategorical,
        mapAllDimensions: this.options.mapAllDimensions,
        numDigits: this.options.numDigits
      }))
    },
    defaults: f.create(i.BaseChart.prototype.defaults, {
      compatVersion: 1,
      topRuleOffset: 30,
      botRuleOffset: 30,
      leftRuleOffset: 60,
      rightRuleOffset: 60,
      sortCategorical: true,
      mapAllDimensions: true,
      numDigits: 0
    })
  });
  f.type("pvc.ParCoordPanel", i.BasePanel).add({
    anchor: "fill",
    pvParCoord: null,
    dimensions: null,
    dimensionDescr: null,
    data: null,
    retrieveData: function() {
      var a = this.chart.data,
        b = this.chart.options.numDigits;
      this.dimensions = a.getVisibleCategories();
      var c = a.getValues(),
        d = a.getVisibleSeriesIndexes(),
        e = a.getVisibleCategoriesIndexes(),
        g = a.getCategories(),
        h = this.chart.options.mapAllDimensions ?
          e.map(function(x) {
            return isNaN(c[x][0]) ? {
              categorical: true,
              len: 0,
              map: []
            } : {
              categorical: false,
              len: 0,
              map: [],
              displayValue: []
            }
          }) : e.map(function(x) {
          return isNaN(c[x][0]) ? {
            categorical: true,
            len: 0,
            map: []
          } : null
        }),
        j = function(x, v) {
          x = h[x];
          var y = null;
          if (x.categorical) {
            y = x.map[v];
            if (y == null) {
              y = x.len;
              x.len++;
              x.map[v] = y
            }
          } else {
            var z = v.toFixed(b);
            y = x.map[z];
            if (y == null) {
              y = x.len;
              x.len++;
              x.map[z] = y;
              x.displayValue[z] = v
            }
          }
          return y
        };
      for (var l in h)
        if (h.hasOwnProperty(l) && h[l] && h[l].categorical) h[l].displayValue = h[l].map;
      var m;
      if (this.chart.options.sortCategorical || this.chart.options.mapAllDimensions)
        for (a = 0; a < h.length; a++)
          if (h[a]) {
            for (l = 0; l < c[a].length; l++) j(a, c[a][l]);
            var k = h[a].map,
              n = [];
            for (m in k) k.hasOwnProperty(m) && n.push(m);
            n.sort();
            if (h[a].categorical)
              for (l = 0; l < n.length; l++) k[n[l]] = l;
            else
              for (l = 0; l < n.length; l++) k[n[l]].index = l
          }
      var o = function(x) {
        var v = {};
        for (var y in e)
          if (e.hasOwnProperty(y)) v[g[y]] = h[y] ? j(y, c[y][x]) : c[y][x];
        return v
      };
      this.data = d.map(function(x) {
        return o(x)
      });
      d = this.dimensions.map(function(x) {
        var v = {},
          y = x.split("__");
        v.id = x;
        v.name = y[0];
        v.unit = y.length > 1 ? y[1] : "";
        return v
      });
      for (a = 0; a < d.length; a++) {
        m = d[a];
        k = e[a];
        m.orgRowIndex = k;
        var p = c[k].length,
          q, s, r, t;
        if (h[k]) {
          n = q = s = r = h[k].displayValue[c[k][0]];
          for (l = 1; l < p; l++) {
            t = h[k].displayValue[c[k][l]];
            if (t < n) {
              s = n;
              n = t
            }
            if (t > q) {
              r = q;
              q = t
            }
          }
        } else {
          n = q = s = r = c[k][0];
          for (l = 1; l < p; l++) {
            t = c[k][l];
            if (t < n) {
              s = n;
              n = t
            }
            if (t > q) {
              r = q;
              q = t
            }
          }
        }
        l = (q - r + (s - n)) / 2;
        m.min = n;
        m.max = q;
        m.step = l;
        m.categorical = false;
        if (h[k]) {
          m.map = h[k].map;
          m.mapLength = h[k].len;
          m.categorical = h[k].categorical;
          if (!m.categorical) {
            m.orgValue = [];
            l = h[k].map;
            for (var A in l)
              if (l.hasOwnProperty(A)) m.orgValue[l[A]] = 0 + A
          }
        }
      }
      this.dimensionDescr = function(x, v) {
        for (var y = {}, z = 0; z < x.length; z++) y[x[z]] = v[z];
        return y
      }(this.dimensions, d)
    },
    _createCore: function() {
      function a(w) {
        var B = w.dim;
        A[B].min = Math.max(r[B].domain()[0], r[B].invert(d - w.y - w.dy));
        A[B].max = Math.min(r[B].domain()[1], r[B].invert(d - w.y));
        x = B;
        z.render();
        return false
      }

      function b(w) {
        if (w.dy < 3) {
          var B = w.dim;
          A[B].min = Math.max(r[B].domain()[0], r[B].invert(0));
          A[B].max = Math.min(r[B].domain()[1], r[B].invert(d));
          w.y = h;
          w.dy = k;
          x = B;
          z.render()
        }
        return false
      }
      var c = this;
      this.retrieveData();
      var d = this.height,
        e = this.chart.options.numDigits,
        g = this.chart.options.topRuleOffset,
        h = this.chart.options.botRuleOffset,
        j = this.chart.options.leftRuleOffset,
        l = this.width - this.chart.options.rightRuleOffset,
        m = this.height - g,
        k = m - h,
        n = g - 12,
        o = this.dimensions,
        p = this.dimensionDescr,
        q = function(w, B) {
          var H = p[w].min,
            K = p[w].max;
          w = p[w].step;
          if (B) {
            H -= w;
            K += w
          }
          return u.Scale.linear(H, K).range(h, m)
        },
        s = u.Scale.ordinal(o).splitFlush(j, l),
        r = u.dict(o,
          function(w) {
            var B = q(w, true).range(h, m),
              H = p[w];
            if (H.orgValue && !H.categorical) {
              w = function(K) {
                return B(H.orgValue[K])
              };
              w.domain = function() {
                return B.domain()
              };
              w.invert = function(K) {
                return B.invert(K)
              };
              return w
            }
            return B
          }),
        t = u.dict(o, function(w) {
          return q(w, false).range("steelblue", "brown")
        }),
        A = u.dict(o, function(w) {
          return {
            min: r[w].domain()[0],
            max: r[w].domain()[1]
          }
        }),
        x = o[0];
      j = this.chart.options.mapAllDimensions ? function(w) {
        return o.every(function(B) {
          var H = p[B];
          H = H.orgValue && !H.categorical ? H.orgValue[w[B]] :
            w[B];
          return H >= A[B].min && H <= A[B].max
        })
      } : function(w) {
        return o.every(function(B) {
          return w[B] >= A[B].min && w[B] <= A[B].max
        })
      };
      this.pvParCoord = this.pvPanel.add(u.Panel).data(c.data).visible(j).add(u.Line).data(o).left(function(w) {
        return s(w)
      }).bottom(function(w, B) {
        return r[w](B[w])
      }).strokeStyle("#ddd").lineWidth(1).antialias(false);
      this.pvPanel.add(u.Rule).data(o).left(s).top(g).bottom(h).anchor("top").add(u.Label).top(n).font("bold 10px sans-serif").text(function(w) {
        return p[w].name
      });
      g = [];
      for (var v in p)
        if (p.hasOwnProperty(v)) {
          n =
            p[v];
          if (n.categorical) {
            l = s(n.id) + 6;
            for (var y in n.map)
              if (n.map.hasOwnProperty(y)) g[g.length] = {
                x: l,
                y: r[n.id](n.map[y]) + 3,
                label: y
              }
          }
        }
      this.pvPanel.add(u.Panel).data(g).add(u.Label).left(function(w) {
        return w.x
      }).bottom(function(w) {
        return w.y
      }).text(function(w) {
        return w.label
      }).textAlign("left");
      var z = this.pvPanel.add(u.Panel);
      z.add(u.Panel).data(c.data).visible(j).add(u.Line).data(o).left(function(w) {
        return s(w)
      }).bottom(function(w, B) {
        return r[w](B[w])
      }).strokeStyle(function(w, B) {
        w = p[x];
        return t[x](w.orgValue &&
          !w.categorical ? w.orgValue[B[x]] : B[x])
      }).lineWidth(1);
      c = z.add(u.Panel).data(o.map(function(w) {
          return {
            y: h,
            dy: k,
            dim: w
          }
        })).left(function(w) {
        return s(w.dim) - 30
      }).width(60).fillStyle("rgba(0,0,0,.001)").cursor("crosshair").event("mousedown", u.Behavior.select()).event("select", a).event("selectend", b).add(u.Bar).left(25).top(function(w) {
        return w.y
      }).width(10).height(function(w) {
        return w.dy
      }).fillStyle(function(w) {
        return w.dim == x ? t[w.dim]((A[w.dim].max + A[w.dim].min) / 2) : "hsla(0,0,50%,.5)"
      }).strokeStyle("white").cursor("move").event("mousedown",
          u.Behavior.drag()).event("dragstart", a).event("drag", a);
      c.anchor("bottom").add(u.Label).textBaseline("top").text(function(w) {
        return p[w.dim].categorical ? "" : A[w.dim].min.toFixed(e) + p[w.dim].unit
      });
      c.anchor("top").add(u.Label).textBaseline("bottom").text(function(w) {
        return p[w.dim].categorical ? "" : A[w.dim].max.toFixed(e) + p[w.dim].unit
      });
      this.extend(this.pvParCoord, "parCoord");
      this.extend(this.pvPanel, "chart")
    }
  });
  f.type("pvc.DataTree", i.BaseChart).init(function(a) {
    a = a || {};
    a.dimensionGroups = a.dimensionGroups || {};
    if (!a.dimensionGroups.value) a.dimensionGroups.value = {
      valueType: null
    };
    this.base(a)
  }).add({
    structEngine: null,
    structMetadata: null,
    structDataset: null,
    DataTreePanel: null,
    _getColorRoleSpec: function() {
      return {
        isRequired: true,
        defaultSourceRole: "category",
        requireIsDiscrete: true
      }
    },
    setStructData: function(a) {
      this.structDataset = a.resultset;
      this.structDataset.length || this._log("Warning: Structure-dataset is empty");
      this.structMetadata = a.metadata;
      this.structMetadata.length || this._log("Warning: Structure-Metadata is empty")
    },
    _preRenderContent: function(a) {
      var b = this.structEngine,
        c = b ? b.type : new i.data.ComplexType;
      c.addDimension("value", {});
      var d = new i.data.CrosstabTranslationOper(c, this.structDataset, this.structMetadata, {
        seriesInRows: true,
        crosstabMode: true
      });
      d.configureType();
      if (!b) b = this.structEngine = new i.data.Data({
        type: c
      });
      b.load(d.execute(b));
      i.debug >= 3 && this._log(this.structEngine.getInfo());
      this.dataTreePanel = new i.DataTreePanel(this, this.basePanel, f.create(a, {
        topRuleOffset: this.options.topRuleOffset,
        botRuleOffset: this.options.botRuleOffset,
        leftRuleOffset: this.options.leftRuleOffset,
        rightRuleOffset: this.options.rightRuleOffset,
        boxplotColor: this.options.boxplotColor,
        valueFontsize: this.options.valueFontsize,
        headerFontsize: this.options.headerFontsize,
        border: this.options.border,
        perpConnector: this.options.perpConnector,
        numDigits: this.options.numDigits,
        minVerticalSpace: this.options.minVerticalSpace,
        connectorSpace: this.options.connectorSpace,
        minAspectRatio: this.options.minAspectRatio
      }))
    },
    defaults: {
      compatVersion: 1,
      topRuleOffset: 30,
      botRuleOffset: 30,
      leftRuleOffset: 60,
      rightRuleOffset: 60,
      boxplotColor: "grey",
      headerFontsize: 16,
      valueFontsize: 20,
      border: 2,
      perpConnector: false,
      numDigits: 0,
      connectorSpace: 0.15,
      minVerticalSpace: 0.05,
      minAspectRatio: 2
    }
  });
  f.type("pvc.DataTreePanel", i.PlotPanel).add({
    pvDataTree: null,
    treeElements: null,
    structMap: null,
    structArr: null,
    hRules: null,
    vRules: null,
    rules: null,
    generatePerpConnectors: function(a) {
      this.hRules = [];
      this.vRules = [];
      this.rules = [];
      for (var b in this.structMap) {
        var c = this.structMap[b];
        if (c.children != null) {
          var d = +1E4,
            e = -10000,
            g = c.left + c.width;
          this.hRules.push({
            left: g,
            width: a,
            bottom: c.bottom + c.height / 2
          });
          g += a;
          for (var h in c.children) {
            var j = this.structMap[c.children[h]],
              l = j.bottom + j.height / 2;
            if (l > e) e = l;
            if (l < d) d = l;
            this.hRules.push({
              left: g,
              width: j.left - g,
              bottom: l
            })
          }
          e > d && this.vRules.push({
            left: g,
            bottom: d,
            height: e - d
          })
        }
      }
    },
    generateLineSegment: function(a, b, c, d) {
      var e = [];
      e.push({
        x: a,
        y: b
      });
      e.push({
        x: c,
        y: d
      });
      this.rules.push(e)
    },
    generateConnectors: function(a) {
      this.hRules = [];
      this.vRules = [];
      if (this.chart.options.perpConnector) this.generatePerpConnectors(a);
      else {
        this.rules = [];
        for (var b in this.structMap) {
          var c = this.structMap[b];
          if (c.children != null) {
            var d, e, g, h = +1E4,
              j = -10000;
            for (g in c.children) {
              e = this.structMap[c.children[g]];
              d = e.bottom + e.height / 2;
              if (d > j) j = d;
              if (d < h) h = d
            }
            h = (j + h) / 2;
            d = c.left + c.width;
            j = d + a;
            this.generateLineSegment(d, c.bottom + c.height / 2, j, h);
            for (g in c.children) {
              e = this.structMap[c.children[g]];
              d = e.bottom + e.height / 2;
              this.generateLineSegment(j, h, e.left, d)
            }
          }
        }
      }
    },
    retrieveStructure: function() {
      var a = this.chart.structEngine,
        b = this.chart.options,
        c =
          a.getVisibleCategories();
      this.treeElements = a.getVisibleSeries();
      a = a.getValues();
      c = c.length > 4;
      var d;
      for (d in this.treeElements) this.treeElements[d] = $.trim(this.treeElements[d]);
      var e = [];
      e.getElement = function(o) {
        if (e[o] == null) e[o] = {
          min: +1E4,
          max: -10000
        };
        return e[o]
      };
      e.addValue = function(o, p) {
        o = e.getElement(o);
        if (p < o.min) o.min = p;
        if (p > o.max) o.max = p;
        return o
      };
      var g, h, j;
      for (d in this.treeElements) {
        j = this.treeElements[d];
        g = j[0];
        h = g.charCodeAt(0);
        j = parseInt(j.slice(1), 10);
        e.addValue("__cols", h);
        e.addValue(g,
          j)
      }
      g = e.getElement("__cols");
      var l = this.innerWidth / (g.max - g.min + 1),
        m = l - b.connectorSpace * l;
      h = m / b.minAspectRatio;
      var k = g.min;
      delete e.__cols;
      for (d in e) {
        g = e[d];
        if (typeof g != "function") {
          var n = g.max - g.min + 1;
          g.gridHeight = this.innerHeight / n;
          g.cellHeight = g.gridHeight * (1 - b.minVerticalSpace);
          if (g.cellHeight > h) g.cellHeight = h;
          g.relBottom = (g.gridHeight - g.cellHeight) / 2;
          g.numRows = n
        }
      }
      b = new RegExp("[\\s\"']+", "g");
      this.structMap = {};
      for (d in this.treeElements) {
        n = {};
        j = this.treeElements[d];
        n.box_id = j;
        this.structMap[j] =
          n;
        g = j[0];
        h = g.charCodeAt(0);
        j = parseInt(j.slice(1), 10);
        g = e.getElement(g);
        n.colIndex = h - k;
        n.rowIndex = g.numRows - (j - g.min) - 1;
        n.left = this.leftOffs + n.colIndex * l;
        n.width = m;
        if (c) {
          n.bottom = a[4][d];
          n.height = a[5][d]
        } else {
          n.bottom = this.botOffs + n.rowIndex * g.gridHeight + g.relBottom;
          n.height = g.cellHeight
        }
        n.label = a[0][d];
        n.selector = a[1][d];
        n.aggregation = a[2][d];
        h = (a[3][d] || "").replace(b, " ");
        n.children = h === " " || h === "" ? null : h.split(" ")
      }
      this.generateConnectors((l - m) / 2);
      this.structArr = [];
      for (d in this.structMap) {
        j = this.structMap[d];
        this.structArr.push(j)
      }
    },
    findDataValue: function(a, b) {
      for (var c = 0; c < b[0].length; c++)
        if (b[0][c] == a) return b[1][c];
      this._log("Error: value with key : " + a + " not found.")
    },
    generateBoxPlots: function() {
      var a = this.chart.options;
      for (var b in this.structArr) {
        var c = this.structArr[b];
        if (c.values.length) {
          c.subplot = {};
          var d = c.subplot,
            e = [],
            g = c.width / 6;
          d.hRules = [];
          d.vRules = [];
          d.marks = [];
          d.labels = [];
          e.push(this.findDataValue("_p5", c.values));
          e.push(this.findDataValue("_p25", c.values));
          e.push(this.findDataValue("_p50",
            c.values));
          e.push(this.findDataValue("_p75", c.values));
          e.push(this.findDataValue("_p95", c.values));
          var h = false;
          if (typeof e[2] != "undefined") {
            if (e[4] < e[0]) {
              e = e.reverse();
              this._log(" dataset " + c.box_id + " repaired (_p95 was smaller than _p5)")
            }
            if (e[4] > e[0]) d.hScale = u.Scale.linear(e[0], e[4]);
            else {
              h = true;
              d.hScale = u.Scale.linear(e[0] - 1.0E-10, e[0] + 1.0E-10)
            }
            d.hScale.range(c.left + g, c.left + c.width - g);
            g = "" + e[2];
            var j;
            for (j = 0; j < e.length; j++) e[j] = d.hScale(e[j]);
            d.bot = c.bottom + c.height / 3;
            d.top = c.bottom + 2 * c.height /
              3;
            d.mid = (d.top + d.bot) / 2;
            d.textBottom = c.bottom + 15;
            d.textBottom = d.bot - a.valueFontsize - 1;
            if (h) d.vRules.push({
              left: e[0],
              bottom: d.bot,
              lWidth: 3,
              height: d.top - d.bot
            });
            else {
              d.hRules.push({
                left: e[0],
                width: e[1] - e[0],
                lWidth: 1,
                bottom: d.mid
              });
              d.hRules.push({
                left: e[1],
                width: e[3] - e[1],
                lWidth: 1,
                bottom: d.bot
              });
              d.hRules.push({
                left: e[1],
                width: e[3] - e[1],
                lWidth: 1,
                bottom: d.top
              });
              d.hRules.push({
                left: e[3],
                width: e[4] - e[3],
                lWidth: 1,
                bottom: d.mid
              });
              for (j = 0; j < e.length; j++) d.vRules.push({
                left: e[j],
                bottom: d.bot,
                lWidth: j == 2 ? 3 : 1,
                height: d.top - d.bot
              })
            }
            d.labels.push({
              left: e[2],
              bottom: d.textBottom,
              text: this.labelFixedDigits(g),
              size: a.smValueFont,
              color: a.boxplotColor
            })
          }
        }
      }
    },
    labelFixedDigits: function(a) {
      if (typeof a == "string") a = parseFloat(a);
      if (typeof a == "number") a = a.toFixed(this.chart.options.numDigits);
      return "" + a
    },
    addDataPoint: function(a) {
      var b = this.chart.options;
      for (var c in this.structArr) {
        var d = this.structArr[c];
        if (d.values.length) {
          var e = this.findDataValue(a, d.values);
          if (typeof e != "undefined") {
            d = d.subplot;
            var g = d.hScale(e);
            d.marks.push({
              left: g,
              bottom: d.mid,
              color: "green"
            });
            d.labels.push({
              left: g,
              bottom: d.textBottom,
              text: this.labelFixedDigits(e),
              size: b.valueFont,
              color: "green"
            })
          }
        }
      }
    },
    retrieveData: function() {
      var a = this.chart.data,
        b = this.chart.options;
      a.getVisibleCategories();
      var c = a.getVisibleSeries();
      a = a.getValues();
      var d = {},
        e, g = a.length;
      for (var h in this.structArr) {
        var j = this.structArr[h];
        j.values = [];
        for (e = 0; e < g; e++) j.values.push([]);
        d[j.selector] = j
      }
      h = {};
      for (e in c) {
        g = d[c[e]];
        if (typeof g != "undefined")
          for (var l in a) g.values[l].push(a[l][e]);
        else h[c[e]] = true
      }
      for (var m in h) this._log("Could'nt find box for selector: " + m);
      this.generateBoxPlots();
      c = new RegExp("[\\s\"']+", "g");
      if (b.selectParam) {
        b = b.selectParam.replace(c, "");
        if (b != "undefined" && b.length > 0 && typeof window[b] != "undefined") {
          b = window[b];
          this.addDataPoint(b)
        }
      }
    },
    _createCore: function() {
      var a = this,
        b = this.chart.options;
      b.smValueFontsize = Math.round(0.6 * b.valueFontsize);
      b.smValueFont = "" + b.smValueFontsize + "px sans-serif";
      b.valueFont = "" + b.valueFontsize + "px sans-serif";
      var c = b.topRuleOffset,
        d = b.botRuleOffset,
        e = b.leftRuleOffset;
      this.innerWidth = this.width - e - b.rightRuleOffset;
      this.innerHeight = this.height - c - d;
      this.botOffs = d;
      this.leftOffs = e;
      this.retrieveStructure();
      this.retrieveData();
      var g = b.headerFontsize + 3;
      d = this.rules;
      for (c = 0; c < d.length; c++) this.pvPanel.add(u.Line).data(d[c]).left(function(h) {
        return h.x
      }).bottom(function(h) {
        return h.y
      }).lineWidth(1).strokeStyle("black");
      this.pvDataTree = this.pvPanel.add(u.Bar).data(a.structArr).left(function(h) {
        return h.left
      }).bottom(function(h) {
        return h.bottom
      }).height(function(h) {
        return h.height
      }).width(function(h) {
        return h.width
      }).fillStyle("green").add(u.Bar).left(function(h) {
        return h.left +
          b.border
      }).bottom(function(h) {
        return h.bottom + b.border
      }).height(function(h) {
        return h.height - b.border - g
      }).width(function(h) {
        return h.width - 2 * b.border
      }).fillStyle("white").add(u.Label).text(function(h) {
        return h.label
      }).textAlign("center").left(function(h) {
        return h.left + h.width / 2
      }).bottom(function(h) {
        return h.bottom + h.height - b.headerFontsize - 5 + b.headerFontsize / 5
      }).font("" + b.headerFontsize + "px sans-serif").textStyle("white").fillStyle("blue");
      for (c = 0; c < this.structArr.length; c++) {
        d = this.structArr[c];
        this.pvPanel.add(u.Rule).data(d.subplot.hRules).left(function(h) {
          return h.left
        }).width(function(h) {
          return h.width
        }).bottom(function(h) {
          return h.bottom
        }).lineWidth(function(h) {
          return h.lWidth
        }).strokeStyle(a.chart.options.boxplotColor);
        this.pvPanel.add(u.Rule).data(d.subplot.vRules).left(function(h) {
          return h.left
        }).height(function(h) {
          return h.height
        }).bottom(function(h) {
          return h.bottom
        }).lineWidth(function(h) {
          return h.lWidth
        }).strokeStyle(a.chart.options.boxplotColor);
        this.pvPanel.add(u.Dot).data(d.subplot.marks).left(function(h) {
          return h.left
        }).bottom(function(h) {
          return h.bottom
        }).fillStyle(function(h) {
          return h.color
        });
        this.pvPanel.add(u.Label).data(d.subplot.labels).left(function(h) {
          return h.left
        }).bottom(function(h) {
          return h.bottom
        }).font(function(h) {
          return h.size
        }).text(function(h) {
          return h.text
        }).textAlign("center").textStyle(function(h) {
          return h.color
        })
      }
      if (b.perpConnector) {
        this.pvPanel.add(u.Rule).data(a.vRules).left(function(h) {
          return h.left
        }).bottom(function(h) {
          return h.bottom
        }).height(function(h) {
          return h.height
        }).strokeStyle("black");
        this.pvPanel.add(u.Rule).data(a.hRules).left(function(h) {
          return h.left
        }).bottom(function(h) {
          return h.bottom
        }).width(function(h) {
          return h.width
        }).strokeStyle("black")
      }
    },
    applyExtensions: function() {
      this.extend(this.pvDataTree, "dataTree")
    }
  });
  f.type("pvc.data.BoxplotChartTranslationOper").add({
    _configureTypeCore: function() {
      var a = [],
        b = [],
        c = [];
      this.collectFreeDiscreteAndConstinuousIndexes(c, b);
      this._getUnboundRoleDefaultDimNames("category", c.length, a);
      f.query(i.BoxplotChart.measureRolesNames).take(b.length).each(function(d) {
        this._getUnboundRoleDefaultDimNames(d,
          1, a)
      }, this);
      a.length && this.defReader({
        names: a
      })
    }
  });
  f.type("pvc.BoxplotPanel", i.CategoricalAbstractPanel).init(function(a, b, c, d) {
    this.base(a, b, c, d);
    this.boxSizeRatio = c.option("BoxSizeRatio");
    this.maxBoxSize = c.option("BoxSizeMax")
  }).add({
    plotType: "box",
    anchor: "fill",
    _v1DimRoleName: {
      value: "median"
    },
    _createCore: function() {
      function a(k) {
        var n = this.base(k);
        return k === "stroke" ? n.darker(1) : n
      }

      function b(k) {
        k.lock(h, function() {
          return this.pvMark.parent[j]() / 2
        }).override("defaultColor", a);
        return k
      }

      function c(k) {
        k.lock(h,
          function(n) {
            return n.vars.category.boxLeft
          }).lock(j, function(n) {
            return n.vars.category.boxWidth
          });
        return k
      }

      function d(k) {
        c(k);
        k.override("defaultColor", a);
        return k
      }
      this.base();
      var e = this._buildScene(),
        g = this.isOrientationVertical() ? "bottom" : "left",
        h = this.anchorOrtho(g),
        j = this.anchorLength(g),
        l = this.anchorOrthoLength(g),
        m = ["panel"];
      this.compatVersion() <= 1 && m.push("");
      this.pvBoxPanel = (new i.visual.Panel(this, this.pvPanel, {
        extensionId: m
      })).lock("data", e.childNodes).lockMark(h, function(k) {
          k = k.vars.category;
          return k.x - k.width / 2
        }).pvMark[j](function(k) {
        return k.vars.category.width
      });
      this.pvRuleWhiskerUpper = b(new i.visual.Rule(this, this.pvBoxPanel, {
        extensionId: "boxRuleWhisker",
        freePosition: true,
        noHover: false,
        noSelect: false,
        noClick: false,
        noDoubleClick: false,
        showsInteraction: true
      })).intercept("visible", function(k) {
        return k.vars.category.showRuleWhiskerUpper && this.delegateExtension(true)
      }).lock(g, function(k) {
        return k.vars.category.ruleWhiskerUpperBottom
      }).lock(l, function(k) {
        return k.vars.category.ruleWhiskerUpperHeight
      }).pvMark;
      this.pvRuleWhiskerLower = b(new i.visual.Rule(this, this.pvBoxPanel, {
        extensionId: "boxRuleWhisker",
        freePosition: true,
        noHover: false,
        noSelect: false,
        noClick: false,
        noDoubleClick: false,
        showsInteraction: true
      })).intercept("visible", function(k) {
        return k.vars.category.showRuleWhiskerBelow && this.delegateExtension(true)
      }).lock(g, function(k) {
        return k.vars.category.ruleWhiskerLowerBottom
      }).lock(l, function(k) {
        return k.vars.category.ruleWhiskerLowerHeight
      }).pvMark;
      this.pvBar = c(new i.visual.Bar(this, this.pvBoxPanel, {
        extensionId: "boxBar",
        freePosition: true,
        normalStroke: true
      })).intercept("visible", function(k) {
        return k.vars.category.showBox && this.delegateExtension(true)
      }).lock(g, function(k) {
        return k.vars.category.boxBottom
      }).lock(l, function(k) {
        return k.vars.category.boxHeight
      }).override("defaultColor", a).override("defaultStrokeWidth", f.fun.constant(1)).pvMark;
      this.pvRuleMin = d(new i.visual.Rule(this, this.pvBoxPanel, {
        extensionId: "boxRuleMin",
        freePosition: true,
        noHover: false,
        noSelect: false,
        noClick: false,
        noDoubleClick: false,
        showsInteraction: true
      })).intercept("visible", function() {
        return this.scene.vars.minimum.value != null && this.delegateExtension(true)
      }).lock(g, function() {
        return this.scene.vars.minimum.position
      }).pvMark;
      this.pvRuleMax = d(new i.visual.Rule(this, this.pvBoxPanel, {
        extensionId: "boxRuleMax",
        freePosition: true,
        noHover: false,
        noSelect: false,
        noClick: false,
        noDoubleClick: false,
        showsInteraction: true
      })).intercept("visible", function() {
        return this.scene.vars.maximum.value != null && this.delegateExtension(true)
      }).lock(g, function() {
        return this.scene.vars.maximum.position
      }).pvMark;
      this.pvRuleMedian = d(new i.visual.Rule(this, this.pvBoxPanel, {
        extensionId: "boxRuleMedian",
        freePosition: true,
        noHover: false,
        noSelect: false,
        noClick: false,
        noDoubleClick: false,
        showsInteraction: true
      })).intercept("visible", function() {
        return this.scene.vars.median.value != null && this.delegateExtension(true)
      }).lock(g, function() {
        return this.scene.vars.median.position
      }).override("defaultStrokeWidth", f.fun.constant(2)).pvMark
    },
    renderInteractive: function() {
      this.pvBoxPanel.render()
    },
    _buildScene: function() {
      function a(n) {
        var o =
            new i.visual.Scene(g, {
              source: n
            }),
          p = o.vars;
        p.series = new I(null, "");
        var q = p.category = new I(n.value, n.label);
        f.set(q, "group", n, "x", h(n.value), "width", j, "boxWidth", l, "boxLeft", j / 2 - l / 2);
        b.measureVisualRoles().forEach(function(y) {
          var z = c[y.name],
            w;
          if (z) {
            w = n.dimensions(z);
            z = w.sum(d);
            w = new I(z, w.format(z));
            w.position = m(z)
          } else {
            w = new I(null, "");
            w.position = null
          }
          p[y.name] = w
        });
        k.onNewScene(o, true);
        o = p.minimum.value != null;
        var s = p.lowerQuartil.value != null,
          r = p.median.value != null,
          t = p.upperQuartil.value != null,
          A, x,
          v = s || t;
        if (v) {
          A = s ? p.lowerQuartil.position : r ? p.median.position : p.upperQuartil.position;
          x = t ? p.upperQuartil.position : r ? p.median.position : p.lowerQuartil.position;
          if (v = x !== A) {
            q.boxBottom = A;
            q.boxHeight = x - A
          }
        }
        q.showBox = v;
        if (v = p.maximum.value != null) {
          A = t ? p.upperQuartil.position : r ? p.median.position : s ? p.lowerQuartil.position : o ? p.minimum.position : null;
          if (v = A != null) {
            q.ruleWhiskerUpperBottom = A;
            q.ruleWhiskerUpperHeight = p.maximum.position - A
          }
        }
        q.showRuleWhiskerUpper = v;
        if (v = o) {
          x = s ? p.lowerQuartil.position : r ? p.median.position :
            t ? p.upperQuartil.position : null;
          if (v = x != null) {
            A = p.minimum.position;
            q.ruleWhiskerLowerHeight = x - A;
            q.ruleWhiskerLowerBottom = A
          }
        }
        q.showRuleWhiskerBelow = v
      }
      var b = this.chart,
        c = f.query(b.measureVisualRoles()).object({
          name: function(n) {
            return n.name
          },
          value: function(n) {
            return n.firstDimensionName()
          }
        }),
        d = {
          visible: true,
          zeroIfNone: false
        },
        e = this.visibleData({
          ignoreNulls: false
        }),
        g = new i.visual.Scene(null, {
          panel: this,
          source: e
        }),
        h = this.axes.base.scale,
        j = h.range().band,
        l = Math.min(j * this.boxSizeRatio, this.maxBoxSize),
        m = this.axes.ortho.scale,
        k = new i.visual.RoleVarHelper(g, this.visualRoles.color, {
          roleVar: "color"
        });
      e.children().each(a, this);
      return g
    }
  });
  f.type("pvc.BoxplotChart", i.CategoricalAbstract).add({
    _processOptionsCore: function(a) {
      this.base.apply(this, arguments);
      a.stacked = false
    },
    _initVisualRoles: function() {
      this.base();
      var a = {
        isMeasure: true,
        requireSingleDimension: true,
        requireIsDiscrete: false,
        valueType: Number
      };
      [{
        name: "median",
        label: "Median",
        defaultDimension: "median",
        isRequired: true
      }, {
        name: "lowerQuartil",
        label: "Lower Quartil",
        defaultDimension: "lowerQuartil"
      }, {
        name: "upperQuartil",
        label: "Upper Quartil",
        defaultDimension: "upperQuartil"
      }, {
        name: "minimum",
        label: "Minimum",
        defaultDimension: "minimum"
      }, {
        name: "maximum",
        label: "Maximum",
        defaultDimension: "maximum"
      }].forEach(function(b) {
          this._addVisualRole(b.name, f.create(a, b))
        }, this)
    },
    _getTranslationClass: function(a) {
      return f.type(this.base(a)).add(i.data.BoxplotChartTranslationOper)
    },
    _initPlotsCore: function() {
      new i.visual.BoxPlot(this);
      if (this.options.plot2) {
        this._animatable = true;
        new i.visual.PointPlot(this, {
          name: "plot2",
          defaults: {
            LinesVisible: true,
            DotsVisible: true,
            OrthoRole: "median",
            ColorAxis: 2
          },
          fixed: {
            OrthoAxis: 1
          }
        })
      }
    },
    _bindAxes: function(a) {
      this.base(a);
      (a = this.axesByType.ortho) && a.forEach(function(b) {
        b.option.defaults({
          Offset: 0.02
        })
      })
    },
    _createPlotPanels: function(a, b) {
      var c = this.plots;
      this.bpChartPanel = new i.BoxplotPanel(this, a, c.box, Object.create(b));
      if (c = c.plot2) {
        i.debug >= 3 && this._log("Creating Point panel.");
        (new i.PointPanel(this, a, c, Object.create(b)))._v1DimRoleName.value = c.option("OrthoRole")
      }
    },
    defaults: {
      crosstabMode: false
    }
  }).addStatic({
    measureRolesNames: ["median", "lowerQuartil", "upperQuartil", "minimum", "maximum"]
  });
  f.type("pvc.data.TreemapChartTranslationOper").add({
    _configureTypeCore: function() {
      var a = [],
        b = [],
        c = [];
      this.collectFreeDiscreteAndConstinuousIndexes(c, b);
      c = c.length;
      b = b.length;
      c && this._getUnboundRoleDefaultDimNames("category", c, a);
      b && f.query(["size", "color"]).take(b).each(function(d) {
        this._getUnboundRoleDefaultDimNames(d, 1, a)
      }, this);
      a.length && this.defReader({
        names: a
      })
    }
  });
  f.type("pvc.TreemapPanel",
      i.PlotPanel).init(function(a, b, c, d) {
      this.base(a, b, c, d);
      this.axes.size = a._getAxis("size", (c.option("SizeAxis") || 0) - 1);
      this.visualRoles.size = a.visualRole(c.option("SizeRole"));
      this.layoutMode = c.option("LayoutMode")
    }).add({
      _createCore: function(a) {
        var b = this;
        a = a.clientSize;
        var c = b._buildScene();
        if (c) {
          var d = f.number.to(b._getConstantExtension("leaf", "lineWidth"), 1),
            e = d / 2,
            g = b.visualRoles.size.isBound() ? b.axes.size.scale.by1(function(k) {
              return k.vars.size.value
            }) : 100;
          a = b.pvTreemapPanel = (new i.visual.Panel(b,
            b.pvPanel, {
              panelType: u.Layout.Treemap,
              extensionId: "panel"
            })).pvMark.lock("visible", true).lock("nodes", c.nodes()).lock("left", e).lock("top", e).lock("width", a.width - d).lock("height", a.height - d).lock("size", g).lock("mode", b.layoutMode).lock("order", null).lock("round", false);
          a.node.left(function(k) {
            return k.x + e
          }).top(function(k) {
            return k.y + e
          }).width(function(k) {
            return k.dx - d
          }).height(function(k) {
            return k.dy - d
          });
          c = b.axes.color;
          var h, j;
          if (b.visualRoles.color.isBound()) {
            j = h = c.sceneScale({
              sceneVarName: "color"
            });
            if (b.plot.option("ColorMode") === "byparent") j = j.by(f.propGet("parent"))
          } else j = h = f.fun.constant(c.option("Unbound"));
          var l = (new i.visual.Bar(b, a.leaf, {
            extensionId: "leaf"
          })).lockMark("visible").override("defaultColor", function() {
              return j(this.scene)
            }).override("defaultStrokeWidth", function() {
              return d
            }).pvMark.antialias(false).lineCap("round").strokeDasharray(function(k) {
              return k.vars.size.value < 0 ? "dash" : null
            });
          (new i.visual.Bar(b, a.node, {
            extensionId: "ascendant",
            noHover: true,
            noSelect: true,
            noClick: true,
            noDoubleClick: true
          })).intercept("visible", function(k) {
              return !!k.parent && !!k.firstChild && this.delegateExtension(true)
            }).override("anyInteraction", function() {
              return this.scene.anyInteraction() || this.scene.isActiveDescendantOrSelf()
            }).override("defaultStrokeWidth", function() {
              return 1.5 * d
            }).override("interactiveStrokeWidth", function(k) {
              if (this.showsActivity() && this.scene.isActiveDescendantOrSelf()) k = Math.max(1, k) * 1.5;
              return k
            }).override("defaultColor", function() {
              return h(this.scene)
            }).override("normalColor",
              f.fun.constant(null)).override("interactiveColor", function(k, n) {
              if (n === "stroke") {
                if (this.showsActivity()) {
                  if (this.scene.isActiveDescendantOrSelf()) return u.color(k).brighter(0.5);
                  if (this.scene.anyActive()) return null
                }
                if (this.showsSelection() && this.scene.isSelectedDescendantOrSelf()) return u.color(k).brighter(0.5)
              }
              return null
            }).pvMark.antialias(false);
          if (b = i.visual.ValueLabel.maybeCreate(b, a.label, {
            noAnchor: true
          })) {
            var m = this.valuesFont;
            b.override("trimText", function(k) {
              var n = this.scene[this.pvMark.textAngle() ?
                "dy" : "dx"] - 2;
              return i.text.trimToWidthB(n, k, m, "..")
            }).override("calcBackgroundColor", function() {
              return l.scene[this.pvMark.index].fillStyle
            })
          }
        }
      },
      _getExtensionId: function() {
        return [{
          abs: !this.chart.parent ? "content" : "smallContent"
        }].concat(this.base())
      },
      renderInteractive: function() {
        this.pvTreemapPanel.render()
      },
      _buildScene: function() {
        var a = this.visibleData({
          ignoreNulls: false
        });
        if (!a.childCount()) return null;
        var b = this.visualRoles;
        a = new i.visual.Scene(null, {
          panel: this,
          source: a
        });
        var c = new i.visual.RoleVarHelper(a,
            b.size, {
              roleVar: "size",
              allowNestedVars: true,
              hasPercentSubVar: true
            }),
          d = b.color && b.color.grouping,
          e = function(g) {
            var h = g.group;
            g.vars.category = I.fromComplex(h);
            c.onNewScene(g, true);
            if (d) g.vars.color = new I(h.absKey, h.absLabel);
            else if (!g.parent) g.vars.color = new I(null, "");
            h.childCount() && h.children().each(function(j) {
              j.value != null && e(new i.visual.Scene(g, {
                source: j
              }))
            });
            return g
          };
        return e(a)
      }
    });
  f.type("pvc.TreemapChart", i.BaseChart).add({
    _animatable: false,
    _axisCreateIfUnbound: {
      color: true
    },
    _getColorRoleSpec: function() {
      return {
        defaultSourceRole: "category",
        defaultDimension: "color*"
      }
    },
    _initVisualRoles: function() {
      this.base();
      this._addVisualRole("category", {
        isRequired: true,
        defaultDimension: "category*",
        autoCreateDimension: true
      });
      this._addVisualRole("size", {
        isMeasure: true,
        isRequired: false,
        isPercent: true,
        requireSingleDimension: true,
        requireIsDiscrete: false,
        valueType: Number,
        defaultDimension: "size"
      })
    },
    _getTranslationClass: function(a) {
      return f.type(this.base(a)).add(i.data.TreemapChartTranslationOper)
    },
    _getIsNullDatum: f.fun.constant(),
    _setAxesScales: function(a) {
      this.base(a);
      if (!a || this.parent)
        if ((a = this.axes.size) && a.isBound()) {
          this._createAxisScale(a);
          a.setScaleRange({
            min: 100,
            max: 1E3
          })
        }
    },
    _initPlotsCore: function() {
      var a = new i.visual.TreemapPlot(this);
      if (this.options.legend == null) this.options.legend = a.option("ColorMode") === "byparent";
      a = a.option("RootCategoryLabel");
      this.visualRoles.category.setRootLabel(a);
      this.visualRoles.color.setRootLabel(a)
    },
    _preRenderContent: function(a) {
      this.base();
      new i.TreemapPanel(this, this.basePanel, this.plots.treemap, a)
    },
    _createVisibleData: function(a,
                                 b) {
      return (a = this.base(a, b)) ? this.visualRoles.category.select(a, {
        visible: true
      }) : null
    },
    defaults: {
      legend: null
    }
  });
  return i
}(def, pv);