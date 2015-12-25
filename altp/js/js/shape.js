function Point(x, y) {
    this.x = x;
    this.y = y;
    this.flag = false;
    this.equals = function (other) {
        var eps = 0.000001;
        return Point.dist(this, other) < eps;
        //return other.x == this.x && other.y == this.y;
    };
    this.clone = function () {
        return new Point(this.x, this.y);
    }
}
Point.dist = function (a, b) {
    var dx = b.x - a.x;
    var dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function Line(x, y) {
    this.Point1 = x;
    this.Point2 = y;
}


function Shape(listPoint) {
    this.Points = listPoint;
    this.ListShape = undefined;
    this.Id;

    this.Combine = function (listShape) {
        if (listShape == undefined || listShape.length < 1) return this;

        this.ListShape = [];
        this.Points = [];
        for (var i = 0 ; i < listShape.length ; i++) {
            var tmp = [];
            var a = listShape[i];
            for (var k = 0 ; k < a.length ; k++) {
                tmp.push(a[k].clone());
                this.Points.push(a[k].clone());
            }
            this.ListShape.push(tmp);
        }
    }
    this.move = function (_x, _y) {
        for (var i = 0 ; i < this.Points.length ; i++) {
            this.Points[i].x += _x;
            this.Points[i].y += _y;
        }
    }
    this.rectPoints = function () {
        return [this.Points[0], this.Points[2]];
    }
    this.Data = function () {
        if (this.Points == undefined || this.Points.length < 1) return "";
        var d = "";
        if (this.ListShape == undefined) {
            d = "M " + this.Points[0].x + ", " + this.Points[0].y;
            for (var i = 1 ; i < this.Points.length ; i++) {
                d += " L " + this.Points[i].x + ", " + this.Points[i].y;
                if (i == this.Points.length - 1)
                    d += " z";
            }
        } else {
            d = this.DataCombine(this.ListShape);
        }
        return d;
    }
}


Shape.prototype.DataCombine = function (listShape) {
    if (listShape == undefined || listShape.length < 1) return this;

    var d = "";
    for (var i = 0 ; i < listShape.length ; i++) {
        var k = new Shape(listShape[i]);
        if (i != 0)
            d += " ";
        d += k.Data();
    }
    return d;
}




var getIntersection = function (point1, point2, point3, point4) {
    var x0 = point1.x;
    var y0 = point1.y;
    var x1 = point2.x;
    var y1 = point2.y;
    var x2 = point3.x;
    var y2 = point3.y;
    var x3 = point4.x;
    var y3 = point4.y;
    var S0, S1, pX, pY;
    try {
        S0 = ((x3 - x2) * (y0 - y2) - (y3 - y2) * (x0 - x2)) * 0.5;
        S1 = ((x3 - x2) * (y2 - y1) - (y3 - y2) * (x2 - x1)) * 0.5;
        pX = x0 + (x1 - x0) * S0 / (S0 + S1);
        pY = y0 + (y1 - y0) * S0 / (S0 + S1);
        return new Point(pX, pY);
    }
    catch (Error) {
        //console.log(Error.message);
    }
}
var checkIntersection = function (point1, point2, point3, point4) {
    var r;
    var s;
    var pnt = null;
    var p0 = point1;
    var p1 = point2;
    var p2 = point3;
    var p3 = point4;
    try {
        r = ((p3.y - p2.y) * (p2.x - p0.x) - (p3.x - p2.x) * (p2.y - p0.y)) / ((p1.x - p0.x) * (p3.y - p2.y) - (p1.y - p0.y) * (p3.x - p2.x));
        s = ((p1.y - p0.y) * (p2.x - p0.x) - (p1.x - p0.x) * (p2.y - p0.y)) / ((p1.x - p0.x) * (p3.y - p2.y) - (p1.y - p0.y) * (p3.x - p2.x));
        if (r > 0 && r <= 1 && s > 0 && s <= 1) {
            pnt = this.getIntersection(point1, point2, point3, point4);
            return pnt;
        }
        return null;
    }
    catch (Error) {
        //console.log(Error.message);
    }
}

function toDegrees(rad) {
    return rad * (180 / Math.PI);
}

function toAngle(rotate) {
    return (rotate * Math.PI) / 180;
}

var reflection = function (point, line) {
    // (v,w) defines the slope of the line
    var x0, y0, x1, y1, v, w, mu,
		pc = point,
		p1c = line[0],
		p2c = line[1];

    v = p2c.x - p1c.x;
    w = p2c.y - p1c.y;

    x0 = pc.x - p1c.x;
    y0 = pc.y - p1c.y;

    mu = (v * y0 - w * x0) / (v * v + w * w);

    // point + mu*(-y,x) is the perpendicular foot
    x1 = pc.x + 2 * mu * w;
    y1 = pc.y - 2 * mu * v;

    return new Point(x1, y1);
}

function countDistance(a, b) {
    var x = Math.sqrt(((a.x - b.x) * (a.x - b.x)) + ((a.y - b.y) * (a.y - b.y)));
    return Math.round(x);
}

function angleBetweenPoints(p1, p2) {
    if (p1[0] == p2[0] && p1[1] == p2[1])
        return Math.PI / 2;
    else
        return Math.atan2(p2[1] - p1[1], p2[0] - p1[0]);
}


var swap = function (arr, i, j) {
    var tmp;

    tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;

    return arr;
}
var sortVertices = function (ps) {
    var i, ll,
		N = ps.length;
    var eps = 0.000001;
    // find the point with the lowest y value
    for (i = 1; i < N; i++) {
        if ((ps[i].y < ps[0].y) ||
            // if the current and the lowest point have the same y value, pick the one with
            // the lowest x value.
				(Math.abs(ps[i].y - ps[0].y) < eps && ps[i].x < ps[0].x)) {
            ps = swap(ps, i, 0);
        }
    }

    // sort ps in increasing order of the angle the points and the ll make with the x-axis
    ll = ps.shift();
    ps.sort(function (a, b) {
        // atan is monotonically increasing, as we are only interested in the sign of the difference
        // evaluating atan is not necessary
        var rad1 = Math.atan2(a.y - ll.y, a.x - ll.x),
			rad2 = Math.atan2(b.y - ll.y, b.x - ll.x);

        return rad1 - rad2;
    });

    // put ll back into the array
    ps.unshift(ll);

    // put the last element also in the beginning
    ps.unshift(ps[ps.length - 1]);

    return ps;
}

var ContainsPoint = function (_p, px, py) {
    var p = [];
    for (var i = 0 ; i < _p.length ; i++)
        p.push([_p[i].x, _p[i].y]);
    var n = p.length >> 1;
    var ax, ay = p[2 * n - 3] - py, bx = p[2 * n - 2] - px, by = p[2 * n - 1] - py;

    //var lup = by > ay;
    for (var i = 0; i < n; i++) {
        ax = bx; ay = by;
        bx = p[2 * i] - px;
        by = p[2 * i + 1] - py;
        if (ay == by) continue;
        lup = by > ay;
    }

    var depth = 0;
    for (var i = 0; i < n; i++) {
        ax = bx; ay = by;
        bx = p[2 * i] - px;
        by = p[2 * i + 1] - py;
        if (ay < 0 && by < 0) continue;	// both "up" or both "down"
        if (ay > 0 && by > 0) continue;	// both "up" or both "down"
        if (ax < 0 && bx < 0) continue; 	// both points on the left

        if (ay == by && Math.min(ax, bx) <= 0) return true;
        if (ay == by) continue;

        var lx = ax + (bx - ax) * (-ay) / (by - ay);
        if (lx == 0) return true;			// point on edge
        if (lx > 0) depth++;
        if (ay == 0 && lup && by > ay) depth--;	// hit vertex, both up
        if (ay == 0 && !lup && by < ay) depth--; // hit vertex, both down
        lup = by > ay;
    }
    //console.log(depth);
    return (depth & 1) == 1;
}

var _GetLineIntersection = function (a1, a2, b1, b2) {
    var dax = (a1.x - a2.x), dbx = (b1.x - b2.x);
    var day = (a1.y - a2.y), dby = (b1.y - b2.y);

    var Den = dax * dby - day * dbx;
    if (Den == 0) return null;	// parallel

    var A = (a1.x * a2.y - a1.y * a2.x);
    var B = (b1.x * b2.y - b1.y * b2.x);

    var I = new Point(0, 0);
    I.x = (A * dbx - dax * B) / Den;
    I.y = (A * dby - day * B) / Den;

    if (_InRect(I, a1, a2) && _InRect(I, b1, b2)) return I;
    return null;
}

var _InRect = function (a, b, c)	// a in rect (b,c)
{
    var minx = Math.min(b.x, c.x), maxx = Math.max(b.x, c.x);
    var miny = Math.min(b.y, c.y), maxy = Math.max(b.y, c.y);

    if (minx == maxx) return (miny <= a.y && a.y <= maxy);
    if (miny == maxy) return (minx <= a.x && a.x <= maxx);
    //return (minx <= a.x && a.x <= maxx && miny <= a.y && a.y <= maxy)
    return (minx <= a.x + 1e-10 && a.x - 1e-10 <= maxx && miny <= a.y + 1e-10 && a.y - 1e-10 <= maxy);
}

_firstWithFlag = function (ps, ind) {
    var n = ps.length;
    while (true) {
        ind = (ind + 1) % n;
        if (ps[ind].flag) return ind;
    }
}

var _firstWithFlag = function (ps, ind) {
    var n = ps.length;
    while (true) {
        ind = (ind + 1) % n;
        if (ps[ind].flag) return ind;
    }
}

_getPoints = function (ps, ind0, ind1) {
    var n = ps.length;
    var nps = [];
    if (ind1 < ind0) ind1 += n;
    for (var i = ind0; i <= ind1; i++) nps.push(ps[i % n]);
    return nps;
}

var Slice = function (p, ax, ay, bx, by) {
    if (ContainsPoint(p, ax, ay) || ContainsPoint(p, bx, by)) return [p.slice(0)];

    var a = new Point(ax, ay);
    var b = new Point(bx, by);
    var iscs = [];	// intersections
    var ps = [];	// points
    for (var i = 0; i < p.length; i++) ps.push(new Point(p[i].x, p[i].y));

    for (var i = 0; i < ps.length; i++) {
        var isc = new Point(0, 0);
        isc = _GetLineIntersection(a, b, ps[i], ps[(i + 1) % ps.length]);
        //console.log(isc);
        var fisc = iscs[0];
        var lisc = iscs[iscs.length - 1];
        if (isc && (fisc == null || Point.dist(isc, fisc) > 1e-10) && (lisc == null || Point.dist(isc, lisc) > 1e-10))//&& (isc.x!=ps[i].x || isc.y!=ps[i].y) )
        {
            isc.flag = true;
            iscs.push(isc);
            ps.splice(i + 1, 0, isc);
            i++;
        }
    }

    if (iscs.length < 2) return [p.slice(0)];
    var comp = function (u, v) { return Point.dist(a, u) - Point.dist(a, v); }
    iscs.sort(comp);

    var pgs = [];
    var dir = 0;
    while (iscs.length > 0) {
        var n = ps.length;
        var i0 = iscs[0];
        var i1 = iscs[1];
        //if(i0.x==i1.x && i0.y==i1.y) { iscs.splice(0,2); continue;}
        var ind0 = ps.indexOf(i0);
        var ind1 = ps.indexOf(i1);
        var solved = false;

        //console.log(i0, i1);

        if (_firstWithFlag(ps, ind0) == ind1) solved = true;
        else {
            i0 = iscs[1];
            i1 = iscs[0];
            ind0 = ps.indexOf(i0);
            ind1 = ps.indexOf(i1);
            if (_firstWithFlag(ps, ind0) == ind1) solved = true;
        }
        if (solved) {
            dir--;
            var pgn = _getPoints(ps, ind0, ind1);
            pgs.push(pgn);
            ps = _getPoints(ps, ind1, ind0);
            i0.flag = i1.flag = false;
            iscs.splice(0, 2);
            if (iscs.length == 0) pgs.push(ps);
        }
        else { dir++; iscs.reverse(); }
        if (dir > 1) break;
    }
    var result = [];
    for (var i = 0; i < pgs.length; i++) {
        var pg = pgs[i];
        var npg = [];
        for (var j = 0; j < pg.length; j++) npg.push(new Point(pg[j].x, pg[j].y));
        result.push(npg);
    }
    return result;
}

var checkInline = function (a, b, c) {
    var s = ((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x));
    var eps = 0.000001;
    if (s > eps) return 1;
    else if (s < eps) return -1;
    else return 0;
}


var checkInRect = function (_shape1, _shape2) {
    //_InRect({x: mouse[0], y: mouse[1]} , myShape.rectPoints()[0], myShape.rectPoints()[1])
    for (var i = 0 ; i < _shape1.Points.length ; i++) {
        var _t = _InRect({ x: _shape1.Points[i].x, y: _shape1.Points[i].y },
			_shape2.rectPoints()[0], _shape2.rectPoints()[1]);
        if (_t) return true;
    }
    return false;
}

var checkInRectList = function (_shape1, _shape2) {
    //_InRect({x: mouse[0], y: mouse[1]} , myShape.rectPoints()[0], myShape.rectPoints()[1])
    for (var i = 0 ; i < _shape1.length ; i++) {
        var _t = _InRect({ x: _shape1[i].x, y: _shape1[i].y },
			_shape2.rectPoints()[0], _shape2.rectPoints()[1]);
        if (_t) return true;
    }
    return false;
}

var checTrash = function (_listPoint1, _listPoint2) {
    for (var i = 0 ; i < _shape1.length ; i++) {
        var _t = _InRect({ x: _shape1[i].x, y: _shape1[i].y },
			_shape2.rectPoints()[0], _shape2.rectPoints()[1]);
        if (_t) return true;
    }
    return false;
}




