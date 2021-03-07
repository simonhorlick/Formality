module.exports = (function() {
    function word_to_u16(w) {
        var u = 0;
        for (var i = 0; i < 16; ++i) {
            u = u | (w._ === 'Word.i' ? 1 << i : 0);
            w = w.pred;
        };
        return u;
    };

    function u16_to_word(u) {
        var w = {
            _: 'Word.e'
        };
        for (var i = 0; i < 16; ++i) {
            w = {
                _: (u >>> (16 - i - 1)) & 1 ? 'Word.i' : 'Word.o',
                pred: w
            };
        };
        return w;
    };

    function u16_to_bits(x) {
        var s = '';
        for (var i = 0; i < 16; ++i) {
            s = (x & 1 ? '1' : '0') + s;
            x = x >>> 1;
        }
        return s;
    };

    function word_to_u32(w) {
        var u = 0;
        for (var i = 0; i < 32; ++i) {
            u = u | (w._ === 'Word.i' ? 1 << i : 0);
            w = w.pred;
        };
        return u;
    };

    function u32_to_word(u) {
        var w = {
            _: 'Word.e'
        };
        for (var i = 0; i < 32; ++i) {
            w = {
                _: (u >>> (32 - i - 1)) & 1 ? 'Word.i' : 'Word.o',
                pred: w
            };
        };
        return w;
    };

    function u32_for(state, from, til, func) {
        for (var i = from; i < til; ++i) {
            state = func(i)(state);
        }
        return state;
    };
    var list_for = list => nil => cons => {
        while (list._ !== 'List.nil') {
            nil = cons(list.head)(nil);
            list = list.tail;
        }
        return nil;
    };
    var list_length = list => {
        var len = 0;
        while (list._ === 'List.cons') {
            len += 1;
            list = list.tail;
        };
        return BigInt(len);
    };
    var nat_to_bits = n => {
        return n === 0n ? '' : n.toString(2);
    };
    var kind_name_to_bits = name => {
        const TABLE = {
            'A': '000000',
            'B': '100000',
            'C': '010000',
            'D': '110000',
            'E': '001000',
            'F': '101000',
            'G': '011000',
            'H': '111000',
            'I': '000100',
            'J': '100100',
            'K': '010100',
            'L': '110100',
            'M': '001100',
            'N': '101100',
            'O': '011100',
            'P': '111100',
            'Q': '000010',
            'R': '100010',
            'S': '010010',
            'T': '110010',
            'U': '001010',
            'V': '101010',
            'W': '011010',
            'X': '111010',
            'Y': '000110',
            'Z': '100110',
            'a': '010110',
            'b': '110110',
            'c': '001110',
            'd': '101110',
            'e': '011110',
            'f': '111110',
            'g': '000001',
            'h': '100001',
            'i': '010001',
            'j': '110001',
            'k': '001001',
            'l': '101001',
            'm': '011001',
            'n': '111001',
            'o': '000101',
            'p': '100101',
            'q': '010101',
            'r': '110101',
            's': '001101',
            't': '101101',
            'u': '011101',
            'v': '111101',
            'w': '000011',
            'x': '100011',
            'y': '010011',
            'z': '110011',
            '0': '001011',
            '1': '101011',
            '2': '011011',
            '3': '111011',
            '4': '000111',
            '5': '100111',
            '6': '010111',
            '7': '110111',
            '8': '001111',
            '9': '101111',
            '.': '011111',
            '_': '111111',
        }
        var a = '';
        for (var i = name.length - 1; i >= 0; --i) {
            a += TABLE[name[i]];
        }
        return a;
    };
    const inst_unit = x => x(1);
    const elim_unit = (x => {
        var $1 = (() => c0 => {
            var self = x;
            switch ("unit") {
                case 'unit':
                    var $0 = c0;
                    return $0;
            };
        })();
        return $1;
    });
    const inst_bool = x => x(true)(false);
    const elim_bool = (x => {
        var $4 = (() => c0 => c1 => {
            var self = x;
            if (self) {
                var $2 = c2;
                return $2;
            } else {
                var $3 = c2;
                return $3;
            };
        })();
        return $4;
    });
    const inst_nat = x => x(0n)(x0 => 1n + x0);
    const elim_nat = (x => {
        var $8 = (() => c0 => c1 => {
            var self = x;
            if (self === 0n) {
                var $5 = c2;
                return $5;
            } else {
                var $6 = (self - 1n);
                var $7 = c2($6);
                return $7;
            };
        })();
        return $8;
    });
    const inst_bits = x => x('')(x0 => x0 + '0')(x0 => x0 + '1');
    const elim_bits = (x => {
        var $14 = (() => c0 => c1 => c2 => {
            var self = x;
            switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                case 'o':
                    var $9 = self.slice(0, -1);
                    var $10 = c1($9);
                    return $10;
                case 'i':
                    var $11 = self.slice(0, -1);
                    var $12 = c2($11);
                    return $12;
                case 'e':
                    var $13 = c0;
                    return $13;
            };
        })();
        return $14;
    });
    const inst_u16 = x => x(x0 => word_to_u16(x0));
    const elim_u16 = (x => {
        var $17 = (() => c0 => {
            var self = x;
            switch ('u16') {
                case 'u16':
                    var $15 = u16_to_word(self);
                    var $16 = c0($15);
                    return $16;
            };
        })();
        return $17;
    });
    const inst_u32 = x => x(x0 => word_to_u32(x0));
    const elim_u32 = (x => {
        var $20 = (() => c0 => {
            var self = x;
            switch ('u32') {
                case 'u32':
                    var $18 = u32_to_word(self);
                    var $19 = c0($18);
                    return $19;
            };
        })();
        return $20;
    });
    const inst_string = x => x('')(x0 => x1 => (String.fromCharCode(x0) + x1));
    const elim_string = (x => {
        var $25 = (() => c0 => c1 => {
            var self = x;
            if (self.length === 0) {
                var $21 = c2;
                return $21;
            } else {
                var $22 = self.charCodeAt(0);
                var $23 = self.slice(1);
                var $24 = c2($22)($23);
                return $24;
            };
        })();
        return $25;
    });
    var run = (p) => {
        if (typeof window === 'undefined') {
            var rl = eval("require('readline')").createInterface({
                input: process.stdin,
                output: process.stdout,
                terminal: false
            });
            var fs = eval("require('fs')");
            var pc = eval("process");
        } else {
            var rl = {
                question: (x, f) => f(''),
                close: () => {}
            };
            var fs = {
                readFileSync: () => ''
            };
            var pc = {
                exit: () => {},
                argv: []
            };
        };
        return run_io({
            rl,
            fs,
            pc
        }, p).then((x) => {
            rl.close();
            return x;
        }).catch((e) => {
            rl.close();
            throw e;
        });
    };
    var get_file = (lib, param) => {
        return lib.fs.readFileSync(param, 'utf8');
    }
    var set_file = (lib, param) => {
        var path = '';
        for (var i = 0; i < param.length && param[i] !== '='; ++i) {
            path += param[i];
        };
        var data = param.slice(i + 1);
        lib.fs.mkdirSync(path.split('/').slice(0, -1).join('/'), {
            recursive: true
        });
        lib.fs.writeFileSync(path, data);
        return '';
    };
    var del_file = (lib, param) => {
        try {
            lib.fs.unlinkSync(param);
            return '';
        } catch (e) {
            if (e.message.indexOf('EPERM') !== -1) {
                lib.fs.rmdirSync(param);
                return '';
            } else {
                throw e;
            }
        }
    };
    var get_dir = (lib, param) => {
        return lib.fs.readdirSync(param).join(';');
    };
    var run_io = (lib, p) => {
        switch (p._) {
            case 'IO.end':
                return Promise.resolve(p.value);
            case 'IO.ask':
                return new Promise((res, err) => {
                    switch (p.query) {
                        case 'print':
                            console.log(p.param);
                            run_io(lib, p.then(1)).then(res).catch(err);
                            break;
                        case 'put_string':
                            process.stdout.write(p.param);
                            run_io(lib, p.then(1)).then(res).catch(err);
                            break;
                        case 'exit':
                            lib.pc.exit();
                            break;
                        case 'get_line':
                            lib.rl.question('', (line) => run_io(lib, p.then(line)).then(res).catch(err));
                            break;
                        case 'get_file':
                            try {
                                run_io(lib, p.then(get_file(lib, p.param))).then(res).catch(err);
                            } catch (e) {
                                if (e.message.indexOf('NOENT') !== -1) {
                                    run_io(lib, p.then('')).then(res).catch(err);
                                } else {
                                    err(e);
                                }
                            };
                            break;
                        case 'set_file':
                            try {
                                run_io(lib, p.then(set_file(lib, p.param))).then(res).catch(err);
                            } catch (e) {
                                if (e.message.indexOf('NOENT') !== -1) {
                                    run_io(lib, p.then('')).then(res).catch(err);
                                } else {
                                    err(e);
                                }
                            };
                            break;
                        case 'del_file':
                            try {
                                run_io(lib, p.then(del_file(lib, p.param))).then(res).catch(err);
                            } catch (e) {
                                if (e.message.indexOf('NOENT') !== -1) {
                                    run_io(lib, p.then('')).then(res).catch(err);
                                } else {
                                    err(e);
                                }
                            };
                            break;
                        case 'get_dir':
                            try {
                                run_io(lib, p.then(get_dir(lib, p.param))).then(res).catch(err);
                            } catch (e) {
                                if (e.message.indexOf('NOENT') !== -1) {
                                    run_io(lib, p.then('')).then(res).catch(err);
                                } else {
                                    err(e);
                                }
                            };
                            break;
                        case 'get_args':
                            run_io(lib, p.then(lib.pc.argv[2] || '')).then(res).catch(err);
                            break;
                    }
                });
        }
    };

    function IO$(_A$1) {
        var $26 = null;
        return $26;
    };
    const IO = x0 => IO$(x0);

    function IO$ask$(_query$2, _param$3, _then$4) {
        var $27 = ({
            _: 'IO.ask',
            'query': _query$2,
            'param': _param$3,
            'then': _then$4
        });
        return $27;
    };
    const IO$ask = x0 => x1 => x2 => IO$ask$(x0, x1, x2);

    function IO$bind$(_a$3, _f$4) {
        var self = _a$3;
        switch (self._) {
            case 'IO.end':
                var $29 = self.value;
                var $30 = _f$4($29);
                var $28 = $30;
                break;
            case 'IO.ask':
                var $31 = self.query;
                var $32 = self.param;
                var $33 = self.then;
                var $34 = IO$ask$($31, $32, (_x$8 => {
                    var $35 = IO$bind$($33(_x$8), _f$4);
                    return $35;
                }));
                var $28 = $34;
                break;
        };
        return $28;
    };
    const IO$bind = x0 => x1 => IO$bind$(x0, x1);

    function IO$end$(_value$2) {
        var $36 = ({
            _: 'IO.end',
            'value': _value$2
        });
        return $36;
    };
    const IO$end = x0 => IO$end$(x0);

    function IO$monad$(_new$2) {
        var $37 = _new$2(IO$bind)(IO$end);
        return $37;
    };
    const IO$monad = x0 => IO$monad$(x0);

    function Maybe$(_A$1) {
        var $38 = null;
        return $38;
    };
    const Maybe = x0 => Maybe$(x0);

    function Map$(_A$1) {
        var $39 = null;
        return $39;
    };
    const Map = x0 => Map$(x0);
    const Maybe$none = ({
        _: 'Maybe.none'
    });

    function Map$get$(_bits$2, _map$3) {
        var Map$get$ = (_bits$2, _map$3) => ({
            ctr: 'TCO',
            arg: [_bits$2, _map$3]
        });
        var Map$get = _bits$2 => _map$3 => Map$get$(_bits$2, _map$3);
        var arg = [_bits$2, _map$3];
        while (true) {
            let [_bits$2, _map$3] = arg;
            var R = (() => {
                var self = _bits$2;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'o':
                        var $40 = self.slice(0, -1);
                        var self = _map$3;
                        switch (self._) {
                            case 'Map.tie':
                                var $42 = self.lft;
                                var $43 = Map$get$($40, $42);
                                var $41 = $43;
                                break;
                            case 'Map.new':
                                var $44 = Maybe$none;
                                var $41 = $44;
                                break;
                        };
                        return $41;
                    case 'i':
                        var $45 = self.slice(0, -1);
                        var self = _map$3;
                        switch (self._) {
                            case 'Map.tie':
                                var $47 = self.rgt;
                                var $48 = Map$get$($45, $47);
                                var $46 = $48;
                                break;
                            case 'Map.new':
                                var $49 = Maybe$none;
                                var $46 = $49;
                                break;
                        };
                        return $46;
                    case 'e':
                        var self = _map$3;
                        switch (self._) {
                            case 'Map.tie':
                                var $51 = self.val;
                                var $52 = $51;
                                var $50 = $52;
                                break;
                            case 'Map.new':
                                var $53 = Maybe$none;
                                var $50 = $53;
                                break;
                        };
                        return $50;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Map$get = x0 => x1 => Map$get$(x0, x1);
    const Bits$e = '';
    const Bool$false = false;
    const Bool$and = a0 => a1 => (a0 && a1);
    const Bool$true = true;

    function Cmp$as_lte$(_cmp$1) {
        var self = _cmp$1;
        switch (self._) {
            case 'Cmp.ltn':
            case 'Cmp.eql':
                var $55 = Bool$true;
                var $54 = $55;
                break;
            case 'Cmp.gtn':
                var $56 = Bool$false;
                var $54 = $56;
                break;
        };
        return $54;
    };
    const Cmp$as_lte = x0 => Cmp$as_lte$(x0);
    const Cmp$ltn = ({
        _: 'Cmp.ltn'
    });
    const Cmp$gtn = ({
        _: 'Cmp.gtn'
    });

    function Word$cmp$go$(_a$2, _b$3, _c$4) {
        var self = _a$2;
        switch (self._) {
            case 'Word.o':
                var $58 = self.pred;
                var $59 = (_b$7 => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.o':
                            var $61 = self.pred;
                            var $62 = (_a$pred$10 => {
                                var $63 = Word$cmp$go$(_a$pred$10, $61, _c$4);
                                return $63;
                            });
                            var $60 = $62;
                            break;
                        case 'Word.i':
                            var $64 = self.pred;
                            var $65 = (_a$pred$10 => {
                                var $66 = Word$cmp$go$(_a$pred$10, $64, Cmp$ltn);
                                return $66;
                            });
                            var $60 = $65;
                            break;
                        case 'Word.e':
                            var $67 = (_a$pred$8 => {
                                var $68 = _c$4;
                                return $68;
                            });
                            var $60 = $67;
                            break;
                    };
                    var $60 = $60($58);
                    return $60;
                });
                var $57 = $59;
                break;
            case 'Word.i':
                var $69 = self.pred;
                var $70 = (_b$7 => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.o':
                            var $72 = self.pred;
                            var $73 = (_a$pred$10 => {
                                var $74 = Word$cmp$go$(_a$pred$10, $72, Cmp$gtn);
                                return $74;
                            });
                            var $71 = $73;
                            break;
                        case 'Word.i':
                            var $75 = self.pred;
                            var $76 = (_a$pred$10 => {
                                var $77 = Word$cmp$go$(_a$pred$10, $75, _c$4);
                                return $77;
                            });
                            var $71 = $76;
                            break;
                        case 'Word.e':
                            var $78 = (_a$pred$8 => {
                                var $79 = _c$4;
                                return $79;
                            });
                            var $71 = $78;
                            break;
                    };
                    var $71 = $71($69);
                    return $71;
                });
                var $57 = $70;
                break;
            case 'Word.e':
                var $80 = (_b$5 => {
                    var $81 = _c$4;
                    return $81;
                });
                var $57 = $80;
                break;
        };
        var $57 = $57(_b$3);
        return $57;
    };
    const Word$cmp$go = x0 => x1 => x2 => Word$cmp$go$(x0, x1, x2);
    const Cmp$eql = ({
        _: 'Cmp.eql'
    });

    function Word$cmp$(_a$2, _b$3) {
        var $82 = Word$cmp$go$(_a$2, _b$3, Cmp$eql);
        return $82;
    };
    const Word$cmp = x0 => x1 => Word$cmp$(x0, x1);

    function Word$lte$(_a$2, _b$3) {
        var $83 = Cmp$as_lte$(Word$cmp$(_a$2, _b$3));
        return $83;
    };
    const Word$lte = x0 => x1 => Word$lte$(x0, x1);

    function Nat$succ$(_pred$1) {
        var $84 = 1n + _pred$1;
        return $84;
    };
    const Nat$succ = x0 => Nat$succ$(x0);
    const Nat$zero = 0n;
    const U16$lte = a0 => a1 => (a0 <= a1);

    function U16$btw$(_a$1, _b$2, _c$3) {
        var $85 = ((_a$1 <= _b$2) && (_b$2 <= _c$3));
        return $85;
    };
    const U16$btw = x0 => x1 => x2 => U16$btw$(x0, x1, x2);

    function U16$new$(_value$1) {
        var $86 = word_to_u16(_value$1);
        return $86;
    };
    const U16$new = x0 => U16$new$(x0);
    const Word$e = ({
        _: 'Word.e'
    });

    function Word$(_size$1) {
        var $87 = null;
        return $87;
    };
    const Word = x0 => Word$(x0);

    function Word$i$(_pred$2) {
        var $88 = ({
            _: 'Word.i',
            'pred': _pred$2
        });
        return $88;
    };
    const Word$i = x0 => Word$i$(x0);

    function Word$o$(_pred$2) {
        var $89 = ({
            _: 'Word.o',
            'pred': _pred$2
        });
        return $89;
    };
    const Word$o = x0 => Word$o$(x0);

    function Word$subber$(_a$2, _b$3, _c$4) {
        var self = _a$2;
        switch (self._) {
            case 'Word.o':
                var $91 = self.pred;
                var $92 = (_b$7 => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.o':
                            var $94 = self.pred;
                            var $95 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $97 = Word$i$(Word$subber$(_a$pred$10, $94, Bool$true));
                                    var $96 = $97;
                                } else {
                                    var $98 = Word$o$(Word$subber$(_a$pred$10, $94, Bool$false));
                                    var $96 = $98;
                                };
                                return $96;
                            });
                            var $93 = $95;
                            break;
                        case 'Word.i':
                            var $99 = self.pred;
                            var $100 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $102 = Word$o$(Word$subber$(_a$pred$10, $99, Bool$true));
                                    var $101 = $102;
                                } else {
                                    var $103 = Word$i$(Word$subber$(_a$pred$10, $99, Bool$true));
                                    var $101 = $103;
                                };
                                return $101;
                            });
                            var $93 = $100;
                            break;
                        case 'Word.e':
                            var $104 = (_a$pred$8 => {
                                var $105 = Word$e;
                                return $105;
                            });
                            var $93 = $104;
                            break;
                    };
                    var $93 = $93($91);
                    return $93;
                });
                var $90 = $92;
                break;
            case 'Word.i':
                var $106 = self.pred;
                var $107 = (_b$7 => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.o':
                            var $109 = self.pred;
                            var $110 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $112 = Word$o$(Word$subber$(_a$pred$10, $109, Bool$false));
                                    var $111 = $112;
                                } else {
                                    var $113 = Word$i$(Word$subber$(_a$pred$10, $109, Bool$false));
                                    var $111 = $113;
                                };
                                return $111;
                            });
                            var $108 = $110;
                            break;
                        case 'Word.i':
                            var $114 = self.pred;
                            var $115 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $117 = Word$i$(Word$subber$(_a$pred$10, $114, Bool$true));
                                    var $116 = $117;
                                } else {
                                    var $118 = Word$o$(Word$subber$(_a$pred$10, $114, Bool$false));
                                    var $116 = $118;
                                };
                                return $116;
                            });
                            var $108 = $115;
                            break;
                        case 'Word.e':
                            var $119 = (_a$pred$8 => {
                                var $120 = Word$e;
                                return $120;
                            });
                            var $108 = $119;
                            break;
                    };
                    var $108 = $108($106);
                    return $108;
                });
                var $90 = $107;
                break;
            case 'Word.e':
                var $121 = (_b$5 => {
                    var $122 = Word$e;
                    return $122;
                });
                var $90 = $121;
                break;
        };
        var $90 = $90(_b$3);
        return $90;
    };
    const Word$subber = x0 => x1 => x2 => Word$subber$(x0, x1, x2);

    function Word$sub$(_a$2, _b$3) {
        var $123 = Word$subber$(_a$2, _b$3, Bool$false);
        return $123;
    };
    const Word$sub = x0 => x1 => Word$sub$(x0, x1);
    const U16$sub = a0 => a1 => (Math.max(a0 - a1, 0));

    function Nat$apply$(_n$2, _f$3, _x$4) {
        var Nat$apply$ = (_n$2, _f$3, _x$4) => ({
            ctr: 'TCO',
            arg: [_n$2, _f$3, _x$4]
        });
        var Nat$apply = _n$2 => _f$3 => _x$4 => Nat$apply$(_n$2, _f$3, _x$4);
        var arg = [_n$2, _f$3, _x$4];
        while (true) {
            let [_n$2, _f$3, _x$4] = arg;
            var R = (() => {
                var self = _n$2;
                if (self === 0n) {
                    var $124 = _x$4;
                    return $124;
                } else {
                    var $125 = (self - 1n);
                    var $126 = Nat$apply$($125, _f$3, _f$3(_x$4));
                    return $126;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Nat$apply = x0 => x1 => x2 => Nat$apply$(x0, x1, x2);

    function Word$inc$(_word$2) {
        var self = _word$2;
        switch (self._) {
            case 'Word.o':
                var $128 = self.pred;
                var $129 = Word$i$($128);
                var $127 = $129;
                break;
            case 'Word.i':
                var $130 = self.pred;
                var $131 = Word$o$(Word$inc$($130));
                var $127 = $131;
                break;
            case 'Word.e':
                var $132 = Word$e;
                var $127 = $132;
                break;
        };
        return $127;
    };
    const Word$inc = x0 => Word$inc$(x0);

    function U16$inc$(_a$1) {
        var self = _a$1;
        switch ('u16') {
            case 'u16':
                var $134 = u16_to_word(self);
                var $135 = U16$new$(Word$inc$($134));
                var $133 = $135;
                break;
        };
        return $133;
    };
    const U16$inc = x0 => U16$inc$(x0);

    function Word$zero$(_size$1) {
        var self = _size$1;
        if (self === 0n) {
            var $137 = Word$e;
            var $136 = $137;
        } else {
            var $138 = (self - 1n);
            var $139 = Word$o$(Word$zero$($138));
            var $136 = $139;
        };
        return $136;
    };
    const Word$zero = x0 => Word$zero$(x0);
    const U16$zero = U16$new$(Word$zero$(16n));
    const Nat$to_u16 = a0 => (Number(a0));

    function Word$adder$(_a$2, _b$3, _c$4) {
        var self = _a$2;
        switch (self._) {
            case 'Word.o':
                var $141 = self.pred;
                var $142 = (_b$7 => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.o':
                            var $144 = self.pred;
                            var $145 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $147 = Word$i$(Word$adder$(_a$pred$10, $144, Bool$false));
                                    var $146 = $147;
                                } else {
                                    var $148 = Word$o$(Word$adder$(_a$pred$10, $144, Bool$false));
                                    var $146 = $148;
                                };
                                return $146;
                            });
                            var $143 = $145;
                            break;
                        case 'Word.i':
                            var $149 = self.pred;
                            var $150 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $152 = Word$o$(Word$adder$(_a$pred$10, $149, Bool$true));
                                    var $151 = $152;
                                } else {
                                    var $153 = Word$i$(Word$adder$(_a$pred$10, $149, Bool$false));
                                    var $151 = $153;
                                };
                                return $151;
                            });
                            var $143 = $150;
                            break;
                        case 'Word.e':
                            var $154 = (_a$pred$8 => {
                                var $155 = Word$e;
                                return $155;
                            });
                            var $143 = $154;
                            break;
                    };
                    var $143 = $143($141);
                    return $143;
                });
                var $140 = $142;
                break;
            case 'Word.i':
                var $156 = self.pred;
                var $157 = (_b$7 => {
                    var self = _b$7;
                    switch (self._) {
                        case 'Word.o':
                            var $159 = self.pred;
                            var $160 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $162 = Word$o$(Word$adder$(_a$pred$10, $159, Bool$true));
                                    var $161 = $162;
                                } else {
                                    var $163 = Word$i$(Word$adder$(_a$pred$10, $159, Bool$false));
                                    var $161 = $163;
                                };
                                return $161;
                            });
                            var $158 = $160;
                            break;
                        case 'Word.i':
                            var $164 = self.pred;
                            var $165 = (_a$pred$10 => {
                                var self = _c$4;
                                if (self) {
                                    var $167 = Word$i$(Word$adder$(_a$pred$10, $164, Bool$true));
                                    var $166 = $167;
                                } else {
                                    var $168 = Word$o$(Word$adder$(_a$pred$10, $164, Bool$true));
                                    var $166 = $168;
                                };
                                return $166;
                            });
                            var $158 = $165;
                            break;
                        case 'Word.e':
                            var $169 = (_a$pred$8 => {
                                var $170 = Word$e;
                                return $170;
                            });
                            var $158 = $169;
                            break;
                    };
                    var $158 = $158($156);
                    return $158;
                });
                var $140 = $157;
                break;
            case 'Word.e':
                var $171 = (_b$5 => {
                    var $172 = Word$e;
                    return $172;
                });
                var $140 = $171;
                break;
        };
        var $140 = $140(_b$3);
        return $140;
    };
    const Word$adder = x0 => x1 => x2 => Word$adder$(x0, x1, x2);

    function Word$add$(_a$2, _b$3) {
        var $173 = Word$adder$(_a$2, _b$3, Bool$false);
        return $173;
    };
    const Word$add = x0 => x1 => Word$add$(x0, x1);
    const U16$add = a0 => a1 => ((a0 + a1) & 0xFFFF);

    function Cmp$as_eql$(_cmp$1) {
        var self = _cmp$1;
        switch (self._) {
            case 'Cmp.ltn':
            case 'Cmp.gtn':
                var $175 = Bool$false;
                var $174 = $175;
                break;
            case 'Cmp.eql':
                var $176 = Bool$true;
                var $174 = $176;
                break;
        };
        return $174;
    };
    const Cmp$as_eql = x0 => Cmp$as_eql$(x0);

    function Word$eql$(_a$2, _b$3) {
        var $177 = Cmp$as_eql$(Word$cmp$(_a$2, _b$3));
        return $177;
    };
    const Word$eql = x0 => x1 => Word$eql$(x0, x1);
    const U16$eql = a0 => a1 => (a0 === a1);
    const Bits$o = a0 => (a0 + '0');
    const Bits$i = a0 => (a0 + '1');

    function Word$to_bits$(_a$2) {
        var self = _a$2;
        switch (self._) {
            case 'Word.o':
                var $179 = self.pred;
                var $180 = (Word$to_bits$($179) + '0');
                var $178 = $180;
                break;
            case 'Word.i':
                var $181 = self.pred;
                var $182 = (Word$to_bits$($181) + '1');
                var $178 = $182;
                break;
            case 'Word.e':
                var $183 = Bits$e;
                var $178 = $183;
                break;
        };
        return $178;
    };
    const Word$to_bits = x0 => Word$to_bits$(x0);

    function Word$trim$(_new_size$2, _word$3) {
        var self = _new_size$2;
        if (self === 0n) {
            var $185 = Word$e;
            var $184 = $185;
        } else {
            var $186 = (self - 1n);
            var self = _word$3;
            switch (self._) {
                case 'Word.o':
                    var $188 = self.pred;
                    var $189 = Word$o$(Word$trim$($186, $188));
                    var $187 = $189;
                    break;
                case 'Word.i':
                    var $190 = self.pred;
                    var $191 = Word$i$(Word$trim$($186, $190));
                    var $187 = $191;
                    break;
                case 'Word.e':
                    var $192 = Word$o$(Word$trim$($186, Word$e));
                    var $187 = $192;
                    break;
            };
            var $184 = $187;
        };
        return $184;
    };
    const Word$trim = x0 => x1 => Word$trim$(x0, x1);
    const Bits$concat = a0 => a1 => (a1 + a0);

    function Bits$reverse$tco$(_a$1, _r$2) {
        var Bits$reverse$tco$ = (_a$1, _r$2) => ({
            ctr: 'TCO',
            arg: [_a$1, _r$2]
        });
        var Bits$reverse$tco = _a$1 => _r$2 => Bits$reverse$tco$(_a$1, _r$2);
        var arg = [_a$1, _r$2];
        while (true) {
            let [_a$1, _r$2] = arg;
            var R = (() => {
                var self = _a$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'o':
                        var $193 = self.slice(0, -1);
                        var $194 = Bits$reverse$tco$($193, (_r$2 + '0'));
                        return $194;
                    case 'i':
                        var $195 = self.slice(0, -1);
                        var $196 = Bits$reverse$tco$($195, (_r$2 + '1'));
                        return $196;
                    case 'e':
                        var $197 = _r$2;
                        return $197;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Bits$reverse$tco = x0 => x1 => Bits$reverse$tco$(x0, x1);

    function Bits$reverse$(_a$1) {
        var $198 = Bits$reverse$tco$(_a$1, Bits$e);
        return $198;
    };
    const Bits$reverse = x0 => Bits$reverse$(x0);
    const Kind$Name$to_bits = a0 => (kind_name_to_bits(a0));

    function Kind$get$(_name$2, _map$3) {
        var $199 = Map$get$((kind_name_to_bits(_name$2)), _map$3);
        return $199;
    };
    const Kind$get = x0 => x1 => Kind$get$(x0, x1);

    function IO$get_file$(_name$1) {
        var $200 = IO$ask$("get_file", _name$1, (_file$2 => {
            var $201 = IO$end$(_file$2);
            return $201;
        }));
        return $200;
    };
    const IO$get_file = x0 => IO$get_file$(x0);

    function Parser$Reply$(_V$1) {
        var $202 = null;
        return $202;
    };
    const Parser$Reply = x0 => Parser$Reply$(x0);

    function Parser$Reply$value$(_idx$2, _code$3, _val$4) {
        var $203 = ({
            _: 'Parser.Reply.value',
            'idx': _idx$2,
            'code': _code$3,
            'val': _val$4
        });
        return $203;
    };
    const Parser$Reply$value = x0 => x1 => x2 => Parser$Reply$value$(x0, x1, x2);

    function Parser$is_eof$(_idx$1, _code$2) {
        var self = _code$2;
        if (self.length === 0) {
            var $205 = Parser$Reply$value$(_idx$1, _code$2, Bool$true);
            var $204 = $205;
        } else {
            var $206 = self.charCodeAt(0);
            var $207 = self.slice(1);
            var $208 = Parser$Reply$value$(_idx$1, _code$2, Bool$false);
            var $204 = $208;
        };
        return $204;
    };
    const Parser$is_eof = x0 => x1 => Parser$is_eof$(x0, x1);

    function Parser$Reply$error$(_idx$2, _code$3, _err$4) {
        var $209 = ({
            _: 'Parser.Reply.error',
            'idx': _idx$2,
            'code': _code$3,
            'err': _err$4
        });
        return $209;
    };
    const Parser$Reply$error = x0 => x1 => x2 => Parser$Reply$error$(x0, x1, x2);

    function Parser$(_V$1) {
        var $210 = null;
        return $210;
    };
    const Parser = x0 => Parser$(x0);

    function Maybe$some$(_value$2) {
        var $211 = ({
            _: 'Maybe.some',
            'value': _value$2
        });
        return $211;
    };
    const Maybe$some = x0 => Maybe$some$(x0);

    function Parser$ErrorAt$new$(_idx$1, _code$2, _err$3) {
        var $212 = ({
            _: 'Parser.ErrorAt.new',
            'idx': _idx$1,
            'code': _code$2,
            'err': _err$3
        });
        return $212;
    };
    const Parser$ErrorAt$new = x0 => x1 => x2 => Parser$ErrorAt$new$(x0, x1, x2);
    const Nat$gtn = a0 => a1 => (a0 > a1);

    function Parser$ErrorAt$combine$(_a$1, _b$2) {
        var self = _a$1;
        switch (self._) {
            case 'Maybe.some':
                var $214 = self.value;
                var self = _b$2;
                switch (self._) {
                    case 'Maybe.some':
                        var $216 = self.value;
                        var self = $214;
                        switch (self._) {
                            case 'Parser.ErrorAt.new':
                                var $218 = self.idx;
                                var self = $216;
                                switch (self._) {
                                    case 'Parser.ErrorAt.new':
                                        var $220 = self.idx;
                                        var self = ($218 > $220);
                                        if (self) {
                                            var $222 = _a$1;
                                            var $221 = $222;
                                        } else {
                                            var $223 = _b$2;
                                            var $221 = $223;
                                        };
                                        var $219 = $221;
                                        break;
                                };
                                var $217 = $219;
                                break;
                        };
                        var $215 = $217;
                        break;
                    case 'Maybe.none':
                        var $224 = _a$1;
                        var $215 = $224;
                        break;
                };
                var $213 = $215;
                break;
            case 'Maybe.none':
                var $225 = _b$2;
                var $213 = $225;
                break;
        };
        return $213;
    };
    const Parser$ErrorAt$combine = x0 => x1 => Parser$ErrorAt$combine$(x0, x1);

    function Parser$first_of$go$(_pars$2, _err$3, _idx$4, _code$5) {
        var Parser$first_of$go$ = (_pars$2, _err$3, _idx$4, _code$5) => ({
            ctr: 'TCO',
            arg: [_pars$2, _err$3, _idx$4, _code$5]
        });
        var Parser$first_of$go = _pars$2 => _err$3 => _idx$4 => _code$5 => Parser$first_of$go$(_pars$2, _err$3, _idx$4, _code$5);
        var arg = [_pars$2, _err$3, _idx$4, _code$5];
        while (true) {
            let [_pars$2, _err$3, _idx$4, _code$5] = arg;
            var R = (() => {
                var self = _pars$2;
                switch (self._) {
                    case 'List.cons':
                        var $226 = self.head;
                        var $227 = self.tail;
                        var _parsed$8 = $226(_idx$4)(_code$5);
                        var self = _parsed$8;
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $229 = self.idx;
                                var $230 = self.code;
                                var $231 = self.err;
                                var _neo$12 = Maybe$some$(Parser$ErrorAt$new$($229, $230, $231));
                                var _err$13 = Parser$ErrorAt$combine$(_neo$12, _err$3);
                                var $232 = Parser$first_of$go$($227, _err$13, _idx$4, _code$5);
                                var $228 = $232;
                                break;
                            case 'Parser.Reply.value':
                                var $233 = self.idx;
                                var $234 = self.code;
                                var $235 = self.val;
                                var $236 = Parser$Reply$value$($233, $234, $235);
                                var $228 = $236;
                                break;
                        };
                        return $228;
                    case 'List.nil':
                        var self = _err$3;
                        switch (self._) {
                            case 'Maybe.some':
                                var $238 = self.value;
                                var self = $238;
                                switch (self._) {
                                    case 'Parser.ErrorAt.new':
                                        var $240 = self.idx;
                                        var $241 = self.code;
                                        var $242 = self.err;
                                        var $243 = Parser$Reply$error$($240, $241, $242);
                                        var $239 = $243;
                                        break;
                                };
                                var $237 = $239;
                                break;
                            case 'Maybe.none':
                                var $244 = Parser$Reply$error$(_idx$4, _code$5, "No parse.");
                                var $237 = $244;
                                break;
                        };
                        return $237;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Parser$first_of$go = x0 => x1 => x2 => x3 => Parser$first_of$go$(x0, x1, x2, x3);

    function Parser$first_of$(_pars$2) {
        var $245 = Parser$first_of$go(_pars$2)(Maybe$none);
        return $245;
    };
    const Parser$first_of = x0 => Parser$first_of$(x0);

    function List$cons$(_head$2, _tail$3) {
        var $246 = ({
            _: 'List.cons',
            'head': _head$2,
            'tail': _tail$3
        });
        return $246;
    };
    const List$cons = x0 => x1 => List$cons$(x0, x1);

    function List$(_A$1) {
        var $247 = null;
        return $247;
    };
    const List = x0 => List$(x0);
    const List$nil = ({
        _: 'List.nil'
    });

    function Parser$many$go$(_parse$2, _values$3, _idx$4, _code$5) {
        var Parser$many$go$ = (_parse$2, _values$3, _idx$4, _code$5) => ({
            ctr: 'TCO',
            arg: [_parse$2, _values$3, _idx$4, _code$5]
        });
        var Parser$many$go = _parse$2 => _values$3 => _idx$4 => _code$5 => Parser$many$go$(_parse$2, _values$3, _idx$4, _code$5);
        var arg = [_parse$2, _values$3, _idx$4, _code$5];
        while (true) {
            let [_parse$2, _values$3, _idx$4, _code$5] = arg;
            var R = (() => {
                var self = _parse$2(_idx$4)(_code$5);
                switch (self._) {
                    case 'Parser.Reply.value':
                        var $248 = self.idx;
                        var $249 = self.code;
                        var $250 = self.val;
                        var $251 = Parser$many$go$(_parse$2, (_xs$9 => {
                            var $252 = _values$3(List$cons$($250, _xs$9));
                            return $252;
                        }), $248, $249);
                        return $251;
                    case 'Parser.Reply.error':
                        var $253 = Parser$Reply$value$(_idx$4, _code$5, _values$3(List$nil));
                        return $253;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Parser$many$go = x0 => x1 => x2 => x3 => Parser$many$go$(x0, x1, x2, x3);

    function Parser$many$(_parser$2) {
        var $254 = Parser$many$go(_parser$2)((_x$3 => {
            var $255 = _x$3;
            return $255;
        }));
        return $254;
    };
    const Parser$many = x0 => Parser$many$(x0);
    const Unit$new = 1;

    function String$cons$(_head$1, _tail$2) {
        var $256 = (String.fromCharCode(_head$1) + _tail$2);
        return $256;
    };
    const String$cons = x0 => x1 => String$cons$(x0, x1);
    const String$concat = a0 => a1 => (a0 + a1);

    function String$flatten$go$(_xs$1, _res$2) {
        var String$flatten$go$ = (_xs$1, _res$2) => ({
            ctr: 'TCO',
            arg: [_xs$1, _res$2]
        });
        var String$flatten$go = _xs$1 => _res$2 => String$flatten$go$(_xs$1, _res$2);
        var arg = [_xs$1, _res$2];
        while (true) {
            let [_xs$1, _res$2] = arg;
            var R = (() => {
                var self = _xs$1;
                switch (self._) {
                    case 'List.cons':
                        var $257 = self.head;
                        var $258 = self.tail;
                        var $259 = String$flatten$go$($258, (_res$2 + $257));
                        return $259;
                    case 'List.nil':
                        var $260 = _res$2;
                        return $260;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const String$flatten$go = x0 => x1 => String$flatten$go$(x0, x1);

    function String$flatten$(_xs$1) {
        var $261 = String$flatten$go$(_xs$1, "");
        return $261;
    };
    const String$flatten = x0 => String$flatten$(x0);
    const String$nil = '';

    function Parser$text$go$(_text$1, _idx$2, _code$3) {
        var self = _text$1;
        if (self.length === 0) {
            var $263 = Parser$Reply$value$(_idx$2, _code$3, Unit$new);
            var $262 = $263;
        } else {
            var $264 = self.charCodeAt(0);
            var $265 = self.slice(1);
            var self = _code$3;
            if (self.length === 0) {
                var _error$6 = String$flatten$(List$cons$("Expected \'", List$cons$(_text$1, List$cons$("\', found end of file.", List$nil))));
                var $267 = Parser$Reply$error$(_idx$2, _code$3, _error$6);
                var $266 = $267;
            } else {
                var $268 = self.charCodeAt(0);
                var $269 = self.slice(1);
                var self = ($264 === $268);
                if (self) {
                    var $271 = Parser$text$($265, Nat$succ$(_idx$2), $269);
                    var $270 = $271;
                } else {
                    var _error$8 = String$flatten$(List$cons$("Expected \'", List$cons$(_text$1, List$cons$("\', found \'", List$cons$(String$cons$($268, String$nil), List$cons$("\'.", List$nil))))));
                    var $272 = Parser$Reply$error$(_idx$2, _code$3, _error$8);
                    var $270 = $272;
                };
                var $266 = $270;
            };
            var $262 = $266;
        };
        return $262;
    };
    const Parser$text$go = x0 => x1 => x2 => Parser$text$go$(x0, x1, x2);

    function Parser$text$(_text$1, _idx$2, _code$3) {
        var self = Parser$text$go$(_text$1, _idx$2, _code$3);
        switch (self._) {
            case 'Parser.Reply.error':
                var $274 = self.err;
                var $275 = Parser$Reply$error$(_idx$2, _code$3, $274);
                var $273 = $275;
                break;
            case 'Parser.Reply.value':
                var $276 = self.idx;
                var $277 = self.code;
                var $278 = self.val;
                var $279 = Parser$Reply$value$($276, $277, $278);
                var $273 = $279;
                break;
        };
        return $273;
    };
    const Parser$text = x0 => x1 => x2 => Parser$text$(x0, x1, x2);

    function List$reverse$go$(_xs$2, _res$3) {
        var List$reverse$go$ = (_xs$2, _res$3) => ({
            ctr: 'TCO',
            arg: [_xs$2, _res$3]
        });
        var List$reverse$go = _xs$2 => _res$3 => List$reverse$go$(_xs$2, _res$3);
        var arg = [_xs$2, _res$3];
        while (true) {
            let [_xs$2, _res$3] = arg;
            var R = (() => {
                var self = _xs$2;
                switch (self._) {
                    case 'List.cons':
                        var $280 = self.head;
                        var $281 = self.tail;
                        var $282 = List$reverse$go$($281, List$cons$($280, _res$3));
                        return $282;
                    case 'List.nil':
                        var $283 = _res$3;
                        return $283;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const List$reverse$go = x0 => x1 => List$reverse$go$(x0, x1);

    function List$reverse$(_xs$2) {
        var $284 = List$reverse$go$(_xs$2, List$nil);
        return $284;
    };
    const List$reverse = x0 => List$reverse$(x0);

    function Parser$until$go$(_until$2, _parse$3, _values$4, _idx$5, _code$6) {
        var Parser$until$go$ = (_until$2, _parse$3, _values$4, _idx$5, _code$6) => ({
            ctr: 'TCO',
            arg: [_until$2, _parse$3, _values$4, _idx$5, _code$6]
        });
        var Parser$until$go = _until$2 => _parse$3 => _values$4 => _idx$5 => _code$6 => Parser$until$go$(_until$2, _parse$3, _values$4, _idx$5, _code$6);
        var arg = [_until$2, _parse$3, _values$4, _idx$5, _code$6];
        while (true) {
            let [_until$2, _parse$3, _values$4, _idx$5, _code$6] = arg;
            var R = (() => {
                var _until_reply$7 = _until$2(_idx$5)(_code$6);
                var self = _until_reply$7;
                switch (self._) {
                    case 'Parser.Reply.value':
                        var $286 = self.idx;
                        var $287 = self.code;
                        var $288 = Parser$Reply$value$($286, $287, List$reverse$(_values$4));
                        var $285 = $288;
                        break;
                    case 'Parser.Reply.error':
                        var _reply$11 = _parse$3(_idx$5)(_code$6);
                        var self = _reply$11;
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $290 = self.idx;
                                var $291 = self.code;
                                var $292 = self.err;
                                var $293 = Parser$Reply$error$($290, $291, $292);
                                var $289 = $293;
                                break;
                            case 'Parser.Reply.value':
                                var $294 = self.idx;
                                var $295 = self.code;
                                var $296 = self.val;
                                var $297 = Parser$until$go$(_until$2, _parse$3, List$cons$($296, _values$4), $294, $295);
                                var $289 = $297;
                                break;
                        };
                        var $285 = $289;
                        break;
                };
                return $285;
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Parser$until$go = x0 => x1 => x2 => x3 => x4 => Parser$until$go$(x0, x1, x2, x3, x4);

    function Parser$until$(_until$2, _parse$3) {
        var $298 = Parser$until$go(_until$2)(_parse$3)(List$nil);
        return $298;
    };
    const Parser$until = x0 => x1 => Parser$until$(x0, x1);

    function Parser$one$(_idx$1, _code$2) {
        var self = _code$2;
        if (self.length === 0) {
            var $300 = Parser$Reply$error$(_idx$1, _code$2, "Unexpected end of file.");
            var $299 = $300;
        } else {
            var $301 = self.charCodeAt(0);
            var $302 = self.slice(1);
            var $303 = Parser$Reply$value$(Nat$succ$(_idx$1), $302, $301);
            var $299 = $303;
        };
        return $299;
    };
    const Parser$one = x0 => x1 => Parser$one$(x0, x1);
    const Kind$Parser$spaces = Parser$many$(Parser$first_of$(List$cons$(Parser$text(" "), List$cons$(Parser$text("\u{9}"), List$cons$(Parser$text("\u{a}"), List$cons$((_idx$1 => _code$2 => {
        var self = Parser$text$("//", _idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $305 = self.idx;
                var $306 = self.code;
                var $307 = self.err;
                var $308 = Parser$Reply$error$($305, $306, $307);
                var $304 = $308;
                break;
            case 'Parser.Reply.value':
                var $309 = self.idx;
                var $310 = self.code;
                var self = Parser$until$(Parser$text("\u{a}"), Parser$one)($309)($310);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $312 = self.idx;
                        var $313 = self.code;
                        var $314 = self.err;
                        var $315 = Parser$Reply$error$($312, $313, $314);
                        var $311 = $315;
                        break;
                    case 'Parser.Reply.value':
                        var $316 = self.idx;
                        var $317 = self.code;
                        var $318 = Parser$Reply$value$($316, $317, Unit$new);
                        var $311 = $318;
                        break;
                };
                var $304 = $311;
                break;
        };
        return $304;
    }), List$nil))))));

    function Parser$get_index$(_idx$1, _code$2) {
        var $319 = Parser$Reply$value$(_idx$1, _code$2, _idx$1);
        return $319;
    };
    const Parser$get_index = x0 => x1 => Parser$get_index$(x0, x1);

    function Kind$Parser$init$(_idx$1, _code$2) {
        var self = Kind$Parser$spaces(_idx$1)(_code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $321 = self.idx;
                var $322 = self.code;
                var $323 = self.err;
                var $324 = Parser$Reply$error$($321, $322, $323);
                var $320 = $324;
                break;
            case 'Parser.Reply.value':
                var $325 = self.idx;
                var $326 = self.code;
                var self = Parser$get_index$($325, $326);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $328 = self.idx;
                        var $329 = self.code;
                        var $330 = self.err;
                        var $331 = Parser$Reply$error$($328, $329, $330);
                        var $327 = $331;
                        break;
                    case 'Parser.Reply.value':
                        var $332 = self.idx;
                        var $333 = self.code;
                        var $334 = self.val;
                        var $335 = Parser$Reply$value$($332, $333, $334);
                        var $327 = $335;
                        break;
                };
                var $320 = $327;
                break;
        };
        return $320;
    };
    const Kind$Parser$init = x0 => x1 => Kind$Parser$init$(x0, x1);

    function Parser$many1$(_parser$2, _idx$3, _code$4) {
        var self = _parser$2(_idx$3)(_code$4);
        switch (self._) {
            case 'Parser.Reply.error':
                var $337 = self.idx;
                var $338 = self.code;
                var $339 = self.err;
                var $340 = Parser$Reply$error$($337, $338, $339);
                var $336 = $340;
                break;
            case 'Parser.Reply.value':
                var $341 = self.idx;
                var $342 = self.code;
                var $343 = self.val;
                var self = Parser$many$(_parser$2)($341)($342);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $345 = self.idx;
                        var $346 = self.code;
                        var $347 = self.err;
                        var $348 = Parser$Reply$error$($345, $346, $347);
                        var $344 = $348;
                        break;
                    case 'Parser.Reply.value':
                        var $349 = self.idx;
                        var $350 = self.code;
                        var $351 = self.val;
                        var $352 = Parser$Reply$value$($349, $350, List$cons$($343, $351));
                        var $344 = $352;
                        break;
                };
                var $336 = $344;
                break;
        };
        return $336;
    };
    const Parser$many1 = x0 => x1 => x2 => Parser$many1$(x0, x1, x2);

    function Kind$Name$is_letter$(_chr$1) {
        var self = U16$btw$(65, _chr$1, 90);
        if (self) {
            var $354 = Bool$true;
            var $353 = $354;
        } else {
            var self = U16$btw$(97, _chr$1, 122);
            if (self) {
                var $356 = Bool$true;
                var $355 = $356;
            } else {
                var self = U16$btw$(48, _chr$1, 57);
                if (self) {
                    var $358 = Bool$true;
                    var $357 = $358;
                } else {
                    var self = (46 === _chr$1);
                    if (self) {
                        var $360 = Bool$true;
                        var $359 = $360;
                    } else {
                        var self = (95 === _chr$1);
                        if (self) {
                            var $362 = Bool$true;
                            var $361 = $362;
                        } else {
                            var self = (94 === _chr$1);
                            if (self) {
                                var $364 = Bool$true;
                                var $363 = $364;
                            } else {
                                var $365 = Bool$false;
                                var $363 = $365;
                            };
                            var $361 = $363;
                        };
                        var $359 = $361;
                    };
                    var $357 = $359;
                };
                var $355 = $357;
            };
            var $353 = $355;
        };
        return $353;
    };
    const Kind$Name$is_letter = x0 => Kind$Name$is_letter$(x0);

    function Kind$Parser$letter$(_idx$1, _code$2) {
        var self = _code$2;
        if (self.length === 0) {
            var $367 = Parser$Reply$error$(_idx$1, _code$2, "Unexpected eof.");
            var $366 = $367;
        } else {
            var $368 = self.charCodeAt(0);
            var $369 = self.slice(1);
            var self = Kind$Name$is_letter$($368);
            if (self) {
                var $371 = Parser$Reply$value$(Nat$succ$(_idx$1), $369, $368);
                var $370 = $371;
            } else {
                var $372 = Parser$Reply$error$(_idx$1, _code$2, "Expected letter.");
                var $370 = $372;
            };
            var $366 = $370;
        };
        return $366;
    };
    const Kind$Parser$letter = x0 => x1 => Kind$Parser$letter$(x0, x1);

    function List$fold$(_list$2, _nil$4, _cons$5) {
        var self = _list$2;
        switch (self._) {
            case 'List.cons':
                var $374 = self.head;
                var $375 = self.tail;
                var $376 = _cons$5($374)(List$fold$($375, _nil$4, _cons$5));
                var $373 = $376;
                break;
            case 'List.nil':
                var $377 = _nil$4;
                var $373 = $377;
                break;
        };
        return $373;
    };
    const List$fold = x0 => x1 => x2 => List$fold$(x0, x1, x2);

    function Kind$Parser$name1$(_idx$1, _code$2) {
        var self = Kind$Parser$spaces(_idx$1)(_code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $379 = self.idx;
                var $380 = self.code;
                var $381 = self.err;
                var $382 = Parser$Reply$error$($379, $380, $381);
                var $378 = $382;
                break;
            case 'Parser.Reply.value':
                var $383 = self.idx;
                var $384 = self.code;
                var self = Parser$many1$(Kind$Parser$letter, $383, $384);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $386 = self.idx;
                        var $387 = self.code;
                        var $388 = self.err;
                        var $389 = Parser$Reply$error$($386, $387, $388);
                        var $385 = $389;
                        break;
                    case 'Parser.Reply.value':
                        var $390 = self.idx;
                        var $391 = self.code;
                        var $392 = self.val;
                        var $393 = Parser$Reply$value$($390, $391, List$fold$($392, String$nil, String$cons));
                        var $385 = $393;
                        break;
                };
                var $378 = $385;
                break;
        };
        return $378;
    };
    const Kind$Parser$name1 = x0 => x1 => Kind$Parser$name1$(x0, x1);

    function Kind$Parser$text$(_text$1, _idx$2, _code$3) {
        var self = Kind$Parser$spaces(_idx$2)(_code$3);
        switch (self._) {
            case 'Parser.Reply.error':
                var $395 = self.idx;
                var $396 = self.code;
                var $397 = self.err;
                var $398 = Parser$Reply$error$($395, $396, $397);
                var $394 = $398;
                break;
            case 'Parser.Reply.value':
                var $399 = self.idx;
                var $400 = self.code;
                var $401 = Parser$text$(_text$1, $399, $400);
                var $394 = $401;
                break;
        };
        return $394;
    };
    const Kind$Parser$text = x0 => x1 => x2 => Kind$Parser$text$(x0, x1, x2);

    function Parser$until1$(_cond$2, _parser$3, _idx$4, _code$5) {
        var self = _parser$3(_idx$4)(_code$5);
        switch (self._) {
            case 'Parser.Reply.error':
                var $403 = self.idx;
                var $404 = self.code;
                var $405 = self.err;
                var $406 = Parser$Reply$error$($403, $404, $405);
                var $402 = $406;
                break;
            case 'Parser.Reply.value':
                var $407 = self.idx;
                var $408 = self.code;
                var $409 = self.val;
                var self = Parser$until$(_cond$2, _parser$3)($407)($408);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $411 = self.idx;
                        var $412 = self.code;
                        var $413 = self.err;
                        var $414 = Parser$Reply$error$($411, $412, $413);
                        var $410 = $414;
                        break;
                    case 'Parser.Reply.value':
                        var $415 = self.idx;
                        var $416 = self.code;
                        var $417 = self.val;
                        var $418 = Parser$Reply$value$($415, $416, List$cons$($409, $417));
                        var $410 = $418;
                        break;
                };
                var $402 = $410;
                break;
        };
        return $402;
    };
    const Parser$until1 = x0 => x1 => x2 => x3 => Parser$until1$(x0, x1, x2, x3);

    function Pair$(_A$1, _B$2) {
        var $419 = null;
        return $419;
    };
    const Pair = x0 => x1 => Pair$(x0, x1);

    function Parser$maybe$(_parse$2, _idx$3, _code$4) {
        var self = _parse$2(_idx$3)(_code$4);
        switch (self._) {
            case 'Parser.Reply.value':
                var $421 = self.idx;
                var $422 = self.code;
                var $423 = self.val;
                var $424 = Parser$Reply$value$($421, $422, Maybe$some$($423));
                var $420 = $424;
                break;
            case 'Parser.Reply.error':
                var $425 = Parser$Reply$value$(_idx$3, _code$4, Maybe$none);
                var $420 = $425;
                break;
        };
        return $420;
    };
    const Parser$maybe = x0 => x1 => x2 => Parser$maybe$(x0, x1, x2);

    function Kind$Parser$item$(_parser$2, _idx$3, _code$4) {
        var self = Kind$Parser$spaces(_idx$3)(_code$4);
        switch (self._) {
            case 'Parser.Reply.error':
                var $427 = self.idx;
                var $428 = self.code;
                var $429 = self.err;
                var $430 = Parser$Reply$error$($427, $428, $429);
                var $426 = $430;
                break;
            case 'Parser.Reply.value':
                var $431 = self.idx;
                var $432 = self.code;
                var self = _parser$2($431)($432);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $434 = self.idx;
                        var $435 = self.code;
                        var $436 = self.err;
                        var $437 = Parser$Reply$error$($434, $435, $436);
                        var $433 = $437;
                        break;
                    case 'Parser.Reply.value':
                        var $438 = self.idx;
                        var $439 = self.code;
                        var $440 = self.val;
                        var self = Parser$maybe$(Kind$Parser$text(","), $438, $439);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $442 = self.idx;
                                var $443 = self.code;
                                var $444 = self.err;
                                var $445 = Parser$Reply$error$($442, $443, $444);
                                var $441 = $445;
                                break;
                            case 'Parser.Reply.value':
                                var $446 = self.idx;
                                var $447 = self.code;
                                var $448 = Parser$Reply$value$($446, $447, $440);
                                var $441 = $448;
                                break;
                        };
                        var $433 = $441;
                        break;
                };
                var $426 = $433;
                break;
        };
        return $426;
    };
    const Kind$Parser$item = x0 => x1 => x2 => Kind$Parser$item$(x0, x1, x2);

    function Kind$Parser$name$(_idx$1, _code$2) {
        var self = Kind$Parser$spaces(_idx$1)(_code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $450 = self.idx;
                var $451 = self.code;
                var $452 = self.err;
                var $453 = Parser$Reply$error$($450, $451, $452);
                var $449 = $453;
                break;
            case 'Parser.Reply.value':
                var $454 = self.idx;
                var $455 = self.code;
                var self = Parser$many$(Kind$Parser$letter)($454)($455);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $457 = self.idx;
                        var $458 = self.code;
                        var $459 = self.err;
                        var $460 = Parser$Reply$error$($457, $458, $459);
                        var $456 = $460;
                        break;
                    case 'Parser.Reply.value':
                        var $461 = self.idx;
                        var $462 = self.code;
                        var $463 = self.val;
                        var $464 = Parser$Reply$value$($461, $462, List$fold$($463, String$nil, String$cons));
                        var $456 = $464;
                        break;
                };
                var $449 = $456;
                break;
        };
        return $449;
    };
    const Kind$Parser$name = x0 => x1 => Kind$Parser$name$(x0, x1);

    function Pair$new$(_fst$3, _snd$4) {
        var $465 = ({
            _: 'Pair.new',
            'fst': _fst$3,
            'snd': _snd$4
        });
        return $465;
    };
    const Pair$new = x0 => x1 => Pair$new$(x0, x1);

    function Kind$Parser$stop$(_from$1, _idx$2, _code$3) {
        var self = Parser$get_index$(_idx$2, _code$3);
        switch (self._) {
            case 'Parser.Reply.error':
                var $467 = self.idx;
                var $468 = self.code;
                var $469 = self.err;
                var $470 = Parser$Reply$error$($467, $468, $469);
                var $466 = $470;
                break;
            case 'Parser.Reply.value':
                var $471 = self.idx;
                var $472 = self.code;
                var $473 = self.val;
                var _orig$7 = Pair$new$(_from$1, $473);
                var $474 = Parser$Reply$value$($471, $472, _orig$7);
                var $466 = $474;
                break;
        };
        return $466;
    };
    const Kind$Parser$stop = x0 => x1 => x2 => Kind$Parser$stop$(x0, x1, x2);

    function Kind$Term$ori$(_orig$1, _expr$2) {
        var $475 = ({
            _: 'Kind.Term.ori',
            'orig': _orig$1,
            'expr': _expr$2
        });
        return $475;
    };
    const Kind$Term$ori = x0 => x1 => Kind$Term$ori$(x0, x1);
    const Kind$Term$typ = ({
        _: 'Kind.Term.typ'
    });

    function Kind$Parser$type$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $477 = self.idx;
                var $478 = self.code;
                var $479 = self.err;
                var $480 = Parser$Reply$error$($477, $478, $479);
                var $476 = $480;
                break;
            case 'Parser.Reply.value':
                var $481 = self.idx;
                var $482 = self.code;
                var $483 = self.val;
                var self = Kind$Parser$text$("Type", $481, $482);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $485 = self.idx;
                        var $486 = self.code;
                        var $487 = self.err;
                        var $488 = Parser$Reply$error$($485, $486, $487);
                        var $484 = $488;
                        break;
                    case 'Parser.Reply.value':
                        var $489 = self.idx;
                        var $490 = self.code;
                        var self = Kind$Parser$stop$($483, $489, $490);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $492 = self.idx;
                                var $493 = self.code;
                                var $494 = self.err;
                                var $495 = Parser$Reply$error$($492, $493, $494);
                                var $491 = $495;
                                break;
                            case 'Parser.Reply.value':
                                var $496 = self.idx;
                                var $497 = self.code;
                                var $498 = self.val;
                                var $499 = Parser$Reply$value$($496, $497, Kind$Term$ori$($498, Kind$Term$typ));
                                var $491 = $499;
                                break;
                        };
                        var $484 = $491;
                        break;
                };
                var $476 = $484;
                break;
        };
        return $476;
    };
    const Kind$Parser$type = x0 => x1 => Kind$Parser$type$(x0, x1);

    function Kind$Term$all$(_eras$1, _self$2, _name$3, _xtyp$4, _body$5) {
        var $500 = ({
            _: 'Kind.Term.all',
            'eras': _eras$1,
            'self': _self$2,
            'name': _name$3,
            'xtyp': _xtyp$4,
            'body': _body$5
        });
        return $500;
    };
    const Kind$Term$all = x0 => x1 => x2 => x3 => x4 => Kind$Term$all$(x0, x1, x2, x3, x4);

    function Kind$Parser$forall$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $502 = self.idx;
                var $503 = self.code;
                var $504 = self.err;
                var $505 = Parser$Reply$error$($502, $503, $504);
                var $501 = $505;
                break;
            case 'Parser.Reply.value':
                var $506 = self.idx;
                var $507 = self.code;
                var $508 = self.val;
                var self = Kind$Parser$name$($506, $507);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $510 = self.idx;
                        var $511 = self.code;
                        var $512 = self.err;
                        var $513 = Parser$Reply$error$($510, $511, $512);
                        var $509 = $513;
                        break;
                    case 'Parser.Reply.value':
                        var $514 = self.idx;
                        var $515 = self.code;
                        var $516 = self.val;
                        var self = Kind$Parser$binder$(":", $514, $515);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $518 = self.idx;
                                var $519 = self.code;
                                var $520 = self.err;
                                var $521 = Parser$Reply$error$($518, $519, $520);
                                var $517 = $521;
                                break;
                            case 'Parser.Reply.value':
                                var $522 = self.idx;
                                var $523 = self.code;
                                var $524 = self.val;
                                var self = Parser$maybe$(Kind$Parser$text("->"), $522, $523);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $526 = self.idx;
                                        var $527 = self.code;
                                        var $528 = self.err;
                                        var $529 = Parser$Reply$error$($526, $527, $528);
                                        var $525 = $529;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $530 = self.idx;
                                        var $531 = self.code;
                                        var self = Kind$Parser$term$($530, $531);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $533 = self.idx;
                                                var $534 = self.code;
                                                var $535 = self.err;
                                                var $536 = Parser$Reply$error$($533, $534, $535);
                                                var $532 = $536;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $537 = self.idx;
                                                var $538 = self.code;
                                                var $539 = self.val;
                                                var _term$18 = List$fold$($524, $539, (_x$18 => _t$19 => {
                                                    var self = _x$18;
                                                    switch (self._) {
                                                        case 'Kind.Binder.new':
                                                            var $542 = self.eras;
                                                            var $543 = self.name;
                                                            var $544 = self.term;
                                                            var $545 = Kind$Term$all$($542, "", $543, $544, (_s$23 => _x$24 => {
                                                                var $546 = _t$19;
                                                                return $546;
                                                            }));
                                                            var $541 = $545;
                                                            break;
                                                    };
                                                    return $541;
                                                }));
                                                var self = Kind$Parser$stop$($508, $537, $538);
                                                switch (self._) {
                                                    case 'Parser.Reply.error':
                                                        var $547 = self.idx;
                                                        var $548 = self.code;
                                                        var $549 = self.err;
                                                        var $550 = Parser$Reply$error$($547, $548, $549);
                                                        var $540 = $550;
                                                        break;
                                                    case 'Parser.Reply.value':
                                                        var $551 = self.idx;
                                                        var $552 = self.code;
                                                        var $553 = self.val;
                                                        var $554 = Parser$Reply$value$($551, $552, (() => {
                                                            var self = _term$18;
                                                            switch (self._) {
                                                                case 'Kind.Term.all':
                                                                    var $555 = self.eras;
                                                                    var $556 = self.name;
                                                                    var $557 = self.xtyp;
                                                                    var $558 = self.body;
                                                                    var $559 = Kind$Term$ori$($553, Kind$Term$all$($555, $516, $556, $557, $558));
                                                                    return $559;
                                                                case 'Kind.Term.var':
                                                                case 'Kind.Term.ref':
                                                                case 'Kind.Term.typ':
                                                                case 'Kind.Term.lam':
                                                                case 'Kind.Term.app':
                                                                case 'Kind.Term.let':
                                                                case 'Kind.Term.def':
                                                                case 'Kind.Term.ann':
                                                                case 'Kind.Term.gol':
                                                                case 'Kind.Term.hol':
                                                                case 'Kind.Term.nat':
                                                                case 'Kind.Term.chr':
                                                                case 'Kind.Term.str':
                                                                case 'Kind.Term.cse':
                                                                case 'Kind.Term.ori':
                                                                    var $560 = _term$18;
                                                                    return $560;
                                                            };
                                                        })());
                                                        var $540 = $554;
                                                        break;
                                                };
                                                var $532 = $540;
                                                break;
                                        };
                                        var $525 = $532;
                                        break;
                                };
                                var $517 = $525;
                                break;
                        };
                        var $509 = $517;
                        break;
                };
                var $501 = $509;
                break;
        };
        return $501;
    };
    const Kind$Parser$forall = x0 => x1 => Kind$Parser$forall$(x0, x1);

    function Kind$Term$lam$(_name$1, _body$2) {
        var $561 = ({
            _: 'Kind.Term.lam',
            'name': _name$1,
            'body': _body$2
        });
        return $561;
    };
    const Kind$Term$lam = x0 => x1 => Kind$Term$lam$(x0, x1);

    function Kind$Parser$make_lambda$(_names$1, _body$2) {
        var self = _names$1;
        switch (self._) {
            case 'List.cons':
                var $563 = self.head;
                var $564 = self.tail;
                var $565 = Kind$Term$lam$($563, (_x$5 => {
                    var $566 = Kind$Parser$make_lambda$($564, _body$2);
                    return $566;
                }));
                var $562 = $565;
                break;
            case 'List.nil':
                var $567 = _body$2;
                var $562 = $567;
                break;
        };
        return $562;
    };
    const Kind$Parser$make_lambda = x0 => x1 => Kind$Parser$make_lambda$(x0, x1);

    function Kind$Parser$lambda$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $569 = self.idx;
                var $570 = self.code;
                var $571 = self.err;
                var $572 = Parser$Reply$error$($569, $570, $571);
                var $568 = $572;
                break;
            case 'Parser.Reply.value':
                var $573 = self.idx;
                var $574 = self.code;
                var $575 = self.val;
                var self = Kind$Parser$text$("(", $573, $574);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $577 = self.idx;
                        var $578 = self.code;
                        var $579 = self.err;
                        var $580 = Parser$Reply$error$($577, $578, $579);
                        var $576 = $580;
                        break;
                    case 'Parser.Reply.value':
                        var $581 = self.idx;
                        var $582 = self.code;
                        var self = Parser$until1$(Kind$Parser$text(")"), Kind$Parser$item(Kind$Parser$name1), $581, $582);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $584 = self.idx;
                                var $585 = self.code;
                                var $586 = self.err;
                                var $587 = Parser$Reply$error$($584, $585, $586);
                                var $583 = $587;
                                break;
                            case 'Parser.Reply.value':
                                var $588 = self.idx;
                                var $589 = self.code;
                                var $590 = self.val;
                                var self = Kind$Parser$term$($588, $589);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $592 = self.idx;
                                        var $593 = self.code;
                                        var $594 = self.err;
                                        var $595 = Parser$Reply$error$($592, $593, $594);
                                        var $591 = $595;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $596 = self.idx;
                                        var $597 = self.code;
                                        var $598 = self.val;
                                        var self = Kind$Parser$stop$($575, $596, $597);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $600 = self.idx;
                                                var $601 = self.code;
                                                var $602 = self.err;
                                                var $603 = Parser$Reply$error$($600, $601, $602);
                                                var $599 = $603;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $604 = self.idx;
                                                var $605 = self.code;
                                                var $606 = self.val;
                                                var _expr$18 = Kind$Parser$make_lambda$($590, $598);
                                                var $607 = Parser$Reply$value$($604, $605, Kind$Term$ori$($606, _expr$18));
                                                var $599 = $607;
                                                break;
                                        };
                                        var $591 = $599;
                                        break;
                                };
                                var $583 = $591;
                                break;
                        };
                        var $576 = $583;
                        break;
                };
                var $568 = $576;
                break;
        };
        return $568;
    };
    const Kind$Parser$lambda = x0 => x1 => Kind$Parser$lambda$(x0, x1);

    function Kind$Parser$lambda$erased$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $609 = self.idx;
                var $610 = self.code;
                var $611 = self.err;
                var $612 = Parser$Reply$error$($609, $610, $611);
                var $608 = $612;
                break;
            case 'Parser.Reply.value':
                var $613 = self.idx;
                var $614 = self.code;
                var $615 = self.val;
                var self = Kind$Parser$text$("<", $613, $614);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $617 = self.idx;
                        var $618 = self.code;
                        var $619 = self.err;
                        var $620 = Parser$Reply$error$($617, $618, $619);
                        var $616 = $620;
                        break;
                    case 'Parser.Reply.value':
                        var $621 = self.idx;
                        var $622 = self.code;
                        var self = Parser$until1$(Kind$Parser$text(">"), Kind$Parser$item(Kind$Parser$name1), $621, $622);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $624 = self.idx;
                                var $625 = self.code;
                                var $626 = self.err;
                                var $627 = Parser$Reply$error$($624, $625, $626);
                                var $623 = $627;
                                break;
                            case 'Parser.Reply.value':
                                var $628 = self.idx;
                                var $629 = self.code;
                                var $630 = self.val;
                                var self = Kind$Parser$term$($628, $629);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $632 = self.idx;
                                        var $633 = self.code;
                                        var $634 = self.err;
                                        var $635 = Parser$Reply$error$($632, $633, $634);
                                        var $631 = $635;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $636 = self.idx;
                                        var $637 = self.code;
                                        var $638 = self.val;
                                        var self = Kind$Parser$stop$($615, $636, $637);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $640 = self.idx;
                                                var $641 = self.code;
                                                var $642 = self.err;
                                                var $643 = Parser$Reply$error$($640, $641, $642);
                                                var $639 = $643;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $644 = self.idx;
                                                var $645 = self.code;
                                                var $646 = self.val;
                                                var _expr$18 = Kind$Parser$make_lambda$($630, $638);
                                                var $647 = Parser$Reply$value$($644, $645, Kind$Term$ori$($646, _expr$18));
                                                var $639 = $647;
                                                break;
                                        };
                                        var $631 = $639;
                                        break;
                                };
                                var $623 = $631;
                                break;
                        };
                        var $616 = $623;
                        break;
                };
                var $608 = $616;
                break;
        };
        return $608;
    };
    const Kind$Parser$lambda$erased = x0 => x1 => Kind$Parser$lambda$erased$(x0, x1);

    function Kind$Parser$lambda$nameless$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $649 = self.idx;
                var $650 = self.code;
                var $651 = self.err;
                var $652 = Parser$Reply$error$($649, $650, $651);
                var $648 = $652;
                break;
            case 'Parser.Reply.value':
                var $653 = self.idx;
                var $654 = self.code;
                var $655 = self.val;
                var self = Kind$Parser$text$("()", $653, $654);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $657 = self.idx;
                        var $658 = self.code;
                        var $659 = self.err;
                        var $660 = Parser$Reply$error$($657, $658, $659);
                        var $656 = $660;
                        break;
                    case 'Parser.Reply.value':
                        var $661 = self.idx;
                        var $662 = self.code;
                        var self = Kind$Parser$term$($661, $662);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $664 = self.idx;
                                var $665 = self.code;
                                var $666 = self.err;
                                var $667 = Parser$Reply$error$($664, $665, $666);
                                var $663 = $667;
                                break;
                            case 'Parser.Reply.value':
                                var $668 = self.idx;
                                var $669 = self.code;
                                var $670 = self.val;
                                var self = Kind$Parser$stop$($655, $668, $669);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $672 = self.idx;
                                        var $673 = self.code;
                                        var $674 = self.err;
                                        var $675 = Parser$Reply$error$($672, $673, $674);
                                        var $671 = $675;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $676 = self.idx;
                                        var $677 = self.code;
                                        var $678 = self.val;
                                        var _expr$15 = Kind$Term$lam$("", (_x$15 => {
                                            var $680 = $670;
                                            return $680;
                                        }));
                                        var $679 = Parser$Reply$value$($676, $677, Kind$Term$ori$($678, _expr$15));
                                        var $671 = $679;
                                        break;
                                };
                                var $663 = $671;
                                break;
                        };
                        var $656 = $663;
                        break;
                };
                var $648 = $656;
                break;
        };
        return $648;
    };
    const Kind$Parser$lambda$nameless = x0 => x1 => Kind$Parser$lambda$nameless$(x0, x1);

    function Kind$Parser$parenthesis$(_idx$1, _code$2) {
        var self = Kind$Parser$text$("(", _idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $682 = self.idx;
                var $683 = self.code;
                var $684 = self.err;
                var $685 = Parser$Reply$error$($682, $683, $684);
                var $681 = $685;
                break;
            case 'Parser.Reply.value':
                var $686 = self.idx;
                var $687 = self.code;
                var self = Kind$Parser$term$($686, $687);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $689 = self.idx;
                        var $690 = self.code;
                        var $691 = self.err;
                        var $692 = Parser$Reply$error$($689, $690, $691);
                        var $688 = $692;
                        break;
                    case 'Parser.Reply.value':
                        var $693 = self.idx;
                        var $694 = self.code;
                        var $695 = self.val;
                        var self = Kind$Parser$text$(")", $693, $694);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $697 = self.idx;
                                var $698 = self.code;
                                var $699 = self.err;
                                var $700 = Parser$Reply$error$($697, $698, $699);
                                var $696 = $700;
                                break;
                            case 'Parser.Reply.value':
                                var $701 = self.idx;
                                var $702 = self.code;
                                var $703 = Parser$Reply$value$($701, $702, $695);
                                var $696 = $703;
                                break;
                        };
                        var $688 = $696;
                        break;
                };
                var $681 = $688;
                break;
        };
        return $681;
    };
    const Kind$Parser$parenthesis = x0 => x1 => Kind$Parser$parenthesis$(x0, x1);

    function Kind$Term$ref$(_name$1) {
        var $704 = ({
            _: 'Kind.Term.ref',
            'name': _name$1
        });
        return $704;
    };
    const Kind$Term$ref = x0 => Kind$Term$ref$(x0);

    function Kind$Term$app$(_func$1, _argm$2) {
        var $705 = ({
            _: 'Kind.Term.app',
            'func': _func$1,
            'argm': _argm$2
        });
        return $705;
    };
    const Kind$Term$app = x0 => x1 => Kind$Term$app$(x0, x1);

    function Kind$Term$hol$(_path$1) {
        var $706 = ({
            _: 'Kind.Term.hol',
            'path': _path$1
        });
        return $706;
    };
    const Kind$Term$hol = x0 => Kind$Term$hol$(x0);

    function Kind$Term$let$(_name$1, _expr$2, _body$3) {
        var $707 = ({
            _: 'Kind.Term.let',
            'name': _name$1,
            'expr': _expr$2,
            'body': _body$3
        });
        return $707;
    };
    const Kind$Term$let = x0 => x1 => x2 => Kind$Term$let$(x0, x1, x2);

    function Kind$Parser$letforrange$u32$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $709 = self.idx;
                var $710 = self.code;
                var $711 = self.err;
                var $712 = Parser$Reply$error$($709, $710, $711);
                var $708 = $712;
                break;
            case 'Parser.Reply.value':
                var $713 = self.idx;
                var $714 = self.code;
                var $715 = self.val;
                var self = Kind$Parser$text$("let ", $713, $714);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $717 = self.idx;
                        var $718 = self.code;
                        var $719 = self.err;
                        var $720 = Parser$Reply$error$($717, $718, $719);
                        var $716 = $720;
                        break;
                    case 'Parser.Reply.value':
                        var $721 = self.idx;
                        var $722 = self.code;
                        var self = Kind$Parser$name1$($721, $722);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $724 = self.idx;
                                var $725 = self.code;
                                var $726 = self.err;
                                var $727 = Parser$Reply$error$($724, $725, $726);
                                var $723 = $727;
                                break;
                            case 'Parser.Reply.value':
                                var $728 = self.idx;
                                var $729 = self.code;
                                var $730 = self.val;
                                var self = Kind$Parser$text$("=", $728, $729);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $732 = self.idx;
                                        var $733 = self.code;
                                        var $734 = self.err;
                                        var $735 = Parser$Reply$error$($732, $733, $734);
                                        var $731 = $735;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $736 = self.idx;
                                        var $737 = self.code;
                                        var self = Kind$Parser$text$("for ", $736, $737);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $739 = self.idx;
                                                var $740 = self.code;
                                                var $741 = self.err;
                                                var $742 = Parser$Reply$error$($739, $740, $741);
                                                var $738 = $742;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $743 = self.idx;
                                                var $744 = self.code;
                                                var self = Kind$Parser$name1$($743, $744);
                                                switch (self._) {
                                                    case 'Parser.Reply.error':
                                                        var $746 = self.idx;
                                                        var $747 = self.code;
                                                        var $748 = self.err;
                                                        var $749 = Parser$Reply$error$($746, $747, $748);
                                                        var $745 = $749;
                                                        break;
                                                    case 'Parser.Reply.value':
                                                        var $750 = self.idx;
                                                        var $751 = self.code;
                                                        var $752 = self.val;
                                                        var self = Kind$Parser$text$(":", $750, $751);
                                                        switch (self._) {
                                                            case 'Parser.Reply.error':
                                                                var $754 = self.idx;
                                                                var $755 = self.code;
                                                                var $756 = self.err;
                                                                var $757 = Parser$Reply$error$($754, $755, $756);
                                                                var $753 = $757;
                                                                break;
                                                            case 'Parser.Reply.value':
                                                                var $758 = self.idx;
                                                                var $759 = self.code;
                                                                var self = Kind$Parser$text$("U32", $758, $759);
                                                                switch (self._) {
                                                                    case 'Parser.Reply.error':
                                                                        var $761 = self.idx;
                                                                        var $762 = self.code;
                                                                        var $763 = self.err;
                                                                        var $764 = Parser$Reply$error$($761, $762, $763);
                                                                        var $760 = $764;
                                                                        break;
                                                                    case 'Parser.Reply.value':
                                                                        var $765 = self.idx;
                                                                        var $766 = self.code;
                                                                        var self = Kind$Parser$text$("=", $765, $766);
                                                                        switch (self._) {
                                                                            case 'Parser.Reply.error':
                                                                                var $768 = self.idx;
                                                                                var $769 = self.code;
                                                                                var $770 = self.err;
                                                                                var $771 = Parser$Reply$error$($768, $769, $770);
                                                                                var $767 = $771;
                                                                                break;
                                                                            case 'Parser.Reply.value':
                                                                                var $772 = self.idx;
                                                                                var $773 = self.code;
                                                                                var self = Kind$Parser$term$($772, $773);
                                                                                switch (self._) {
                                                                                    case 'Parser.Reply.error':
                                                                                        var $775 = self.idx;
                                                                                        var $776 = self.code;
                                                                                        var $777 = self.err;
                                                                                        var $778 = Parser$Reply$error$($775, $776, $777);
                                                                                        var $774 = $778;
                                                                                        break;
                                                                                    case 'Parser.Reply.value':
                                                                                        var $779 = self.idx;
                                                                                        var $780 = self.code;
                                                                                        var $781 = self.val;
                                                                                        var self = Kind$Parser$text$("..", $779, $780);
                                                                                        switch (self._) {
                                                                                            case 'Parser.Reply.error':
                                                                                                var $783 = self.idx;
                                                                                                var $784 = self.code;
                                                                                                var $785 = self.err;
                                                                                                var $786 = Parser$Reply$error$($783, $784, $785);
                                                                                                var $782 = $786;
                                                                                                break;
                                                                                            case 'Parser.Reply.value':
                                                                                                var $787 = self.idx;
                                                                                                var $788 = self.code;
                                                                                                var self = Kind$Parser$term$($787, $788);
                                                                                                switch (self._) {
                                                                                                    case 'Parser.Reply.error':
                                                                                                        var $790 = self.idx;
                                                                                                        var $791 = self.code;
                                                                                                        var $792 = self.err;
                                                                                                        var $793 = Parser$Reply$error$($790, $791, $792);
                                                                                                        var $789 = $793;
                                                                                                        break;
                                                                                                    case 'Parser.Reply.value':
                                                                                                        var $794 = self.idx;
                                                                                                        var $795 = self.code;
                                                                                                        var $796 = self.val;
                                                                                                        var self = Kind$Parser$text$(":", $794, $795);
                                                                                                        switch (self._) {
                                                                                                            case 'Parser.Reply.error':
                                                                                                                var $798 = self.idx;
                                                                                                                var $799 = self.code;
                                                                                                                var $800 = self.err;
                                                                                                                var $801 = Parser$Reply$error$($798, $799, $800);
                                                                                                                var $797 = $801;
                                                                                                                break;
                                                                                                            case 'Parser.Reply.value':
                                                                                                                var $802 = self.idx;
                                                                                                                var $803 = self.code;
                                                                                                                var self = Kind$Parser$term$($802, $803);
                                                                                                                switch (self._) {
                                                                                                                    case 'Parser.Reply.error':
                                                                                                                        var $805 = self.idx;
                                                                                                                        var $806 = self.code;
                                                                                                                        var $807 = self.err;
                                                                                                                        var $808 = Parser$Reply$error$($805, $806, $807);
                                                                                                                        var $804 = $808;
                                                                                                                        break;
                                                                                                                    case 'Parser.Reply.value':
                                                                                                                        var $809 = self.idx;
                                                                                                                        var $810 = self.code;
                                                                                                                        var $811 = self.val;
                                                                                                                        var self = Parser$maybe$(Kind$Parser$text(";"), $809, $810);
                                                                                                                        switch (self._) {
                                                                                                                            case 'Parser.Reply.error':
                                                                                                                                var $813 = self.idx;
                                                                                                                                var $814 = self.code;
                                                                                                                                var $815 = self.err;
                                                                                                                                var $816 = Parser$Reply$error$($813, $814, $815);
                                                                                                                                var $812 = $816;
                                                                                                                                break;
                                                                                                                            case 'Parser.Reply.value':
                                                                                                                                var $817 = self.idx;
                                                                                                                                var $818 = self.code;
                                                                                                                                var self = Kind$Parser$term$($817, $818);
                                                                                                                                switch (self._) {
                                                                                                                                    case 'Parser.Reply.error':
                                                                                                                                        var $820 = self.idx;
                                                                                                                                        var $821 = self.code;
                                                                                                                                        var $822 = self.err;
                                                                                                                                        var $823 = Parser$Reply$error$($820, $821, $822);
                                                                                                                                        var $819 = $823;
                                                                                                                                        break;
                                                                                                                                    case 'Parser.Reply.value':
                                                                                                                                        var $824 = self.idx;
                                                                                                                                        var $825 = self.code;
                                                                                                                                        var $826 = self.val;
                                                                                                                                        var self = Kind$Parser$stop$($715, $824, $825);
                                                                                                                                        switch (self._) {
                                                                                                                                            case 'Parser.Reply.error':
                                                                                                                                                var $828 = self.idx;
                                                                                                                                                var $829 = self.code;
                                                                                                                                                var $830 = self.err;
                                                                                                                                                var $831 = Parser$Reply$error$($828, $829, $830);
                                                                                                                                                var $827 = $831;
                                                                                                                                                break;
                                                                                                                                            case 'Parser.Reply.value':
                                                                                                                                                var $832 = self.idx;
                                                                                                                                                var $833 = self.code;
                                                                                                                                                var $834 = self.val;
                                                                                                                                                var _term$54 = Kind$Term$ref$("U32.for");
                                                                                                                                                var _term$55 = Kind$Term$app$(_term$54, Kind$Term$hol$(Bits$e));
                                                                                                                                                var _term$56 = Kind$Term$app$(_term$55, Kind$Term$ref$($730));
                                                                                                                                                var _term$57 = Kind$Term$app$(_term$56, $781);
                                                                                                                                                var _term$58 = Kind$Term$app$(_term$57, $796);
                                                                                                                                                var _lamb$59 = Kind$Term$lam$($752, (_e$59 => {
                                                                                                                                                    var $836 = Kind$Term$lam$($730, (_s$60 => {
                                                                                                                                                        var $837 = $811;
                                                                                                                                                        return $837;
                                                                                                                                                    }));
                                                                                                                                                    return $836;
                                                                                                                                                }));
                                                                                                                                                var _term$60 = Kind$Term$app$(_term$58, _lamb$59);
                                                                                                                                                var _term$61 = Kind$Term$let$($730, _term$60, (_x$61 => {
                                                                                                                                                    var $838 = $826;
                                                                                                                                                    return $838;
                                                                                                                                                }));
                                                                                                                                                var $835 = Parser$Reply$value$($832, $833, Kind$Term$ori$($834, _term$61));
                                                                                                                                                var $827 = $835;
                                                                                                                                                break;
                                                                                                                                        };
                                                                                                                                        var $819 = $827;
                                                                                                                                        break;
                                                                                                                                };
                                                                                                                                var $812 = $819;
                                                                                                                                break;
                                                                                                                        };
                                                                                                                        var $804 = $812;
                                                                                                                        break;
                                                                                                                };
                                                                                                                var $797 = $804;
                                                                                                                break;
                                                                                                        };
                                                                                                        var $789 = $797;
                                                                                                        break;
                                                                                                };
                                                                                                var $782 = $789;
                                                                                                break;
                                                                                        };
                                                                                        var $774 = $782;
                                                                                        break;
                                                                                };
                                                                                var $767 = $774;
                                                                                break;
                                                                        };
                                                                        var $760 = $767;
                                                                        break;
                                                                };
                                                                var $753 = $760;
                                                                break;
                                                        };
                                                        var $745 = $753;
                                                        break;
                                                };
                                                var $738 = $745;
                                                break;
                                        };
                                        var $731 = $738;
                                        break;
                                };
                                var $723 = $731;
                                break;
                        };
                        var $716 = $723;
                        break;
                };
                var $708 = $716;
                break;
        };
        return $708;
    };
    const Kind$Parser$letforrange$u32 = x0 => x1 => Kind$Parser$letforrange$u32$(x0, x1);

    function Kind$Parser$letforin$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $840 = self.idx;
                var $841 = self.code;
                var $842 = self.err;
                var $843 = Parser$Reply$error$($840, $841, $842);
                var $839 = $843;
                break;
            case 'Parser.Reply.value':
                var $844 = self.idx;
                var $845 = self.code;
                var $846 = self.val;
                var self = Kind$Parser$text$("let ", $844, $845);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $848 = self.idx;
                        var $849 = self.code;
                        var $850 = self.err;
                        var $851 = Parser$Reply$error$($848, $849, $850);
                        var $847 = $851;
                        break;
                    case 'Parser.Reply.value':
                        var $852 = self.idx;
                        var $853 = self.code;
                        var self = Kind$Parser$name1$($852, $853);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $855 = self.idx;
                                var $856 = self.code;
                                var $857 = self.err;
                                var $858 = Parser$Reply$error$($855, $856, $857);
                                var $854 = $858;
                                break;
                            case 'Parser.Reply.value':
                                var $859 = self.idx;
                                var $860 = self.code;
                                var $861 = self.val;
                                var self = Kind$Parser$text$("=", $859, $860);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $863 = self.idx;
                                        var $864 = self.code;
                                        var $865 = self.err;
                                        var $866 = Parser$Reply$error$($863, $864, $865);
                                        var $862 = $866;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $867 = self.idx;
                                        var $868 = self.code;
                                        var self = Kind$Parser$text$("for ", $867, $868);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $870 = self.idx;
                                                var $871 = self.code;
                                                var $872 = self.err;
                                                var $873 = Parser$Reply$error$($870, $871, $872);
                                                var $869 = $873;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $874 = self.idx;
                                                var $875 = self.code;
                                                var self = Kind$Parser$name1$($874, $875);
                                                switch (self._) {
                                                    case 'Parser.Reply.error':
                                                        var $877 = self.idx;
                                                        var $878 = self.code;
                                                        var $879 = self.err;
                                                        var $880 = Parser$Reply$error$($877, $878, $879);
                                                        var $876 = $880;
                                                        break;
                                                    case 'Parser.Reply.value':
                                                        var $881 = self.idx;
                                                        var $882 = self.code;
                                                        var $883 = self.val;
                                                        var self = Kind$Parser$text$("in", $881, $882);
                                                        switch (self._) {
                                                            case 'Parser.Reply.error':
                                                                var $885 = self.idx;
                                                                var $886 = self.code;
                                                                var $887 = self.err;
                                                                var $888 = Parser$Reply$error$($885, $886, $887);
                                                                var $884 = $888;
                                                                break;
                                                            case 'Parser.Reply.value':
                                                                var $889 = self.idx;
                                                                var $890 = self.code;
                                                                var self = Kind$Parser$term$($889, $890);
                                                                switch (self._) {
                                                                    case 'Parser.Reply.error':
                                                                        var $892 = self.idx;
                                                                        var $893 = self.code;
                                                                        var $894 = self.err;
                                                                        var $895 = Parser$Reply$error$($892, $893, $894);
                                                                        var $891 = $895;
                                                                        break;
                                                                    case 'Parser.Reply.value':
                                                                        var $896 = self.idx;
                                                                        var $897 = self.code;
                                                                        var $898 = self.val;
                                                                        var self = Kind$Parser$text$(":", $896, $897);
                                                                        switch (self._) {
                                                                            case 'Parser.Reply.error':
                                                                                var $900 = self.idx;
                                                                                var $901 = self.code;
                                                                                var $902 = self.err;
                                                                                var $903 = Parser$Reply$error$($900, $901, $902);
                                                                                var $899 = $903;
                                                                                break;
                                                                            case 'Parser.Reply.value':
                                                                                var $904 = self.idx;
                                                                                var $905 = self.code;
                                                                                var self = Kind$Parser$term$($904, $905);
                                                                                switch (self._) {
                                                                                    case 'Parser.Reply.error':
                                                                                        var $907 = self.idx;
                                                                                        var $908 = self.code;
                                                                                        var $909 = self.err;
                                                                                        var $910 = Parser$Reply$error$($907, $908, $909);
                                                                                        var $906 = $910;
                                                                                        break;
                                                                                    case 'Parser.Reply.value':
                                                                                        var $911 = self.idx;
                                                                                        var $912 = self.code;
                                                                                        var $913 = self.val;
                                                                                        var self = Parser$maybe$(Kind$Parser$text(";"), $911, $912);
                                                                                        switch (self._) {
                                                                                            case 'Parser.Reply.error':
                                                                                                var $915 = self.idx;
                                                                                                var $916 = self.code;
                                                                                                var $917 = self.err;
                                                                                                var $918 = Parser$Reply$error$($915, $916, $917);
                                                                                                var $914 = $918;
                                                                                                break;
                                                                                            case 'Parser.Reply.value':
                                                                                                var $919 = self.idx;
                                                                                                var $920 = self.code;
                                                                                                var self = Kind$Parser$term$($919, $920);
                                                                                                switch (self._) {
                                                                                                    case 'Parser.Reply.error':
                                                                                                        var $922 = self.idx;
                                                                                                        var $923 = self.code;
                                                                                                        var $924 = self.err;
                                                                                                        var $925 = Parser$Reply$error$($922, $923, $924);
                                                                                                        var $921 = $925;
                                                                                                        break;
                                                                                                    case 'Parser.Reply.value':
                                                                                                        var $926 = self.idx;
                                                                                                        var $927 = self.code;
                                                                                                        var $928 = self.val;
                                                                                                        var self = Kind$Parser$stop$($846, $926, $927);
                                                                                                        switch (self._) {
                                                                                                            case 'Parser.Reply.error':
                                                                                                                var $930 = self.idx;
                                                                                                                var $931 = self.code;
                                                                                                                var $932 = self.err;
                                                                                                                var $933 = Parser$Reply$error$($930, $931, $932);
                                                                                                                var $929 = $933;
                                                                                                                break;
                                                                                                            case 'Parser.Reply.value':
                                                                                                                var $934 = self.idx;
                                                                                                                var $935 = self.code;
                                                                                                                var $936 = self.val;
                                                                                                                var _term$42 = Kind$Term$ref$("List.for");
                                                                                                                var _term$43 = Kind$Term$app$(_term$42, Kind$Term$hol$(Bits$e));
                                                                                                                var _term$44 = Kind$Term$app$(_term$43, $898);
                                                                                                                var _term$45 = Kind$Term$app$(_term$44, Kind$Term$hol$(Bits$e));
                                                                                                                var _term$46 = Kind$Term$app$(_term$45, Kind$Term$ref$($861));
                                                                                                                var _lamb$47 = Kind$Term$lam$($883, (_i$47 => {
                                                                                                                    var $938 = Kind$Term$lam$($861, (_x$48 => {
                                                                                                                        var $939 = $913;
                                                                                                                        return $939;
                                                                                                                    }));
                                                                                                                    return $938;
                                                                                                                }));
                                                                                                                var _term$48 = Kind$Term$app$(_term$46, _lamb$47);
                                                                                                                var _term$49 = Kind$Term$let$($861, _term$48, (_x$49 => {
                                                                                                                    var $940 = $928;
                                                                                                                    return $940;
                                                                                                                }));
                                                                                                                var $937 = Parser$Reply$value$($934, $935, Kind$Term$ori$($936, _term$49));
                                                                                                                var $929 = $937;
                                                                                                                break;
                                                                                                        };
                                                                                                        var $921 = $929;
                                                                                                        break;
                                                                                                };
                                                                                                var $914 = $921;
                                                                                                break;
                                                                                        };
                                                                                        var $906 = $914;
                                                                                        break;
                                                                                };
                                                                                var $899 = $906;
                                                                                break;
                                                                        };
                                                                        var $891 = $899;
                                                                        break;
                                                                };
                                                                var $884 = $891;
                                                                break;
                                                        };
                                                        var $876 = $884;
                                                        break;
                                                };
                                                var $869 = $876;
                                                break;
                                        };
                                        var $862 = $869;
                                        break;
                                };
                                var $854 = $862;
                                break;
                        };
                        var $847 = $854;
                        break;
                };
                var $839 = $847;
                break;
        };
        return $839;
    };
    const Kind$Parser$letforin = x0 => x1 => Kind$Parser$letforin$(x0, x1);

    function Kind$Parser$let$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $942 = self.idx;
                var $943 = self.code;
                var $944 = self.err;
                var $945 = Parser$Reply$error$($942, $943, $944);
                var $941 = $945;
                break;
            case 'Parser.Reply.value':
                var $946 = self.idx;
                var $947 = self.code;
                var $948 = self.val;
                var self = Kind$Parser$text$("let ", $946, $947);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $950 = self.idx;
                        var $951 = self.code;
                        var $952 = self.err;
                        var $953 = Parser$Reply$error$($950, $951, $952);
                        var $949 = $953;
                        break;
                    case 'Parser.Reply.value':
                        var $954 = self.idx;
                        var $955 = self.code;
                        var self = Kind$Parser$name$($954, $955);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $957 = self.idx;
                                var $958 = self.code;
                                var $959 = self.err;
                                var $960 = Parser$Reply$error$($957, $958, $959);
                                var $956 = $960;
                                break;
                            case 'Parser.Reply.value':
                                var $961 = self.idx;
                                var $962 = self.code;
                                var $963 = self.val;
                                var self = Kind$Parser$text$("=", $961, $962);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $965 = self.idx;
                                        var $966 = self.code;
                                        var $967 = self.err;
                                        var $968 = Parser$Reply$error$($965, $966, $967);
                                        var $964 = $968;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $969 = self.idx;
                                        var $970 = self.code;
                                        var self = Kind$Parser$term$($969, $970);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $972 = self.idx;
                                                var $973 = self.code;
                                                var $974 = self.err;
                                                var $975 = Parser$Reply$error$($972, $973, $974);
                                                var $971 = $975;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $976 = self.idx;
                                                var $977 = self.code;
                                                var $978 = self.val;
                                                var self = Parser$maybe$(Kind$Parser$text(";"), $976, $977);
                                                switch (self._) {
                                                    case 'Parser.Reply.error':
                                                        var $980 = self.idx;
                                                        var $981 = self.code;
                                                        var $982 = self.err;
                                                        var $983 = Parser$Reply$error$($980, $981, $982);
                                                        var $979 = $983;
                                                        break;
                                                    case 'Parser.Reply.value':
                                                        var $984 = self.idx;
                                                        var $985 = self.code;
                                                        var self = Kind$Parser$term$($984, $985);
                                                        switch (self._) {
                                                            case 'Parser.Reply.error':
                                                                var $987 = self.idx;
                                                                var $988 = self.code;
                                                                var $989 = self.err;
                                                                var $990 = Parser$Reply$error$($987, $988, $989);
                                                                var $986 = $990;
                                                                break;
                                                            case 'Parser.Reply.value':
                                                                var $991 = self.idx;
                                                                var $992 = self.code;
                                                                var $993 = self.val;
                                                                var self = Kind$Parser$stop$($948, $991, $992);
                                                                switch (self._) {
                                                                    case 'Parser.Reply.error':
                                                                        var $995 = self.idx;
                                                                        var $996 = self.code;
                                                                        var $997 = self.err;
                                                                        var $998 = Parser$Reply$error$($995, $996, $997);
                                                                        var $994 = $998;
                                                                        break;
                                                                    case 'Parser.Reply.value':
                                                                        var $999 = self.idx;
                                                                        var $1000 = self.code;
                                                                        var $1001 = self.val;
                                                                        var $1002 = Parser$Reply$value$($999, $1000, Kind$Term$ori$($1001, Kind$Term$let$($963, $978, (_x$27 => {
                                                                            var $1003 = $993;
                                                                            return $1003;
                                                                        }))));
                                                                        var $994 = $1002;
                                                                        break;
                                                                };
                                                                var $986 = $994;
                                                                break;
                                                        };
                                                        var $979 = $986;
                                                        break;
                                                };
                                                var $971 = $979;
                                                break;
                                        };
                                        var $964 = $971;
                                        break;
                                };
                                var $956 = $964;
                                break;
                        };
                        var $949 = $956;
                        break;
                };
                var $941 = $949;
                break;
        };
        return $941;
    };
    const Kind$Parser$let = x0 => x1 => Kind$Parser$let$(x0, x1);

    function Kind$Parser$get$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $1005 = self.idx;
                var $1006 = self.code;
                var $1007 = self.err;
                var $1008 = Parser$Reply$error$($1005, $1006, $1007);
                var $1004 = $1008;
                break;
            case 'Parser.Reply.value':
                var $1009 = self.idx;
                var $1010 = self.code;
                var $1011 = self.val;
                var self = Kind$Parser$text$("let ", $1009, $1010);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $1013 = self.idx;
                        var $1014 = self.code;
                        var $1015 = self.err;
                        var $1016 = Parser$Reply$error$($1013, $1014, $1015);
                        var $1012 = $1016;
                        break;
                    case 'Parser.Reply.value':
                        var $1017 = self.idx;
                        var $1018 = self.code;
                        var self = Kind$Parser$text$("{", $1017, $1018);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $1020 = self.idx;
                                var $1021 = self.code;
                                var $1022 = self.err;
                                var $1023 = Parser$Reply$error$($1020, $1021, $1022);
                                var $1019 = $1023;
                                break;
                            case 'Parser.Reply.value':
                                var $1024 = self.idx;
                                var $1025 = self.code;
                                var self = Kind$Parser$name$($1024, $1025);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $1027 = self.idx;
                                        var $1028 = self.code;
                                        var $1029 = self.err;
                                        var $1030 = Parser$Reply$error$($1027, $1028, $1029);
                                        var $1026 = $1030;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $1031 = self.idx;
                                        var $1032 = self.code;
                                        var $1033 = self.val;
                                        var self = Kind$Parser$text$(",", $1031, $1032);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $1035 = self.idx;
                                                var $1036 = self.code;
                                                var $1037 = self.err;
                                                var $1038 = Parser$Reply$error$($1035, $1036, $1037);
                                                var $1034 = $1038;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $1039 = self.idx;
                                                var $1040 = self.code;
                                                var self = Kind$Parser$name$($1039, $1040);
                                                switch (self._) {
                                                    case 'Parser.Reply.error':
                                                        var $1042 = self.idx;
                                                        var $1043 = self.code;
                                                        var $1044 = self.err;
                                                        var $1045 = Parser$Reply$error$($1042, $1043, $1044);
                                                        var $1041 = $1045;
                                                        break;
                                                    case 'Parser.Reply.value':
                                                        var $1046 = self.idx;
                                                        var $1047 = self.code;
                                                        var $1048 = self.val;
                                                        var self = Kind$Parser$text$("}", $1046, $1047);
                                                        switch (self._) {
                                                            case 'Parser.Reply.error':
                                                                var $1050 = self.idx;
                                                                var $1051 = self.code;
                                                                var $1052 = self.err;
                                                                var $1053 = Parser$Reply$error$($1050, $1051, $1052);
                                                                var $1049 = $1053;
                                                                break;
                                                            case 'Parser.Reply.value':
                                                                var $1054 = self.idx;
                                                                var $1055 = self.code;
                                                                var self = Kind$Parser$text$("=", $1054, $1055);
                                                                switch (self._) {
                                                                    case 'Parser.Reply.error':
                                                                        var $1057 = self.idx;
                                                                        var $1058 = self.code;
                                                                        var $1059 = self.err;
                                                                        var $1060 = Parser$Reply$error$($1057, $1058, $1059);
                                                                        var $1056 = $1060;
                                                                        break;
                                                                    case 'Parser.Reply.value':
                                                                        var $1061 = self.idx;
                                                                        var $1062 = self.code;
                                                                        var self = Kind$Parser$term$($1061, $1062);
                                                                        switch (self._) {
                                                                            case 'Parser.Reply.error':
                                                                                var $1064 = self.idx;
                                                                                var $1065 = self.code;
                                                                                var $1066 = self.err;
                                                                                var $1067 = Parser$Reply$error$($1064, $1065, $1066);
                                                                                var $1063 = $1067;
                                                                                break;
                                                                            case 'Parser.Reply.value':
                                                                                var $1068 = self.idx;
                                                                                var $1069 = self.code;
                                                                                var $1070 = self.val;
                                                                                var self = Parser$maybe$(Kind$Parser$text(";"), $1068, $1069);
                                                                                switch (self._) {
                                                                                    case 'Parser.Reply.error':
                                                                                        var $1072 = self.idx;
                                                                                        var $1073 = self.code;
                                                                                        var $1074 = self.err;
                                                                                        var $1075 = Parser$Reply$error$($1072, $1073, $1074);
                                                                                        var $1071 = $1075;
                                                                                        break;
                                                                                    case 'Parser.Reply.value':
                                                                                        var $1076 = self.idx;
                                                                                        var $1077 = self.code;
                                                                                        var self = Kind$Parser$term$($1076, $1077);
                                                                                        switch (self._) {
                                                                                            case 'Parser.Reply.error':
                                                                                                var $1079 = self.idx;
                                                                                                var $1080 = self.code;
                                                                                                var $1081 = self.err;
                                                                                                var $1082 = Parser$Reply$error$($1079, $1080, $1081);
                                                                                                var $1078 = $1082;
                                                                                                break;
                                                                                            case 'Parser.Reply.value':
                                                                                                var $1083 = self.idx;
                                                                                                var $1084 = self.code;
                                                                                                var $1085 = self.val;
                                                                                                var self = Kind$Parser$stop$($1011, $1083, $1084);
                                                                                                switch (self._) {
                                                                                                    case 'Parser.Reply.error':
                                                                                                        var $1087 = self.idx;
                                                                                                        var $1088 = self.code;
                                                                                                        var $1089 = self.err;
                                                                                                        var $1090 = Parser$Reply$error$($1087, $1088, $1089);
                                                                                                        var $1086 = $1090;
                                                                                                        break;
                                                                                                    case 'Parser.Reply.value':
                                                                                                        var $1091 = self.idx;
                                                                                                        var $1092 = self.code;
                                                                                                        var $1093 = self.val;
                                                                                                        var _term$39 = $1070;
                                                                                                        var _term$40 = Kind$Term$app$(_term$39, Kind$Term$lam$("x", (_x$40 => {
                                                                                                            var $1095 = Kind$Term$hol$(Bits$e);
                                                                                                            return $1095;
                                                                                                        })));
                                                                                                        var _term$41 = Kind$Term$app$(_term$40, Kind$Term$lam$($1033, (_x$41 => {
                                                                                                            var $1096 = Kind$Term$lam$($1048, (_y$42 => {
                                                                                                                var $1097 = $1085;
                                                                                                                return $1097;
                                                                                                            }));
                                                                                                            return $1096;
                                                                                                        })));
                                                                                                        var $1094 = Parser$Reply$value$($1091, $1092, Kind$Term$ori$($1093, _term$41));
                                                                                                        var $1086 = $1094;
                                                                                                        break;
                                                                                                };
                                                                                                var $1078 = $1086;
                                                                                                break;
                                                                                        };
                                                                                        var $1071 = $1078;
                                                                                        break;
                                                                                };
                                                                                var $1063 = $1071;
                                                                                break;
                                                                        };
                                                                        var $1056 = $1063;
                                                                        break;
                                                                };
                                                                var $1049 = $1056;
                                                                break;
                                                        };
                                                        var $1041 = $1049;
                                                        break;
                                                };
                                                var $1034 = $1041;
                                                break;
                                        };
                                        var $1026 = $1034;
                                        break;
                                };
                                var $1019 = $1026;
                                break;
                        };
                        var $1012 = $1019;
                        break;
                };
                var $1004 = $1012;
                break;
        };
        return $1004;
    };
    const Kind$Parser$get = x0 => x1 => Kind$Parser$get$(x0, x1);

    function Kind$Term$def$(_name$1, _expr$2, _body$3) {
        var $1098 = ({
            _: 'Kind.Term.def',
            'name': _name$1,
            'expr': _expr$2,
            'body': _body$3
        });
        return $1098;
    };
    const Kind$Term$def = x0 => x1 => x2 => Kind$Term$def$(x0, x1, x2);

    function Kind$Parser$def$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $1100 = self.idx;
                var $1101 = self.code;
                var $1102 = self.err;
                var $1103 = Parser$Reply$error$($1100, $1101, $1102);
                var $1099 = $1103;
                break;
            case 'Parser.Reply.value':
                var $1104 = self.idx;
                var $1105 = self.code;
                var $1106 = self.val;
                var self = Kind$Parser$text$("def ", $1104, $1105);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $1108 = self.idx;
                        var $1109 = self.code;
                        var $1110 = self.err;
                        var $1111 = Parser$Reply$error$($1108, $1109, $1110);
                        var $1107 = $1111;
                        break;
                    case 'Parser.Reply.value':
                        var $1112 = self.idx;
                        var $1113 = self.code;
                        var self = Kind$Parser$name$($1112, $1113);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $1115 = self.idx;
                                var $1116 = self.code;
                                var $1117 = self.err;
                                var $1118 = Parser$Reply$error$($1115, $1116, $1117);
                                var $1114 = $1118;
                                break;
                            case 'Parser.Reply.value':
                                var $1119 = self.idx;
                                var $1120 = self.code;
                                var $1121 = self.val;
                                var self = Kind$Parser$text$("=", $1119, $1120);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $1123 = self.idx;
                                        var $1124 = self.code;
                                        var $1125 = self.err;
                                        var $1126 = Parser$Reply$error$($1123, $1124, $1125);
                                        var $1122 = $1126;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $1127 = self.idx;
                                        var $1128 = self.code;
                                        var self = Kind$Parser$term$($1127, $1128);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $1130 = self.idx;
                                                var $1131 = self.code;
                                                var $1132 = self.err;
                                                var $1133 = Parser$Reply$error$($1130, $1131, $1132);
                                                var $1129 = $1133;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $1134 = self.idx;
                                                var $1135 = self.code;
                                                var $1136 = self.val;
                                                var self = Parser$maybe$(Kind$Parser$text(";"), $1134, $1135);
                                                switch (self._) {
                                                    case 'Parser.Reply.error':
                                                        var $1138 = self.idx;
                                                        var $1139 = self.code;
                                                        var $1140 = self.err;
                                                        var $1141 = Parser$Reply$error$($1138, $1139, $1140);
                                                        var $1137 = $1141;
                                                        break;
                                                    case 'Parser.Reply.value':
                                                        var $1142 = self.idx;
                                                        var $1143 = self.code;
                                                        var self = Kind$Parser$term$($1142, $1143);
                                                        switch (self._) {
                                                            case 'Parser.Reply.error':
                                                                var $1145 = self.idx;
                                                                var $1146 = self.code;
                                                                var $1147 = self.err;
                                                                var $1148 = Parser$Reply$error$($1145, $1146, $1147);
                                                                var $1144 = $1148;
                                                                break;
                                                            case 'Parser.Reply.value':
                                                                var $1149 = self.idx;
                                                                var $1150 = self.code;
                                                                var $1151 = self.val;
                                                                var self = Kind$Parser$stop$($1106, $1149, $1150);
                                                                switch (self._) {
                                                                    case 'Parser.Reply.error':
                                                                        var $1153 = self.idx;
                                                                        var $1154 = self.code;
                                                                        var $1155 = self.err;
                                                                        var $1156 = Parser$Reply$error$($1153, $1154, $1155);
                                                                        var $1152 = $1156;
                                                                        break;
                                                                    case 'Parser.Reply.value':
                                                                        var $1157 = self.idx;
                                                                        var $1158 = self.code;
                                                                        var $1159 = self.val;
                                                                        var $1160 = Parser$Reply$value$($1157, $1158, Kind$Term$ori$($1159, Kind$Term$def$($1121, $1136, (_x$27 => {
                                                                            var $1161 = $1151;
                                                                            return $1161;
                                                                        }))));
                                                                        var $1152 = $1160;
                                                                        break;
                                                                };
                                                                var $1144 = $1152;
                                                                break;
                                                        };
                                                        var $1137 = $1144;
                                                        break;
                                                };
                                                var $1129 = $1137;
                                                break;
                                        };
                                        var $1122 = $1129;
                                        break;
                                };
                                var $1114 = $1122;
                                break;
                        };
                        var $1107 = $1114;
                        break;
                };
                var $1099 = $1107;
                break;
        };
        return $1099;
    };
    const Kind$Parser$def = x0 => x1 => Kind$Parser$def$(x0, x1);

    function Kind$Parser$goal_rewrite$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $1163 = self.idx;
                var $1164 = self.code;
                var $1165 = self.err;
                var $1166 = Parser$Reply$error$($1163, $1164, $1165);
                var $1162 = $1166;
                break;
            case 'Parser.Reply.value':
                var $1167 = self.idx;
                var $1168 = self.code;
                var $1169 = self.val;
                var self = Kind$Parser$text$("rewrite ", $1167, $1168);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $1171 = self.idx;
                        var $1172 = self.code;
                        var $1173 = self.err;
                        var $1174 = Parser$Reply$error$($1171, $1172, $1173);
                        var $1170 = $1174;
                        break;
                    case 'Parser.Reply.value':
                        var $1175 = self.idx;
                        var $1176 = self.code;
                        var self = Kind$Parser$name1$($1175, $1176);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $1178 = self.idx;
                                var $1179 = self.code;
                                var $1180 = self.err;
                                var $1181 = Parser$Reply$error$($1178, $1179, $1180);
                                var $1177 = $1181;
                                break;
                            case 'Parser.Reply.value':
                                var $1182 = self.idx;
                                var $1183 = self.code;
                                var $1184 = self.val;
                                var self = Kind$Parser$text$("in", $1182, $1183);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $1186 = self.idx;
                                        var $1187 = self.code;
                                        var $1188 = self.err;
                                        var $1189 = Parser$Reply$error$($1186, $1187, $1188);
                                        var $1185 = $1189;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $1190 = self.idx;
                                        var $1191 = self.code;
                                        var self = Kind$Parser$term$($1190, $1191);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $1193 = self.idx;
                                                var $1194 = self.code;
                                                var $1195 = self.err;
                                                var $1196 = Parser$Reply$error$($1193, $1194, $1195);
                                                var $1192 = $1196;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $1197 = self.idx;
                                                var $1198 = self.code;
                                                var $1199 = self.val;
                                                var self = Kind$Parser$text$("with", $1197, $1198);
                                                switch (self._) {
                                                    case 'Parser.Reply.error':
                                                        var $1201 = self.idx;
                                                        var $1202 = self.code;
                                                        var $1203 = self.err;
                                                        var $1204 = Parser$Reply$error$($1201, $1202, $1203);
                                                        var $1200 = $1204;
                                                        break;
                                                    case 'Parser.Reply.value':
                                                        var $1205 = self.idx;
                                                        var $1206 = self.code;
                                                        var self = Kind$Parser$term$($1205, $1206);
                                                        switch (self._) {
                                                            case 'Parser.Reply.error':
                                                                var $1208 = self.idx;
                                                                var $1209 = self.code;
                                                                var $1210 = self.err;
                                                                var $1211 = Parser$Reply$error$($1208, $1209, $1210);
                                                                var $1207 = $1211;
                                                                break;
                                                            case 'Parser.Reply.value':
                                                                var $1212 = self.idx;
                                                                var $1213 = self.code;
                                                                var $1214 = self.val;
                                                                var self = Kind$Parser$term$($1212, $1213);
                                                                switch (self._) {
                                                                    case 'Parser.Reply.error':
                                                                        var $1216 = self.idx;
                                                                        var $1217 = self.code;
                                                                        var $1218 = self.err;
                                                                        var $1219 = Parser$Reply$error$($1216, $1217, $1218);
                                                                        var $1215 = $1219;
                                                                        break;
                                                                    case 'Parser.Reply.value':
                                                                        var $1220 = self.idx;
                                                                        var $1221 = self.code;
                                                                        var $1222 = self.val;
                                                                        var self = Kind$Parser$stop$($1169, $1220, $1221);
                                                                        switch (self._) {
                                                                            case 'Parser.Reply.error':
                                                                                var $1224 = self.idx;
                                                                                var $1225 = self.code;
                                                                                var $1226 = self.err;
                                                                                var $1227 = Parser$Reply$error$($1224, $1225, $1226);
                                                                                var $1223 = $1227;
                                                                                break;
                                                                            case 'Parser.Reply.value':
                                                                                var $1228 = self.idx;
                                                                                var $1229 = self.code;
                                                                                var $1230 = self.val;
                                                                                var _moti$30 = Kind$Term$lam$($1184, (_s$30 => {
                                                                                    var $1232 = Kind$Term$lam$("", (_x$31 => {
                                                                                        var $1233 = $1199;
                                                                                        return $1233;
                                                                                    }));
                                                                                    return $1232;
                                                                                }));
                                                                                var _term$31 = Kind$Term$ref$("Equal.mirror");
                                                                                var _term$32 = Kind$Term$app$(_term$31, Kind$Term$hol$(Bits$e));
                                                                                var _term$33 = Kind$Term$app$(_term$32, Kind$Term$hol$(Bits$e));
                                                                                var _term$34 = Kind$Term$app$(_term$33, Kind$Term$hol$(Bits$e));
                                                                                var _term$35 = Kind$Term$app$(_term$34, $1214);
                                                                                var _term$36 = Kind$Term$app$(_term$35, _moti$30);
                                                                                var _term$37 = Kind$Term$app$(_term$36, $1222);
                                                                                var $1231 = Parser$Reply$value$($1228, $1229, Kind$Term$ori$($1230, _term$37));
                                                                                var $1223 = $1231;
                                                                                break;
                                                                        };
                                                                        var $1215 = $1223;
                                                                        break;
                                                                };
                                                                var $1207 = $1215;
                                                                break;
                                                        };
                                                        var $1200 = $1207;
                                                        break;
                                                };
                                                var $1192 = $1200;
                                                break;
                                        };
                                        var $1185 = $1192;
                                        break;
                                };
                                var $1177 = $1185;
                                break;
                        };
                        var $1170 = $1177;
                        break;
                };
                var $1162 = $1170;
                break;
        };
        return $1162;
    };
    const Kind$Parser$goal_rewrite = x0 => x1 => Kind$Parser$goal_rewrite$(x0, x1);

    function Kind$Parser$if$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $1235 = self.idx;
                var $1236 = self.code;
                var $1237 = self.err;
                var $1238 = Parser$Reply$error$($1235, $1236, $1237);
                var $1234 = $1238;
                break;
            case 'Parser.Reply.value':
                var $1239 = self.idx;
                var $1240 = self.code;
                var $1241 = self.val;
                var self = Kind$Parser$text$("if ", $1239, $1240);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $1243 = self.idx;
                        var $1244 = self.code;
                        var $1245 = self.err;
                        var $1246 = Parser$Reply$error$($1243, $1244, $1245);
                        var $1242 = $1246;
                        break;
                    case 'Parser.Reply.value':
                        var $1247 = self.idx;
                        var $1248 = self.code;
                        var self = Kind$Parser$term$($1247, $1248);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $1250 = self.idx;
                                var $1251 = self.code;
                                var $1252 = self.err;
                                var $1253 = Parser$Reply$error$($1250, $1251, $1252);
                                var $1249 = $1253;
                                break;
                            case 'Parser.Reply.value':
                                var $1254 = self.idx;
                                var $1255 = self.code;
                                var $1256 = self.val;
                                var self = Kind$Parser$text$("then", $1254, $1255);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $1258 = self.idx;
                                        var $1259 = self.code;
                                        var $1260 = self.err;
                                        var $1261 = Parser$Reply$error$($1258, $1259, $1260);
                                        var $1257 = $1261;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $1262 = self.idx;
                                        var $1263 = self.code;
                                        var self = Kind$Parser$term$($1262, $1263);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $1265 = self.idx;
                                                var $1266 = self.code;
                                                var $1267 = self.err;
                                                var $1268 = Parser$Reply$error$($1265, $1266, $1267);
                                                var $1264 = $1268;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $1269 = self.idx;
                                                var $1270 = self.code;
                                                var $1271 = self.val;
                                                var self = Kind$Parser$text$("else", $1269, $1270);
                                                switch (self._) {
                                                    case 'Parser.Reply.error':
                                                        var $1273 = self.idx;
                                                        var $1274 = self.code;
                                                        var $1275 = self.err;
                                                        var $1276 = Parser$Reply$error$($1273, $1274, $1275);
                                                        var $1272 = $1276;
                                                        break;
                                                    case 'Parser.Reply.value':
                                                        var $1277 = self.idx;
                                                        var $1278 = self.code;
                                                        var self = Kind$Parser$term$($1277, $1278);
                                                        switch (self._) {
                                                            case 'Parser.Reply.error':
                                                                var $1280 = self.idx;
                                                                var $1281 = self.code;
                                                                var $1282 = self.err;
                                                                var $1283 = Parser$Reply$error$($1280, $1281, $1282);
                                                                var $1279 = $1283;
                                                                break;
                                                            case 'Parser.Reply.value':
                                                                var $1284 = self.idx;
                                                                var $1285 = self.code;
                                                                var $1286 = self.val;
                                                                var self = Kind$Parser$stop$($1241, $1284, $1285);
                                                                switch (self._) {
                                                                    case 'Parser.Reply.error':
                                                                        var $1288 = self.idx;
                                                                        var $1289 = self.code;
                                                                        var $1290 = self.err;
                                                                        var $1291 = Parser$Reply$error$($1288, $1289, $1290);
                                                                        var $1287 = $1291;
                                                                        break;
                                                                    case 'Parser.Reply.value':
                                                                        var $1292 = self.idx;
                                                                        var $1293 = self.code;
                                                                        var $1294 = self.val;
                                                                        var _term$27 = $1256;
                                                                        var _term$28 = Kind$Term$app$(_term$27, Kind$Term$lam$("", (_x$28 => {
                                                                            var $1296 = Kind$Term$hol$(Bits$e);
                                                                            return $1296;
                                                                        })));
                                                                        var _term$29 = Kind$Term$app$(_term$28, $1271);
                                                                        var _term$30 = Kind$Term$app$(_term$29, $1286);
                                                                        var $1295 = Parser$Reply$value$($1292, $1293, Kind$Term$ori$($1294, _term$30));
                                                                        var $1287 = $1295;
                                                                        break;
                                                                };
                                                                var $1279 = $1287;
                                                                break;
                                                        };
                                                        var $1272 = $1279;
                                                        break;
                                                };
                                                var $1264 = $1272;
                                                break;
                                        };
                                        var $1257 = $1264;
                                        break;
                                };
                                var $1249 = $1257;
                                break;
                        };
                        var $1242 = $1249;
                        break;
                };
                var $1234 = $1242;
                break;
        };
        return $1234;
    };
    const Kind$Parser$if = x0 => x1 => Kind$Parser$if$(x0, x1);

    function List$mapped$(_as$2, _f$4) {
        var self = _as$2;
        switch (self._) {
            case 'List.cons':
                var $1298 = self.head;
                var $1299 = self.tail;
                var $1300 = List$cons$(_f$4($1298), List$mapped$($1299, _f$4));
                var $1297 = $1300;
                break;
            case 'List.nil':
                var $1301 = List$nil;
                var $1297 = $1301;
                break;
        };
        return $1297;
    };
    const List$mapped = x0 => x1 => List$mapped$(x0, x1);
    const Kind$backslash = 92;
    const Kind$escapes = List$cons$(Pair$new$("\\b", 8), List$cons$(Pair$new$("\\f", 12), List$cons$(Pair$new$("\\n", 10), List$cons$(Pair$new$("\\r", 13), List$cons$(Pair$new$("\\t", 9), List$cons$(Pair$new$("\\v", 11), List$cons$(Pair$new$(String$cons$(Kind$backslash, String$cons$(Kind$backslash, String$nil)), Kind$backslash), List$cons$(Pair$new$("\\\"", 34), List$cons$(Pair$new$("\\0", 0), List$cons$(Pair$new$("\\\'", 39), List$nil))))))))));
    const Kind$Parser$char$single = Parser$first_of$(List$cons$(Parser$first_of$(List$mapped$(Kind$escapes, (_esc$1 => {
        var self = _esc$1;
        switch (self._) {
            case 'Pair.new':
                var $1303 = self.fst;
                var $1304 = self.snd;
                var $1305 = (_idx$4 => _code$5 => {
                    var self = Parser$text$($1303, _idx$4, _code$5);
                    switch (self._) {
                        case 'Parser.Reply.error':
                            var $1307 = self.idx;
                            var $1308 = self.code;
                            var $1309 = self.err;
                            var $1310 = Parser$Reply$error$($1307, $1308, $1309);
                            var $1306 = $1310;
                            break;
                        case 'Parser.Reply.value':
                            var $1311 = self.idx;
                            var $1312 = self.code;
                            var $1313 = Parser$Reply$value$($1311, $1312, $1304);
                            var $1306 = $1313;
                            break;
                    };
                    return $1306;
                });
                var $1302 = $1305;
                break;
        };
        return $1302;
    }))), List$cons$(Parser$one, List$nil)));

    function Kind$Term$chr$(_chrx$1) {
        var $1314 = ({
            _: 'Kind.Term.chr',
            'chrx': _chrx$1
        });
        return $1314;
    };
    const Kind$Term$chr = x0 => Kind$Term$chr$(x0);

    function Kind$Parser$char$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $1316 = self.idx;
                var $1317 = self.code;
                var $1318 = self.err;
                var $1319 = Parser$Reply$error$($1316, $1317, $1318);
                var $1315 = $1319;
                break;
            case 'Parser.Reply.value':
                var $1320 = self.idx;
                var $1321 = self.code;
                var $1322 = self.val;
                var self = Kind$Parser$text$("\'", $1320, $1321);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $1324 = self.idx;
                        var $1325 = self.code;
                        var $1326 = self.err;
                        var $1327 = Parser$Reply$error$($1324, $1325, $1326);
                        var $1323 = $1327;
                        break;
                    case 'Parser.Reply.value':
                        var $1328 = self.idx;
                        var $1329 = self.code;
                        var self = Kind$Parser$char$single($1328)($1329);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $1331 = self.idx;
                                var $1332 = self.code;
                                var $1333 = self.err;
                                var $1334 = Parser$Reply$error$($1331, $1332, $1333);
                                var $1330 = $1334;
                                break;
                            case 'Parser.Reply.value':
                                var $1335 = self.idx;
                                var $1336 = self.code;
                                var $1337 = self.val;
                                var self = Parser$text$("\'", $1335, $1336);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $1339 = self.idx;
                                        var $1340 = self.code;
                                        var $1341 = self.err;
                                        var $1342 = Parser$Reply$error$($1339, $1340, $1341);
                                        var $1338 = $1342;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $1343 = self.idx;
                                        var $1344 = self.code;
                                        var self = Kind$Parser$stop$($1322, $1343, $1344);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $1346 = self.idx;
                                                var $1347 = self.code;
                                                var $1348 = self.err;
                                                var $1349 = Parser$Reply$error$($1346, $1347, $1348);
                                                var $1345 = $1349;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $1350 = self.idx;
                                                var $1351 = self.code;
                                                var $1352 = self.val;
                                                var $1353 = Parser$Reply$value$($1350, $1351, Kind$Term$ori$($1352, Kind$Term$chr$($1337)));
                                                var $1345 = $1353;
                                                break;
                                        };
                                        var $1338 = $1345;
                                        break;
                                };
                                var $1330 = $1338;
                                break;
                        };
                        var $1323 = $1330;
                        break;
                };
                var $1315 = $1323;
                break;
        };
        return $1315;
    };
    const Kind$Parser$char = x0 => x1 => Kind$Parser$char$(x0, x1);

    function String$reverse$go$(_xs$1, _res$2) {
        var String$reverse$go$ = (_xs$1, _res$2) => ({
            ctr: 'TCO',
            arg: [_xs$1, _res$2]
        });
        var String$reverse$go = _xs$1 => _res$2 => String$reverse$go$(_xs$1, _res$2);
        var arg = [_xs$1, _res$2];
        while (true) {
            let [_xs$1, _res$2] = arg;
            var R = (() => {
                var self = _xs$1;
                if (self.length === 0) {
                    var $1354 = _res$2;
                    return $1354;
                } else {
                    var $1355 = self.charCodeAt(0);
                    var $1356 = self.slice(1);
                    var $1357 = String$reverse$go$($1356, String$cons$($1355, _res$2));
                    return $1357;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const String$reverse$go = x0 => x1 => String$reverse$go$(x0, x1);

    function String$reverse$(_xs$1) {
        var $1358 = String$reverse$go$(_xs$1, String$nil);
        return $1358;
    };
    const String$reverse = x0 => String$reverse$(x0);

    function Kind$Parser$string$go$(_str$1, _idx$2, _code$3) {
        var Kind$Parser$string$go$ = (_str$1, _idx$2, _code$3) => ({
            ctr: 'TCO',
            arg: [_str$1, _idx$2, _code$3]
        });
        var Kind$Parser$string$go = _str$1 => _idx$2 => _code$3 => Kind$Parser$string$go$(_str$1, _idx$2, _code$3);
        var arg = [_str$1, _idx$2, _code$3];
        while (true) {
            let [_str$1, _idx$2, _code$3] = arg;
            var R = (() => {
                var self = _code$3;
                if (self.length === 0) {
                    var $1359 = Parser$Reply$error$(_idx$2, _code$3, "Non-terminating string.");
                    return $1359;
                } else {
                    var $1360 = self.charCodeAt(0);
                    var $1361 = self.slice(1);
                    var self = ($1360 === 34);
                    if (self) {
                        var $1363 = Parser$Reply$value$(Nat$succ$(_idx$2), $1361, String$reverse$(_str$1));
                        var $1362 = $1363;
                    } else {
                        var self = Kind$Parser$char$single(_idx$2)(_code$3);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $1365 = self.idx;
                                var $1366 = self.code;
                                var $1367 = self.err;
                                var $1368 = Parser$Reply$error$($1365, $1366, $1367);
                                var $1364 = $1368;
                                break;
                            case 'Parser.Reply.value':
                                var $1369 = self.idx;
                                var $1370 = self.code;
                                var $1371 = self.val;
                                var $1372 = Kind$Parser$string$go$(String$cons$($1371, _str$1), $1369, $1370);
                                var $1364 = $1372;
                                break;
                        };
                        var $1362 = $1364;
                    };
                    return $1362;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Kind$Parser$string$go = x0 => x1 => x2 => Kind$Parser$string$go$(x0, x1, x2);

    function Kind$Term$str$(_strx$1) {
        var $1373 = ({
            _: 'Kind.Term.str',
            'strx': _strx$1
        });
        return $1373;
    };
    const Kind$Term$str = x0 => Kind$Term$str$(x0);

    function Kind$Parser$string$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $1375 = self.idx;
                var $1376 = self.code;
                var $1377 = self.err;
                var $1378 = Parser$Reply$error$($1375, $1376, $1377);
                var $1374 = $1378;
                break;
            case 'Parser.Reply.value':
                var $1379 = self.idx;
                var $1380 = self.code;
                var $1381 = self.val;
                var self = Kind$Parser$text$(String$cons$(34, String$nil), $1379, $1380);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $1383 = self.idx;
                        var $1384 = self.code;
                        var $1385 = self.err;
                        var $1386 = Parser$Reply$error$($1383, $1384, $1385);
                        var $1382 = $1386;
                        break;
                    case 'Parser.Reply.value':
                        var $1387 = self.idx;
                        var $1388 = self.code;
                        var self = Kind$Parser$string$go$("", $1387, $1388);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $1390 = self.idx;
                                var $1391 = self.code;
                                var $1392 = self.err;
                                var $1393 = Parser$Reply$error$($1390, $1391, $1392);
                                var $1389 = $1393;
                                break;
                            case 'Parser.Reply.value':
                                var $1394 = self.idx;
                                var $1395 = self.code;
                                var $1396 = self.val;
                                var self = Kind$Parser$stop$($1381, $1394, $1395);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $1398 = self.idx;
                                        var $1399 = self.code;
                                        var $1400 = self.err;
                                        var $1401 = Parser$Reply$error$($1398, $1399, $1400);
                                        var $1397 = $1401;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $1402 = self.idx;
                                        var $1403 = self.code;
                                        var $1404 = self.val;
                                        var $1405 = Parser$Reply$value$($1402, $1403, Kind$Term$ori$($1404, Kind$Term$str$($1396)));
                                        var $1397 = $1405;
                                        break;
                                };
                                var $1389 = $1397;
                                break;
                        };
                        var $1382 = $1389;
                        break;
                };
                var $1374 = $1382;
                break;
        };
        return $1374;
    };
    const Kind$Parser$string = x0 => x1 => Kind$Parser$string$(x0, x1);

    function Kind$Parser$pair$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $1407 = self.idx;
                var $1408 = self.code;
                var $1409 = self.err;
                var $1410 = Parser$Reply$error$($1407, $1408, $1409);
                var $1406 = $1410;
                break;
            case 'Parser.Reply.value':
                var $1411 = self.idx;
                var $1412 = self.code;
                var $1413 = self.val;
                var self = Kind$Parser$text$("{", $1411, $1412);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $1415 = self.idx;
                        var $1416 = self.code;
                        var $1417 = self.err;
                        var $1418 = Parser$Reply$error$($1415, $1416, $1417);
                        var $1414 = $1418;
                        break;
                    case 'Parser.Reply.value':
                        var $1419 = self.idx;
                        var $1420 = self.code;
                        var self = Kind$Parser$term$($1419, $1420);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $1422 = self.idx;
                                var $1423 = self.code;
                                var $1424 = self.err;
                                var $1425 = Parser$Reply$error$($1422, $1423, $1424);
                                var $1421 = $1425;
                                break;
                            case 'Parser.Reply.value':
                                var $1426 = self.idx;
                                var $1427 = self.code;
                                var $1428 = self.val;
                                var self = Kind$Parser$text$(",", $1426, $1427);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $1430 = self.idx;
                                        var $1431 = self.code;
                                        var $1432 = self.err;
                                        var $1433 = Parser$Reply$error$($1430, $1431, $1432);
                                        var $1429 = $1433;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $1434 = self.idx;
                                        var $1435 = self.code;
                                        var self = Kind$Parser$term$($1434, $1435);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $1437 = self.idx;
                                                var $1438 = self.code;
                                                var $1439 = self.err;
                                                var $1440 = Parser$Reply$error$($1437, $1438, $1439);
                                                var $1436 = $1440;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $1441 = self.idx;
                                                var $1442 = self.code;
                                                var $1443 = self.val;
                                                var self = Kind$Parser$text$("}", $1441, $1442);
                                                switch (self._) {
                                                    case 'Parser.Reply.error':
                                                        var $1445 = self.idx;
                                                        var $1446 = self.code;
                                                        var $1447 = self.err;
                                                        var $1448 = Parser$Reply$error$($1445, $1446, $1447);
                                                        var $1444 = $1448;
                                                        break;
                                                    case 'Parser.Reply.value':
                                                        var $1449 = self.idx;
                                                        var $1450 = self.code;
                                                        var self = Kind$Parser$stop$($1413, $1449, $1450);
                                                        switch (self._) {
                                                            case 'Parser.Reply.error':
                                                                var $1452 = self.idx;
                                                                var $1453 = self.code;
                                                                var $1454 = self.err;
                                                                var $1455 = Parser$Reply$error$($1452, $1453, $1454);
                                                                var $1451 = $1455;
                                                                break;
                                                            case 'Parser.Reply.value':
                                                                var $1456 = self.idx;
                                                                var $1457 = self.code;
                                                                var $1458 = self.val;
                                                                var _term$24 = Kind$Term$ref$("Pair.new");
                                                                var _term$25 = Kind$Term$app$(_term$24, Kind$Term$hol$(Bits$e));
                                                                var _term$26 = Kind$Term$app$(_term$25, Kind$Term$hol$(Bits$e));
                                                                var _term$27 = Kind$Term$app$(_term$26, $1428);
                                                                var _term$28 = Kind$Term$app$(_term$27, $1443);
                                                                var $1459 = Parser$Reply$value$($1456, $1457, Kind$Term$ori$($1458, _term$28));
                                                                var $1451 = $1459;
                                                                break;
                                                        };
                                                        var $1444 = $1451;
                                                        break;
                                                };
                                                var $1436 = $1444;
                                                break;
                                        };
                                        var $1429 = $1436;
                                        break;
                                };
                                var $1421 = $1429;
                                break;
                        };
                        var $1414 = $1421;
                        break;
                };
                var $1406 = $1414;
                break;
        };
        return $1406;
    };
    const Kind$Parser$pair = x0 => x1 => Kind$Parser$pair$(x0, x1);

    function Kind$Parser$sigma$type$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $1461 = self.idx;
                var $1462 = self.code;
                var $1463 = self.err;
                var $1464 = Parser$Reply$error$($1461, $1462, $1463);
                var $1460 = $1464;
                break;
            case 'Parser.Reply.value':
                var $1465 = self.idx;
                var $1466 = self.code;
                var $1467 = self.val;
                var self = Kind$Parser$text$("{", $1465, $1466);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $1469 = self.idx;
                        var $1470 = self.code;
                        var $1471 = self.err;
                        var $1472 = Parser$Reply$error$($1469, $1470, $1471);
                        var $1468 = $1472;
                        break;
                    case 'Parser.Reply.value':
                        var $1473 = self.idx;
                        var $1474 = self.code;
                        var self = Kind$Parser$name1$($1473, $1474);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $1476 = self.idx;
                                var $1477 = self.code;
                                var $1478 = self.err;
                                var $1479 = Parser$Reply$error$($1476, $1477, $1478);
                                var $1475 = $1479;
                                break;
                            case 'Parser.Reply.value':
                                var $1480 = self.idx;
                                var $1481 = self.code;
                                var $1482 = self.val;
                                var self = Kind$Parser$text$(":", $1480, $1481);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $1484 = self.idx;
                                        var $1485 = self.code;
                                        var $1486 = self.err;
                                        var $1487 = Parser$Reply$error$($1484, $1485, $1486);
                                        var $1483 = $1487;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $1488 = self.idx;
                                        var $1489 = self.code;
                                        var self = Kind$Parser$term$($1488, $1489);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $1491 = self.idx;
                                                var $1492 = self.code;
                                                var $1493 = self.err;
                                                var $1494 = Parser$Reply$error$($1491, $1492, $1493);
                                                var $1490 = $1494;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $1495 = self.idx;
                                                var $1496 = self.code;
                                                var $1497 = self.val;
                                                var self = Kind$Parser$text$("}", $1495, $1496);
                                                switch (self._) {
                                                    case 'Parser.Reply.error':
                                                        var $1499 = self.idx;
                                                        var $1500 = self.code;
                                                        var $1501 = self.err;
                                                        var $1502 = Parser$Reply$error$($1499, $1500, $1501);
                                                        var $1498 = $1502;
                                                        break;
                                                    case 'Parser.Reply.value':
                                                        var $1503 = self.idx;
                                                        var $1504 = self.code;
                                                        var self = Kind$Parser$term$($1503, $1504);
                                                        switch (self._) {
                                                            case 'Parser.Reply.error':
                                                                var $1506 = self.idx;
                                                                var $1507 = self.code;
                                                                var $1508 = self.err;
                                                                var $1509 = Parser$Reply$error$($1506, $1507, $1508);
                                                                var $1505 = $1509;
                                                                break;
                                                            case 'Parser.Reply.value':
                                                                var $1510 = self.idx;
                                                                var $1511 = self.code;
                                                                var $1512 = self.val;
                                                                var self = Kind$Parser$stop$($1467, $1510, $1511);
                                                                switch (self._) {
                                                                    case 'Parser.Reply.error':
                                                                        var $1514 = self.idx;
                                                                        var $1515 = self.code;
                                                                        var $1516 = self.err;
                                                                        var $1517 = Parser$Reply$error$($1514, $1515, $1516);
                                                                        var $1513 = $1517;
                                                                        break;
                                                                    case 'Parser.Reply.value':
                                                                        var $1518 = self.idx;
                                                                        var $1519 = self.code;
                                                                        var $1520 = self.val;
                                                                        var _term$27 = Kind$Term$ref$("Sigma");
                                                                        var _term$28 = Kind$Term$app$(_term$27, $1497);
                                                                        var _term$29 = Kind$Term$app$(_term$28, Kind$Term$lam$($1482, (_x$29 => {
                                                                            var $1522 = $1512;
                                                                            return $1522;
                                                                        })));
                                                                        var $1521 = Parser$Reply$value$($1518, $1519, Kind$Term$ori$($1520, _term$29));
                                                                        var $1513 = $1521;
                                                                        break;
                                                                };
                                                                var $1505 = $1513;
                                                                break;
                                                        };
                                                        var $1498 = $1505;
                                                        break;
                                                };
                                                var $1490 = $1498;
                                                break;
                                        };
                                        var $1483 = $1490;
                                        break;
                                };
                                var $1475 = $1483;
                                break;
                        };
                        var $1468 = $1475;
                        break;
                };
                var $1460 = $1468;
                break;
        };
        return $1460;
    };
    const Kind$Parser$sigma$type = x0 => x1 => Kind$Parser$sigma$type$(x0, x1);

    function Kind$Parser$some$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $1524 = self.idx;
                var $1525 = self.code;
                var $1526 = self.err;
                var $1527 = Parser$Reply$error$($1524, $1525, $1526);
                var $1523 = $1527;
                break;
            case 'Parser.Reply.value':
                var $1528 = self.idx;
                var $1529 = self.code;
                var $1530 = self.val;
                var self = Kind$Parser$text$("some(", $1528, $1529);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $1532 = self.idx;
                        var $1533 = self.code;
                        var $1534 = self.err;
                        var $1535 = Parser$Reply$error$($1532, $1533, $1534);
                        var $1531 = $1535;
                        break;
                    case 'Parser.Reply.value':
                        var $1536 = self.idx;
                        var $1537 = self.code;
                        var self = Kind$Parser$term$($1536, $1537);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $1539 = self.idx;
                                var $1540 = self.code;
                                var $1541 = self.err;
                                var $1542 = Parser$Reply$error$($1539, $1540, $1541);
                                var $1538 = $1542;
                                break;
                            case 'Parser.Reply.value':
                                var $1543 = self.idx;
                                var $1544 = self.code;
                                var $1545 = self.val;
                                var self = Kind$Parser$text$(")", $1543, $1544);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $1547 = self.idx;
                                        var $1548 = self.code;
                                        var $1549 = self.err;
                                        var $1550 = Parser$Reply$error$($1547, $1548, $1549);
                                        var $1546 = $1550;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $1551 = self.idx;
                                        var $1552 = self.code;
                                        var self = Kind$Parser$stop$($1530, $1551, $1552);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $1554 = self.idx;
                                                var $1555 = self.code;
                                                var $1556 = self.err;
                                                var $1557 = Parser$Reply$error$($1554, $1555, $1556);
                                                var $1553 = $1557;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $1558 = self.idx;
                                                var $1559 = self.code;
                                                var $1560 = self.val;
                                                var _term$18 = Kind$Term$ref$("Maybe.some");
                                                var _term$19 = Kind$Term$app$(_term$18, Kind$Term$hol$(Bits$e));
                                                var _term$20 = Kind$Term$app$(_term$19, $1545);
                                                var $1561 = Parser$Reply$value$($1558, $1559, Kind$Term$ori$($1560, _term$20));
                                                var $1553 = $1561;
                                                break;
                                        };
                                        var $1546 = $1553;
                                        break;
                                };
                                var $1538 = $1546;
                                break;
                        };
                        var $1531 = $1538;
                        break;
                };
                var $1523 = $1531;
                break;
        };
        return $1523;
    };
    const Kind$Parser$some = x0 => x1 => Kind$Parser$some$(x0, x1);

    function Kind$Parser$apply$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $1563 = self.idx;
                var $1564 = self.code;
                var $1565 = self.err;
                var $1566 = Parser$Reply$error$($1563, $1564, $1565);
                var $1562 = $1566;
                break;
            case 'Parser.Reply.value':
                var $1567 = self.idx;
                var $1568 = self.code;
                var $1569 = self.val;
                var self = Kind$Parser$text$("apply(", $1567, $1568);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $1571 = self.idx;
                        var $1572 = self.code;
                        var $1573 = self.err;
                        var $1574 = Parser$Reply$error$($1571, $1572, $1573);
                        var $1570 = $1574;
                        break;
                    case 'Parser.Reply.value':
                        var $1575 = self.idx;
                        var $1576 = self.code;
                        var self = Kind$Parser$term$($1575, $1576);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $1578 = self.idx;
                                var $1579 = self.code;
                                var $1580 = self.err;
                                var $1581 = Parser$Reply$error$($1578, $1579, $1580);
                                var $1577 = $1581;
                                break;
                            case 'Parser.Reply.value':
                                var $1582 = self.idx;
                                var $1583 = self.code;
                                var $1584 = self.val;
                                var self = Kind$Parser$text$(",", $1582, $1583);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $1586 = self.idx;
                                        var $1587 = self.code;
                                        var $1588 = self.err;
                                        var $1589 = Parser$Reply$error$($1586, $1587, $1588);
                                        var $1585 = $1589;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $1590 = self.idx;
                                        var $1591 = self.code;
                                        var self = Kind$Parser$term$($1590, $1591);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $1593 = self.idx;
                                                var $1594 = self.code;
                                                var $1595 = self.err;
                                                var $1596 = Parser$Reply$error$($1593, $1594, $1595);
                                                var $1592 = $1596;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $1597 = self.idx;
                                                var $1598 = self.code;
                                                var $1599 = self.val;
                                                var self = Kind$Parser$text$(")", $1597, $1598);
                                                switch (self._) {
                                                    case 'Parser.Reply.error':
                                                        var $1601 = self.idx;
                                                        var $1602 = self.code;
                                                        var $1603 = self.err;
                                                        var $1604 = Parser$Reply$error$($1601, $1602, $1603);
                                                        var $1600 = $1604;
                                                        break;
                                                    case 'Parser.Reply.value':
                                                        var $1605 = self.idx;
                                                        var $1606 = self.code;
                                                        var self = Kind$Parser$stop$($1569, $1605, $1606);
                                                        switch (self._) {
                                                            case 'Parser.Reply.error':
                                                                var $1608 = self.idx;
                                                                var $1609 = self.code;
                                                                var $1610 = self.err;
                                                                var $1611 = Parser$Reply$error$($1608, $1609, $1610);
                                                                var $1607 = $1611;
                                                                break;
                                                            case 'Parser.Reply.value':
                                                                var $1612 = self.idx;
                                                                var $1613 = self.code;
                                                                var $1614 = self.val;
                                                                var _term$24 = Kind$Term$ref$("Equal.apply");
                                                                var _term$25 = Kind$Term$app$(_term$24, Kind$Term$hol$(Bits$e));
                                                                var _term$26 = Kind$Term$app$(_term$25, Kind$Term$hol$(Bits$e));
                                                                var _term$27 = Kind$Term$app$(_term$26, Kind$Term$hol$(Bits$e));
                                                                var _term$28 = Kind$Term$app$(_term$27, Kind$Term$hol$(Bits$e));
                                                                var _term$29 = Kind$Term$app$(_term$28, $1584);
                                                                var _term$30 = Kind$Term$app$(_term$29, $1599);
                                                                var $1615 = Parser$Reply$value$($1612, $1613, Kind$Term$ori$($1614, _term$30));
                                                                var $1607 = $1615;
                                                                break;
                                                        };
                                                        var $1600 = $1607;
                                                        break;
                                                };
                                                var $1592 = $1600;
                                                break;
                                        };
                                        var $1585 = $1592;
                                        break;
                                };
                                var $1577 = $1585;
                                break;
                        };
                        var $1570 = $1577;
                        break;
                };
                var $1562 = $1570;
                break;
        };
        return $1562;
    };
    const Kind$Parser$apply = x0 => x1 => Kind$Parser$apply$(x0, x1);

    function Kind$Parser$mirror$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $1617 = self.idx;
                var $1618 = self.code;
                var $1619 = self.err;
                var $1620 = Parser$Reply$error$($1617, $1618, $1619);
                var $1616 = $1620;
                break;
            case 'Parser.Reply.value':
                var $1621 = self.idx;
                var $1622 = self.code;
                var $1623 = self.val;
                var self = Kind$Parser$text$("mirror(", $1621, $1622);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $1625 = self.idx;
                        var $1626 = self.code;
                        var $1627 = self.err;
                        var $1628 = Parser$Reply$error$($1625, $1626, $1627);
                        var $1624 = $1628;
                        break;
                    case 'Parser.Reply.value':
                        var $1629 = self.idx;
                        var $1630 = self.code;
                        var self = Kind$Parser$term$($1629, $1630);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $1632 = self.idx;
                                var $1633 = self.code;
                                var $1634 = self.err;
                                var $1635 = Parser$Reply$error$($1632, $1633, $1634);
                                var $1631 = $1635;
                                break;
                            case 'Parser.Reply.value':
                                var $1636 = self.idx;
                                var $1637 = self.code;
                                var $1638 = self.val;
                                var self = Kind$Parser$text$(")", $1636, $1637);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $1640 = self.idx;
                                        var $1641 = self.code;
                                        var $1642 = self.err;
                                        var $1643 = Parser$Reply$error$($1640, $1641, $1642);
                                        var $1639 = $1643;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $1644 = self.idx;
                                        var $1645 = self.code;
                                        var self = Kind$Parser$stop$($1623, $1644, $1645);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $1647 = self.idx;
                                                var $1648 = self.code;
                                                var $1649 = self.err;
                                                var $1650 = Parser$Reply$error$($1647, $1648, $1649);
                                                var $1646 = $1650;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $1651 = self.idx;
                                                var $1652 = self.code;
                                                var $1653 = self.val;
                                                var _term$18 = Kind$Term$ref$("Equal.mirror");
                                                var _term$19 = Kind$Term$app$(_term$18, Kind$Term$hol$(Bits$e));
                                                var _term$20 = Kind$Term$app$(_term$19, Kind$Term$hol$(Bits$e));
                                                var _term$21 = Kind$Term$app$(_term$20, Kind$Term$hol$(Bits$e));
                                                var _term$22 = Kind$Term$app$(_term$21, $1638);
                                                var $1654 = Parser$Reply$value$($1651, $1652, Kind$Term$ori$($1653, _term$22));
                                                var $1646 = $1654;
                                                break;
                                        };
                                        var $1639 = $1646;
                                        break;
                                };
                                var $1631 = $1639;
                                break;
                        };
                        var $1624 = $1631;
                        break;
                };
                var $1616 = $1624;
                break;
        };
        return $1616;
    };
    const Kind$Parser$mirror = x0 => x1 => Kind$Parser$mirror$(x0, x1);

    function Kind$Name$read$(_str$1) {
        var $1655 = _str$1;
        return $1655;
    };
    const Kind$Name$read = x0 => Kind$Name$read$(x0);

    function Kind$Parser$list$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $1657 = self.idx;
                var $1658 = self.code;
                var $1659 = self.err;
                var $1660 = Parser$Reply$error$($1657, $1658, $1659);
                var $1656 = $1660;
                break;
            case 'Parser.Reply.value':
                var $1661 = self.idx;
                var $1662 = self.code;
                var $1663 = self.val;
                var self = Kind$Parser$text$("[", $1661, $1662);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $1665 = self.idx;
                        var $1666 = self.code;
                        var $1667 = self.err;
                        var $1668 = Parser$Reply$error$($1665, $1666, $1667);
                        var $1664 = $1668;
                        break;
                    case 'Parser.Reply.value':
                        var $1669 = self.idx;
                        var $1670 = self.code;
                        var self = Parser$until$(Kind$Parser$text("]"), Kind$Parser$item(Kind$Parser$term))($1669)($1670);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $1672 = self.idx;
                                var $1673 = self.code;
                                var $1674 = self.err;
                                var $1675 = Parser$Reply$error$($1672, $1673, $1674);
                                var $1671 = $1675;
                                break;
                            case 'Parser.Reply.value':
                                var $1676 = self.idx;
                                var $1677 = self.code;
                                var $1678 = self.val;
                                var self = Kind$Parser$stop$($1663, $1676, $1677);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $1680 = self.idx;
                                        var $1681 = self.code;
                                        var $1682 = self.err;
                                        var $1683 = Parser$Reply$error$($1680, $1681, $1682);
                                        var $1679 = $1683;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $1684 = self.idx;
                                        var $1685 = self.code;
                                        var $1686 = self.val;
                                        var $1687 = Parser$Reply$value$($1684, $1685, List$fold$($1678, Kind$Term$app$(Kind$Term$ref$(Kind$Name$read$("List.nil")), Kind$Term$hol$(Bits$e)), (_x$15 => _xs$16 => {
                                            var _term$17 = Kind$Term$ref$(Kind$Name$read$("List.cons"));
                                            var _term$18 = Kind$Term$app$(_term$17, Kind$Term$hol$(Bits$e));
                                            var _term$19 = Kind$Term$app$(_term$18, _x$15);
                                            var _term$20 = Kind$Term$app$(_term$19, _xs$16);
                                            var $1688 = Kind$Term$ori$($1686, _term$20);
                                            return $1688;
                                        })));
                                        var $1679 = $1687;
                                        break;
                                };
                                var $1671 = $1679;
                                break;
                        };
                        var $1664 = $1671;
                        break;
                };
                var $1656 = $1664;
                break;
        };
        return $1656;
    };
    const Kind$Parser$list = x0 => x1 => Kind$Parser$list$(x0, x1);

    function Kind$Parser$log$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $1690 = self.idx;
                var $1691 = self.code;
                var $1692 = self.err;
                var $1693 = Parser$Reply$error$($1690, $1691, $1692);
                var $1689 = $1693;
                break;
            case 'Parser.Reply.value':
                var $1694 = self.idx;
                var $1695 = self.code;
                var $1696 = self.val;
                var self = Kind$Parser$text$("log(", $1694, $1695);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $1698 = self.idx;
                        var $1699 = self.code;
                        var $1700 = self.err;
                        var $1701 = Parser$Reply$error$($1698, $1699, $1700);
                        var $1697 = $1701;
                        break;
                    case 'Parser.Reply.value':
                        var $1702 = self.idx;
                        var $1703 = self.code;
                        var self = Parser$until$(Kind$Parser$text(")"), Kind$Parser$item(Kind$Parser$term))($1702)($1703);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $1705 = self.idx;
                                var $1706 = self.code;
                                var $1707 = self.err;
                                var $1708 = Parser$Reply$error$($1705, $1706, $1707);
                                var $1704 = $1708;
                                break;
                            case 'Parser.Reply.value':
                                var $1709 = self.idx;
                                var $1710 = self.code;
                                var $1711 = self.val;
                                var self = Kind$Parser$term$($1709, $1710);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $1713 = self.idx;
                                        var $1714 = self.code;
                                        var $1715 = self.err;
                                        var $1716 = Parser$Reply$error$($1713, $1714, $1715);
                                        var $1712 = $1716;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $1717 = self.idx;
                                        var $1718 = self.code;
                                        var $1719 = self.val;
                                        var _term$15 = Kind$Term$ref$("Debug.log");
                                        var _term$16 = Kind$Term$app$(_term$15, Kind$Term$hol$(Bits$e));
                                        var _args$17 = List$fold$($1711, Kind$Term$ref$("String.nil"), (_x$17 => _xs$18 => {
                                            var _arg$19 = Kind$Term$ref$("String.concat");
                                            var _arg$20 = Kind$Term$app$(_arg$19, _x$17);
                                            var _arg$21 = Kind$Term$app$(_arg$20, _xs$18);
                                            var $1721 = _arg$21;
                                            return $1721;
                                        }));
                                        var _term$18 = Kind$Term$app$(_term$16, _args$17);
                                        var _term$19 = Kind$Term$app$(_term$18, Kind$Term$lam$("x", (_x$19 => {
                                            var $1722 = $1719;
                                            return $1722;
                                        })));
                                        var self = Kind$Parser$stop$($1696, $1717, $1718);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $1723 = self.idx;
                                                var $1724 = self.code;
                                                var $1725 = self.err;
                                                var $1726 = Parser$Reply$error$($1723, $1724, $1725);
                                                var $1720 = $1726;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $1727 = self.idx;
                                                var $1728 = self.code;
                                                var $1729 = self.val;
                                                var $1730 = Parser$Reply$value$($1727, $1728, Kind$Term$ori$($1729, _term$19));
                                                var $1720 = $1730;
                                                break;
                                        };
                                        var $1712 = $1720;
                                        break;
                                };
                                var $1704 = $1712;
                                break;
                        };
                        var $1697 = $1704;
                        break;
                };
                var $1689 = $1697;
                break;
        };
        return $1689;
    };
    const Kind$Parser$log = x0 => x1 => Kind$Parser$log$(x0, x1);

    function Kind$Parser$forrange$u32$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $1732 = self.idx;
                var $1733 = self.code;
                var $1734 = self.err;
                var $1735 = Parser$Reply$error$($1732, $1733, $1734);
                var $1731 = $1735;
                break;
            case 'Parser.Reply.value':
                var $1736 = self.idx;
                var $1737 = self.code;
                var $1738 = self.val;
                var self = Kind$Parser$text$("for ", $1736, $1737);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $1740 = self.idx;
                        var $1741 = self.code;
                        var $1742 = self.err;
                        var $1743 = Parser$Reply$error$($1740, $1741, $1742);
                        var $1739 = $1743;
                        break;
                    case 'Parser.Reply.value':
                        var $1744 = self.idx;
                        var $1745 = self.code;
                        var self = Kind$Parser$name1$($1744, $1745);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $1747 = self.idx;
                                var $1748 = self.code;
                                var $1749 = self.err;
                                var $1750 = Parser$Reply$error$($1747, $1748, $1749);
                                var $1746 = $1750;
                                break;
                            case 'Parser.Reply.value':
                                var $1751 = self.idx;
                                var $1752 = self.code;
                                var $1753 = self.val;
                                var self = Kind$Parser$text$(":", $1751, $1752);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $1755 = self.idx;
                                        var $1756 = self.code;
                                        var $1757 = self.err;
                                        var $1758 = Parser$Reply$error$($1755, $1756, $1757);
                                        var $1754 = $1758;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $1759 = self.idx;
                                        var $1760 = self.code;
                                        var self = Kind$Parser$text$("U32", $1759, $1760);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $1762 = self.idx;
                                                var $1763 = self.code;
                                                var $1764 = self.err;
                                                var $1765 = Parser$Reply$error$($1762, $1763, $1764);
                                                var $1761 = $1765;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $1766 = self.idx;
                                                var $1767 = self.code;
                                                var self = Kind$Parser$text$("=", $1766, $1767);
                                                switch (self._) {
                                                    case 'Parser.Reply.error':
                                                        var $1769 = self.idx;
                                                        var $1770 = self.code;
                                                        var $1771 = self.err;
                                                        var $1772 = Parser$Reply$error$($1769, $1770, $1771);
                                                        var $1768 = $1772;
                                                        break;
                                                    case 'Parser.Reply.value':
                                                        var $1773 = self.idx;
                                                        var $1774 = self.code;
                                                        var self = Kind$Parser$term$($1773, $1774);
                                                        switch (self._) {
                                                            case 'Parser.Reply.error':
                                                                var $1776 = self.idx;
                                                                var $1777 = self.code;
                                                                var $1778 = self.err;
                                                                var $1779 = Parser$Reply$error$($1776, $1777, $1778);
                                                                var $1775 = $1779;
                                                                break;
                                                            case 'Parser.Reply.value':
                                                                var $1780 = self.idx;
                                                                var $1781 = self.code;
                                                                var $1782 = self.val;
                                                                var self = Kind$Parser$text$("..", $1780, $1781);
                                                                switch (self._) {
                                                                    case 'Parser.Reply.error':
                                                                        var $1784 = self.idx;
                                                                        var $1785 = self.code;
                                                                        var $1786 = self.err;
                                                                        var $1787 = Parser$Reply$error$($1784, $1785, $1786);
                                                                        var $1783 = $1787;
                                                                        break;
                                                                    case 'Parser.Reply.value':
                                                                        var $1788 = self.idx;
                                                                        var $1789 = self.code;
                                                                        var self = Kind$Parser$term$($1788, $1789);
                                                                        switch (self._) {
                                                                            case 'Parser.Reply.error':
                                                                                var $1791 = self.idx;
                                                                                var $1792 = self.code;
                                                                                var $1793 = self.err;
                                                                                var $1794 = Parser$Reply$error$($1791, $1792, $1793);
                                                                                var $1790 = $1794;
                                                                                break;
                                                                            case 'Parser.Reply.value':
                                                                                var $1795 = self.idx;
                                                                                var $1796 = self.code;
                                                                                var $1797 = self.val;
                                                                                var self = Kind$Parser$text$("with", $1795, $1796);
                                                                                switch (self._) {
                                                                                    case 'Parser.Reply.error':
                                                                                        var $1799 = self.idx;
                                                                                        var $1800 = self.code;
                                                                                        var $1801 = self.err;
                                                                                        var $1802 = Parser$Reply$error$($1799, $1800, $1801);
                                                                                        var $1798 = $1802;
                                                                                        break;
                                                                                    case 'Parser.Reply.value':
                                                                                        var $1803 = self.idx;
                                                                                        var $1804 = self.code;
                                                                                        var self = Kind$Parser$name1$($1803, $1804);
                                                                                        switch (self._) {
                                                                                            case 'Parser.Reply.error':
                                                                                                var $1806 = self.idx;
                                                                                                var $1807 = self.code;
                                                                                                var $1808 = self.err;
                                                                                                var $1809 = Parser$Reply$error$($1806, $1807, $1808);
                                                                                                var $1805 = $1809;
                                                                                                break;
                                                                                            case 'Parser.Reply.value':
                                                                                                var $1810 = self.idx;
                                                                                                var $1811 = self.code;
                                                                                                var $1812 = self.val;
                                                                                                var self = Kind$Parser$text$(":", $1810, $1811);
                                                                                                switch (self._) {
                                                                                                    case 'Parser.Reply.error':
                                                                                                        var $1814 = self.idx;
                                                                                                        var $1815 = self.code;
                                                                                                        var $1816 = self.err;
                                                                                                        var $1817 = Parser$Reply$error$($1814, $1815, $1816);
                                                                                                        var $1813 = $1817;
                                                                                                        break;
                                                                                                    case 'Parser.Reply.value':
                                                                                                        var $1818 = self.idx;
                                                                                                        var $1819 = self.code;
                                                                                                        var self = Kind$Parser$term$($1818, $1819);
                                                                                                        switch (self._) {
                                                                                                            case 'Parser.Reply.error':
                                                                                                                var $1821 = self.idx;
                                                                                                                var $1822 = self.code;
                                                                                                                var $1823 = self.err;
                                                                                                                var $1824 = Parser$Reply$error$($1821, $1822, $1823);
                                                                                                                var $1820 = $1824;
                                                                                                                break;
                                                                                                            case 'Parser.Reply.value':
                                                                                                                var $1825 = self.idx;
                                                                                                                var $1826 = self.code;
                                                                                                                var $1827 = self.val;
                                                                                                                var self = Kind$Parser$stop$($1738, $1825, $1826);
                                                                                                                switch (self._) {
                                                                                                                    case 'Parser.Reply.error':
                                                                                                                        var $1829 = self.idx;
                                                                                                                        var $1830 = self.code;
                                                                                                                        var $1831 = self.err;
                                                                                                                        var $1832 = Parser$Reply$error$($1829, $1830, $1831);
                                                                                                                        var $1828 = $1832;
                                                                                                                        break;
                                                                                                                    case 'Parser.Reply.value':
                                                                                                                        var $1833 = self.idx;
                                                                                                                        var $1834 = self.code;
                                                                                                                        var $1835 = self.val;
                                                                                                                        var _term$45 = Kind$Term$ref$("U32.for");
                                                                                                                        var _term$46 = Kind$Term$app$(_term$45, Kind$Term$hol$(Bits$e));
                                                                                                                        var _term$47 = Kind$Term$app$(_term$46, Kind$Term$ref$($1812));
                                                                                                                        var _term$48 = Kind$Term$app$(_term$47, $1782);
                                                                                                                        var _term$49 = Kind$Term$app$(_term$48, $1797);
                                                                                                                        var _lamb$50 = Kind$Term$lam$($1753, (_e$50 => {
                                                                                                                            var $1837 = Kind$Term$lam$($1812, (_s$51 => {
                                                                                                                                var $1838 = $1827;
                                                                                                                                return $1838;
                                                                                                                            }));
                                                                                                                            return $1837;
                                                                                                                        }));
                                                                                                                        var _term$51 = Kind$Term$app$(_term$49, _lamb$50);
                                                                                                                        var _term$52 = Kind$Term$let$($1812, _term$51, (_x$52 => {
                                                                                                                            var $1839 = Kind$Term$ref$($1812);
                                                                                                                            return $1839;
                                                                                                                        }));
                                                                                                                        var $1836 = Parser$Reply$value$($1833, $1834, Kind$Term$ori$($1835, _term$52));
                                                                                                                        var $1828 = $1836;
                                                                                                                        break;
                                                                                                                };
                                                                                                                var $1820 = $1828;
                                                                                                                break;
                                                                                                        };
                                                                                                        var $1813 = $1820;
                                                                                                        break;
                                                                                                };
                                                                                                var $1805 = $1813;
                                                                                                break;
                                                                                        };
                                                                                        var $1798 = $1805;
                                                                                        break;
                                                                                };
                                                                                var $1790 = $1798;
                                                                                break;
                                                                        };
                                                                        var $1783 = $1790;
                                                                        break;
                                                                };
                                                                var $1775 = $1783;
                                                                break;
                                                        };
                                                        var $1768 = $1775;
                                                        break;
                                                };
                                                var $1761 = $1768;
                                                break;
                                        };
                                        var $1754 = $1761;
                                        break;
                                };
                                var $1746 = $1754;
                                break;
                        };
                        var $1739 = $1746;
                        break;
                };
                var $1731 = $1739;
                break;
        };
        return $1731;
    };
    const Kind$Parser$forrange$u32 = x0 => x1 => Kind$Parser$forrange$u32$(x0, x1);

    function Kind$Parser$forrange$u32$2$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $1841 = self.idx;
                var $1842 = self.code;
                var $1843 = self.err;
                var $1844 = Parser$Reply$error$($1841, $1842, $1843);
                var $1840 = $1844;
                break;
            case 'Parser.Reply.value':
                var $1845 = self.idx;
                var $1846 = self.code;
                var $1847 = self.val;
                var self = Kind$Parser$text$("for ", $1845, $1846);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $1849 = self.idx;
                        var $1850 = self.code;
                        var $1851 = self.err;
                        var $1852 = Parser$Reply$error$($1849, $1850, $1851);
                        var $1848 = $1852;
                        break;
                    case 'Parser.Reply.value':
                        var $1853 = self.idx;
                        var $1854 = self.code;
                        var self = Kind$Parser$name1$($1853, $1854);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $1856 = self.idx;
                                var $1857 = self.code;
                                var $1858 = self.err;
                                var $1859 = Parser$Reply$error$($1856, $1857, $1858);
                                var $1855 = $1859;
                                break;
                            case 'Parser.Reply.value':
                                var $1860 = self.idx;
                                var $1861 = self.code;
                                var $1862 = self.val;
                                var self = Kind$Parser$text$(":", $1860, $1861);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $1864 = self.idx;
                                        var $1865 = self.code;
                                        var $1866 = self.err;
                                        var $1867 = Parser$Reply$error$($1864, $1865, $1866);
                                        var $1863 = $1867;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $1868 = self.idx;
                                        var $1869 = self.code;
                                        var self = Kind$Parser$text$("U32", $1868, $1869);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $1871 = self.idx;
                                                var $1872 = self.code;
                                                var $1873 = self.err;
                                                var $1874 = Parser$Reply$error$($1871, $1872, $1873);
                                                var $1870 = $1874;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $1875 = self.idx;
                                                var $1876 = self.code;
                                                var self = Kind$Parser$text$("=", $1875, $1876);
                                                switch (self._) {
                                                    case 'Parser.Reply.error':
                                                        var $1878 = self.idx;
                                                        var $1879 = self.code;
                                                        var $1880 = self.err;
                                                        var $1881 = Parser$Reply$error$($1878, $1879, $1880);
                                                        var $1877 = $1881;
                                                        break;
                                                    case 'Parser.Reply.value':
                                                        var $1882 = self.idx;
                                                        var $1883 = self.code;
                                                        var self = Kind$Parser$term$($1882, $1883);
                                                        switch (self._) {
                                                            case 'Parser.Reply.error':
                                                                var $1885 = self.idx;
                                                                var $1886 = self.code;
                                                                var $1887 = self.err;
                                                                var $1888 = Parser$Reply$error$($1885, $1886, $1887);
                                                                var $1884 = $1888;
                                                                break;
                                                            case 'Parser.Reply.value':
                                                                var $1889 = self.idx;
                                                                var $1890 = self.code;
                                                                var $1891 = self.val;
                                                                var self = Kind$Parser$text$("..", $1889, $1890);
                                                                switch (self._) {
                                                                    case 'Parser.Reply.error':
                                                                        var $1893 = self.idx;
                                                                        var $1894 = self.code;
                                                                        var $1895 = self.err;
                                                                        var $1896 = Parser$Reply$error$($1893, $1894, $1895);
                                                                        var $1892 = $1896;
                                                                        break;
                                                                    case 'Parser.Reply.value':
                                                                        var $1897 = self.idx;
                                                                        var $1898 = self.code;
                                                                        var self = Kind$Parser$term$($1897, $1898);
                                                                        switch (self._) {
                                                                            case 'Parser.Reply.error':
                                                                                var $1900 = self.idx;
                                                                                var $1901 = self.code;
                                                                                var $1902 = self.err;
                                                                                var $1903 = Parser$Reply$error$($1900, $1901, $1902);
                                                                                var $1899 = $1903;
                                                                                break;
                                                                            case 'Parser.Reply.value':
                                                                                var $1904 = self.idx;
                                                                                var $1905 = self.code;
                                                                                var $1906 = self.val;
                                                                                var self = Kind$Parser$text$(":", $1904, $1905);
                                                                                switch (self._) {
                                                                                    case 'Parser.Reply.error':
                                                                                        var $1908 = self.idx;
                                                                                        var $1909 = self.code;
                                                                                        var $1910 = self.err;
                                                                                        var $1911 = Parser$Reply$error$($1908, $1909, $1910);
                                                                                        var $1907 = $1911;
                                                                                        break;
                                                                                    case 'Parser.Reply.value':
                                                                                        var $1912 = self.idx;
                                                                                        var $1913 = self.code;
                                                                                        var self = Kind$Parser$name1$($1912, $1913);
                                                                                        switch (self._) {
                                                                                            case 'Parser.Reply.error':
                                                                                                var $1915 = self.idx;
                                                                                                var $1916 = self.code;
                                                                                                var $1917 = self.err;
                                                                                                var $1918 = Parser$Reply$error$($1915, $1916, $1917);
                                                                                                var $1914 = $1918;
                                                                                                break;
                                                                                            case 'Parser.Reply.value':
                                                                                                var $1919 = self.idx;
                                                                                                var $1920 = self.code;
                                                                                                var $1921 = self.val;
                                                                                                var self = Kind$Parser$text$("=", $1919, $1920);
                                                                                                switch (self._) {
                                                                                                    case 'Parser.Reply.error':
                                                                                                        var $1923 = self.idx;
                                                                                                        var $1924 = self.code;
                                                                                                        var $1925 = self.err;
                                                                                                        var $1926 = Parser$Reply$error$($1923, $1924, $1925);
                                                                                                        var $1922 = $1926;
                                                                                                        break;
                                                                                                    case 'Parser.Reply.value':
                                                                                                        var $1927 = self.idx;
                                                                                                        var $1928 = self.code;
                                                                                                        var self = Kind$Parser$term$($1927, $1928);
                                                                                                        switch (self._) {
                                                                                                            case 'Parser.Reply.error':
                                                                                                                var $1930 = self.idx;
                                                                                                                var $1931 = self.code;
                                                                                                                var $1932 = self.err;
                                                                                                                var $1933 = Parser$Reply$error$($1930, $1931, $1932);
                                                                                                                var $1929 = $1933;
                                                                                                                break;
                                                                                                            case 'Parser.Reply.value':
                                                                                                                var $1934 = self.idx;
                                                                                                                var $1935 = self.code;
                                                                                                                var $1936 = self.val;
                                                                                                                var self = Parser$maybe$(Kind$Parser$text(";"), $1934, $1935);
                                                                                                                switch (self._) {
                                                                                                                    case 'Parser.Reply.error':
                                                                                                                        var $1938 = self.idx;
                                                                                                                        var $1939 = self.code;
                                                                                                                        var $1940 = self.err;
                                                                                                                        var $1941 = Parser$Reply$error$($1938, $1939, $1940);
                                                                                                                        var $1937 = $1941;
                                                                                                                        break;
                                                                                                                    case 'Parser.Reply.value':
                                                                                                                        var $1942 = self.idx;
                                                                                                                        var $1943 = self.code;
                                                                                                                        var self = Kind$Parser$term$($1942, $1943);
                                                                                                                        switch (self._) {
                                                                                                                            case 'Parser.Reply.error':
                                                                                                                                var $1945 = self.idx;
                                                                                                                                var $1946 = self.code;
                                                                                                                                var $1947 = self.err;
                                                                                                                                var $1948 = Parser$Reply$error$($1945, $1946, $1947);
                                                                                                                                var $1944 = $1948;
                                                                                                                                break;
                                                                                                                            case 'Parser.Reply.value':
                                                                                                                                var $1949 = self.idx;
                                                                                                                                var $1950 = self.code;
                                                                                                                                var $1951 = self.val;
                                                                                                                                var self = Kind$Parser$stop$($1847, $1949, $1950);
                                                                                                                                switch (self._) {
                                                                                                                                    case 'Parser.Reply.error':
                                                                                                                                        var $1953 = self.idx;
                                                                                                                                        var $1954 = self.code;
                                                                                                                                        var $1955 = self.err;
                                                                                                                                        var $1956 = Parser$Reply$error$($1953, $1954, $1955);
                                                                                                                                        var $1952 = $1956;
                                                                                                                                        break;
                                                                                                                                    case 'Parser.Reply.value':
                                                                                                                                        var $1957 = self.idx;
                                                                                                                                        var $1958 = self.code;
                                                                                                                                        var $1959 = self.val;
                                                                                                                                        var _term$51 = Kind$Term$ref$("U32.for");
                                                                                                                                        var _term$52 = Kind$Term$app$(_term$51, Kind$Term$hol$(Bits$e));
                                                                                                                                        var _term$53 = Kind$Term$app$(_term$52, Kind$Term$ref$($1921));
                                                                                                                                        var _term$54 = Kind$Term$app$(_term$53, $1891);
                                                                                                                                        var _term$55 = Kind$Term$app$(_term$54, $1906);
                                                                                                                                        var _lamb$56 = Kind$Term$lam$($1862, (_e$56 => {
                                                                                                                                            var $1961 = Kind$Term$lam$($1921, (_s$57 => {
                                                                                                                                                var $1962 = $1936;
                                                                                                                                                return $1962;
                                                                                                                                            }));
                                                                                                                                            return $1961;
                                                                                                                                        }));
                                                                                                                                        var _term$57 = Kind$Term$app$(_term$55, _lamb$56);
                                                                                                                                        var _term$58 = Kind$Term$let$($1921, _term$57, (_x$58 => {
                                                                                                                                            var $1963 = $1951;
                                                                                                                                            return $1963;
                                                                                                                                        }));
                                                                                                                                        var $1960 = Parser$Reply$value$($1957, $1958, Kind$Term$ori$($1959, _term$58));
                                                                                                                                        var $1952 = $1960;
                                                                                                                                        break;
                                                                                                                                };
                                                                                                                                var $1944 = $1952;
                                                                                                                                break;
                                                                                                                        };
                                                                                                                        var $1937 = $1944;
                                                                                                                        break;
                                                                                                                };
                                                                                                                var $1929 = $1937;
                                                                                                                break;
                                                                                                        };
                                                                                                        var $1922 = $1929;
                                                                                                        break;
                                                                                                };
                                                                                                var $1914 = $1922;
                                                                                                break;
                                                                                        };
                                                                                        var $1907 = $1914;
                                                                                        break;
                                                                                };
                                                                                var $1899 = $1907;
                                                                                break;
                                                                        };
                                                                        var $1892 = $1899;
                                                                        break;
                                                                };
                                                                var $1884 = $1892;
                                                                break;
                                                        };
                                                        var $1877 = $1884;
                                                        break;
                                                };
                                                var $1870 = $1877;
                                                break;
                                        };
                                        var $1863 = $1870;
                                        break;
                                };
                                var $1855 = $1863;
                                break;
                        };
                        var $1848 = $1855;
                        break;
                };
                var $1840 = $1848;
                break;
        };
        return $1840;
    };
    const Kind$Parser$forrange$u32$2 = x0 => x1 => Kind$Parser$forrange$u32$2$(x0, x1);

    function Kind$Parser$forin$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $1965 = self.idx;
                var $1966 = self.code;
                var $1967 = self.err;
                var $1968 = Parser$Reply$error$($1965, $1966, $1967);
                var $1964 = $1968;
                break;
            case 'Parser.Reply.value':
                var $1969 = self.idx;
                var $1970 = self.code;
                var $1971 = self.val;
                var self = Kind$Parser$text$("for ", $1969, $1970);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $1973 = self.idx;
                        var $1974 = self.code;
                        var $1975 = self.err;
                        var $1976 = Parser$Reply$error$($1973, $1974, $1975);
                        var $1972 = $1976;
                        break;
                    case 'Parser.Reply.value':
                        var $1977 = self.idx;
                        var $1978 = self.code;
                        var self = Kind$Parser$name1$($1977, $1978);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $1980 = self.idx;
                                var $1981 = self.code;
                                var $1982 = self.err;
                                var $1983 = Parser$Reply$error$($1980, $1981, $1982);
                                var $1979 = $1983;
                                break;
                            case 'Parser.Reply.value':
                                var $1984 = self.idx;
                                var $1985 = self.code;
                                var $1986 = self.val;
                                var self = Kind$Parser$text$("in", $1984, $1985);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $1988 = self.idx;
                                        var $1989 = self.code;
                                        var $1990 = self.err;
                                        var $1991 = Parser$Reply$error$($1988, $1989, $1990);
                                        var $1987 = $1991;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $1992 = self.idx;
                                        var $1993 = self.code;
                                        var self = Kind$Parser$term$($1992, $1993);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $1995 = self.idx;
                                                var $1996 = self.code;
                                                var $1997 = self.err;
                                                var $1998 = Parser$Reply$error$($1995, $1996, $1997);
                                                var $1994 = $1998;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $1999 = self.idx;
                                                var $2000 = self.code;
                                                var $2001 = self.val;
                                                var self = Kind$Parser$text$("with", $1999, $2000);
                                                switch (self._) {
                                                    case 'Parser.Reply.error':
                                                        var $2003 = self.idx;
                                                        var $2004 = self.code;
                                                        var $2005 = self.err;
                                                        var $2006 = Parser$Reply$error$($2003, $2004, $2005);
                                                        var $2002 = $2006;
                                                        break;
                                                    case 'Parser.Reply.value':
                                                        var $2007 = self.idx;
                                                        var $2008 = self.code;
                                                        var self = Kind$Parser$name1$($2007, $2008);
                                                        switch (self._) {
                                                            case 'Parser.Reply.error':
                                                                var $2010 = self.idx;
                                                                var $2011 = self.code;
                                                                var $2012 = self.err;
                                                                var $2013 = Parser$Reply$error$($2010, $2011, $2012);
                                                                var $2009 = $2013;
                                                                break;
                                                            case 'Parser.Reply.value':
                                                                var $2014 = self.idx;
                                                                var $2015 = self.code;
                                                                var $2016 = self.val;
                                                                var self = Kind$Parser$text$(":", $2014, $2015);
                                                                switch (self._) {
                                                                    case 'Parser.Reply.error':
                                                                        var $2018 = self.idx;
                                                                        var $2019 = self.code;
                                                                        var $2020 = self.err;
                                                                        var $2021 = Parser$Reply$error$($2018, $2019, $2020);
                                                                        var $2017 = $2021;
                                                                        break;
                                                                    case 'Parser.Reply.value':
                                                                        var $2022 = self.idx;
                                                                        var $2023 = self.code;
                                                                        var self = Kind$Parser$term$($2022, $2023);
                                                                        switch (self._) {
                                                                            case 'Parser.Reply.error':
                                                                                var $2025 = self.idx;
                                                                                var $2026 = self.code;
                                                                                var $2027 = self.err;
                                                                                var $2028 = Parser$Reply$error$($2025, $2026, $2027);
                                                                                var $2024 = $2028;
                                                                                break;
                                                                            case 'Parser.Reply.value':
                                                                                var $2029 = self.idx;
                                                                                var $2030 = self.code;
                                                                                var $2031 = self.val;
                                                                                var self = Kind$Parser$stop$($1971, $2029, $2030);
                                                                                switch (self._) {
                                                                                    case 'Parser.Reply.error':
                                                                                        var $2033 = self.idx;
                                                                                        var $2034 = self.code;
                                                                                        var $2035 = self.err;
                                                                                        var $2036 = Parser$Reply$error$($2033, $2034, $2035);
                                                                                        var $2032 = $2036;
                                                                                        break;
                                                                                    case 'Parser.Reply.value':
                                                                                        var $2037 = self.idx;
                                                                                        var $2038 = self.code;
                                                                                        var $2039 = self.val;
                                                                                        var _term$33 = Kind$Term$ref$("List.for");
                                                                                        var _term$34 = Kind$Term$app$(_term$33, Kind$Term$hol$(Bits$e));
                                                                                        var _term$35 = Kind$Term$app$(_term$34, $2001);
                                                                                        var _term$36 = Kind$Term$app$(_term$35, Kind$Term$hol$(Bits$e));
                                                                                        var _term$37 = Kind$Term$app$(_term$36, Kind$Term$ref$($2016));
                                                                                        var _lamb$38 = Kind$Term$lam$($1986, (_i$38 => {
                                                                                            var $2041 = Kind$Term$lam$($2016, (_x$39 => {
                                                                                                var $2042 = $2031;
                                                                                                return $2042;
                                                                                            }));
                                                                                            return $2041;
                                                                                        }));
                                                                                        var _term$39 = Kind$Term$app$(_term$37, _lamb$38);
                                                                                        var _term$40 = Kind$Term$let$($2016, _term$39, (_x$40 => {
                                                                                            var $2043 = Kind$Term$ref$($2016);
                                                                                            return $2043;
                                                                                        }));
                                                                                        var $2040 = Parser$Reply$value$($2037, $2038, Kind$Term$ori$($2039, _term$40));
                                                                                        var $2032 = $2040;
                                                                                        break;
                                                                                };
                                                                                var $2024 = $2032;
                                                                                break;
                                                                        };
                                                                        var $2017 = $2024;
                                                                        break;
                                                                };
                                                                var $2009 = $2017;
                                                                break;
                                                        };
                                                        var $2002 = $2009;
                                                        break;
                                                };
                                                var $1994 = $2002;
                                                break;
                                        };
                                        var $1987 = $1994;
                                        break;
                                };
                                var $1979 = $1987;
                                break;
                        };
                        var $1972 = $1979;
                        break;
                };
                var $1964 = $1972;
                break;
        };
        return $1964;
    };
    const Kind$Parser$forin = x0 => x1 => Kind$Parser$forin$(x0, x1);

    function Kind$Parser$forin$2$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $2045 = self.idx;
                var $2046 = self.code;
                var $2047 = self.err;
                var $2048 = Parser$Reply$error$($2045, $2046, $2047);
                var $2044 = $2048;
                break;
            case 'Parser.Reply.value':
                var $2049 = self.idx;
                var $2050 = self.code;
                var $2051 = self.val;
                var self = Kind$Parser$text$("for ", $2049, $2050);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $2053 = self.idx;
                        var $2054 = self.code;
                        var $2055 = self.err;
                        var $2056 = Parser$Reply$error$($2053, $2054, $2055);
                        var $2052 = $2056;
                        break;
                    case 'Parser.Reply.value':
                        var $2057 = self.idx;
                        var $2058 = self.code;
                        var self = Kind$Parser$name1$($2057, $2058);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $2060 = self.idx;
                                var $2061 = self.code;
                                var $2062 = self.err;
                                var $2063 = Parser$Reply$error$($2060, $2061, $2062);
                                var $2059 = $2063;
                                break;
                            case 'Parser.Reply.value':
                                var $2064 = self.idx;
                                var $2065 = self.code;
                                var $2066 = self.val;
                                var self = Kind$Parser$text$("in", $2064, $2065);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $2068 = self.idx;
                                        var $2069 = self.code;
                                        var $2070 = self.err;
                                        var $2071 = Parser$Reply$error$($2068, $2069, $2070);
                                        var $2067 = $2071;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $2072 = self.idx;
                                        var $2073 = self.code;
                                        var self = Kind$Parser$term$($2072, $2073);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $2075 = self.idx;
                                                var $2076 = self.code;
                                                var $2077 = self.err;
                                                var $2078 = Parser$Reply$error$($2075, $2076, $2077);
                                                var $2074 = $2078;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $2079 = self.idx;
                                                var $2080 = self.code;
                                                var $2081 = self.val;
                                                var self = Kind$Parser$text$(":", $2079, $2080);
                                                switch (self._) {
                                                    case 'Parser.Reply.error':
                                                        var $2083 = self.idx;
                                                        var $2084 = self.code;
                                                        var $2085 = self.err;
                                                        var $2086 = Parser$Reply$error$($2083, $2084, $2085);
                                                        var $2082 = $2086;
                                                        break;
                                                    case 'Parser.Reply.value':
                                                        var $2087 = self.idx;
                                                        var $2088 = self.code;
                                                        var self = Kind$Parser$name1$($2087, $2088);
                                                        switch (self._) {
                                                            case 'Parser.Reply.error':
                                                                var $2090 = self.idx;
                                                                var $2091 = self.code;
                                                                var $2092 = self.err;
                                                                var $2093 = Parser$Reply$error$($2090, $2091, $2092);
                                                                var $2089 = $2093;
                                                                break;
                                                            case 'Parser.Reply.value':
                                                                var $2094 = self.idx;
                                                                var $2095 = self.code;
                                                                var $2096 = self.val;
                                                                var self = Kind$Parser$text$("=", $2094, $2095);
                                                                switch (self._) {
                                                                    case 'Parser.Reply.error':
                                                                        var $2098 = self.idx;
                                                                        var $2099 = self.code;
                                                                        var $2100 = self.err;
                                                                        var $2101 = Parser$Reply$error$($2098, $2099, $2100);
                                                                        var $2097 = $2101;
                                                                        break;
                                                                    case 'Parser.Reply.value':
                                                                        var $2102 = self.idx;
                                                                        var $2103 = self.code;
                                                                        var self = Kind$Parser$term$($2102, $2103);
                                                                        switch (self._) {
                                                                            case 'Parser.Reply.error':
                                                                                var $2105 = self.idx;
                                                                                var $2106 = self.code;
                                                                                var $2107 = self.err;
                                                                                var $2108 = Parser$Reply$error$($2105, $2106, $2107);
                                                                                var $2104 = $2108;
                                                                                break;
                                                                            case 'Parser.Reply.value':
                                                                                var $2109 = self.idx;
                                                                                var $2110 = self.code;
                                                                                var $2111 = self.val;
                                                                                var self = Parser$maybe$(Kind$Parser$text(";"), $2109, $2110);
                                                                                switch (self._) {
                                                                                    case 'Parser.Reply.error':
                                                                                        var $2113 = self.idx;
                                                                                        var $2114 = self.code;
                                                                                        var $2115 = self.err;
                                                                                        var $2116 = Parser$Reply$error$($2113, $2114, $2115);
                                                                                        var $2112 = $2116;
                                                                                        break;
                                                                                    case 'Parser.Reply.value':
                                                                                        var $2117 = self.idx;
                                                                                        var $2118 = self.code;
                                                                                        var self = Kind$Parser$term$($2117, $2118);
                                                                                        switch (self._) {
                                                                                            case 'Parser.Reply.error':
                                                                                                var $2120 = self.idx;
                                                                                                var $2121 = self.code;
                                                                                                var $2122 = self.err;
                                                                                                var $2123 = Parser$Reply$error$($2120, $2121, $2122);
                                                                                                var $2119 = $2123;
                                                                                                break;
                                                                                            case 'Parser.Reply.value':
                                                                                                var $2124 = self.idx;
                                                                                                var $2125 = self.code;
                                                                                                var $2126 = self.val;
                                                                                                var self = Kind$Parser$stop$($2051, $2124, $2125);
                                                                                                switch (self._) {
                                                                                                    case 'Parser.Reply.error':
                                                                                                        var $2128 = self.idx;
                                                                                                        var $2129 = self.code;
                                                                                                        var $2130 = self.err;
                                                                                                        var $2131 = Parser$Reply$error$($2128, $2129, $2130);
                                                                                                        var $2127 = $2131;
                                                                                                        break;
                                                                                                    case 'Parser.Reply.value':
                                                                                                        var $2132 = self.idx;
                                                                                                        var $2133 = self.code;
                                                                                                        var $2134 = self.val;
                                                                                                        var _term$39 = Kind$Term$ref$("List.for");
                                                                                                        var _term$40 = Kind$Term$app$(_term$39, Kind$Term$hol$(Bits$e));
                                                                                                        var _term$41 = Kind$Term$app$(_term$40, $2081);
                                                                                                        var _term$42 = Kind$Term$app$(_term$41, Kind$Term$hol$(Bits$e));
                                                                                                        var _term$43 = Kind$Term$app$(_term$42, Kind$Term$ref$($2096));
                                                                                                        var _lamb$44 = Kind$Term$lam$($2066, (_i$44 => {
                                                                                                            var $2136 = Kind$Term$lam$($2096, (_x$45 => {
                                                                                                                var $2137 = $2111;
                                                                                                                return $2137;
                                                                                                            }));
                                                                                                            return $2136;
                                                                                                        }));
                                                                                                        var _term$45 = Kind$Term$app$(_term$43, _lamb$44);
                                                                                                        var _term$46 = Kind$Term$let$($2096, _term$45, (_x$46 => {
                                                                                                            var $2138 = $2126;
                                                                                                            return $2138;
                                                                                                        }));
                                                                                                        var $2135 = Parser$Reply$value$($2132, $2133, Kind$Term$ori$($2134, _term$46));
                                                                                                        var $2127 = $2135;
                                                                                                        break;
                                                                                                };
                                                                                                var $2119 = $2127;
                                                                                                break;
                                                                                        };
                                                                                        var $2112 = $2119;
                                                                                        break;
                                                                                };
                                                                                var $2104 = $2112;
                                                                                break;
                                                                        };
                                                                        var $2097 = $2104;
                                                                        break;
                                                                };
                                                                var $2089 = $2097;
                                                                break;
                                                        };
                                                        var $2082 = $2089;
                                                        break;
                                                };
                                                var $2074 = $2082;
                                                break;
                                        };
                                        var $2067 = $2074;
                                        break;
                                };
                                var $2059 = $2067;
                                break;
                        };
                        var $2052 = $2059;
                        break;
                };
                var $2044 = $2052;
                break;
        };
        return $2044;
    };
    const Kind$Parser$forin$2 = x0 => x1 => Kind$Parser$forin$2$(x0, x1);

    function Kind$Parser$do$statements$(_monad_name$1) {
        var $2139 = Parser$first_of$(List$cons$((_idx$2 => _code$3 => {
            var self = Kind$Parser$init$(_idx$2, _code$3);
            switch (self._) {
                case 'Parser.Reply.error':
                    var $2141 = self.idx;
                    var $2142 = self.code;
                    var $2143 = self.err;
                    var $2144 = Parser$Reply$error$($2141, $2142, $2143);
                    var $2140 = $2144;
                    break;
                case 'Parser.Reply.value':
                    var $2145 = self.idx;
                    var $2146 = self.code;
                    var $2147 = self.val;
                    var self = Kind$Parser$text$("var ", $2145, $2146);
                    switch (self._) {
                        case 'Parser.Reply.error':
                            var $2149 = self.idx;
                            var $2150 = self.code;
                            var $2151 = self.err;
                            var $2152 = Parser$Reply$error$($2149, $2150, $2151);
                            var $2148 = $2152;
                            break;
                        case 'Parser.Reply.value':
                            var $2153 = self.idx;
                            var $2154 = self.code;
                            var self = Kind$Parser$name1$($2153, $2154);
                            switch (self._) {
                                case 'Parser.Reply.error':
                                    var $2156 = self.idx;
                                    var $2157 = self.code;
                                    var $2158 = self.err;
                                    var $2159 = Parser$Reply$error$($2156, $2157, $2158);
                                    var $2155 = $2159;
                                    break;
                                case 'Parser.Reply.value':
                                    var $2160 = self.idx;
                                    var $2161 = self.code;
                                    var $2162 = self.val;
                                    var self = Kind$Parser$text$("=", $2160, $2161);
                                    switch (self._) {
                                        case 'Parser.Reply.error':
                                            var $2164 = self.idx;
                                            var $2165 = self.code;
                                            var $2166 = self.err;
                                            var $2167 = Parser$Reply$error$($2164, $2165, $2166);
                                            var $2163 = $2167;
                                            break;
                                        case 'Parser.Reply.value':
                                            var $2168 = self.idx;
                                            var $2169 = self.code;
                                            var self = Kind$Parser$term$($2168, $2169);
                                            switch (self._) {
                                                case 'Parser.Reply.error':
                                                    var $2171 = self.idx;
                                                    var $2172 = self.code;
                                                    var $2173 = self.err;
                                                    var $2174 = Parser$Reply$error$($2171, $2172, $2173);
                                                    var $2170 = $2174;
                                                    break;
                                                case 'Parser.Reply.value':
                                                    var $2175 = self.idx;
                                                    var $2176 = self.code;
                                                    var $2177 = self.val;
                                                    var self = Parser$maybe$(Kind$Parser$text(";"), $2175, $2176);
                                                    switch (self._) {
                                                        case 'Parser.Reply.error':
                                                            var $2179 = self.idx;
                                                            var $2180 = self.code;
                                                            var $2181 = self.err;
                                                            var $2182 = Parser$Reply$error$($2179, $2180, $2181);
                                                            var $2178 = $2182;
                                                            break;
                                                        case 'Parser.Reply.value':
                                                            var $2183 = self.idx;
                                                            var $2184 = self.code;
                                                            var self = Kind$Parser$do$statements$(_monad_name$1)($2183)($2184);
                                                            switch (self._) {
                                                                case 'Parser.Reply.error':
                                                                    var $2186 = self.idx;
                                                                    var $2187 = self.code;
                                                                    var $2188 = self.err;
                                                                    var $2189 = Parser$Reply$error$($2186, $2187, $2188);
                                                                    var $2185 = $2189;
                                                                    break;
                                                                case 'Parser.Reply.value':
                                                                    var $2190 = self.idx;
                                                                    var $2191 = self.code;
                                                                    var $2192 = self.val;
                                                                    var self = Kind$Parser$stop$($2147, $2190, $2191);
                                                                    switch (self._) {
                                                                        case 'Parser.Reply.error':
                                                                            var $2194 = self.idx;
                                                                            var $2195 = self.code;
                                                                            var $2196 = self.err;
                                                                            var $2197 = Parser$Reply$error$($2194, $2195, $2196);
                                                                            var $2193 = $2197;
                                                                            break;
                                                                        case 'Parser.Reply.value':
                                                                            var $2198 = self.idx;
                                                                            var $2199 = self.code;
                                                                            var $2200 = self.val;
                                                                            var _term$28 = Kind$Term$app$(Kind$Term$ref$("Monad.bind"), Kind$Term$ref$(_monad_name$1));
                                                                            var _term$29 = Kind$Term$app$(_term$28, Kind$Term$ref$((_monad_name$1 + ".monad")));
                                                                            var _term$30 = Kind$Term$app$(_term$29, Kind$Term$hol$(Bits$e));
                                                                            var _term$31 = Kind$Term$app$(_term$30, Kind$Term$hol$(Bits$e));
                                                                            var _term$32 = Kind$Term$app$(_term$31, $2177);
                                                                            var _term$33 = Kind$Term$app$(_term$32, Kind$Term$lam$($2162, (_x$33 => {
                                                                                var $2202 = $2192;
                                                                                return $2202;
                                                                            })));
                                                                            var $2201 = Parser$Reply$value$($2198, $2199, Kind$Term$ori$($2200, _term$33));
                                                                            var $2193 = $2201;
                                                                            break;
                                                                    };
                                                                    var $2185 = $2193;
                                                                    break;
                                                            };
                                                            var $2178 = $2185;
                                                            break;
                                                    };
                                                    var $2170 = $2178;
                                                    break;
                                            };
                                            var $2163 = $2170;
                                            break;
                                    };
                                    var $2155 = $2163;
                                    break;
                            };
                            var $2148 = $2155;
                            break;
                    };
                    var $2140 = $2148;
                    break;
            };
            return $2140;
        }), List$cons$((_idx$2 => _code$3 => {
            var self = Kind$Parser$init$(_idx$2, _code$3);
            switch (self._) {
                case 'Parser.Reply.error':
                    var $2204 = self.idx;
                    var $2205 = self.code;
                    var $2206 = self.err;
                    var $2207 = Parser$Reply$error$($2204, $2205, $2206);
                    var $2203 = $2207;
                    break;
                case 'Parser.Reply.value':
                    var $2208 = self.idx;
                    var $2209 = self.code;
                    var $2210 = self.val;
                    var self = Kind$Parser$text$("let ", $2208, $2209);
                    switch (self._) {
                        case 'Parser.Reply.error':
                            var $2212 = self.idx;
                            var $2213 = self.code;
                            var $2214 = self.err;
                            var $2215 = Parser$Reply$error$($2212, $2213, $2214);
                            var $2211 = $2215;
                            break;
                        case 'Parser.Reply.value':
                            var $2216 = self.idx;
                            var $2217 = self.code;
                            var self = Kind$Parser$name1$($2216, $2217);
                            switch (self._) {
                                case 'Parser.Reply.error':
                                    var $2219 = self.idx;
                                    var $2220 = self.code;
                                    var $2221 = self.err;
                                    var $2222 = Parser$Reply$error$($2219, $2220, $2221);
                                    var $2218 = $2222;
                                    break;
                                case 'Parser.Reply.value':
                                    var $2223 = self.idx;
                                    var $2224 = self.code;
                                    var $2225 = self.val;
                                    var self = Kind$Parser$text$("=", $2223, $2224);
                                    switch (self._) {
                                        case 'Parser.Reply.error':
                                            var $2227 = self.idx;
                                            var $2228 = self.code;
                                            var $2229 = self.err;
                                            var $2230 = Parser$Reply$error$($2227, $2228, $2229);
                                            var $2226 = $2230;
                                            break;
                                        case 'Parser.Reply.value':
                                            var $2231 = self.idx;
                                            var $2232 = self.code;
                                            var self = Kind$Parser$term$($2231, $2232);
                                            switch (self._) {
                                                case 'Parser.Reply.error':
                                                    var $2234 = self.idx;
                                                    var $2235 = self.code;
                                                    var $2236 = self.err;
                                                    var $2237 = Parser$Reply$error$($2234, $2235, $2236);
                                                    var $2233 = $2237;
                                                    break;
                                                case 'Parser.Reply.value':
                                                    var $2238 = self.idx;
                                                    var $2239 = self.code;
                                                    var $2240 = self.val;
                                                    var self = Parser$maybe$(Kind$Parser$text(";"), $2238, $2239);
                                                    switch (self._) {
                                                        case 'Parser.Reply.error':
                                                            var $2242 = self.idx;
                                                            var $2243 = self.code;
                                                            var $2244 = self.err;
                                                            var $2245 = Parser$Reply$error$($2242, $2243, $2244);
                                                            var $2241 = $2245;
                                                            break;
                                                        case 'Parser.Reply.value':
                                                            var $2246 = self.idx;
                                                            var $2247 = self.code;
                                                            var self = Kind$Parser$do$statements$(_monad_name$1)($2246)($2247);
                                                            switch (self._) {
                                                                case 'Parser.Reply.error':
                                                                    var $2249 = self.idx;
                                                                    var $2250 = self.code;
                                                                    var $2251 = self.err;
                                                                    var $2252 = Parser$Reply$error$($2249, $2250, $2251);
                                                                    var $2248 = $2252;
                                                                    break;
                                                                case 'Parser.Reply.value':
                                                                    var $2253 = self.idx;
                                                                    var $2254 = self.code;
                                                                    var $2255 = self.val;
                                                                    var self = Kind$Parser$stop$($2210, $2253, $2254);
                                                                    switch (self._) {
                                                                        case 'Parser.Reply.error':
                                                                            var $2257 = self.idx;
                                                                            var $2258 = self.code;
                                                                            var $2259 = self.err;
                                                                            var $2260 = Parser$Reply$error$($2257, $2258, $2259);
                                                                            var $2256 = $2260;
                                                                            break;
                                                                        case 'Parser.Reply.value':
                                                                            var $2261 = self.idx;
                                                                            var $2262 = self.code;
                                                                            var $2263 = self.val;
                                                                            var $2264 = Parser$Reply$value$($2261, $2262, Kind$Term$ori$($2263, Kind$Term$let$($2225, $2240, (_x$28 => {
                                                                                var $2265 = $2255;
                                                                                return $2265;
                                                                            }))));
                                                                            var $2256 = $2264;
                                                                            break;
                                                                    };
                                                                    var $2248 = $2256;
                                                                    break;
                                                            };
                                                            var $2241 = $2248;
                                                            break;
                                                    };
                                                    var $2233 = $2241;
                                                    break;
                                            };
                                            var $2226 = $2233;
                                            break;
                                    };
                                    var $2218 = $2226;
                                    break;
                            };
                            var $2211 = $2218;
                            break;
                    };
                    var $2203 = $2211;
                    break;
            };
            return $2203;
        }), List$cons$((_idx$2 => _code$3 => {
            var self = Kind$Parser$init$(_idx$2, _code$3);
            switch (self._) {
                case 'Parser.Reply.error':
                    var $2267 = self.idx;
                    var $2268 = self.code;
                    var $2269 = self.err;
                    var $2270 = Parser$Reply$error$($2267, $2268, $2269);
                    var $2266 = $2270;
                    break;
                case 'Parser.Reply.value':
                    var $2271 = self.idx;
                    var $2272 = self.code;
                    var $2273 = self.val;
                    var self = Kind$Parser$text$("return ", $2271, $2272);
                    switch (self._) {
                        case 'Parser.Reply.error':
                            var $2275 = self.idx;
                            var $2276 = self.code;
                            var $2277 = self.err;
                            var $2278 = Parser$Reply$error$($2275, $2276, $2277);
                            var $2274 = $2278;
                            break;
                        case 'Parser.Reply.value':
                            var $2279 = self.idx;
                            var $2280 = self.code;
                            var self = Kind$Parser$term$($2279, $2280);
                            switch (self._) {
                                case 'Parser.Reply.error':
                                    var $2282 = self.idx;
                                    var $2283 = self.code;
                                    var $2284 = self.err;
                                    var $2285 = Parser$Reply$error$($2282, $2283, $2284);
                                    var $2281 = $2285;
                                    break;
                                case 'Parser.Reply.value':
                                    var $2286 = self.idx;
                                    var $2287 = self.code;
                                    var $2288 = self.val;
                                    var self = Parser$maybe$(Kind$Parser$text(";"), $2286, $2287);
                                    switch (self._) {
                                        case 'Parser.Reply.error':
                                            var $2290 = self.idx;
                                            var $2291 = self.code;
                                            var $2292 = self.err;
                                            var $2293 = Parser$Reply$error$($2290, $2291, $2292);
                                            var $2289 = $2293;
                                            break;
                                        case 'Parser.Reply.value':
                                            var $2294 = self.idx;
                                            var $2295 = self.code;
                                            var self = Kind$Parser$stop$($2273, $2294, $2295);
                                            switch (self._) {
                                                case 'Parser.Reply.error':
                                                    var $2297 = self.idx;
                                                    var $2298 = self.code;
                                                    var $2299 = self.err;
                                                    var $2300 = Parser$Reply$error$($2297, $2298, $2299);
                                                    var $2296 = $2300;
                                                    break;
                                                case 'Parser.Reply.value':
                                                    var $2301 = self.idx;
                                                    var $2302 = self.code;
                                                    var $2303 = self.val;
                                                    var _term$19 = Kind$Term$app$(Kind$Term$ref$("Monad.pure"), Kind$Term$ref$(_monad_name$1));
                                                    var _term$20 = Kind$Term$app$(_term$19, Kind$Term$ref$((_monad_name$1 + ".monad")));
                                                    var _term$21 = Kind$Term$app$(_term$20, Kind$Term$hol$(Bits$e));
                                                    var _term$22 = Kind$Term$app$(_term$21, $2288);
                                                    var $2304 = Parser$Reply$value$($2301, $2302, Kind$Term$ori$($2303, _term$22));
                                                    var $2296 = $2304;
                                                    break;
                                            };
                                            var $2289 = $2296;
                                            break;
                                    };
                                    var $2281 = $2289;
                                    break;
                            };
                            var $2274 = $2281;
                            break;
                    };
                    var $2266 = $2274;
                    break;
            };
            return $2266;
        }), List$cons$((_idx$2 => _code$3 => {
            var self = Kind$Parser$init$(_idx$2, _code$3);
            switch (self._) {
                case 'Parser.Reply.error':
                    var $2306 = self.idx;
                    var $2307 = self.code;
                    var $2308 = self.err;
                    var $2309 = Parser$Reply$error$($2306, $2307, $2308);
                    var $2305 = $2309;
                    break;
                case 'Parser.Reply.value':
                    var $2310 = self.idx;
                    var $2311 = self.code;
                    var $2312 = self.val;
                    var self = Kind$Parser$term$($2310, $2311);
                    switch (self._) {
                        case 'Parser.Reply.error':
                            var $2314 = self.idx;
                            var $2315 = self.code;
                            var $2316 = self.err;
                            var $2317 = Parser$Reply$error$($2314, $2315, $2316);
                            var $2313 = $2317;
                            break;
                        case 'Parser.Reply.value':
                            var $2318 = self.idx;
                            var $2319 = self.code;
                            var $2320 = self.val;
                            var self = Parser$maybe$(Kind$Parser$text(";"), $2318, $2319);
                            switch (self._) {
                                case 'Parser.Reply.error':
                                    var $2322 = self.idx;
                                    var $2323 = self.code;
                                    var $2324 = self.err;
                                    var $2325 = Parser$Reply$error$($2322, $2323, $2324);
                                    var $2321 = $2325;
                                    break;
                                case 'Parser.Reply.value':
                                    var $2326 = self.idx;
                                    var $2327 = self.code;
                                    var self = Kind$Parser$do$statements$(_monad_name$1)($2326)($2327);
                                    switch (self._) {
                                        case 'Parser.Reply.error':
                                            var $2329 = self.idx;
                                            var $2330 = self.code;
                                            var $2331 = self.err;
                                            var $2332 = Parser$Reply$error$($2329, $2330, $2331);
                                            var $2328 = $2332;
                                            break;
                                        case 'Parser.Reply.value':
                                            var $2333 = self.idx;
                                            var $2334 = self.code;
                                            var $2335 = self.val;
                                            var self = Kind$Parser$stop$($2312, $2333, $2334);
                                            switch (self._) {
                                                case 'Parser.Reply.error':
                                                    var $2337 = self.idx;
                                                    var $2338 = self.code;
                                                    var $2339 = self.err;
                                                    var $2340 = Parser$Reply$error$($2337, $2338, $2339);
                                                    var $2336 = $2340;
                                                    break;
                                                case 'Parser.Reply.value':
                                                    var $2341 = self.idx;
                                                    var $2342 = self.code;
                                                    var $2343 = self.val;
                                                    var _term$19 = Kind$Term$app$(Kind$Term$ref$("Monad.bind"), Kind$Term$ref$(_monad_name$1));
                                                    var _term$20 = Kind$Term$app$(_term$19, Kind$Term$ref$((_monad_name$1 + ".monad")));
                                                    var _term$21 = Kind$Term$app$(_term$20, Kind$Term$hol$(Bits$e));
                                                    var _term$22 = Kind$Term$app$(_term$21, Kind$Term$hol$(Bits$e));
                                                    var _term$23 = Kind$Term$app$(_term$22, $2320);
                                                    var _term$24 = Kind$Term$app$(_term$23, Kind$Term$lam$("", (_x$24 => {
                                                        var $2345 = $2335;
                                                        return $2345;
                                                    })));
                                                    var $2344 = Parser$Reply$value$($2341, $2342, Kind$Term$ori$($2343, _term$24));
                                                    var $2336 = $2344;
                                                    break;
                                            };
                                            var $2328 = $2336;
                                            break;
                                    };
                                    var $2321 = $2328;
                                    break;
                            };
                            var $2313 = $2321;
                            break;
                    };
                    var $2305 = $2313;
                    break;
            };
            return $2305;
        }), List$cons$((_idx$2 => _code$3 => {
            var self = Kind$Parser$term$(_idx$2, _code$3);
            switch (self._) {
                case 'Parser.Reply.error':
                    var $2347 = self.idx;
                    var $2348 = self.code;
                    var $2349 = self.err;
                    var $2350 = Parser$Reply$error$($2347, $2348, $2349);
                    var $2346 = $2350;
                    break;
                case 'Parser.Reply.value':
                    var $2351 = self.idx;
                    var $2352 = self.code;
                    var $2353 = self.val;
                    var self = Parser$maybe$(Kind$Parser$text(";"), $2351, $2352);
                    switch (self._) {
                        case 'Parser.Reply.error':
                            var $2355 = self.idx;
                            var $2356 = self.code;
                            var $2357 = self.err;
                            var $2358 = Parser$Reply$error$($2355, $2356, $2357);
                            var $2354 = $2358;
                            break;
                        case 'Parser.Reply.value':
                            var $2359 = self.idx;
                            var $2360 = self.code;
                            var $2361 = Parser$Reply$value$($2359, $2360, $2353);
                            var $2354 = $2361;
                            break;
                    };
                    var $2346 = $2354;
                    break;
            };
            return $2346;
        }), List$nil))))));
        return $2139;
    };
    const Kind$Parser$do$statements = x0 => Kind$Parser$do$statements$(x0);

    function Kind$Parser$do$(_idx$1, _code$2) {
        var self = Kind$Parser$text$("do ", _idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $2363 = self.idx;
                var $2364 = self.code;
                var $2365 = self.err;
                var $2366 = Parser$Reply$error$($2363, $2364, $2365);
                var $2362 = $2366;
                break;
            case 'Parser.Reply.value':
                var $2367 = self.idx;
                var $2368 = self.code;
                var self = Kind$Parser$name1$($2367, $2368);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $2370 = self.idx;
                        var $2371 = self.code;
                        var $2372 = self.err;
                        var $2373 = Parser$Reply$error$($2370, $2371, $2372);
                        var $2369 = $2373;
                        break;
                    case 'Parser.Reply.value':
                        var $2374 = self.idx;
                        var $2375 = self.code;
                        var $2376 = self.val;
                        var self = Kind$Parser$text$("{", $2374, $2375);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $2378 = self.idx;
                                var $2379 = self.code;
                                var $2380 = self.err;
                                var $2381 = Parser$Reply$error$($2378, $2379, $2380);
                                var $2377 = $2381;
                                break;
                            case 'Parser.Reply.value':
                                var $2382 = self.idx;
                                var $2383 = self.code;
                                var self = Kind$Parser$do$statements$($2376)($2382)($2383);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $2385 = self.idx;
                                        var $2386 = self.code;
                                        var $2387 = self.err;
                                        var $2388 = Parser$Reply$error$($2385, $2386, $2387);
                                        var $2384 = $2388;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $2389 = self.idx;
                                        var $2390 = self.code;
                                        var $2391 = self.val;
                                        var self = Kind$Parser$text$("}", $2389, $2390);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $2393 = self.idx;
                                                var $2394 = self.code;
                                                var $2395 = self.err;
                                                var $2396 = Parser$Reply$error$($2393, $2394, $2395);
                                                var $2392 = $2396;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $2397 = self.idx;
                                                var $2398 = self.code;
                                                var $2399 = Parser$Reply$value$($2397, $2398, $2391);
                                                var $2392 = $2399;
                                                break;
                                        };
                                        var $2384 = $2392;
                                        break;
                                };
                                var $2377 = $2384;
                                break;
                        };
                        var $2369 = $2377;
                        break;
                };
                var $2362 = $2369;
                break;
        };
        return $2362;
    };
    const Kind$Parser$do = x0 => x1 => Kind$Parser$do$(x0, x1);

    function Kind$Term$nat$(_natx$1) {
        var $2400 = ({
            _: 'Kind.Term.nat',
            'natx': _natx$1
        });
        return $2400;
    };
    const Kind$Term$nat = x0 => Kind$Term$nat$(x0);

    function Kind$Term$unroll_nat$(_natx$1) {
        var self = _natx$1;
        if (self === 0n) {
            var $2402 = Kind$Term$ref$(Kind$Name$read$("Nat.zero"));
            var $2401 = $2402;
        } else {
            var $2403 = (self - 1n);
            var _func$3 = Kind$Term$ref$(Kind$Name$read$("Nat.succ"));
            var _argm$4 = Kind$Term$nat$($2403);
            var $2404 = Kind$Term$app$(_func$3, _argm$4);
            var $2401 = $2404;
        };
        return $2401;
    };
    const Kind$Term$unroll_nat = x0 => Kind$Term$unroll_nat$(x0);
    const U16$to_bits = a0 => (u16_to_bits(a0));

    function Kind$Term$unroll_chr$bits$(_bits$1) {
        var self = _bits$1;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'o':
                var $2406 = self.slice(0, -1);
                var $2407 = Kind$Term$app$(Kind$Term$ref$(Kind$Name$read$("Bits.o")), Kind$Term$unroll_chr$bits$($2406));
                var $2405 = $2407;
                break;
            case 'i':
                var $2408 = self.slice(0, -1);
                var $2409 = Kind$Term$app$(Kind$Term$ref$(Kind$Name$read$("Bits.i")), Kind$Term$unroll_chr$bits$($2408));
                var $2405 = $2409;
                break;
            case 'e':
                var $2410 = Kind$Term$ref$(Kind$Name$read$("Bits.e"));
                var $2405 = $2410;
                break;
        };
        return $2405;
    };
    const Kind$Term$unroll_chr$bits = x0 => Kind$Term$unroll_chr$bits$(x0);

    function Kind$Term$unroll_chr$(_chrx$1) {
        var _bits$2 = (u16_to_bits(_chrx$1));
        var _term$3 = Kind$Term$ref$(Kind$Name$read$("Word.from_bits"));
        var _term$4 = Kind$Term$app$(_term$3, Kind$Term$nat$(16n));
        var _term$5 = Kind$Term$app$(_term$4, Kind$Term$unroll_chr$bits$(_bits$2));
        var _term$6 = Kind$Term$app$(Kind$Term$ref$(Kind$Name$read$("U16.new")), _term$5);
        var $2411 = _term$6;
        return $2411;
    };
    const Kind$Term$unroll_chr = x0 => Kind$Term$unroll_chr$(x0);

    function Kind$Term$unroll_str$(_strx$1) {
        var self = _strx$1;
        if (self.length === 0) {
            var $2413 = Kind$Term$ref$(Kind$Name$read$("String.nil"));
            var $2412 = $2413;
        } else {
            var $2414 = self.charCodeAt(0);
            var $2415 = self.slice(1);
            var _char$4 = Kind$Term$chr$($2414);
            var _term$5 = Kind$Term$ref$(Kind$Name$read$("String.cons"));
            var _term$6 = Kind$Term$app$(_term$5, _char$4);
            var _term$7 = Kind$Term$app$(_term$6, Kind$Term$str$($2415));
            var $2416 = _term$7;
            var $2412 = $2416;
        };
        return $2412;
    };
    const Kind$Term$unroll_str = x0 => Kind$Term$unroll_str$(x0);

    function Kind$Term$reduce$(_term$1, _defs$2) {
        var self = _term$1;
        switch (self._) {
            case 'Kind.Term.ref':
                var $2418 = self.name;
                var self = Kind$get$($2418, _defs$2);
                switch (self._) {
                    case 'Maybe.some':
                        var $2420 = self.value;
                        var self = $2420;
                        switch (self._) {
                            case 'Kind.Def.new':
                                var $2422 = self.term;
                                var $2423 = Kind$Term$reduce$($2422, _defs$2);
                                var $2421 = $2423;
                                break;
                        };
                        var $2419 = $2421;
                        break;
                    case 'Maybe.none':
                        var $2424 = Kind$Term$ref$($2418);
                        var $2419 = $2424;
                        break;
                };
                var $2417 = $2419;
                break;
            case 'Kind.Term.app':
                var $2425 = self.func;
                var $2426 = self.argm;
                var _func$5 = Kind$Term$reduce$($2425, _defs$2);
                var self = _func$5;
                switch (self._) {
                    case 'Kind.Term.lam':
                        var $2428 = self.body;
                        var $2429 = Kind$Term$reduce$($2428($2426), _defs$2);
                        var $2427 = $2429;
                        break;
                    case 'Kind.Term.var':
                    case 'Kind.Term.ref':
                    case 'Kind.Term.typ':
                    case 'Kind.Term.all':
                    case 'Kind.Term.app':
                    case 'Kind.Term.let':
                    case 'Kind.Term.def':
                    case 'Kind.Term.ann':
                    case 'Kind.Term.gol':
                    case 'Kind.Term.hol':
                    case 'Kind.Term.nat':
                    case 'Kind.Term.chr':
                    case 'Kind.Term.str':
                    case 'Kind.Term.cse':
                    case 'Kind.Term.ori':
                        var $2430 = _term$1;
                        var $2427 = $2430;
                        break;
                };
                var $2417 = $2427;
                break;
            case 'Kind.Term.let':
                var $2431 = self.expr;
                var $2432 = self.body;
                var $2433 = Kind$Term$reduce$($2432($2431), _defs$2);
                var $2417 = $2433;
                break;
            case 'Kind.Term.def':
                var $2434 = self.expr;
                var $2435 = self.body;
                var $2436 = Kind$Term$reduce$($2435($2434), _defs$2);
                var $2417 = $2436;
                break;
            case 'Kind.Term.ann':
                var $2437 = self.term;
                var $2438 = Kind$Term$reduce$($2437, _defs$2);
                var $2417 = $2438;
                break;
            case 'Kind.Term.nat':
                var $2439 = self.natx;
                var $2440 = Kind$Term$reduce$(Kind$Term$unroll_nat$($2439), _defs$2);
                var $2417 = $2440;
                break;
            case 'Kind.Term.chr':
                var $2441 = self.chrx;
                var $2442 = Kind$Term$reduce$(Kind$Term$unroll_chr$($2441), _defs$2);
                var $2417 = $2442;
                break;
            case 'Kind.Term.str':
                var $2443 = self.strx;
                var $2444 = Kind$Term$reduce$(Kind$Term$unroll_str$($2443), _defs$2);
                var $2417 = $2444;
                break;
            case 'Kind.Term.ori':
                var $2445 = self.expr;
                var $2446 = Kind$Term$reduce$($2445, _defs$2);
                var $2417 = $2446;
                break;
            case 'Kind.Term.var':
            case 'Kind.Term.typ':
            case 'Kind.Term.all':
            case 'Kind.Term.lam':
            case 'Kind.Term.gol':
            case 'Kind.Term.hol':
            case 'Kind.Term.cse':
                var $2447 = _term$1;
                var $2417 = $2447;
                break;
        };
        return $2417;
    };
    const Kind$Term$reduce = x0 => x1 => Kind$Term$reduce$(x0, x1);
    const Map$new = ({
        _: 'Map.new'
    });

    function Kind$Def$new$(_file$1, _code$2, _orig$3, _name$4, _term$5, _type$6, _isct$7, _arit$8, _stat$9) {
        var $2448 = ({
            _: 'Kind.Def.new',
            'file': _file$1,
            'code': _code$2,
            'orig': _orig$3,
            'name': _name$4,
            'term': _term$5,
            'type': _type$6,
            'isct': _isct$7,
            'arit': _arit$8,
            'stat': _stat$9
        });
        return $2448;
    };
    const Kind$Def$new = x0 => x1 => x2 => x3 => x4 => x5 => x6 => x7 => x8 => Kind$Def$new$(x0, x1, x2, x3, x4, x5, x6, x7, x8);
    const Kind$Status$init = ({
        _: 'Kind.Status.init'
    });

    function Kind$Parser$case$with$(_idx$1, _code$2) {
        var self = Kind$Parser$text$("with", _idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $2450 = self.idx;
                var $2451 = self.code;
                var $2452 = self.err;
                var $2453 = Parser$Reply$error$($2450, $2451, $2452);
                var $2449 = $2453;
                break;
            case 'Parser.Reply.value':
                var $2454 = self.idx;
                var $2455 = self.code;
                var self = Kind$Parser$name1$($2454, $2455);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $2457 = self.idx;
                        var $2458 = self.code;
                        var $2459 = self.err;
                        var $2460 = Parser$Reply$error$($2457, $2458, $2459);
                        var $2456 = $2460;
                        break;
                    case 'Parser.Reply.value':
                        var $2461 = self.idx;
                        var $2462 = self.code;
                        var $2463 = self.val;
                        var self = Kind$Parser$text$(":", $2461, $2462);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $2465 = self.idx;
                                var $2466 = self.code;
                                var $2467 = self.err;
                                var $2468 = Parser$Reply$error$($2465, $2466, $2467);
                                var $2464 = $2468;
                                break;
                            case 'Parser.Reply.value':
                                var $2469 = self.idx;
                                var $2470 = self.code;
                                var self = Kind$Parser$term$($2469, $2470);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $2472 = self.idx;
                                        var $2473 = self.code;
                                        var $2474 = self.err;
                                        var $2475 = Parser$Reply$error$($2472, $2473, $2474);
                                        var $2471 = $2475;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $2476 = self.idx;
                                        var $2477 = self.code;
                                        var $2478 = self.val;
                                        var self = Kind$Parser$text$("=", $2476, $2477);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $2480 = self.idx;
                                                var $2481 = self.code;
                                                var $2482 = self.err;
                                                var $2483 = Parser$Reply$error$($2480, $2481, $2482);
                                                var $2479 = $2483;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $2484 = self.idx;
                                                var $2485 = self.code;
                                                var self = Kind$Parser$term$($2484, $2485);
                                                switch (self._) {
                                                    case 'Parser.Reply.error':
                                                        var $2487 = self.idx;
                                                        var $2488 = self.code;
                                                        var $2489 = self.err;
                                                        var $2490 = Parser$Reply$error$($2487, $2488, $2489);
                                                        var $2486 = $2490;
                                                        break;
                                                    case 'Parser.Reply.value':
                                                        var $2491 = self.idx;
                                                        var $2492 = self.code;
                                                        var $2493 = self.val;
                                                        var $2494 = Parser$Reply$value$($2491, $2492, Kind$Def$new$("", "", Pair$new$(0n, 0n), $2463, $2493, $2478, Bool$false, 0n, Kind$Status$init));
                                                        var $2486 = $2494;
                                                        break;
                                                };
                                                var $2479 = $2486;
                                                break;
                                        };
                                        var $2471 = $2479;
                                        break;
                                };
                                var $2464 = $2471;
                                break;
                        };
                        var $2456 = $2464;
                        break;
                };
                var $2449 = $2456;
                break;
        };
        return $2449;
    };
    const Kind$Parser$case$with = x0 => x1 => Kind$Parser$case$with$(x0, x1);

    function Kind$Parser$case$case$(_idx$1, _code$2) {
        var self = Kind$Parser$name1$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $2496 = self.idx;
                var $2497 = self.code;
                var $2498 = self.err;
                var $2499 = Parser$Reply$error$($2496, $2497, $2498);
                var $2495 = $2499;
                break;
            case 'Parser.Reply.value':
                var $2500 = self.idx;
                var $2501 = self.code;
                var $2502 = self.val;
                var self = Kind$Parser$text$(":", $2500, $2501);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $2504 = self.idx;
                        var $2505 = self.code;
                        var $2506 = self.err;
                        var $2507 = Parser$Reply$error$($2504, $2505, $2506);
                        var $2503 = $2507;
                        break;
                    case 'Parser.Reply.value':
                        var $2508 = self.idx;
                        var $2509 = self.code;
                        var self = Kind$Parser$term$($2508, $2509);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $2511 = self.idx;
                                var $2512 = self.code;
                                var $2513 = self.err;
                                var $2514 = Parser$Reply$error$($2511, $2512, $2513);
                                var $2510 = $2514;
                                break;
                            case 'Parser.Reply.value':
                                var $2515 = self.idx;
                                var $2516 = self.code;
                                var $2517 = self.val;
                                var self = Parser$maybe$(Kind$Parser$text(","), $2515, $2516);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $2519 = self.idx;
                                        var $2520 = self.code;
                                        var $2521 = self.err;
                                        var $2522 = Parser$Reply$error$($2519, $2520, $2521);
                                        var $2518 = $2522;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $2523 = self.idx;
                                        var $2524 = self.code;
                                        var $2525 = Parser$Reply$value$($2523, $2524, Pair$new$($2502, $2517));
                                        var $2518 = $2525;
                                        break;
                                };
                                var $2510 = $2518;
                                break;
                        };
                        var $2503 = $2510;
                        break;
                };
                var $2495 = $2503;
                break;
        };
        return $2495;
    };
    const Kind$Parser$case$case = x0 => x1 => Kind$Parser$case$case$(x0, x1);

    function Map$tie$(_val$2, _lft$3, _rgt$4) {
        var $2526 = ({
            _: 'Map.tie',
            'val': _val$2,
            'lft': _lft$3,
            'rgt': _rgt$4
        });
        return $2526;
    };
    const Map$tie = x0 => x1 => x2 => Map$tie$(x0, x1, x2);

    function Map$set$(_bits$2, _val$3, _map$4) {
        var self = _bits$2;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'o':
                var $2528 = self.slice(0, -1);
                var self = _map$4;
                switch (self._) {
                    case 'Map.tie':
                        var $2530 = self.val;
                        var $2531 = self.lft;
                        var $2532 = self.rgt;
                        var $2533 = Map$tie$($2530, Map$set$($2528, _val$3, $2531), $2532);
                        var $2529 = $2533;
                        break;
                    case 'Map.new':
                        var $2534 = Map$tie$(Maybe$none, Map$set$($2528, _val$3, Map$new), Map$new);
                        var $2529 = $2534;
                        break;
                };
                var $2527 = $2529;
                break;
            case 'i':
                var $2535 = self.slice(0, -1);
                var self = _map$4;
                switch (self._) {
                    case 'Map.tie':
                        var $2537 = self.val;
                        var $2538 = self.lft;
                        var $2539 = self.rgt;
                        var $2540 = Map$tie$($2537, $2538, Map$set$($2535, _val$3, $2539));
                        var $2536 = $2540;
                        break;
                    case 'Map.new':
                        var $2541 = Map$tie$(Maybe$none, Map$new, Map$set$($2535, _val$3, Map$new));
                        var $2536 = $2541;
                        break;
                };
                var $2527 = $2536;
                break;
            case 'e':
                var self = _map$4;
                switch (self._) {
                    case 'Map.tie':
                        var $2543 = self.lft;
                        var $2544 = self.rgt;
                        var $2545 = Map$tie$(Maybe$some$(_val$3), $2543, $2544);
                        var $2542 = $2545;
                        break;
                    case 'Map.new':
                        var $2546 = Map$tie$(Maybe$some$(_val$3), Map$new, Map$new);
                        var $2542 = $2546;
                        break;
                };
                var $2527 = $2542;
                break;
        };
        return $2527;
    };
    const Map$set = x0 => x1 => x2 => Map$set$(x0, x1, x2);

    function Map$from_list$(_xs$2) {
        var self = _xs$2;
        switch (self._) {
            case 'List.cons':
                var $2548 = self.head;
                var $2549 = self.tail;
                var self = $2548;
                switch (self._) {
                    case 'Pair.new':
                        var $2551 = self.fst;
                        var $2552 = self.snd;
                        var $2553 = Map$set$($2551, $2552, Map$from_list$($2549));
                        var $2550 = $2553;
                        break;
                };
                var $2547 = $2550;
                break;
            case 'List.nil':
                var $2554 = Map$new;
                var $2547 = $2554;
                break;
        };
        return $2547;
    };
    const Map$from_list = x0 => Map$from_list$(x0);

    function Pair$fst$(_pair$3) {
        var self = _pair$3;
        switch (self._) {
            case 'Pair.new':
                var $2556 = self.fst;
                var $2557 = $2556;
                var $2555 = $2557;
                break;
        };
        return $2555;
    };
    const Pair$fst = x0 => Pair$fst$(x0);

    function Pair$snd$(_pair$3) {
        var self = _pair$3;
        switch (self._) {
            case 'Pair.new':
                var $2559 = self.snd;
                var $2560 = $2559;
                var $2558 = $2560;
                break;
        };
        return $2558;
    };
    const Pair$snd = x0 => Pair$snd$(x0);

    function Kind$Term$cse$(_path$1, _expr$2, _name$3, _with$4, _cses$5, _moti$6) {
        var $2561 = ({
            _: 'Kind.Term.cse',
            'path': _path$1,
            'expr': _expr$2,
            'name': _name$3,
            'with': _with$4,
            'cses': _cses$5,
            'moti': _moti$6
        });
        return $2561;
    };
    const Kind$Term$cse = x0 => x1 => x2 => x3 => x4 => x5 => Kind$Term$cse$(x0, x1, x2, x3, x4, x5);

    function Kind$Parser$case$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $2563 = self.idx;
                var $2564 = self.code;
                var $2565 = self.err;
                var $2566 = Parser$Reply$error$($2563, $2564, $2565);
                var $2562 = $2566;
                break;
            case 'Parser.Reply.value':
                var $2567 = self.idx;
                var $2568 = self.code;
                var $2569 = self.val;
                var self = Kind$Parser$text$("case ", $2567, $2568);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $2571 = self.idx;
                        var $2572 = self.code;
                        var $2573 = self.err;
                        var $2574 = Parser$Reply$error$($2571, $2572, $2573);
                        var $2570 = $2574;
                        break;
                    case 'Parser.Reply.value':
                        var $2575 = self.idx;
                        var $2576 = self.code;
                        var self = Kind$Parser$spaces($2575)($2576);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $2578 = self.idx;
                                var $2579 = self.code;
                                var $2580 = self.err;
                                var $2581 = Parser$Reply$error$($2578, $2579, $2580);
                                var $2577 = $2581;
                                break;
                            case 'Parser.Reply.value':
                                var $2582 = self.idx;
                                var $2583 = self.code;
                                var self = Kind$Parser$term$($2582, $2583);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $2585 = self.idx;
                                        var $2586 = self.code;
                                        var $2587 = self.err;
                                        var $2588 = Parser$Reply$error$($2585, $2586, $2587);
                                        var $2584 = $2588;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $2589 = self.idx;
                                        var $2590 = self.code;
                                        var $2591 = self.val;
                                        var self = Parser$maybe$((_idx$15 => _code$16 => {
                                            var self = Kind$Parser$text$("as", _idx$15, _code$16);
                                            switch (self._) {
                                                case 'Parser.Reply.error':
                                                    var $2594 = self.idx;
                                                    var $2595 = self.code;
                                                    var $2596 = self.err;
                                                    var $2597 = Parser$Reply$error$($2594, $2595, $2596);
                                                    var $2593 = $2597;
                                                    break;
                                                case 'Parser.Reply.value':
                                                    var $2598 = self.idx;
                                                    var $2599 = self.code;
                                                    var $2600 = Kind$Parser$name1$($2598, $2599);
                                                    var $2593 = $2600;
                                                    break;
                                            };
                                            return $2593;
                                        }), $2589, $2590);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $2601 = self.idx;
                                                var $2602 = self.code;
                                                var $2603 = self.err;
                                                var $2604 = Parser$Reply$error$($2601, $2602, $2603);
                                                var $2592 = $2604;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $2605 = self.idx;
                                                var $2606 = self.code;
                                                var $2607 = self.val;
                                                var self = $2607;
                                                switch (self._) {
                                                    case 'Maybe.some':
                                                        var $2609 = self.value;
                                                        var $2610 = $2609;
                                                        var _name$18 = $2610;
                                                        break;
                                                    case 'Maybe.none':
                                                        var self = Kind$Term$reduce$($2591, Map$new);
                                                        switch (self._) {
                                                            case 'Kind.Term.var':
                                                                var $2612 = self.name;
                                                                var $2613 = $2612;
                                                                var $2611 = $2613;
                                                                break;
                                                            case 'Kind.Term.ref':
                                                                var $2614 = self.name;
                                                                var $2615 = $2614;
                                                                var $2611 = $2615;
                                                                break;
                                                            case 'Kind.Term.typ':
                                                            case 'Kind.Term.all':
                                                            case 'Kind.Term.lam':
                                                            case 'Kind.Term.app':
                                                            case 'Kind.Term.let':
                                                            case 'Kind.Term.def':
                                                            case 'Kind.Term.ann':
                                                            case 'Kind.Term.gol':
                                                            case 'Kind.Term.hol':
                                                            case 'Kind.Term.nat':
                                                            case 'Kind.Term.chr':
                                                            case 'Kind.Term.str':
                                                            case 'Kind.Term.cse':
                                                            case 'Kind.Term.ori':
                                                                var $2616 = Kind$Name$read$("self");
                                                                var $2611 = $2616;
                                                                break;
                                                        };
                                                        var _name$18 = $2611;
                                                        break;
                                                };
                                                var self = Parser$many$(Kind$Parser$case$with)($2605)($2606);
                                                switch (self._) {
                                                    case 'Parser.Reply.error':
                                                        var $2617 = self.idx;
                                                        var $2618 = self.code;
                                                        var $2619 = self.err;
                                                        var $2620 = Parser$Reply$error$($2617, $2618, $2619);
                                                        var $2608 = $2620;
                                                        break;
                                                    case 'Parser.Reply.value':
                                                        var $2621 = self.idx;
                                                        var $2622 = self.code;
                                                        var $2623 = self.val;
                                                        var self = Kind$Parser$text$("{", $2621, $2622);
                                                        switch (self._) {
                                                            case 'Parser.Reply.error':
                                                                var $2625 = self.idx;
                                                                var $2626 = self.code;
                                                                var $2627 = self.err;
                                                                var $2628 = Parser$Reply$error$($2625, $2626, $2627);
                                                                var $2624 = $2628;
                                                                break;
                                                            case 'Parser.Reply.value':
                                                                var $2629 = self.idx;
                                                                var $2630 = self.code;
                                                                var self = Parser$until$(Kind$Parser$text("}"), Kind$Parser$case$case)($2629)($2630);
                                                                switch (self._) {
                                                                    case 'Parser.Reply.error':
                                                                        var $2632 = self.idx;
                                                                        var $2633 = self.code;
                                                                        var $2634 = self.err;
                                                                        var $2635 = Parser$Reply$error$($2632, $2633, $2634);
                                                                        var $2631 = $2635;
                                                                        break;
                                                                    case 'Parser.Reply.value':
                                                                        var $2636 = self.idx;
                                                                        var $2637 = self.code;
                                                                        var $2638 = self.val;
                                                                        var _cses$28 = Map$from_list$(List$mapped$($2638, (_x$28 => {
                                                                            var $2640 = Pair$new$((kind_name_to_bits(Pair$fst$(_x$28))), Pair$snd$(_x$28));
                                                                            return $2640;
                                                                        })));
                                                                        var self = Parser$first_of$(List$cons$((_idx$29 => _code$30 => {
                                                                            var self = Kind$Parser$text$(":", _idx$29, _code$30);
                                                                            switch (self._) {
                                                                                case 'Parser.Reply.error':
                                                                                    var $2642 = self.idx;
                                                                                    var $2643 = self.code;
                                                                                    var $2644 = self.err;
                                                                                    var $2645 = Parser$Reply$error$($2642, $2643, $2644);
                                                                                    var $2641 = $2645;
                                                                                    break;
                                                                                case 'Parser.Reply.value':
                                                                                    var $2646 = self.idx;
                                                                                    var $2647 = self.code;
                                                                                    var self = Kind$Parser$term$($2646, $2647);
                                                                                    switch (self._) {
                                                                                        case 'Parser.Reply.error':
                                                                                            var $2649 = self.idx;
                                                                                            var $2650 = self.code;
                                                                                            var $2651 = self.err;
                                                                                            var $2652 = Parser$Reply$error$($2649, $2650, $2651);
                                                                                            var $2648 = $2652;
                                                                                            break;
                                                                                        case 'Parser.Reply.value':
                                                                                            var $2653 = self.idx;
                                                                                            var $2654 = self.code;
                                                                                            var $2655 = self.val;
                                                                                            var $2656 = Parser$Reply$value$($2653, $2654, Maybe$some$($2655));
                                                                                            var $2648 = $2656;
                                                                                            break;
                                                                                    };
                                                                                    var $2641 = $2648;
                                                                                    break;
                                                                            };
                                                                            return $2641;
                                                                        }), List$cons$((_idx$29 => _code$30 => {
                                                                            var self = Kind$Parser$text$("!", _idx$29, _code$30);
                                                                            switch (self._) {
                                                                                case 'Parser.Reply.error':
                                                                                    var $2658 = self.idx;
                                                                                    var $2659 = self.code;
                                                                                    var $2660 = self.err;
                                                                                    var $2661 = Parser$Reply$error$($2658, $2659, $2660);
                                                                                    var $2657 = $2661;
                                                                                    break;
                                                                                case 'Parser.Reply.value':
                                                                                    var $2662 = self.idx;
                                                                                    var $2663 = self.code;
                                                                                    var $2664 = Parser$Reply$value$($2662, $2663, Maybe$none);
                                                                                    var $2657 = $2664;
                                                                                    break;
                                                                            };
                                                                            return $2657;
                                                                        }), List$cons$((_idx$29 => _code$30 => {
                                                                            var $2665 = Parser$Reply$value$(_idx$29, _code$30, Maybe$some$(Kind$Term$hol$(Bits$e)));
                                                                            return $2665;
                                                                        }), List$nil))))($2636)($2637);
                                                                        switch (self._) {
                                                                            case 'Parser.Reply.error':
                                                                                var $2666 = self.idx;
                                                                                var $2667 = self.code;
                                                                                var $2668 = self.err;
                                                                                var $2669 = Parser$Reply$error$($2666, $2667, $2668);
                                                                                var $2639 = $2669;
                                                                                break;
                                                                            case 'Parser.Reply.value':
                                                                                var $2670 = self.idx;
                                                                                var $2671 = self.code;
                                                                                var $2672 = self.val;
                                                                                var self = Kind$Parser$stop$($2569, $2670, $2671);
                                                                                switch (self._) {
                                                                                    case 'Parser.Reply.error':
                                                                                        var $2674 = self.idx;
                                                                                        var $2675 = self.code;
                                                                                        var $2676 = self.err;
                                                                                        var $2677 = Parser$Reply$error$($2674, $2675, $2676);
                                                                                        var $2673 = $2677;
                                                                                        break;
                                                                                    case 'Parser.Reply.value':
                                                                                        var $2678 = self.idx;
                                                                                        var $2679 = self.code;
                                                                                        var $2680 = self.val;
                                                                                        var $2681 = Parser$Reply$value$($2678, $2679, Kind$Term$ori$($2680, Kind$Term$cse$(Bits$e, $2591, _name$18, $2623, _cses$28, $2672)));
                                                                                        var $2673 = $2681;
                                                                                        break;
                                                                                };
                                                                                var $2639 = $2673;
                                                                                break;
                                                                        };
                                                                        var $2631 = $2639;
                                                                        break;
                                                                };
                                                                var $2624 = $2631;
                                                                break;
                                                        };
                                                        var $2608 = $2624;
                                                        break;
                                                };
                                                var $2592 = $2608;
                                                break;
                                        };
                                        var $2584 = $2592;
                                        break;
                                };
                                var $2577 = $2584;
                                break;
                        };
                        var $2570 = $2577;
                        break;
                };
                var $2562 = $2570;
                break;
        };
        return $2562;
    };
    const Kind$Parser$case = x0 => x1 => Kind$Parser$case$(x0, x1);

    function Kind$set$(_name$2, _val$3, _map$4) {
        var $2682 = Map$set$((kind_name_to_bits(_name$2)), _val$3, _map$4);
        return $2682;
    };
    const Kind$set = x0 => x1 => x2 => Kind$set$(x0, x1, x2);

    function Kind$Parser$open$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $2684 = self.idx;
                var $2685 = self.code;
                var $2686 = self.err;
                var $2687 = Parser$Reply$error$($2684, $2685, $2686);
                var $2683 = $2687;
                break;
            case 'Parser.Reply.value':
                var $2688 = self.idx;
                var $2689 = self.code;
                var $2690 = self.val;
                var self = Kind$Parser$text$("open ", $2688, $2689);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $2692 = self.idx;
                        var $2693 = self.code;
                        var $2694 = self.err;
                        var $2695 = Parser$Reply$error$($2692, $2693, $2694);
                        var $2691 = $2695;
                        break;
                    case 'Parser.Reply.value':
                        var $2696 = self.idx;
                        var $2697 = self.code;
                        var self = Kind$Parser$spaces($2696)($2697);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $2699 = self.idx;
                                var $2700 = self.code;
                                var $2701 = self.err;
                                var $2702 = Parser$Reply$error$($2699, $2700, $2701);
                                var $2698 = $2702;
                                break;
                            case 'Parser.Reply.value':
                                var $2703 = self.idx;
                                var $2704 = self.code;
                                var self = Kind$Parser$term$($2703, $2704);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $2706 = self.idx;
                                        var $2707 = self.code;
                                        var $2708 = self.err;
                                        var $2709 = Parser$Reply$error$($2706, $2707, $2708);
                                        var $2705 = $2709;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $2710 = self.idx;
                                        var $2711 = self.code;
                                        var $2712 = self.val;
                                        var self = Parser$maybe$((_idx$15 => _code$16 => {
                                            var self = Kind$Parser$text$("as", _idx$15, _code$16);
                                            switch (self._) {
                                                case 'Parser.Reply.error':
                                                    var $2715 = self.idx;
                                                    var $2716 = self.code;
                                                    var $2717 = self.err;
                                                    var $2718 = Parser$Reply$error$($2715, $2716, $2717);
                                                    var $2714 = $2718;
                                                    break;
                                                case 'Parser.Reply.value':
                                                    var $2719 = self.idx;
                                                    var $2720 = self.code;
                                                    var $2721 = Kind$Parser$name1$($2719, $2720);
                                                    var $2714 = $2721;
                                                    break;
                                            };
                                            return $2714;
                                        }), $2710, $2711);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $2722 = self.idx;
                                                var $2723 = self.code;
                                                var $2724 = self.err;
                                                var $2725 = Parser$Reply$error$($2722, $2723, $2724);
                                                var $2713 = $2725;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $2726 = self.idx;
                                                var $2727 = self.code;
                                                var $2728 = self.val;
                                                var self = Parser$maybe$(Kind$Parser$text(";"), $2726, $2727);
                                                switch (self._) {
                                                    case 'Parser.Reply.error':
                                                        var $2730 = self.idx;
                                                        var $2731 = self.code;
                                                        var $2732 = self.err;
                                                        var $2733 = Parser$Reply$error$($2730, $2731, $2732);
                                                        var $2729 = $2733;
                                                        break;
                                                    case 'Parser.Reply.value':
                                                        var $2734 = self.idx;
                                                        var $2735 = self.code;
                                                        var self = $2728;
                                                        switch (self._) {
                                                            case 'Maybe.some':
                                                                var $2737 = self.value;
                                                                var $2738 = $2737;
                                                                var _name$21 = $2738;
                                                                break;
                                                            case 'Maybe.none':
                                                                var self = Kind$Term$reduce$($2712, Map$new);
                                                                switch (self._) {
                                                                    case 'Kind.Term.var':
                                                                        var $2740 = self.name;
                                                                        var $2741 = $2740;
                                                                        var $2739 = $2741;
                                                                        break;
                                                                    case 'Kind.Term.ref':
                                                                        var $2742 = self.name;
                                                                        var $2743 = $2742;
                                                                        var $2739 = $2743;
                                                                        break;
                                                                    case 'Kind.Term.typ':
                                                                    case 'Kind.Term.all':
                                                                    case 'Kind.Term.lam':
                                                                    case 'Kind.Term.app':
                                                                    case 'Kind.Term.let':
                                                                    case 'Kind.Term.def':
                                                                    case 'Kind.Term.ann':
                                                                    case 'Kind.Term.gol':
                                                                    case 'Kind.Term.hol':
                                                                    case 'Kind.Term.nat':
                                                                    case 'Kind.Term.chr':
                                                                    case 'Kind.Term.str':
                                                                    case 'Kind.Term.cse':
                                                                    case 'Kind.Term.ori':
                                                                        var $2744 = Kind$Name$read$("self");
                                                                        var $2739 = $2744;
                                                                        break;
                                                                };
                                                                var _name$21 = $2739;
                                                                break;
                                                        };
                                                        var _wyth$22 = List$nil;
                                                        var self = Kind$Parser$term$($2734, $2735);
                                                        switch (self._) {
                                                            case 'Parser.Reply.error':
                                                                var $2745 = self.idx;
                                                                var $2746 = self.code;
                                                                var $2747 = self.err;
                                                                var $2748 = Parser$Reply$error$($2745, $2746, $2747);
                                                                var $2736 = $2748;
                                                                break;
                                                            case 'Parser.Reply.value':
                                                                var $2749 = self.idx;
                                                                var $2750 = self.code;
                                                                var $2751 = self.val;
                                                                var _cses$26 = Kind$set$("_", $2751, Map$new);
                                                                var _moti$27 = Maybe$some$(Kind$Term$hol$(Bits$e));
                                                                var self = Kind$Parser$stop$($2690, $2749, $2750);
                                                                switch (self._) {
                                                                    case 'Parser.Reply.error':
                                                                        var $2753 = self.idx;
                                                                        var $2754 = self.code;
                                                                        var $2755 = self.err;
                                                                        var $2756 = Parser$Reply$error$($2753, $2754, $2755);
                                                                        var $2752 = $2756;
                                                                        break;
                                                                    case 'Parser.Reply.value':
                                                                        var $2757 = self.idx;
                                                                        var $2758 = self.code;
                                                                        var $2759 = self.val;
                                                                        var $2760 = Parser$Reply$value$($2757, $2758, Kind$Term$ori$($2759, Kind$Term$cse$(Bits$e, $2712, _name$21, _wyth$22, _cses$26, _moti$27)));
                                                                        var $2752 = $2760;
                                                                        break;
                                                                };
                                                                var $2736 = $2752;
                                                                break;
                                                        };
                                                        var $2729 = $2736;
                                                        break;
                                                };
                                                var $2713 = $2729;
                                                break;
                                        };
                                        var $2705 = $2713;
                                        break;
                                };
                                var $2698 = $2705;
                                break;
                        };
                        var $2691 = $2698;
                        break;
                };
                var $2683 = $2691;
                break;
        };
        return $2683;
    };
    const Kind$Parser$open = x0 => x1 => Kind$Parser$open$(x0, x1);

    function Parser$digit$(_idx$1, _code$2) {
        var self = _code$2;
        if (self.length === 0) {
            var $2762 = Parser$Reply$error$(_idx$1, _code$2, "Not a digit.");
            var $2761 = $2762;
        } else {
            var $2763 = self.charCodeAt(0);
            var $2764 = self.slice(1);
            var _sidx$5 = Nat$succ$(_idx$1);
            var self = ($2763 === 48);
            if (self) {
                var $2766 = Parser$Reply$value$(_sidx$5, $2764, 0n);
                var $2765 = $2766;
            } else {
                var self = ($2763 === 49);
                if (self) {
                    var $2768 = Parser$Reply$value$(_sidx$5, $2764, 1n);
                    var $2767 = $2768;
                } else {
                    var self = ($2763 === 50);
                    if (self) {
                        var $2770 = Parser$Reply$value$(_sidx$5, $2764, 2n);
                        var $2769 = $2770;
                    } else {
                        var self = ($2763 === 51);
                        if (self) {
                            var $2772 = Parser$Reply$value$(_sidx$5, $2764, 3n);
                            var $2771 = $2772;
                        } else {
                            var self = ($2763 === 52);
                            if (self) {
                                var $2774 = Parser$Reply$value$(_sidx$5, $2764, 4n);
                                var $2773 = $2774;
                            } else {
                                var self = ($2763 === 53);
                                if (self) {
                                    var $2776 = Parser$Reply$value$(_sidx$5, $2764, 5n);
                                    var $2775 = $2776;
                                } else {
                                    var self = ($2763 === 54);
                                    if (self) {
                                        var $2778 = Parser$Reply$value$(_sidx$5, $2764, 6n);
                                        var $2777 = $2778;
                                    } else {
                                        var self = ($2763 === 55);
                                        if (self) {
                                            var $2780 = Parser$Reply$value$(_sidx$5, $2764, 7n);
                                            var $2779 = $2780;
                                        } else {
                                            var self = ($2763 === 56);
                                            if (self) {
                                                var $2782 = Parser$Reply$value$(_sidx$5, $2764, 8n);
                                                var $2781 = $2782;
                                            } else {
                                                var self = ($2763 === 57);
                                                if (self) {
                                                    var $2784 = Parser$Reply$value$(_sidx$5, $2764, 9n);
                                                    var $2783 = $2784;
                                                } else {
                                                    var $2785 = Parser$Reply$error$(_idx$1, _code$2, "Not a digit.");
                                                    var $2783 = $2785;
                                                };
                                                var $2781 = $2783;
                                            };
                                            var $2779 = $2781;
                                        };
                                        var $2777 = $2779;
                                    };
                                    var $2775 = $2777;
                                };
                                var $2773 = $2775;
                            };
                            var $2771 = $2773;
                        };
                        var $2769 = $2771;
                    };
                    var $2767 = $2769;
                };
                var $2765 = $2767;
            };
            var $2761 = $2765;
        };
        return $2761;
    };
    const Parser$digit = x0 => x1 => Parser$digit$(x0, x1);
    const Nat$add = a0 => a1 => (a0 + a1);
    const Nat$mul = a0 => a1 => (a0 * a1);

    function Nat$from_base$go$(_b$1, _ds$2, _p$3, _res$4) {
        var Nat$from_base$go$ = (_b$1, _ds$2, _p$3, _res$4) => ({
            ctr: 'TCO',
            arg: [_b$1, _ds$2, _p$3, _res$4]
        });
        var Nat$from_base$go = _b$1 => _ds$2 => _p$3 => _res$4 => Nat$from_base$go$(_b$1, _ds$2, _p$3, _res$4);
        var arg = [_b$1, _ds$2, _p$3, _res$4];
        while (true) {
            let [_b$1, _ds$2, _p$3, _res$4] = arg;
            var R = (() => {
                var self = _ds$2;
                switch (self._) {
                    case 'List.cons':
                        var $2786 = self.head;
                        var $2787 = self.tail;
                        var $2788 = Nat$from_base$go$(_b$1, $2787, (_b$1 * _p$3), (($2786 * _p$3) + _res$4));
                        return $2788;
                    case 'List.nil':
                        var $2789 = _res$4;
                        return $2789;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Nat$from_base$go = x0 => x1 => x2 => x3 => Nat$from_base$go$(x0, x1, x2, x3);

    function Nat$from_base$(_base$1, _ds$2) {
        var $2790 = Nat$from_base$go$(_base$1, List$reverse$(_ds$2), 1n, 0n);
        return $2790;
    };
    const Nat$from_base = x0 => x1 => Nat$from_base$(x0, x1);

    function Parser$nat$(_idx$1, _code$2) {
        var self = Parser$many1$(Parser$digit, _idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $2792 = self.idx;
                var $2793 = self.code;
                var $2794 = self.err;
                var $2795 = Parser$Reply$error$($2792, $2793, $2794);
                var $2791 = $2795;
                break;
            case 'Parser.Reply.value':
                var $2796 = self.idx;
                var $2797 = self.code;
                var $2798 = self.val;
                var $2799 = Parser$Reply$value$($2796, $2797, Nat$from_base$(10n, $2798));
                var $2791 = $2799;
                break;
        };
        return $2791;
    };
    const Parser$nat = x0 => x1 => Parser$nat$(x0, x1);

    function Bits$tail$(_a$1) {
        var self = _a$1;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'o':
                var $2801 = self.slice(0, -1);
                var $2802 = $2801;
                var $2800 = $2802;
                break;
            case 'i':
                var $2803 = self.slice(0, -1);
                var $2804 = $2803;
                var $2800 = $2804;
                break;
            case 'e':
                var $2805 = Bits$e;
                var $2800 = $2805;
                break;
        };
        return $2800;
    };
    const Bits$tail = x0 => Bits$tail$(x0);

    function Bits$inc$(_a$1) {
        var self = _a$1;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'o':
                var $2807 = self.slice(0, -1);
                var $2808 = ($2807 + '1');
                var $2806 = $2808;
                break;
            case 'i':
                var $2809 = self.slice(0, -1);
                var $2810 = (Bits$inc$($2809) + '0');
                var $2806 = $2810;
                break;
            case 'e':
                var $2811 = (Bits$e + '1');
                var $2806 = $2811;
                break;
        };
        return $2806;
    };
    const Bits$inc = x0 => Bits$inc$(x0);
    const Nat$to_bits = a0 => (nat_to_bits(a0));

    function Maybe$to_bool$(_m$2) {
        var self = _m$2;
        switch (self._) {
            case 'Maybe.none':
                var $2813 = Bool$false;
                var $2812 = $2813;
                break;
            case 'Maybe.some':
                var $2814 = Bool$true;
                var $2812 = $2814;
                break;
        };
        return $2812;
    };
    const Maybe$to_bool = x0 => Maybe$to_bool$(x0);

    function Kind$Term$gol$(_name$1, _dref$2, _verb$3) {
        var $2815 = ({
            _: 'Kind.Term.gol',
            'name': _name$1,
            'dref': _dref$2,
            'verb': _verb$3
        });
        return $2815;
    };
    const Kind$Term$gol = x0 => x1 => x2 => Kind$Term$gol$(x0, x1, x2);

    function Kind$Parser$goal$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $2817 = self.idx;
                var $2818 = self.code;
                var $2819 = self.err;
                var $2820 = Parser$Reply$error$($2817, $2818, $2819);
                var $2816 = $2820;
                break;
            case 'Parser.Reply.value':
                var $2821 = self.idx;
                var $2822 = self.code;
                var $2823 = self.val;
                var self = Kind$Parser$text$("?", $2821, $2822);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $2825 = self.idx;
                        var $2826 = self.code;
                        var $2827 = self.err;
                        var $2828 = Parser$Reply$error$($2825, $2826, $2827);
                        var $2824 = $2828;
                        break;
                    case 'Parser.Reply.value':
                        var $2829 = self.idx;
                        var $2830 = self.code;
                        var self = Kind$Parser$name$($2829, $2830);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $2832 = self.idx;
                                var $2833 = self.code;
                                var $2834 = self.err;
                                var $2835 = Parser$Reply$error$($2832, $2833, $2834);
                                var $2831 = $2835;
                                break;
                            case 'Parser.Reply.value':
                                var $2836 = self.idx;
                                var $2837 = self.code;
                                var $2838 = self.val;
                                var self = Parser$many$((_idx$12 => _code$13 => {
                                    var self = Kind$Parser$text$("-", _idx$12, _code$13);
                                    switch (self._) {
                                        case 'Parser.Reply.error':
                                            var $2841 = self.idx;
                                            var $2842 = self.code;
                                            var $2843 = self.err;
                                            var $2844 = Parser$Reply$error$($2841, $2842, $2843);
                                            var $2840 = $2844;
                                            break;
                                        case 'Parser.Reply.value':
                                            var $2845 = self.idx;
                                            var $2846 = self.code;
                                            var self = Parser$nat$($2845, $2846);
                                            switch (self._) {
                                                case 'Parser.Reply.error':
                                                    var $2848 = self.idx;
                                                    var $2849 = self.code;
                                                    var $2850 = self.err;
                                                    var $2851 = Parser$Reply$error$($2848, $2849, $2850);
                                                    var $2847 = $2851;
                                                    break;
                                                case 'Parser.Reply.value':
                                                    var $2852 = self.idx;
                                                    var $2853 = self.code;
                                                    var $2854 = self.val;
                                                    var _bits$20 = Bits$reverse$(Bits$tail$(Bits$reverse$((nat_to_bits($2854)))));
                                                    var $2855 = Parser$Reply$value$($2852, $2853, _bits$20);
                                                    var $2847 = $2855;
                                                    break;
                                            };
                                            var $2840 = $2847;
                                            break;
                                    };
                                    return $2840;
                                }))($2836)($2837);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $2856 = self.idx;
                                        var $2857 = self.code;
                                        var $2858 = self.err;
                                        var $2859 = Parser$Reply$error$($2856, $2857, $2858);
                                        var $2839 = $2859;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $2860 = self.idx;
                                        var $2861 = self.code;
                                        var $2862 = self.val;
                                        var self = Parser$maybe$(Parser$text("-"), $2860, $2861);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $2864 = self.idx;
                                                var $2865 = self.code;
                                                var $2866 = self.err;
                                                var $2867 = Parser$Reply$error$($2864, $2865, $2866);
                                                var self = $2867;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $2868 = self.idx;
                                                var $2869 = self.code;
                                                var $2870 = self.val;
                                                var $2871 = Parser$Reply$value$($2868, $2869, Maybe$to_bool$($2870));
                                                var self = $2871;
                                                break;
                                        };
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $2872 = self.idx;
                                                var $2873 = self.code;
                                                var $2874 = self.err;
                                                var $2875 = Parser$Reply$error$($2872, $2873, $2874);
                                                var $2863 = $2875;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $2876 = self.idx;
                                                var $2877 = self.code;
                                                var $2878 = self.val;
                                                var self = Kind$Parser$stop$($2823, $2876, $2877);
                                                switch (self._) {
                                                    case 'Parser.Reply.error':
                                                        var $2880 = self.idx;
                                                        var $2881 = self.code;
                                                        var $2882 = self.err;
                                                        var $2883 = Parser$Reply$error$($2880, $2881, $2882);
                                                        var $2879 = $2883;
                                                        break;
                                                    case 'Parser.Reply.value':
                                                        var $2884 = self.idx;
                                                        var $2885 = self.code;
                                                        var $2886 = self.val;
                                                        var $2887 = Parser$Reply$value$($2884, $2885, Kind$Term$ori$($2886, Kind$Term$gol$($2838, $2862, $2878)));
                                                        var $2879 = $2887;
                                                        break;
                                                };
                                                var $2863 = $2879;
                                                break;
                                        };
                                        var $2839 = $2863;
                                        break;
                                };
                                var $2831 = $2839;
                                break;
                        };
                        var $2824 = $2831;
                        break;
                };
                var $2816 = $2824;
                break;
        };
        return $2816;
    };
    const Kind$Parser$goal = x0 => x1 => Kind$Parser$goal$(x0, x1);

    function Kind$Parser$hole$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $2889 = self.idx;
                var $2890 = self.code;
                var $2891 = self.err;
                var $2892 = Parser$Reply$error$($2889, $2890, $2891);
                var $2888 = $2892;
                break;
            case 'Parser.Reply.value':
                var $2893 = self.idx;
                var $2894 = self.code;
                var $2895 = self.val;
                var self = Kind$Parser$text$("_", $2893, $2894);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $2897 = self.idx;
                        var $2898 = self.code;
                        var $2899 = self.err;
                        var $2900 = Parser$Reply$error$($2897, $2898, $2899);
                        var $2896 = $2900;
                        break;
                    case 'Parser.Reply.value':
                        var $2901 = self.idx;
                        var $2902 = self.code;
                        var self = Kind$Parser$stop$($2895, $2901, $2902);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $2904 = self.idx;
                                var $2905 = self.code;
                                var $2906 = self.err;
                                var $2907 = Parser$Reply$error$($2904, $2905, $2906);
                                var $2903 = $2907;
                                break;
                            case 'Parser.Reply.value':
                                var $2908 = self.idx;
                                var $2909 = self.code;
                                var $2910 = self.val;
                                var $2911 = Parser$Reply$value$($2908, $2909, Kind$Term$ori$($2910, Kind$Term$hol$(Bits$e)));
                                var $2903 = $2911;
                                break;
                        };
                        var $2896 = $2903;
                        break;
                };
                var $2888 = $2896;
                break;
        };
        return $2888;
    };
    const Kind$Parser$hole = x0 => x1 => Kind$Parser$hole$(x0, x1);

    function Kind$Parser$u8$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $2913 = self.idx;
                var $2914 = self.code;
                var $2915 = self.err;
                var $2916 = Parser$Reply$error$($2913, $2914, $2915);
                var $2912 = $2916;
                break;
            case 'Parser.Reply.value':
                var $2917 = self.idx;
                var $2918 = self.code;
                var $2919 = self.val;
                var self = Kind$Parser$spaces($2917)($2918);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $2921 = self.idx;
                        var $2922 = self.code;
                        var $2923 = self.err;
                        var $2924 = Parser$Reply$error$($2921, $2922, $2923);
                        var $2920 = $2924;
                        break;
                    case 'Parser.Reply.value':
                        var $2925 = self.idx;
                        var $2926 = self.code;
                        var self = Parser$nat$($2925, $2926);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $2928 = self.idx;
                                var $2929 = self.code;
                                var $2930 = self.err;
                                var $2931 = Parser$Reply$error$($2928, $2929, $2930);
                                var $2927 = $2931;
                                break;
                            case 'Parser.Reply.value':
                                var $2932 = self.idx;
                                var $2933 = self.code;
                                var $2934 = self.val;
                                var self = Parser$text$("b", $2932, $2933);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $2936 = self.idx;
                                        var $2937 = self.code;
                                        var $2938 = self.err;
                                        var $2939 = Parser$Reply$error$($2936, $2937, $2938);
                                        var $2935 = $2939;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $2940 = self.idx;
                                        var $2941 = self.code;
                                        var _term$15 = Kind$Term$ref$("Nat.to_u8");
                                        var _term$16 = Kind$Term$app$(_term$15, Kind$Term$nat$($2934));
                                        var self = Kind$Parser$stop$($2919, $2940, $2941);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $2943 = self.idx;
                                                var $2944 = self.code;
                                                var $2945 = self.err;
                                                var $2946 = Parser$Reply$error$($2943, $2944, $2945);
                                                var $2942 = $2946;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $2947 = self.idx;
                                                var $2948 = self.code;
                                                var $2949 = self.val;
                                                var $2950 = Parser$Reply$value$($2947, $2948, Kind$Term$ori$($2949, _term$16));
                                                var $2942 = $2950;
                                                break;
                                        };
                                        var $2935 = $2942;
                                        break;
                                };
                                var $2927 = $2935;
                                break;
                        };
                        var $2920 = $2927;
                        break;
                };
                var $2912 = $2920;
                break;
        };
        return $2912;
    };
    const Kind$Parser$u8 = x0 => x1 => Kind$Parser$u8$(x0, x1);

    function Kind$Parser$u16$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $2952 = self.idx;
                var $2953 = self.code;
                var $2954 = self.err;
                var $2955 = Parser$Reply$error$($2952, $2953, $2954);
                var $2951 = $2955;
                break;
            case 'Parser.Reply.value':
                var $2956 = self.idx;
                var $2957 = self.code;
                var $2958 = self.val;
                var self = Kind$Parser$spaces($2956)($2957);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $2960 = self.idx;
                        var $2961 = self.code;
                        var $2962 = self.err;
                        var $2963 = Parser$Reply$error$($2960, $2961, $2962);
                        var $2959 = $2963;
                        break;
                    case 'Parser.Reply.value':
                        var $2964 = self.idx;
                        var $2965 = self.code;
                        var self = Parser$nat$($2964, $2965);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $2967 = self.idx;
                                var $2968 = self.code;
                                var $2969 = self.err;
                                var $2970 = Parser$Reply$error$($2967, $2968, $2969);
                                var $2966 = $2970;
                                break;
                            case 'Parser.Reply.value':
                                var $2971 = self.idx;
                                var $2972 = self.code;
                                var $2973 = self.val;
                                var self = Parser$text$("s", $2971, $2972);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $2975 = self.idx;
                                        var $2976 = self.code;
                                        var $2977 = self.err;
                                        var $2978 = Parser$Reply$error$($2975, $2976, $2977);
                                        var $2974 = $2978;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $2979 = self.idx;
                                        var $2980 = self.code;
                                        var _term$15 = Kind$Term$ref$("Nat.to_u16");
                                        var _term$16 = Kind$Term$app$(_term$15, Kind$Term$nat$($2973));
                                        var self = Kind$Parser$stop$($2958, $2979, $2980);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $2982 = self.idx;
                                                var $2983 = self.code;
                                                var $2984 = self.err;
                                                var $2985 = Parser$Reply$error$($2982, $2983, $2984);
                                                var $2981 = $2985;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $2986 = self.idx;
                                                var $2987 = self.code;
                                                var $2988 = self.val;
                                                var $2989 = Parser$Reply$value$($2986, $2987, Kind$Term$ori$($2988, _term$16));
                                                var $2981 = $2989;
                                                break;
                                        };
                                        var $2974 = $2981;
                                        break;
                                };
                                var $2966 = $2974;
                                break;
                        };
                        var $2959 = $2966;
                        break;
                };
                var $2951 = $2959;
                break;
        };
        return $2951;
    };
    const Kind$Parser$u16 = x0 => x1 => Kind$Parser$u16$(x0, x1);

    function Kind$Parser$u32$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $2991 = self.idx;
                var $2992 = self.code;
                var $2993 = self.err;
                var $2994 = Parser$Reply$error$($2991, $2992, $2993);
                var $2990 = $2994;
                break;
            case 'Parser.Reply.value':
                var $2995 = self.idx;
                var $2996 = self.code;
                var $2997 = self.val;
                var self = Kind$Parser$spaces($2995)($2996);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $2999 = self.idx;
                        var $3000 = self.code;
                        var $3001 = self.err;
                        var $3002 = Parser$Reply$error$($2999, $3000, $3001);
                        var $2998 = $3002;
                        break;
                    case 'Parser.Reply.value':
                        var $3003 = self.idx;
                        var $3004 = self.code;
                        var self = Parser$nat$($3003, $3004);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $3006 = self.idx;
                                var $3007 = self.code;
                                var $3008 = self.err;
                                var $3009 = Parser$Reply$error$($3006, $3007, $3008);
                                var $3005 = $3009;
                                break;
                            case 'Parser.Reply.value':
                                var $3010 = self.idx;
                                var $3011 = self.code;
                                var $3012 = self.val;
                                var self = Parser$text$("u", $3010, $3011);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $3014 = self.idx;
                                        var $3015 = self.code;
                                        var $3016 = self.err;
                                        var $3017 = Parser$Reply$error$($3014, $3015, $3016);
                                        var $3013 = $3017;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $3018 = self.idx;
                                        var $3019 = self.code;
                                        var _term$15 = Kind$Term$ref$("Nat.to_u32");
                                        var _term$16 = Kind$Term$app$(_term$15, Kind$Term$nat$($3012));
                                        var self = Kind$Parser$stop$($2997, $3018, $3019);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $3021 = self.idx;
                                                var $3022 = self.code;
                                                var $3023 = self.err;
                                                var $3024 = Parser$Reply$error$($3021, $3022, $3023);
                                                var $3020 = $3024;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $3025 = self.idx;
                                                var $3026 = self.code;
                                                var $3027 = self.val;
                                                var $3028 = Parser$Reply$value$($3025, $3026, Kind$Term$ori$($3027, _term$16));
                                                var $3020 = $3028;
                                                break;
                                        };
                                        var $3013 = $3020;
                                        break;
                                };
                                var $3005 = $3013;
                                break;
                        };
                        var $2998 = $3005;
                        break;
                };
                var $2990 = $2998;
                break;
        };
        return $2990;
    };
    const Kind$Parser$u32 = x0 => x1 => Kind$Parser$u32$(x0, x1);

    function Kind$Parser$u64$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $3030 = self.idx;
                var $3031 = self.code;
                var $3032 = self.err;
                var $3033 = Parser$Reply$error$($3030, $3031, $3032);
                var $3029 = $3033;
                break;
            case 'Parser.Reply.value':
                var $3034 = self.idx;
                var $3035 = self.code;
                var $3036 = self.val;
                var self = Kind$Parser$spaces($3034)($3035);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $3038 = self.idx;
                        var $3039 = self.code;
                        var $3040 = self.err;
                        var $3041 = Parser$Reply$error$($3038, $3039, $3040);
                        var $3037 = $3041;
                        break;
                    case 'Parser.Reply.value':
                        var $3042 = self.idx;
                        var $3043 = self.code;
                        var self = Parser$nat$($3042, $3043);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $3045 = self.idx;
                                var $3046 = self.code;
                                var $3047 = self.err;
                                var $3048 = Parser$Reply$error$($3045, $3046, $3047);
                                var $3044 = $3048;
                                break;
                            case 'Parser.Reply.value':
                                var $3049 = self.idx;
                                var $3050 = self.code;
                                var $3051 = self.val;
                                var self = Parser$text$("l", $3049, $3050);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $3053 = self.idx;
                                        var $3054 = self.code;
                                        var $3055 = self.err;
                                        var $3056 = Parser$Reply$error$($3053, $3054, $3055);
                                        var $3052 = $3056;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $3057 = self.idx;
                                        var $3058 = self.code;
                                        var _term$15 = Kind$Term$ref$("Nat.to_u64");
                                        var _term$16 = Kind$Term$app$(_term$15, Kind$Term$nat$($3051));
                                        var self = Kind$Parser$stop$($3036, $3057, $3058);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $3060 = self.idx;
                                                var $3061 = self.code;
                                                var $3062 = self.err;
                                                var $3063 = Parser$Reply$error$($3060, $3061, $3062);
                                                var $3059 = $3063;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $3064 = self.idx;
                                                var $3065 = self.code;
                                                var $3066 = self.val;
                                                var $3067 = Parser$Reply$value$($3064, $3065, Kind$Term$ori$($3066, _term$16));
                                                var $3059 = $3067;
                                                break;
                                        };
                                        var $3052 = $3059;
                                        break;
                                };
                                var $3044 = $3052;
                                break;
                        };
                        var $3037 = $3044;
                        break;
                };
                var $3029 = $3037;
                break;
        };
        return $3029;
    };
    const Kind$Parser$u64 = x0 => x1 => Kind$Parser$u64$(x0, x1);

    function Kind$Parser$nat$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $3069 = self.idx;
                var $3070 = self.code;
                var $3071 = self.err;
                var $3072 = Parser$Reply$error$($3069, $3070, $3071);
                var $3068 = $3072;
                break;
            case 'Parser.Reply.value':
                var $3073 = self.idx;
                var $3074 = self.code;
                var $3075 = self.val;
                var self = Kind$Parser$spaces($3073)($3074);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $3077 = self.idx;
                        var $3078 = self.code;
                        var $3079 = self.err;
                        var $3080 = Parser$Reply$error$($3077, $3078, $3079);
                        var $3076 = $3080;
                        break;
                    case 'Parser.Reply.value':
                        var $3081 = self.idx;
                        var $3082 = self.code;
                        var self = Parser$nat$($3081, $3082);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $3084 = self.idx;
                                var $3085 = self.code;
                                var $3086 = self.err;
                                var $3087 = Parser$Reply$error$($3084, $3085, $3086);
                                var $3083 = $3087;
                                break;
                            case 'Parser.Reply.value':
                                var $3088 = self.idx;
                                var $3089 = self.code;
                                var $3090 = self.val;
                                var self = Kind$Parser$stop$($3075, $3088, $3089);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $3092 = self.idx;
                                        var $3093 = self.code;
                                        var $3094 = self.err;
                                        var $3095 = Parser$Reply$error$($3092, $3093, $3094);
                                        var $3091 = $3095;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $3096 = self.idx;
                                        var $3097 = self.code;
                                        var $3098 = self.val;
                                        var $3099 = Parser$Reply$value$($3096, $3097, Kind$Term$ori$($3098, Kind$Term$nat$($3090)));
                                        var $3091 = $3099;
                                        break;
                                };
                                var $3083 = $3091;
                                break;
                        };
                        var $3076 = $3083;
                        break;
                };
                var $3068 = $3076;
                break;
        };
        return $3068;
    };
    const Kind$Parser$nat = x0 => x1 => Kind$Parser$nat$(x0, x1);
    const String$eql = a0 => a1 => (a0 === a1);

    function Parser$fail$(_error$2, _idx$3, _code$4) {
        var $3100 = Parser$Reply$error$(_idx$3, _code$4, _error$2);
        return $3100;
    };
    const Parser$fail = x0 => x1 => x2 => Parser$fail$(x0, x1, x2);

    function Kind$Parser$reference$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $3102 = self.idx;
                var $3103 = self.code;
                var $3104 = self.err;
                var $3105 = Parser$Reply$error$($3102, $3103, $3104);
                var $3101 = $3105;
                break;
            case 'Parser.Reply.value':
                var $3106 = self.idx;
                var $3107 = self.code;
                var $3108 = self.val;
                var self = Kind$Parser$name1$($3106, $3107);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $3110 = self.idx;
                        var $3111 = self.code;
                        var $3112 = self.err;
                        var $3113 = Parser$Reply$error$($3110, $3111, $3112);
                        var $3109 = $3113;
                        break;
                    case 'Parser.Reply.value':
                        var $3114 = self.idx;
                        var $3115 = self.code;
                        var $3116 = self.val;
                        var self = ($3116 === "case");
                        if (self) {
                            var $3118 = Parser$fail("Reserved keyword.");
                            var $3117 = $3118;
                        } else {
                            var self = ($3116 === "do");
                            if (self) {
                                var $3120 = Parser$fail("Reserved keyword.");
                                var $3119 = $3120;
                            } else {
                                var self = ($3116 === "if");
                                if (self) {
                                    var $3122 = Parser$fail("Reserved keyword.");
                                    var $3121 = $3122;
                                } else {
                                    var self = ($3116 === "with");
                                    if (self) {
                                        var $3124 = Parser$fail("Reserved keyword.");
                                        var $3123 = $3124;
                                    } else {
                                        var self = ($3116 === "let");
                                        if (self) {
                                            var $3126 = Parser$fail("Reserved keyword.");
                                            var $3125 = $3126;
                                        } else {
                                            var self = ($3116 === "def");
                                            if (self) {
                                                var $3128 = Parser$fail("Reserved keyword.");
                                                var $3127 = $3128;
                                            } else {
                                                var self = ($3116 === "true");
                                                if (self) {
                                                    var $3130 = (_idx$9 => _code$10 => {
                                                        var $3131 = Parser$Reply$value$(_idx$9, _code$10, Kind$Term$ref$("Bool.true"));
                                                        return $3131;
                                                    });
                                                    var $3129 = $3130;
                                                } else {
                                                    var self = ($3116 === "false");
                                                    if (self) {
                                                        var $3133 = (_idx$9 => _code$10 => {
                                                            var $3134 = Parser$Reply$value$(_idx$9, _code$10, Kind$Term$ref$("Bool.false"));
                                                            return $3134;
                                                        });
                                                        var $3132 = $3133;
                                                    } else {
                                                        var self = ($3116 === "unit");
                                                        if (self) {
                                                            var $3136 = (_idx$9 => _code$10 => {
                                                                var $3137 = Parser$Reply$value$(_idx$9, _code$10, Kind$Term$ref$("Unit.new"));
                                                                return $3137;
                                                            });
                                                            var $3135 = $3136;
                                                        } else {
                                                            var self = ($3116 === "none");
                                                            if (self) {
                                                                var _term$9 = Kind$Term$ref$("Maybe.none");
                                                                var _term$10 = Kind$Term$app$(_term$9, Kind$Term$hol$(Bits$e));
                                                                var $3139 = (_idx$11 => _code$12 => {
                                                                    var $3140 = Parser$Reply$value$(_idx$11, _code$12, _term$10);
                                                                    return $3140;
                                                                });
                                                                var $3138 = $3139;
                                                            } else {
                                                                var self = ($3116 === "refl");
                                                                if (self) {
                                                                    var _term$9 = Kind$Term$ref$("Equal.refl");
                                                                    var _term$10 = Kind$Term$app$(_term$9, Kind$Term$hol$(Bits$e));
                                                                    var _term$11 = Kind$Term$app$(_term$10, Kind$Term$hol$(Bits$e));
                                                                    var $3142 = (_idx$12 => _code$13 => {
                                                                        var $3143 = Parser$Reply$value$(_idx$12, _code$13, _term$11);
                                                                        return $3143;
                                                                    });
                                                                    var $3141 = $3142;
                                                                } else {
                                                                    var $3144 = (_idx$9 => _code$10 => {
                                                                        var self = Kind$Parser$stop$($3108, _idx$9, _code$10);
                                                                        switch (self._) {
                                                                            case 'Parser.Reply.error':
                                                                                var $3146 = self.idx;
                                                                                var $3147 = self.code;
                                                                                var $3148 = self.err;
                                                                                var $3149 = Parser$Reply$error$($3146, $3147, $3148);
                                                                                var $3145 = $3149;
                                                                                break;
                                                                            case 'Parser.Reply.value':
                                                                                var $3150 = self.idx;
                                                                                var $3151 = self.code;
                                                                                var $3152 = self.val;
                                                                                var $3153 = Parser$Reply$value$($3150, $3151, Kind$Term$ori$($3152, Kind$Term$ref$($3116)));
                                                                                var $3145 = $3153;
                                                                                break;
                                                                        };
                                                                        return $3145;
                                                                    });
                                                                    var $3141 = $3144;
                                                                };
                                                                var $3138 = $3141;
                                                            };
                                                            var $3135 = $3138;
                                                        };
                                                        var $3132 = $3135;
                                                    };
                                                    var $3129 = $3132;
                                                };
                                                var $3127 = $3129;
                                            };
                                            var $3125 = $3127;
                                        };
                                        var $3123 = $3125;
                                    };
                                    var $3121 = $3123;
                                };
                                var $3119 = $3121;
                            };
                            var $3117 = $3119;
                        };
                        var $3117 = $3117($3114)($3115);
                        var $3109 = $3117;
                        break;
                };
                var $3101 = $3109;
                break;
        };
        return $3101;
    };
    const Kind$Parser$reference = x0 => x1 => Kind$Parser$reference$(x0, x1);
    const List$for = a0 => a1 => a2 => (list_for(a0)(a1)(a2));

    function Kind$Parser$application$(_init$1, _func$2, _idx$3, _code$4) {
        var self = Parser$text$("(", _idx$3, _code$4);
        switch (self._) {
            case 'Parser.Reply.error':
                var $3155 = self.idx;
                var $3156 = self.code;
                var $3157 = self.err;
                var $3158 = Parser$Reply$error$($3155, $3156, $3157);
                var $3154 = $3158;
                break;
            case 'Parser.Reply.value':
                var $3159 = self.idx;
                var $3160 = self.code;
                var self = Parser$until1$(Kind$Parser$text(")"), Kind$Parser$item(Kind$Parser$term), $3159, $3160);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $3162 = self.idx;
                        var $3163 = self.code;
                        var $3164 = self.err;
                        var $3165 = Parser$Reply$error$($3162, $3163, $3164);
                        var $3161 = $3165;
                        break;
                    case 'Parser.Reply.value':
                        var $3166 = self.idx;
                        var $3167 = self.code;
                        var $3168 = self.val;
                        var self = Kind$Parser$stop$(_init$1, $3166, $3167);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $3170 = self.idx;
                                var $3171 = self.code;
                                var $3172 = self.err;
                                var $3173 = Parser$Reply$error$($3170, $3171, $3172);
                                var $3169 = $3173;
                                break;
                            case 'Parser.Reply.value':
                                var $3174 = self.idx;
                                var $3175 = self.code;
                                var $3176 = self.val;
                                var _expr$14 = (() => {
                                    var $3179 = _func$2;
                                    var $3180 = $3168;
                                    let _f$15 = $3179;
                                    let _x$14;
                                    while ($3180._ === 'List.cons') {
                                        _x$14 = $3180.head;
                                        var $3179 = Kind$Term$app$(_f$15, _x$14);
                                        _f$15 = $3179;
                                        $3180 = $3180.tail;
                                    }
                                    return _f$15;
                                })();
                                var $3177 = Parser$Reply$value$($3174, $3175, Kind$Term$ori$($3176, _expr$14));
                                var $3169 = $3177;
                                break;
                        };
                        var $3161 = $3169;
                        break;
                };
                var $3154 = $3161;
                break;
        };
        return $3154;
    };
    const Kind$Parser$application = x0 => x1 => x2 => x3 => Kind$Parser$application$(x0, x1, x2, x3);
    const Parser$spaces = Parser$many$(Parser$first_of$(List$cons$(Parser$text(" "), List$cons$(Parser$text("\u{a}"), List$nil))));

    function Parser$spaces_text$(_text$1, _idx$2, _code$3) {
        var self = Parser$spaces(_idx$2)(_code$3);
        switch (self._) {
            case 'Parser.Reply.error':
                var $3182 = self.idx;
                var $3183 = self.code;
                var $3184 = self.err;
                var $3185 = Parser$Reply$error$($3182, $3183, $3184);
                var $3181 = $3185;
                break;
            case 'Parser.Reply.value':
                var $3186 = self.idx;
                var $3187 = self.code;
                var $3188 = Parser$text$(_text$1, $3186, $3187);
                var $3181 = $3188;
                break;
        };
        return $3181;
    };
    const Parser$spaces_text = x0 => x1 => x2 => Parser$spaces_text$(x0, x1, x2);

    function Kind$Parser$application$erased$(_init$1, _func$2, _idx$3, _code$4) {
        var self = Parser$get_index$(_idx$3, _code$4);
        switch (self._) {
            case 'Parser.Reply.error':
                var $3190 = self.idx;
                var $3191 = self.code;
                var $3192 = self.err;
                var $3193 = Parser$Reply$error$($3190, $3191, $3192);
                var $3189 = $3193;
                break;
            case 'Parser.Reply.value':
                var $3194 = self.idx;
                var $3195 = self.code;
                var $3196 = self.val;
                var self = Parser$text$("<", $3194, $3195);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $3198 = self.idx;
                        var $3199 = self.code;
                        var $3200 = self.err;
                        var $3201 = Parser$Reply$error$($3198, $3199, $3200);
                        var $3197 = $3201;
                        break;
                    case 'Parser.Reply.value':
                        var $3202 = self.idx;
                        var $3203 = self.code;
                        var self = Parser$until1$(Parser$spaces_text(">"), Kind$Parser$item(Kind$Parser$term), $3202, $3203);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $3205 = self.idx;
                                var $3206 = self.code;
                                var $3207 = self.err;
                                var $3208 = Parser$Reply$error$($3205, $3206, $3207);
                                var $3204 = $3208;
                                break;
                            case 'Parser.Reply.value':
                                var $3209 = self.idx;
                                var $3210 = self.code;
                                var $3211 = self.val;
                                var self = Kind$Parser$stop$($3196, $3209, $3210);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $3213 = self.idx;
                                        var $3214 = self.code;
                                        var $3215 = self.err;
                                        var $3216 = Parser$Reply$error$($3213, $3214, $3215);
                                        var $3212 = $3216;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $3217 = self.idx;
                                        var $3218 = self.code;
                                        var $3219 = self.val;
                                        var _expr$17 = (() => {
                                            var $3222 = _func$2;
                                            var $3223 = $3211;
                                            let _f$18 = $3222;
                                            let _x$17;
                                            while ($3223._ === 'List.cons') {
                                                _x$17 = $3223.head;
                                                var $3222 = Kind$Term$app$(_f$18, _x$17);
                                                _f$18 = $3222;
                                                $3223 = $3223.tail;
                                            }
                                            return _f$18;
                                        })();
                                        var $3220 = Parser$Reply$value$($3217, $3218, Kind$Term$ori$($3219, _expr$17));
                                        var $3212 = $3220;
                                        break;
                                };
                                var $3204 = $3212;
                                break;
                        };
                        var $3197 = $3204;
                        break;
                };
                var $3189 = $3197;
                break;
        };
        return $3189;
    };
    const Kind$Parser$application$erased = x0 => x1 => x2 => x3 => Kind$Parser$application$erased$(x0, x1, x2, x3);

    function Kind$Parser$arrow$(_init$1, _xtyp$2, _idx$3, _code$4) {
        var self = Kind$Parser$text$("->", _idx$3, _code$4);
        switch (self._) {
            case 'Parser.Reply.error':
                var $3225 = self.idx;
                var $3226 = self.code;
                var $3227 = self.err;
                var $3228 = Parser$Reply$error$($3225, $3226, $3227);
                var $3224 = $3228;
                break;
            case 'Parser.Reply.value':
                var $3229 = self.idx;
                var $3230 = self.code;
                var self = Kind$Parser$term$($3229, $3230);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $3232 = self.idx;
                        var $3233 = self.code;
                        var $3234 = self.err;
                        var $3235 = Parser$Reply$error$($3232, $3233, $3234);
                        var $3231 = $3235;
                        break;
                    case 'Parser.Reply.value':
                        var $3236 = self.idx;
                        var $3237 = self.code;
                        var $3238 = self.val;
                        var self = Kind$Parser$stop$(_init$1, $3236, $3237);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $3240 = self.idx;
                                var $3241 = self.code;
                                var $3242 = self.err;
                                var $3243 = Parser$Reply$error$($3240, $3241, $3242);
                                var $3239 = $3243;
                                break;
                            case 'Parser.Reply.value':
                                var $3244 = self.idx;
                                var $3245 = self.code;
                                var $3246 = self.val;
                                var $3247 = Parser$Reply$value$($3244, $3245, Kind$Term$ori$($3246, Kind$Term$all$(Bool$false, "", "", _xtyp$2, (_s$14 => _x$15 => {
                                    var $3248 = $3238;
                                    return $3248;
                                }))));
                                var $3239 = $3247;
                                break;
                        };
                        var $3231 = $3239;
                        break;
                };
                var $3224 = $3231;
                break;
        };
        return $3224;
    };
    const Kind$Parser$arrow = x0 => x1 => x2 => x3 => Kind$Parser$arrow$(x0, x1, x2, x3);

    function Kind$Parser$op$(_sym$1, _ref$2, _init$3, _val0$4, _idx$5, _code$6) {
        var self = Kind$Parser$text$(_sym$1, _idx$5, _code$6);
        switch (self._) {
            case 'Parser.Reply.error':
                var $3250 = self.idx;
                var $3251 = self.code;
                var $3252 = self.err;
                var $3253 = Parser$Reply$error$($3250, $3251, $3252);
                var $3249 = $3253;
                break;
            case 'Parser.Reply.value':
                var $3254 = self.idx;
                var $3255 = self.code;
                var self = Kind$Parser$term$($3254, $3255);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $3257 = self.idx;
                        var $3258 = self.code;
                        var $3259 = self.err;
                        var $3260 = Parser$Reply$error$($3257, $3258, $3259);
                        var $3256 = $3260;
                        break;
                    case 'Parser.Reply.value':
                        var $3261 = self.idx;
                        var $3262 = self.code;
                        var $3263 = self.val;
                        var self = Kind$Parser$stop$(_init$3, $3261, $3262);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $3265 = self.idx;
                                var $3266 = self.code;
                                var $3267 = self.err;
                                var $3268 = Parser$Reply$error$($3265, $3266, $3267);
                                var $3264 = $3268;
                                break;
                            case 'Parser.Reply.value':
                                var $3269 = self.idx;
                                var $3270 = self.code;
                                var $3271 = self.val;
                                var _term$16 = Kind$Term$ref$(_ref$2);
                                var _term$17 = Kind$Term$app$(_term$16, _val0$4);
                                var _term$18 = Kind$Term$app$(_term$17, $3263);
                                var $3272 = Parser$Reply$value$($3269, $3270, Kind$Term$ori$($3271, _term$18));
                                var $3264 = $3272;
                                break;
                        };
                        var $3256 = $3264;
                        break;
                };
                var $3249 = $3256;
                break;
        };
        return $3249;
    };
    const Kind$Parser$op = x0 => x1 => x2 => x3 => x4 => x5 => Kind$Parser$op$(x0, x1, x2, x3, x4, x5);
    const Kind$Parser$add = Kind$Parser$op("+")("Nat.add");
    const Kind$Parser$sub = Kind$Parser$op("+")("Nat.add");
    const Kind$Parser$mul = Kind$Parser$op("*")("Nat.mul");
    const Kind$Parser$div = Kind$Parser$op("/")("Nat.div");
    const Kind$Parser$mod = Kind$Parser$op("%")("Nat.mod");

    function Kind$Parser$cons$(_init$1, _head$2, _idx$3, _code$4) {
        var self = Kind$Parser$text$("&", _idx$3, _code$4);
        switch (self._) {
            case 'Parser.Reply.error':
                var $3274 = self.idx;
                var $3275 = self.code;
                var $3276 = self.err;
                var $3277 = Parser$Reply$error$($3274, $3275, $3276);
                var $3273 = $3277;
                break;
            case 'Parser.Reply.value':
                var $3278 = self.idx;
                var $3279 = self.code;
                var self = Kind$Parser$term$($3278, $3279);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $3281 = self.idx;
                        var $3282 = self.code;
                        var $3283 = self.err;
                        var $3284 = Parser$Reply$error$($3281, $3282, $3283);
                        var $3280 = $3284;
                        break;
                    case 'Parser.Reply.value':
                        var $3285 = self.idx;
                        var $3286 = self.code;
                        var $3287 = self.val;
                        var self = Kind$Parser$stop$(_init$1, $3285, $3286);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $3289 = self.idx;
                                var $3290 = self.code;
                                var $3291 = self.err;
                                var $3292 = Parser$Reply$error$($3289, $3290, $3291);
                                var $3288 = $3292;
                                break;
                            case 'Parser.Reply.value':
                                var $3293 = self.idx;
                                var $3294 = self.code;
                                var _term$14 = Kind$Term$ref$("List.cons");
                                var _term$15 = Kind$Term$app$(_term$14, Kind$Term$hol$(Bits$e));
                                var _term$16 = Kind$Term$app$(_term$15, _head$2);
                                var _term$17 = Kind$Term$app$(_term$16, $3287);
                                var self = Kind$Parser$stop$(_init$1, $3293, $3294);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $3296 = self.idx;
                                        var $3297 = self.code;
                                        var $3298 = self.err;
                                        var $3299 = Parser$Reply$error$($3296, $3297, $3298);
                                        var $3295 = $3299;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $3300 = self.idx;
                                        var $3301 = self.code;
                                        var $3302 = self.val;
                                        var $3303 = Parser$Reply$value$($3300, $3301, Kind$Term$ori$($3302, _term$17));
                                        var $3295 = $3303;
                                        break;
                                };
                                var $3288 = $3295;
                                break;
                        };
                        var $3280 = $3288;
                        break;
                };
                var $3273 = $3280;
                break;
        };
        return $3273;
    };
    const Kind$Parser$cons = x0 => x1 => x2 => x3 => Kind$Parser$cons$(x0, x1, x2, x3);

    function Kind$Parser$concat$(_init$1, _lst0$2, _idx$3, _code$4) {
        var self = Kind$Parser$text$("++", _idx$3, _code$4);
        switch (self._) {
            case 'Parser.Reply.error':
                var $3305 = self.idx;
                var $3306 = self.code;
                var $3307 = self.err;
                var $3308 = Parser$Reply$error$($3305, $3306, $3307);
                var $3304 = $3308;
                break;
            case 'Parser.Reply.value':
                var $3309 = self.idx;
                var $3310 = self.code;
                var self = Kind$Parser$term$($3309, $3310);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $3312 = self.idx;
                        var $3313 = self.code;
                        var $3314 = self.err;
                        var $3315 = Parser$Reply$error$($3312, $3313, $3314);
                        var $3311 = $3315;
                        break;
                    case 'Parser.Reply.value':
                        var $3316 = self.idx;
                        var $3317 = self.code;
                        var $3318 = self.val;
                        var self = Kind$Parser$stop$(_init$1, $3316, $3317);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $3320 = self.idx;
                                var $3321 = self.code;
                                var $3322 = self.err;
                                var $3323 = Parser$Reply$error$($3320, $3321, $3322);
                                var $3319 = $3323;
                                break;
                            case 'Parser.Reply.value':
                                var $3324 = self.idx;
                                var $3325 = self.code;
                                var _term$14 = Kind$Term$ref$("List.concat");
                                var _term$15 = Kind$Term$app$(_term$14, Kind$Term$hol$(Bits$e));
                                var _term$16 = Kind$Term$app$(_term$15, _lst0$2);
                                var _term$17 = Kind$Term$app$(_term$16, $3318);
                                var self = Kind$Parser$stop$(_init$1, $3324, $3325);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $3327 = self.idx;
                                        var $3328 = self.code;
                                        var $3329 = self.err;
                                        var $3330 = Parser$Reply$error$($3327, $3328, $3329);
                                        var $3326 = $3330;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $3331 = self.idx;
                                        var $3332 = self.code;
                                        var $3333 = self.val;
                                        var $3334 = Parser$Reply$value$($3331, $3332, Kind$Term$ori$($3333, _term$17));
                                        var $3326 = $3334;
                                        break;
                                };
                                var $3319 = $3326;
                                break;
                        };
                        var $3311 = $3319;
                        break;
                };
                var $3304 = $3311;
                break;
        };
        return $3304;
    };
    const Kind$Parser$concat = x0 => x1 => x2 => x3 => Kind$Parser$concat$(x0, x1, x2, x3);

    function Kind$Parser$string_concat$(_init$1, _str0$2, _idx$3, _code$4) {
        var self = Kind$Parser$text$("|", _idx$3, _code$4);
        switch (self._) {
            case 'Parser.Reply.error':
                var $3336 = self.idx;
                var $3337 = self.code;
                var $3338 = self.err;
                var $3339 = Parser$Reply$error$($3336, $3337, $3338);
                var $3335 = $3339;
                break;
            case 'Parser.Reply.value':
                var $3340 = self.idx;
                var $3341 = self.code;
                var self = Kind$Parser$term$($3340, $3341);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $3343 = self.idx;
                        var $3344 = self.code;
                        var $3345 = self.err;
                        var $3346 = Parser$Reply$error$($3343, $3344, $3345);
                        var $3342 = $3346;
                        break;
                    case 'Parser.Reply.value':
                        var $3347 = self.idx;
                        var $3348 = self.code;
                        var $3349 = self.val;
                        var self = Kind$Parser$stop$(_init$1, $3347, $3348);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $3351 = self.idx;
                                var $3352 = self.code;
                                var $3353 = self.err;
                                var $3354 = Parser$Reply$error$($3351, $3352, $3353);
                                var $3350 = $3354;
                                break;
                            case 'Parser.Reply.value':
                                var $3355 = self.idx;
                                var $3356 = self.code;
                                var _term$14 = Kind$Term$ref$("String.concat");
                                var _term$15 = Kind$Term$app$(_term$14, _str0$2);
                                var _term$16 = Kind$Term$app$(_term$15, $3349);
                                var self = Kind$Parser$stop$(_init$1, $3355, $3356);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $3358 = self.idx;
                                        var $3359 = self.code;
                                        var $3360 = self.err;
                                        var $3361 = Parser$Reply$error$($3358, $3359, $3360);
                                        var $3357 = $3361;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $3362 = self.idx;
                                        var $3363 = self.code;
                                        var $3364 = self.val;
                                        var $3365 = Parser$Reply$value$($3362, $3363, Kind$Term$ori$($3364, _term$16));
                                        var $3357 = $3365;
                                        break;
                                };
                                var $3350 = $3357;
                                break;
                        };
                        var $3342 = $3350;
                        break;
                };
                var $3335 = $3342;
                break;
        };
        return $3335;
    };
    const Kind$Parser$string_concat = x0 => x1 => x2 => x3 => Kind$Parser$string_concat$(x0, x1, x2, x3);

    function Kind$Parser$sigma$(_init$1, _val0$2, _idx$3, _code$4) {
        var self = Kind$Parser$text$("~", _idx$3, _code$4);
        switch (self._) {
            case 'Parser.Reply.error':
                var $3367 = self.idx;
                var $3368 = self.code;
                var $3369 = self.err;
                var $3370 = Parser$Reply$error$($3367, $3368, $3369);
                var $3366 = $3370;
                break;
            case 'Parser.Reply.value':
                var $3371 = self.idx;
                var $3372 = self.code;
                var self = Kind$Parser$term$($3371, $3372);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $3374 = self.idx;
                        var $3375 = self.code;
                        var $3376 = self.err;
                        var $3377 = Parser$Reply$error$($3374, $3375, $3376);
                        var $3373 = $3377;
                        break;
                    case 'Parser.Reply.value':
                        var $3378 = self.idx;
                        var $3379 = self.code;
                        var $3380 = self.val;
                        var self = Kind$Parser$stop$(_init$1, $3378, $3379);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $3382 = self.idx;
                                var $3383 = self.code;
                                var $3384 = self.err;
                                var $3385 = Parser$Reply$error$($3382, $3383, $3384);
                                var $3381 = $3385;
                                break;
                            case 'Parser.Reply.value':
                                var $3386 = self.idx;
                                var $3387 = self.code;
                                var $3388 = self.val;
                                var _term$14 = Kind$Term$ref$("Sigma.new");
                                var _term$15 = Kind$Term$app$(_term$14, Kind$Term$hol$(Bits$e));
                                var _term$16 = Kind$Term$app$(_term$15, Kind$Term$hol$(Bits$e));
                                var _term$17 = Kind$Term$app$(_term$16, _val0$2);
                                var _term$18 = Kind$Term$app$(_term$17, $3380);
                                var $3389 = Parser$Reply$value$($3386, $3387, Kind$Term$ori$($3388, _term$18));
                                var $3381 = $3389;
                                break;
                        };
                        var $3373 = $3381;
                        break;
                };
                var $3366 = $3373;
                break;
        };
        return $3366;
    };
    const Kind$Parser$sigma = x0 => x1 => x2 => x3 => Kind$Parser$sigma$(x0, x1, x2, x3);

    function Kind$Parser$equality$(_init$1, _val0$2, _idx$3, _code$4) {
        var self = Kind$Parser$text$("==", _idx$3, _code$4);
        switch (self._) {
            case 'Parser.Reply.error':
                var $3391 = self.idx;
                var $3392 = self.code;
                var $3393 = self.err;
                var $3394 = Parser$Reply$error$($3391, $3392, $3393);
                var $3390 = $3394;
                break;
            case 'Parser.Reply.value':
                var $3395 = self.idx;
                var $3396 = self.code;
                var self = Kind$Parser$term$($3395, $3396);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $3398 = self.idx;
                        var $3399 = self.code;
                        var $3400 = self.err;
                        var $3401 = Parser$Reply$error$($3398, $3399, $3400);
                        var $3397 = $3401;
                        break;
                    case 'Parser.Reply.value':
                        var $3402 = self.idx;
                        var $3403 = self.code;
                        var $3404 = self.val;
                        var self = Kind$Parser$stop$(_init$1, $3402, $3403);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $3406 = self.idx;
                                var $3407 = self.code;
                                var $3408 = self.err;
                                var $3409 = Parser$Reply$error$($3406, $3407, $3408);
                                var $3405 = $3409;
                                break;
                            case 'Parser.Reply.value':
                                var $3410 = self.idx;
                                var $3411 = self.code;
                                var $3412 = self.val;
                                var _term$14 = Kind$Term$ref$("Equal");
                                var _term$15 = Kind$Term$app$(_term$14, Kind$Term$hol$(Bits$e));
                                var _term$16 = Kind$Term$app$(_term$15, _val0$2);
                                var _term$17 = Kind$Term$app$(_term$16, $3404);
                                var $3413 = Parser$Reply$value$($3410, $3411, Kind$Term$ori$($3412, _term$17));
                                var $3405 = $3413;
                                break;
                        };
                        var $3397 = $3405;
                        break;
                };
                var $3390 = $3397;
                break;
        };
        return $3390;
    };
    const Kind$Parser$equality = x0 => x1 => x2 => x3 => Kind$Parser$equality$(x0, x1, x2, x3);

    function Kind$Parser$inequality$(_init$1, _val0$2, _idx$3, _code$4) {
        var self = Kind$Parser$text$("!=", _idx$3, _code$4);
        switch (self._) {
            case 'Parser.Reply.error':
                var $3415 = self.idx;
                var $3416 = self.code;
                var $3417 = self.err;
                var $3418 = Parser$Reply$error$($3415, $3416, $3417);
                var $3414 = $3418;
                break;
            case 'Parser.Reply.value':
                var $3419 = self.idx;
                var $3420 = self.code;
                var self = Kind$Parser$term$($3419, $3420);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $3422 = self.idx;
                        var $3423 = self.code;
                        var $3424 = self.err;
                        var $3425 = Parser$Reply$error$($3422, $3423, $3424);
                        var $3421 = $3425;
                        break;
                    case 'Parser.Reply.value':
                        var $3426 = self.idx;
                        var $3427 = self.code;
                        var $3428 = self.val;
                        var self = Kind$Parser$stop$(_init$1, $3426, $3427);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $3430 = self.idx;
                                var $3431 = self.code;
                                var $3432 = self.err;
                                var $3433 = Parser$Reply$error$($3430, $3431, $3432);
                                var $3429 = $3433;
                                break;
                            case 'Parser.Reply.value':
                                var $3434 = self.idx;
                                var $3435 = self.code;
                                var $3436 = self.val;
                                var _term$14 = Kind$Term$ref$("Equal");
                                var _term$15 = Kind$Term$app$(_term$14, Kind$Term$hol$(Bits$e));
                                var _term$16 = Kind$Term$app$(_term$15, _val0$2);
                                var _term$17 = Kind$Term$app$(_term$16, $3428);
                                var _term$18 = Kind$Term$app$(Kind$Term$ref$("Not"), _term$17);
                                var $3437 = Parser$Reply$value$($3434, $3435, Kind$Term$ori$($3436, _term$18));
                                var $3429 = $3437;
                                break;
                        };
                        var $3421 = $3429;
                        break;
                };
                var $3414 = $3421;
                break;
        };
        return $3414;
    };
    const Kind$Parser$inequality = x0 => x1 => x2 => x3 => Kind$Parser$inequality$(x0, x1, x2, x3);

    function Kind$Parser$rewrite$(_init$1, _subt$2, _idx$3, _code$4) {
        var self = Kind$Parser$text$("::", _idx$3, _code$4);
        switch (self._) {
            case 'Parser.Reply.error':
                var $3439 = self.idx;
                var $3440 = self.code;
                var $3441 = self.err;
                var $3442 = Parser$Reply$error$($3439, $3440, $3441);
                var $3438 = $3442;
                break;
            case 'Parser.Reply.value':
                var $3443 = self.idx;
                var $3444 = self.code;
                var self = Kind$Parser$text$("rewrite", $3443, $3444);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $3446 = self.idx;
                        var $3447 = self.code;
                        var $3448 = self.err;
                        var $3449 = Parser$Reply$error$($3446, $3447, $3448);
                        var $3445 = $3449;
                        break;
                    case 'Parser.Reply.value':
                        var $3450 = self.idx;
                        var $3451 = self.code;
                        var self = Kind$Parser$name1$($3450, $3451);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $3453 = self.idx;
                                var $3454 = self.code;
                                var $3455 = self.err;
                                var $3456 = Parser$Reply$error$($3453, $3454, $3455);
                                var $3452 = $3456;
                                break;
                            case 'Parser.Reply.value':
                                var $3457 = self.idx;
                                var $3458 = self.code;
                                var $3459 = self.val;
                                var self = Kind$Parser$text$("in", $3457, $3458);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $3461 = self.idx;
                                        var $3462 = self.code;
                                        var $3463 = self.err;
                                        var $3464 = Parser$Reply$error$($3461, $3462, $3463);
                                        var $3460 = $3464;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $3465 = self.idx;
                                        var $3466 = self.code;
                                        var self = Kind$Parser$term$($3465, $3466);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $3468 = self.idx;
                                                var $3469 = self.code;
                                                var $3470 = self.err;
                                                var $3471 = Parser$Reply$error$($3468, $3469, $3470);
                                                var $3467 = $3471;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $3472 = self.idx;
                                                var $3473 = self.code;
                                                var $3474 = self.val;
                                                var self = Kind$Parser$text$("with", $3472, $3473);
                                                switch (self._) {
                                                    case 'Parser.Reply.error':
                                                        var $3476 = self.idx;
                                                        var $3477 = self.code;
                                                        var $3478 = self.err;
                                                        var $3479 = Parser$Reply$error$($3476, $3477, $3478);
                                                        var $3475 = $3479;
                                                        break;
                                                    case 'Parser.Reply.value':
                                                        var $3480 = self.idx;
                                                        var $3481 = self.code;
                                                        var self = Kind$Parser$term$($3480, $3481);
                                                        switch (self._) {
                                                            case 'Parser.Reply.error':
                                                                var $3483 = self.idx;
                                                                var $3484 = self.code;
                                                                var $3485 = self.err;
                                                                var $3486 = Parser$Reply$error$($3483, $3484, $3485);
                                                                var $3482 = $3486;
                                                                break;
                                                            case 'Parser.Reply.value':
                                                                var $3487 = self.idx;
                                                                var $3488 = self.code;
                                                                var $3489 = self.val;
                                                                var self = Kind$Parser$stop$(_init$1, $3487, $3488);
                                                                switch (self._) {
                                                                    case 'Parser.Reply.error':
                                                                        var $3491 = self.idx;
                                                                        var $3492 = self.code;
                                                                        var $3493 = self.err;
                                                                        var $3494 = Parser$Reply$error$($3491, $3492, $3493);
                                                                        var $3490 = $3494;
                                                                        break;
                                                                    case 'Parser.Reply.value':
                                                                        var $3495 = self.idx;
                                                                        var $3496 = self.code;
                                                                        var $3497 = self.val;
                                                                        var _term$29 = Kind$Term$ref$("Equal.rewrite");
                                                                        var _term$30 = Kind$Term$app$(_term$29, Kind$Term$hol$(Bits$e));
                                                                        var _term$31 = Kind$Term$app$(_term$30, Kind$Term$hol$(Bits$e));
                                                                        var _term$32 = Kind$Term$app$(_term$31, Kind$Term$hol$(Bits$e));
                                                                        var _term$33 = Kind$Term$app$(_term$32, $3489);
                                                                        var _term$34 = Kind$Term$app$(_term$33, Kind$Term$lam$($3459, (_x$34 => {
                                                                            var $3499 = $3474;
                                                                            return $3499;
                                                                        })));
                                                                        var _term$35 = Kind$Term$app$(_term$34, _subt$2);
                                                                        var $3498 = Parser$Reply$value$($3495, $3496, Kind$Term$ori$($3497, _term$35));
                                                                        var $3490 = $3498;
                                                                        break;
                                                                };
                                                                var $3482 = $3490;
                                                                break;
                                                        };
                                                        var $3475 = $3482;
                                                        break;
                                                };
                                                var $3467 = $3475;
                                                break;
                                        };
                                        var $3460 = $3467;
                                        break;
                                };
                                var $3452 = $3460;
                                break;
                        };
                        var $3445 = $3452;
                        break;
                };
                var $3438 = $3445;
                break;
        };
        return $3438;
    };
    const Kind$Parser$rewrite = x0 => x1 => x2 => x3 => Kind$Parser$rewrite$(x0, x1, x2, x3);

    function Kind$Term$ann$(_done$1, _term$2, _type$3) {
        var $3500 = ({
            _: 'Kind.Term.ann',
            'done': _done$1,
            'term': _term$2,
            'type': _type$3
        });
        return $3500;
    };
    const Kind$Term$ann = x0 => x1 => x2 => Kind$Term$ann$(x0, x1, x2);

    function Kind$Parser$annotation$(_init$1, _term$2, _idx$3, _code$4) {
        var self = Kind$Parser$text$("::", _idx$3, _code$4);
        switch (self._) {
            case 'Parser.Reply.error':
                var $3502 = self.idx;
                var $3503 = self.code;
                var $3504 = self.err;
                var $3505 = Parser$Reply$error$($3502, $3503, $3504);
                var $3501 = $3505;
                break;
            case 'Parser.Reply.value':
                var $3506 = self.idx;
                var $3507 = self.code;
                var self = Kind$Parser$term$($3506, $3507);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $3509 = self.idx;
                        var $3510 = self.code;
                        var $3511 = self.err;
                        var $3512 = Parser$Reply$error$($3509, $3510, $3511);
                        var $3508 = $3512;
                        break;
                    case 'Parser.Reply.value':
                        var $3513 = self.idx;
                        var $3514 = self.code;
                        var $3515 = self.val;
                        var self = Kind$Parser$stop$(_init$1, $3513, $3514);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $3517 = self.idx;
                                var $3518 = self.code;
                                var $3519 = self.err;
                                var $3520 = Parser$Reply$error$($3517, $3518, $3519);
                                var $3516 = $3520;
                                break;
                            case 'Parser.Reply.value':
                                var $3521 = self.idx;
                                var $3522 = self.code;
                                var $3523 = self.val;
                                var $3524 = Parser$Reply$value$($3521, $3522, Kind$Term$ori$($3523, Kind$Term$ann$(Bool$false, _term$2, $3515)));
                                var $3516 = $3524;
                                break;
                        };
                        var $3508 = $3516;
                        break;
                };
                var $3501 = $3508;
                break;
        };
        return $3501;
    };
    const Kind$Parser$annotation = x0 => x1 => x2 => x3 => Kind$Parser$annotation$(x0, x1, x2, x3);

    function Kind$Parser$application$hole$(_init$1, _term$2, _idx$3, _code$4) {
        var self = Kind$Parser$text$("!", _idx$3, _code$4);
        switch (self._) {
            case 'Parser.Reply.error':
                var $3526 = self.idx;
                var $3527 = self.code;
                var $3528 = self.err;
                var $3529 = Parser$Reply$error$($3526, $3527, $3528);
                var $3525 = $3529;
                break;
            case 'Parser.Reply.value':
                var $3530 = self.idx;
                var $3531 = self.code;
                var self = Kind$Parser$stop$(_init$1, $3530, $3531);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $3533 = self.idx;
                        var $3534 = self.code;
                        var $3535 = self.err;
                        var $3536 = Parser$Reply$error$($3533, $3534, $3535);
                        var $3532 = $3536;
                        break;
                    case 'Parser.Reply.value':
                        var $3537 = self.idx;
                        var $3538 = self.code;
                        var $3539 = self.val;
                        var $3540 = Parser$Reply$value$($3537, $3538, Kind$Term$ori$($3539, Kind$Term$app$(_term$2, Kind$Term$hol$(Bits$e))));
                        var $3532 = $3540;
                        break;
                };
                var $3525 = $3532;
                break;
        };
        return $3525;
    };
    const Kind$Parser$application$hole = x0 => x1 => x2 => x3 => Kind$Parser$application$hole$(x0, x1, x2, x3);

    function Kind$Parser$suffix$(_init$1, _term$2, _idx$3, _code$4) {
        var Kind$Parser$suffix$ = (_init$1, _term$2, _idx$3, _code$4) => ({
            ctr: 'TCO',
            arg: [_init$1, _term$2, _idx$3, _code$4]
        });
        var Kind$Parser$suffix = _init$1 => _term$2 => _idx$3 => _code$4 => Kind$Parser$suffix$(_init$1, _term$2, _idx$3, _code$4);
        var arg = [_init$1, _term$2, _idx$3, _code$4];
        while (true) {
            let [_init$1, _term$2, _idx$3, _code$4] = arg;
            var R = (() => {
                var _suffix_parser$5 = Parser$first_of$(List$cons$(Kind$Parser$application(_init$1)(_term$2), List$cons$(Kind$Parser$application$erased(_init$1)(_term$2), List$cons$(Kind$Parser$arrow(_init$1)(_term$2), List$cons$(Kind$Parser$add(_init$1)(_term$2), List$cons$(Kind$Parser$sub(_init$1)(_term$2), List$cons$(Kind$Parser$mul(_init$1)(_term$2), List$cons$(Kind$Parser$div(_init$1)(_term$2), List$cons$(Kind$Parser$mod(_init$1)(_term$2), List$cons$(Kind$Parser$cons(_init$1)(_term$2), List$cons$(Kind$Parser$concat(_init$1)(_term$2), List$cons$(Kind$Parser$string_concat(_init$1)(_term$2), List$cons$(Kind$Parser$sigma(_init$1)(_term$2), List$cons$(Kind$Parser$equality(_init$1)(_term$2), List$cons$(Kind$Parser$inequality(_init$1)(_term$2), List$cons$(Kind$Parser$rewrite(_init$1)(_term$2), List$cons$(Kind$Parser$annotation(_init$1)(_term$2), List$cons$(Kind$Parser$application$hole(_init$1)(_term$2), List$nil))))))))))))))))));
                var self = _suffix_parser$5(_idx$3)(_code$4);
                switch (self._) {
                    case 'Parser.Reply.value':
                        var $3542 = self.idx;
                        var $3543 = self.code;
                        var $3544 = self.val;
                        var $3545 = Kind$Parser$suffix$(_init$1, $3544, $3542, $3543);
                        var $3541 = $3545;
                        break;
                    case 'Parser.Reply.error':
                        var $3546 = Parser$Reply$value$(_idx$3, _code$4, _term$2);
                        var $3541 = $3546;
                        break;
                };
                return $3541;
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Kind$Parser$suffix = x0 => x1 => x2 => x3 => Kind$Parser$suffix$(x0, x1, x2, x3);

    function Kind$Parser$term$(_idx$1, _code$2) {
        var self = Kind$Parser$init$(_idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $3548 = self.idx;
                var $3549 = self.code;
                var $3550 = self.err;
                var $3551 = Parser$Reply$error$($3548, $3549, $3550);
                var $3547 = $3551;
                break;
            case 'Parser.Reply.value':
                var $3552 = self.idx;
                var $3553 = self.code;
                var $3554 = self.val;
                var self = Parser$first_of$(List$cons$(Kind$Parser$type, List$cons$(Kind$Parser$forall, List$cons$(Kind$Parser$lambda, List$cons$(Kind$Parser$lambda$erased, List$cons$(Kind$Parser$lambda$nameless, List$cons$(Kind$Parser$parenthesis, List$cons$(Kind$Parser$letforrange$u32, List$cons$(Kind$Parser$letforin, List$cons$(Kind$Parser$let, List$cons$(Kind$Parser$get, List$cons$(Kind$Parser$def, List$cons$(Kind$Parser$goal_rewrite, List$cons$(Kind$Parser$if, List$cons$(Kind$Parser$char, List$cons$(Kind$Parser$string, List$cons$(Kind$Parser$pair, List$cons$(Kind$Parser$sigma$type, List$cons$(Kind$Parser$some, List$cons$(Kind$Parser$apply, List$cons$(Kind$Parser$mirror, List$cons$(Kind$Parser$list, List$cons$(Kind$Parser$log, List$cons$(Kind$Parser$forrange$u32, List$cons$(Kind$Parser$forrange$u32$2, List$cons$(Kind$Parser$forin, List$cons$(Kind$Parser$forin$2, List$cons$(Kind$Parser$do, List$cons$(Kind$Parser$case, List$cons$(Kind$Parser$open, List$cons$(Kind$Parser$goal, List$cons$(Kind$Parser$hole, List$cons$(Kind$Parser$u8, List$cons$(Kind$Parser$u16, List$cons$(Kind$Parser$u32, List$cons$(Kind$Parser$u64, List$cons$(Kind$Parser$nat, List$cons$(Kind$Parser$reference, List$nil))))))))))))))))))))))))))))))))))))))($3552)($3553);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $3556 = self.idx;
                        var $3557 = self.code;
                        var $3558 = self.err;
                        var $3559 = Parser$Reply$error$($3556, $3557, $3558);
                        var $3555 = $3559;
                        break;
                    case 'Parser.Reply.value':
                        var $3560 = self.idx;
                        var $3561 = self.code;
                        var $3562 = self.val;
                        var $3563 = Kind$Parser$suffix$($3554, $3562, $3560, $3561);
                        var $3555 = $3563;
                        break;
                };
                var $3547 = $3555;
                break;
        };
        return $3547;
    };
    const Kind$Parser$term = x0 => x1 => Kind$Parser$term$(x0, x1);

    function Kind$Parser$name_term$(_sep$1, _idx$2, _code$3) {
        var self = Kind$Parser$name$(_idx$2, _code$3);
        switch (self._) {
            case 'Parser.Reply.error':
                var $3565 = self.idx;
                var $3566 = self.code;
                var $3567 = self.err;
                var $3568 = Parser$Reply$error$($3565, $3566, $3567);
                var $3564 = $3568;
                break;
            case 'Parser.Reply.value':
                var $3569 = self.idx;
                var $3570 = self.code;
                var $3571 = self.val;
                var self = Kind$Parser$text$(_sep$1, $3569, $3570);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $3573 = self.idx;
                        var $3574 = self.code;
                        var $3575 = self.err;
                        var $3576 = Parser$Reply$error$($3573, $3574, $3575);
                        var $3572 = $3576;
                        break;
                    case 'Parser.Reply.value':
                        var $3577 = self.idx;
                        var $3578 = self.code;
                        var self = Kind$Parser$term$($3577, $3578);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $3580 = self.idx;
                                var $3581 = self.code;
                                var $3582 = self.err;
                                var $3583 = Parser$Reply$error$($3580, $3581, $3582);
                                var $3579 = $3583;
                                break;
                            case 'Parser.Reply.value':
                                var $3584 = self.idx;
                                var $3585 = self.code;
                                var $3586 = self.val;
                                var $3587 = Parser$Reply$value$($3584, $3585, Pair$new$($3571, $3586));
                                var $3579 = $3587;
                                break;
                        };
                        var $3572 = $3579;
                        break;
                };
                var $3564 = $3572;
                break;
        };
        return $3564;
    };
    const Kind$Parser$name_term = x0 => x1 => x2 => Kind$Parser$name_term$(x0, x1, x2);

    function Kind$Binder$new$(_eras$1, _name$2, _term$3) {
        var $3588 = ({
            _: 'Kind.Binder.new',
            'eras': _eras$1,
            'name': _name$2,
            'term': _term$3
        });
        return $3588;
    };
    const Kind$Binder$new = x0 => x1 => x2 => Kind$Binder$new$(x0, x1, x2);

    function Kind$Parser$binder$homo$(_sep$1, _eras$2, _idx$3, _code$4) {
        var self = Kind$Parser$text$((() => {
            var self = _eras$2;
            if (self) {
                var $3590 = "<";
                return $3590;
            } else {
                var $3591 = "(";
                return $3591;
            };
        })(), _idx$3, _code$4);
        switch (self._) {
            case 'Parser.Reply.error':
                var $3592 = self.idx;
                var $3593 = self.code;
                var $3594 = self.err;
                var $3595 = Parser$Reply$error$($3592, $3593, $3594);
                var $3589 = $3595;
                break;
            case 'Parser.Reply.value':
                var $3596 = self.idx;
                var $3597 = self.code;
                var self = Parser$until1$(Kind$Parser$text((() => {
                    var self = _eras$2;
                    if (self) {
                        var $3599 = ">";
                        return $3599;
                    } else {
                        var $3600 = ")";
                        return $3600;
                    };
                })()), Kind$Parser$item(Kind$Parser$name_term(_sep$1)), $3596, $3597);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $3601 = self.idx;
                        var $3602 = self.code;
                        var $3603 = self.err;
                        var $3604 = Parser$Reply$error$($3601, $3602, $3603);
                        var $3598 = $3604;
                        break;
                    case 'Parser.Reply.value':
                        var $3605 = self.idx;
                        var $3606 = self.code;
                        var $3607 = self.val;
                        var $3608 = Parser$Reply$value$($3605, $3606, List$mapped$($3607, (_pair$11 => {
                            var self = _pair$11;
                            switch (self._) {
                                case 'Pair.new':
                                    var $3610 = self.fst;
                                    var $3611 = self.snd;
                                    var $3612 = Kind$Binder$new$(_eras$2, $3610, $3611);
                                    var $3609 = $3612;
                                    break;
                            };
                            return $3609;
                        })));
                        var $3598 = $3608;
                        break;
                };
                var $3589 = $3598;
                break;
        };
        return $3589;
    };
    const Kind$Parser$binder$homo = x0 => x1 => x2 => x3 => Kind$Parser$binder$homo$(x0, x1, x2, x3);

    function List$concat$(_as$2, _bs$3) {
        var self = _as$2;
        switch (self._) {
            case 'List.cons':
                var $3614 = self.head;
                var $3615 = self.tail;
                var $3616 = List$cons$($3614, List$concat$($3615, _bs$3));
                var $3613 = $3616;
                break;
            case 'List.nil':
                var $3617 = _bs$3;
                var $3613 = $3617;
                break;
        };
        return $3613;
    };
    const List$concat = x0 => x1 => List$concat$(x0, x1);

    function List$flatten$(_xs$2) {
        var self = _xs$2;
        switch (self._) {
            case 'List.cons':
                var $3619 = self.head;
                var $3620 = self.tail;
                var $3621 = List$concat$($3619, List$flatten$($3620));
                var $3618 = $3621;
                break;
            case 'List.nil':
                var $3622 = List$nil;
                var $3618 = $3622;
                break;
        };
        return $3618;
    };
    const List$flatten = x0 => List$flatten$(x0);

    function Kind$Parser$binder$(_sep$1, _idx$2, _code$3) {
        var self = Parser$many1$(Parser$first_of$(List$cons$(Kind$Parser$binder$homo(_sep$1)(Bool$true), List$cons$(Kind$Parser$binder$homo(_sep$1)(Bool$false), List$nil))), _idx$2, _code$3);
        switch (self._) {
            case 'Parser.Reply.error':
                var $3624 = self.idx;
                var $3625 = self.code;
                var $3626 = self.err;
                var $3627 = Parser$Reply$error$($3624, $3625, $3626);
                var $3623 = $3627;
                break;
            case 'Parser.Reply.value':
                var $3628 = self.idx;
                var $3629 = self.code;
                var $3630 = self.val;
                var $3631 = Parser$Reply$value$($3628, $3629, List$flatten$($3630));
                var $3623 = $3631;
                break;
        };
        return $3623;
    };
    const Kind$Parser$binder = x0 => x1 => x2 => Kind$Parser$binder$(x0, x1, x2);
    const List$length = a0 => (list_length(a0));

    function Kind$Parser$make_forall$(_binds$1, _body$2) {
        var self = _binds$1;
        switch (self._) {
            case 'List.cons':
                var $3633 = self.head;
                var $3634 = self.tail;
                var self = $3633;
                switch (self._) {
                    case 'Kind.Binder.new':
                        var $3636 = self.eras;
                        var $3637 = self.name;
                        var $3638 = self.term;
                        var $3639 = Kind$Term$all$($3636, "", $3637, $3638, (_s$8 => _x$9 => {
                            var $3640 = Kind$Parser$make_forall$($3634, _body$2);
                            return $3640;
                        }));
                        var $3635 = $3639;
                        break;
                };
                var $3632 = $3635;
                break;
            case 'List.nil':
                var $3641 = _body$2;
                var $3632 = $3641;
                break;
        };
        return $3632;
    };
    const Kind$Parser$make_forall = x0 => x1 => Kind$Parser$make_forall$(x0, x1);

    function List$at$(_index$2, _list$3) {
        var List$at$ = (_index$2, _list$3) => ({
            ctr: 'TCO',
            arg: [_index$2, _list$3]
        });
        var List$at = _index$2 => _list$3 => List$at$(_index$2, _list$3);
        var arg = [_index$2, _list$3];
        while (true) {
            let [_index$2, _list$3] = arg;
            var R = (() => {
                var self = _list$3;
                switch (self._) {
                    case 'List.cons':
                        var $3642 = self.head;
                        var $3643 = self.tail;
                        var self = _index$2;
                        if (self === 0n) {
                            var $3645 = Maybe$some$($3642);
                            var $3644 = $3645;
                        } else {
                            var $3646 = (self - 1n);
                            var $3647 = List$at$($3646, $3643);
                            var $3644 = $3647;
                        };
                        return $3644;
                    case 'List.nil':
                        var $3648 = Maybe$none;
                        return $3648;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const List$at = x0 => x1 => List$at$(x0, x1);

    function List$at_last$(_index$2, _list$3) {
        var $3649 = List$at$(_index$2, List$reverse$(_list$3));
        return $3649;
    };
    const List$at_last = x0 => x1 => List$at_last$(x0, x1);

    function Kind$Term$var$(_name$1, _indx$2) {
        var $3650 = ({
            _: 'Kind.Term.var',
            'name': _name$1,
            'indx': _indx$2
        });
        return $3650;
    };
    const Kind$Term$var = x0 => x1 => Kind$Term$var$(x0, x1);

    function Kind$Context$get_name_skips$(_name$1) {
        var self = _name$1;
        if (self.length === 0) {
            var $3652 = Pair$new$("", 0n);
            var $3651 = $3652;
        } else {
            var $3653 = self.charCodeAt(0);
            var $3654 = self.slice(1);
            var _name_skips$4 = Kind$Context$get_name_skips$($3654);
            var self = _name_skips$4;
            switch (self._) {
                case 'Pair.new':
                    var $3656 = self.fst;
                    var $3657 = self.snd;
                    var self = ($3653 === 94);
                    if (self) {
                        var $3659 = Pair$new$($3656, Nat$succ$($3657));
                        var $3658 = $3659;
                    } else {
                        var $3660 = Pair$new$(String$cons$($3653, $3656), $3657);
                        var $3658 = $3660;
                    };
                    var $3655 = $3658;
                    break;
            };
            var $3651 = $3655;
        };
        return $3651;
    };
    const Kind$Context$get_name_skips = x0 => Kind$Context$get_name_skips$(x0);

    function Kind$Name$eql$(_a$1, _b$2) {
        var $3661 = (_a$1 === _b$2);
        return $3661;
    };
    const Kind$Name$eql = x0 => x1 => Kind$Name$eql$(x0, x1);

    function Kind$Context$find$go$(_name$1, _skip$2, _ctx$3) {
        var Kind$Context$find$go$ = (_name$1, _skip$2, _ctx$3) => ({
            ctr: 'TCO',
            arg: [_name$1, _skip$2, _ctx$3]
        });
        var Kind$Context$find$go = _name$1 => _skip$2 => _ctx$3 => Kind$Context$find$go$(_name$1, _skip$2, _ctx$3);
        var arg = [_name$1, _skip$2, _ctx$3];
        while (true) {
            let [_name$1, _skip$2, _ctx$3] = arg;
            var R = (() => {
                var self = _ctx$3;
                switch (self._) {
                    case 'List.cons':
                        var $3662 = self.head;
                        var $3663 = self.tail;
                        var self = $3662;
                        switch (self._) {
                            case 'Pair.new':
                                var $3665 = self.fst;
                                var $3666 = self.snd;
                                var self = Kind$Name$eql$(_name$1, $3665);
                                if (self) {
                                    var self = _skip$2;
                                    if (self === 0n) {
                                        var $3669 = Maybe$some$($3666);
                                        var $3668 = $3669;
                                    } else {
                                        var $3670 = (self - 1n);
                                        var $3671 = Kind$Context$find$go$(_name$1, $3670, $3663);
                                        var $3668 = $3671;
                                    };
                                    var $3667 = $3668;
                                } else {
                                    var $3672 = Kind$Context$find$go$(_name$1, _skip$2, $3663);
                                    var $3667 = $3672;
                                };
                                var $3664 = $3667;
                                break;
                        };
                        return $3664;
                    case 'List.nil':
                        var $3673 = Maybe$none;
                        return $3673;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Kind$Context$find$go = x0 => x1 => x2 => Kind$Context$find$go$(x0, x1, x2);

    function Kind$Context$find$(_name$1, _ctx$2) {
        var self = Kind$Context$get_name_skips$(_name$1);
        switch (self._) {
            case 'Pair.new':
                var $3675 = self.fst;
                var $3676 = self.snd;
                var $3677 = Kind$Context$find$go$($3675, $3676, _ctx$2);
                var $3674 = $3677;
                break;
        };
        return $3674;
    };
    const Kind$Context$find = x0 => x1 => Kind$Context$find$(x0, x1);

    function Kind$Path$o$(_path$1, _x$2) {
        var $3678 = _path$1((_x$2 + '0'));
        return $3678;
    };
    const Kind$Path$o = x0 => x1 => Kind$Path$o$(x0, x1);

    function Kind$Path$i$(_path$1, _x$2) {
        var $3679 = _path$1((_x$2 + '1'));
        return $3679;
    };
    const Kind$Path$i = x0 => x1 => Kind$Path$i$(x0, x1);

    function Kind$Path$to_bits$(_path$1) {
        var $3680 = _path$1(Bits$e);
        return $3680;
    };
    const Kind$Path$to_bits = x0 => Kind$Path$to_bits$(x0);

    function Kind$Term$bind$(_vars$1, _path$2, _term$3) {
        var self = _term$3;
        switch (self._) {
            case 'Kind.Term.var':
                var $3682 = self.name;
                var $3683 = self.indx;
                var self = List$at_last$($3683, _vars$1);
                switch (self._) {
                    case 'Maybe.some':
                        var $3685 = self.value;
                        var $3686 = Pair$snd$($3685);
                        var $3684 = $3686;
                        break;
                    case 'Maybe.none':
                        var $3687 = Kind$Term$var$($3682, $3683);
                        var $3684 = $3687;
                        break;
                };
                var $3681 = $3684;
                break;
            case 'Kind.Term.ref':
                var $3688 = self.name;
                var self = Kind$Context$find$($3688, _vars$1);
                switch (self._) {
                    case 'Maybe.some':
                        var $3690 = self.value;
                        var $3691 = $3690;
                        var $3689 = $3691;
                        break;
                    case 'Maybe.none':
                        var $3692 = Kind$Term$ref$($3688);
                        var $3689 = $3692;
                        break;
                };
                var $3681 = $3689;
                break;
            case 'Kind.Term.all':
                var $3693 = self.eras;
                var $3694 = self.self;
                var $3695 = self.name;
                var $3696 = self.xtyp;
                var $3697 = self.body;
                var _vlen$9 = (list_length(_vars$1));
                var $3698 = Kind$Term$all$($3693, $3694, $3695, Kind$Term$bind$(_vars$1, Kind$Path$o(_path$2), $3696), (_s$10 => _x$11 => {
                    var $3699 = Kind$Term$bind$(List$cons$(Pair$new$($3695, _x$11), List$cons$(Pair$new$($3694, _s$10), _vars$1)), Kind$Path$i(_path$2), $3697(Kind$Term$var$($3694, _vlen$9))(Kind$Term$var$($3695, Nat$succ$(_vlen$9))));
                    return $3699;
                }));
                var $3681 = $3698;
                break;
            case 'Kind.Term.lam':
                var $3700 = self.name;
                var $3701 = self.body;
                var _vlen$6 = (list_length(_vars$1));
                var $3702 = Kind$Term$lam$($3700, (_x$7 => {
                    var $3703 = Kind$Term$bind$(List$cons$(Pair$new$($3700, _x$7), _vars$1), Kind$Path$o(_path$2), $3701(Kind$Term$var$($3700, _vlen$6)));
                    return $3703;
                }));
                var $3681 = $3702;
                break;
            case 'Kind.Term.app':
                var $3704 = self.func;
                var $3705 = self.argm;
                var $3706 = Kind$Term$app$(Kind$Term$bind$(_vars$1, Kind$Path$o(_path$2), $3704), Kind$Term$bind$(_vars$1, Kind$Path$i(_path$2), $3705));
                var $3681 = $3706;
                break;
            case 'Kind.Term.let':
                var $3707 = self.name;
                var $3708 = self.expr;
                var $3709 = self.body;
                var _vlen$7 = (list_length(_vars$1));
                var $3710 = Kind$Term$let$($3707, Kind$Term$bind$(_vars$1, Kind$Path$o(_path$2), $3708), (_x$8 => {
                    var $3711 = Kind$Term$bind$(List$cons$(Pair$new$($3707, _x$8), _vars$1), Kind$Path$i(_path$2), $3709(Kind$Term$var$($3707, _vlen$7)));
                    return $3711;
                }));
                var $3681 = $3710;
                break;
            case 'Kind.Term.def':
                var $3712 = self.name;
                var $3713 = self.expr;
                var $3714 = self.body;
                var _vlen$7 = (list_length(_vars$1));
                var $3715 = Kind$Term$def$($3712, Kind$Term$bind$(_vars$1, Kind$Path$o(_path$2), $3713), (_x$8 => {
                    var $3716 = Kind$Term$bind$(List$cons$(Pair$new$($3712, _x$8), _vars$1), Kind$Path$i(_path$2), $3714(Kind$Term$var$($3712, _vlen$7)));
                    return $3716;
                }));
                var $3681 = $3715;
                break;
            case 'Kind.Term.ann':
                var $3717 = self.done;
                var $3718 = self.term;
                var $3719 = self.type;
                var $3720 = Kind$Term$ann$($3717, Kind$Term$bind$(_vars$1, Kind$Path$o(_path$2), $3718), Kind$Term$bind$(_vars$1, Kind$Path$i(_path$2), $3719));
                var $3681 = $3720;
                break;
            case 'Kind.Term.gol':
                var $3721 = self.name;
                var $3722 = self.dref;
                var $3723 = self.verb;
                var $3724 = Kind$Term$gol$($3721, $3722, $3723);
                var $3681 = $3724;
                break;
            case 'Kind.Term.nat':
                var $3725 = self.natx;
                var $3726 = Kind$Term$nat$($3725);
                var $3681 = $3726;
                break;
            case 'Kind.Term.chr':
                var $3727 = self.chrx;
                var $3728 = Kind$Term$chr$($3727);
                var $3681 = $3728;
                break;
            case 'Kind.Term.str':
                var $3729 = self.strx;
                var $3730 = Kind$Term$str$($3729);
                var $3681 = $3730;
                break;
            case 'Kind.Term.cse':
                var $3731 = self.expr;
                var $3732 = self.name;
                var $3733 = self.with;
                var $3734 = self.cses;
                var $3735 = self.moti;
                var _expr$10 = Kind$Term$bind$(_vars$1, Kind$Path$o(_path$2), $3731);
                var _name$11 = $3732;
                var _wyth$12 = $3733;
                var _cses$13 = $3734;
                var _moti$14 = $3735;
                var $3736 = Kind$Term$cse$(Kind$Path$to_bits$(_path$2), _expr$10, _name$11, _wyth$12, _cses$13, _moti$14);
                var $3681 = $3736;
                break;
            case 'Kind.Term.ori':
                var $3737 = self.orig;
                var $3738 = self.expr;
                var $3739 = Kind$Term$ori$($3737, Kind$Term$bind$(_vars$1, _path$2, $3738));
                var $3681 = $3739;
                break;
            case 'Kind.Term.typ':
                var $3740 = Kind$Term$typ;
                var $3681 = $3740;
                break;
            case 'Kind.Term.hol':
                var $3741 = Kind$Term$hol$(Kind$Path$to_bits$(_path$2));
                var $3681 = $3741;
                break;
        };
        return $3681;
    };
    const Kind$Term$bind = x0 => x1 => x2 => Kind$Term$bind$(x0, x1, x2);
    const Kind$Status$done = ({
        _: 'Kind.Status.done'
    });

    function Kind$define$(_file$1, _code$2, _orig$3, _name$4, _term$5, _type$6, _isct$7, _arit$8, _done$9, _defs$10) {
        var self = _done$9;
        if (self) {
            var $3743 = Kind$Status$done;
            var _stat$11 = $3743;
        } else {
            var $3744 = Kind$Status$init;
            var _stat$11 = $3744;
        };
        var $3742 = Kind$set$(_name$4, Kind$Def$new$(_file$1, _code$2, _orig$3, _name$4, _term$5, _type$6, _isct$7, _arit$8, _stat$11), _defs$10);
        return $3742;
    };
    const Kind$define = x0 => x1 => x2 => x3 => x4 => x5 => x6 => x7 => x8 => x9 => Kind$define$(x0, x1, x2, x3, x4, x5, x6, x7, x8, x9);

    function Kind$Parser$file$def$(_file$1, _code$2, _defs$3, _idx$4, _code$5) {
        var self = Kind$Parser$init$(_idx$4, _code$5);
        switch (self._) {
            case 'Parser.Reply.error':
                var $3746 = self.idx;
                var $3747 = self.code;
                var $3748 = self.err;
                var $3749 = Parser$Reply$error$($3746, $3747, $3748);
                var $3745 = $3749;
                break;
            case 'Parser.Reply.value':
                var $3750 = self.idx;
                var $3751 = self.code;
                var $3752 = self.val;
                var self = Kind$Parser$name1$($3750, $3751);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $3754 = self.idx;
                        var $3755 = self.code;
                        var $3756 = self.err;
                        var $3757 = Parser$Reply$error$($3754, $3755, $3756);
                        var $3753 = $3757;
                        break;
                    case 'Parser.Reply.value':
                        var $3758 = self.idx;
                        var $3759 = self.code;
                        var $3760 = self.val;
                        var self = Parser$many$(Kind$Parser$binder(":"))($3758)($3759);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $3762 = self.idx;
                                var $3763 = self.code;
                                var $3764 = self.err;
                                var $3765 = Parser$Reply$error$($3762, $3763, $3764);
                                var $3761 = $3765;
                                break;
                            case 'Parser.Reply.value':
                                var $3766 = self.idx;
                                var $3767 = self.code;
                                var $3768 = self.val;
                                var _args$15 = List$flatten$($3768);
                                var self = Kind$Parser$text$(":", $3766, $3767);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $3770 = self.idx;
                                        var $3771 = self.code;
                                        var $3772 = self.err;
                                        var $3773 = Parser$Reply$error$($3770, $3771, $3772);
                                        var $3769 = $3773;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $3774 = self.idx;
                                        var $3775 = self.code;
                                        var self = Kind$Parser$term$($3774, $3775);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $3777 = self.idx;
                                                var $3778 = self.code;
                                                var $3779 = self.err;
                                                var $3780 = Parser$Reply$error$($3777, $3778, $3779);
                                                var $3776 = $3780;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $3781 = self.idx;
                                                var $3782 = self.code;
                                                var $3783 = self.val;
                                                var self = Kind$Parser$term$($3781, $3782);
                                                switch (self._) {
                                                    case 'Parser.Reply.error':
                                                        var $3785 = self.idx;
                                                        var $3786 = self.code;
                                                        var $3787 = self.err;
                                                        var $3788 = Parser$Reply$error$($3785, $3786, $3787);
                                                        var $3784 = $3788;
                                                        break;
                                                    case 'Parser.Reply.value':
                                                        var $3789 = self.idx;
                                                        var $3790 = self.code;
                                                        var $3791 = self.val;
                                                        var self = Kind$Parser$stop$($3752, $3789, $3790);
                                                        switch (self._) {
                                                            case 'Parser.Reply.error':
                                                                var $3793 = self.idx;
                                                                var $3794 = self.code;
                                                                var $3795 = self.err;
                                                                var $3796 = Parser$Reply$error$($3793, $3794, $3795);
                                                                var $3792 = $3796;
                                                                break;
                                                            case 'Parser.Reply.value':
                                                                var $3797 = self.idx;
                                                                var $3798 = self.code;
                                                                var $3799 = self.val;
                                                                var _arit$28 = (list_length(_args$15));
                                                                var _type$29 = Kind$Parser$make_forall$(_args$15, $3783);
                                                                var _term$30 = Kind$Parser$make_lambda$(List$mapped$(_args$15, (_x$30 => {
                                                                    var self = _x$30;
                                                                    switch (self._) {
                                                                        case 'Kind.Binder.new':
                                                                            var $3802 = self.name;
                                                                            var $3803 = $3802;
                                                                            var $3801 = $3803;
                                                                            break;
                                                                    };
                                                                    return $3801;
                                                                })), $3791);
                                                                var _type$31 = Kind$Term$bind$(List$nil, (_x$31 => {
                                                                    var $3804 = (_x$31 + '1');
                                                                    return $3804;
                                                                }), _type$29);
                                                                var _term$32 = Kind$Term$bind$(List$nil, (_x$32 => {
                                                                    var $3805 = (_x$32 + '0');
                                                                    return $3805;
                                                                }), _term$30);
                                                                var _defs$33 = Kind$define$(_file$1, _code$2, $3799, $3760, _term$32, _type$31, Bool$false, _arit$28, Bool$false, _defs$3);
                                                                var $3800 = Parser$Reply$value$($3797, $3798, _defs$33);
                                                                var $3792 = $3800;
                                                                break;
                                                        };
                                                        var $3784 = $3792;
                                                        break;
                                                };
                                                var $3776 = $3784;
                                                break;
                                        };
                                        var $3769 = $3776;
                                        break;
                                };
                                var $3761 = $3769;
                                break;
                        };
                        var $3753 = $3761;
                        break;
                };
                var $3745 = $3753;
                break;
        };
        return $3745;
    };
    const Kind$Parser$file$def = x0 => x1 => x2 => x3 => x4 => Kind$Parser$file$def$(x0, x1, x2, x3, x4);

    function Maybe$default$(_a$2, _m$3) {
        var self = _m$3;
        switch (self._) {
            case 'Maybe.some':
                var $3807 = self.value;
                var $3808 = $3807;
                var $3806 = $3808;
                break;
            case 'Maybe.none':
                var $3809 = _a$2;
                var $3806 = $3809;
                break;
        };
        return $3806;
    };
    const Maybe$default = x0 => x1 => Maybe$default$(x0, x1);

    function Kind$Constructor$new$(_name$1, _args$2, _inds$3) {
        var $3810 = ({
            _: 'Kind.Constructor.new',
            'name': _name$1,
            'args': _args$2,
            'inds': _inds$3
        });
        return $3810;
    };
    const Kind$Constructor$new = x0 => x1 => x2 => Kind$Constructor$new$(x0, x1, x2);

    function Kind$Parser$constructor$(_namespace$1, _idx$2, _code$3) {
        var self = Kind$Parser$name1$(_idx$2, _code$3);
        switch (self._) {
            case 'Parser.Reply.error':
                var $3812 = self.idx;
                var $3813 = self.code;
                var $3814 = self.err;
                var $3815 = Parser$Reply$error$($3812, $3813, $3814);
                var $3811 = $3815;
                break;
            case 'Parser.Reply.value':
                var $3816 = self.idx;
                var $3817 = self.code;
                var $3818 = self.val;
                var self = Parser$maybe$(Kind$Parser$binder(":"), $3816, $3817);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $3820 = self.idx;
                        var $3821 = self.code;
                        var $3822 = self.err;
                        var $3823 = Parser$Reply$error$($3820, $3821, $3822);
                        var $3819 = $3823;
                        break;
                    case 'Parser.Reply.value':
                        var $3824 = self.idx;
                        var $3825 = self.code;
                        var $3826 = self.val;
                        var self = Parser$maybe$((_idx$10 => _code$11 => {
                            var self = Kind$Parser$text$("~", _idx$10, _code$11);
                            switch (self._) {
                                case 'Parser.Reply.error':
                                    var $3829 = self.idx;
                                    var $3830 = self.code;
                                    var $3831 = self.err;
                                    var $3832 = Parser$Reply$error$($3829, $3830, $3831);
                                    var $3828 = $3832;
                                    break;
                                case 'Parser.Reply.value':
                                    var $3833 = self.idx;
                                    var $3834 = self.code;
                                    var $3835 = Kind$Parser$binder$("=", $3833, $3834);
                                    var $3828 = $3835;
                                    break;
                            };
                            return $3828;
                        }), $3824, $3825);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $3836 = self.idx;
                                var $3837 = self.code;
                                var $3838 = self.err;
                                var $3839 = Parser$Reply$error$($3836, $3837, $3838);
                                var $3827 = $3839;
                                break;
                            case 'Parser.Reply.value':
                                var $3840 = self.idx;
                                var $3841 = self.code;
                                var $3842 = self.val;
                                var _args$13 = Maybe$default$(List$nil, $3826);
                                var _inds$14 = Maybe$default$(List$nil, $3842);
                                var $3843 = Parser$Reply$value$($3840, $3841, Kind$Constructor$new$($3818, _args$13, _inds$14));
                                var $3827 = $3843;
                                break;
                        };
                        var $3819 = $3827;
                        break;
                };
                var $3811 = $3819;
                break;
        };
        return $3811;
    };
    const Kind$Parser$constructor = x0 => x1 => x2 => Kind$Parser$constructor$(x0, x1, x2);

    function Kind$Datatype$new$(_name$1, _pars$2, _inds$3, _ctrs$4) {
        var $3844 = ({
            _: 'Kind.Datatype.new',
            'name': _name$1,
            'pars': _pars$2,
            'inds': _inds$3,
            'ctrs': _ctrs$4
        });
        return $3844;
    };
    const Kind$Datatype$new = x0 => x1 => x2 => x3 => Kind$Datatype$new$(x0, x1, x2, x3);

    function Kind$Parser$datatype$(_idx$1, _code$2) {
        var self = Kind$Parser$text$("type ", _idx$1, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $3846 = self.idx;
                var $3847 = self.code;
                var $3848 = self.err;
                var $3849 = Parser$Reply$error$($3846, $3847, $3848);
                var $3845 = $3849;
                break;
            case 'Parser.Reply.value':
                var $3850 = self.idx;
                var $3851 = self.code;
                var self = Kind$Parser$name1$($3850, $3851);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $3853 = self.idx;
                        var $3854 = self.code;
                        var $3855 = self.err;
                        var $3856 = Parser$Reply$error$($3853, $3854, $3855);
                        var $3852 = $3856;
                        break;
                    case 'Parser.Reply.value':
                        var $3857 = self.idx;
                        var $3858 = self.code;
                        var $3859 = self.val;
                        var self = Parser$maybe$(Kind$Parser$binder(":"), $3857, $3858);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $3861 = self.idx;
                                var $3862 = self.code;
                                var $3863 = self.err;
                                var $3864 = Parser$Reply$error$($3861, $3862, $3863);
                                var $3860 = $3864;
                                break;
                            case 'Parser.Reply.value':
                                var $3865 = self.idx;
                                var $3866 = self.code;
                                var $3867 = self.val;
                                var self = Parser$maybe$((_idx$12 => _code$13 => {
                                    var self = Kind$Parser$text$("~", _idx$12, _code$13);
                                    switch (self._) {
                                        case 'Parser.Reply.error':
                                            var $3870 = self.idx;
                                            var $3871 = self.code;
                                            var $3872 = self.err;
                                            var $3873 = Parser$Reply$error$($3870, $3871, $3872);
                                            var $3869 = $3873;
                                            break;
                                        case 'Parser.Reply.value':
                                            var $3874 = self.idx;
                                            var $3875 = self.code;
                                            var $3876 = Kind$Parser$binder$(":", $3874, $3875);
                                            var $3869 = $3876;
                                            break;
                                    };
                                    return $3869;
                                }), $3865, $3866);
                                switch (self._) {
                                    case 'Parser.Reply.error':
                                        var $3877 = self.idx;
                                        var $3878 = self.code;
                                        var $3879 = self.err;
                                        var $3880 = Parser$Reply$error$($3877, $3878, $3879);
                                        var $3868 = $3880;
                                        break;
                                    case 'Parser.Reply.value':
                                        var $3881 = self.idx;
                                        var $3882 = self.code;
                                        var $3883 = self.val;
                                        var _pars$15 = Maybe$default$(List$nil, $3867);
                                        var _inds$16 = Maybe$default$(List$nil, $3883);
                                        var self = Kind$Parser$text$("{", $3881, $3882);
                                        switch (self._) {
                                            case 'Parser.Reply.error':
                                                var $3885 = self.idx;
                                                var $3886 = self.code;
                                                var $3887 = self.err;
                                                var $3888 = Parser$Reply$error$($3885, $3886, $3887);
                                                var $3884 = $3888;
                                                break;
                                            case 'Parser.Reply.value':
                                                var $3889 = self.idx;
                                                var $3890 = self.code;
                                                var self = Parser$until$(Kind$Parser$text("}"), Kind$Parser$item(Kind$Parser$constructor($3859)))($3889)($3890);
                                                switch (self._) {
                                                    case 'Parser.Reply.error':
                                                        var $3892 = self.idx;
                                                        var $3893 = self.code;
                                                        var $3894 = self.err;
                                                        var $3895 = Parser$Reply$error$($3892, $3893, $3894);
                                                        var $3891 = $3895;
                                                        break;
                                                    case 'Parser.Reply.value':
                                                        var $3896 = self.idx;
                                                        var $3897 = self.code;
                                                        var $3898 = self.val;
                                                        var $3899 = Parser$Reply$value$($3896, $3897, Kind$Datatype$new$($3859, _pars$15, _inds$16, $3898));
                                                        var $3891 = $3899;
                                                        break;
                                                };
                                                var $3884 = $3891;
                                                break;
                                        };
                                        var $3868 = $3884;
                                        break;
                                };
                                var $3860 = $3868;
                                break;
                        };
                        var $3852 = $3860;
                        break;
                };
                var $3845 = $3852;
                break;
        };
        return $3845;
    };
    const Kind$Parser$datatype = x0 => x1 => Kind$Parser$datatype$(x0, x1);

    function Kind$Datatype$build_term$motive$go$(_type$1, _name$2, _inds$3) {
        var self = _inds$3;
        switch (self._) {
            case 'List.cons':
                var $3901 = self.head;
                var $3902 = self.tail;
                var self = $3901;
                switch (self._) {
                    case 'Kind.Binder.new':
                        var $3904 = self.eras;
                        var $3905 = self.name;
                        var $3906 = self.term;
                        var $3907 = Kind$Term$all$($3904, "", $3905, $3906, (_s$9 => _x$10 => {
                            var $3908 = Kind$Datatype$build_term$motive$go$(_type$1, _name$2, $3902);
                            return $3908;
                        }));
                        var $3903 = $3907;
                        break;
                };
                var $3900 = $3903;
                break;
            case 'List.nil':
                var self = _type$1;
                switch (self._) {
                    case 'Kind.Datatype.new':
                        var $3910 = self.pars;
                        var $3911 = self.inds;
                        var _slf$8 = Kind$Term$ref$(_name$2);
                        var _slf$9 = (() => {
                            var $3914 = _slf$8;
                            var $3915 = $3910;
                            let _slf$10 = $3914;
                            let _var$9;
                            while ($3915._ === 'List.cons') {
                                _var$9 = $3915.head;
                                var $3914 = Kind$Term$app$(_slf$10, Kind$Term$ref$((() => {
                                    var self = _var$9;
                                    switch (self._) {
                                        case 'Kind.Binder.new':
                                            var $3916 = self.name;
                                            var $3917 = $3916;
                                            return $3917;
                                    };
                                })()));
                                _slf$10 = $3914;
                                $3915 = $3915.tail;
                            }
                            return _slf$10;
                        })();
                        var _slf$10 = (() => {
                            var $3919 = _slf$9;
                            var $3920 = $3911;
                            let _slf$11 = $3919;
                            let _var$10;
                            while ($3920._ === 'List.cons') {
                                _var$10 = $3920.head;
                                var $3919 = Kind$Term$app$(_slf$11, Kind$Term$ref$((() => {
                                    var self = _var$10;
                                    switch (self._) {
                                        case 'Kind.Binder.new':
                                            var $3921 = self.name;
                                            var $3922 = $3921;
                                            return $3922;
                                    };
                                })()));
                                _slf$11 = $3919;
                                $3920 = $3920.tail;
                            }
                            return _slf$11;
                        })();
                        var $3912 = Kind$Term$all$(Bool$false, "", "", _slf$10, (_s$11 => _x$12 => {
                            var $3923 = Kind$Term$typ;
                            return $3923;
                        }));
                        var $3909 = $3912;
                        break;
                };
                var $3900 = $3909;
                break;
        };
        return $3900;
    };
    const Kind$Datatype$build_term$motive$go = x0 => x1 => x2 => Kind$Datatype$build_term$motive$go$(x0, x1, x2);

    function Kind$Datatype$build_term$motive$(_type$1) {
        var self = _type$1;
        switch (self._) {
            case 'Kind.Datatype.new':
                var $3925 = self.name;
                var $3926 = self.inds;
                var $3927 = Kind$Datatype$build_term$motive$go$(_type$1, $3925, $3926);
                var $3924 = $3927;
                break;
        };
        return $3924;
    };
    const Kind$Datatype$build_term$motive = x0 => Kind$Datatype$build_term$motive$(x0);

    function Kind$Datatype$build_term$constructor$go$(_type$1, _ctor$2, _args$3) {
        var self = _args$3;
        switch (self._) {
            case 'List.cons':
                var $3929 = self.head;
                var $3930 = self.tail;
                var self = $3929;
                switch (self._) {
                    case 'Kind.Binder.new':
                        var $3932 = self.eras;
                        var $3933 = self.name;
                        var $3934 = self.term;
                        var _eras$9 = $3932;
                        var _name$10 = $3933;
                        var _xtyp$11 = $3934;
                        var _body$12 = Kind$Datatype$build_term$constructor$go$(_type$1, _ctor$2, $3930);
                        var $3935 = Kind$Term$all$(_eras$9, "", _name$10, _xtyp$11, (_s$13 => _x$14 => {
                            var $3936 = _body$12;
                            return $3936;
                        }));
                        var $3931 = $3935;
                        break;
                };
                var $3928 = $3931;
                break;
            case 'List.nil':
                var self = _type$1;
                switch (self._) {
                    case 'Kind.Datatype.new':
                        var $3938 = self.name;
                        var $3939 = self.pars;
                        var self = _ctor$2;
                        switch (self._) {
                            case 'Kind.Constructor.new':
                                var $3941 = self.name;
                                var $3942 = self.args;
                                var $3943 = self.inds;
                                var _ret$11 = Kind$Term$ref$(Kind$Name$read$("P"));
                                var _ret$12 = (() => {
                                    var $3946 = _ret$11;
                                    var $3947 = $3943;
                                    let _ret$13 = $3946;
                                    let _var$12;
                                    while ($3947._ === 'List.cons') {
                                        _var$12 = $3947.head;
                                        var $3946 = Kind$Term$app$(_ret$13, (() => {
                                            var self = _var$12;
                                            switch (self._) {
                                                case 'Kind.Binder.new':
                                                    var $3948 = self.term;
                                                    var $3949 = $3948;
                                                    return $3949;
                                            };
                                        })());
                                        _ret$13 = $3946;
                                        $3947 = $3947.tail;
                                    }
                                    return _ret$13;
                                })();
                                var _ctr$13 = String$flatten$(List$cons$($3938, List$cons$(Kind$Name$read$("."), List$cons$($3941, List$nil))));
                                var _slf$14 = Kind$Term$ref$(_ctr$13);
                                var _slf$15 = (() => {
                                    var $3951 = _slf$14;
                                    var $3952 = $3939;
                                    let _slf$16 = $3951;
                                    let _var$15;
                                    while ($3952._ === 'List.cons') {
                                        _var$15 = $3952.head;
                                        var $3951 = Kind$Term$app$(_slf$16, Kind$Term$ref$((() => {
                                            var self = _var$15;
                                            switch (self._) {
                                                case 'Kind.Binder.new':
                                                    var $3953 = self.name;
                                                    var $3954 = $3953;
                                                    return $3954;
                                            };
                                        })()));
                                        _slf$16 = $3951;
                                        $3952 = $3952.tail;
                                    }
                                    return _slf$16;
                                })();
                                var _slf$16 = (() => {
                                    var $3956 = _slf$15;
                                    var $3957 = $3942;
                                    let _slf$17 = $3956;
                                    let _var$16;
                                    while ($3957._ === 'List.cons') {
                                        _var$16 = $3957.head;
                                        var $3956 = Kind$Term$app$(_slf$17, Kind$Term$ref$((() => {
                                            var self = _var$16;
                                            switch (self._) {
                                                case 'Kind.Binder.new':
                                                    var $3958 = self.name;
                                                    var $3959 = $3958;
                                                    return $3959;
                                            };
                                        })()));
                                        _slf$17 = $3956;
                                        $3957 = $3957.tail;
                                    }
                                    return _slf$17;
                                })();
                                var $3944 = Kind$Term$app$(_ret$12, _slf$16);
                                var $3940 = $3944;
                                break;
                        };
                        var $3937 = $3940;
                        break;
                };
                var $3928 = $3937;
                break;
        };
        return $3928;
    };
    const Kind$Datatype$build_term$constructor$go = x0 => x1 => x2 => Kind$Datatype$build_term$constructor$go$(x0, x1, x2);

    function Kind$Datatype$build_term$constructor$(_type$1, _ctor$2) {
        var self = _ctor$2;
        switch (self._) {
            case 'Kind.Constructor.new':
                var $3961 = self.args;
                var $3962 = Kind$Datatype$build_term$constructor$go$(_type$1, _ctor$2, $3961);
                var $3960 = $3962;
                break;
        };
        return $3960;
    };
    const Kind$Datatype$build_term$constructor = x0 => x1 => Kind$Datatype$build_term$constructor$(x0, x1);

    function Kind$Datatype$build_term$constructors$go$(_type$1, _name$2, _ctrs$3) {
        var self = _ctrs$3;
        switch (self._) {
            case 'List.cons':
                var $3964 = self.head;
                var $3965 = self.tail;
                var self = $3964;
                switch (self._) {
                    case 'Kind.Constructor.new':
                        var $3967 = self.name;
                        var $3968 = Kind$Term$all$(Bool$false, "", $3967, Kind$Datatype$build_term$constructor$(_type$1, $3964), (_s$9 => _x$10 => {
                            var $3969 = Kind$Datatype$build_term$constructors$go$(_type$1, _name$2, $3965);
                            return $3969;
                        }));
                        var $3966 = $3968;
                        break;
                };
                var $3963 = $3966;
                break;
            case 'List.nil':
                var self = _type$1;
                switch (self._) {
                    case 'Kind.Datatype.new':
                        var $3971 = self.inds;
                        var _ret$8 = Kind$Term$ref$(Kind$Name$read$("P"));
                        var _ret$9 = (() => {
                            var $3974 = _ret$8;
                            var $3975 = $3971;
                            let _ret$10 = $3974;
                            let _var$9;
                            while ($3975._ === 'List.cons') {
                                _var$9 = $3975.head;
                                var $3974 = Kind$Term$app$(_ret$10, Kind$Term$ref$((() => {
                                    var self = _var$9;
                                    switch (self._) {
                                        case 'Kind.Binder.new':
                                            var $3976 = self.name;
                                            var $3977 = $3976;
                                            return $3977;
                                    };
                                })()));
                                _ret$10 = $3974;
                                $3975 = $3975.tail;
                            }
                            return _ret$10;
                        })();
                        var $3972 = Kind$Term$app$(_ret$9, Kind$Term$ref$((_name$2 + ".Self")));
                        var $3970 = $3972;
                        break;
                };
                var $3963 = $3970;
                break;
        };
        return $3963;
    };
    const Kind$Datatype$build_term$constructors$go = x0 => x1 => x2 => Kind$Datatype$build_term$constructors$go$(x0, x1, x2);

    function Kind$Datatype$build_term$constructors$(_type$1) {
        var self = _type$1;
        switch (self._) {
            case 'Kind.Datatype.new':
                var $3979 = self.name;
                var $3980 = self.ctrs;
                var $3981 = Kind$Datatype$build_term$constructors$go$(_type$1, $3979, $3980);
                var $3978 = $3981;
                break;
        };
        return $3978;
    };
    const Kind$Datatype$build_term$constructors = x0 => Kind$Datatype$build_term$constructors$(x0);

    function Kind$Datatype$build_term$go$(_type$1, _name$2, _pars$3, _inds$4) {
        var self = _pars$3;
        switch (self._) {
            case 'List.cons':
                var $3983 = self.head;
                var $3984 = self.tail;
                var self = $3983;
                switch (self._) {
                    case 'Kind.Binder.new':
                        var $3986 = self.name;
                        var $3987 = Kind$Term$lam$($3986, (_x$10 => {
                            var $3988 = Kind$Datatype$build_term$go$(_type$1, _name$2, $3984, _inds$4);
                            return $3988;
                        }));
                        var $3985 = $3987;
                        break;
                };
                var $3982 = $3985;
                break;
            case 'List.nil':
                var self = _inds$4;
                switch (self._) {
                    case 'List.cons':
                        var $3990 = self.head;
                        var $3991 = self.tail;
                        var self = $3990;
                        switch (self._) {
                            case 'Kind.Binder.new':
                                var $3993 = self.name;
                                var $3994 = Kind$Term$lam$($3993, (_x$10 => {
                                    var $3995 = Kind$Datatype$build_term$go$(_type$1, _name$2, _pars$3, $3991);
                                    return $3995;
                                }));
                                var $3992 = $3994;
                                break;
                        };
                        var $3989 = $3992;
                        break;
                    case 'List.nil':
                        var $3996 = Kind$Term$all$(Bool$true, (_name$2 + ".Self"), Kind$Name$read$("P"), Kind$Datatype$build_term$motive$(_type$1), (_s$5 => _x$6 => {
                            var $3997 = Kind$Datatype$build_term$constructors$(_type$1);
                            return $3997;
                        }));
                        var $3989 = $3996;
                        break;
                };
                var $3982 = $3989;
                break;
        };
        return $3982;
    };
    const Kind$Datatype$build_term$go = x0 => x1 => x2 => x3 => Kind$Datatype$build_term$go$(x0, x1, x2, x3);

    function Kind$Datatype$build_term$(_type$1) {
        var self = _type$1;
        switch (self._) {
            case 'Kind.Datatype.new':
                var $3999 = self.name;
                var $4000 = self.pars;
                var $4001 = self.inds;
                var $4002 = Kind$Datatype$build_term$go$(_type$1, $3999, $4000, $4001);
                var $3998 = $4002;
                break;
        };
        return $3998;
    };
    const Kind$Datatype$build_term = x0 => Kind$Datatype$build_term$(x0);

    function Kind$Datatype$build_type$go$(_type$1, _name$2, _pars$3, _inds$4) {
        var self = _pars$3;
        switch (self._) {
            case 'List.cons':
                var $4004 = self.head;
                var $4005 = self.tail;
                var self = $4004;
                switch (self._) {
                    case 'Kind.Binder.new':
                        var $4007 = self.name;
                        var $4008 = self.term;
                        var $4009 = Kind$Term$all$(Bool$false, "", $4007, $4008, (_s$10 => _x$11 => {
                            var $4010 = Kind$Datatype$build_type$go$(_type$1, _name$2, $4005, _inds$4);
                            return $4010;
                        }));
                        var $4006 = $4009;
                        break;
                };
                var $4003 = $4006;
                break;
            case 'List.nil':
                var self = _inds$4;
                switch (self._) {
                    case 'List.cons':
                        var $4012 = self.head;
                        var $4013 = self.tail;
                        var self = $4012;
                        switch (self._) {
                            case 'Kind.Binder.new':
                                var $4015 = self.name;
                                var $4016 = self.term;
                                var $4017 = Kind$Term$all$(Bool$false, "", $4015, $4016, (_s$10 => _x$11 => {
                                    var $4018 = Kind$Datatype$build_type$go$(_type$1, _name$2, _pars$3, $4013);
                                    return $4018;
                                }));
                                var $4014 = $4017;
                                break;
                        };
                        var $4011 = $4014;
                        break;
                    case 'List.nil':
                        var $4019 = Kind$Term$typ;
                        var $4011 = $4019;
                        break;
                };
                var $4003 = $4011;
                break;
        };
        return $4003;
    };
    const Kind$Datatype$build_type$go = x0 => x1 => x2 => x3 => Kind$Datatype$build_type$go$(x0, x1, x2, x3);

    function Kind$Datatype$build_type$(_type$1) {
        var self = _type$1;
        switch (self._) {
            case 'Kind.Datatype.new':
                var $4021 = self.name;
                var $4022 = self.pars;
                var $4023 = self.inds;
                var $4024 = Kind$Datatype$build_type$go$(_type$1, $4021, $4022, $4023);
                var $4020 = $4024;
                break;
        };
        return $4020;
    };
    const Kind$Datatype$build_type = x0 => Kind$Datatype$build_type$(x0);

    function Kind$Constructor$build_term$opt$go$(_type$1, _ctor$2, _ctrs$3) {
        var self = _ctrs$3;
        switch (self._) {
            case 'List.cons':
                var $4026 = self.head;
                var $4027 = self.tail;
                var self = $4026;
                switch (self._) {
                    case 'Kind.Constructor.new':
                        var $4029 = self.name;
                        var $4030 = Kind$Term$lam$($4029, (_x$9 => {
                            var $4031 = Kind$Constructor$build_term$opt$go$(_type$1, _ctor$2, $4027);
                            return $4031;
                        }));
                        var $4028 = $4030;
                        break;
                };
                var $4025 = $4028;
                break;
            case 'List.nil':
                var self = _ctor$2;
                switch (self._) {
                    case 'Kind.Constructor.new':
                        var $4033 = self.name;
                        var $4034 = self.args;
                        var _ret$7 = Kind$Term$ref$($4033);
                        var _ret$8 = (() => {
                            var $4037 = _ret$7;
                            var $4038 = $4034;
                            let _ret$9 = $4037;
                            let _arg$8;
                            while ($4038._ === 'List.cons') {
                                _arg$8 = $4038.head;
                                var $4037 = Kind$Term$app$(_ret$9, Kind$Term$ref$((() => {
                                    var self = _arg$8;
                                    switch (self._) {
                                        case 'Kind.Binder.new':
                                            var $4039 = self.name;
                                            var $4040 = $4039;
                                            return $4040;
                                    };
                                })()));
                                _ret$9 = $4037;
                                $4038 = $4038.tail;
                            }
                            return _ret$9;
                        })();
                        var $4035 = _ret$8;
                        var $4032 = $4035;
                        break;
                };
                var $4025 = $4032;
                break;
        };
        return $4025;
    };
    const Kind$Constructor$build_term$opt$go = x0 => x1 => x2 => Kind$Constructor$build_term$opt$go$(x0, x1, x2);

    function Kind$Constructor$build_term$opt$(_type$1, _ctor$2) {
        var self = _type$1;
        switch (self._) {
            case 'Kind.Datatype.new':
                var $4042 = self.ctrs;
                var $4043 = Kind$Constructor$build_term$opt$go$(_type$1, _ctor$2, $4042);
                var $4041 = $4043;
                break;
        };
        return $4041;
    };
    const Kind$Constructor$build_term$opt = x0 => x1 => Kind$Constructor$build_term$opt$(x0, x1);

    function Kind$Constructor$build_term$go$(_type$1, _ctor$2, _name$3, _pars$4, _args$5) {
        var self = _pars$4;
        switch (self._) {
            case 'List.cons':
                var $4045 = self.head;
                var $4046 = self.tail;
                var self = $4045;
                switch (self._) {
                    case 'Kind.Binder.new':
                        var $4048 = self.name;
                        var $4049 = Kind$Term$lam$($4048, (_x$11 => {
                            var $4050 = Kind$Constructor$build_term$go$(_type$1, _ctor$2, _name$3, $4046, _args$5);
                            return $4050;
                        }));
                        var $4047 = $4049;
                        break;
                };
                var $4044 = $4047;
                break;
            case 'List.nil':
                var self = _args$5;
                switch (self._) {
                    case 'List.cons':
                        var $4052 = self.head;
                        var $4053 = self.tail;
                        var self = $4052;
                        switch (self._) {
                            case 'Kind.Binder.new':
                                var $4055 = self.name;
                                var $4056 = Kind$Term$lam$($4055, (_x$11 => {
                                    var $4057 = Kind$Constructor$build_term$go$(_type$1, _ctor$2, _name$3, _pars$4, $4053);
                                    return $4057;
                                }));
                                var $4054 = $4056;
                                break;
                        };
                        var $4051 = $4054;
                        break;
                    case 'List.nil':
                        var $4058 = Kind$Term$lam$(Kind$Name$read$("P"), (_x$6 => {
                            var $4059 = Kind$Constructor$build_term$opt$(_type$1, _ctor$2);
                            return $4059;
                        }));
                        var $4051 = $4058;
                        break;
                };
                var $4044 = $4051;
                break;
        };
        return $4044;
    };
    const Kind$Constructor$build_term$go = x0 => x1 => x2 => x3 => x4 => Kind$Constructor$build_term$go$(x0, x1, x2, x3, x4);

    function Kind$Constructor$build_term$(_type$1, _ctor$2) {
        var self = _type$1;
        switch (self._) {
            case 'Kind.Datatype.new':
                var $4061 = self.name;
                var $4062 = self.pars;
                var self = _ctor$2;
                switch (self._) {
                    case 'Kind.Constructor.new':
                        var $4064 = self.args;
                        var $4065 = Kind$Constructor$build_term$go$(_type$1, _ctor$2, $4061, $4062, $4064);
                        var $4063 = $4065;
                        break;
                };
                var $4060 = $4063;
                break;
        };
        return $4060;
    };
    const Kind$Constructor$build_term = x0 => x1 => Kind$Constructor$build_term$(x0, x1);

    function Kind$Constructor$build_type$go$(_type$1, _ctor$2, _name$3, _pars$4, _args$5) {
        var self = _pars$4;
        switch (self._) {
            case 'List.cons':
                var $4067 = self.head;
                var $4068 = self.tail;
                var self = $4067;
                switch (self._) {
                    case 'Kind.Binder.new':
                        var $4070 = self.eras;
                        var $4071 = self.name;
                        var $4072 = self.term;
                        var $4073 = Kind$Term$all$($4070, "", $4071, $4072, (_s$11 => _x$12 => {
                            var $4074 = Kind$Constructor$build_type$go$(_type$1, _ctor$2, _name$3, $4068, _args$5);
                            return $4074;
                        }));
                        var $4069 = $4073;
                        break;
                };
                var $4066 = $4069;
                break;
            case 'List.nil':
                var self = _args$5;
                switch (self._) {
                    case 'List.cons':
                        var $4076 = self.head;
                        var $4077 = self.tail;
                        var self = $4076;
                        switch (self._) {
                            case 'Kind.Binder.new':
                                var $4079 = self.eras;
                                var $4080 = self.name;
                                var $4081 = self.term;
                                var $4082 = Kind$Term$all$($4079, "", $4080, $4081, (_s$11 => _x$12 => {
                                    var $4083 = Kind$Constructor$build_type$go$(_type$1, _ctor$2, _name$3, _pars$4, $4077);
                                    return $4083;
                                }));
                                var $4078 = $4082;
                                break;
                        };
                        var $4075 = $4078;
                        break;
                    case 'List.nil':
                        var self = _type$1;
                        switch (self._) {
                            case 'Kind.Datatype.new':
                                var $4085 = self.pars;
                                var self = _ctor$2;
                                switch (self._) {
                                    case 'Kind.Constructor.new':
                                        var $4087 = self.inds;
                                        var _type$13 = Kind$Term$ref$(_name$3);
                                        var _type$14 = (() => {
                                            var $4090 = _type$13;
                                            var $4091 = $4085;
                                            let _type$15 = $4090;
                                            let _var$14;
                                            while ($4091._ === 'List.cons') {
                                                _var$14 = $4091.head;
                                                var $4090 = Kind$Term$app$(_type$15, Kind$Term$ref$((() => {
                                                    var self = _var$14;
                                                    switch (self._) {
                                                        case 'Kind.Binder.new':
                                                            var $4092 = self.name;
                                                            var $4093 = $4092;
                                                            return $4093;
                                                    };
                                                })()));
                                                _type$15 = $4090;
                                                $4091 = $4091.tail;
                                            }
                                            return _type$15;
                                        })();
                                        var _type$15 = (() => {
                                            var $4095 = _type$14;
                                            var $4096 = $4087;
                                            let _type$16 = $4095;
                                            let _var$15;
                                            while ($4096._ === 'List.cons') {
                                                _var$15 = $4096.head;
                                                var $4095 = Kind$Term$app$(_type$16, (() => {
                                                    var self = _var$15;
                                                    switch (self._) {
                                                        case 'Kind.Binder.new':
                                                            var $4097 = self.term;
                                                            var $4098 = $4097;
                                                            return $4098;
                                                    };
                                                })());
                                                _type$16 = $4095;
                                                $4096 = $4096.tail;
                                            }
                                            return _type$16;
                                        })();
                                        var $4088 = _type$15;
                                        var $4086 = $4088;
                                        break;
                                };
                                var $4084 = $4086;
                                break;
                        };
                        var $4075 = $4084;
                        break;
                };
                var $4066 = $4075;
                break;
        };
        return $4066;
    };
    const Kind$Constructor$build_type$go = x0 => x1 => x2 => x3 => x4 => Kind$Constructor$build_type$go$(x0, x1, x2, x3, x4);

    function Kind$Constructor$build_type$(_type$1, _ctor$2) {
        var self = _type$1;
        switch (self._) {
            case 'Kind.Datatype.new':
                var $4100 = self.name;
                var $4101 = self.pars;
                var self = _ctor$2;
                switch (self._) {
                    case 'Kind.Constructor.new':
                        var $4103 = self.args;
                        var $4104 = Kind$Constructor$build_type$go$(_type$1, _ctor$2, $4100, $4101, $4103);
                        var $4102 = $4104;
                        break;
                };
                var $4099 = $4102;
                break;
        };
        return $4099;
    };
    const Kind$Constructor$build_type = x0 => x1 => Kind$Constructor$build_type$(x0, x1);

    function Kind$Parser$file$adt$(_file$1, _code$2, _defs$3, _idx$4, _code$5) {
        var self = Kind$Parser$init$(_idx$4, _code$5);
        switch (self._) {
            case 'Parser.Reply.error':
                var $4106 = self.idx;
                var $4107 = self.code;
                var $4108 = self.err;
                var $4109 = Parser$Reply$error$($4106, $4107, $4108);
                var $4105 = $4109;
                break;
            case 'Parser.Reply.value':
                var $4110 = self.idx;
                var $4111 = self.code;
                var $4112 = self.val;
                var self = Kind$Parser$datatype$($4110, $4111);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $4114 = self.idx;
                        var $4115 = self.code;
                        var $4116 = self.err;
                        var $4117 = Parser$Reply$error$($4114, $4115, $4116);
                        var $4113 = $4117;
                        break;
                    case 'Parser.Reply.value':
                        var $4118 = self.idx;
                        var $4119 = self.code;
                        var $4120 = self.val;
                        var self = Kind$Parser$stop$($4112, $4118, $4119);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $4122 = self.idx;
                                var $4123 = self.code;
                                var $4124 = self.err;
                                var $4125 = Parser$Reply$error$($4122, $4123, $4124);
                                var $4121 = $4125;
                                break;
                            case 'Parser.Reply.value':
                                var $4126 = self.idx;
                                var $4127 = self.code;
                                var $4128 = self.val;
                                var self = $4120;
                                switch (self._) {
                                    case 'Kind.Datatype.new':
                                        var $4130 = self.name;
                                        var $4131 = self.pars;
                                        var $4132 = self.inds;
                                        var $4133 = self.ctrs;
                                        var _term$19 = Kind$Datatype$build_term$($4120);
                                        var _term$20 = Kind$Term$bind$(List$nil, (_x$20 => {
                                            var $4135 = (_x$20 + '1');
                                            return $4135;
                                        }), _term$19);
                                        var _type$21 = Kind$Datatype$build_type$($4120);
                                        var _type$22 = Kind$Term$bind$(List$nil, (_x$22 => {
                                            var $4136 = (_x$22 + '0');
                                            return $4136;
                                        }), _type$21);
                                        var _arit$23 = ((list_length($4131)) + (list_length($4132)));
                                        var _defs$24 = Kind$define$(_file$1, _code$2, $4128, $4130, _term$20, _type$22, Bool$false, _arit$23, Bool$false, _defs$3);
                                        var _defs$25 = List$fold$($4133, _defs$24, (_ctr$25 => _defs$26 => {
                                            var _typ_name$27 = $4130;
                                            var _ctr_arit$28 = (_arit$23 + (list_length((() => {
                                                var self = _ctr$25;
                                                switch (self._) {
                                                    case 'Kind.Constructor.new':
                                                        var $4138 = self.args;
                                                        var $4139 = $4138;
                                                        return $4139;
                                                };
                                            })())));
                                            var _ctr_name$29 = String$flatten$(List$cons$(_typ_name$27, List$cons$(Kind$Name$read$("."), List$cons$((() => {
                                                var self = _ctr$25;
                                                switch (self._) {
                                                    case 'Kind.Constructor.new':
                                                        var $4140 = self.name;
                                                        var $4141 = $4140;
                                                        return $4141;
                                                };
                                            })(), List$nil))));
                                            var _ctr_term$30 = Kind$Constructor$build_term$($4120, _ctr$25);
                                            var _ctr_term$31 = Kind$Term$bind$(List$nil, (_x$31 => {
                                                var $4142 = (_x$31 + '1');
                                                return $4142;
                                            }), _ctr_term$30);
                                            var _ctr_type$32 = Kind$Constructor$build_type$($4120, _ctr$25);
                                            var _ctr_type$33 = Kind$Term$bind$(List$nil, (_x$33 => {
                                                var $4143 = (_x$33 + '0');
                                                return $4143;
                                            }), _ctr_type$32);
                                            var $4137 = Kind$define$(_file$1, _code$2, $4128, _ctr_name$29, _ctr_term$31, _ctr_type$33, Bool$true, _ctr_arit$28, Bool$false, _defs$26);
                                            return $4137;
                                        }));
                                        var $4134 = (_idx$26 => _code$27 => {
                                            var $4144 = Parser$Reply$value$(_idx$26, _code$27, _defs$25);
                                            return $4144;
                                        });
                                        var $4129 = $4134;
                                        break;
                                };
                                var $4129 = $4129($4126)($4127);
                                var $4121 = $4129;
                                break;
                        };
                        var $4113 = $4121;
                        break;
                };
                var $4105 = $4113;
                break;
        };
        return $4105;
    };
    const Kind$Parser$file$adt = x0 => x1 => x2 => x3 => x4 => Kind$Parser$file$adt$(x0, x1, x2, x3, x4);

    function Parser$eof$(_idx$1, _code$2) {
        var self = _code$2;
        if (self.length === 0) {
            var $4146 = Parser$Reply$value$(_idx$1, _code$2, Unit$new);
            var $4145 = $4146;
        } else {
            var $4147 = self.charCodeAt(0);
            var $4148 = self.slice(1);
            var $4149 = Parser$Reply$error$(_idx$1, _code$2, "Expected end-of-file.");
            var $4145 = $4149;
        };
        return $4145;
    };
    const Parser$eof = x0 => x1 => Parser$eof$(x0, x1);

    function Kind$Parser$file$end$(_file$1, _code$2, _defs$3, _idx$4, _code$5) {
        var self = Kind$Parser$spaces(_idx$4)(_code$5);
        switch (self._) {
            case 'Parser.Reply.error':
                var $4151 = self.idx;
                var $4152 = self.code;
                var $4153 = self.err;
                var $4154 = Parser$Reply$error$($4151, $4152, $4153);
                var $4150 = $4154;
                break;
            case 'Parser.Reply.value':
                var $4155 = self.idx;
                var $4156 = self.code;
                var self = Parser$eof$($4155, $4156);
                switch (self._) {
                    case 'Parser.Reply.error':
                        var $4158 = self.idx;
                        var $4159 = self.code;
                        var $4160 = self.err;
                        var $4161 = Parser$Reply$error$($4158, $4159, $4160);
                        var $4157 = $4161;
                        break;
                    case 'Parser.Reply.value':
                        var $4162 = self.idx;
                        var $4163 = self.code;
                        var $4164 = Parser$Reply$value$($4162, $4163, _defs$3);
                        var $4157 = $4164;
                        break;
                };
                var $4150 = $4157;
                break;
        };
        return $4150;
    };
    const Kind$Parser$file$end = x0 => x1 => x2 => x3 => x4 => Kind$Parser$file$end$(x0, x1, x2, x3, x4);

    function Kind$Parser$file$(_file$1, _code$2, _defs$3, _idx$4, _code$5) {
        var self = Parser$is_eof$(_idx$4, _code$5);
        switch (self._) {
            case 'Parser.Reply.error':
                var $4166 = self.idx;
                var $4167 = self.code;
                var $4168 = self.err;
                var $4169 = Parser$Reply$error$($4166, $4167, $4168);
                var $4165 = $4169;
                break;
            case 'Parser.Reply.value':
                var $4170 = self.idx;
                var $4171 = self.code;
                var $4172 = self.val;
                var self = $4172;
                if (self) {
                    var $4174 = (_idx$9 => _code$10 => {
                        var $4175 = Parser$Reply$value$(_idx$9, _code$10, _defs$3);
                        return $4175;
                    });
                    var $4173 = $4174;
                } else {
                    var $4176 = (_idx$9 => _code$10 => {
                        var self = Parser$first_of$(List$cons$(Kind$Parser$file$def(_file$1)(_code$2)(_defs$3), List$cons$(Kind$Parser$file$adt(_file$1)(_code$2)(_defs$3), List$cons$(Kind$Parser$file$end(_file$1)(_code$2)(_defs$3), List$nil))))(_idx$9)(_code$10);
                        switch (self._) {
                            case 'Parser.Reply.error':
                                var $4178 = self.idx;
                                var $4179 = self.code;
                                var $4180 = self.err;
                                var $4181 = Parser$Reply$error$($4178, $4179, $4180);
                                var $4177 = $4181;
                                break;
                            case 'Parser.Reply.value':
                                var $4182 = self.idx;
                                var $4183 = self.code;
                                var $4184 = self.val;
                                var $4185 = Kind$Parser$file$(_file$1, _code$2, $4184, $4182, $4183);
                                var $4177 = $4185;
                                break;
                        };
                        return $4177;
                    });
                    var $4173 = $4176;
                };
                var $4173 = $4173($4170)($4171);
                var $4165 = $4173;
                break;
        };
        return $4165;
    };
    const Kind$Parser$file = x0 => x1 => x2 => x3 => x4 => Kind$Parser$file$(x0, x1, x2, x3, x4);

    function Either$(_A$1, _B$2) {
        var $4186 = null;
        return $4186;
    };
    const Either = x0 => x1 => Either$(x0, x1);

    function String$join$go$(_sep$1, _list$2, _fst$3) {
        var self = _list$2;
        switch (self._) {
            case 'List.cons':
                var $4188 = self.head;
                var $4189 = self.tail;
                var $4190 = String$flatten$(List$cons$((() => {
                    var self = _fst$3;
                    if (self) {
                        var $4191 = "";
                        return $4191;
                    } else {
                        var $4192 = _sep$1;
                        return $4192;
                    };
                })(), List$cons$($4188, List$cons$(String$join$go$(_sep$1, $4189, Bool$false), List$nil))));
                var $4187 = $4190;
                break;
            case 'List.nil':
                var $4193 = "";
                var $4187 = $4193;
                break;
        };
        return $4187;
    };
    const String$join$go = x0 => x1 => x2 => String$join$go$(x0, x1, x2);

    function String$join$(_sep$1, _list$2) {
        var $4194 = String$join$go$(_sep$1, _list$2, Bool$true);
        return $4194;
    };
    const String$join = x0 => x1 => String$join$(x0, x1);

    function Kind$highlight$end$(_col$1, _row$2, _res$3) {
        var $4195 = String$join$("\u{a}", _res$3);
        return $4195;
    };
    const Kind$highlight$end = x0 => x1 => x2 => Kind$highlight$end$(x0, x1, x2);

    function Maybe$extract$(_m$2, _a$4, _f$5) {
        var self = _m$2;
        switch (self._) {
            case 'Maybe.some':
                var $4197 = self.value;
                var $4198 = _f$5($4197);
                var $4196 = $4198;
                break;
            case 'Maybe.none':
                var $4199 = _a$4;
                var $4196 = $4199;
                break;
        };
        return $4196;
    };
    const Maybe$extract = x0 => x1 => x2 => Maybe$extract$(x0, x1, x2);

    function Nat$is_zero$(_n$1) {
        var self = _n$1;
        if (self === 0n) {
            var $4201 = Bool$true;
            var $4200 = $4201;
        } else {
            var $4202 = (self - 1n);
            var $4203 = Bool$false;
            var $4200 = $4203;
        };
        return $4200;
    };
    const Nat$is_zero = x0 => Nat$is_zero$(x0);

    function Nat$double$(_n$1) {
        var self = _n$1;
        if (self === 0n) {
            var $4205 = Nat$zero;
            var $4204 = $4205;
        } else {
            var $4206 = (self - 1n);
            var $4207 = Nat$succ$(Nat$succ$(Nat$double$($4206)));
            var $4204 = $4207;
        };
        return $4204;
    };
    const Nat$double = x0 => Nat$double$(x0);

    function Nat$pred$(_n$1) {
        var self = _n$1;
        if (self === 0n) {
            var $4209 = Nat$zero;
            var $4208 = $4209;
        } else {
            var $4210 = (self - 1n);
            var $4211 = $4210;
            var $4208 = $4211;
        };
        return $4208;
    };
    const Nat$pred = x0 => Nat$pred$(x0);

    function String$pad_right$(_size$1, _chr$2, _str$3) {
        var self = _size$1;
        if (self === 0n) {
            var $4213 = _str$3;
            var $4212 = $4213;
        } else {
            var $4214 = (self - 1n);
            var self = _str$3;
            if (self.length === 0) {
                var $4216 = String$cons$(_chr$2, String$pad_right$($4214, _chr$2, ""));
                var $4215 = $4216;
            } else {
                var $4217 = self.charCodeAt(0);
                var $4218 = self.slice(1);
                var $4219 = String$cons$($4217, String$pad_right$($4214, _chr$2, $4218));
                var $4215 = $4219;
            };
            var $4212 = $4215;
        };
        return $4212;
    };
    const String$pad_right = x0 => x1 => x2 => String$pad_right$(x0, x1, x2);

    function String$pad_left$(_size$1, _chr$2, _str$3) {
        var $4220 = String$reverse$(String$pad_right$(_size$1, _chr$2, String$reverse$(_str$3)));
        return $4220;
    };
    const String$pad_left = x0 => x1 => x2 => String$pad_left$(x0, x1, x2);

    function Either$left$(_value$3) {
        var $4221 = ({
            _: 'Either.left',
            'value': _value$3
        });
        return $4221;
    };
    const Either$left = x0 => Either$left$(x0);

    function Either$right$(_value$3) {
        var $4222 = ({
            _: 'Either.right',
            'value': _value$3
        });
        return $4222;
    };
    const Either$right = x0 => Either$right$(x0);

    function Nat$sub_rem$(_n$1, _m$2) {
        var Nat$sub_rem$ = (_n$1, _m$2) => ({
            ctr: 'TCO',
            arg: [_n$1, _m$2]
        });
        var Nat$sub_rem = _n$1 => _m$2 => Nat$sub_rem$(_n$1, _m$2);
        var arg = [_n$1, _m$2];
        while (true) {
            let [_n$1, _m$2] = arg;
            var R = (() => {
                var self = _m$2;
                if (self === 0n) {
                    var $4223 = Either$left$(_n$1);
                    return $4223;
                } else {
                    var $4224 = (self - 1n);
                    var self = _n$1;
                    if (self === 0n) {
                        var $4226 = Either$right$(Nat$succ$($4224));
                        var $4225 = $4226;
                    } else {
                        var $4227 = (self - 1n);
                        var $4228 = Nat$sub_rem$($4227, $4224);
                        var $4225 = $4228;
                    };
                    return $4225;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Nat$sub_rem = x0 => x1 => Nat$sub_rem$(x0, x1);

    function Nat$div_mod$go$(_n$1, _m$2, _d$3) {
        var Nat$div_mod$go$ = (_n$1, _m$2, _d$3) => ({
            ctr: 'TCO',
            arg: [_n$1, _m$2, _d$3]
        });
        var Nat$div_mod$go = _n$1 => _m$2 => _d$3 => Nat$div_mod$go$(_n$1, _m$2, _d$3);
        var arg = [_n$1, _m$2, _d$3];
        while (true) {
            let [_n$1, _m$2, _d$3] = arg;
            var R = (() => {
                var self = Nat$sub_rem$(_n$1, _m$2);
                switch (self._) {
                    case 'Either.left':
                        var $4229 = self.value;
                        var $4230 = Nat$div_mod$go$($4229, _m$2, Nat$succ$(_d$3));
                        return $4230;
                    case 'Either.right':
                        var $4231 = Pair$new$(_d$3, _n$1);
                        return $4231;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Nat$div_mod$go = x0 => x1 => x2 => Nat$div_mod$go$(x0, x1, x2);
    const Nat$div_mod = a0 => a1 => (({
        _: 'Pair.new',
        'fst': a0 / a1,
        'snd': a0 % a1
    }));

    function Nat$to_base$go$(_base$1, _nat$2, _res$3) {
        var Nat$to_base$go$ = (_base$1, _nat$2, _res$3) => ({
            ctr: 'TCO',
            arg: [_base$1, _nat$2, _res$3]
        });
        var Nat$to_base$go = _base$1 => _nat$2 => _res$3 => Nat$to_base$go$(_base$1, _nat$2, _res$3);
        var arg = [_base$1, _nat$2, _res$3];
        while (true) {
            let [_base$1, _nat$2, _res$3] = arg;
            var R = (() => {
                var self = (({
                    _: 'Pair.new',
                    'fst': _nat$2 / _base$1,
                    'snd': _nat$2 % _base$1
                }));
                switch (self._) {
                    case 'Pair.new':
                        var $4232 = self.fst;
                        var $4233 = self.snd;
                        var self = $4232;
                        if (self === 0n) {
                            var $4235 = List$cons$($4233, _res$3);
                            var $4234 = $4235;
                        } else {
                            var $4236 = (self - 1n);
                            var $4237 = Nat$to_base$go$(_base$1, $4232, List$cons$($4233, _res$3));
                            var $4234 = $4237;
                        };
                        return $4234;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Nat$to_base$go = x0 => x1 => x2 => Nat$to_base$go$(x0, x1, x2);

    function Nat$to_base$(_base$1, _nat$2) {
        var $4238 = Nat$to_base$go$(_base$1, _nat$2, List$nil);
        return $4238;
    };
    const Nat$to_base = x0 => x1 => Nat$to_base$(x0, x1);

    function Nat$mod$go$(_n$1, _m$2, _r$3) {
        var Nat$mod$go$ = (_n$1, _m$2, _r$3) => ({
            ctr: 'TCO',
            arg: [_n$1, _m$2, _r$3]
        });
        var Nat$mod$go = _n$1 => _m$2 => _r$3 => Nat$mod$go$(_n$1, _m$2, _r$3);
        var arg = [_n$1, _m$2, _r$3];
        while (true) {
            let [_n$1, _m$2, _r$3] = arg;
            var R = (() => {
                var self = _m$2;
                if (self === 0n) {
                    var $4239 = Nat$mod$go$(_n$1, _r$3, _m$2);
                    return $4239;
                } else {
                    var $4240 = (self - 1n);
                    var self = _n$1;
                    if (self === 0n) {
                        var $4242 = _r$3;
                        var $4241 = $4242;
                    } else {
                        var $4243 = (self - 1n);
                        var $4244 = Nat$mod$go$($4243, $4240, Nat$succ$(_r$3));
                        var $4241 = $4244;
                    };
                    return $4241;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Nat$mod$go = x0 => x1 => x2 => Nat$mod$go$(x0, x1, x2);

    function Nat$mod$(_n$1, _m$2) {
        var $4245 = Nat$mod$go$(_n$1, _m$2, 0n);
        return $4245;
    };
    const Nat$mod = x0 => x1 => Nat$mod$(x0, x1);
    const Nat$lte = a0 => a1 => (a0 <= a1);

    function Nat$show_digit$(_base$1, _n$2) {
        var _m$3 = Nat$mod$(_n$2, _base$1);
        var _base64$4 = List$cons$(48, List$cons$(49, List$cons$(50, List$cons$(51, List$cons$(52, List$cons$(53, List$cons$(54, List$cons$(55, List$cons$(56, List$cons$(57, List$cons$(65, List$cons$(66, List$cons$(67, List$cons$(68, List$cons$(69, List$cons$(70, List$cons$(71, List$cons$(72, List$cons$(73, List$cons$(74, List$cons$(75, List$cons$(76, List$cons$(77, List$cons$(78, List$cons$(79, List$cons$(80, List$cons$(81, List$cons$(82, List$cons$(83, List$cons$(84, List$cons$(85, List$cons$(86, List$cons$(87, List$cons$(88, List$cons$(89, List$cons$(90, List$cons$(97, List$cons$(98, List$cons$(99, List$cons$(100, List$cons$(101, List$cons$(102, List$cons$(103, List$cons$(104, List$cons$(105, List$cons$(106, List$cons$(107, List$cons$(108, List$cons$(109, List$cons$(110, List$cons$(111, List$cons$(112, List$cons$(113, List$cons$(114, List$cons$(115, List$cons$(116, List$cons$(117, List$cons$(118, List$cons$(119, List$cons$(120, List$cons$(121, List$cons$(122, List$cons$(43, List$cons$(47, List$nil))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))));
        var self = ((_base$1 > 0n) && (_base$1 <= 64n));
        if (self) {
            var self = List$at$(_m$3, _base64$4);
            switch (self._) {
                case 'Maybe.some':
                    var $4248 = self.value;
                    var $4249 = $4248;
                    var $4247 = $4249;
                    break;
                case 'Maybe.none':
                    var $4250 = 35;
                    var $4247 = $4250;
                    break;
            };
            var $4246 = $4247;
        } else {
            var $4251 = 35;
            var $4246 = $4251;
        };
        return $4246;
    };
    const Nat$show_digit = x0 => x1 => Nat$show_digit$(x0, x1);

    function Nat$to_string_base$(_base$1, _nat$2) {
        var $4252 = List$fold$(Nat$to_base$(_base$1, _nat$2), String$nil, (_n$3 => _str$4 => {
            var $4253 = String$cons$(Nat$show_digit$(_base$1, _n$3), _str$4);
            return $4253;
        }));
        return $4252;
    };
    const Nat$to_string_base = x0 => x1 => Nat$to_string_base$(x0, x1);

    function Nat$show$(_n$1) {
        var $4254 = Nat$to_string_base$(10n, _n$1);
        return $4254;
    };
    const Nat$show = x0 => Nat$show$(x0);
    const Bool$not = a0 => (!a0);

    function Kind$color$(_col$1, _str$2) {
        var $4255 = String$cons$(27, String$cons$(91, (_col$1 + String$cons$(109, (_str$2 + String$cons$(27, String$cons$(91, String$cons$(48, String$cons$(109, String$nil)))))))));
        return $4255;
    };
    const Kind$color = x0 => x1 => Kind$color$(x0, x1);
    const Nat$eql = a0 => a1 => (a0 === a1);

    function List$take$(_n$2, _xs$3) {
        var self = _xs$3;
        switch (self._) {
            case 'List.cons':
                var $4257 = self.head;
                var $4258 = self.tail;
                var self = _n$2;
                if (self === 0n) {
                    var $4260 = List$nil;
                    var $4259 = $4260;
                } else {
                    var $4261 = (self - 1n);
                    var $4262 = List$cons$($4257, List$take$($4261, $4258));
                    var $4259 = $4262;
                };
                var $4256 = $4259;
                break;
            case 'List.nil':
                var $4263 = List$nil;
                var $4256 = $4263;
                break;
        };
        return $4256;
    };
    const List$take = x0 => x1 => List$take$(x0, x1);

    function Kind$highlight$tc$(_code$1, _ix0$2, _ix1$3, _col$4, _row$5, _lft$6, _lin$7, _res$8) {
        var Kind$highlight$tc$ = (_code$1, _ix0$2, _ix1$3, _col$4, _row$5, _lft$6, _lin$7, _res$8) => ({
            ctr: 'TCO',
            arg: [_code$1, _ix0$2, _ix1$3, _col$4, _row$5, _lft$6, _lin$7, _res$8]
        });
        var Kind$highlight$tc = _code$1 => _ix0$2 => _ix1$3 => _col$4 => _row$5 => _lft$6 => _lin$7 => _res$8 => Kind$highlight$tc$(_code$1, _ix0$2, _ix1$3, _col$4, _row$5, _lft$6, _lin$7, _res$8);
        var arg = [_code$1, _ix0$2, _ix1$3, _col$4, _row$5, _lft$6, _lin$7, _res$8];
        while (true) {
            let [_code$1, _ix0$2, _ix1$3, _col$4, _row$5, _lft$6, _lin$7, _res$8] = arg;
            var R = (() => {
                var _spa$9 = 3n;
                var self = _code$1;
                if (self.length === 0) {
                    var $4265 = Kind$highlight$end$(_col$4, _row$5, List$reverse$(_res$8));
                    var $4264 = $4265;
                } else {
                    var $4266 = self.charCodeAt(0);
                    var $4267 = self.slice(1);
                    var self = ($4266 === 10);
                    if (self) {
                        var _stp$12 = Maybe$extract$(_lft$6, Bool$false, Nat$is_zero);
                        var self = _stp$12;
                        if (self) {
                            var $4270 = Kind$highlight$end$(_col$4, _row$5, List$reverse$(_res$8));
                            var $4269 = $4270;
                        } else {
                            var _siz$13 = Nat$succ$(Nat$double$(_spa$9));
                            var self = _ix1$3;
                            if (self === 0n) {
                                var self = _lft$6;
                                switch (self._) {
                                    case 'Maybe.some':
                                        var $4273 = self.value;
                                        var $4274 = Maybe$some$(Nat$pred$($4273));
                                        var $4272 = $4274;
                                        break;
                                    case 'Maybe.none':
                                        var $4275 = Maybe$some$(_spa$9);
                                        var $4272 = $4275;
                                        break;
                                };
                                var _lft$14 = $4272;
                            } else {
                                var $4276 = (self - 1n);
                                var $4277 = _lft$6;
                                var _lft$14 = $4277;
                            };
                            var _ix0$15 = Nat$pred$(_ix0$2);
                            var _ix1$16 = Nat$pred$(_ix1$3);
                            var _col$17 = 0n;
                            var _row$18 = Nat$succ$(_row$5);
                            var _res$19 = List$cons$(String$reverse$(_lin$7), _res$8);
                            var _lin$20 = String$reverse$(String$flatten$(List$cons$(String$pad_left$(4n, 32, Nat$show$(_row$18)), List$cons$(" | ", List$nil))));
                            var $4271 = Kind$highlight$tc$($4267, _ix0$15, _ix1$16, _col$17, _row$18, _lft$14, _lin$20, _res$19);
                            var $4269 = $4271;
                        };
                        var $4268 = $4269;
                    } else {
                        var _chr$12 = String$cons$($4266, String$nil);
                        var self = (Nat$is_zero$(_ix0$2) && (!Nat$is_zero$(_ix1$3)));
                        if (self) {
                            var $4279 = String$reverse$(Kind$color$("31", Kind$color$("4", _chr$12)));
                            var _chr$13 = $4279;
                        } else {
                            var $4280 = _chr$12;
                            var _chr$13 = $4280;
                        };
                        var self = (_ix0$2 === 1n);
                        if (self) {
                            var $4281 = List$take$(_spa$9, _res$8);
                            var _res$14 = $4281;
                        } else {
                            var $4282 = _res$8;
                            var _res$14 = $4282;
                        };
                        var _ix0$15 = Nat$pred$(_ix0$2);
                        var _ix1$16 = Nat$pred$(_ix1$3);
                        var _col$17 = Nat$succ$(_col$4);
                        var _lin$18 = String$flatten$(List$cons$(_chr$13, List$cons$(_lin$7, List$nil)));
                        var $4278 = Kind$highlight$tc$($4267, _ix0$15, _ix1$16, _col$17, _row$5, _lft$6, _lin$18, _res$14);
                        var $4268 = $4278;
                    };
                    var $4264 = $4268;
                };
                return $4264;
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Kind$highlight$tc = x0 => x1 => x2 => x3 => x4 => x5 => x6 => x7 => Kind$highlight$tc$(x0, x1, x2, x3, x4, x5, x6, x7);

    function Kind$highlight$(_code$1, _idx0$2, _idx1$3) {
        var $4283 = Kind$highlight$tc$(_code$1, _idx0$2, _idx1$3, 0n, 1n, Maybe$none, String$reverse$("   1 | "), List$nil);
        return $4283;
    };
    const Kind$highlight = x0 => x1 => x2 => Kind$highlight$(x0, x1, x2);

    function Kind$Defs$read$(_file$1, _code$2, _defs$3) {
        var self = Kind$Parser$file$(_file$1, _code$2, _defs$3, 0n, _code$2);
        switch (self._) {
            case 'Parser.Reply.error':
                var $4285 = self.idx;
                var $4286 = self.err;
                var _err$7 = $4286;
                var _hig$8 = Kind$highlight$(_code$2, $4285, Nat$succ$($4285));
                var _str$9 = String$flatten$(List$cons$(_err$7, List$cons$("\u{a}", List$cons$(_hig$8, List$nil))));
                var $4287 = Either$left$(_str$9);
                var $4284 = $4287;
                break;
            case 'Parser.Reply.value':
                var $4288 = self.val;
                var $4289 = Either$right$($4288);
                var $4284 = $4289;
                break;
        };
        return $4284;
    };
    const Kind$Defs$read = x0 => x1 => x2 => Kind$Defs$read$(x0, x1, x2);

    function Kind$Synth$load$go$(_name$1, _files$2, _defs$3) {
        var self = _files$2;
        switch (self._) {
            case 'List.cons':
                var $4291 = self.head;
                var $4292 = self.tail;
                var $4293 = IO$monad$((_m$bind$6 => _m$pure$7 => {
                    var $4294 = _m$bind$6;
                    return $4294;
                }))(IO$get_file$($4291))((_code$6 => {
                    var _read$7 = Kind$Defs$read$($4291, _code$6, _defs$3);
                    var self = _read$7;
                    switch (self._) {
                        case 'Either.right':
                            var $4296 = self.value;
                            var _defs$9 = $4296;
                            var self = Kind$get$(_name$1, _defs$9);
                            switch (self._) {
                                case 'Maybe.none':
                                    var $4298 = Kind$Synth$load$go$(_name$1, $4292, _defs$9);
                                    var $4297 = $4298;
                                    break;
                                case 'Maybe.some':
                                    var $4299 = IO$monad$((_m$bind$11 => _m$pure$12 => {
                                        var $4300 = _m$pure$12;
                                        return $4300;
                                    }))(Maybe$some$(_defs$9));
                                    var $4297 = $4299;
                                    break;
                            };
                            var $4295 = $4297;
                            break;
                        case 'Either.left':
                            var $4301 = Kind$Synth$load$go$(_name$1, $4292, _defs$3);
                            var $4295 = $4301;
                            break;
                    };
                    return $4295;
                }));
                var $4290 = $4293;
                break;
            case 'List.nil':
                var $4302 = IO$monad$((_m$bind$4 => _m$pure$5 => {
                    var $4303 = _m$pure$5;
                    return $4303;
                }))(Maybe$none);
                var $4290 = $4302;
                break;
        };
        return $4290;
    };
    const Kind$Synth$load$go = x0 => x1 => x2 => Kind$Synth$load$go$(x0, x1, x2);

    function Kind$Synth$files_of$make$(_names$1, _last$2) {
        var self = _names$1;
        switch (self._) {
            case 'List.cons':
                var $4305 = self.head;
                var $4306 = self.tail;
                var _head$5 = (_last$2 + ($4305 + ".kind"));
                var _tail$6 = Kind$Synth$files_of$make$($4306, (_last$2 + ($4305 + "/")));
                var $4307 = List$cons$(_head$5, _tail$6);
                var $4304 = $4307;
                break;
            case 'List.nil':
                var $4308 = List$nil;
                var $4304 = $4308;
                break;
        };
        return $4304;
    };
    const Kind$Synth$files_of$make = x0 => x1 => Kind$Synth$files_of$make$(x0, x1);

    function Char$eql$(_a$1, _b$2) {
        var $4309 = (_a$1 === _b$2);
        return $4309;
    };
    const Char$eql = x0 => x1 => Char$eql$(x0, x1);

    function String$starts_with$(_xs$1, _match$2) {
        var String$starts_with$ = (_xs$1, _match$2) => ({
            ctr: 'TCO',
            arg: [_xs$1, _match$2]
        });
        var String$starts_with = _xs$1 => _match$2 => String$starts_with$(_xs$1, _match$2);
        var arg = [_xs$1, _match$2];
        while (true) {
            let [_xs$1, _match$2] = arg;
            var R = (() => {
                var self = _match$2;
                if (self.length === 0) {
                    var $4310 = Bool$true;
                    return $4310;
                } else {
                    var $4311 = self.charCodeAt(0);
                    var $4312 = self.slice(1);
                    var self = _xs$1;
                    if (self.length === 0) {
                        var $4314 = Bool$false;
                        var $4313 = $4314;
                    } else {
                        var $4315 = self.charCodeAt(0);
                        var $4316 = self.slice(1);
                        var self = Char$eql$($4311, $4315);
                        if (self) {
                            var $4318 = String$starts_with$($4316, $4312);
                            var $4317 = $4318;
                        } else {
                            var $4319 = Bool$false;
                            var $4317 = $4319;
                        };
                        var $4313 = $4317;
                    };
                    return $4313;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const String$starts_with = x0 => x1 => String$starts_with$(x0, x1);

    function String$drop$(_n$1, _xs$2) {
        var String$drop$ = (_n$1, _xs$2) => ({
            ctr: 'TCO',
            arg: [_n$1, _xs$2]
        });
        var String$drop = _n$1 => _xs$2 => String$drop$(_n$1, _xs$2);
        var arg = [_n$1, _xs$2];
        while (true) {
            let [_n$1, _xs$2] = arg;
            var R = (() => {
                var self = _n$1;
                if (self === 0n) {
                    var $4320 = _xs$2;
                    return $4320;
                } else {
                    var $4321 = (self - 1n);
                    var self = _xs$2;
                    if (self.length === 0) {
                        var $4323 = String$nil;
                        var $4322 = $4323;
                    } else {
                        var $4324 = self.charCodeAt(0);
                        var $4325 = self.slice(1);
                        var $4326 = String$drop$($4321, $4325);
                        var $4322 = $4326;
                    };
                    return $4322;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const String$drop = x0 => x1 => String$drop$(x0, x1);

    function String$length$go$(_xs$1, _n$2) {
        var String$length$go$ = (_xs$1, _n$2) => ({
            ctr: 'TCO',
            arg: [_xs$1, _n$2]
        });
        var String$length$go = _xs$1 => _n$2 => String$length$go$(_xs$1, _n$2);
        var arg = [_xs$1, _n$2];
        while (true) {
            let [_xs$1, _n$2] = arg;
            var R = (() => {
                var self = _xs$1;
                if (self.length === 0) {
                    var $4327 = _n$2;
                    return $4327;
                } else {
                    var $4328 = self.charCodeAt(0);
                    var $4329 = self.slice(1);
                    var $4330 = String$length$go$($4329, Nat$succ$(_n$2));
                    return $4330;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const String$length$go = x0 => x1 => String$length$go$(x0, x1);

    function String$length$(_xs$1) {
        var $4331 = String$length$go$(_xs$1, 0n);
        return $4331;
    };
    const String$length = x0 => String$length$(x0);

    function String$split$go$(_xs$1, _match$2, _last$3) {
        var self = _xs$1;
        if (self.length === 0) {
            var $4333 = List$cons$(_last$3, List$nil);
            var $4332 = $4333;
        } else {
            var $4334 = self.charCodeAt(0);
            var $4335 = self.slice(1);
            var self = String$starts_with$(_xs$1, _match$2);
            if (self) {
                var _rest$6 = String$drop$(String$length$(_match$2), _xs$1);
                var $4337 = List$cons$(_last$3, String$split$go$(_rest$6, _match$2, ""));
                var $4336 = $4337;
            } else {
                var _next$6 = String$cons$($4334, String$nil);
                var $4338 = String$split$go$($4335, _match$2, (_last$3 + _next$6));
                var $4336 = $4338;
            };
            var $4332 = $4336;
        };
        return $4332;
    };
    const String$split$go = x0 => x1 => x2 => String$split$go$(x0, x1, x2);

    function String$split$(_xs$1, _match$2) {
        var $4339 = String$split$go$(_xs$1, _match$2, "");
        return $4339;
    };
    const String$split = x0 => x1 => String$split$(x0, x1);

    function Kind$Synth$files_of$(_name$1) {
        var $4340 = List$reverse$(Kind$Synth$files_of$make$(String$split$(_name$1, "."), ""));
        return $4340;
    };
    const Kind$Synth$files_of = x0 => Kind$Synth$files_of$(x0);

    function Kind$Synth$load$(_name$1, _defs$2) {
        var $4341 = Kind$Synth$load$go$(_name$1, Kind$Synth$files_of$(_name$1), _defs$2);
        return $4341;
    };
    const Kind$Synth$load = x0 => x1 => Kind$Synth$load$(x0, x1);
    const Kind$Status$wait = ({
        _: 'Kind.Status.wait'
    });

    function Kind$Check$(_V$1) {
        var $4342 = null;
        return $4342;
    };
    const Kind$Check = x0 => Kind$Check$(x0);

    function Kind$Check$result$(_value$2, _errors$3) {
        var $4343 = ({
            _: 'Kind.Check.result',
            'value': _value$2,
            'errors': _errors$3
        });
        return $4343;
    };
    const Kind$Check$result = x0 => x1 => Kind$Check$result$(x0, x1);

    function Kind$Error$undefined_reference$(_origin$1, _name$2) {
        var $4344 = ({
            _: 'Kind.Error.undefined_reference',
            'origin': _origin$1,
            'name': _name$2
        });
        return $4344;
    };
    const Kind$Error$undefined_reference = x0 => x1 => Kind$Error$undefined_reference$(x0, x1);

    function Kind$Error$waiting$(_name$1) {
        var $4345 = ({
            _: 'Kind.Error.waiting',
            'name': _name$1
        });
        return $4345;
    };
    const Kind$Error$waiting = x0 => Kind$Error$waiting$(x0);

    function Kind$Error$indirect$(_name$1) {
        var $4346 = ({
            _: 'Kind.Error.indirect',
            'name': _name$1
        });
        return $4346;
    };
    const Kind$Error$indirect = x0 => Kind$Error$indirect$(x0);

    function Maybe$mapped$(_m$2, _f$4) {
        var self = _m$2;
        switch (self._) {
            case 'Maybe.some':
                var $4348 = self.value;
                var $4349 = Maybe$some$(_f$4($4348));
                var $4347 = $4349;
                break;
            case 'Maybe.none':
                var $4350 = Maybe$none;
                var $4347 = $4350;
                break;
        };
        return $4347;
    };
    const Maybe$mapped = x0 => x1 => Maybe$mapped$(x0, x1);

    function Kind$MPath$o$(_path$1) {
        var $4351 = Maybe$mapped$(_path$1, Kind$Path$o);
        return $4351;
    };
    const Kind$MPath$o = x0 => Kind$MPath$o$(x0);

    function Kind$MPath$i$(_path$1) {
        var $4352 = Maybe$mapped$(_path$1, Kind$Path$i);
        return $4352;
    };
    const Kind$MPath$i = x0 => Kind$MPath$i$(x0);

    function Kind$Error$patch$(_path$1, _term$2) {
        var $4353 = ({
            _: 'Kind.Error.patch',
            'path': _path$1,
            'term': _term$2
        });
        return $4353;
    };
    const Kind$Error$patch = x0 => x1 => Kind$Error$patch$(x0, x1);

    function Kind$MPath$to_bits$(_path$1) {
        var self = _path$1;
        switch (self._) {
            case 'Maybe.some':
                var $4355 = self.value;
                var $4356 = $4355(Bits$e);
                var $4354 = $4356;
                break;
            case 'Maybe.none':
                var $4357 = Bits$e;
                var $4354 = $4357;
                break;
        };
        return $4354;
    };
    const Kind$MPath$to_bits = x0 => Kind$MPath$to_bits$(x0);

    function Kind$Error$type_mismatch$(_origin$1, _expected$2, _detected$3, _context$4) {
        var $4358 = ({
            _: 'Kind.Error.type_mismatch',
            'origin': _origin$1,
            'expected': _expected$2,
            'detected': _detected$3,
            'context': _context$4
        });
        return $4358;
    };
    const Kind$Error$type_mismatch = x0 => x1 => x2 => x3 => Kind$Error$type_mismatch$(x0, x1, x2, x3);

    function Kind$Error$show_goal$(_name$1, _dref$2, _verb$3, _goal$4, _context$5) {
        var $4359 = ({
            _: 'Kind.Error.show_goal',
            'name': _name$1,
            'dref': _dref$2,
            'verb': _verb$3,
            'goal': _goal$4,
            'context': _context$5
        });
        return $4359;
    };
    const Kind$Error$show_goal = x0 => x1 => x2 => x3 => x4 => Kind$Error$show_goal$(x0, x1, x2, x3, x4);

    function Kind$Term$normalize$(_term$1, _defs$2) {
        var self = Kind$Term$reduce$(_term$1, _defs$2);
        switch (self._) {
            case 'Kind.Term.var':
                var $4361 = self.name;
                var $4362 = self.indx;
                var $4363 = Kind$Term$var$($4361, $4362);
                var $4360 = $4363;
                break;
            case 'Kind.Term.ref':
                var $4364 = self.name;
                var $4365 = Kind$Term$ref$($4364);
                var $4360 = $4365;
                break;
            case 'Kind.Term.all':
                var $4366 = self.eras;
                var $4367 = self.self;
                var $4368 = self.name;
                var $4369 = self.xtyp;
                var $4370 = self.body;
                var $4371 = Kind$Term$all$($4366, $4367, $4368, Kind$Term$normalize$($4369, _defs$2), (_s$8 => _x$9 => {
                    var $4372 = Kind$Term$normalize$($4370(_s$8)(_x$9), _defs$2);
                    return $4372;
                }));
                var $4360 = $4371;
                break;
            case 'Kind.Term.lam':
                var $4373 = self.name;
                var $4374 = self.body;
                var $4375 = Kind$Term$lam$($4373, (_x$5 => {
                    var $4376 = Kind$Term$normalize$($4374(_x$5), _defs$2);
                    return $4376;
                }));
                var $4360 = $4375;
                break;
            case 'Kind.Term.app':
                var $4377 = self.func;
                var $4378 = self.argm;
                var $4379 = Kind$Term$app$(Kind$Term$normalize$($4377, _defs$2), Kind$Term$normalize$($4378, _defs$2));
                var $4360 = $4379;
                break;
            case 'Kind.Term.let':
                var $4380 = self.name;
                var $4381 = self.expr;
                var $4382 = self.body;
                var $4383 = Kind$Term$let$($4380, Kind$Term$normalize$($4381, _defs$2), (_x$6 => {
                    var $4384 = Kind$Term$normalize$($4382(_x$6), _defs$2);
                    return $4384;
                }));
                var $4360 = $4383;
                break;
            case 'Kind.Term.def':
                var $4385 = self.name;
                var $4386 = self.expr;
                var $4387 = self.body;
                var $4388 = Kind$Term$def$($4385, Kind$Term$normalize$($4386, _defs$2), (_x$6 => {
                    var $4389 = Kind$Term$normalize$($4387(_x$6), _defs$2);
                    return $4389;
                }));
                var $4360 = $4388;
                break;
            case 'Kind.Term.ann':
                var $4390 = self.done;
                var $4391 = self.term;
                var $4392 = self.type;
                var $4393 = Kind$Term$ann$($4390, Kind$Term$normalize$($4391, _defs$2), Kind$Term$normalize$($4392, _defs$2));
                var $4360 = $4393;
                break;
            case 'Kind.Term.gol':
                var $4394 = self.name;
                var $4395 = self.dref;
                var $4396 = self.verb;
                var $4397 = Kind$Term$gol$($4394, $4395, $4396);
                var $4360 = $4397;
                break;
            case 'Kind.Term.hol':
                var $4398 = self.path;
                var $4399 = Kind$Term$hol$($4398);
                var $4360 = $4399;
                break;
            case 'Kind.Term.nat':
                var $4400 = self.natx;
                var $4401 = Kind$Term$nat$($4400);
                var $4360 = $4401;
                break;
            case 'Kind.Term.chr':
                var $4402 = self.chrx;
                var $4403 = Kind$Term$chr$($4402);
                var $4360 = $4403;
                break;
            case 'Kind.Term.str':
                var $4404 = self.strx;
                var $4405 = Kind$Term$str$($4404);
                var $4360 = $4405;
                break;
            case 'Kind.Term.ori':
                var $4406 = self.expr;
                var $4407 = Kind$Term$normalize$($4406, _defs$2);
                var $4360 = $4407;
                break;
            case 'Kind.Term.typ':
                var $4408 = Kind$Term$typ;
                var $4360 = $4408;
                break;
            case 'Kind.Term.cse':
                var $4409 = _term$1;
                var $4360 = $4409;
                break;
        };
        return $4360;
    };
    const Kind$Term$normalize = x0 => x1 => Kind$Term$normalize$(x0, x1);

    function List$tail$(_xs$2) {
        var self = _xs$2;
        switch (self._) {
            case 'List.cons':
                var $4411 = self.tail;
                var $4412 = $4411;
                var $4410 = $4412;
                break;
            case 'List.nil':
                var $4413 = List$nil;
                var $4410 = $4413;
                break;
        };
        return $4410;
    };
    const List$tail = x0 => List$tail$(x0);

    function Kind$SmartMotive$vals$cont$(_expr$1, _term$2, _args$3, _defs$4) {
        var Kind$SmartMotive$vals$cont$ = (_expr$1, _term$2, _args$3, _defs$4) => ({
            ctr: 'TCO',
            arg: [_expr$1, _term$2, _args$3, _defs$4]
        });
        var Kind$SmartMotive$vals$cont = _expr$1 => _term$2 => _args$3 => _defs$4 => Kind$SmartMotive$vals$cont$(_expr$1, _term$2, _args$3, _defs$4);
        var arg = [_expr$1, _term$2, _args$3, _defs$4];
        while (true) {
            let [_expr$1, _term$2, _args$3, _defs$4] = arg;
            var R = (() => {
                var self = Kind$Term$reduce$(_term$2, _defs$4);
                switch (self._) {
                    case 'Kind.Term.app':
                        var $4414 = self.func;
                        var $4415 = self.argm;
                        var $4416 = Kind$SmartMotive$vals$cont$(_expr$1, $4414, List$cons$($4415, _args$3), _defs$4);
                        return $4416;
                    case 'Kind.Term.var':
                    case 'Kind.Term.ref':
                    case 'Kind.Term.typ':
                    case 'Kind.Term.all':
                    case 'Kind.Term.lam':
                    case 'Kind.Term.let':
                    case 'Kind.Term.def':
                    case 'Kind.Term.ann':
                    case 'Kind.Term.gol':
                    case 'Kind.Term.hol':
                    case 'Kind.Term.nat':
                    case 'Kind.Term.chr':
                    case 'Kind.Term.str':
                    case 'Kind.Term.cse':
                    case 'Kind.Term.ori':
                        var $4417 = List$cons$(_expr$1, List$tail$(List$reverse$(_args$3)));
                        return $4417;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Kind$SmartMotive$vals$cont = x0 => x1 => x2 => x3 => Kind$SmartMotive$vals$cont$(x0, x1, x2, x3);

    function Kind$SmartMotive$vals$(_expr$1, _type$2, _defs$3) {
        var Kind$SmartMotive$vals$ = (_expr$1, _type$2, _defs$3) => ({
            ctr: 'TCO',
            arg: [_expr$1, _type$2, _defs$3]
        });
        var Kind$SmartMotive$vals = _expr$1 => _type$2 => _defs$3 => Kind$SmartMotive$vals$(_expr$1, _type$2, _defs$3);
        var arg = [_expr$1, _type$2, _defs$3];
        while (true) {
            let [_expr$1, _type$2, _defs$3] = arg;
            var R = (() => {
                var self = Kind$Term$reduce$(_type$2, _defs$3);
                switch (self._) {
                    case 'Kind.Term.all':
                        var $4418 = self.body;
                        var $4419 = Kind$SmartMotive$vals$(_expr$1, $4418(Kind$Term$typ)(Kind$Term$typ), _defs$3);
                        return $4419;
                    case 'Kind.Term.var':
                    case 'Kind.Term.ref':
                    case 'Kind.Term.typ':
                    case 'Kind.Term.lam':
                    case 'Kind.Term.app':
                    case 'Kind.Term.let':
                    case 'Kind.Term.def':
                    case 'Kind.Term.ann':
                    case 'Kind.Term.gol':
                    case 'Kind.Term.hol':
                    case 'Kind.Term.nat':
                    case 'Kind.Term.chr':
                    case 'Kind.Term.str':
                    case 'Kind.Term.cse':
                    case 'Kind.Term.ori':
                        var $4420 = Kind$SmartMotive$vals$cont$(_expr$1, _type$2, List$nil, _defs$3);
                        return $4420;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Kind$SmartMotive$vals = x0 => x1 => x2 => Kind$SmartMotive$vals$(x0, x1, x2);

    function Kind$SmartMotive$nams$cont$(_name$1, _term$2, _binds$3, _defs$4) {
        var Kind$SmartMotive$nams$cont$ = (_name$1, _term$2, _binds$3, _defs$4) => ({
            ctr: 'TCO',
            arg: [_name$1, _term$2, _binds$3, _defs$4]
        });
        var Kind$SmartMotive$nams$cont = _name$1 => _term$2 => _binds$3 => _defs$4 => Kind$SmartMotive$nams$cont$(_name$1, _term$2, _binds$3, _defs$4);
        var arg = [_name$1, _term$2, _binds$3, _defs$4];
        while (true) {
            let [_name$1, _term$2, _binds$3, _defs$4] = arg;
            var R = (() => {
                var self = Kind$Term$reduce$(_term$2, _defs$4);
                switch (self._) {
                    case 'Kind.Term.all':
                        var $4421 = self.self;
                        var $4422 = self.name;
                        var $4423 = self.body;
                        var $4424 = Kind$SmartMotive$nams$cont$(_name$1, $4423(Kind$Term$ref$($4421))(Kind$Term$ref$($4422)), List$cons$(String$flatten$(List$cons$(_name$1, List$cons$(".", List$cons$($4422, List$nil)))), _binds$3), _defs$4);
                        return $4424;
                    case 'Kind.Term.var':
                    case 'Kind.Term.ref':
                    case 'Kind.Term.typ':
                    case 'Kind.Term.lam':
                    case 'Kind.Term.app':
                    case 'Kind.Term.let':
                    case 'Kind.Term.def':
                    case 'Kind.Term.ann':
                    case 'Kind.Term.gol':
                    case 'Kind.Term.hol':
                    case 'Kind.Term.nat':
                    case 'Kind.Term.chr':
                    case 'Kind.Term.str':
                    case 'Kind.Term.cse':
                    case 'Kind.Term.ori':
                        var $4425 = List$cons$(_name$1, List$tail$(_binds$3));
                        return $4425;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Kind$SmartMotive$nams$cont = x0 => x1 => x2 => x3 => Kind$SmartMotive$nams$cont$(x0, x1, x2, x3);

    function Kind$SmartMotive$nams$(_name$1, _type$2, _defs$3) {
        var self = Kind$Term$reduce$(_type$2, _defs$3);
        switch (self._) {
            case 'Kind.Term.all':
                var $4427 = self.xtyp;
                var $4428 = Kind$SmartMotive$nams$cont$(_name$1, $4427, List$nil, _defs$3);
                var $4426 = $4428;
                break;
            case 'Kind.Term.var':
            case 'Kind.Term.ref':
            case 'Kind.Term.typ':
            case 'Kind.Term.lam':
            case 'Kind.Term.app':
            case 'Kind.Term.let':
            case 'Kind.Term.def':
            case 'Kind.Term.ann':
            case 'Kind.Term.gol':
            case 'Kind.Term.hol':
            case 'Kind.Term.nat':
            case 'Kind.Term.chr':
            case 'Kind.Term.str':
            case 'Kind.Term.cse':
            case 'Kind.Term.ori':
                var $4429 = List$nil;
                var $4426 = $4429;
                break;
        };
        return $4426;
    };
    const Kind$SmartMotive$nams = x0 => x1 => x2 => Kind$SmartMotive$nams$(x0, x1, x2);

    function List$zip$(_as$3, _bs$4) {
        var self = _as$3;
        switch (self._) {
            case 'List.cons':
                var $4431 = self.head;
                var $4432 = self.tail;
                var self = _bs$4;
                switch (self._) {
                    case 'List.cons':
                        var $4434 = self.head;
                        var $4435 = self.tail;
                        var $4436 = List$cons$(Pair$new$($4431, $4434), List$zip$($4432, $4435));
                        var $4433 = $4436;
                        break;
                    case 'List.nil':
                        var $4437 = List$nil;
                        var $4433 = $4437;
                        break;
                };
                var $4430 = $4433;
                break;
            case 'List.nil':
                var $4438 = List$nil;
                var $4430 = $4438;
                break;
        };
        return $4430;
    };
    const List$zip = x0 => x1 => List$zip$(x0, x1);
    const Nat$gte = a0 => a1 => (a0 >= a1);
    const Nat$sub = a0 => a1 => (a0 - a1 <= 0n ? 0n : a0 - a1);

    function Kind$Term$serialize$name$(_name$1) {
        var $4439 = (kind_name_to_bits(_name$1));
        return $4439;
    };
    const Kind$Term$serialize$name = x0 => Kind$Term$serialize$name$(x0);

    function Kind$Term$serialize$(_term$1, _depth$2, _init$3, _diff$4, _x$5) {
        var self = _term$1;
        switch (self._) {
            case 'Kind.Term.var':
                var $4441 = self.indx;
                var self = ($4441 >= _init$3);
                if (self) {
                    var _name$8 = a1 => (a1 + (nat_to_bits(Nat$pred$((_depth$2 - $4441 <= 0n ? 0n : _depth$2 - $4441)))));
                    var $4443 = (((_name$8(_x$5) + '1') + '0') + '0');
                    var $4442 = $4443;
                } else {
                    var _name$8 = a1 => (a1 + (nat_to_bits($4441)));
                    var $4444 = (((_name$8(_x$5) + '0') + '1') + '0');
                    var $4442 = $4444;
                };
                var $4440 = $4442;
                break;
            case 'Kind.Term.ref':
                var $4445 = self.name;
                var _name$7 = a1 => (a1 + Kind$Term$serialize$name$($4445));
                var $4446 = (((_name$7(_x$5) + '0') + '0') + '0');
                var $4440 = $4446;
                break;
            case 'Kind.Term.all':
                var $4447 = self.eras;
                var $4448 = self.self;
                var $4449 = self.name;
                var $4450 = self.xtyp;
                var $4451 = self.body;
                var self = $4447;
                if (self) {
                    var $4453 = Bits$i;
                    var _eras$11 = $4453;
                } else {
                    var $4454 = Bits$o;
                    var _eras$11 = $4454;
                };
                var _self$12 = a1 => (a1 + (kind_name_to_bits($4448)));
                var _xtyp$13 = Kind$Term$serialize($4450)(_depth$2)(_init$3)(_diff$4);
                var _body$14 = Kind$Term$serialize($4451(Kind$Term$var$($4448, _depth$2))(Kind$Term$var$($4449, Nat$succ$(_depth$2))))(Nat$succ$(Nat$succ$(_depth$2)))(_init$3)(_diff$4);
                var $4452 = (((_eras$11(_self$12(_xtyp$13(_body$14(_x$5)))) + '0') + '0') + '1');
                var $4440 = $4452;
                break;
            case 'Kind.Term.lam':
                var $4455 = self.name;
                var $4456 = self.body;
                var _body$8 = Kind$Term$serialize($4456(Kind$Term$var$($4455, _depth$2)))(Nat$succ$(_depth$2))(_init$3)(_diff$4);
                var $4457 = (((_body$8(_x$5) + '1') + '0') + '1');
                var $4440 = $4457;
                break;
            case 'Kind.Term.app':
                var $4458 = self.func;
                var $4459 = self.argm;
                var _func$8 = Kind$Term$serialize($4458)(_depth$2)(_init$3)(_diff$4);
                var _argm$9 = Kind$Term$serialize($4459)(_depth$2)(_init$3)(_diff$4);
                var $4460 = (((_func$8(_argm$9(_x$5)) + '0') + '1') + '1');
                var $4440 = $4460;
                break;
            case 'Kind.Term.let':
                var $4461 = self.name;
                var $4462 = self.expr;
                var $4463 = self.body;
                var _expr$9 = Kind$Term$serialize($4462)(_depth$2)(_init$3)(_diff$4);
                var _body$10 = Kind$Term$serialize($4463(Kind$Term$var$($4461, _depth$2)))(Nat$succ$(_depth$2))(_init$3)(_diff$4);
                var $4464 = (((_expr$9(_body$10(_x$5)) + '1') + '1') + '1');
                var $4440 = $4464;
                break;
            case 'Kind.Term.def':
                var $4465 = self.expr;
                var $4466 = self.body;
                var $4467 = Kind$Term$serialize$($4466($4465), _depth$2, _init$3, _diff$4, _x$5);
                var $4440 = $4467;
                break;
            case 'Kind.Term.ann':
                var $4468 = self.term;
                var $4469 = Kind$Term$serialize$($4468, _depth$2, _init$3, _diff$4, _x$5);
                var $4440 = $4469;
                break;
            case 'Kind.Term.gol':
                var $4470 = self.name;
                var _name$9 = a1 => (a1 + (kind_name_to_bits($4470)));
                var $4471 = (((_name$9(_x$5) + '0') + '0') + '0');
                var $4440 = $4471;
                break;
            case 'Kind.Term.nat':
                var $4472 = self.natx;
                var $4473 = Kind$Term$serialize$(Kind$Term$unroll_nat$($4472), _depth$2, _init$3, _diff$4, _x$5);
                var $4440 = $4473;
                break;
            case 'Kind.Term.chr':
                var $4474 = self.chrx;
                var $4475 = Kind$Term$serialize$(Kind$Term$unroll_chr$($4474), _depth$2, _init$3, _diff$4, _x$5);
                var $4440 = $4475;
                break;
            case 'Kind.Term.str':
                var $4476 = self.strx;
                var $4477 = Kind$Term$serialize$(Kind$Term$unroll_str$($4476), _depth$2, _init$3, _diff$4, _x$5);
                var $4440 = $4477;
                break;
            case 'Kind.Term.ori':
                var $4478 = self.expr;
                var $4479 = Kind$Term$serialize$($4478, _depth$2, _init$3, _diff$4, _x$5);
                var $4440 = $4479;
                break;
            case 'Kind.Term.typ':
                var $4480 = (((_x$5 + '1') + '1') + '0');
                var $4440 = $4480;
                break;
            case 'Kind.Term.hol':
                var $4481 = _x$5;
                var $4440 = $4481;
                break;
            case 'Kind.Term.cse':
                var $4482 = _diff$4(_x$5);
                var $4440 = $4482;
                break;
        };
        return $4440;
    };
    const Kind$Term$serialize = x0 => x1 => x2 => x3 => x4 => Kind$Term$serialize$(x0, x1, x2, x3, x4);
    const Bits$eql = a0 => a1 => (a1 === a0);

    function Kind$Term$identical$(_a$1, _b$2, _lv$3) {
        var _ah$4 = Kind$Term$serialize$(_a$1, _lv$3, _lv$3, Bits$o, Bits$e);
        var _bh$5 = Kind$Term$serialize$(_b$2, _lv$3, _lv$3, Bits$i, Bits$e);
        var $4483 = (_bh$5 === _ah$4);
        return $4483;
    };
    const Kind$Term$identical = x0 => x1 => x2 => Kind$Term$identical$(x0, x1, x2);

    function Kind$SmartMotive$replace$(_term$1, _from$2, _to$3, _lv$4) {
        var self = Kind$Term$identical$(_term$1, _from$2, _lv$4);
        if (self) {
            var $4485 = _to$3;
            var $4484 = $4485;
        } else {
            var self = _term$1;
            switch (self._) {
                case 'Kind.Term.var':
                    var $4487 = self.name;
                    var $4488 = self.indx;
                    var $4489 = Kind$Term$var$($4487, $4488);
                    var $4486 = $4489;
                    break;
                case 'Kind.Term.ref':
                    var $4490 = self.name;
                    var $4491 = Kind$Term$ref$($4490);
                    var $4486 = $4491;
                    break;
                case 'Kind.Term.all':
                    var $4492 = self.eras;
                    var $4493 = self.self;
                    var $4494 = self.name;
                    var $4495 = self.xtyp;
                    var $4496 = self.body;
                    var _xtyp$10 = Kind$SmartMotive$replace$($4495, _from$2, _to$3, _lv$4);
                    var _body$11 = $4496(Kind$Term$ref$($4493))(Kind$Term$ref$($4494));
                    var _body$12 = Kind$SmartMotive$replace$(_body$11, _from$2, _to$3, Nat$succ$(Nat$succ$(_lv$4)));
                    var $4497 = Kind$Term$all$($4492, $4493, $4494, _xtyp$10, (_s$13 => _x$14 => {
                        var $4498 = _body$12;
                        return $4498;
                    }));
                    var $4486 = $4497;
                    break;
                case 'Kind.Term.lam':
                    var $4499 = self.name;
                    var $4500 = self.body;
                    var _body$7 = $4500(Kind$Term$ref$($4499));
                    var _body$8 = Kind$SmartMotive$replace$(_body$7, _from$2, _to$3, Nat$succ$(_lv$4));
                    var $4501 = Kind$Term$lam$($4499, (_x$9 => {
                        var $4502 = _body$8;
                        return $4502;
                    }));
                    var $4486 = $4501;
                    break;
                case 'Kind.Term.app':
                    var $4503 = self.func;
                    var $4504 = self.argm;
                    var _func$7 = Kind$SmartMotive$replace$($4503, _from$2, _to$3, _lv$4);
                    var _argm$8 = Kind$SmartMotive$replace$($4504, _from$2, _to$3, _lv$4);
                    var $4505 = Kind$Term$app$(_func$7, _argm$8);
                    var $4486 = $4505;
                    break;
                case 'Kind.Term.let':
                    var $4506 = self.name;
                    var $4507 = self.expr;
                    var $4508 = self.body;
                    var _expr$8 = Kind$SmartMotive$replace$($4507, _from$2, _to$3, _lv$4);
                    var _body$9 = $4508(Kind$Term$ref$($4506));
                    var _body$10 = Kind$SmartMotive$replace$(_body$9, _from$2, _to$3, Nat$succ$(_lv$4));
                    var $4509 = Kind$Term$let$($4506, _expr$8, (_x$11 => {
                        var $4510 = _body$10;
                        return $4510;
                    }));
                    var $4486 = $4509;
                    break;
                case 'Kind.Term.def':
                    var $4511 = self.name;
                    var $4512 = self.expr;
                    var $4513 = self.body;
                    var _expr$8 = Kind$SmartMotive$replace$($4512, _from$2, _to$3, _lv$4);
                    var _body$9 = $4513(Kind$Term$ref$($4511));
                    var _body$10 = Kind$SmartMotive$replace$(_body$9, _from$2, _to$3, Nat$succ$(_lv$4));
                    var $4514 = Kind$Term$def$($4511, _expr$8, (_x$11 => {
                        var $4515 = _body$10;
                        return $4515;
                    }));
                    var $4486 = $4514;
                    break;
                case 'Kind.Term.ann':
                    var $4516 = self.done;
                    var $4517 = self.term;
                    var $4518 = self.type;
                    var _term$8 = Kind$SmartMotive$replace$($4517, _from$2, _to$3, _lv$4);
                    var _type$9 = Kind$SmartMotive$replace$($4518, _from$2, _to$3, _lv$4);
                    var $4519 = Kind$Term$ann$($4516, _term$8, _type$9);
                    var $4486 = $4519;
                    break;
                case 'Kind.Term.ori':
                    var $4520 = self.expr;
                    var $4521 = Kind$SmartMotive$replace$($4520, _from$2, _to$3, _lv$4);
                    var $4486 = $4521;
                    break;
                case 'Kind.Term.typ':
                    var $4522 = Kind$Term$typ;
                    var $4486 = $4522;
                    break;
                case 'Kind.Term.gol':
                case 'Kind.Term.hol':
                case 'Kind.Term.nat':
                case 'Kind.Term.chr':
                case 'Kind.Term.str':
                case 'Kind.Term.cse':
                    var $4523 = _term$1;
                    var $4486 = $4523;
                    break;
            };
            var $4484 = $4486;
        };
        return $4484;
    };
    const Kind$SmartMotive$replace = x0 => x1 => x2 => x3 => Kind$SmartMotive$replace$(x0, x1, x2, x3);

    function Kind$SmartMotive$make$(_name$1, _expr$2, _type$3, _moti$4, _lv$5, _defs$6) {
        var _vals$7 = Kind$SmartMotive$vals$(_expr$2, _type$3, _defs$6);
        var _nams$8 = Kind$SmartMotive$nams$(_name$1, _type$3, _defs$6);
        var _subs$9 = List$zip$(_nams$8, _vals$7);
        var _moti$10 = List$fold$(_subs$9, _moti$4, (_sub$10 => _moti$11 => {
            var self = _sub$10;
            switch (self._) {
                case 'Pair.new':
                    var $4526 = self.fst;
                    var $4527 = self.snd;
                    var $4528 = Kind$SmartMotive$replace$(_moti$11, $4527, Kind$Term$ref$($4526), _lv$5);
                    var $4525 = $4528;
                    break;
            };
            return $4525;
        }));
        var $4524 = _moti$10;
        return $4524;
    };
    const Kind$SmartMotive$make = x0 => x1 => x2 => x3 => x4 => x5 => Kind$SmartMotive$make$(x0, x1, x2, x3, x4, x5);

    function Kind$Term$desugar_cse$motive$(_wyth$1, _moti$2) {
        var self = _wyth$1;
        switch (self._) {
            case 'List.cons':
                var $4530 = self.head;
                var $4531 = self.tail;
                var self = $4530;
                switch (self._) {
                    case 'Kind.Def.new':
                        var $4533 = self.name;
                        var $4534 = self.type;
                        var $4535 = Kind$Term$all$(Bool$false, "", $4533, $4534, (_s$14 => _x$15 => {
                            var $4536 = Kind$Term$desugar_cse$motive$($4531, _moti$2);
                            return $4536;
                        }));
                        var $4532 = $4535;
                        break;
                };
                var $4529 = $4532;
                break;
            case 'List.nil':
                var $4537 = _moti$2;
                var $4529 = $4537;
                break;
        };
        return $4529;
    };
    const Kind$Term$desugar_cse$motive = x0 => x1 => Kind$Term$desugar_cse$motive$(x0, x1);

    function String$is_empty$(_str$1) {
        var self = _str$1;
        if (self.length === 0) {
            var $4539 = Bool$true;
            var $4538 = $4539;
        } else {
            var $4540 = self.charCodeAt(0);
            var $4541 = self.slice(1);
            var $4542 = Bool$false;
            var $4538 = $4542;
        };
        return $4538;
    };
    const String$is_empty = x0 => String$is_empty$(x0);

    function Kind$Term$desugar_cse$argument$(_name$1, _wyth$2, _type$3, _body$4, _defs$5) {
        var self = Kind$Term$reduce$(_type$3, _defs$5);
        switch (self._) {
            case 'Kind.Term.all':
                var $4544 = self.self;
                var $4545 = self.name;
                var $4546 = self.body;
                var $4547 = Kind$Term$lam$((() => {
                    var self = String$is_empty$($4545);
                    if (self) {
                        var $4548 = _name$1;
                        return $4548;
                    } else {
                        var $4549 = String$flatten$(List$cons$(_name$1, List$cons$(".", List$cons$($4545, List$nil))));
                        return $4549;
                    };
                })(), (_x$11 => {
                    var $4550 = Kind$Term$desugar_cse$argument$(_name$1, _wyth$2, $4546(Kind$Term$var$($4544, 0n))(Kind$Term$var$($4545, 0n)), _body$4, _defs$5);
                    return $4550;
                }));
                var $4543 = $4547;
                break;
            case 'Kind.Term.var':
            case 'Kind.Term.lam':
            case 'Kind.Term.app':
            case 'Kind.Term.ori':
                var self = _wyth$2;
                switch (self._) {
                    case 'List.cons':
                        var $4552 = self.head;
                        var $4553 = self.tail;
                        var self = $4552;
                        switch (self._) {
                            case 'Kind.Def.new':
                                var $4555 = self.name;
                                var $4556 = Kind$Term$lam$($4555, (_x$19 => {
                                    var $4557 = Kind$Term$desugar_cse$argument$(_name$1, $4553, _type$3, _body$4, _defs$5);
                                    return $4557;
                                }));
                                var $4554 = $4556;
                                break;
                        };
                        var $4551 = $4554;
                        break;
                    case 'List.nil':
                        var $4558 = _body$4;
                        var $4551 = $4558;
                        break;
                };
                var $4543 = $4551;
                break;
            case 'Kind.Term.ref':
            case 'Kind.Term.hol':
            case 'Kind.Term.nat':
            case 'Kind.Term.chr':
            case 'Kind.Term.str':
                var self = _wyth$2;
                switch (self._) {
                    case 'List.cons':
                        var $4560 = self.head;
                        var $4561 = self.tail;
                        var self = $4560;
                        switch (self._) {
                            case 'Kind.Def.new':
                                var $4563 = self.name;
                                var $4564 = Kind$Term$lam$($4563, (_x$18 => {
                                    var $4565 = Kind$Term$desugar_cse$argument$(_name$1, $4561, _type$3, _body$4, _defs$5);
                                    return $4565;
                                }));
                                var $4562 = $4564;
                                break;
                        };
                        var $4559 = $4562;
                        break;
                    case 'List.nil':
                        var $4566 = _body$4;
                        var $4559 = $4566;
                        break;
                };
                var $4543 = $4559;
                break;
            case 'Kind.Term.typ':
                var self = _wyth$2;
                switch (self._) {
                    case 'List.cons':
                        var $4568 = self.head;
                        var $4569 = self.tail;
                        var self = $4568;
                        switch (self._) {
                            case 'Kind.Def.new':
                                var $4571 = self.name;
                                var $4572 = Kind$Term$lam$($4571, (_x$17 => {
                                    var $4573 = Kind$Term$desugar_cse$argument$(_name$1, $4569, _type$3, _body$4, _defs$5);
                                    return $4573;
                                }));
                                var $4570 = $4572;
                                break;
                        };
                        var $4567 = $4570;
                        break;
                    case 'List.nil':
                        var $4574 = _body$4;
                        var $4567 = $4574;
                        break;
                };
                var $4543 = $4567;
                break;
            case 'Kind.Term.let':
            case 'Kind.Term.def':
            case 'Kind.Term.ann':
            case 'Kind.Term.gol':
                var self = _wyth$2;
                switch (self._) {
                    case 'List.cons':
                        var $4576 = self.head;
                        var $4577 = self.tail;
                        var self = $4576;
                        switch (self._) {
                            case 'Kind.Def.new':
                                var $4579 = self.name;
                                var $4580 = Kind$Term$lam$($4579, (_x$20 => {
                                    var $4581 = Kind$Term$desugar_cse$argument$(_name$1, $4577, _type$3, _body$4, _defs$5);
                                    return $4581;
                                }));
                                var $4578 = $4580;
                                break;
                        };
                        var $4575 = $4578;
                        break;
                    case 'List.nil':
                        var $4582 = _body$4;
                        var $4575 = $4582;
                        break;
                };
                var $4543 = $4575;
                break;
            case 'Kind.Term.cse':
                var self = _wyth$2;
                switch (self._) {
                    case 'List.cons':
                        var $4584 = self.head;
                        var $4585 = self.tail;
                        var self = $4584;
                        switch (self._) {
                            case 'Kind.Def.new':
                                var $4587 = self.name;
                                var $4588 = Kind$Term$lam$($4587, (_x$23 => {
                                    var $4589 = Kind$Term$desugar_cse$argument$(_name$1, $4585, _type$3, _body$4, _defs$5);
                                    return $4589;
                                }));
                                var $4586 = $4588;
                                break;
                        };
                        var $4583 = $4586;
                        break;
                    case 'List.nil':
                        var $4590 = _body$4;
                        var $4583 = $4590;
                        break;
                };
                var $4543 = $4583;
                break;
        };
        return $4543;
    };
    const Kind$Term$desugar_cse$argument = x0 => x1 => x2 => x3 => x4 => Kind$Term$desugar_cse$argument$(x0, x1, x2, x3, x4);

    function Maybe$or$(_a$2, _b$3) {
        var self = _a$2;
        switch (self._) {
            case 'Maybe.some':
                var $4592 = self.value;
                var $4593 = Maybe$some$($4592);
                var $4591 = $4593;
                break;
            case 'Maybe.none':
                var $4594 = _b$3;
                var $4591 = $4594;
                break;
        };
        return $4591;
    };
    const Maybe$or = x0 => x1 => Maybe$or$(x0, x1);

    function Kind$Term$desugar_cse$cases$(_expr$1, _name$2, _wyth$3, _cses$4, _type$5, _defs$6, _ctxt$7) {
        var Kind$Term$desugar_cse$cases$ = (_expr$1, _name$2, _wyth$3, _cses$4, _type$5, _defs$6, _ctxt$7) => ({
            ctr: 'TCO',
            arg: [_expr$1, _name$2, _wyth$3, _cses$4, _type$5, _defs$6, _ctxt$7]
        });
        var Kind$Term$desugar_cse$cases = _expr$1 => _name$2 => _wyth$3 => _cses$4 => _type$5 => _defs$6 => _ctxt$7 => Kind$Term$desugar_cse$cases$(_expr$1, _name$2, _wyth$3, _cses$4, _type$5, _defs$6, _ctxt$7);
        var arg = [_expr$1, _name$2, _wyth$3, _cses$4, _type$5, _defs$6, _ctxt$7];
        while (true) {
            let [_expr$1, _name$2, _wyth$3, _cses$4, _type$5, _defs$6, _ctxt$7] = arg;
            var R = (() => {
                var self = Kind$Term$reduce$(_type$5, _defs$6);
                switch (self._) {
                    case 'Kind.Term.all':
                        var $4595 = self.self;
                        var $4596 = self.name;
                        var $4597 = self.xtyp;
                        var $4598 = self.body;
                        var _got$13 = Maybe$or$(Kind$get$($4596, _cses$4), Kind$get$("_", _cses$4));
                        var self = _got$13;
                        switch (self._) {
                            case 'Maybe.some':
                                var $4600 = self.value;
                                var _argm$15 = Kind$Term$desugar_cse$argument$(_name$2, _wyth$3, $4597, $4600, _defs$6);
                                var _expr$16 = Kind$Term$app$(_expr$1, _argm$15);
                                var _type$17 = $4598(Kind$Term$var$($4595, 0n))(Kind$Term$var$($4596, 0n));
                                var $4601 = Kind$Term$desugar_cse$cases$(_expr$16, _name$2, _wyth$3, _cses$4, _type$17, _defs$6, _ctxt$7);
                                var $4599 = $4601;
                                break;
                            case 'Maybe.none':
                                var _expr$14 = (() => {
                                    var $4604 = _expr$1;
                                    var $4605 = _wyth$3;
                                    let _expr$15 = $4604;
                                    let _defn$14;
                                    while ($4605._ === 'List.cons') {
                                        _defn$14 = $4605.head;
                                        var self = _defn$14;
                                        switch (self._) {
                                            case 'Kind.Def.new':
                                                var $4606 = self.term;
                                                var $4607 = Kind$Term$app$(_expr$15, $4606);
                                                var $4604 = $4607;
                                                break;
                                        };
                                        _expr$15 = $4604;
                                        $4605 = $4605.tail;
                                    }
                                    return _expr$15;
                                })();
                                var $4602 = _expr$14;
                                var $4599 = $4602;
                                break;
                        };
                        return $4599;
                    case 'Kind.Term.var':
                    case 'Kind.Term.lam':
                    case 'Kind.Term.app':
                    case 'Kind.Term.ori':
                        var _expr$10 = (() => {
                            var $4610 = _expr$1;
                            var $4611 = _wyth$3;
                            let _expr$11 = $4610;
                            let _defn$10;
                            while ($4611._ === 'List.cons') {
                                _defn$10 = $4611.head;
                                var $4610 = Kind$Term$app$(_expr$11, (() => {
                                    var self = _defn$10;
                                    switch (self._) {
                                        case 'Kind.Def.new':
                                            var $4612 = self.term;
                                            var $4613 = $4612;
                                            return $4613;
                                    };
                                })());
                                _expr$11 = $4610;
                                $4611 = $4611.tail;
                            }
                            return _expr$11;
                        })();
                        var $4608 = _expr$10;
                        return $4608;
                    case 'Kind.Term.ref':
                    case 'Kind.Term.hol':
                    case 'Kind.Term.nat':
                    case 'Kind.Term.chr':
                    case 'Kind.Term.str':
                        var _expr$9 = (() => {
                            var $4616 = _expr$1;
                            var $4617 = _wyth$3;
                            let _expr$10 = $4616;
                            let _defn$9;
                            while ($4617._ === 'List.cons') {
                                _defn$9 = $4617.head;
                                var $4616 = Kind$Term$app$(_expr$10, (() => {
                                    var self = _defn$9;
                                    switch (self._) {
                                        case 'Kind.Def.new':
                                            var $4618 = self.term;
                                            var $4619 = $4618;
                                            return $4619;
                                    };
                                })());
                                _expr$10 = $4616;
                                $4617 = $4617.tail;
                            }
                            return _expr$10;
                        })();
                        var $4614 = _expr$9;
                        return $4614;
                    case 'Kind.Term.typ':
                        var _expr$8 = (() => {
                            var $4622 = _expr$1;
                            var $4623 = _wyth$3;
                            let _expr$9 = $4622;
                            let _defn$8;
                            while ($4623._ === 'List.cons') {
                                _defn$8 = $4623.head;
                                var $4622 = Kind$Term$app$(_expr$9, (() => {
                                    var self = _defn$8;
                                    switch (self._) {
                                        case 'Kind.Def.new':
                                            var $4624 = self.term;
                                            var $4625 = $4624;
                                            return $4625;
                                    };
                                })());
                                _expr$9 = $4622;
                                $4623 = $4623.tail;
                            }
                            return _expr$9;
                        })();
                        var $4620 = _expr$8;
                        return $4620;
                    case 'Kind.Term.let':
                    case 'Kind.Term.def':
                    case 'Kind.Term.ann':
                    case 'Kind.Term.gol':
                        var _expr$11 = (() => {
                            var $4628 = _expr$1;
                            var $4629 = _wyth$3;
                            let _expr$12 = $4628;
                            let _defn$11;
                            while ($4629._ === 'List.cons') {
                                _defn$11 = $4629.head;
                                var $4628 = Kind$Term$app$(_expr$12, (() => {
                                    var self = _defn$11;
                                    switch (self._) {
                                        case 'Kind.Def.new':
                                            var $4630 = self.term;
                                            var $4631 = $4630;
                                            return $4631;
                                    };
                                })());
                                _expr$12 = $4628;
                                $4629 = $4629.tail;
                            }
                            return _expr$12;
                        })();
                        var $4626 = _expr$11;
                        return $4626;
                    case 'Kind.Term.cse':
                        var _expr$14 = (() => {
                            var $4634 = _expr$1;
                            var $4635 = _wyth$3;
                            let _expr$15 = $4634;
                            let _defn$14;
                            while ($4635._ === 'List.cons') {
                                _defn$14 = $4635.head;
                                var $4634 = Kind$Term$app$(_expr$15, (() => {
                                    var self = _defn$14;
                                    switch (self._) {
                                        case 'Kind.Def.new':
                                            var $4636 = self.term;
                                            var $4637 = $4636;
                                            return $4637;
                                    };
                                })());
                                _expr$15 = $4634;
                                $4635 = $4635.tail;
                            }
                            return _expr$15;
                        })();
                        var $4632 = _expr$14;
                        return $4632;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Kind$Term$desugar_cse$cases = x0 => x1 => x2 => x3 => x4 => x5 => x6 => Kind$Term$desugar_cse$cases$(x0, x1, x2, x3, x4, x5, x6);

    function Kind$Term$desugar_cse$(_expr$1, _name$2, _wyth$3, _cses$4, _moti$5, _type$6, _defs$7, _ctxt$8) {
        var self = Kind$Term$reduce$(_type$6, _defs$7);
        switch (self._) {
            case 'Kind.Term.all':
                var $4639 = self.self;
                var $4640 = self.name;
                var $4641 = self.xtyp;
                var $4642 = self.body;
                var _moti$14 = Kind$Term$desugar_cse$motive$(_wyth$3, _moti$5);
                var _argm$15 = Kind$Term$desugar_cse$argument$(_name$2, List$nil, $4641, _moti$14, _defs$7);
                var _expr$16 = Kind$Term$app$(_expr$1, _argm$15);
                var _type$17 = $4642(Kind$Term$var$($4639, 0n))(Kind$Term$var$($4640, 0n));
                var $4643 = Maybe$some$(Kind$Term$desugar_cse$cases$(_expr$16, _name$2, _wyth$3, _cses$4, _type$17, _defs$7, _ctxt$8));
                var $4638 = $4643;
                break;
            case 'Kind.Term.var':
            case 'Kind.Term.ref':
            case 'Kind.Term.typ':
            case 'Kind.Term.lam':
            case 'Kind.Term.app':
            case 'Kind.Term.let':
            case 'Kind.Term.def':
            case 'Kind.Term.ann':
            case 'Kind.Term.gol':
            case 'Kind.Term.hol':
            case 'Kind.Term.nat':
            case 'Kind.Term.chr':
            case 'Kind.Term.str':
            case 'Kind.Term.cse':
            case 'Kind.Term.ori':
                var $4644 = Maybe$none;
                var $4638 = $4644;
                break;
        };
        return $4638;
    };
    const Kind$Term$desugar_cse = x0 => x1 => x2 => x3 => x4 => x5 => x6 => x7 => Kind$Term$desugar_cse$(x0, x1, x2, x3, x4, x5, x6, x7);

    function Kind$Error$cant_infer$(_origin$1, _term$2, _context$3) {
        var $4645 = ({
            _: 'Kind.Error.cant_infer',
            'origin': _origin$1,
            'term': _term$2,
            'context': _context$3
        });
        return $4645;
    };
    const Kind$Error$cant_infer = x0 => x1 => x2 => Kind$Error$cant_infer$(x0, x1, x2);

    function Set$has$(_bits$1, _set$2) {
        var self = Map$get$(_bits$1, _set$2);
        switch (self._) {
            case 'Maybe.none':
                var $4647 = Bool$false;
                var $4646 = $4647;
                break;
            case 'Maybe.some':
                var $4648 = Bool$true;
                var $4646 = $4648;
                break;
        };
        return $4646;
    };
    const Set$has = x0 => x1 => Set$has$(x0, x1);
    const Set$mut$has = a0 => a1 => (!!(a1[a0]));

    function Kind$Term$equal$extra_holes$funari$(_term$1, _arity$2) {
        var Kind$Term$equal$extra_holes$funari$ = (_term$1, _arity$2) => ({
            ctr: 'TCO',
            arg: [_term$1, _arity$2]
        });
        var Kind$Term$equal$extra_holes$funari = _term$1 => _arity$2 => Kind$Term$equal$extra_holes$funari$(_term$1, _arity$2);
        var arg = [_term$1, _arity$2];
        while (true) {
            let [_term$1, _arity$2] = arg;
            var R = (() => {
                var self = _term$1;
                switch (self._) {
                    case 'Kind.Term.var':
                        var $4649 = self.name;
                        var $4650 = Maybe$some$(Pair$new$($4649, _arity$2));
                        return $4650;
                    case 'Kind.Term.ref':
                        var $4651 = self.name;
                        var $4652 = Maybe$some$(Pair$new$($4651, _arity$2));
                        return $4652;
                    case 'Kind.Term.app':
                        var $4653 = self.func;
                        var $4654 = Kind$Term$equal$extra_holes$funari$($4653, Nat$succ$(_arity$2));
                        return $4654;
                    case 'Kind.Term.ori':
                        var $4655 = self.expr;
                        var $4656 = Kind$Term$equal$extra_holes$funari$($4655, _arity$2);
                        return $4656;
                    case 'Kind.Term.typ':
                    case 'Kind.Term.all':
                    case 'Kind.Term.lam':
                    case 'Kind.Term.let':
                    case 'Kind.Term.def':
                    case 'Kind.Term.ann':
                    case 'Kind.Term.gol':
                    case 'Kind.Term.hol':
                    case 'Kind.Term.nat':
                    case 'Kind.Term.chr':
                    case 'Kind.Term.str':
                    case 'Kind.Term.cse':
                        var $4657 = Maybe$none;
                        return $4657;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Kind$Term$equal$extra_holes$funari = x0 => x1 => Kind$Term$equal$extra_holes$funari$(x0, x1);
    const Bool$or = a0 => a1 => (a0 || a1);

    function Kind$Term$has_holes$(_term$1) {
        var self = _term$1;
        switch (self._) {
            case 'Kind.Term.all':
                var $4659 = self.xtyp;
                var $4660 = self.body;
                var $4661 = (Kind$Term$has_holes$($4659) || Kind$Term$has_holes$($4660(Kind$Term$typ)(Kind$Term$typ)));
                var $4658 = $4661;
                break;
            case 'Kind.Term.lam':
                var $4662 = self.body;
                var $4663 = Kind$Term$has_holes$($4662(Kind$Term$typ));
                var $4658 = $4663;
                break;
            case 'Kind.Term.app':
                var $4664 = self.func;
                var $4665 = self.argm;
                var $4666 = (Kind$Term$has_holes$($4664) || Kind$Term$has_holes$($4665));
                var $4658 = $4666;
                break;
            case 'Kind.Term.let':
                var $4667 = self.expr;
                var $4668 = self.body;
                var $4669 = (Kind$Term$has_holes$($4667) || Kind$Term$has_holes$($4668(Kind$Term$typ)));
                var $4658 = $4669;
                break;
            case 'Kind.Term.def':
                var $4670 = self.expr;
                var $4671 = self.body;
                var $4672 = (Kind$Term$has_holes$($4670) || Kind$Term$has_holes$($4671(Kind$Term$typ)));
                var $4658 = $4672;
                break;
            case 'Kind.Term.ann':
                var $4673 = self.term;
                var $4674 = self.type;
                var $4675 = (Kind$Term$has_holes$($4673) || Kind$Term$has_holes$($4674));
                var $4658 = $4675;
                break;
            case 'Kind.Term.ori':
                var $4676 = self.expr;
                var $4677 = Kind$Term$has_holes$($4676);
                var $4658 = $4677;
                break;
            case 'Kind.Term.var':
            case 'Kind.Term.ref':
            case 'Kind.Term.typ':
            case 'Kind.Term.gol':
            case 'Kind.Term.nat':
            case 'Kind.Term.chr':
            case 'Kind.Term.str':
            case 'Kind.Term.cse':
                var $4678 = Bool$false;
                var $4658 = $4678;
                break;
            case 'Kind.Term.hol':
                var $4679 = Bool$true;
                var $4658 = $4679;
                break;
        };
        return $4658;
    };
    const Kind$Term$has_holes = x0 => Kind$Term$has_holes$(x0);

    function Kind$Term$equal$hole$(_path$1, _term$2) {
        var self = _term$2;
        switch (self._) {
            case 'Kind.Term.var':
            case 'Kind.Term.ref':
            case 'Kind.Term.typ':
            case 'Kind.Term.all':
            case 'Kind.Term.lam':
            case 'Kind.Term.app':
            case 'Kind.Term.let':
            case 'Kind.Term.def':
            case 'Kind.Term.ann':
            case 'Kind.Term.gol':
            case 'Kind.Term.nat':
            case 'Kind.Term.chr':
            case 'Kind.Term.str':
            case 'Kind.Term.cse':
            case 'Kind.Term.ori':
                var self = Kind$Term$has_holes$(_term$2);
                if (self) {
                    var $4682 = Kind$Check$result$(Maybe$some$(Bool$false), List$nil);
                    var $4681 = $4682;
                } else {
                    var $4683 = Kind$Check$result$(Maybe$some$(Bool$true), List$cons$(Kind$Error$patch$(_path$1, Kind$Term$normalize$(_term$2, Map$new)), List$nil));
                    var $4681 = $4683;
                };
                var $4680 = $4681;
                break;
            case 'Kind.Term.hol':
                var $4684 = Kind$Check$result$(Maybe$some$(Bool$true), List$nil);
                var $4680 = $4684;
                break;
        };
        return $4680;
    };
    const Kind$Term$equal$hole = x0 => x1 => Kind$Term$equal$hole$(x0, x1);

    function Kind$Term$equal$extra_holes$filler$(_a$1, _b$2) {
        var self = _a$1;
        switch (self._) {
            case 'Kind.Term.app':
                var $4686 = self.func;
                var $4687 = self.argm;
                var self = _b$2;
                switch (self._) {
                    case 'Kind.Term.app':
                        var $4689 = self.func;
                        var $4690 = self.argm;
                        var self = Kind$Term$equal$extra_holes$filler$($4686, $4689);
                        switch (self._) {
                            case 'Kind.Check.result':
                                var $4692 = self.value;
                                var $4693 = self.errors;
                                var self = $4692;
                                switch (self._) {
                                    case 'Maybe.none':
                                        var $4695 = Kind$Check$result$(Maybe$none, $4693);
                                        var $4694 = $4695;
                                        break;
                                    case 'Maybe.some':
                                        var self = Kind$Term$equal$extra_holes$filler$($4687, $4690);
                                        switch (self._) {
                                            case 'Kind.Check.result':
                                                var $4697 = self.value;
                                                var $4698 = self.errors;
                                                var $4699 = Kind$Check$result$($4697, List$concat$($4693, $4698));
                                                var $4696 = $4699;
                                                break;
                                        };
                                        var $4694 = $4696;
                                        break;
                                };
                                var $4691 = $4694;
                                break;
                        };
                        var $4688 = $4691;
                        break;
                    case 'Kind.Term.hol':
                        var $4700 = self.path;
                        var self = Kind$Term$equal$hole$($4700, _a$1);
                        switch (self._) {
                            case 'Kind.Check.result':
                                var $4702 = self.value;
                                var $4703 = self.errors;
                                var self = $4702;
                                switch (self._) {
                                    case 'Maybe.none':
                                        var $4705 = Kind$Check$result$(Maybe$none, $4703);
                                        var $4704 = $4705;
                                        break;
                                    case 'Maybe.some':
                                        var self = Kind$Check$result$(Maybe$some$(Unit$new), List$nil);
                                        switch (self._) {
                                            case 'Kind.Check.result':
                                                var $4707 = self.value;
                                                var $4708 = self.errors;
                                                var $4709 = Kind$Check$result$($4707, List$concat$($4703, $4708));
                                                var $4706 = $4709;
                                                break;
                                        };
                                        var $4704 = $4706;
                                        break;
                                };
                                var $4701 = $4704;
                                break;
                        };
                        var $4688 = $4701;
                        break;
                    case 'Kind.Term.ori':
                        var $4710 = self.expr;
                        var $4711 = Kind$Term$equal$extra_holes$filler$(_a$1, $4710);
                        var $4688 = $4711;
                        break;
                    case 'Kind.Term.var':
                    case 'Kind.Term.ref':
                    case 'Kind.Term.typ':
                    case 'Kind.Term.all':
                    case 'Kind.Term.lam':
                    case 'Kind.Term.let':
                    case 'Kind.Term.def':
                    case 'Kind.Term.ann':
                    case 'Kind.Term.gol':
                    case 'Kind.Term.nat':
                    case 'Kind.Term.chr':
                    case 'Kind.Term.str':
                    case 'Kind.Term.cse':
                        var $4712 = Kind$Check$result$(Maybe$some$(Unit$new), List$nil);
                        var $4688 = $4712;
                        break;
                };
                var $4685 = $4688;
                break;
            case 'Kind.Term.hol':
                var $4713 = self.path;
                var self = Kind$Term$equal$hole$($4713, _b$2);
                switch (self._) {
                    case 'Kind.Check.result':
                        var $4715 = self.value;
                        var $4716 = self.errors;
                        var self = $4715;
                        switch (self._) {
                            case 'Maybe.none':
                                var $4718 = Kind$Check$result$(Maybe$none, $4716);
                                var $4717 = $4718;
                                break;
                            case 'Maybe.some':
                                var self = Kind$Check$result$(Maybe$some$(Unit$new), List$nil);
                                switch (self._) {
                                    case 'Kind.Check.result':
                                        var $4720 = self.value;
                                        var $4721 = self.errors;
                                        var $4722 = Kind$Check$result$($4720, List$concat$($4716, $4721));
                                        var $4719 = $4722;
                                        break;
                                };
                                var $4717 = $4719;
                                break;
                        };
                        var $4714 = $4717;
                        break;
                };
                var $4685 = $4714;
                break;
            case 'Kind.Term.ori':
                var $4723 = self.expr;
                var $4724 = Kind$Term$equal$extra_holes$filler$($4723, _b$2);
                var $4685 = $4724;
                break;
            case 'Kind.Term.var':
            case 'Kind.Term.lam':
                var self = _b$2;
                switch (self._) {
                    case 'Kind.Term.hol':
                        var $4726 = self.path;
                        var self = Kind$Term$equal$hole$($4726, _a$1);
                        switch (self._) {
                            case 'Kind.Check.result':
                                var $4728 = self.value;
                                var $4729 = self.errors;
                                var self = $4728;
                                switch (self._) {
                                    case 'Maybe.none':
                                        var $4731 = Kind$Check$result$(Maybe$none, $4729);
                                        var $4730 = $4731;
                                        break;
                                    case 'Maybe.some':
                                        var self = Kind$Check$result$(Maybe$some$(Unit$new), List$nil);
                                        switch (self._) {
                                            case 'Kind.Check.result':
                                                var $4733 = self.value;
                                                var $4734 = self.errors;
                                                var $4735 = Kind$Check$result$($4733, List$concat$($4729, $4734));
                                                var $4732 = $4735;
                                                break;
                                        };
                                        var $4730 = $4732;
                                        break;
                                };
                                var $4727 = $4730;
                                break;
                        };
                        var $4725 = $4727;
                        break;
                    case 'Kind.Term.ori':
                        var $4736 = self.expr;
                        var $4737 = Kind$Term$equal$extra_holes$filler$(_a$1, $4736);
                        var $4725 = $4737;
                        break;
                    case 'Kind.Term.var':
                    case 'Kind.Term.ref':
                    case 'Kind.Term.typ':
                    case 'Kind.Term.all':
                    case 'Kind.Term.lam':
                    case 'Kind.Term.app':
                    case 'Kind.Term.let':
                    case 'Kind.Term.def':
                    case 'Kind.Term.ann':
                    case 'Kind.Term.gol':
                    case 'Kind.Term.nat':
                    case 'Kind.Term.chr':
                    case 'Kind.Term.str':
                    case 'Kind.Term.cse':
                        var $4738 = Kind$Check$result$(Maybe$some$(Unit$new), List$nil);
                        var $4725 = $4738;
                        break;
                };
                var $4685 = $4725;
                break;
            case 'Kind.Term.ref':
            case 'Kind.Term.nat':
            case 'Kind.Term.chr':
            case 'Kind.Term.str':
                var self = _b$2;
                switch (self._) {
                    case 'Kind.Term.hol':
                        var $4740 = self.path;
                        var self = Kind$Term$equal$hole$($4740, _a$1);
                        switch (self._) {
                            case 'Kind.Check.result':
                                var $4742 = self.value;
                                var $4743 = self.errors;
                                var self = $4742;
                                switch (self._) {
                                    case 'Maybe.none':
                                        var $4745 = Kind$Check$result$(Maybe$none, $4743);
                                        var $4744 = $4745;
                                        break;
                                    case 'Maybe.some':
                                        var self = Kind$Check$result$(Maybe$some$(Unit$new), List$nil);
                                        switch (self._) {
                                            case 'Kind.Check.result':
                                                var $4747 = self.value;
                                                var $4748 = self.errors;
                                                var $4749 = Kind$Check$result$($4747, List$concat$($4743, $4748));
                                                var $4746 = $4749;
                                                break;
                                        };
                                        var $4744 = $4746;
                                        break;
                                };
                                var $4741 = $4744;
                                break;
                        };
                        var $4739 = $4741;
                        break;
                    case 'Kind.Term.ori':
                        var $4750 = self.expr;
                        var $4751 = Kind$Term$equal$extra_holes$filler$(_a$1, $4750);
                        var $4739 = $4751;
                        break;
                    case 'Kind.Term.var':
                    case 'Kind.Term.ref':
                    case 'Kind.Term.typ':
                    case 'Kind.Term.all':
                    case 'Kind.Term.lam':
                    case 'Kind.Term.app':
                    case 'Kind.Term.let':
                    case 'Kind.Term.def':
                    case 'Kind.Term.ann':
                    case 'Kind.Term.gol':
                    case 'Kind.Term.nat':
                    case 'Kind.Term.chr':
                    case 'Kind.Term.str':
                    case 'Kind.Term.cse':
                        var $4752 = Kind$Check$result$(Maybe$some$(Unit$new), List$nil);
                        var $4739 = $4752;
                        break;
                };
                var $4685 = $4739;
                break;
            case 'Kind.Term.typ':
                var self = _b$2;
                switch (self._) {
                    case 'Kind.Term.hol':
                        var $4754 = self.path;
                        var self = Kind$Term$equal$hole$($4754, _a$1);
                        switch (self._) {
                            case 'Kind.Check.result':
                                var $4756 = self.value;
                                var $4757 = self.errors;
                                var self = $4756;
                                switch (self._) {
                                    case 'Maybe.none':
                                        var $4759 = Kind$Check$result$(Maybe$none, $4757);
                                        var $4758 = $4759;
                                        break;
                                    case 'Maybe.some':
                                        var self = Kind$Check$result$(Maybe$some$(Unit$new), List$nil);
                                        switch (self._) {
                                            case 'Kind.Check.result':
                                                var $4761 = self.value;
                                                var $4762 = self.errors;
                                                var $4763 = Kind$Check$result$($4761, List$concat$($4757, $4762));
                                                var $4760 = $4763;
                                                break;
                                        };
                                        var $4758 = $4760;
                                        break;
                                };
                                var $4755 = $4758;
                                break;
                        };
                        var $4753 = $4755;
                        break;
                    case 'Kind.Term.ori':
                        var $4764 = self.expr;
                        var $4765 = Kind$Term$equal$extra_holes$filler$(_a$1, $4764);
                        var $4753 = $4765;
                        break;
                    case 'Kind.Term.var':
                    case 'Kind.Term.ref':
                    case 'Kind.Term.typ':
                    case 'Kind.Term.all':
                    case 'Kind.Term.lam':
                    case 'Kind.Term.app':
                    case 'Kind.Term.let':
                    case 'Kind.Term.def':
                    case 'Kind.Term.ann':
                    case 'Kind.Term.gol':
                    case 'Kind.Term.nat':
                    case 'Kind.Term.chr':
                    case 'Kind.Term.str':
                    case 'Kind.Term.cse':
                        var $4766 = Kind$Check$result$(Maybe$some$(Unit$new), List$nil);
                        var $4753 = $4766;
                        break;
                };
                var $4685 = $4753;
                break;
            case 'Kind.Term.all':
                var self = _b$2;
                switch (self._) {
                    case 'Kind.Term.hol':
                        var $4768 = self.path;
                        var self = Kind$Term$equal$hole$($4768, _a$1);
                        switch (self._) {
                            case 'Kind.Check.result':
                                var $4770 = self.value;
                                var $4771 = self.errors;
                                var self = $4770;
                                switch (self._) {
                                    case 'Maybe.none':
                                        var $4773 = Kind$Check$result$(Maybe$none, $4771);
                                        var $4772 = $4773;
                                        break;
                                    case 'Maybe.some':
                                        var self = Kind$Check$result$(Maybe$some$(Unit$new), List$nil);
                                        switch (self._) {
                                            case 'Kind.Check.result':
                                                var $4775 = self.value;
                                                var $4776 = self.errors;
                                                var $4777 = Kind$Check$result$($4775, List$concat$($4771, $4776));
                                                var $4774 = $4777;
                                                break;
                                        };
                                        var $4772 = $4774;
                                        break;
                                };
                                var $4769 = $4772;
                                break;
                        };
                        var $4767 = $4769;
                        break;
                    case 'Kind.Term.ori':
                        var $4778 = self.expr;
                        var $4779 = Kind$Term$equal$extra_holes$filler$(_a$1, $4778);
                        var $4767 = $4779;
                        break;
                    case 'Kind.Term.var':
                    case 'Kind.Term.ref':
                    case 'Kind.Term.typ':
                    case 'Kind.Term.all':
                    case 'Kind.Term.lam':
                    case 'Kind.Term.app':
                    case 'Kind.Term.let':
                    case 'Kind.Term.def':
                    case 'Kind.Term.ann':
                    case 'Kind.Term.gol':
                    case 'Kind.Term.nat':
                    case 'Kind.Term.chr':
                    case 'Kind.Term.str':
                    case 'Kind.Term.cse':
                        var $4780 = Kind$Check$result$(Maybe$some$(Unit$new), List$nil);
                        var $4767 = $4780;
                        break;
                };
                var $4685 = $4767;
                break;
            case 'Kind.Term.let':
            case 'Kind.Term.def':
            case 'Kind.Term.ann':
            case 'Kind.Term.gol':
                var self = _b$2;
                switch (self._) {
                    case 'Kind.Term.hol':
                        var $4782 = self.path;
                        var self = Kind$Term$equal$hole$($4782, _a$1);
                        switch (self._) {
                            case 'Kind.Check.result':
                                var $4784 = self.value;
                                var $4785 = self.errors;
                                var self = $4784;
                                switch (self._) {
                                    case 'Maybe.none':
                                        var $4787 = Kind$Check$result$(Maybe$none, $4785);
                                        var $4786 = $4787;
                                        break;
                                    case 'Maybe.some':
                                        var self = Kind$Check$result$(Maybe$some$(Unit$new), List$nil);
                                        switch (self._) {
                                            case 'Kind.Check.result':
                                                var $4789 = self.value;
                                                var $4790 = self.errors;
                                                var $4791 = Kind$Check$result$($4789, List$concat$($4785, $4790));
                                                var $4788 = $4791;
                                                break;
                                        };
                                        var $4786 = $4788;
                                        break;
                                };
                                var $4783 = $4786;
                                break;
                        };
                        var $4781 = $4783;
                        break;
                    case 'Kind.Term.ori':
                        var $4792 = self.expr;
                        var $4793 = Kind$Term$equal$extra_holes$filler$(_a$1, $4792);
                        var $4781 = $4793;
                        break;
                    case 'Kind.Term.var':
                    case 'Kind.Term.ref':
                    case 'Kind.Term.typ':
                    case 'Kind.Term.all':
                    case 'Kind.Term.lam':
                    case 'Kind.Term.app':
                    case 'Kind.Term.let':
                    case 'Kind.Term.def':
                    case 'Kind.Term.ann':
                    case 'Kind.Term.gol':
                    case 'Kind.Term.nat':
                    case 'Kind.Term.chr':
                    case 'Kind.Term.str':
                    case 'Kind.Term.cse':
                        var $4794 = Kind$Check$result$(Maybe$some$(Unit$new), List$nil);
                        var $4781 = $4794;
                        break;
                };
                var $4685 = $4781;
                break;
            case 'Kind.Term.cse':
                var self = _b$2;
                switch (self._) {
                    case 'Kind.Term.hol':
                        var $4796 = self.path;
                        var self = Kind$Term$equal$hole$($4796, _a$1);
                        switch (self._) {
                            case 'Kind.Check.result':
                                var $4798 = self.value;
                                var $4799 = self.errors;
                                var self = $4798;
                                switch (self._) {
                                    case 'Maybe.none':
                                        var $4801 = Kind$Check$result$(Maybe$none, $4799);
                                        var $4800 = $4801;
                                        break;
                                    case 'Maybe.some':
                                        var self = Kind$Check$result$(Maybe$some$(Unit$new), List$nil);
                                        switch (self._) {
                                            case 'Kind.Check.result':
                                                var $4803 = self.value;
                                                var $4804 = self.errors;
                                                var $4805 = Kind$Check$result$($4803, List$concat$($4799, $4804));
                                                var $4802 = $4805;
                                                break;
                                        };
                                        var $4800 = $4802;
                                        break;
                                };
                                var $4797 = $4800;
                                break;
                        };
                        var $4795 = $4797;
                        break;
                    case 'Kind.Term.ori':
                        var $4806 = self.expr;
                        var $4807 = Kind$Term$equal$extra_holes$filler$(_a$1, $4806);
                        var $4795 = $4807;
                        break;
                    case 'Kind.Term.var':
                    case 'Kind.Term.ref':
                    case 'Kind.Term.typ':
                    case 'Kind.Term.all':
                    case 'Kind.Term.lam':
                    case 'Kind.Term.app':
                    case 'Kind.Term.let':
                    case 'Kind.Term.def':
                    case 'Kind.Term.ann':
                    case 'Kind.Term.gol':
                    case 'Kind.Term.nat':
                    case 'Kind.Term.chr':
                    case 'Kind.Term.str':
                    case 'Kind.Term.cse':
                        var $4808 = Kind$Check$result$(Maybe$some$(Unit$new), List$nil);
                        var $4795 = $4808;
                        break;
                };
                var $4685 = $4795;
                break;
        };
        return $4685;
    };
    const Kind$Term$equal$extra_holes$filler = x0 => x1 => Kind$Term$equal$extra_holes$filler$(x0, x1);

    function Kind$Term$equal$extra_holes$(_a$1, _b$2) {
        var self = Kind$Term$equal$extra_holes$funari$(_a$1, 0n);
        switch (self._) {
            case 'Maybe.some':
                var $4810 = self.value;
                var self = Kind$Term$equal$extra_holes$funari$(_b$2, 0n);
                switch (self._) {
                    case 'Maybe.some':
                        var $4812 = self.value;
                        var self = $4810;
                        switch (self._) {
                            case 'Pair.new':
                                var $4814 = self.fst;
                                var $4815 = self.snd;
                                var self = $4812;
                                switch (self._) {
                                    case 'Pair.new':
                                        var $4817 = self.fst;
                                        var $4818 = self.snd;
                                        var _same_fun$9 = ($4814 === $4817);
                                        var _same_ari$10 = ($4815 === $4818);
                                        var self = (_same_fun$9 && _same_ari$10);
                                        if (self) {
                                            var $4820 = Kind$Term$equal$extra_holes$filler$(_a$1, _b$2);
                                            var $4819 = $4820;
                                        } else {
                                            var $4821 = Kind$Check$result$(Maybe$some$(Unit$new), List$nil);
                                            var $4819 = $4821;
                                        };
                                        var $4816 = $4819;
                                        break;
                                };
                                var $4813 = $4816;
                                break;
                        };
                        var $4811 = $4813;
                        break;
                    case 'Maybe.none':
                        var $4822 = Kind$Check$result$(Maybe$some$(Unit$new), List$nil);
                        var $4811 = $4822;
                        break;
                };
                var $4809 = $4811;
                break;
            case 'Maybe.none':
                var $4823 = Kind$Check$result$(Maybe$some$(Unit$new), List$nil);
                var $4809 = $4823;
                break;
        };
        return $4809;
    };
    const Kind$Term$equal$extra_holes = x0 => x1 => Kind$Term$equal$extra_holes$(x0, x1);

    function Set$set$(_bits$1, _set$2) {
        var $4824 = Map$set$(_bits$1, Unit$new, _set$2);
        return $4824;
    };
    const Set$set = x0 => x1 => Set$set$(x0, x1);
    const Set$mut$set = a0 => a1 => (((k, s) => ((s[k] = true), s))(a0, a1));

    function Bool$eql$(_a$1, _b$2) {
        var self = _a$1;
        if (self) {
            var $4826 = _b$2;
            var $4825 = $4826;
        } else {
            var $4827 = (!_b$2);
            var $4825 = $4827;
        };
        return $4825;
    };
    const Bool$eql = x0 => x1 => Bool$eql$(x0, x1);

    function Kind$Term$equal$(_a$1, _b$2, _defs$3, _lv$4, _seen$5) {
        var _ah$6 = Kind$Term$serialize$(Kind$Term$reduce$(_a$1, Map$new), _lv$4, _lv$4, Bits$o, Bits$e);
        var _bh$7 = Kind$Term$serialize$(Kind$Term$reduce$(_b$2, Map$new), _lv$4, _lv$4, Bits$i, Bits$e);
        var self = (_bh$7 === _ah$6);
        if (self) {
            var $4829 = Kind$Check$result$(Maybe$some$(Bool$true), List$nil);
            var $4828 = $4829;
        } else {
            var _a1$8 = Kind$Term$reduce$(_a$1, _defs$3);
            var _b1$9 = Kind$Term$reduce$(_b$2, _defs$3);
            var _ah$10 = Kind$Term$serialize$(_a1$8, _lv$4, _lv$4, Bits$o, Bits$e);
            var _bh$11 = Kind$Term$serialize$(_b1$9, _lv$4, _lv$4, Bits$i, Bits$e);
            var self = (_bh$11 === _ah$10);
            if (self) {
                var $4831 = Kind$Check$result$(Maybe$some$(Bool$true), List$nil);
                var $4830 = $4831;
            } else {
                var _id$12 = (_bh$11 + _ah$10);
                var self = (!!(_seen$5[_id$12]));
                if (self) {
                    var self = Kind$Term$equal$extra_holes$(_a$1, _b$2);
                    switch (self._) {
                        case 'Kind.Check.result':
                            var $4834 = self.value;
                            var $4835 = self.errors;
                            var self = $4834;
                            switch (self._) {
                                case 'Maybe.none':
                                    var $4837 = Kind$Check$result$(Maybe$none, $4835);
                                    var $4836 = $4837;
                                    break;
                                case 'Maybe.some':
                                    var self = Kind$Check$result$(Maybe$some$(Bool$true), List$nil);
                                    switch (self._) {
                                        case 'Kind.Check.result':
                                            var $4839 = self.value;
                                            var $4840 = self.errors;
                                            var $4841 = Kind$Check$result$($4839, List$concat$($4835, $4840));
                                            var $4838 = $4841;
                                            break;
                                    };
                                    var $4836 = $4838;
                                    break;
                            };
                            var $4833 = $4836;
                            break;
                    };
                    var $4832 = $4833;
                } else {
                    var self = _a1$8;
                    switch (self._) {
                        case 'Kind.Term.all':
                            var $4843 = self.eras;
                            var $4844 = self.self;
                            var $4845 = self.name;
                            var $4846 = self.xtyp;
                            var $4847 = self.body;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Kind.Term.all':
                                    var $4849 = self.eras;
                                    var $4850 = self.self;
                                    var $4851 = self.name;
                                    var $4852 = self.xtyp;
                                    var $4853 = self.body;
                                    var _seen$23 = (((k, s) => ((s[k] = true), s))(_id$12, _seen$5));
                                    var _a1_body$24 = $4847(Kind$Term$var$($4844, _lv$4))(Kind$Term$var$($4845, Nat$succ$(_lv$4)));
                                    var _b1_body$25 = $4853(Kind$Term$var$($4850, _lv$4))(Kind$Term$var$($4851, Nat$succ$(_lv$4)));
                                    var _eq_self$26 = ($4844 === $4850);
                                    var _eq_eras$27 = Bool$eql$($4843, $4849);
                                    var self = (_eq_self$26 && _eq_eras$27);
                                    if (self) {
                                        var self = Kind$Term$equal$($4846, $4852, _defs$3, _lv$4, _seen$23);
                                        switch (self._) {
                                            case 'Kind.Check.result':
                                                var $4856 = self.value;
                                                var $4857 = self.errors;
                                                var self = $4856;
                                                switch (self._) {
                                                    case 'Maybe.some':
                                                        var $4859 = self.value;
                                                        var self = Kind$Term$equal$(_a1_body$24, _b1_body$25, _defs$3, Nat$succ$(Nat$succ$(_lv$4)), _seen$23);
                                                        switch (self._) {
                                                            case 'Kind.Check.result':
                                                                var $4861 = self.value;
                                                                var $4862 = self.errors;
                                                                var self = $4861;
                                                                switch (self._) {
                                                                    case 'Maybe.some':
                                                                        var $4864 = self.value;
                                                                        var self = Kind$Check$result$(Maybe$some$(($4859 && $4864)), List$nil);
                                                                        switch (self._) {
                                                                            case 'Kind.Check.result':
                                                                                var $4866 = self.value;
                                                                                var $4867 = self.errors;
                                                                                var $4868 = Kind$Check$result$($4866, List$concat$($4862, $4867));
                                                                                var $4865 = $4868;
                                                                                break;
                                                                        };
                                                                        var $4863 = $4865;
                                                                        break;
                                                                    case 'Maybe.none':
                                                                        var $4869 = Kind$Check$result$(Maybe$none, $4862);
                                                                        var $4863 = $4869;
                                                                        break;
                                                                };
                                                                var self = $4863;
                                                                break;
                                                        };
                                                        switch (self._) {
                                                            case 'Kind.Check.result':
                                                                var $4870 = self.value;
                                                                var $4871 = self.errors;
                                                                var $4872 = Kind$Check$result$($4870, List$concat$($4857, $4871));
                                                                var $4860 = $4872;
                                                                break;
                                                        };
                                                        var $4858 = $4860;
                                                        break;
                                                    case 'Maybe.none':
                                                        var $4873 = Kind$Check$result$(Maybe$none, $4857);
                                                        var $4858 = $4873;
                                                        break;
                                                };
                                                var $4855 = $4858;
                                                break;
                                        };
                                        var $4854 = $4855;
                                    } else {
                                        var $4874 = Kind$Check$result$(Maybe$some$(Bool$false), List$nil);
                                        var $4854 = $4874;
                                    };
                                    var $4848 = $4854;
                                    break;
                                case 'Kind.Term.hol':
                                    var $4875 = self.path;
                                    var $4876 = Kind$Term$equal$hole$($4875, _a$1);
                                    var $4848 = $4876;
                                    break;
                                case 'Kind.Term.var':
                                case 'Kind.Term.ref':
                                case 'Kind.Term.typ':
                                case 'Kind.Term.lam':
                                case 'Kind.Term.app':
                                case 'Kind.Term.let':
                                case 'Kind.Term.def':
                                case 'Kind.Term.ann':
                                case 'Kind.Term.gol':
                                case 'Kind.Term.nat':
                                case 'Kind.Term.chr':
                                case 'Kind.Term.str':
                                case 'Kind.Term.cse':
                                case 'Kind.Term.ori':
                                    var $4877 = Kind$Check$result$(Maybe$some$(Bool$false), List$nil);
                                    var $4848 = $4877;
                                    break;
                            };
                            var $4842 = $4848;
                            break;
                        case 'Kind.Term.lam':
                            var $4878 = self.name;
                            var $4879 = self.body;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Kind.Term.lam':
                                    var $4881 = self.name;
                                    var $4882 = self.body;
                                    var _seen$17 = (((k, s) => ((s[k] = true), s))(_id$12, _seen$5));
                                    var _a1_body$18 = $4879(Kind$Term$var$($4878, _lv$4));
                                    var _b1_body$19 = $4882(Kind$Term$var$($4881, _lv$4));
                                    var self = Kind$Term$equal$(_a1_body$18, _b1_body$19, _defs$3, Nat$succ$(_lv$4), _seen$17);
                                    switch (self._) {
                                        case 'Kind.Check.result':
                                            var $4884 = self.value;
                                            var $4885 = self.errors;
                                            var self = $4884;
                                            switch (self._) {
                                                case 'Maybe.some':
                                                    var $4887 = self.value;
                                                    var self = Kind$Check$result$(Maybe$some$($4887), List$nil);
                                                    switch (self._) {
                                                        case 'Kind.Check.result':
                                                            var $4889 = self.value;
                                                            var $4890 = self.errors;
                                                            var $4891 = Kind$Check$result$($4889, List$concat$($4885, $4890));
                                                            var $4888 = $4891;
                                                            break;
                                                    };
                                                    var $4886 = $4888;
                                                    break;
                                                case 'Maybe.none':
                                                    var $4892 = Kind$Check$result$(Maybe$none, $4885);
                                                    var $4886 = $4892;
                                                    break;
                                            };
                                            var $4883 = $4886;
                                            break;
                                    };
                                    var $4880 = $4883;
                                    break;
                                case 'Kind.Term.hol':
                                    var $4893 = self.path;
                                    var $4894 = Kind$Term$equal$hole$($4893, _a$1);
                                    var $4880 = $4894;
                                    break;
                                case 'Kind.Term.var':
                                case 'Kind.Term.ref':
                                case 'Kind.Term.typ':
                                case 'Kind.Term.all':
                                case 'Kind.Term.app':
                                case 'Kind.Term.let':
                                case 'Kind.Term.def':
                                case 'Kind.Term.ann':
                                case 'Kind.Term.gol':
                                case 'Kind.Term.nat':
                                case 'Kind.Term.chr':
                                case 'Kind.Term.str':
                                case 'Kind.Term.cse':
                                case 'Kind.Term.ori':
                                    var $4895 = Kind$Check$result$(Maybe$some$(Bool$false), List$nil);
                                    var $4880 = $4895;
                                    break;
                            };
                            var $4842 = $4880;
                            break;
                        case 'Kind.Term.app':
                            var $4896 = self.func;
                            var $4897 = self.argm;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Kind.Term.app':
                                    var $4899 = self.func;
                                    var $4900 = self.argm;
                                    var _seen$17 = (((k, s) => ((s[k] = true), s))(_id$12, _seen$5));
                                    var self = Kind$Term$equal$($4896, $4899, _defs$3, _lv$4, _seen$17);
                                    switch (self._) {
                                        case 'Kind.Check.result':
                                            var $4902 = self.value;
                                            var $4903 = self.errors;
                                            var self = $4902;
                                            switch (self._) {
                                                case 'Maybe.some':
                                                    var $4905 = self.value;
                                                    var self = Kind$Term$equal$($4897, $4900, _defs$3, _lv$4, _seen$17);
                                                    switch (self._) {
                                                        case 'Kind.Check.result':
                                                            var $4907 = self.value;
                                                            var $4908 = self.errors;
                                                            var self = $4907;
                                                            switch (self._) {
                                                                case 'Maybe.some':
                                                                    var $4910 = self.value;
                                                                    var self = Kind$Check$result$(Maybe$some$(($4905 && $4910)), List$nil);
                                                                    switch (self._) {
                                                                        case 'Kind.Check.result':
                                                                            var $4912 = self.value;
                                                                            var $4913 = self.errors;
                                                                            var $4914 = Kind$Check$result$($4912, List$concat$($4908, $4913));
                                                                            var $4911 = $4914;
                                                                            break;
                                                                    };
                                                                    var $4909 = $4911;
                                                                    break;
                                                                case 'Maybe.none':
                                                                    var $4915 = Kind$Check$result$(Maybe$none, $4908);
                                                                    var $4909 = $4915;
                                                                    break;
                                                            };
                                                            var self = $4909;
                                                            break;
                                                    };
                                                    switch (self._) {
                                                        case 'Kind.Check.result':
                                                            var $4916 = self.value;
                                                            var $4917 = self.errors;
                                                            var $4918 = Kind$Check$result$($4916, List$concat$($4903, $4917));
                                                            var $4906 = $4918;
                                                            break;
                                                    };
                                                    var $4904 = $4906;
                                                    break;
                                                case 'Maybe.none':
                                                    var $4919 = Kind$Check$result$(Maybe$none, $4903);
                                                    var $4904 = $4919;
                                                    break;
                                            };
                                            var $4901 = $4904;
                                            break;
                                    };
                                    var $4898 = $4901;
                                    break;
                                case 'Kind.Term.hol':
                                    var $4920 = self.path;
                                    var $4921 = Kind$Term$equal$hole$($4920, _a$1);
                                    var $4898 = $4921;
                                    break;
                                case 'Kind.Term.var':
                                case 'Kind.Term.ref':
                                case 'Kind.Term.typ':
                                case 'Kind.Term.all':
                                case 'Kind.Term.lam':
                                case 'Kind.Term.let':
                                case 'Kind.Term.def':
                                case 'Kind.Term.ann':
                                case 'Kind.Term.gol':
                                case 'Kind.Term.nat':
                                case 'Kind.Term.chr':
                                case 'Kind.Term.str':
                                case 'Kind.Term.cse':
                                case 'Kind.Term.ori':
                                    var $4922 = Kind$Check$result$(Maybe$some$(Bool$false), List$nil);
                                    var $4898 = $4922;
                                    break;
                            };
                            var $4842 = $4898;
                            break;
                        case 'Kind.Term.let':
                            var $4923 = self.name;
                            var $4924 = self.expr;
                            var $4925 = self.body;
                            var self = _b1$9;
                            switch (self._) {
                                case 'Kind.Term.let':
                                    var $4927 = self.name;
                                    var $4928 = self.expr;
                                    var $4929 = self.body;
                                    var _seen$19 = (((k, s) => ((s[k] = true), s))(_id$12, _seen$5));
                                    var _a1_body$20 = $4925(Kind$Term$var$($4923, _lv$4));
                                    var _b1_body$21 = $4929(Kind$Term$var$($4927, _lv$4));
                                    var self = Kind$Term$equal$($4924, $4928, _defs$3, _lv$4, _seen$19);
                                    switch (self._) {
                                        case 'Kind.Check.result':
                                            var $4931 = self.value;
                                            var $4932 = self.errors;
                                            var self = $4931;
                                            switch (self._) {
                                                case 'Maybe.some':
                                                    var $4934 = self.value;
                                                    var self = Kind$Term$equal$(_a1_body$20, _b1_body$21, _defs$3, Nat$succ$(_lv$4), _seen$19);
                                                    switch (self._) {
                                                        case 'Kind.Check.result':
                                                            var $4936 = self.value;
                                                            var $4937 = self.errors;
                                                            var self = $4936;
                                                            switch (self._) {
                                                                case 'Maybe.some':
                                                                    var $4939 = self.value;
                                                                    var self = Kind$Check$result$(Maybe$some$(($4934 && $4939)), List$nil);
                                                                    switch (self._) {
                                                                        case 'Kind.Check.result':
                                                                            var $4941 = self.value;
                                                                            var $4942 = self.errors;
                                                                            var $4943 = Kind$Check$result$($4941, List$concat$($4937, $4942));
                                                                            var $4940 = $4943;
                                                                            break;
                                                                    };
                                                                    var $4938 = $4940;
                                                                    break;
                                                                case 'Maybe.none':
                                                                    var $4944 = Kind$Check$result$(Maybe$none, $4937);
                                                                    var $4938 = $4944;
                                                                    break;
                                                            };
                                                            var self = $4938;
                                                            break;
                                                    };
                                                    switch (self._) {
                                                        case 'Kind.Check.result':
                                                            var $4945 = self.value;
                                                            var $4946 = self.errors;
                                                            var $4947 = Kind$Check$result$($4945, List$concat$($4932, $4946));
                                                            var $4935 = $4947;
                                                            break;
                                                    };
                                                    var $4933 = $4935;
                                                    break;
                                                case 'Maybe.none':
                                                    var $4948 = Kind$Check$result$(Maybe$none, $4932);
                                                    var $4933 = $4948;
                                                    break;
                                            };
                                            var $4930 = $4933;
                                            break;
                                    };
                                    var $4926 = $4930;
                                    break;
                                case 'Kind.Term.hol':
                                    var $4949 = self.path;
                                    var $4950 = Kind$Term$equal$hole$($4949, _a$1);
                                    var $4926 = $4950;
                                    break;
                                case 'Kind.Term.var':
                                case 'Kind.Term.ref':
                                case 'Kind.Term.typ':
                                case 'Kind.Term.all':
                                case 'Kind.Term.lam':
                                case 'Kind.Term.app':
                                case 'Kind.Term.def':
                                case 'Kind.Term.ann':
                                case 'Kind.Term.gol':
                                case 'Kind.Term.nat':
                                case 'Kind.Term.chr':
                                case 'Kind.Term.str':
                                case 'Kind.Term.cse':
                                case 'Kind.Term.ori':
                                    var $4951 = Kind$Check$result$(Maybe$some$(Bool$false), List$nil);
                                    var $4926 = $4951;
                                    break;
                            };
                            var $4842 = $4926;
                            break;
                        case 'Kind.Term.hol':
                            var $4952 = self.path;
                            var $4953 = Kind$Term$equal$hole$($4952, _b$2);
                            var $4842 = $4953;
                            break;
                        case 'Kind.Term.var':
                        case 'Kind.Term.ori':
                            var self = _b1$9;
                            switch (self._) {
                                case 'Kind.Term.hol':
                                    var $4955 = self.path;
                                    var $4956 = Kind$Term$equal$hole$($4955, _a$1);
                                    var $4954 = $4956;
                                    break;
                                case 'Kind.Term.var':
                                case 'Kind.Term.ref':
                                case 'Kind.Term.typ':
                                case 'Kind.Term.all':
                                case 'Kind.Term.lam':
                                case 'Kind.Term.app':
                                case 'Kind.Term.let':
                                case 'Kind.Term.def':
                                case 'Kind.Term.ann':
                                case 'Kind.Term.gol':
                                case 'Kind.Term.nat':
                                case 'Kind.Term.chr':
                                case 'Kind.Term.str':
                                case 'Kind.Term.cse':
                                case 'Kind.Term.ori':
                                    var $4957 = Kind$Check$result$(Maybe$some$(Bool$false), List$nil);
                                    var $4954 = $4957;
                                    break;
                            };
                            var $4842 = $4954;
                            break;
                        case 'Kind.Term.ref':
                        case 'Kind.Term.nat':
                        case 'Kind.Term.chr':
                        case 'Kind.Term.str':
                            var self = _b1$9;
                            switch (self._) {
                                case 'Kind.Term.hol':
                                    var $4959 = self.path;
                                    var $4960 = Kind$Term$equal$hole$($4959, _a$1);
                                    var $4958 = $4960;
                                    break;
                                case 'Kind.Term.var':
                                case 'Kind.Term.ref':
                                case 'Kind.Term.typ':
                                case 'Kind.Term.all':
                                case 'Kind.Term.lam':
                                case 'Kind.Term.app':
                                case 'Kind.Term.let':
                                case 'Kind.Term.def':
                                case 'Kind.Term.ann':
                                case 'Kind.Term.gol':
                                case 'Kind.Term.nat':
                                case 'Kind.Term.chr':
                                case 'Kind.Term.str':
                                case 'Kind.Term.cse':
                                case 'Kind.Term.ori':
                                    var $4961 = Kind$Check$result$(Maybe$some$(Bool$false), List$nil);
                                    var $4958 = $4961;
                                    break;
                            };
                            var $4842 = $4958;
                            break;
                        case 'Kind.Term.typ':
                            var self = _b1$9;
                            switch (self._) {
                                case 'Kind.Term.hol':
                                    var $4963 = self.path;
                                    var $4964 = Kind$Term$equal$hole$($4963, _a$1);
                                    var $4962 = $4964;
                                    break;
                                case 'Kind.Term.var':
                                case 'Kind.Term.ref':
                                case 'Kind.Term.typ':
                                case 'Kind.Term.all':
                                case 'Kind.Term.lam':
                                case 'Kind.Term.app':
                                case 'Kind.Term.let':
                                case 'Kind.Term.def':
                                case 'Kind.Term.ann':
                                case 'Kind.Term.gol':
                                case 'Kind.Term.nat':
                                case 'Kind.Term.chr':
                                case 'Kind.Term.str':
                                case 'Kind.Term.cse':
                                case 'Kind.Term.ori':
                                    var $4965 = Kind$Check$result$(Maybe$some$(Bool$false), List$nil);
                                    var $4962 = $4965;
                                    break;
                            };
                            var $4842 = $4962;
                            break;
                        case 'Kind.Term.def':
                        case 'Kind.Term.ann':
                        case 'Kind.Term.gol':
                            var self = _b1$9;
                            switch (self._) {
                                case 'Kind.Term.hol':
                                    var $4967 = self.path;
                                    var $4968 = Kind$Term$equal$hole$($4967, _a$1);
                                    var $4966 = $4968;
                                    break;
                                case 'Kind.Term.var':
                                case 'Kind.Term.ref':
                                case 'Kind.Term.typ':
                                case 'Kind.Term.all':
                                case 'Kind.Term.lam':
                                case 'Kind.Term.app':
                                case 'Kind.Term.let':
                                case 'Kind.Term.def':
                                case 'Kind.Term.ann':
                                case 'Kind.Term.gol':
                                case 'Kind.Term.nat':
                                case 'Kind.Term.chr':
                                case 'Kind.Term.str':
                                case 'Kind.Term.cse':
                                case 'Kind.Term.ori':
                                    var $4969 = Kind$Check$result$(Maybe$some$(Bool$false), List$nil);
                                    var $4966 = $4969;
                                    break;
                            };
                            var $4842 = $4966;
                            break;
                        case 'Kind.Term.cse':
                            var self = _b1$9;
                            switch (self._) {
                                case 'Kind.Term.hol':
                                    var $4971 = self.path;
                                    var $4972 = Kind$Term$equal$hole$($4971, _a$1);
                                    var $4970 = $4972;
                                    break;
                                case 'Kind.Term.var':
                                case 'Kind.Term.ref':
                                case 'Kind.Term.typ':
                                case 'Kind.Term.all':
                                case 'Kind.Term.lam':
                                case 'Kind.Term.app':
                                case 'Kind.Term.let':
                                case 'Kind.Term.def':
                                case 'Kind.Term.ann':
                                case 'Kind.Term.gol':
                                case 'Kind.Term.nat':
                                case 'Kind.Term.chr':
                                case 'Kind.Term.str':
                                case 'Kind.Term.cse':
                                case 'Kind.Term.ori':
                                    var $4973 = Kind$Check$result$(Maybe$some$(Bool$false), List$nil);
                                    var $4970 = $4973;
                                    break;
                            };
                            var $4842 = $4970;
                            break;
                    };
                    var $4832 = $4842;
                };
                var $4830 = $4832;
            };
            var $4828 = $4830;
        };
        return $4828;
    };
    const Kind$Term$equal = x0 => x1 => x2 => x3 => x4 => Kind$Term$equal$(x0, x1, x2, x3, x4);
    const Set$new = Map$new;
    const Set$mut$new = a0 => (({}));

    function Kind$Term$check$(_term$1, _type$2, _defs$3, _ctx$4, _path$5, _orig$6) {
        var self = _term$1;
        switch (self._) {
            case 'Kind.Term.var':
                var $4975 = self.name;
                var $4976 = self.indx;
                var self = List$at_last$($4976, _ctx$4);
                switch (self._) {
                    case 'Maybe.some':
                        var $4978 = self.value;
                        var $4979 = Kind$Check$result$(Maybe$some$((() => {
                            var self = $4978;
                            switch (self._) {
                                case 'Pair.new':
                                    var $4980 = self.snd;
                                    var $4981 = $4980;
                                    return $4981;
                            };
                        })()), List$nil);
                        var $4977 = $4979;
                        break;
                    case 'Maybe.none':
                        var $4982 = Kind$Check$result$(_type$2, List$cons$(Kind$Error$undefined_reference$(_orig$6, $4975), List$nil));
                        var $4977 = $4982;
                        break;
                };
                var self = $4977;
                break;
            case 'Kind.Term.ref':
                var $4983 = self.name;
                var self = Kind$get$($4983, _defs$3);
                switch (self._) {
                    case 'Maybe.some':
                        var $4985 = self.value;
                        var self = $4985;
                        switch (self._) {
                            case 'Kind.Def.new':
                                var $4987 = self.name;
                                var $4988 = self.term;
                                var $4989 = self.type;
                                var $4990 = self.stat;
                                var _ref_name$18 = $4987;
                                var _ref_type$19 = $4989;
                                var _ref_term$20 = $4988;
                                var _ref_stat$21 = $4990;
                                var self = _ref_stat$21;
                                switch (self._) {
                                    case 'Kind.Status.init':
                                        var $4992 = Kind$Check$result$(Maybe$some$(_ref_type$19), List$cons$(Kind$Error$waiting$(_ref_name$18), List$nil));
                                        var $4991 = $4992;
                                        break;
                                    case 'Kind.Status.wait':
                                    case 'Kind.Status.done':
                                        var $4993 = Kind$Check$result$(Maybe$some$(_ref_type$19), List$nil);
                                        var $4991 = $4993;
                                        break;
                                    case 'Kind.Status.fail':
                                        var $4994 = Kind$Check$result$(Maybe$some$(_ref_type$19), List$cons$(Kind$Error$indirect$(_ref_name$18), List$nil));
                                        var $4991 = $4994;
                                        break;
                                };
                                var $4986 = $4991;
                                break;
                        };
                        var $4984 = $4986;
                        break;
                    case 'Maybe.none':
                        var $4995 = Kind$Check$result$(_type$2, List$cons$(Kind$Error$undefined_reference$(_orig$6, $4983), List$nil));
                        var $4984 = $4995;
                        break;
                };
                var self = $4984;
                break;
            case 'Kind.Term.all':
                var $4996 = self.self;
                var $4997 = self.name;
                var $4998 = self.xtyp;
                var $4999 = self.body;
                var _ctx_size$12 = (list_length(_ctx$4));
                var _self_var$13 = Kind$Term$var$($4996, _ctx_size$12);
                var _body_var$14 = Kind$Term$var$($4997, Nat$succ$(_ctx_size$12));
                var _body_ctx$15 = List$cons$(Pair$new$($4997, $4998), List$cons$(Pair$new$($4996, _term$1), _ctx$4));
                var self = Kind$Term$check$($4998, Maybe$some$(Kind$Term$typ), _defs$3, _ctx$4, Kind$MPath$o$(_path$5), _orig$6);
                switch (self._) {
                    case 'Kind.Check.result':
                        var $5001 = self.value;
                        var $5002 = self.errors;
                        var self = $5001;
                        switch (self._) {
                            case 'Maybe.none':
                                var $5004 = Kind$Check$result$(Maybe$none, $5002);
                                var $5003 = $5004;
                                break;
                            case 'Maybe.some':
                                var self = Kind$Term$check$($4999(_self_var$13)(_body_var$14), Maybe$some$(Kind$Term$typ), _defs$3, _body_ctx$15, Kind$MPath$i$(_path$5), _orig$6);
                                switch (self._) {
                                    case 'Kind.Check.result':
                                        var $5006 = self.value;
                                        var $5007 = self.errors;
                                        var self = $5006;
                                        switch (self._) {
                                            case 'Maybe.none':
                                                var $5009 = Kind$Check$result$(Maybe$none, $5007);
                                                var $5008 = $5009;
                                                break;
                                            case 'Maybe.some':
                                                var self = Kind$Check$result$(Maybe$some$(Kind$Term$typ), List$nil);
                                                switch (self._) {
                                                    case 'Kind.Check.result':
                                                        var $5011 = self.value;
                                                        var $5012 = self.errors;
                                                        var $5013 = Kind$Check$result$($5011, List$concat$($5007, $5012));
                                                        var $5010 = $5013;
                                                        break;
                                                };
                                                var $5008 = $5010;
                                                break;
                                        };
                                        var self = $5008;
                                        break;
                                };
                                switch (self._) {
                                    case 'Kind.Check.result':
                                        var $5014 = self.value;
                                        var $5015 = self.errors;
                                        var $5016 = Kind$Check$result$($5014, List$concat$($5002, $5015));
                                        var $5005 = $5016;
                                        break;
                                };
                                var $5003 = $5005;
                                break;
                        };
                        var $5000 = $5003;
                        break;
                };
                var self = $5000;
                break;
            case 'Kind.Term.lam':
                var $5017 = self.name;
                var $5018 = self.body;
                var self = _type$2;
                switch (self._) {
                    case 'Maybe.some':
                        var $5020 = self.value;
                        var _typv$10 = Kind$Term$reduce$($5020, _defs$3);
                        var self = _typv$10;
                        switch (self._) {
                            case 'Kind.Term.all':
                                var $5022 = self.xtyp;
                                var $5023 = self.body;
                                var _ctx_size$16 = (list_length(_ctx$4));
                                var _self_var$17 = _term$1;
                                var _body_var$18 = Kind$Term$var$($5017, _ctx_size$16);
                                var _body_typ$19 = $5023(_self_var$17)(_body_var$18);
                                var _body_ctx$20 = List$cons$(Pair$new$($5017, $5022), _ctx$4);
                                var self = Kind$Term$check$($5018(_body_var$18), Maybe$some$(_body_typ$19), _defs$3, _body_ctx$20, Kind$MPath$o$(_path$5), _orig$6);
                                switch (self._) {
                                    case 'Kind.Check.result':
                                        var $5025 = self.value;
                                        var $5026 = self.errors;
                                        var self = $5025;
                                        switch (self._) {
                                            case 'Maybe.none':
                                                var $5028 = Kind$Check$result$(Maybe$none, $5026);
                                                var $5027 = $5028;
                                                break;
                                            case 'Maybe.some':
                                                var self = Kind$Check$result$(Maybe$some$($5020), List$nil);
                                                switch (self._) {
                                                    case 'Kind.Check.result':
                                                        var $5030 = self.value;
                                                        var $5031 = self.errors;
                                                        var $5032 = Kind$Check$result$($5030, List$concat$($5026, $5031));
                                                        var $5029 = $5032;
                                                        break;
                                                };
                                                var $5027 = $5029;
                                                break;
                                        };
                                        var $5024 = $5027;
                                        break;
                                };
                                var $5021 = $5024;
                                break;
                            case 'Kind.Term.var':
                            case 'Kind.Term.lam':
                            case 'Kind.Term.app':
                            case 'Kind.Term.ori':
                                var _expected$13 = Either$left$("(function type)");
                                var _detected$14 = Either$right$($5020);
                                var $5033 = Kind$Check$result$(_type$2, List$cons$(Kind$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                var $5021 = $5033;
                                break;
                            case 'Kind.Term.ref':
                            case 'Kind.Term.hol':
                            case 'Kind.Term.nat':
                            case 'Kind.Term.chr':
                            case 'Kind.Term.str':
                                var _expected$12 = Either$left$("(function type)");
                                var _detected$13 = Either$right$($5020);
                                var $5034 = Kind$Check$result$(_type$2, List$cons$(Kind$Error$type_mismatch$(_orig$6, _expected$12, _detected$13, _ctx$4), List$nil));
                                var $5021 = $5034;
                                break;
                            case 'Kind.Term.typ':
                                var _expected$11 = Either$left$("(function type)");
                                var _detected$12 = Either$right$($5020);
                                var $5035 = Kind$Check$result$(_type$2, List$cons$(Kind$Error$type_mismatch$(_orig$6, _expected$11, _detected$12, _ctx$4), List$nil));
                                var $5021 = $5035;
                                break;
                            case 'Kind.Term.let':
                            case 'Kind.Term.def':
                            case 'Kind.Term.ann':
                            case 'Kind.Term.gol':
                                var _expected$14 = Either$left$("(function type)");
                                var _detected$15 = Either$right$($5020);
                                var $5036 = Kind$Check$result$(_type$2, List$cons$(Kind$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                var $5021 = $5036;
                                break;
                            case 'Kind.Term.cse':
                                var _expected$17 = Either$left$("(function type)");
                                var _detected$18 = Either$right$($5020);
                                var $5037 = Kind$Check$result$(_type$2, List$cons$(Kind$Error$type_mismatch$(_orig$6, _expected$17, _detected$18, _ctx$4), List$nil));
                                var $5021 = $5037;
                                break;
                        };
                        var $5019 = $5021;
                        break;
                    case 'Maybe.none':
                        var _lam_type$9 = Kind$Term$hol$(Bits$e);
                        var _lam_term$10 = Kind$Term$ann$(Bool$false, _term$1, _lam_type$9);
                        var $5038 = Kind$Check$result$(_type$2, List$cons$(Kind$Error$patch$(Kind$MPath$to_bits$(_path$5), _lam_term$10), List$nil));
                        var $5019 = $5038;
                        break;
                };
                var self = $5019;
                break;
            case 'Kind.Term.app':
                var $5039 = self.func;
                var $5040 = self.argm;
                var self = Kind$Term$check$($5039, Maybe$none, _defs$3, _ctx$4, Kind$MPath$o$(_path$5), _orig$6);
                switch (self._) {
                    case 'Kind.Check.result':
                        var $5042 = self.value;
                        var $5043 = self.errors;
                        var self = $5042;
                        switch (self._) {
                            case 'Maybe.some':
                                var $5045 = self.value;
                                var _func_typ$12 = Kind$Term$reduce$($5045, _defs$3);
                                var self = _func_typ$12;
                                switch (self._) {
                                    case 'Kind.Term.all':
                                        var $5047 = self.xtyp;
                                        var $5048 = self.body;
                                        var self = Kind$Term$check$($5040, Maybe$some$($5047), _defs$3, _ctx$4, Kind$MPath$i$(_path$5), _orig$6);
                                        switch (self._) {
                                            case 'Kind.Check.result':
                                                var $5050 = self.value;
                                                var $5051 = self.errors;
                                                var self = $5050;
                                                switch (self._) {
                                                    case 'Maybe.none':
                                                        var $5053 = Kind$Check$result$(Maybe$none, $5051);
                                                        var $5052 = $5053;
                                                        break;
                                                    case 'Maybe.some':
                                                        var self = Kind$Check$result$(Maybe$some$($5048($5039)($5040)), List$nil);
                                                        switch (self._) {
                                                            case 'Kind.Check.result':
                                                                var $5055 = self.value;
                                                                var $5056 = self.errors;
                                                                var $5057 = Kind$Check$result$($5055, List$concat$($5051, $5056));
                                                                var $5054 = $5057;
                                                                break;
                                                        };
                                                        var $5052 = $5054;
                                                        break;
                                                };
                                                var $5049 = $5052;
                                                break;
                                        };
                                        var self = $5049;
                                        break;
                                    case 'Kind.Term.var':
                                    case 'Kind.Term.lam':
                                    case 'Kind.Term.app':
                                    case 'Kind.Term.ori':
                                        var _expected$15 = Either$left$("(function type)");
                                        var _detected$16 = Either$right$(_func_typ$12);
                                        var $5058 = Kind$Check$result$(_type$2, List$cons$(Kind$Error$type_mismatch$(_orig$6, _expected$15, _detected$16, _ctx$4), List$nil));
                                        var self = $5058;
                                        break;
                                    case 'Kind.Term.ref':
                                    case 'Kind.Term.hol':
                                    case 'Kind.Term.nat':
                                    case 'Kind.Term.chr':
                                    case 'Kind.Term.str':
                                        var _expected$14 = Either$left$("(function type)");
                                        var _detected$15 = Either$right$(_func_typ$12);
                                        var $5059 = Kind$Check$result$(_type$2, List$cons$(Kind$Error$type_mismatch$(_orig$6, _expected$14, _detected$15, _ctx$4), List$nil));
                                        var self = $5059;
                                        break;
                                    case 'Kind.Term.typ':
                                        var _expected$13 = Either$left$("(function type)");
                                        var _detected$14 = Either$right$(_func_typ$12);
                                        var $5060 = Kind$Check$result$(_type$2, List$cons$(Kind$Error$type_mismatch$(_orig$6, _expected$13, _detected$14, _ctx$4), List$nil));
                                        var self = $5060;
                                        break;
                                    case 'Kind.Term.let':
                                    case 'Kind.Term.def':
                                    case 'Kind.Term.ann':
                                    case 'Kind.Term.gol':
                                        var _expected$16 = Either$left$("(function type)");
                                        var _detected$17 = Either$right$(_func_typ$12);
                                        var $5061 = Kind$Check$result$(_type$2, List$cons$(Kind$Error$type_mismatch$(_orig$6, _expected$16, _detected$17, _ctx$4), List$nil));
                                        var self = $5061;
                                        break;
                                    case 'Kind.Term.cse':
                                        var _expected$19 = Either$left$("(function type)");
                                        var _detected$20 = Either$right$(_func_typ$12);
                                        var $5062 = Kind$Check$result$(_type$2, List$cons$(Kind$Error$type_mismatch$(_orig$6, _expected$19, _detected$20, _ctx$4), List$nil));
                                        var self = $5062;
                                        break;
                                };
                                switch (self._) {
                                    case 'Kind.Check.result':
                                        var $5063 = self.value;
                                        var $5064 = self.errors;
                                        var $5065 = Kind$Check$result$($5063, List$concat$($5043, $5064));
                                        var $5046 = $5065;
                                        break;
                                };
                                var $5044 = $5046;
                                break;
                            case 'Maybe.none':
                                var $5066 = Kind$Check$result$(Maybe$none, $5043);
                                var $5044 = $5066;
                                break;
                        };
                        var $5041 = $5044;
                        break;
                };
                var self = $5041;
                break;
            case 'Kind.Term.let':
                var $5067 = self.name;
                var $5068 = self.expr;
                var $5069 = self.body;
                var _ctx_size$10 = (list_length(_ctx$4));
                var self = Kind$Term$check$($5068, Maybe$none, _defs$3, _ctx$4, Kind$MPath$o$(_path$5), _orig$6);
                switch (self._) {
                    case 'Kind.Check.result':
                        var $5071 = self.value;
                        var $5072 = self.errors;
                        var self = $5071;
                        switch (self._) {
                            case 'Maybe.some':
                                var $5074 = self.value;
                                var _body_val$14 = $5069(Kind$Term$var$($5067, _ctx_size$10));
                                var _body_ctx$15 = List$cons$(Pair$new$($5067, $5074), _ctx$4);
                                var self = Kind$Term$check$(_body_val$14, _type$2, _defs$3, _body_ctx$15, Kind$MPath$i$(_path$5), _orig$6);
                                switch (self._) {
                                    case 'Kind.Check.result':
                                        var $5076 = self.value;
                                        var $5077 = self.errors;
                                        var self = $5076;
                                        switch (self._) {
                                            case 'Maybe.some':
                                                var $5079 = self.value;
                                                var self = Kind$Check$result$(Maybe$some$($5079), List$nil);
                                                switch (self._) {
                                                    case 'Kind.Check.result':
                                                        var $5081 = self.value;
                                                        var $5082 = self.errors;
                                                        var $5083 = Kind$Check$result$($5081, List$concat$($5077, $5082));
                                                        var $5080 = $5083;
                                                        break;
                                                };
                                                var $5078 = $5080;
                                                break;
                                            case 'Maybe.none':
                                                var $5084 = Kind$Check$result$(Maybe$none, $5077);
                                                var $5078 = $5084;
                                                break;
                                        };
                                        var self = $5078;
                                        break;
                                };
                                switch (self._) {
                                    case 'Kind.Check.result':
                                        var $5085 = self.value;
                                        var $5086 = self.errors;
                                        var $5087 = Kind$Check$result$($5085, List$concat$($5072, $5086));
                                        var $5075 = $5087;
                                        break;
                                };
                                var $5073 = $5075;
                                break;
                            case 'Maybe.none':
                                var $5088 = Kind$Check$result$(Maybe$none, $5072);
                                var $5073 = $5088;
                                break;
                        };
                        var $5070 = $5073;
                        break;
                };
                var self = $5070;
                break;
            case 'Kind.Term.def':
                var $5089 = self.name;
                var $5090 = self.expr;
                var $5091 = self.body;
                var _ctx_size$10 = (list_length(_ctx$4));
                var self = Kind$Term$check$($5090, Maybe$none, _defs$3, _ctx$4, Kind$MPath$o$(_path$5), _orig$6);
                switch (self._) {
                    case 'Kind.Check.result':
                        var $5093 = self.value;
                        var $5094 = self.errors;
                        var self = $5093;
                        switch (self._) {
                            case 'Maybe.some':
                                var $5096 = self.value;
                                var _body_val$14 = $5091(Kind$Term$ann$(Bool$true, $5090, $5096));
                                var _body_ctx$15 = List$cons$(Pair$new$($5089, $5096), _ctx$4);
                                var self = Kind$Term$check$(_body_val$14, _type$2, _defs$3, _body_ctx$15, Kind$MPath$i$(_path$5), _orig$6);
                                switch (self._) {
                                    case 'Kind.Check.result':
                                        var $5098 = self.value;
                                        var $5099 = self.errors;
                                        var self = $5098;
                                        switch (self._) {
                                            case 'Maybe.some':
                                                var $5101 = self.value;
                                                var self = Kind$Check$result$(Maybe$some$($5101), List$nil);
                                                switch (self._) {
                                                    case 'Kind.Check.result':
                                                        var $5103 = self.value;
                                                        var $5104 = self.errors;
                                                        var $5105 = Kind$Check$result$($5103, List$concat$($5099, $5104));
                                                        var $5102 = $5105;
                                                        break;
                                                };
                                                var $5100 = $5102;
                                                break;
                                            case 'Maybe.none':
                                                var $5106 = Kind$Check$result$(Maybe$none, $5099);
                                                var $5100 = $5106;
                                                break;
                                        };
                                        var self = $5100;
                                        break;
                                };
                                switch (self._) {
                                    case 'Kind.Check.result':
                                        var $5107 = self.value;
                                        var $5108 = self.errors;
                                        var $5109 = Kind$Check$result$($5107, List$concat$($5094, $5108));
                                        var $5097 = $5109;
                                        break;
                                };
                                var $5095 = $5097;
                                break;
                            case 'Maybe.none':
                                var $5110 = Kind$Check$result$(Maybe$none, $5094);
                                var $5095 = $5110;
                                break;
                        };
                        var $5092 = $5095;
                        break;
                };
                var self = $5092;
                break;
            case 'Kind.Term.ann':
                var $5111 = self.done;
                var $5112 = self.term;
                var $5113 = self.type;
                var self = $5111;
                if (self) {
                    var $5115 = Kind$Check$result$(Maybe$some$($5113), List$nil);
                    var $5114 = $5115;
                } else {
                    var self = Kind$Term$check$($5112, Maybe$some$($5113), _defs$3, _ctx$4, Kind$MPath$o$(_path$5), _orig$6);
                    switch (self._) {
                        case 'Kind.Check.result':
                            var $5117 = self.value;
                            var $5118 = self.errors;
                            var self = $5117;
                            switch (self._) {
                                case 'Maybe.none':
                                    var $5120 = Kind$Check$result$(Maybe$none, $5118);
                                    var $5119 = $5120;
                                    break;
                                case 'Maybe.some':
                                    var self = Kind$Term$check$($5113, Maybe$some$(Kind$Term$typ), _defs$3, _ctx$4, Kind$MPath$i$(_path$5), _orig$6);
                                    switch (self._) {
                                        case 'Kind.Check.result':
                                            var $5122 = self.value;
                                            var $5123 = self.errors;
                                            var self = $5122;
                                            switch (self._) {
                                                case 'Maybe.none':
                                                    var $5125 = Kind$Check$result$(Maybe$none, $5123);
                                                    var $5124 = $5125;
                                                    break;
                                                case 'Maybe.some':
                                                    var self = Kind$Check$result$(Maybe$some$($5113), List$nil);
                                                    switch (self._) {
                                                        case 'Kind.Check.result':
                                                            var $5127 = self.value;
                                                            var $5128 = self.errors;
                                                            var $5129 = Kind$Check$result$($5127, List$concat$($5123, $5128));
                                                            var $5126 = $5129;
                                                            break;
                                                    };
                                                    var $5124 = $5126;
                                                    break;
                                            };
                                            var self = $5124;
                                            break;
                                    };
                                    switch (self._) {
                                        case 'Kind.Check.result':
                                            var $5130 = self.value;
                                            var $5131 = self.errors;
                                            var $5132 = Kind$Check$result$($5130, List$concat$($5118, $5131));
                                            var $5121 = $5132;
                                            break;
                                    };
                                    var $5119 = $5121;
                                    break;
                            };
                            var $5116 = $5119;
                            break;
                    };
                    var $5114 = $5116;
                };
                var self = $5114;
                break;
            case 'Kind.Term.gol':
                var $5133 = self.name;
                var $5134 = self.dref;
                var $5135 = self.verb;
                var $5136 = Kind$Check$result$(_type$2, List$cons$(Kind$Error$show_goal$($5133, $5134, $5135, _type$2, _ctx$4), List$nil));
                var self = $5136;
                break;
            case 'Kind.Term.cse':
                var $5137 = self.path;
                var $5138 = self.expr;
                var $5139 = self.name;
                var $5140 = self.with;
                var $5141 = self.cses;
                var $5142 = self.moti;
                var _expr$13 = $5138;
                var self = Kind$Term$check$(_expr$13, Maybe$none, _defs$3, _ctx$4, Kind$MPath$o$(_path$5), _orig$6);
                switch (self._) {
                    case 'Kind.Check.result':
                        var $5144 = self.value;
                        var $5145 = self.errors;
                        var self = $5144;
                        switch (self._) {
                            case 'Maybe.some':
                                var $5147 = self.value;
                                var self = $5142;
                                switch (self._) {
                                    case 'Maybe.some':
                                        var $5149 = self.value;
                                        var $5150 = Kind$Term$desugar_cse$($5138, $5139, $5140, $5141, $5149, $5147, _defs$3, _ctx$4);
                                        var _dsug$17 = $5150;
                                        break;
                                    case 'Maybe.none':
                                        var self = _type$2;
                                        switch (self._) {
                                            case 'Maybe.some':
                                                var $5152 = self.value;
                                                var _size$18 = (list_length(_ctx$4));
                                                var _typv$19 = Kind$Term$normalize$($5152, Map$new);
                                                var _moti$20 = Kind$SmartMotive$make$($5139, $5138, $5147, _typv$19, _size$18, _defs$3);
                                                var $5153 = _moti$20;
                                                var _moti$17 = $5153;
                                                break;
                                            case 'Maybe.none':
                                                var $5154 = Kind$Term$hol$(Bits$e);
                                                var _moti$17 = $5154;
                                                break;
                                        };
                                        var $5151 = Maybe$some$(Kind$Term$cse$($5137, $5138, $5139, $5140, $5141, Maybe$some$(_moti$17)));
                                        var _dsug$17 = $5151;
                                        break;
                                };
                                var self = _dsug$17;
                                switch (self._) {
                                    case 'Maybe.some':
                                        var $5155 = self.value;
                                        var $5156 = Kind$Check$result$(_type$2, List$cons$(Kind$Error$patch$(Kind$MPath$to_bits$(_path$5), $5155), List$nil));
                                        var self = $5156;
                                        break;
                                    case 'Maybe.none':
                                        var $5157 = Kind$Check$result$(_type$2, List$cons$(Kind$Error$cant_infer$(_orig$6, _term$1, _ctx$4), List$nil));
                                        var self = $5157;
                                        break;
                                };
                                switch (self._) {
                                    case 'Kind.Check.result':
                                        var $5158 = self.value;
                                        var $5159 = self.errors;
                                        var $5160 = Kind$Check$result$($5158, List$concat$($5145, $5159));
                                        var $5148 = $5160;
                                        break;
                                };
                                var $5146 = $5148;
                                break;
                            case 'Maybe.none':
                                var $5161 = Kind$Check$result$(Maybe$none, $5145);
                                var $5146 = $5161;
                                break;
                        };
                        var $5143 = $5146;
                        break;
                };
                var self = $5143;
                break;
            case 'Kind.Term.ori':
                var $5162 = self.orig;
                var $5163 = self.expr;
                var $5164 = Kind$Term$check$($5163, _type$2, _defs$3, _ctx$4, _path$5, Maybe$some$($5162));
                var self = $5164;
                break;
            case 'Kind.Term.typ':
                var $5165 = Kind$Check$result$(Maybe$some$(Kind$Term$typ), List$nil);
                var self = $5165;
                break;
            case 'Kind.Term.hol':
                var $5166 = Kind$Check$result$(_type$2, List$nil);
                var self = $5166;
                break;
            case 'Kind.Term.nat':
                var $5167 = Kind$Check$result$(Maybe$some$(Kind$Term$ref$("Nat")), List$nil);
                var self = $5167;
                break;
            case 'Kind.Term.chr':
                var $5168 = Kind$Check$result$(Maybe$some$(Kind$Term$ref$("Char")), List$nil);
                var self = $5168;
                break;
            case 'Kind.Term.str':
                var $5169 = Kind$Check$result$(Maybe$some$(Kind$Term$ref$("String")), List$nil);
                var self = $5169;
                break;
        };
        switch (self._) {
            case 'Kind.Check.result':
                var $5170 = self.value;
                var $5171 = self.errors;
                var self = $5170;
                switch (self._) {
                    case 'Maybe.some':
                        var $5173 = self.value;
                        var self = _type$2;
                        switch (self._) {
                            case 'Maybe.some':
                                var $5175 = self.value;
                                var self = Kind$Term$equal$($5175, $5173, _defs$3, (list_length(_ctx$4)), (({})));
                                switch (self._) {
                                    case 'Kind.Check.result':
                                        var $5177 = self.value;
                                        var $5178 = self.errors;
                                        var self = $5177;
                                        switch (self._) {
                                            case 'Maybe.some':
                                                var $5180 = self.value;
                                                var self = $5180;
                                                if (self) {
                                                    var $5182 = Kind$Check$result$(Maybe$some$($5175), List$nil);
                                                    var self = $5182;
                                                } else {
                                                    var $5183 = Kind$Check$result$(_type$2, List$cons$(Kind$Error$type_mismatch$(_orig$6, Either$right$($5175), Either$right$($5173), _ctx$4), List$nil));
                                                    var self = $5183;
                                                };
                                                switch (self._) {
                                                    case 'Kind.Check.result':
                                                        var $5184 = self.value;
                                                        var $5185 = self.errors;
                                                        var $5186 = Kind$Check$result$($5184, List$concat$($5178, $5185));
                                                        var $5181 = $5186;
                                                        break;
                                                };
                                                var $5179 = $5181;
                                                break;
                                            case 'Maybe.none':
                                                var $5187 = Kind$Check$result$(Maybe$none, $5178);
                                                var $5179 = $5187;
                                                break;
                                        };
                                        var $5176 = $5179;
                                        break;
                                };
                                var self = $5176;
                                break;
                            case 'Maybe.none':
                                var $5188 = Kind$Check$result$(Maybe$some$($5173), List$nil);
                                var self = $5188;
                                break;
                        };
                        switch (self._) {
                            case 'Kind.Check.result':
                                var $5189 = self.value;
                                var $5190 = self.errors;
                                var $5191 = Kind$Check$result$($5189, List$concat$($5171, $5190));
                                var $5174 = $5191;
                                break;
                        };
                        var $5172 = $5174;
                        break;
                    case 'Maybe.none':
                        var $5192 = Kind$Check$result$(Maybe$none, $5171);
                        var $5172 = $5192;
                        break;
                };
                var $4974 = $5172;
                break;
        };
        return $4974;
    };
    const Kind$Term$check = x0 => x1 => x2 => x3 => x4 => x5 => Kind$Term$check$(x0, x1, x2, x3, x4, x5);

    function Kind$Path$nil$(_x$1) {
        var $5193 = _x$1;
        return $5193;
    };
    const Kind$Path$nil = x0 => Kind$Path$nil$(x0);
    const Kind$MPath$nil = Maybe$some$(Kind$Path$nil);

    function List$is_empty$(_list$2) {
        var self = _list$2;
        switch (self._) {
            case 'List.nil':
                var $5195 = Bool$true;
                var $5194 = $5195;
                break;
            case 'List.cons':
                var $5196 = Bool$false;
                var $5194 = $5196;
                break;
        };
        return $5194;
    };
    const List$is_empty = x0 => List$is_empty$(x0);

    function Kind$Term$patch_at$(_path$1, _term$2, _fn$3) {
        var self = _term$2;
        switch (self._) {
            case 'Kind.Term.all':
                var $5198 = self.eras;
                var $5199 = self.self;
                var $5200 = self.name;
                var $5201 = self.xtyp;
                var $5202 = self.body;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'o':
                        var $5204 = self.slice(0, -1);
                        var $5205 = Kind$Term$all$($5198, $5199, $5200, Kind$Term$patch_at$($5204, $5201, _fn$3), $5202);
                        var $5203 = $5205;
                        break;
                    case 'i':
                        var $5206 = self.slice(0, -1);
                        var $5207 = Kind$Term$all$($5198, $5199, $5200, $5201, (_s$10 => _x$11 => {
                            var $5208 = Kind$Term$patch_at$($5206, $5202(_s$10)(_x$11), _fn$3);
                            return $5208;
                        }));
                        var $5203 = $5207;
                        break;
                    case 'e':
                        var $5209 = _fn$3(_term$2);
                        var $5203 = $5209;
                        break;
                };
                var $5197 = $5203;
                break;
            case 'Kind.Term.lam':
                var $5210 = self.name;
                var $5211 = self.body;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $5213 = _fn$3(_term$2);
                        var $5212 = $5213;
                        break;
                    case 'o':
                    case 'i':
                        var $5214 = Kind$Term$lam$($5210, (_x$7 => {
                            var $5215 = Kind$Term$patch_at$(Bits$tail$(_path$1), $5211(_x$7), _fn$3);
                            return $5215;
                        }));
                        var $5212 = $5214;
                        break;
                };
                var $5197 = $5212;
                break;
            case 'Kind.Term.app':
                var $5216 = self.func;
                var $5217 = self.argm;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'o':
                        var $5219 = self.slice(0, -1);
                        var $5220 = Kind$Term$app$(Kind$Term$patch_at$($5219, $5216, _fn$3), $5217);
                        var $5218 = $5220;
                        break;
                    case 'i':
                        var $5221 = self.slice(0, -1);
                        var $5222 = Kind$Term$app$($5216, Kind$Term$patch_at$($5221, $5217, _fn$3));
                        var $5218 = $5222;
                        break;
                    case 'e':
                        var $5223 = _fn$3(_term$2);
                        var $5218 = $5223;
                        break;
                };
                var $5197 = $5218;
                break;
            case 'Kind.Term.let':
                var $5224 = self.name;
                var $5225 = self.expr;
                var $5226 = self.body;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'o':
                        var $5228 = self.slice(0, -1);
                        var $5229 = Kind$Term$let$($5224, Kind$Term$patch_at$($5228, $5225, _fn$3), $5226);
                        var $5227 = $5229;
                        break;
                    case 'i':
                        var $5230 = self.slice(0, -1);
                        var $5231 = Kind$Term$let$($5224, $5225, (_x$8 => {
                            var $5232 = Kind$Term$patch_at$($5230, $5226(_x$8), _fn$3);
                            return $5232;
                        }));
                        var $5227 = $5231;
                        break;
                    case 'e':
                        var $5233 = _fn$3(_term$2);
                        var $5227 = $5233;
                        break;
                };
                var $5197 = $5227;
                break;
            case 'Kind.Term.def':
                var $5234 = self.name;
                var $5235 = self.expr;
                var $5236 = self.body;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'o':
                        var $5238 = self.slice(0, -1);
                        var $5239 = Kind$Term$def$($5234, Kind$Term$patch_at$($5238, $5235, _fn$3), $5236);
                        var $5237 = $5239;
                        break;
                    case 'i':
                        var $5240 = self.slice(0, -1);
                        var $5241 = Kind$Term$def$($5234, $5235, (_x$8 => {
                            var $5242 = Kind$Term$patch_at$($5240, $5236(_x$8), _fn$3);
                            return $5242;
                        }));
                        var $5237 = $5241;
                        break;
                    case 'e':
                        var $5243 = _fn$3(_term$2);
                        var $5237 = $5243;
                        break;
                };
                var $5197 = $5237;
                break;
            case 'Kind.Term.ann':
                var $5244 = self.done;
                var $5245 = self.term;
                var $5246 = self.type;
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'o':
                        var $5248 = self.slice(0, -1);
                        var $5249 = Kind$Term$ann$($5244, Kind$Term$patch_at$($5248, $5245, _fn$3), $5246);
                        var $5247 = $5249;
                        break;
                    case 'i':
                        var $5250 = self.slice(0, -1);
                        var $5251 = Kind$Term$ann$($5244, $5245, Kind$Term$patch_at$($5250, $5246, _fn$3));
                        var $5247 = $5251;
                        break;
                    case 'e':
                        var $5252 = _fn$3(_term$2);
                        var $5247 = $5252;
                        break;
                };
                var $5197 = $5247;
                break;
            case 'Kind.Term.ori':
                var $5253 = self.orig;
                var $5254 = self.expr;
                var $5255 = Kind$Term$ori$($5253, Kind$Term$patch_at$(_path$1, $5254, _fn$3));
                var $5197 = $5255;
                break;
            case 'Kind.Term.var':
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $5257 = _fn$3(_term$2);
                        var $5256 = $5257;
                        break;
                    case 'o':
                    case 'i':
                        var $5258 = _term$2;
                        var $5256 = $5258;
                        break;
                };
                var $5197 = $5256;
                break;
            case 'Kind.Term.ref':
            case 'Kind.Term.hol':
            case 'Kind.Term.nat':
            case 'Kind.Term.chr':
            case 'Kind.Term.str':
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $5260 = _fn$3(_term$2);
                        var $5259 = $5260;
                        break;
                    case 'o':
                    case 'i':
                        var $5261 = _term$2;
                        var $5259 = $5261;
                        break;
                };
                var $5197 = $5259;
                break;
            case 'Kind.Term.typ':
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $5263 = _fn$3(_term$2);
                        var $5262 = $5263;
                        break;
                    case 'o':
                    case 'i':
                        var $5264 = _term$2;
                        var $5262 = $5264;
                        break;
                };
                var $5197 = $5262;
                break;
            case 'Kind.Term.gol':
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $5266 = _fn$3(_term$2);
                        var $5265 = $5266;
                        break;
                    case 'o':
                    case 'i':
                        var $5267 = _term$2;
                        var $5265 = $5267;
                        break;
                };
                var $5197 = $5265;
                break;
            case 'Kind.Term.cse':
                var self = _path$1;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'e':
                        var $5269 = _fn$3(_term$2);
                        var $5268 = $5269;
                        break;
                    case 'o':
                    case 'i':
                        var $5270 = _term$2;
                        var $5268 = $5270;
                        break;
                };
                var $5197 = $5268;
                break;
        };
        return $5197;
    };
    const Kind$Term$patch_at = x0 => x1 => x2 => Kind$Term$patch_at$(x0, x1, x2);

    function Kind$Synth$fix$(_file$1, _code$2, _orig$3, _name$4, _term$5, _type$6, _isct$7, _arit$8, _defs$9, _errs$10, _fixd$11) {
        var self = _errs$10;
        switch (self._) {
            case 'List.cons':
                var $5272 = self.head;
                var $5273 = self.tail;
                var self = $5272;
                switch (self._) {
                    case 'Kind.Error.waiting':
                        var $5275 = self.name;
                        var $5276 = IO$monad$((_m$bind$15 => _m$pure$16 => {
                            var $5277 = _m$bind$15;
                            return $5277;
                        }))(Kind$Synth$one$($5275, _defs$9))((_new_defs$15 => {
                            var self = _new_defs$15;
                            switch (self._) {
                                case 'Maybe.some':
                                    var $5279 = self.value;
                                    var $5280 = Kind$Synth$fix$(_file$1, _code$2, _orig$3, _name$4, _term$5, _type$6, _isct$7, _arit$8, $5279, $5273, Bool$true);
                                    var $5278 = $5280;
                                    break;
                                case 'Maybe.none':
                                    var $5281 = Kind$Synth$fix$(_file$1, _code$2, _orig$3, _name$4, _term$5, _type$6, _isct$7, _arit$8, _defs$9, $5273, _fixd$11);
                                    var $5278 = $5281;
                                    break;
                            };
                            return $5278;
                        }));
                        var $5274 = $5276;
                        break;
                    case 'Kind.Error.patch':
                        var $5282 = self.path;
                        var $5283 = self.term;
                        var self = $5282;
                        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                            case 'o':
                                var $5285 = self.slice(0, -1);
                                var _term$17 = Kind$Term$patch_at$($5285, _term$5, (_x$17 => {
                                    var $5287 = $5283;
                                    return $5287;
                                }));
                                var $5286 = Kind$Synth$fix$(_file$1, _code$2, _orig$3, _name$4, _term$17, _type$6, _isct$7, _arit$8, _defs$9, $5273, Bool$true);
                                var $5284 = $5286;
                                break;
                            case 'i':
                                var $5288 = self.slice(0, -1);
                                var _type$17 = Kind$Term$patch_at$($5288, _type$6, (_x$17 => {
                                    var $5290 = $5283;
                                    return $5290;
                                }));
                                var $5289 = Kind$Synth$fix$(_file$1, _code$2, _orig$3, _name$4, _term$5, _type$17, _isct$7, _arit$8, _defs$9, $5273, Bool$true);
                                var $5284 = $5289;
                                break;
                            case 'e':
                                var $5291 = IO$monad$((_m$bind$16 => _m$pure$17 => {
                                    var $5292 = _m$pure$17;
                                    return $5292;
                                }))(Maybe$none);
                                var $5284 = $5291;
                                break;
                        };
                        var $5274 = $5284;
                        break;
                    case 'Kind.Error.undefined_reference':
                        var $5293 = self.name;
                        var $5294 = IO$monad$((_m$bind$16 => _m$pure$17 => {
                            var $5295 = _m$bind$16;
                            return $5295;
                        }))(Kind$Synth$one$($5293, _defs$9))((_new_defs$16 => {
                            var self = _new_defs$16;
                            switch (self._) {
                                case 'Maybe.some':
                                    var $5297 = self.value;
                                    var $5298 = Kind$Synth$fix$(_file$1, _code$2, _orig$3, _name$4, _term$5, _type$6, _isct$7, _arit$8, $5297, $5273, Bool$true);
                                    var $5296 = $5298;
                                    break;
                                case 'Maybe.none':
                                    var $5299 = Kind$Synth$fix$(_file$1, _code$2, _orig$3, _name$4, _term$5, _type$6, _isct$7, _arit$8, _defs$9, $5273, _fixd$11);
                                    var $5296 = $5299;
                                    break;
                            };
                            return $5296;
                        }));
                        var $5274 = $5294;
                        break;
                    case 'Kind.Error.type_mismatch':
                    case 'Kind.Error.show_goal':
                    case 'Kind.Error.indirect':
                    case 'Kind.Error.cant_infer':
                        var $5300 = Kind$Synth$fix$(_file$1, _code$2, _orig$3, _name$4, _term$5, _type$6, _isct$7, _arit$8, _defs$9, $5273, _fixd$11);
                        var $5274 = $5300;
                        break;
                };
                var $5271 = $5274;
                break;
            case 'List.nil':
                var self = _fixd$11;
                if (self) {
                    var _type$12 = Kind$Term$bind$(List$nil, (_x$12 => {
                        var $5303 = (_x$12 + '1');
                        return $5303;
                    }), _type$6);
                    var _term$13 = Kind$Term$bind$(List$nil, (_x$13 => {
                        var $5304 = (_x$13 + '0');
                        return $5304;
                    }), _term$5);
                    var _defs$14 = Kind$set$(_name$4, Kind$Def$new$(_file$1, _code$2, _orig$3, _name$4, _term$13, _type$12, _isct$7, _arit$8, Kind$Status$init), _defs$9);
                    var $5302 = IO$monad$((_m$bind$15 => _m$pure$16 => {
                        var $5305 = _m$pure$16;
                        return $5305;
                    }))(Maybe$some$(_defs$14));
                    var $5301 = $5302;
                } else {
                    var $5306 = IO$monad$((_m$bind$12 => _m$pure$13 => {
                        var $5307 = _m$pure$13;
                        return $5307;
                    }))(Maybe$none);
                    var $5301 = $5306;
                };
                var $5271 = $5301;
                break;
        };
        return $5271;
    };
    const Kind$Synth$fix = x0 => x1 => x2 => x3 => x4 => x5 => x6 => x7 => x8 => x9 => x10 => Kind$Synth$fix$(x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10);

    function Kind$Status$fail$(_errors$1) {
        var $5308 = ({
            _: 'Kind.Status.fail',
            'errors': _errors$1
        });
        return $5308;
    };
    const Kind$Status$fail = x0 => Kind$Status$fail$(x0);

    function Kind$Synth$one$(_name$1, _defs$2) {
        var self = Kind$get$(_name$1, _defs$2);
        switch (self._) {
            case 'Maybe.some':
                var $5310 = self.value;
                var self = $5310;
                switch (self._) {
                    case 'Kind.Def.new':
                        var $5312 = self.file;
                        var $5313 = self.code;
                        var $5314 = self.orig;
                        var $5315 = self.name;
                        var $5316 = self.term;
                        var $5317 = self.type;
                        var $5318 = self.isct;
                        var $5319 = self.arit;
                        var $5320 = self.stat;
                        var _file$13 = $5312;
                        var _code$14 = $5313;
                        var _orig$15 = $5314;
                        var _name$16 = $5315;
                        var _term$17 = $5316;
                        var _type$18 = $5317;
                        var _isct$19 = $5318;
                        var _arit$20 = $5319;
                        var _stat$21 = $5320;
                        var self = _stat$21;
                        switch (self._) {
                            case 'Kind.Status.init':
                                var _defs$22 = Kind$set$(_name$16, Kind$Def$new$(_file$13, _code$14, _orig$15, _name$16, _term$17, _type$18, _isct$19, _arit$20, Kind$Status$wait), _defs$2);
                                var self = Kind$Term$check$(_type$18, Maybe$some$(Kind$Term$typ), _defs$22, List$nil, Kind$MPath$i$(Kind$MPath$nil), Maybe$none);
                                switch (self._) {
                                    case 'Kind.Check.result':
                                        var $5323 = self.value;
                                        var $5324 = self.errors;
                                        var self = $5323;
                                        switch (self._) {
                                            case 'Maybe.none':
                                                var $5326 = Kind$Check$result$(Maybe$none, $5324);
                                                var $5325 = $5326;
                                                break;
                                            case 'Maybe.some':
                                                var self = Kind$Term$check$(_term$17, Maybe$some$(_type$18), _defs$22, List$nil, Kind$MPath$o$(Kind$MPath$nil), Maybe$none);
                                                switch (self._) {
                                                    case 'Kind.Check.result':
                                                        var $5328 = self.value;
                                                        var $5329 = self.errors;
                                                        var self = $5328;
                                                        switch (self._) {
                                                            case 'Maybe.none':
                                                                var $5331 = Kind$Check$result$(Maybe$none, $5329);
                                                                var $5330 = $5331;
                                                                break;
                                                            case 'Maybe.some':
                                                                var self = Kind$Check$result$(Maybe$some$(Unit$new), List$nil);
                                                                switch (self._) {
                                                                    case 'Kind.Check.result':
                                                                        var $5333 = self.value;
                                                                        var $5334 = self.errors;
                                                                        var $5335 = Kind$Check$result$($5333, List$concat$($5329, $5334));
                                                                        var $5332 = $5335;
                                                                        break;
                                                                };
                                                                var $5330 = $5332;
                                                                break;
                                                        };
                                                        var self = $5330;
                                                        break;
                                                };
                                                switch (self._) {
                                                    case 'Kind.Check.result':
                                                        var $5336 = self.value;
                                                        var $5337 = self.errors;
                                                        var $5338 = Kind$Check$result$($5336, List$concat$($5324, $5337));
                                                        var $5327 = $5338;
                                                        break;
                                                };
                                                var $5325 = $5327;
                                                break;
                                        };
                                        var _checked$23 = $5325;
                                        break;
                                };
                                var self = _checked$23;
                                switch (self._) {
                                    case 'Kind.Check.result':
                                        var $5339 = self.errors;
                                        var self = List$is_empty$($5339);
                                        if (self) {
                                            var _defs$26 = Kind$define$(_file$13, _code$14, _orig$15, _name$16, _term$17, _type$18, _isct$19, _arit$20, Bool$true, _defs$22);
                                            var $5341 = IO$monad$((_m$bind$27 => _m$pure$28 => {
                                                var $5342 = _m$pure$28;
                                                return $5342;
                                            }))(Maybe$some$(_defs$26));
                                            var $5340 = $5341;
                                        } else {
                                            var $5343 = IO$monad$((_m$bind$26 => _m$pure$27 => {
                                                var $5344 = _m$bind$26;
                                                return $5344;
                                            }))(Kind$Synth$fix$(_file$13, _code$14, _orig$15, _name$16, _term$17, _type$18, _isct$19, _arit$20, _defs$22, $5339, Bool$false))((_fixed$26 => {
                                                var self = _fixed$26;
                                                switch (self._) {
                                                    case 'Maybe.some':
                                                        var $5346 = self.value;
                                                        var $5347 = Kind$Synth$one$(_name$16, $5346);
                                                        var $5345 = $5347;
                                                        break;
                                                    case 'Maybe.none':
                                                        var _stat$27 = Kind$Status$fail$($5339);
                                                        var _defs$28 = Kind$set$(_name$16, Kind$Def$new$(_file$13, _code$14, _orig$15, _name$16, _term$17, _type$18, _isct$19, _arit$20, _stat$27), _defs$22);
                                                        var $5348 = IO$monad$((_m$bind$29 => _m$pure$30 => {
                                                            var $5349 = _m$pure$30;
                                                            return $5349;
                                                        }))(Maybe$some$(_defs$28));
                                                        var $5345 = $5348;
                                                        break;
                                                };
                                                return $5345;
                                            }));
                                            var $5340 = $5343;
                                        };
                                        var $5322 = $5340;
                                        break;
                                };
                                var $5321 = $5322;
                                break;
                            case 'Kind.Status.wait':
                            case 'Kind.Status.done':
                                var $5350 = IO$monad$((_m$bind$22 => _m$pure$23 => {
                                    var $5351 = _m$pure$23;
                                    return $5351;
                                }))(Maybe$some$(_defs$2));
                                var $5321 = $5350;
                                break;
                            case 'Kind.Status.fail':
                                var $5352 = IO$monad$((_m$bind$23 => _m$pure$24 => {
                                    var $5353 = _m$pure$24;
                                    return $5353;
                                }))(Maybe$some$(_defs$2));
                                var $5321 = $5352;
                                break;
                        };
                        var $5311 = $5321;
                        break;
                };
                var $5309 = $5311;
                break;
            case 'Maybe.none':
                var $5354 = IO$monad$((_m$bind$3 => _m$pure$4 => {
                    var $5355 = _m$bind$3;
                    return $5355;
                }))(Kind$Synth$load$(_name$1, _defs$2))((_loaded$3 => {
                    var self = _loaded$3;
                    switch (self._) {
                        case 'Maybe.some':
                            var $5357 = self.value;
                            var $5358 = Kind$Synth$one$(_name$1, $5357);
                            var $5356 = $5358;
                            break;
                        case 'Maybe.none':
                            var $5359 = IO$monad$((_m$bind$4 => _m$pure$5 => {
                                var $5360 = _m$pure$5;
                                return $5360;
                            }))(Maybe$none);
                            var $5356 = $5359;
                            break;
                    };
                    return $5356;
                }));
                var $5309 = $5354;
                break;
        };
        return $5309;
    };
    const Kind$Synth$one = x0 => x1 => Kind$Synth$one$(x0, x1);

    function Map$map$(_fn$3, _map$4) {
        var self = _map$4;
        switch (self._) {
            case 'Map.tie':
                var $5362 = self.val;
                var $5363 = self.lft;
                var $5364 = self.rgt;
                var self = $5362;
                switch (self._) {
                    case 'Maybe.some':
                        var $5366 = self.value;
                        var $5367 = Maybe$some$(_fn$3($5366));
                        var _val$8 = $5367;
                        break;
                    case 'Maybe.none':
                        var $5368 = Maybe$none;
                        var _val$8 = $5368;
                        break;
                };
                var _lft$9 = Map$map$(_fn$3, $5363);
                var _rgt$10 = Map$map$(_fn$3, $5364);
                var $5365 = Map$tie$(_val$8, _lft$9, _rgt$10);
                var $5361 = $5365;
                break;
            case 'Map.new':
                var $5369 = Map$new;
                var $5361 = $5369;
                break;
        };
        return $5361;
    };
    const Map$map = x0 => x1 => Map$map$(x0, x1);
    const Kind$Term$inline$names = (() => {
        var _inl$1 = List$cons$("Monad.pure", List$cons$("Monad.bind", List$cons$("Monad.new", List$cons$("Parser.monad", List$cons$("Parser.bind", List$cons$("Parser.pure", List$cons$("Kind.Check.pure", List$cons$("Kind.Check.bind", List$cons$("Kind.Check.monad", List$cons$("Kind.Check.value", List$cons$("Kind.Check.none", List$nil)))))))))));
        var _kvs$2 = List$mapped$(_inl$1, (_x$2 => {
            var $5371 = Pair$new$((kind_name_to_bits(_x$2)), Unit$new);
            return $5371;
        }));
        var $5370 = Map$from_list$(_kvs$2);
        return $5370;
    })();

    function Kind$Term$inline$reduce$(_term$1, _defs$2) {
        var self = _term$1;
        switch (self._) {
            case 'Kind.Term.ref':
                var $5373 = self.name;
                var _inli$4 = Set$has$((kind_name_to_bits($5373)), Kind$Term$inline$names);
                var self = _inli$4;
                if (self) {
                    var self = Kind$get$($5373, _defs$2);
                    switch (self._) {
                        case 'Maybe.some':
                            var $5376 = self.value;
                            var self = $5376;
                            switch (self._) {
                                case 'Kind.Def.new':
                                    var $5378 = self.term;
                                    var $5379 = Kind$Term$inline$reduce$($5378, _defs$2);
                                    var $5377 = $5379;
                                    break;
                            };
                            var $5375 = $5377;
                            break;
                        case 'Maybe.none':
                            var $5380 = Kind$Term$ref$($5373);
                            var $5375 = $5380;
                            break;
                    };
                    var $5374 = $5375;
                } else {
                    var $5381 = _term$1;
                    var $5374 = $5381;
                };
                var $5372 = $5374;
                break;
            case 'Kind.Term.app':
                var $5382 = self.func;
                var $5383 = self.argm;
                var _func$5 = Kind$Term$inline$reduce$($5382, _defs$2);
                var self = _func$5;
                switch (self._) {
                    case 'Kind.Term.lam':
                        var $5385 = self.body;
                        var $5386 = Kind$Term$inline$reduce$($5385($5383), _defs$2);
                        var $5384 = $5386;
                        break;
                    case 'Kind.Term.let':
                        var $5387 = self.name;
                        var $5388 = self.expr;
                        var $5389 = self.body;
                        var $5390 = Kind$Term$let$($5387, $5388, (_x$9 => {
                            var $5391 = Kind$Term$inline$reduce$(Kind$Term$app$($5389(_x$9), $5383), _defs$2);
                            return $5391;
                        }));
                        var $5384 = $5390;
                        break;
                    case 'Kind.Term.var':
                    case 'Kind.Term.ref':
                    case 'Kind.Term.typ':
                    case 'Kind.Term.all':
                    case 'Kind.Term.app':
                    case 'Kind.Term.def':
                    case 'Kind.Term.ann':
                    case 'Kind.Term.gol':
                    case 'Kind.Term.hol':
                    case 'Kind.Term.nat':
                    case 'Kind.Term.chr':
                    case 'Kind.Term.str':
                    case 'Kind.Term.cse':
                    case 'Kind.Term.ori':
                        var $5392 = _term$1;
                        var $5384 = $5392;
                        break;
                };
                var $5372 = $5384;
                break;
            case 'Kind.Term.ori':
                var $5393 = self.expr;
                var $5394 = Kind$Term$inline$reduce$($5393, _defs$2);
                var $5372 = $5394;
                break;
            case 'Kind.Term.var':
            case 'Kind.Term.typ':
            case 'Kind.Term.all':
            case 'Kind.Term.lam':
            case 'Kind.Term.let':
            case 'Kind.Term.def':
            case 'Kind.Term.ann':
            case 'Kind.Term.gol':
            case 'Kind.Term.hol':
            case 'Kind.Term.nat':
            case 'Kind.Term.chr':
            case 'Kind.Term.str':
            case 'Kind.Term.cse':
                var $5395 = _term$1;
                var $5372 = $5395;
                break;
        };
        return $5372;
    };
    const Kind$Term$inline$reduce = x0 => x1 => Kind$Term$inline$reduce$(x0, x1);

    function Kind$Term$inline$(_term$1, _defs$2) {
        var self = Kind$Term$inline$reduce$(_term$1, _defs$2);
        switch (self._) {
            case 'Kind.Term.var':
                var $5397 = self.name;
                var $5398 = self.indx;
                var $5399 = Kind$Term$var$($5397, $5398);
                var $5396 = $5399;
                break;
            case 'Kind.Term.ref':
                var $5400 = self.name;
                var $5401 = Kind$Term$ref$($5400);
                var $5396 = $5401;
                break;
            case 'Kind.Term.all':
                var $5402 = self.eras;
                var $5403 = self.self;
                var $5404 = self.name;
                var $5405 = self.xtyp;
                var $5406 = self.body;
                var $5407 = Kind$Term$all$($5402, $5403, $5404, Kind$Term$inline$($5405, _defs$2), (_s$8 => _x$9 => {
                    var $5408 = Kind$Term$inline$($5406(_s$8)(_x$9), _defs$2);
                    return $5408;
                }));
                var $5396 = $5407;
                break;
            case 'Kind.Term.lam':
                var $5409 = self.name;
                var $5410 = self.body;
                var $5411 = Kind$Term$lam$($5409, (_x$5 => {
                    var $5412 = Kind$Term$inline$($5410(_x$5), _defs$2);
                    return $5412;
                }));
                var $5396 = $5411;
                break;
            case 'Kind.Term.app':
                var $5413 = self.func;
                var $5414 = self.argm;
                var $5415 = Kind$Term$app$(Kind$Term$inline$($5413, _defs$2), Kind$Term$inline$($5414, _defs$2));
                var $5396 = $5415;
                break;
            case 'Kind.Term.let':
                var $5416 = self.name;
                var $5417 = self.expr;
                var $5418 = self.body;
                var $5419 = Kind$Term$let$($5416, Kind$Term$inline$($5417, _defs$2), (_x$6 => {
                    var $5420 = Kind$Term$inline$($5418(_x$6), _defs$2);
                    return $5420;
                }));
                var $5396 = $5419;
                break;
            case 'Kind.Term.def':
                var $5421 = self.name;
                var $5422 = self.expr;
                var $5423 = self.body;
                var $5424 = Kind$Term$def$($5421, Kind$Term$inline$($5422, _defs$2), (_x$6 => {
                    var $5425 = Kind$Term$inline$($5423(_x$6), _defs$2);
                    return $5425;
                }));
                var $5396 = $5424;
                break;
            case 'Kind.Term.ann':
                var $5426 = self.done;
                var $5427 = self.term;
                var $5428 = self.type;
                var $5429 = Kind$Term$ann$($5426, Kind$Term$inline$($5427, _defs$2), Kind$Term$inline$($5428, _defs$2));
                var $5396 = $5429;
                break;
            case 'Kind.Term.gol':
                var $5430 = self.name;
                var $5431 = self.dref;
                var $5432 = self.verb;
                var $5433 = Kind$Term$gol$($5430, $5431, $5432);
                var $5396 = $5433;
                break;
            case 'Kind.Term.hol':
                var $5434 = self.path;
                var $5435 = Kind$Term$hol$($5434);
                var $5396 = $5435;
                break;
            case 'Kind.Term.nat':
                var $5436 = self.natx;
                var $5437 = Kind$Term$nat$($5436);
                var $5396 = $5437;
                break;
            case 'Kind.Term.chr':
                var $5438 = self.chrx;
                var $5439 = Kind$Term$chr$($5438);
                var $5396 = $5439;
                break;
            case 'Kind.Term.str':
                var $5440 = self.strx;
                var $5441 = Kind$Term$str$($5440);
                var $5396 = $5441;
                break;
            case 'Kind.Term.ori':
                var $5442 = self.expr;
                var $5443 = Kind$Term$inline$($5442, _defs$2);
                var $5396 = $5443;
                break;
            case 'Kind.Term.typ':
                var $5444 = Kind$Term$typ;
                var $5396 = $5444;
                break;
            case 'Kind.Term.cse':
                var $5445 = _term$1;
                var $5396 = $5445;
                break;
        };
        return $5396;
    };
    const Kind$Term$inline = x0 => x1 => Kind$Term$inline$(x0, x1);

    function Map$values$go$(_xs$2, _list$3) {
        var self = _xs$2;
        switch (self._) {
            case 'Map.tie':
                var $5447 = self.val;
                var $5448 = self.lft;
                var $5449 = self.rgt;
                var self = $5447;
                switch (self._) {
                    case 'Maybe.some':
                        var $5451 = self.value;
                        var $5452 = List$cons$($5451, _list$3);
                        var _list0$7 = $5452;
                        break;
                    case 'Maybe.none':
                        var $5453 = _list$3;
                        var _list0$7 = $5453;
                        break;
                };
                var _list1$8 = Map$values$go$($5448, _list0$7);
                var _list2$9 = Map$values$go$($5449, _list1$8);
                var $5450 = _list2$9;
                var $5446 = $5450;
                break;
            case 'Map.new':
                var $5454 = _list$3;
                var $5446 = $5454;
                break;
        };
        return $5446;
    };
    const Map$values$go = x0 => x1 => Map$values$go$(x0, x1);

    function Map$values$(_xs$2) {
        var $5455 = Map$values$go$(_xs$2, List$nil);
        return $5455;
    };
    const Map$values = x0 => Map$values$(x0);

    function Kind$Core$var_name$(_indx$1, _name$2, _brui$3, _vars$4) {
        var Kind$Core$var_name$ = (_indx$1, _name$2, _brui$3, _vars$4) => ({
            ctr: 'TCO',
            arg: [_indx$1, _name$2, _brui$3, _vars$4]
        });
        var Kind$Core$var_name = _indx$1 => _name$2 => _brui$3 => _vars$4 => Kind$Core$var_name$(_indx$1, _name$2, _brui$3, _vars$4);
        var arg = [_indx$1, _name$2, _brui$3, _vars$4];
        while (true) {
            let [_indx$1, _name$2, _brui$3, _vars$4] = arg;
            var R = (() => {
                var self = _indx$1;
                if (self === 0n) {
                    var self = _brui$3;
                    if (self === 0n) {
                        var $5457 = _name$2;
                        var $5456 = $5457;
                    } else {
                        var $5458 = (self - 1n);
                        var $5459 = (_name$2 + ("^" + Nat$show$(_brui$3)));
                        var $5456 = $5459;
                    };
                    return $5456;
                } else {
                    var $5460 = (self - 1n);
                    var self = _vars$4;
                    switch (self._) {
                        case 'List.cons':
                            var $5462 = self.head;
                            var $5463 = self.tail;
                            var self = (_name$2 === $5462);
                            if (self) {
                                var $5465 = Nat$succ$(_brui$3);
                                var _brui$8 = $5465;
                            } else {
                                var $5466 = _brui$3;
                                var _brui$8 = $5466;
                            };
                            var $5464 = Kind$Core$var_name$($5460, _name$2, _brui$8, $5463);
                            var $5461 = $5464;
                            break;
                        case 'List.nil':
                            var $5467 = "unbound";
                            var $5461 = $5467;
                            break;
                    };
                    return $5461;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Kind$Core$var_name = x0 => x1 => x2 => x3 => Kind$Core$var_name$(x0, x1, x2, x3);

    function Kind$Name$show$(_name$1) {
        var $5468 = _name$1;
        return $5468;
    };
    const Kind$Name$show = x0 => Kind$Name$show$(x0);

    function Bits$to_nat$(_b$1) {
        var self = _b$1;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'o':
                var $5470 = self.slice(0, -1);
                var $5471 = (2n * Bits$to_nat$($5470));
                var $5469 = $5471;
                break;
            case 'i':
                var $5472 = self.slice(0, -1);
                var $5473 = Nat$succ$((2n * Bits$to_nat$($5472)));
                var $5469 = $5473;
                break;
            case 'e':
                var $5474 = 0n;
                var $5469 = $5474;
                break;
        };
        return $5469;
    };
    const Bits$to_nat = x0 => Bits$to_nat$(x0);

    function U16$show_hex$(_a$1) {
        var self = _a$1;
        switch ('u16') {
            case 'u16':
                var $5476 = u16_to_word(self);
                var $5477 = Nat$to_string_base$(16n, Bits$to_nat$(Word$to_bits$($5476)));
                var $5475 = $5477;
                break;
        };
        return $5475;
    };
    const U16$show_hex = x0 => U16$show_hex$(x0);

    function Kind$escape$char$(_chr$1) {
        var self = (_chr$1 === Kind$backslash);
        if (self) {
            var $5479 = String$cons$(Kind$backslash, String$cons$(_chr$1, String$nil));
            var $5478 = $5479;
        } else {
            var self = (_chr$1 === 34);
            if (self) {
                var $5481 = String$cons$(Kind$backslash, String$cons$(_chr$1, String$nil));
                var $5480 = $5481;
            } else {
                var self = (_chr$1 === 39);
                if (self) {
                    var $5483 = String$cons$(Kind$backslash, String$cons$(_chr$1, String$nil));
                    var $5482 = $5483;
                } else {
                    var self = U16$btw$(32, _chr$1, 126);
                    if (self) {
                        var $5485 = String$cons$(_chr$1, String$nil);
                        var $5484 = $5485;
                    } else {
                        var $5486 = String$flatten$(List$cons$(String$cons$(Kind$backslash, String$nil), List$cons$("u{", List$cons$(U16$show_hex$(_chr$1), List$cons$("}", List$cons$(String$nil, List$nil))))));
                        var $5484 = $5486;
                    };
                    var $5482 = $5484;
                };
                var $5480 = $5482;
            };
            var $5478 = $5480;
        };
        return $5478;
    };
    const Kind$escape$char = x0 => Kind$escape$char$(x0);

    function Kind$escape$go$(_str$1, _result$2) {
        var Kind$escape$go$ = (_str$1, _result$2) => ({
            ctr: 'TCO',
            arg: [_str$1, _result$2]
        });
        var Kind$escape$go = _str$1 => _result$2 => Kind$escape$go$(_str$1, _result$2);
        var arg = [_str$1, _result$2];
        while (true) {
            let [_str$1, _result$2] = arg;
            var R = (() => {
                var self = _str$1;
                if (self.length === 0) {
                    var $5487 = String$reverse$(_result$2);
                    return $5487;
                } else {
                    var $5488 = self.charCodeAt(0);
                    var $5489 = self.slice(1);
                    var $5490 = Kind$escape$go$($5489, (String$reverse$(Kind$escape$char$($5488)) + _result$2));
                    return $5490;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Kind$escape$go = x0 => x1 => Kind$escape$go$(x0, x1);

    function Kind$escape$(_str$1) {
        var $5491 = Kind$escape$go$(_str$1, "");
        return $5491;
    };
    const Kind$escape = x0 => Kind$escape$(x0);

    function Kind$Core$show$(_term$1, _indx$2, _vars$3) {
        var self = _term$1;
        switch (self._) {
            case 'Kind.Term.var':
                var $5493 = self.name;
                var $5494 = self.indx;
                var $5495 = Kind$Core$var_name$(Nat$pred$((_indx$2 - $5494 <= 0n ? 0n : _indx$2 - $5494)), $5493, 0n, _vars$3);
                var $5492 = $5495;
                break;
            case 'Kind.Term.ref':
                var $5496 = self.name;
                var $5497 = Kind$Name$show$($5496);
                var $5492 = $5497;
                break;
            case 'Kind.Term.all':
                var $5498 = self.eras;
                var $5499 = self.self;
                var $5500 = self.name;
                var $5501 = self.xtyp;
                var $5502 = self.body;
                var _eras$9 = $5498;
                var self = _eras$9;
                if (self) {
                    var $5504 = "%";
                    var _init$10 = $5504;
                } else {
                    var $5505 = "@";
                    var _init$10 = $5505;
                };
                var _self$11 = Kind$Name$show$($5499);
                var _name$12 = Kind$Name$show$($5500);
                var _xtyp$13 = Kind$Core$show$($5501, _indx$2, _vars$3);
                var _body$14 = Kind$Core$show$($5502(Kind$Term$var$($5499, _indx$2))(Kind$Term$var$($5500, Nat$succ$(_indx$2))), Nat$succ$(Nat$succ$(_indx$2)), List$cons$($5500, List$cons$($5499, _vars$3)));
                var $5503 = String$flatten$(List$cons$(_init$10, List$cons$(_self$11, List$cons$("(", List$cons$(_name$12, List$cons$(":", List$cons$(_xtyp$13, List$cons$(") ", List$cons$(_body$14, List$nil)))))))));
                var $5492 = $5503;
                break;
            case 'Kind.Term.lam':
                var $5506 = self.name;
                var $5507 = self.body;
                var _name$6 = Kind$Name$show$($5506);
                var _body$7 = Kind$Core$show$($5507(Kind$Term$var$($5506, _indx$2)), Nat$succ$(_indx$2), List$cons$($5506, _vars$3));
                var $5508 = String$flatten$(List$cons$("#", List$cons$(_name$6, List$cons$(" ", List$cons$(_body$7, List$nil)))));
                var $5492 = $5508;
                break;
            case 'Kind.Term.app':
                var $5509 = self.func;
                var $5510 = self.argm;
                var _func$6 = Kind$Core$show$($5509, _indx$2, _vars$3);
                var _argm$7 = Kind$Core$show$($5510, _indx$2, _vars$3);
                var $5511 = String$flatten$(List$cons$("(", List$cons$(_func$6, List$cons$(" ", List$cons$(_argm$7, List$cons$(")", List$nil))))));
                var $5492 = $5511;
                break;
            case 'Kind.Term.let':
                var $5512 = self.name;
                var $5513 = self.expr;
                var $5514 = self.body;
                var _name$7 = Kind$Name$show$($5512);
                var _expr$8 = Kind$Core$show$($5513, _indx$2, _vars$3);
                var _body$9 = Kind$Core$show$($5514(Kind$Term$var$($5512, _indx$2)), Nat$succ$(_indx$2), List$cons$($5512, _vars$3));
                var $5515 = String$flatten$(List$cons$("!", List$cons$(_name$7, List$cons$(" = ", List$cons$(_expr$8, List$cons$("; ", List$cons$(_body$9, List$nil)))))));
                var $5492 = $5515;
                break;
            case 'Kind.Term.def':
                var $5516 = self.name;
                var $5517 = self.expr;
                var $5518 = self.body;
                var _name$7 = Kind$Name$show$($5516);
                var _expr$8 = Kind$Core$show$($5517, _indx$2, _vars$3);
                var _body$9 = Kind$Core$show$($5518(Kind$Term$var$($5516, _indx$2)), Nat$succ$(_indx$2), List$cons$($5516, _vars$3));
                var $5519 = String$flatten$(List$cons$("$", List$cons$(_name$7, List$cons$(" = ", List$cons$(_expr$8, List$cons$("; ", List$cons$(_body$9, List$nil)))))));
                var $5492 = $5519;
                break;
            case 'Kind.Term.ann':
                var $5520 = self.term;
                var $5521 = self.type;
                var _term$7 = Kind$Core$show$($5520, _indx$2, _vars$3);
                var _type$8 = Kind$Core$show$($5521, _indx$2, _vars$3);
                var $5522 = String$flatten$(List$cons$("{", List$cons$(_term$7, List$cons$(":", List$cons$(_type$8, List$cons$("}", List$nil))))));
                var $5492 = $5522;
                break;
            case 'Kind.Term.nat':
                var $5523 = self.natx;
                var $5524 = String$flatten$(List$cons$("+", List$cons$(Nat$show$($5523), List$nil)));
                var $5492 = $5524;
                break;
            case 'Kind.Term.chr':
                var $5525 = self.chrx;
                var $5526 = String$flatten$(List$cons$("\'", List$cons$(Kind$escape$char$($5525), List$cons$("\'", List$nil))));
                var $5492 = $5526;
                break;
            case 'Kind.Term.str':
                var $5527 = self.strx;
                var $5528 = String$flatten$(List$cons$("\"", List$cons$(Kind$escape$($5527), List$cons$("\"", List$nil))));
                var $5492 = $5528;
                break;
            case 'Kind.Term.ori':
                var $5529 = self.expr;
                var $5530 = Kind$Core$show$($5529, _indx$2, _vars$3);
                var $5492 = $5530;
                break;
            case 'Kind.Term.typ':
                var $5531 = "*";
                var $5492 = $5531;
                break;
            case 'Kind.Term.gol':
                var $5532 = "<GOL>";
                var $5492 = $5532;
                break;
            case 'Kind.Term.hol':
                var $5533 = "<HOL>";
                var $5492 = $5533;
                break;
            case 'Kind.Term.cse':
                var $5534 = "<CSE>";
                var $5492 = $5534;
                break;
        };
        return $5492;
    };
    const Kind$Core$show = x0 => x1 => x2 => Kind$Core$show$(x0, x1, x2);

    function Kind$Defs$core$(_defs$1) {
        var _result$2 = "";
        var _result$3 = (() => {
            var $5537 = _result$2;
            var $5538 = Map$values$(_defs$1);
            let _result$4 = $5537;
            let _defn$3;
            while ($5538._ === 'List.cons') {
                _defn$3 = $5538.head;
                var self = _defn$3;
                switch (self._) {
                    case 'Kind.Def.new':
                        var $5539 = self.name;
                        var $5540 = self.term;
                        var $5541 = self.type;
                        var $5542 = self.stat;
                        var self = $5542;
                        switch (self._) {
                            case 'Kind.Status.init':
                            case 'Kind.Status.wait':
                            case 'Kind.Status.fail':
                                var $5544 = _result$4;
                                var $5543 = $5544;
                                break;
                            case 'Kind.Status.done':
                                var _name$14 = $5539;
                                var _term$15 = Kind$Core$show$($5540, 0n, List$nil);
                                var _type$16 = Kind$Core$show$($5541, 0n, List$nil);
                                var $5545 = String$flatten$(List$cons$(_result$4, List$cons$(_name$14, List$cons$(" : ", List$cons$(_type$16, List$cons$(" = ", List$cons$(_term$15, List$cons$(";\u{a}", List$nil))))))));
                                var $5543 = $5545;
                                break;
                        };
                        var $5537 = $5543;
                        break;
                };
                _result$4 = $5537;
                $5538 = $5538.tail;
            }
            return _result$4;
        })();
        var $5535 = _result$3;
        return $5535;
    };
    const Kind$Defs$core = x0 => Kind$Defs$core$(x0);

    function Kind$to_core$io$one$(_name$1) {
        var $5546 = IO$monad$((_m$bind$2 => _m$pure$3 => {
            var $5547 = _m$bind$2;
            return $5547;
        }))(Kind$Synth$one$(_name$1, Map$new))((_new_defs$2 => {
            var self = _new_defs$2;
            switch (self._) {
                case 'Maybe.some':
                    var $5549 = self.value;
                    var $5550 = $5549;
                    var _defs$3 = $5550;
                    break;
                case 'Maybe.none':
                    var $5551 = Map$new;
                    var _defs$3 = $5551;
                    break;
            };
            var _defs$4 = Map$map$((_defn$4 => {
                var self = _defn$4;
                switch (self._) {
                    case 'Kind.Def.new':
                        var $5553 = self.file;
                        var $5554 = self.code;
                        var $5555 = self.orig;
                        var $5556 = self.name;
                        var $5557 = self.term;
                        var $5558 = self.type;
                        var $5559 = self.isct;
                        var $5560 = self.arit;
                        var $5561 = self.stat;
                        var _term$14 = Kind$Term$inline$($5557, _defs$3);
                        var _type$15 = Kind$Term$inline$($5558, _defs$3);
                        var $5562 = Kind$Def$new$($5553, $5554, $5555, $5556, _term$14, _type$15, $5559, $5560, $5561);
                        var $5552 = $5562;
                        break;
                };
                return $5552;
            }), _defs$3);
            var $5548 = IO$monad$((_m$bind$5 => _m$pure$6 => {
                var $5563 = _m$pure$6;
                return $5563;
            }))(Kind$Defs$core$(_defs$4));
            return $5548;
        }));
        return $5546;
    };
    const Kind$to_core$io$one = x0 => Kind$to_core$io$one$(x0);

    function IO$put_string$(_text$1) {
        var $5564 = IO$ask$("put_string", _text$1, (_skip$2 => {
            var $5565 = IO$end$(Unit$new);
            return $5565;
        }));
        return $5564;
    };
    const IO$put_string = x0 => IO$put_string$(x0);

    function IO$print$(_text$1) {
        var $5566 = IO$put_string$((_text$1 + "\u{a}"));
        return $5566;
    };
    const IO$print = x0 => IO$print$(x0);

    function Maybe$bind$(_m$3, _f$4) {
        var self = _m$3;
        switch (self._) {
            case 'Maybe.some':
                var $5568 = self.value;
                var $5569 = _f$4($5568);
                var $5567 = $5569;
                break;
            case 'Maybe.none':
                var $5570 = Maybe$none;
                var $5567 = $5570;
                break;
        };
        return $5567;
    };
    const Maybe$bind = x0 => x1 => Maybe$bind$(x0, x1);

    function Maybe$monad$(_new$2) {
        var $5571 = _new$2(Maybe$bind)(Maybe$some);
        return $5571;
    };
    const Maybe$monad = x0 => Maybe$monad$(x0);

    function Kind$Term$show$as_nat$go$(_term$1) {
        var self = _term$1;
        switch (self._) {
            case 'Kind.Term.ref':
                var $5573 = self.name;
                var self = ($5573 === "Nat.zero");
                if (self) {
                    var $5575 = Maybe$some$(0n);
                    var $5574 = $5575;
                } else {
                    var $5576 = Maybe$none;
                    var $5574 = $5576;
                };
                var $5572 = $5574;
                break;
            case 'Kind.Term.app':
                var $5577 = self.func;
                var $5578 = self.argm;
                var self = $5577;
                switch (self._) {
                    case 'Kind.Term.ref':
                        var $5580 = self.name;
                        var self = ($5580 === "Nat.succ");
                        if (self) {
                            var $5582 = Maybe$monad$((_m$bind$5 => _m$pure$6 => {
                                var $5583 = _m$bind$5;
                                return $5583;
                            }))(Kind$Term$show$as_nat$go$($5578))((_pred$5 => {
                                var $5584 = Maybe$monad$((_m$bind$6 => _m$pure$7 => {
                                    var $5585 = _m$pure$7;
                                    return $5585;
                                }))(Nat$succ$(_pred$5));
                                return $5584;
                            }));
                            var $5581 = $5582;
                        } else {
                            var $5586 = Maybe$none;
                            var $5581 = $5586;
                        };
                        var $5579 = $5581;
                        break;
                    case 'Kind.Term.var':
                    case 'Kind.Term.typ':
                    case 'Kind.Term.all':
                    case 'Kind.Term.lam':
                    case 'Kind.Term.app':
                    case 'Kind.Term.let':
                    case 'Kind.Term.def':
                    case 'Kind.Term.ann':
                    case 'Kind.Term.gol':
                    case 'Kind.Term.hol':
                    case 'Kind.Term.nat':
                    case 'Kind.Term.chr':
                    case 'Kind.Term.str':
                    case 'Kind.Term.cse':
                    case 'Kind.Term.ori':
                        var $5587 = Maybe$none;
                        var $5579 = $5587;
                        break;
                };
                var $5572 = $5579;
                break;
            case 'Kind.Term.var':
            case 'Kind.Term.typ':
            case 'Kind.Term.all':
            case 'Kind.Term.lam':
            case 'Kind.Term.let':
            case 'Kind.Term.def':
            case 'Kind.Term.ann':
            case 'Kind.Term.gol':
            case 'Kind.Term.hol':
            case 'Kind.Term.nat':
            case 'Kind.Term.chr':
            case 'Kind.Term.str':
            case 'Kind.Term.cse':
            case 'Kind.Term.ori':
                var $5588 = Maybe$none;
                var $5572 = $5588;
                break;
        };
        return $5572;
    };
    const Kind$Term$show$as_nat$go = x0 => Kind$Term$show$as_nat$go$(x0);

    function Kind$Term$show$as_nat$(_term$1) {
        var $5589 = Maybe$mapped$(Kind$Term$show$as_nat$go$(_term$1), Nat$show);
        return $5589;
    };
    const Kind$Term$show$as_nat = x0 => Kind$Term$show$as_nat$(x0);

    function Kind$Term$show$is_ref$(_term$1, _name$2) {
        var self = _term$1;
        switch (self._) {
            case 'Kind.Term.ref':
                var $5591 = self.name;
                var $5592 = (_name$2 === $5591);
                var $5590 = $5592;
                break;
            case 'Kind.Term.var':
            case 'Kind.Term.typ':
            case 'Kind.Term.all':
            case 'Kind.Term.lam':
            case 'Kind.Term.app':
            case 'Kind.Term.let':
            case 'Kind.Term.def':
            case 'Kind.Term.ann':
            case 'Kind.Term.gol':
            case 'Kind.Term.hol':
            case 'Kind.Term.nat':
            case 'Kind.Term.chr':
            case 'Kind.Term.str':
            case 'Kind.Term.cse':
            case 'Kind.Term.ori':
                var $5593 = Bool$false;
                var $5590 = $5593;
                break;
        };
        return $5590;
    };
    const Kind$Term$show$is_ref = x0 => x1 => Kind$Term$show$is_ref$(x0, x1);

    function Kind$Term$show$app$done$(_term$1, _path$2, _args$3) {
        var _arity$4 = (list_length(_args$3));
        var self = (Kind$Term$show$is_ref$(_term$1, "Equal") && (_arity$4 === 3n));
        if (self) {
            var _func$5 = Kind$Term$show$go$(_term$1, _path$2);
            var _eq_lft$6 = Maybe$default$("?", List$at$(1n, _args$3));
            var _eq_rgt$7 = Maybe$default$("?", List$at$(2n, _args$3));
            var $5595 = String$flatten$(List$cons$(_eq_lft$6, List$cons$(" == ", List$cons$(_eq_rgt$7, List$nil))));
            var $5594 = $5595;
        } else {
            var _func$5 = Kind$Term$show$go$(_term$1, _path$2);
            var self = _func$5;
            if (self.length === 0) {
                var $5597 = Bool$false;
                var _wrap$6 = $5597;
            } else {
                var $5598 = self.charCodeAt(0);
                var $5599 = self.slice(1);
                var $5600 = ($5598 === 40);
                var _wrap$6 = $5600;
            };
            var _args$7 = String$join$(",", _args$3);
            var self = _wrap$6;
            if (self) {
                var $5601 = String$flatten$(List$cons$("(", List$cons$(_func$5, List$cons$(")", List$nil))));
                var _func$8 = $5601;
            } else {
                var $5602 = _func$5;
                var _func$8 = $5602;
            };
            var $5596 = String$flatten$(List$cons$(_func$8, List$cons$("(", List$cons$(_args$7, List$cons$(")", List$nil)))));
            var $5594 = $5596;
        };
        return $5594;
    };
    const Kind$Term$show$app$done = x0 => x1 => x2 => Kind$Term$show$app$done$(x0, x1, x2);

    function Kind$Term$show$app$(_term$1, _path$2, _args$3) {
        var Kind$Term$show$app$ = (_term$1, _path$2, _args$3) => ({
            ctr: 'TCO',
            arg: [_term$1, _path$2, _args$3]
        });
        var Kind$Term$show$app = _term$1 => _path$2 => _args$3 => Kind$Term$show$app$(_term$1, _path$2, _args$3);
        var arg = [_term$1, _path$2, _args$3];
        while (true) {
            let [_term$1, _path$2, _args$3] = arg;
            var R = (() => {
                var self = _term$1;
                switch (self._) {
                    case 'Kind.Term.app':
                        var $5603 = self.func;
                        var $5604 = self.argm;
                        var $5605 = Kind$Term$show$app$($5603, Kind$MPath$o$(_path$2), List$cons$(Kind$Term$show$go$($5604, Kind$MPath$i$(_path$2)), _args$3));
                        return $5605;
                    case 'Kind.Term.ori':
                        var $5606 = self.expr;
                        var $5607 = Kind$Term$show$app$($5606, _path$2, _args$3);
                        return $5607;
                    case 'Kind.Term.var':
                    case 'Kind.Term.ref':
                    case 'Kind.Term.typ':
                    case 'Kind.Term.all':
                    case 'Kind.Term.lam':
                    case 'Kind.Term.let':
                    case 'Kind.Term.def':
                    case 'Kind.Term.ann':
                    case 'Kind.Term.gol':
                    case 'Kind.Term.hol':
                    case 'Kind.Term.nat':
                    case 'Kind.Term.chr':
                    case 'Kind.Term.str':
                    case 'Kind.Term.cse':
                        var $5608 = Kind$Term$show$app$done$(_term$1, _path$2, _args$3);
                        return $5608;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Kind$Term$show$app = x0 => x1 => x2 => Kind$Term$show$app$(x0, x1, x2);

    function Map$to_list$go$(_xs$2, _key$3, _list$4) {
        var self = _xs$2;
        switch (self._) {
            case 'Map.tie':
                var $5610 = self.val;
                var $5611 = self.lft;
                var $5612 = self.rgt;
                var self = $5610;
                switch (self._) {
                    case 'Maybe.some':
                        var $5614 = self.value;
                        var $5615 = List$cons$(Pair$new$(Bits$reverse$(_key$3), $5614), _list$4);
                        var _list0$8 = $5615;
                        break;
                    case 'Maybe.none':
                        var $5616 = _list$4;
                        var _list0$8 = $5616;
                        break;
                };
                var _list1$9 = Map$to_list$go$($5611, (_key$3 + '0'), _list0$8);
                var _list2$10 = Map$to_list$go$($5612, (_key$3 + '1'), _list1$9);
                var $5613 = _list2$10;
                var $5609 = $5613;
                break;
            case 'Map.new':
                var $5617 = _list$4;
                var $5609 = $5617;
                break;
        };
        return $5609;
    };
    const Map$to_list$go = x0 => x1 => x2 => Map$to_list$go$(x0, x1, x2);

    function Map$to_list$(_xs$2) {
        var $5618 = List$reverse$(Map$to_list$go$(_xs$2, Bits$e, List$nil));
        return $5618;
    };
    const Map$to_list = x0 => Map$to_list$(x0);

    function Bits$chunks_of$go$(_len$1, _bits$2, _need$3, _chunk$4) {
        var self = _bits$2;
        switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
            case 'o':
                var $5620 = self.slice(0, -1);
                var self = _need$3;
                if (self === 0n) {
                    var _head$6 = Bits$reverse$(_chunk$4);
                    var _tail$7 = Bits$chunks_of$go$(_len$1, _bits$2, _len$1, Bits$e);
                    var $5622 = List$cons$(_head$6, _tail$7);
                    var $5621 = $5622;
                } else {
                    var $5623 = (self - 1n);
                    var _chunk$7 = (_chunk$4 + '0');
                    var $5624 = Bits$chunks_of$go$(_len$1, $5620, $5623, _chunk$7);
                    var $5621 = $5624;
                };
                var $5619 = $5621;
                break;
            case 'i':
                var $5625 = self.slice(0, -1);
                var self = _need$3;
                if (self === 0n) {
                    var _head$6 = Bits$reverse$(_chunk$4);
                    var _tail$7 = Bits$chunks_of$go$(_len$1, _bits$2, _len$1, Bits$e);
                    var $5627 = List$cons$(_head$6, _tail$7);
                    var $5626 = $5627;
                } else {
                    var $5628 = (self - 1n);
                    var _chunk$7 = (_chunk$4 + '1');
                    var $5629 = Bits$chunks_of$go$(_len$1, $5625, $5628, _chunk$7);
                    var $5626 = $5629;
                };
                var $5619 = $5626;
                break;
            case 'e':
                var $5630 = List$cons$(Bits$reverse$(_chunk$4), List$nil);
                var $5619 = $5630;
                break;
        };
        return $5619;
    };
    const Bits$chunks_of$go = x0 => x1 => x2 => x3 => Bits$chunks_of$go$(x0, x1, x2, x3);

    function Bits$chunks_of$(_len$1, _bits$2) {
        var $5631 = Bits$chunks_of$go$(_len$1, _bits$2, _len$1, Bits$e);
        return $5631;
    };
    const Bits$chunks_of = x0 => x1 => Bits$chunks_of$(x0, x1);

    function Word$from_bits$(_size$1, _bits$2) {
        var self = _size$1;
        if (self === 0n) {
            var $5633 = Word$e;
            var $5632 = $5633;
        } else {
            var $5634 = (self - 1n);
            var self = _bits$2;
            switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                case 'o':
                    var $5636 = self.slice(0, -1);
                    var $5637 = Word$o$(Word$from_bits$($5634, $5636));
                    var $5635 = $5637;
                    break;
                case 'i':
                    var $5638 = self.slice(0, -1);
                    var $5639 = Word$i$(Word$from_bits$($5634, $5638));
                    var $5635 = $5639;
                    break;
                case 'e':
                    var $5640 = Word$o$(Word$from_bits$($5634, Bits$e));
                    var $5635 = $5640;
                    break;
            };
            var $5632 = $5635;
        };
        return $5632;
    };
    const Word$from_bits = x0 => x1 => Word$from_bits$(x0, x1);

    function Kind$Name$from_bits$(_bits$1) {
        var _list$2 = Bits$chunks_of$(6n, _bits$1);
        var _name$3 = List$fold$(_list$2, String$nil, (_bts$3 => _name$4 => {
            var _u16$5 = U16$new$(Word$from_bits$(16n, Bits$reverse$(_bts$3)));
            var self = U16$btw$(0, _u16$5, 25);
            if (self) {
                var $5643 = ((_u16$5 + 65) & 0xFFFF);
                var _chr$6 = $5643;
            } else {
                var self = U16$btw$(26, _u16$5, 51);
                if (self) {
                    var $5645 = ((_u16$5 + 71) & 0xFFFF);
                    var $5644 = $5645;
                } else {
                    var self = U16$btw$(52, _u16$5, 61);
                    if (self) {
                        var $5647 = (Math.max(_u16$5 - 4, 0));
                        var $5646 = $5647;
                    } else {
                        var self = (62 === _u16$5);
                        if (self) {
                            var $5649 = 46;
                            var $5648 = $5649;
                        } else {
                            var $5650 = 95;
                            var $5648 = $5650;
                        };
                        var $5646 = $5648;
                    };
                    var $5644 = $5646;
                };
                var _chr$6 = $5644;
            };
            var $5642 = String$cons$(_chr$6, _name$4);
            return $5642;
        }));
        var $5641 = _name$3;
        return $5641;
    };
    const Kind$Name$from_bits = x0 => Kind$Name$from_bits$(x0);

    function Kind$Term$show$go$(_term$1, _path$2) {
        var self = Kind$Term$show$as_nat$(_term$1);
        switch (self._) {
            case 'Maybe.some':
                var $5652 = self.value;
                var $5653 = $5652;
                var $5651 = $5653;
                break;
            case 'Maybe.none':
                var self = _term$1;
                switch (self._) {
                    case 'Kind.Term.var':
                        var $5655 = self.name;
                        var $5656 = Kind$Name$show$($5655);
                        var $5654 = $5656;
                        break;
                    case 'Kind.Term.ref':
                        var $5657 = self.name;
                        var _name$4 = Kind$Name$show$($5657);
                        var self = _path$2;
                        switch (self._) {
                            case 'Maybe.some':
                                var $5659 = self.value;
                                var _path_val$6 = ((Bits$e + '1') + Kind$Path$to_bits$($5659));
                                var _path_str$7 = Nat$show$(Bits$to_nat$(_path_val$6));
                                var $5660 = String$flatten$(List$cons$(_name$4, List$cons$(Kind$color$("2", ("-" + _path_str$7)), List$nil)));
                                var $5658 = $5660;
                                break;
                            case 'Maybe.none':
                                var $5661 = _name$4;
                                var $5658 = $5661;
                                break;
                        };
                        var $5654 = $5658;
                        break;
                    case 'Kind.Term.all':
                        var $5662 = self.eras;
                        var $5663 = self.self;
                        var $5664 = self.name;
                        var $5665 = self.xtyp;
                        var $5666 = self.body;
                        var _eras$8 = $5662;
                        var _self$9 = Kind$Name$show$($5663);
                        var _name$10 = Kind$Name$show$($5664);
                        var _type$11 = Kind$Term$show$go$($5665, Kind$MPath$o$(_path$2));
                        var self = _eras$8;
                        if (self) {
                            var $5668 = "<";
                            var _open$12 = $5668;
                        } else {
                            var $5669 = "(";
                            var _open$12 = $5669;
                        };
                        var self = _eras$8;
                        if (self) {
                            var $5670 = ">";
                            var _clos$13 = $5670;
                        } else {
                            var $5671 = ")";
                            var _clos$13 = $5671;
                        };
                        var _body$14 = Kind$Term$show$go$($5666(Kind$Term$var$($5663, 0n))(Kind$Term$var$($5664, 0n)), Kind$MPath$i$(_path$2));
                        var $5667 = String$flatten$(List$cons$(_self$9, List$cons$(_open$12, List$cons$(_name$10, List$cons$(":", List$cons$(_type$11, List$cons$(_clos$13, List$cons$(" ", List$cons$(_body$14, List$nil)))))))));
                        var $5654 = $5667;
                        break;
                    case 'Kind.Term.lam':
                        var $5672 = self.name;
                        var $5673 = self.body;
                        var _name$5 = Kind$Name$show$($5672);
                        var _body$6 = Kind$Term$show$go$($5673(Kind$Term$var$($5672, 0n)), Kind$MPath$o$(_path$2));
                        var $5674 = String$flatten$(List$cons$("(", List$cons$(_name$5, List$cons$(") ", List$cons$(_body$6, List$nil)))));
                        var $5654 = $5674;
                        break;
                    case 'Kind.Term.let':
                        var $5675 = self.name;
                        var $5676 = self.expr;
                        var $5677 = self.body;
                        var _name$6 = Kind$Name$show$($5675);
                        var _expr$7 = Kind$Term$show$go$($5676, Kind$MPath$o$(_path$2));
                        var _body$8 = Kind$Term$show$go$($5677(Kind$Term$var$($5675, 0n)), Kind$MPath$i$(_path$2));
                        var $5678 = String$flatten$(List$cons$("let ", List$cons$(_name$6, List$cons$(" = ", List$cons$(_expr$7, List$cons$("; ", List$cons$(_body$8, List$nil)))))));
                        var $5654 = $5678;
                        break;
                    case 'Kind.Term.def':
                        var $5679 = self.name;
                        var $5680 = self.expr;
                        var $5681 = self.body;
                        var _name$6 = Kind$Name$show$($5679);
                        var _expr$7 = Kind$Term$show$go$($5680, Kind$MPath$o$(_path$2));
                        var _body$8 = Kind$Term$show$go$($5681(Kind$Term$var$($5679, 0n)), Kind$MPath$i$(_path$2));
                        var $5682 = String$flatten$(List$cons$("def ", List$cons$(_name$6, List$cons$(" = ", List$cons$(_expr$7, List$cons$("; ", List$cons$(_body$8, List$nil)))))));
                        var $5654 = $5682;
                        break;
                    case 'Kind.Term.ann':
                        var $5683 = self.term;
                        var $5684 = self.type;
                        var _term$6 = Kind$Term$show$go$($5683, Kind$MPath$o$(_path$2));
                        var _type$7 = Kind$Term$show$go$($5684, Kind$MPath$i$(_path$2));
                        var $5685 = String$flatten$(List$cons$(_term$6, List$cons$("::", List$cons$(_type$7, List$nil))));
                        var $5654 = $5685;
                        break;
                    case 'Kind.Term.gol':
                        var $5686 = self.name;
                        var _name$6 = Kind$Name$show$($5686);
                        var $5687 = String$flatten$(List$cons$("?", List$cons$(_name$6, List$nil)));
                        var $5654 = $5687;
                        break;
                    case 'Kind.Term.nat':
                        var $5688 = self.natx;
                        var $5689 = String$flatten$(List$cons$(Nat$show$($5688), List$nil));
                        var $5654 = $5689;
                        break;
                    case 'Kind.Term.chr':
                        var $5690 = self.chrx;
                        var $5691 = String$flatten$(List$cons$("\'", List$cons$(Kind$escape$char$($5690), List$cons$("\'", List$nil))));
                        var $5654 = $5691;
                        break;
                    case 'Kind.Term.str':
                        var $5692 = self.strx;
                        var $5693 = String$flatten$(List$cons$("\"", List$cons$(Kind$escape$($5692), List$cons$("\"", List$nil))));
                        var $5654 = $5693;
                        break;
                    case 'Kind.Term.cse':
                        var $5694 = self.expr;
                        var $5695 = self.name;
                        var $5696 = self.with;
                        var $5697 = self.cses;
                        var $5698 = self.moti;
                        var _expr$9 = Kind$Term$show$go$($5694, Kind$MPath$o$(_path$2));
                        var _name$10 = Kind$Name$show$($5695);
                        var _wyth$11 = String$join$("", List$mapped$($5696, (_defn$11 => {
                            var self = _defn$11;
                            switch (self._) {
                                case 'Kind.Def.new':
                                    var $5701 = self.name;
                                    var $5702 = self.term;
                                    var $5703 = self.type;
                                    var _name$21 = Kind$Name$show$($5701);
                                    var _type$22 = Kind$Term$show$go$($5703, Maybe$none);
                                    var _term$23 = Kind$Term$show$go$($5702, Maybe$none);
                                    var $5704 = String$flatten$(List$cons$(_name$21, List$cons$(": ", List$cons$(_type$22, List$cons$(" = ", List$cons$(_term$23, List$cons$(";", List$nil)))))));
                                    var $5700 = $5704;
                                    break;
                            };
                            return $5700;
                        })));
                        var _cses$12 = Map$to_list$($5697);
                        var _cses$13 = String$join$("", List$mapped$(_cses$12, (_x$13 => {
                            var _name$14 = Kind$Name$from_bits$(Pair$fst$(_x$13));
                            var _term$15 = Kind$Term$show$go$(Pair$snd$(_x$13), Maybe$none);
                            var $5705 = String$flatten$(List$cons$(_name$14, List$cons$(": ", List$cons$(_term$15, List$cons$("; ", List$nil)))));
                            return $5705;
                        })));
                        var self = $5698;
                        switch (self._) {
                            case 'Maybe.some':
                                var $5706 = self.value;
                                var $5707 = String$flatten$(List$cons$(": ", List$cons$(Kind$Term$show$go$($5706, Maybe$none), List$nil)));
                                var _moti$14 = $5707;
                                break;
                            case 'Maybe.none':
                                var $5708 = "";
                                var _moti$14 = $5708;
                                break;
                        };
                        var $5699 = String$flatten$(List$cons$("case ", List$cons$(_expr$9, List$cons$(" as ", List$cons$(_name$10, List$cons$(_wyth$11, List$cons$(" { ", List$cons$(_cses$13, List$cons$("}", List$cons$(_moti$14, List$nil))))))))));
                        var $5654 = $5699;
                        break;
                    case 'Kind.Term.ori':
                        var $5709 = self.expr;
                        var $5710 = Kind$Term$show$go$($5709, _path$2);
                        var $5654 = $5710;
                        break;
                    case 'Kind.Term.typ':
                        var $5711 = "Type";
                        var $5654 = $5711;
                        break;
                    case 'Kind.Term.app':
                        var $5712 = Kind$Term$show$app$(_term$1, _path$2, List$nil);
                        var $5654 = $5712;
                        break;
                    case 'Kind.Term.hol':
                        var $5713 = "_";
                        var $5654 = $5713;
                        break;
                };
                var $5651 = $5654;
                break;
        };
        return $5651;
    };
    const Kind$Term$show$go = x0 => x1 => Kind$Term$show$go$(x0, x1);

    function Kind$Term$show$(_term$1) {
        var $5714 = Kind$Term$show$go$(_term$1, Maybe$none);
        return $5714;
    };
    const Kind$Term$show = x0 => Kind$Term$show$(x0);

    function Kind$Defs$report$types$(_defs$1, _names$2) {
        var _types$3 = "";
        var _types$4 = (() => {
            var $5717 = _types$3;
            var $5718 = _names$2;
            let _types$5 = $5717;
            let _name$4;
            while ($5718._ === 'List.cons') {
                _name$4 = $5718.head;
                var self = Kind$get$(_name$4, _defs$1);
                switch (self._) {
                    case 'Maybe.some':
                        var $5719 = self.value;
                        var self = $5719;
                        switch (self._) {
                            case 'Kind.Def.new':
                                var $5721 = self.type;
                                var $5722 = (_types$5 + (_name$4 + (": " + (Kind$Term$show$($5721) + "\u{a}"))));
                                var $5720 = $5722;
                                break;
                        };
                        var $5717 = $5720;
                        break;
                    case 'Maybe.none':
                        var $5723 = _types$5;
                        var $5717 = $5723;
                        break;
                };
                _types$5 = $5717;
                $5718 = $5718.tail;
            }
            return _types$5;
        })();
        var $5715 = _types$4;
        return $5715;
    };
    const Kind$Defs$report$types = x0 => x1 => Kind$Defs$report$types$(x0, x1);

    function Map$keys$go$(_xs$2, _key$3, _list$4) {
        var self = _xs$2;
        switch (self._) {
            case 'Map.tie':
                var $5725 = self.val;
                var $5726 = self.lft;
                var $5727 = self.rgt;
                var self = $5725;
                switch (self._) {
                    case 'Maybe.none':
                        var $5729 = _list$4;
                        var _list0$8 = $5729;
                        break;
                    case 'Maybe.some':
                        var $5730 = List$cons$(Bits$reverse$(_key$3), _list$4);
                        var _list0$8 = $5730;
                        break;
                };
                var _list1$9 = Map$keys$go$($5726, (_key$3 + '0'), _list0$8);
                var _list2$10 = Map$keys$go$($5727, (_key$3 + '1'), _list1$9);
                var $5728 = _list2$10;
                var $5724 = $5728;
                break;
            case 'Map.new':
                var $5731 = _list$4;
                var $5724 = $5731;
                break;
        };
        return $5724;
    };
    const Map$keys$go = x0 => x1 => x2 => Map$keys$go$(x0, x1, x2);

    function Map$keys$(_xs$2) {
        var $5732 = List$reverse$(Map$keys$go$(_xs$2, Bits$e, List$nil));
        return $5732;
    };
    const Map$keys = x0 => Map$keys$(x0);

    function Kind$Error$relevant$(_errors$1, _got$2) {
        var self = _errors$1;
        switch (self._) {
            case 'List.cons':
                var $5734 = self.head;
                var $5735 = self.tail;
                var self = $5734;
                switch (self._) {
                    case 'Kind.Error.type_mismatch':
                    case 'Kind.Error.undefined_reference':
                    case 'Kind.Error.cant_infer':
                        var $5737 = (!_got$2);
                        var _keep$5 = $5737;
                        break;
                    case 'Kind.Error.show_goal':
                        var $5738 = Bool$true;
                        var _keep$5 = $5738;
                        break;
                    case 'Kind.Error.waiting':
                    case 'Kind.Error.indirect':
                    case 'Kind.Error.patch':
                        var $5739 = Bool$false;
                        var _keep$5 = $5739;
                        break;
                };
                var self = $5734;
                switch (self._) {
                    case 'Kind.Error.type_mismatch':
                    case 'Kind.Error.undefined_reference':
                        var $5740 = Bool$true;
                        var _got$6 = $5740;
                        break;
                    case 'Kind.Error.show_goal':
                    case 'Kind.Error.waiting':
                    case 'Kind.Error.indirect':
                    case 'Kind.Error.patch':
                    case 'Kind.Error.cant_infer':
                        var $5741 = _got$2;
                        var _got$6 = $5741;
                        break;
                };
                var _tail$7 = Kind$Error$relevant$($5735, _got$6);
                var self = _keep$5;
                if (self) {
                    var $5742 = List$cons$($5734, _tail$7);
                    var $5736 = $5742;
                } else {
                    var $5743 = _tail$7;
                    var $5736 = $5743;
                };
                var $5733 = $5736;
                break;
            case 'List.nil':
                var $5744 = List$nil;
                var $5733 = $5744;
                break;
        };
        return $5733;
    };
    const Kind$Error$relevant = x0 => x1 => Kind$Error$relevant$(x0, x1);

    function Kind$Context$show$(_context$1) {
        var self = _context$1;
        switch (self._) {
            case 'List.cons':
                var $5746 = self.head;
                var $5747 = self.tail;
                var self = $5746;
                switch (self._) {
                    case 'Pair.new':
                        var $5749 = self.fst;
                        var $5750 = self.snd;
                        var _name$6 = Kind$Name$show$($5749);
                        var _type$7 = Kind$Term$show$(Kind$Term$normalize$($5750, Map$new));
                        var _rest$8 = Kind$Context$show$($5747);
                        var $5751 = String$flatten$(List$cons$(_rest$8, List$cons$("- ", List$cons$(_name$6, List$cons$(": ", List$cons$(_type$7, List$cons$("\u{a}", List$nil)))))));
                        var $5748 = $5751;
                        break;
                };
                var $5745 = $5748;
                break;
            case 'List.nil':
                var $5752 = "";
                var $5745 = $5752;
                break;
        };
        return $5745;
    };
    const Kind$Context$show = x0 => Kind$Context$show$(x0);

    function Kind$Term$expand_at$(_path$1, _term$2, _defs$3) {
        var $5753 = Kind$Term$patch_at$(_path$1, _term$2, (_term$4 => {
            var self = _term$4;
            switch (self._) {
                case 'Kind.Term.ref':
                    var $5755 = self.name;
                    var self = Kind$get$($5755, _defs$3);
                    switch (self._) {
                        case 'Maybe.some':
                            var $5757 = self.value;
                            var self = $5757;
                            switch (self._) {
                                case 'Kind.Def.new':
                                    var $5759 = self.term;
                                    var $5760 = $5759;
                                    var $5758 = $5760;
                                    break;
                            };
                            var $5756 = $5758;
                            break;
                        case 'Maybe.none':
                            var $5761 = Kind$Term$ref$($5755);
                            var $5756 = $5761;
                            break;
                    };
                    var $5754 = $5756;
                    break;
                case 'Kind.Term.var':
                case 'Kind.Term.typ':
                case 'Kind.Term.all':
                case 'Kind.Term.lam':
                case 'Kind.Term.app':
                case 'Kind.Term.let':
                case 'Kind.Term.def':
                case 'Kind.Term.ann':
                case 'Kind.Term.gol':
                case 'Kind.Term.hol':
                case 'Kind.Term.nat':
                case 'Kind.Term.chr':
                case 'Kind.Term.str':
                case 'Kind.Term.cse':
                case 'Kind.Term.ori':
                    var $5762 = _term$4;
                    var $5754 = $5762;
                    break;
            };
            return $5754;
        }));
        return $5753;
    };
    const Kind$Term$expand_at = x0 => x1 => x2 => Kind$Term$expand_at$(x0, x1, x2);

    function Kind$Term$expand_ct$(_term$1, _defs$2, _arity$3) {
        var self = _term$1;
        switch (self._) {
            case 'Kind.Term.var':
                var $5764 = self.name;
                var $5765 = self.indx;
                var $5766 = Kind$Term$var$($5764, $5765);
                var $5763 = $5766;
                break;
            case 'Kind.Term.ref':
                var $5767 = self.name;
                var self = Kind$get$($5767, _defs$2);
                switch (self._) {
                    case 'Maybe.some':
                        var $5769 = self.value;
                        var self = $5769;
                        switch (self._) {
                            case 'Kind.Def.new':
                                var $5771 = self.term;
                                var $5772 = self.isct;
                                var $5773 = self.arit;
                                var self = ($5772 && (_arity$3 > $5773));
                                if (self) {
                                    var $5775 = $5771;
                                    var $5774 = $5775;
                                } else {
                                    var $5776 = Kind$Term$ref$($5767);
                                    var $5774 = $5776;
                                };
                                var $5770 = $5774;
                                break;
                        };
                        var $5768 = $5770;
                        break;
                    case 'Maybe.none':
                        var $5777 = Kind$Term$ref$($5767);
                        var $5768 = $5777;
                        break;
                };
                var $5763 = $5768;
                break;
            case 'Kind.Term.all':
                var $5778 = self.eras;
                var $5779 = self.self;
                var $5780 = self.name;
                var $5781 = self.xtyp;
                var $5782 = self.body;
                var $5783 = Kind$Term$all$($5778, $5779, $5780, Kind$Term$expand_ct$($5781, _defs$2, 0n), (_s$9 => _x$10 => {
                    var $5784 = Kind$Term$expand_ct$($5782(_s$9)(_x$10), _defs$2, 0n);
                    return $5784;
                }));
                var $5763 = $5783;
                break;
            case 'Kind.Term.lam':
                var $5785 = self.name;
                var $5786 = self.body;
                var $5787 = Kind$Term$lam$($5785, (_x$6 => {
                    var $5788 = Kind$Term$expand_ct$($5786(_x$6), _defs$2, 0n);
                    return $5788;
                }));
                var $5763 = $5787;
                break;
            case 'Kind.Term.app':
                var $5789 = self.func;
                var $5790 = self.argm;
                var $5791 = Kind$Term$app$(Kind$Term$expand_ct$($5789, _defs$2, Nat$succ$(_arity$3)), Kind$Term$expand_ct$($5790, _defs$2, 0n));
                var $5763 = $5791;
                break;
            case 'Kind.Term.let':
                var $5792 = self.name;
                var $5793 = self.expr;
                var $5794 = self.body;
                var $5795 = Kind$Term$let$($5792, Kind$Term$expand_ct$($5793, _defs$2, 0n), (_x$7 => {
                    var $5796 = Kind$Term$expand_ct$($5794(_x$7), _defs$2, 0n);
                    return $5796;
                }));
                var $5763 = $5795;
                break;
            case 'Kind.Term.def':
                var $5797 = self.name;
                var $5798 = self.expr;
                var $5799 = self.body;
                var $5800 = Kind$Term$def$($5797, Kind$Term$expand_ct$($5798, _defs$2, 0n), (_x$7 => {
                    var $5801 = Kind$Term$expand_ct$($5799(_x$7), _defs$2, 0n);
                    return $5801;
                }));
                var $5763 = $5800;
                break;
            case 'Kind.Term.ann':
                var $5802 = self.done;
                var $5803 = self.term;
                var $5804 = self.type;
                var $5805 = Kind$Term$ann$($5802, Kind$Term$expand_ct$($5803, _defs$2, 0n), Kind$Term$expand_ct$($5804, _defs$2, 0n));
                var $5763 = $5805;
                break;
            case 'Kind.Term.gol':
                var $5806 = self.name;
                var $5807 = self.dref;
                var $5808 = self.verb;
                var $5809 = Kind$Term$gol$($5806, $5807, $5808);
                var $5763 = $5809;
                break;
            case 'Kind.Term.hol':
                var $5810 = self.path;
                var $5811 = Kind$Term$hol$($5810);
                var $5763 = $5811;
                break;
            case 'Kind.Term.nat':
                var $5812 = self.natx;
                var $5813 = Kind$Term$nat$($5812);
                var $5763 = $5813;
                break;
            case 'Kind.Term.chr':
                var $5814 = self.chrx;
                var $5815 = Kind$Term$chr$($5814);
                var $5763 = $5815;
                break;
            case 'Kind.Term.str':
                var $5816 = self.strx;
                var $5817 = Kind$Term$str$($5816);
                var $5763 = $5817;
                break;
            case 'Kind.Term.ori':
                var $5818 = self.orig;
                var $5819 = self.expr;
                var $5820 = Kind$Term$ori$($5818, $5819);
                var $5763 = $5820;
                break;
            case 'Kind.Term.typ':
                var $5821 = Kind$Term$typ;
                var $5763 = $5821;
                break;
            case 'Kind.Term.cse':
                var $5822 = _term$1;
                var $5763 = $5822;
                break;
        };
        return $5763;
    };
    const Kind$Term$expand_ct = x0 => x1 => x2 => Kind$Term$expand_ct$(x0, x1, x2);

    function Kind$Term$expand$(_dref$1, _term$2, _defs$3) {
        var _term$4 = Kind$Term$normalize$(_term$2, Map$new);
        var _term$5 = (() => {
            var $5825 = _term$4;
            var $5826 = _dref$1;
            let _term$6 = $5825;
            let _path$5;
            while ($5826._ === 'List.cons') {
                _path$5 = $5826.head;
                var _term$7 = Kind$Term$expand_at$(_path$5, _term$6, _defs$3);
                var _term$8 = Kind$Term$normalize$(_term$7, Map$new);
                var _term$9 = Kind$Term$expand_ct$(_term$8, _defs$3, 0n);
                var _term$10 = Kind$Term$normalize$(_term$9, Map$new);
                var $5825 = _term$10;
                _term$6 = $5825;
                $5826 = $5826.tail;
            }
            return _term$6;
        })();
        var $5823 = _term$5;
        return $5823;
    };
    const Kind$Term$expand = x0 => x1 => x2 => Kind$Term$expand$(x0, x1, x2);

    function Kind$Error$show$(_error$1, _defs$2) {
        var self = _error$1;
        switch (self._) {
            case 'Kind.Error.type_mismatch':
                var $5828 = self.expected;
                var $5829 = self.detected;
                var $5830 = self.context;
                var self = $5828;
                switch (self._) {
                    case 'Either.left':
                        var $5832 = self.value;
                        var $5833 = $5832;
                        var _expected$7 = $5833;
                        break;
                    case 'Either.right':
                        var $5834 = self.value;
                        var $5835 = Kind$Term$show$(Kind$Term$normalize$($5834, Map$new));
                        var _expected$7 = $5835;
                        break;
                };
                var self = $5829;
                switch (self._) {
                    case 'Either.left':
                        var $5836 = self.value;
                        var $5837 = $5836;
                        var _detected$8 = $5837;
                        break;
                    case 'Either.right':
                        var $5838 = self.value;
                        var $5839 = Kind$Term$show$(Kind$Term$normalize$($5838, Map$new));
                        var _detected$8 = $5839;
                        break;
                };
                var $5831 = String$flatten$(List$cons$("Type mismatch.\u{a}", List$cons$("- Expected: ", List$cons$(_expected$7, List$cons$("\u{a}", List$cons$("- Detected: ", List$cons$(_detected$8, List$cons$("\u{a}", List$cons$((() => {
                    var self = $5830;
                    switch (self._) {
                        case 'List.nil':
                            var $5840 = "";
                            return $5840;
                        case 'List.cons':
                            var $5841 = String$flatten$(List$cons$("With context:\u{a}", List$cons$(Kind$Context$show$($5830), List$nil)));
                            return $5841;
                    };
                })(), List$nil)))))))));
                var $5827 = $5831;
                break;
            case 'Kind.Error.show_goal':
                var $5842 = self.name;
                var $5843 = self.dref;
                var $5844 = self.verb;
                var $5845 = self.goal;
                var $5846 = self.context;
                var _goal_name$8 = String$flatten$(List$cons$("Goal ?", List$cons$(Kind$Name$show$($5842), List$cons$(":\u{a}", List$nil))));
                var self = $5845;
                switch (self._) {
                    case 'Maybe.some':
                        var $5848 = self.value;
                        var _goal$10 = Kind$Term$expand$($5843, $5848, _defs$2);
                        var $5849 = String$flatten$(List$cons$("With type: ", List$cons$((() => {
                            var self = $5844;
                            if (self) {
                                var $5850 = Kind$Term$show$go$(_goal$10, Maybe$some$((_x$11 => {
                                    var $5851 = _x$11;
                                    return $5851;
                                })));
                                return $5850;
                            } else {
                                var $5852 = Kind$Term$show$(_goal$10);
                                return $5852;
                            };
                        })(), List$cons$("\u{a}", List$nil))));
                        var _with_type$9 = $5849;
                        break;
                    case 'Maybe.none':
                        var $5853 = "";
                        var _with_type$9 = $5853;
                        break;
                };
                var self = $5846;
                switch (self._) {
                    case 'List.nil':
                        var $5854 = "";
                        var _with_ctxt$10 = $5854;
                        break;
                    case 'List.cons':
                        var $5855 = String$flatten$(List$cons$("With ctxt:\u{a}", List$cons$(Kind$Context$show$($5846), List$nil)));
                        var _with_ctxt$10 = $5855;
                        break;
                };
                var $5847 = String$flatten$(List$cons$(_goal_name$8, List$cons$(_with_type$9, List$cons$(_with_ctxt$10, List$nil))));
                var $5827 = $5847;
                break;
            case 'Kind.Error.waiting':
                var $5856 = self.name;
                var $5857 = String$flatten$(List$cons$("Waiting for \'", List$cons$($5856, List$cons$("\'.", List$nil))));
                var $5827 = $5857;
                break;
            case 'Kind.Error.indirect':
                var $5858 = self.name;
                var $5859 = String$flatten$(List$cons$("Error on dependency \'", List$cons$($5858, List$cons$("\'.", List$nil))));
                var $5827 = $5859;
                break;
            case 'Kind.Error.patch':
                var $5860 = self.term;
                var $5861 = String$flatten$(List$cons$("Patching: ", List$cons$(Kind$Term$show$($5860), List$nil)));
                var $5827 = $5861;
                break;
            case 'Kind.Error.undefined_reference':
                var $5862 = self.name;
                var $5863 = String$flatten$(List$cons$("Undefined reference: ", List$cons$(Kind$Name$show$($5862), List$cons$("\u{a}", List$nil))));
                var $5827 = $5863;
                break;
            case 'Kind.Error.cant_infer':
                var $5864 = self.term;
                var $5865 = self.context;
                var _term$6 = Kind$Term$show$($5864);
                var _context$7 = Kind$Context$show$($5865);
                var $5866 = String$flatten$(List$cons$("Can\'t infer type of: ", List$cons$(_term$6, List$cons$("\u{a}", List$cons$("With ctxt:\u{a}", List$cons$(_context$7, List$nil))))));
                var $5827 = $5866;
                break;
        };
        return $5827;
    };
    const Kind$Error$show = x0 => x1 => Kind$Error$show$(x0, x1);

    function Kind$Error$origin$(_error$1) {
        var self = _error$1;
        switch (self._) {
            case 'Kind.Error.type_mismatch':
                var $5868 = self.origin;
                var $5869 = $5868;
                var $5867 = $5869;
                break;
            case 'Kind.Error.undefined_reference':
                var $5870 = self.origin;
                var $5871 = $5870;
                var $5867 = $5871;
                break;
            case 'Kind.Error.cant_infer':
                var $5872 = self.origin;
                var $5873 = $5872;
                var $5867 = $5873;
                break;
            case 'Kind.Error.show_goal':
            case 'Kind.Error.waiting':
            case 'Kind.Error.indirect':
            case 'Kind.Error.patch':
                var $5874 = Maybe$none;
                var $5867 = $5874;
                break;
        };
        return $5867;
    };
    const Kind$Error$origin = x0 => Kind$Error$origin$(x0);

    function Kind$Defs$report$errors$(_defs$1) {
        var _errors$2 = "";
        var _errors$3 = (() => {
            var $5877 = _errors$2;
            var $5878 = Map$keys$(_defs$1);
            let _errors$4 = $5877;
            let _key$3;
            while ($5878._ === 'List.cons') {
                _key$3 = $5878.head;
                var _name$5 = Kind$Name$from_bits$(_key$3);
                var self = Kind$get$(_name$5, _defs$1);
                switch (self._) {
                    case 'Maybe.some':
                        var $5879 = self.value;
                        var self = $5879;
                        switch (self._) {
                            case 'Kind.Def.new':
                                var $5881 = self.file;
                                var $5882 = self.code;
                                var $5883 = self.name;
                                var $5884 = self.stat;
                                var self = $5884;
                                switch (self._) {
                                    case 'Kind.Status.fail':
                                        var $5886 = self.errors;
                                        var self = $5886;
                                        switch (self._) {
                                            case 'List.nil':
                                                var $5888 = _errors$4;
                                                var $5887 = $5888;
                                                break;
                                            case 'List.cons':
                                                var _name_str$19 = $5883;
                                                var _rel_errs$20 = Kind$Error$relevant$($5886, Bool$false);
                                                var _errors$21 = (() => {
                                                    var $5891 = _errors$4;
                                                    var $5892 = _rel_errs$20;
                                                    let _errors$22 = $5891;
                                                    let _err$21;
                                                    while ($5892._ === 'List.cons') {
                                                        _err$21 = $5892.head;
                                                        var _err_msg$23 = Kind$Error$show$(_err$21, _defs$1);
                                                        var self = Kind$Error$origin$(_err$21);
                                                        switch (self._) {
                                                            case 'Maybe.some':
                                                                var $5893 = self.value;
                                                                var self = $5893;
                                                                switch (self._) {
                                                                    case 'Pair.new':
                                                                        var $5895 = self.fst;
                                                                        var $5896 = self.snd;
                                                                        var _inside$27 = ("Inside \'" + ($5881 + "\':\u{a}"));
                                                                        var _source$28 = Kind$highlight$($5882, $5895, $5896);
                                                                        var $5897 = (_inside$27 + (_source$28 + "\u{a}"));
                                                                        var $5894 = $5897;
                                                                        break;
                                                                };
                                                                var _ori_msg$24 = $5894;
                                                                break;
                                                            case 'Maybe.none':
                                                                var $5898 = "";
                                                                var _ori_msg$24 = $5898;
                                                                break;
                                                        };
                                                        var $5891 = (_errors$22 + (_err_msg$23 + (_ori_msg$24 + "\u{a}")));
                                                        _errors$22 = $5891;
                                                        $5892 = $5892.tail;
                                                    }
                                                    return _errors$22;
                                                })();
                                                var $5889 = _errors$21;
                                                var $5887 = $5889;
                                                break;
                                        };
                                        var $5885 = $5887;
                                        break;
                                    case 'Kind.Status.init':
                                    case 'Kind.Status.wait':
                                    case 'Kind.Status.done':
                                        var $5899 = _errors$4;
                                        var $5885 = $5899;
                                        break;
                                };
                                var $5880 = $5885;
                                break;
                        };
                        var $5877 = $5880;
                        break;
                    case 'Maybe.none':
                        var $5900 = _errors$4;
                        var $5877 = $5900;
                        break;
                };
                _errors$4 = $5877;
                $5878 = $5878.tail;
            }
            return _errors$4;
        })();
        var $5875 = _errors$3;
        return $5875;
    };
    const Kind$Defs$report$errors = x0 => Kind$Defs$report$errors$(x0);

    function Kind$Defs$report$(_defs$1, _names$2) {
        var _types$3 = Kind$Defs$report$types$(_defs$1, _names$2);
        var _errors$4 = Kind$Defs$report$errors$(_defs$1);
        var self = _errors$4;
        if (self.length === 0) {
            var $5902 = "All terms check.";
            var _errors$5 = $5902;
        } else {
            var $5903 = self.charCodeAt(0);
            var $5904 = self.slice(1);
            var $5905 = _errors$4;
            var _errors$5 = $5905;
        };
        var $5901 = (_types$3 + ("\u{a}" + _errors$5));
        return $5901;
    };
    const Kind$Defs$report = x0 => x1 => Kind$Defs$report$(x0, x1);

    function Kind$checker$io$one$(_name$1) {
        var $5906 = IO$monad$((_m$bind$2 => _m$pure$3 => {
            var $5907 = _m$bind$2;
            return $5907;
        }))(Kind$Synth$one$(_name$1, Map$new))((_new_defs$2 => {
            var self = _new_defs$2;
            switch (self._) {
                case 'Maybe.some':
                    var $5909 = self.value;
                    var $5910 = IO$print$(Kind$Defs$report$($5909, List$cons$(_name$1, List$nil)));
                    var $5908 = $5910;
                    break;
                case 'Maybe.none':
                    var _notfound$3 = ("Term not found: \'" + (_name$1 + "\'."));
                    var _filelist$4 = List$mapped$(Kind$Synth$files_of$(_name$1), (_x$4 => {
                        var $5912 = ("\'" + (_x$4 + "\'"));
                        return $5912;
                    }));
                    var _searched$5 = ("Searched on: " + (String$join$(", ", _filelist$4) + "."));
                    var $5911 = IO$print$((_notfound$3 + ("\u{a}" + _searched$5)));
                    var $5908 = $5911;
                    break;
            };
            return $5908;
        }));
        return $5906;
    };
    const Kind$checker$io$one = x0 => Kind$checker$io$one$(x0);

    function Kind$Synth$many$(_names$1, _defs$2) {
        var self = _names$1;
        switch (self._) {
            case 'List.cons':
                var $5914 = self.head;
                var $5915 = self.tail;
                var $5916 = IO$monad$((_m$bind$5 => _m$pure$6 => {
                    var $5917 = _m$bind$5;
                    return $5917;
                }))(Kind$Synth$one$($5914, _defs$2))((_new_defs$5 => {
                    var self = _new_defs$5;
                    switch (self._) {
                        case 'Maybe.some':
                            var $5919 = self.value;
                            var $5920 = Kind$Synth$many$($5915, $5919);
                            var $5918 = $5920;
                            break;
                        case 'Maybe.none':
                            var $5921 = Kind$Synth$many$($5915, _defs$2);
                            var $5918 = $5921;
                            break;
                    };
                    return $5918;
                }));
                var $5913 = $5916;
                break;
            case 'List.nil':
                var $5922 = IO$monad$((_m$bind$3 => _m$pure$4 => {
                    var $5923 = _m$pure$4;
                    return $5923;
                }))(_defs$2);
                var $5913 = $5922;
                break;
        };
        return $5913;
    };
    const Kind$Synth$many = x0 => x1 => Kind$Synth$many$(x0, x1);

    function Kind$Synth$file$(_file$1, _defs$2) {
        var $5924 = IO$monad$((_m$bind$3 => _m$pure$4 => {
            var $5925 = _m$bind$3;
            return $5925;
        }))(IO$get_file$(_file$1))((_code$3 => {
            var _read$4 = Kind$Defs$read$(_file$1, _code$3, _defs$2);
            var self = _read$4;
            switch (self._) {
                case 'Either.left':
                    var $5927 = self.value;
                    var $5928 = IO$monad$((_m$bind$6 => _m$pure$7 => {
                        var $5929 = _m$pure$7;
                        return $5929;
                    }))(Either$left$($5927));
                    var $5926 = $5928;
                    break;
                case 'Either.right':
                    var $5930 = self.value;
                    var _file_defs$6 = $5930;
                    var _file_keys$7 = Map$keys$(_file_defs$6);
                    var _file_nams$8 = List$mapped$(_file_keys$7, Kind$Name$from_bits);
                    var $5931 = IO$monad$((_m$bind$9 => _m$pure$10 => {
                        var $5932 = _m$bind$9;
                        return $5932;
                    }))(Kind$Synth$many$(_file_nams$8, _file_defs$6))((_defs$9 => {
                        var $5933 = IO$monad$((_m$bind$10 => _m$pure$11 => {
                            var $5934 = _m$pure$11;
                            return $5934;
                        }))(Either$right$(Pair$new$(_file_nams$8, _defs$9)));
                        return $5933;
                    }));
                    var $5926 = $5931;
                    break;
            };
            return $5926;
        }));
        return $5924;
    };
    const Kind$Synth$file = x0 => x1 => Kind$Synth$file$(x0, x1);

    function Kind$checker$io$file$(_file$1) {
        var $5935 = IO$monad$((_m$bind$2 => _m$pure$3 => {
            var $5936 = _m$bind$2;
            return $5936;
        }))(Kind$Synth$file$(_file$1, Map$new))((_loaded$2 => {
            var self = _loaded$2;
            switch (self._) {
                case 'Either.left':
                    var $5938 = self.value;
                    var $5939 = IO$monad$((_m$bind$4 => _m$pure$5 => {
                        var $5940 = _m$bind$4;
                        return $5940;
                    }))(IO$print$(String$flatten$(List$cons$("On \'", List$cons$(_file$1, List$cons$("\':", List$nil))))))((_$4 => {
                        var $5941 = IO$print$($5938);
                        return $5941;
                    }));
                    var $5937 = $5939;
                    break;
                case 'Either.right':
                    var $5942 = self.value;
                    var self = $5942;
                    switch (self._) {
                        case 'Pair.new':
                            var $5944 = self.fst;
                            var $5945 = self.snd;
                            var _nams$6 = $5944;
                            var _defs$7 = $5945;
                            var self = _nams$6;
                            switch (self._) {
                                case 'List.nil':
                                    var $5947 = IO$print$(("File not found or empty: \'" + (_file$1 + "\'.")));
                                    var $5946 = $5947;
                                    break;
                                case 'List.cons':
                                    var $5948 = IO$print$(Kind$Defs$report$(_defs$7, _nams$6));
                                    var $5946 = $5948;
                                    break;
                            };
                            var $5943 = $5946;
                            break;
                    };
                    var $5937 = $5943;
                    break;
            };
            return $5937;
        }));
        return $5935;
    };
    const Kind$checker$io$file = x0 => Kind$checker$io$file$(x0);

    function IO$purify$(_io$2) {
        var IO$purify$ = (_io$2) => ({
            ctr: 'TCO',
            arg: [_io$2]
        });
        var IO$purify = _io$2 => IO$purify$(_io$2);
        var arg = [_io$2];
        while (true) {
            let [_io$2] = arg;
            var R = (() => {
                var self = _io$2;
                switch (self._) {
                    case 'IO.end':
                        var $5949 = self.value;
                        var $5950 = $5949;
                        return $5950;
                    case 'IO.ask':
                        var $5951 = self.then;
                        var $5952 = IO$purify$($5951(""));
                        return $5952;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const IO$purify = x0 => IO$purify$(x0);

    function Kind$checker$code$(_code$1) {
        var self = Kind$Defs$read$("Main.kind", _code$1, Map$new);
        switch (self._) {
            case 'Either.left':
                var $5954 = self.value;
                var $5955 = $5954;
                var $5953 = $5955;
                break;
            case 'Either.right':
                var $5956 = self.value;
                var $5957 = IO$purify$((() => {
                    var _defs$3 = $5956;
                    var _nams$4 = List$mapped$(Map$keys$(_defs$3), Kind$Name$from_bits);
                    var $5958 = IO$monad$((_m$bind$5 => _m$pure$6 => {
                        var $5959 = _m$bind$5;
                        return $5959;
                    }))(Kind$Synth$many$(_nams$4, _defs$3))((_defs$5 => {
                        var $5960 = IO$monad$((_m$bind$6 => _m$pure$7 => {
                            var $5961 = _m$pure$7;
                            return $5961;
                        }))(Kind$Defs$report$(_defs$5, _nams$4));
                        return $5960;
                    }));
                    return $5958;
                })());
                var $5953 = $5957;
                break;
        };
        return $5953;
    };
    const Kind$checker$code = x0 => Kind$checker$code$(x0);

    function Kind$Term$read$(_code$1) {
        var self = Kind$Parser$term$(0n, _code$1);
        switch (self._) {
            case 'Parser.Reply.value':
                var $5963 = self.val;
                var $5964 = Maybe$some$($5963);
                var $5962 = $5964;
                break;
            case 'Parser.Reply.error':
                var $5965 = Maybe$none;
                var $5962 = $5965;
                break;
        };
        return $5962;
    };
    const Kind$Term$read = x0 => Kind$Term$read$(x0);

    function Lsp$Report$new$(_types$1, _errors$2) {
        var $5966 = ({
            _: 'Lsp.Report.new',
            'types': _types$1,
            'errors': _errors$2
        });
        return $5966;
    };
    const Lsp$Report$new = x0 => x1 => Lsp$Report$new$(x0, x1);

    function List$pure$(_x$2) {
        var $5967 = List$cons$(_x$2, List$nil);
        return $5967;
    };
    const List$pure = x0 => List$pure$(x0);

    function List$append$(_as$2, _a$3) {
        var self = _as$2;
        switch (self._) {
            case 'List.cons':
                var $5969 = self.head;
                var $5970 = self.tail;
                var $5971 = List$cons$($5969, List$append$($5970, _a$3));
                var $5968 = $5971;
                break;
            case 'List.nil':
                var $5972 = List$pure$(_a$3);
                var $5968 = $5972;
                break;
        };
        return $5968;
    };
    const List$append = x0 => x1 => List$append$(x0, x1);

    function List$map$(_f$3, _as$4) {
        var self = _as$4;
        switch (self._) {
            case 'List.cons':
                var $5974 = self.head;
                var $5975 = self.tail;
                var $5976 = List$cons$(_f$3($5974), List$map$(_f$3, $5975));
                var $5973 = $5976;
                break;
            case 'List.nil':
                var $5977 = List$nil;
                var $5973 = $5977;
                break;
        };
        return $5973;
    };
    const List$map = x0 => x1 => List$map$(x0, x1);

    function Lsp$diagnostics$make_report$go$(_defs$1, _names$2, _errs$3, _typs$4) {
        var Lsp$diagnostics$make_report$go$ = (_defs$1, _names$2, _errs$3, _typs$4) => ({
            ctr: 'TCO',
            arg: [_defs$1, _names$2, _errs$3, _typs$4]
        });
        var Lsp$diagnostics$make_report$go = _defs$1 => _names$2 => _errs$3 => _typs$4 => Lsp$diagnostics$make_report$go$(_defs$1, _names$2, _errs$3, _typs$4);
        var arg = [_defs$1, _names$2, _errs$3, _typs$4];
        while (true) {
            let [_defs$1, _names$2, _errs$3, _typs$4] = arg;
            var R = (() => {
                var self = _names$2;
                switch (self._) {
                    case 'List.cons':
                        var $5978 = self.head;
                        var $5979 = self.tail;
                        var _name$7 = $5978;
                        var self = Kind$get$(_name$7, _defs$1);
                        switch (self._) {
                            case 'Maybe.some':
                                var $5981 = self.value;
                                var self = $5981;
                                switch (self._) {
                                    case 'Kind.Def.new':
                                        var $5983 = self.file;
                                        var $5984 = self.type;
                                        var $5985 = self.stat;
                                        var _typs$18 = List$append$(_typs$4, Pair$new$(_name$7, $5984));
                                        var self = $5985;
                                        switch (self._) {
                                            case 'Kind.Status.fail':
                                                var $5987 = self.errors;
                                                var self = $5987;
                                                switch (self._) {
                                                    case 'List.nil':
                                                        var $5989 = Lsp$diagnostics$make_report$go$(_defs$1, $5979, _errs$3, _typs$18);
                                                        var $5988 = $5989;
                                                        break;
                                                    case 'List.cons':
                                                        var _rel_errs$22 = Kind$Error$relevant$($5987, Bool$false);
                                                        var self = _rel_errs$22;
                                                        switch (self._) {
                                                            case 'List.nil':
                                                                var $5991 = Lsp$diagnostics$make_report$go$(_defs$1, $5979, _errs$3, _typs$18);
                                                                var $5990 = $5991;
                                                                break;
                                                            case 'List.cons':
                                                                var _added_errs$25 = List$concat$(_errs$3, List$map$((_e$25 => {
                                                                    var $5993 = Pair$new$($5983, _e$25);
                                                                    return $5993;
                                                                }), _rel_errs$22));
                                                                var $5992 = Lsp$diagnostics$make_report$go$(_defs$1, $5979, _added_errs$25, _typs$18);
                                                                var $5990 = $5992;
                                                                break;
                                                        };
                                                        var $5988 = $5990;
                                                        break;
                                                };
                                                var $5986 = $5988;
                                                break;
                                            case 'Kind.Status.init':
                                            case 'Kind.Status.wait':
                                            case 'Kind.Status.done':
                                                var $5994 = Lsp$diagnostics$make_report$go$(_defs$1, $5979, _errs$3, _typs$18);
                                                var $5986 = $5994;
                                                break;
                                        };
                                        var $5982 = $5986;
                                        break;
                                };
                                var $5980 = $5982;
                                break;
                            case 'Maybe.none':
                                var $5995 = Lsp$diagnostics$make_report$go$(_defs$1, $5979, _errs$3, _typs$4);
                                var $5980 = $5995;
                                break;
                        };
                        return $5980;
                    case 'List.nil':
                        var $5996 = Lsp$Report$new$(_typs$4, _errs$3);
                        return $5996;
                };
            })();
            if (R.ctr === 'TCO') arg = R.arg;
            else return R;
        }
    };
    const Lsp$diagnostics$make_report$go = x0 => x1 => x2 => x3 => Lsp$diagnostics$make_report$go$(x0, x1, x2, x3);

    function Lsp$diagnostics$make_report$(_defs$1, _names$2) {
        var $5997 = Lsp$diagnostics$make_report$go$(_defs$1, _names$2, List$nil, List$nil);
        return $5997;
    };
    const Lsp$diagnostics$make_report = x0 => x1 => Lsp$diagnostics$make_report$(x0, x1);

    function Lsp$Diagnostic$new$(_message$1, _severity$2, _file$3, _from$4, _upto$5) {
        var $5998 = ({
            _: 'Lsp.Diagnostic.new',
            'message': _message$1,
            'severity': _severity$2,
            'file': _file$3,
            'from': _from$4,
            'upto': _upto$5
        });
        return $5998;
    };
    const Lsp$Diagnostic$new = x0 => x1 => x2 => x3 => x4 => Lsp$Diagnostic$new$(x0, x1, x2, x3, x4);

    function U32$new$(_value$1) {
        var $5999 = word_to_u32(_value$1);
        return $5999;
    };
    const U32$new = x0 => U32$new$(x0);

    function U32$inc$(_a$1) {
        var self = _a$1;
        switch ('u32') {
            case 'u32':
                var $6001 = u32_to_word(self);
                var $6002 = U32$new$(Word$inc$($6001));
                var $6000 = $6002;
                break;
        };
        return $6000;
    };
    const U32$inc = x0 => U32$inc$(x0);
    const U32$zero = U32$new$(Word$zero$(32n));
    const Nat$to_u32 = a0 => (Number(a0));
    const Lsp$DiagnosticSeverity$Error = 1;
    const Lsp$DiagnosticSeverity$Warning = 2;
    const Lsp$DiagnosticSeverity$Information = 3;

    function Lsp$severity$(_err$1) {
        var self = _err$1;
        switch (self._) {
            case 'Kind.Error.type_mismatch':
            case 'Kind.Error.undefined_reference':
            case 'Kind.Error.cant_infer':
                var $6004 = Lsp$DiagnosticSeverity$Error;
                var $6003 = $6004;
                break;
            case 'Kind.Error.show_goal':
                var $6005 = Lsp$DiagnosticSeverity$Warning;
                var $6003 = $6005;
                break;
            case 'Kind.Error.waiting':
            case 'Kind.Error.indirect':
            case 'Kind.Error.patch':
                var $6006 = Lsp$DiagnosticSeverity$Information;
                var $6003 = $6006;
                break;
        };
        return $6003;
    };
    const Lsp$severity = x0 => Lsp$severity$(x0);

    function Lsp$diagnostics$(_defs$1) {
        var _names$2 = List$mapped$(Map$keys$(_defs$1), Kind$Name$from_bits);
        var self = Lsp$diagnostics$make_report$(_defs$1, _names$2);
        switch (self._) {
            case 'Lsp.Report.new':
                var $6008 = self.errors;
                var $6009 = List$mapped$($6008, (_pair$5 => {
                    var self = _pair$5;
                    switch (self._) {
                        case 'Pair.new':
                            var $6011 = self.fst;
                            var $6012 = self.snd;
                            var _uri$8 = $6011;
                            var _err$9 = $6012;
                            var self = Kind$Error$origin$(_err$9);
                            switch (self._) {
                                case 'Maybe.some':
                                    var $6014 = self.value;
                                    var self = $6014;
                                    switch (self._) {
                                        case 'Pair.new':
                                            var $6016 = self.fst;
                                            var $6017 = self.snd;
                                            var _from$13 = (Number($6016));
                                            var _upto$14 = (Number($6017));
                                            var $6018 = Lsp$Diagnostic$new$(Kind$Error$show$(_err$9, _defs$1), Lsp$severity$(_err$9), _uri$8, _from$13, _upto$14);
                                            var $6015 = $6018;
                                            break;
                                    };
                                    var $6013 = $6015;
                                    break;
                                case 'Maybe.none':
                                    var $6019 = Lsp$Diagnostic$new$(Kind$Error$show$(_err$9, _defs$1), Lsp$severity$(_err$9), _uri$8, 0, 0);
                                    var $6013 = $6019;
                                    break;
                            };
                            var $6010 = $6013;
                            break;
                    };
                    return $6010;
                }));
                var $6007 = $6009;
                break;
        };
        return $6007;
    };
    const Lsp$diagnostics = x0 => Lsp$diagnostics$(x0);

    function List$filter$(_f$2, _xs$3) {
        var self = _xs$3;
        switch (self._) {
            case 'List.cons':
                var $6021 = self.head;
                var $6022 = self.tail;
                var self = _f$2($6021);
                if (self) {
                    var $6024 = List$cons$($6021, List$filter$(_f$2, $6022));
                    var $6023 = $6024;
                } else {
                    var $6025 = List$filter$(_f$2, $6022);
                    var $6023 = $6025;
                };
                var $6020 = $6023;
                break;
            case 'List.nil':
                var $6026 = List$nil;
                var $6020 = $6026;
                break;
        };
        return $6020;
    };
    const List$filter = x0 => x1 => List$filter$(x0, x1);

    function Lsp$defs$(_defs$1, _uri$2) {
        var $6027 = List$filter$((_d$3 => {
            var self = _d$3;
            switch (self._) {
                case 'Kind.Def.new':
                    var $6029 = self.file;
                    var $6030 = ($6029 === _uri$2);
                    var $6028 = $6030;
                    break;
            };
            return $6028;
        }), Map$values$(_defs$1));
        return $6027;
    };
    const Lsp$defs = x0 => x1 => Lsp$defs$(x0, x1);

    function Map$delete$(_key$2, _map$3) {
        var self = _map$3;
        switch (self._) {
            case 'Map.tie':
                var $6032 = self.val;
                var $6033 = self.lft;
                var $6034 = self.rgt;
                var self = _key$2;
                switch (self.length === 0 ? 'e' : self[self.length - 1] === '0' ? 'o' : 'i') {
                    case 'o':
                        var $6036 = self.slice(0, -1);
                        var $6037 = Map$tie$($6032, Map$delete$($6036, $6033), $6034);
                        var $6035 = $6037;
                        break;
                    case 'i':
                        var $6038 = self.slice(0, -1);
                        var $6039 = Map$tie$($6032, $6033, Map$delete$($6038, $6034));
                        var $6035 = $6039;
                        break;
                    case 'e':
                        var $6040 = Map$tie$(Maybe$none, $6033, $6034);
                        var $6035 = $6040;
                        break;
                };
                var $6031 = $6035;
                break;
            case 'Map.new':
                var $6041 = Map$new;
                var $6031 = $6041;
                break;
        };
        return $6031;
    };
    const Map$delete = x0 => x1 => Map$delete$(x0, x1);

    function Map$union$(_a$2, _b$3) {
        var self = _a$2;
        switch (self._) {
            case 'Map.tie':
                var $6043 = self.val;
                var $6044 = self.lft;
                var $6045 = self.rgt;
                var self = _b$3;
                switch (self._) {
                    case 'Map.tie':
                        var $6047 = self.val;
                        var $6048 = self.lft;
                        var $6049 = self.rgt;
                        var self = $6043;
                        switch (self._) {
                            case 'Maybe.none':
                                var $6051 = Map$tie$($6047, Map$union$($6044, $6048), Map$union$($6045, $6049));
                                var $6050 = $6051;
                                break;
                            case 'Maybe.some':
                                var $6052 = Map$tie$($6043, Map$union$($6044, $6048), Map$union$($6045, $6049));
                                var $6050 = $6052;
                                break;
                        };
                        var $6046 = $6050;
                        break;
                    case 'Map.new':
                        var $6053 = _a$2;
                        var $6046 = $6053;
                        break;
                };
                var $6042 = $6046;
                break;
            case 'Map.new':
                var $6054 = _b$3;
                var $6042 = $6054;
                break;
        };
        return $6042;
    };
    const Map$union = x0 => x1 => Map$union$(x0, x1);

    function Lsp$on_change$(_uri$1, _content$2, _defs$3) {
        var _parsed$4 = Kind$Parser$file$(_uri$1, _content$2, Map$new, 0n, _content$2);
        var self = _parsed$4;
        switch (self._) {
            case 'Parser.Reply.error':
                var $6056 = self.idx;
                var $6057 = self.err;
                var _diagnostics$8 = List$cons$(Lsp$Diagnostic$new$($6057, Lsp$DiagnosticSeverity$Error, _uri$1, (Number($6056)), (Number($6056))), List$nil);
                var $6058 = Pair$new$(_defs$3, _diagnostics$8);
                var $6055 = $6058;
                break;
            case 'Parser.Reply.value':
                var $6059 = self.val;
                var _existingDefs$8 = Lsp$defs$(_defs$3, _uri$1);
                var _namesToDelete$9 = List$map$((_x$9 => {
                    var self = _x$9;
                    switch (self._) {
                        case 'Kind.Def.new':
                            var $6062 = self.name;
                            var $6063 = $6062;
                            var $6061 = $6063;
                            break;
                    };
                    return $6061;
                }), _existingDefs$8);
                var _otherDefs$10 = (() => {
                    var $6065 = _defs$3;
                    var $6066 = _namesToDelete$9;
                    let _m$11 = $6065;
                    let _d$10;
                    while ($6066._ === 'List.cons') {
                        _d$10 = $6066.head;
                        var $6065 = Map$delete$((kind_name_to_bits(_d$10)), _m$11);
                        _m$11 = $6065;
                        $6066 = $6066.tail;
                    }
                    return _m$11;
                })();
                var _currentDefs$11 = Map$union$($6059, _otherDefs$10);
                var _defsToCheck$12 = List$mapped$(Map$keys$($6059), Kind$Name$from_bits);
                var _checked$13 = IO$purify$(Kind$Synth$many$(_defsToCheck$12, _currentDefs$11));
                var $6060 = Pair$new$(_checked$13, Lsp$diagnostics$(_checked$13));
                var $6055 = $6060;
                break;
        };
        return $6055;
    };
    const Lsp$on_change = x0 => x1 => x2 => Lsp$on_change$(x0, x1, x2);

    function Lsp$Ref$new$(_range$1, _name$2) {
        var $6067 = ({
            _: 'Lsp.Ref.new',
            'range': _range$1,
            'name': _name$2
        });
        return $6067;
    };
    const Lsp$Ref$new = x0 => x1 => Lsp$Ref$new$(x0, x1);

    function Lsp$refs$go$(_term$1, _start$2, _end$3) {
        var self = _term$1;
        switch (self._) {
            case 'Kind.Term.ref':
                var $6069 = self.name;
                var $6070 = List$cons$(Lsp$Ref$new$(Pair$new$(_start$2, _end$3), Kind$Name$show$($6069)), List$nil);
                var $6068 = $6070;
                break;
            case 'Kind.Term.all':
                var $6071 = self.self;
                var $6072 = self.name;
                var $6073 = self.xtyp;
                var $6074 = self.body;
                var _type$9 = Lsp$refs$go$($6073, 0n, 0n);
                var _body$10 = Lsp$refs$go$($6074(Kind$Term$var$($6071, 0n))(Kind$Term$var$($6072, 0n)), 0n, 0n);
                var $6075 = List$concat$(_type$9, _body$10);
                var $6068 = $6075;
                break;
            case 'Kind.Term.lam':
                var $6076 = self.name;
                var $6077 = self.body;
                var $6078 = Lsp$refs$go$($6077(Kind$Term$var$($6076, 0n)), 0n, 0n);
                var $6068 = $6078;
                break;
            case 'Kind.Term.app':
                var $6079 = self.func;
                var $6080 = self.argm;
                var _func$6 = Lsp$refs$go$($6079, 0n, 0n);
                var _argm$7 = Lsp$refs$go$($6080, 0n, 0n);
                var $6081 = List$concat$(_func$6, _argm$7);
                var $6068 = $6081;
                break;
            case 'Kind.Term.let':
                var $6082 = self.name;
                var $6083 = self.expr;
                var $6084 = self.body;
                var _expr$7 = Lsp$refs$go$($6083, 0n, 0n);
                var _body$8 = Lsp$refs$go$($6084(Kind$Term$var$($6082, 0n)), 0n, 0n);
                var $6085 = List$concat$(_expr$7, _body$8);
                var $6068 = $6085;
                break;
            case 'Kind.Term.def':
                var $6086 = self.name;
                var $6087 = self.expr;
                var $6088 = self.body;
                var _expr$7 = Lsp$refs$go$($6087, 0n, 0n);
                var _body$8 = Lsp$refs$go$($6088(Kind$Term$var$($6086, 0n)), 0n, 0n);
                var $6089 = List$concat$(_expr$7, _body$8);
                var $6068 = $6089;
                break;
            case 'Kind.Term.ann':
                var $6090 = self.term;
                var $6091 = self.type;
                var _term$7 = Lsp$refs$go$($6090, 0n, 0n);
                var _type$8 = Lsp$refs$go$($6091, 0n, 0n);
                var $6092 = List$concat$(_term$7, _type$8);
                var $6068 = $6092;
                break;
            case 'Kind.Term.cse':
                var $6093 = self.expr;
                var $6094 = self.with;
                var $6095 = self.cses;
                var $6096 = self.moti;
                var _wyth$10 = List$flatten$(List$mapped$($6094, (_defn$10 => {
                    var self = _defn$10;
                    switch (self._) {
                        case 'Kind.Def.new':
                            var $6099 = self.term;
                            var $6100 = self.type;
                            var _type$20 = Lsp$refs$go$($6100, 0n, 0n);
                            var _term$21 = Lsp$refs$go$($6099, 0n, 0n);
                            var $6101 = List$concat$(_term$21, _type$20);
                            var $6098 = $6101;
                            break;
                    };
                    return $6098;
                })));
                var _cses$11 = Map$to_list$($6095);
                var _cses$12 = List$flatten$(List$mapped$(_cses$11, (_x$12 => {
                    var $6102 = Lsp$refs$go$(Pair$snd$(_x$12), 0n, 0n);
                    return $6102;
                })));
                var self = $6096;
                switch (self._) {
                    case 'Maybe.some':
                        var $6103 = self.value;
                        var $6104 = Lsp$refs$go$($6103, 0n, 0n);
                        var _moti$13 = $6104;
                        break;
                    case 'Maybe.none':
                        var $6105 = List$nil;
                        var _moti$13 = $6105;
                        break;
                };
                var _expr$14 = Lsp$refs$go$($6093, 0n, 0n);
                var $6097 = List$concat$(_wyth$10, List$concat$(_cses$12, List$concat$(_moti$13, _expr$14)));
                var $6068 = $6097;
                break;
            case 'Kind.Term.ori':
                var $6106 = self.orig;
                var $6107 = self.expr;
                var $6108 = Lsp$refs$go$($6107, Pair$fst$($6106), Pair$snd$($6106));
                var $6068 = $6108;
                break;
            case 'Kind.Term.var':
            case 'Kind.Term.typ':
            case 'Kind.Term.gol':
            case 'Kind.Term.hol':
            case 'Kind.Term.nat':
            case 'Kind.Term.chr':
            case 'Kind.Term.str':
                var $6109 = List$nil;
                var $6068 = $6109;
                break;
        };
        return $6068;
    };
    const Lsp$refs$go = x0 => x1 => x2 => Lsp$refs$go$(x0, x1, x2);

    function Lsp$refs$(_d$1) {
        var self = _d$1;
        switch (self._) {
            case 'Kind.Def.new':
                var $6111 = self.term;
                var $6112 = self.type;
                var $6113 = List$concat$(Lsp$refs$go$($6111, 0n, 0n), Lsp$refs$go$($6112, 0n, 0n));
                var $6110 = $6113;
                break;
        };
        return $6110;
    };
    const Lsp$refs = x0 => Lsp$refs$(x0);

    function Lsp$definition$(_uri$1, _offset$2, _defs$3) {
        var _ds$4 = Lsp$defs$(_defs$3, _uri$1);
        var _references$5 = List$flatten$(List$map$((_x$5 => {
            var $6115 = Lsp$refs$(_x$5);
            return $6115;
        }), _ds$4));
        var _matches$6 = List$filter$((_x$6 => {
            var self = _x$6;
            switch (self._) {
                case 'Lsp.Ref.new':
                    var $6117 = self.range;
                    var $6118 = ((_offset$2 >= Pair$fst$($6117)) && (_offset$2 <= Pair$snd$($6117)));
                    var $6116 = $6118;
                    break;
            };
            return $6116;
        }), _references$5);
        var self = _matches$6;
        switch (self._) {
            case 'List.cons':
                var $6119 = self.head;
                var self = $6119;
                switch (self._) {
                    case 'Lsp.Ref.new':
                        var $6121 = self.name;
                        var $6122 = Kind$get$(Kind$Name$read$($6121), _defs$3);
                        var $6120 = $6122;
                        break;
                };
                var $6114 = $6120;
                break;
            case 'List.nil':
                var $6123 = Maybe$none;
                var $6114 = $6123;
                break;
        };
        return $6114;
    };
    const Lsp$definition = x0 => x1 => x2 => Lsp$definition$(x0, x1, x2);

    function Lsp$Completion$new$(_label$1, _kind$2, _data$3) {
        var $6124 = ({
            _: 'Lsp.Completion.new',
            'label': _label$1,
            'kind': _kind$2,
            'data': _data$3
        });
        return $6124;
    };
    const Lsp$Completion$new = x0 => x1 => x2 => Lsp$Completion$new$(x0, x1, x2);
    const CompletionItemKind$Function = 3;

    function Lsp$on_completions$(_uri$1, _position$2, _defs$3) {
        var _names$4 = List$map$(Kind$Name$from_bits, Map$keys$(_defs$3));
        var $6125 = List$map$((_x$5 => {
            var $6126 = Lsp$Completion$new$(_x$5, CompletionItemKind$Function, _x$5);
            return $6126;
        }), _names$4);
        return $6125;
    };
    const Lsp$on_completions = x0 => x1 => x2 => Lsp$on_completions$(x0, x1, x2);
    const Kind = (() => {
        var __$1 = Kind$to_core$io$one;
        var __$2 = Kind$checker$io$one;
        var __$3 = Kind$checker$io$file;
        var __$4 = Kind$checker$code;
        var __$5 = Kind$Term$read;
        var __$6 = Lsp$diagnostics;
        var __$7 = Lsp$on_change;
        var __$8 = Lsp$definition;
        var __$9 = Lsp$on_completions;
        var $6127 = IO$monad$((_m$bind$10 => _m$pure$11 => {
            var $6128 = _m$pure$11;
            return $6128;
        }))(Unit$new);
        return $6127;
    })();
    return {
        '$main$': () => run(Kind),
        'run': run,
        'IO': IO,
        'IO.ask': IO$ask,
        'IO.bind': IO$bind,
        'IO.end': IO$end,
        'IO.monad': IO$monad,
        'Maybe': Maybe,
        'Map': Map,
        'Maybe.none': Maybe$none,
        'Map.get': Map$get,
        'Bits.e': Bits$e,
        'Bool.false': Bool$false,
        'Bool.and': Bool$and,
        'Bool.true': Bool$true,
        'Cmp.as_lte': Cmp$as_lte,
        'Cmp.ltn': Cmp$ltn,
        'Cmp.gtn': Cmp$gtn,
        'Word.cmp.go': Word$cmp$go,
        'Cmp.eql': Cmp$eql,
        'Word.cmp': Word$cmp,
        'Word.lte': Word$lte,
        'Nat.succ': Nat$succ,
        'Nat.zero': Nat$zero,
        'U16.lte': U16$lte,
        'U16.btw': U16$btw,
        'U16.new': U16$new,
        'Word.e': Word$e,
        'Word': Word,
        'Word.i': Word$i,
        'Word.o': Word$o,
        'Word.subber': Word$subber,
        'Word.sub': Word$sub,
        'U16.sub': U16$sub,
        'Nat.apply': Nat$apply,
        'Word.inc': Word$inc,
        'U16.inc': U16$inc,
        'Word.zero': Word$zero,
        'U16.zero': U16$zero,
        'Nat.to_u16': Nat$to_u16,
        'Word.adder': Word$adder,
        'Word.add': Word$add,
        'U16.add': U16$add,
        'Cmp.as_eql': Cmp$as_eql,
        'Word.eql': Word$eql,
        'U16.eql': U16$eql,
        'Bits.o': Bits$o,
        'Bits.i': Bits$i,
        'Word.to_bits': Word$to_bits,
        'Word.trim': Word$trim,
        'Bits.concat': Bits$concat,
        'Bits.reverse.tco': Bits$reverse$tco,
        'Bits.reverse': Bits$reverse,
        'Kind.Name.to_bits': Kind$Name$to_bits,
        'Kind.get': Kind$get,
        'IO.get_file': IO$get_file,
        'Parser.Reply': Parser$Reply,
        'Parser.Reply.value': Parser$Reply$value,
        'Parser.is_eof': Parser$is_eof,
        'Parser.Reply.error': Parser$Reply$error,
        'Parser': Parser,
        'Maybe.some': Maybe$some,
        'Parser.ErrorAt.new': Parser$ErrorAt$new,
        'Nat.gtn': Nat$gtn,
        'Parser.ErrorAt.combine': Parser$ErrorAt$combine,
        'Parser.first_of.go': Parser$first_of$go,
        'Parser.first_of': Parser$first_of,
        'List.cons': List$cons,
        'List': List,
        'List.nil': List$nil,
        'Parser.many.go': Parser$many$go,
        'Parser.many': Parser$many,
        'Unit.new': Unit$new,
        'String.cons': String$cons,
        'String.concat': String$concat,
        'String.flatten.go': String$flatten$go,
        'String.flatten': String$flatten,
        'String.nil': String$nil,
        'Parser.text.go': Parser$text$go,
        'Parser.text': Parser$text,
        'List.reverse.go': List$reverse$go,
        'List.reverse': List$reverse,
        'Parser.until.go': Parser$until$go,
        'Parser.until': Parser$until,
        'Parser.one': Parser$one,
        'Kind.Parser.spaces': Kind$Parser$spaces,
        'Parser.get_index': Parser$get_index,
        'Kind.Parser.init': Kind$Parser$init,
        'Parser.many1': Parser$many1,
        'Kind.Name.is_letter': Kind$Name$is_letter,
        'Kind.Parser.letter': Kind$Parser$letter,
        'List.fold': List$fold,
        'Kind.Parser.name1': Kind$Parser$name1,
        'Kind.Parser.text': Kind$Parser$text,
        'Parser.until1': Parser$until1,
        'Pair': Pair,
        'Parser.maybe': Parser$maybe,
        'Kind.Parser.item': Kind$Parser$item,
        'Kind.Parser.name': Kind$Parser$name,
        'Pair.new': Pair$new,
        'Kind.Parser.stop': Kind$Parser$stop,
        'Kind.Term.ori': Kind$Term$ori,
        'Kind.Term.typ': Kind$Term$typ,
        'Kind.Parser.type': Kind$Parser$type,
        'Kind.Term.all': Kind$Term$all,
        'Kind.Parser.forall': Kind$Parser$forall,
        'Kind.Term.lam': Kind$Term$lam,
        'Kind.Parser.make_lambda': Kind$Parser$make_lambda,
        'Kind.Parser.lambda': Kind$Parser$lambda,
        'Kind.Parser.lambda.erased': Kind$Parser$lambda$erased,
        'Kind.Parser.lambda.nameless': Kind$Parser$lambda$nameless,
        'Kind.Parser.parenthesis': Kind$Parser$parenthesis,
        'Kind.Term.ref': Kind$Term$ref,
        'Kind.Term.app': Kind$Term$app,
        'Kind.Term.hol': Kind$Term$hol,
        'Kind.Term.let': Kind$Term$let,
        'Kind.Parser.letforrange.u32': Kind$Parser$letforrange$u32,
        'Kind.Parser.letforin': Kind$Parser$letforin,
        'Kind.Parser.let': Kind$Parser$let,
        'Kind.Parser.get': Kind$Parser$get,
        'Kind.Term.def': Kind$Term$def,
        'Kind.Parser.def': Kind$Parser$def,
        'Kind.Parser.goal_rewrite': Kind$Parser$goal_rewrite,
        'Kind.Parser.if': Kind$Parser$if,
        'List.mapped': List$mapped,
        'Kind.backslash': Kind$backslash,
        'Kind.escapes': Kind$escapes,
        'Kind.Parser.char.single': Kind$Parser$char$single,
        'Kind.Term.chr': Kind$Term$chr,
        'Kind.Parser.char': Kind$Parser$char,
        'String.reverse.go': String$reverse$go,
        'String.reverse': String$reverse,
        'Kind.Parser.string.go': Kind$Parser$string$go,
        'Kind.Term.str': Kind$Term$str,
        'Kind.Parser.string': Kind$Parser$string,
        'Kind.Parser.pair': Kind$Parser$pair,
        'Kind.Parser.sigma.type': Kind$Parser$sigma$type,
        'Kind.Parser.some': Kind$Parser$some,
        'Kind.Parser.apply': Kind$Parser$apply,
        'Kind.Parser.mirror': Kind$Parser$mirror,
        'Kind.Name.read': Kind$Name$read,
        'Kind.Parser.list': Kind$Parser$list,
        'Kind.Parser.log': Kind$Parser$log,
        'Kind.Parser.forrange.u32': Kind$Parser$forrange$u32,
        'Kind.Parser.forrange.u32.2': Kind$Parser$forrange$u32$2,
        'Kind.Parser.forin': Kind$Parser$forin,
        'Kind.Parser.forin.2': Kind$Parser$forin$2,
        'Kind.Parser.do.statements': Kind$Parser$do$statements,
        'Kind.Parser.do': Kind$Parser$do,
        'Kind.Term.nat': Kind$Term$nat,
        'Kind.Term.unroll_nat': Kind$Term$unroll_nat,
        'U16.to_bits': U16$to_bits,
        'Kind.Term.unroll_chr.bits': Kind$Term$unroll_chr$bits,
        'Kind.Term.unroll_chr': Kind$Term$unroll_chr,
        'Kind.Term.unroll_str': Kind$Term$unroll_str,
        'Kind.Term.reduce': Kind$Term$reduce,
        'Map.new': Map$new,
        'Kind.Def.new': Kind$Def$new,
        'Kind.Status.init': Kind$Status$init,
        'Kind.Parser.case.with': Kind$Parser$case$with,
        'Kind.Parser.case.case': Kind$Parser$case$case,
        'Map.tie': Map$tie,
        'Map.set': Map$set,
        'Map.from_list': Map$from_list,
        'Pair.fst': Pair$fst,
        'Pair.snd': Pair$snd,
        'Kind.Term.cse': Kind$Term$cse,
        'Kind.Parser.case': Kind$Parser$case,
        'Kind.set': Kind$set,
        'Kind.Parser.open': Kind$Parser$open,
        'Parser.digit': Parser$digit,
        'Nat.add': Nat$add,
        'Nat.mul': Nat$mul,
        'Nat.from_base.go': Nat$from_base$go,
        'Nat.from_base': Nat$from_base,
        'Parser.nat': Parser$nat,
        'Bits.tail': Bits$tail,
        'Bits.inc': Bits$inc,
        'Nat.to_bits': Nat$to_bits,
        'Maybe.to_bool': Maybe$to_bool,
        'Kind.Term.gol': Kind$Term$gol,
        'Kind.Parser.goal': Kind$Parser$goal,
        'Kind.Parser.hole': Kind$Parser$hole,
        'Kind.Parser.u8': Kind$Parser$u8,
        'Kind.Parser.u16': Kind$Parser$u16,
        'Kind.Parser.u32': Kind$Parser$u32,
        'Kind.Parser.u64': Kind$Parser$u64,
        'Kind.Parser.nat': Kind$Parser$nat,
        'String.eql': String$eql,
        'Parser.fail': Parser$fail,
        'Kind.Parser.reference': Kind$Parser$reference,
        'List.for': List$for,
        'Kind.Parser.application': Kind$Parser$application,
        'Parser.spaces': Parser$spaces,
        'Parser.spaces_text': Parser$spaces_text,
        'Kind.Parser.application.erased': Kind$Parser$application$erased,
        'Kind.Parser.arrow': Kind$Parser$arrow,
        'Kind.Parser.op': Kind$Parser$op,
        'Kind.Parser.add': Kind$Parser$add,
        'Kind.Parser.sub': Kind$Parser$sub,
        'Kind.Parser.mul': Kind$Parser$mul,
        'Kind.Parser.div': Kind$Parser$div,
        'Kind.Parser.mod': Kind$Parser$mod,
        'Kind.Parser.cons': Kind$Parser$cons,
        'Kind.Parser.concat': Kind$Parser$concat,
        'Kind.Parser.string_concat': Kind$Parser$string_concat,
        'Kind.Parser.sigma': Kind$Parser$sigma,
        'Kind.Parser.equality': Kind$Parser$equality,
        'Kind.Parser.inequality': Kind$Parser$inequality,
        'Kind.Parser.rewrite': Kind$Parser$rewrite,
        'Kind.Term.ann': Kind$Term$ann,
        'Kind.Parser.annotation': Kind$Parser$annotation,
        'Kind.Parser.application.hole': Kind$Parser$application$hole,
        'Kind.Parser.suffix': Kind$Parser$suffix,
        'Kind.Parser.term': Kind$Parser$term,
        'Kind.Parser.name_term': Kind$Parser$name_term,
        'Kind.Binder.new': Kind$Binder$new,
        'Kind.Parser.binder.homo': Kind$Parser$binder$homo,
        'List.concat': List$concat,
        'List.flatten': List$flatten,
        'Kind.Parser.binder': Kind$Parser$binder,
        'List.length': List$length,
        'Kind.Parser.make_forall': Kind$Parser$make_forall,
        'List.at': List$at,
        'List.at_last': List$at_last,
        'Kind.Term.var': Kind$Term$var,
        'Kind.Context.get_name_skips': Kind$Context$get_name_skips,
        'Kind.Name.eql': Kind$Name$eql,
        'Kind.Context.find.go': Kind$Context$find$go,
        'Kind.Context.find': Kind$Context$find,
        'Kind.Path.o': Kind$Path$o,
        'Kind.Path.i': Kind$Path$i,
        'Kind.Path.to_bits': Kind$Path$to_bits,
        'Kind.Term.bind': Kind$Term$bind,
        'Kind.Status.done': Kind$Status$done,
        'Kind.define': Kind$define,
        'Kind.Parser.file.def': Kind$Parser$file$def,
        'Maybe.default': Maybe$default,
        'Kind.Constructor.new': Kind$Constructor$new,
        'Kind.Parser.constructor': Kind$Parser$constructor,
        'Kind.Datatype.new': Kind$Datatype$new,
        'Kind.Parser.datatype': Kind$Parser$datatype,
        'Kind.Datatype.build_term.motive.go': Kind$Datatype$build_term$motive$go,
        'Kind.Datatype.build_term.motive': Kind$Datatype$build_term$motive,
        'Kind.Datatype.build_term.constructor.go': Kind$Datatype$build_term$constructor$go,
        'Kind.Datatype.build_term.constructor': Kind$Datatype$build_term$constructor,
        'Kind.Datatype.build_term.constructors.go': Kind$Datatype$build_term$constructors$go,
        'Kind.Datatype.build_term.constructors': Kind$Datatype$build_term$constructors,
        'Kind.Datatype.build_term.go': Kind$Datatype$build_term$go,
        'Kind.Datatype.build_term': Kind$Datatype$build_term,
        'Kind.Datatype.build_type.go': Kind$Datatype$build_type$go,
        'Kind.Datatype.build_type': Kind$Datatype$build_type,
        'Kind.Constructor.build_term.opt.go': Kind$Constructor$build_term$opt$go,
        'Kind.Constructor.build_term.opt': Kind$Constructor$build_term$opt,
        'Kind.Constructor.build_term.go': Kind$Constructor$build_term$go,
        'Kind.Constructor.build_term': Kind$Constructor$build_term,
        'Kind.Constructor.build_type.go': Kind$Constructor$build_type$go,
        'Kind.Constructor.build_type': Kind$Constructor$build_type,
        'Kind.Parser.file.adt': Kind$Parser$file$adt,
        'Parser.eof': Parser$eof,
        'Kind.Parser.file.end': Kind$Parser$file$end,
        'Kind.Parser.file': Kind$Parser$file,
        'Either': Either,
        'String.join.go': String$join$go,
        'String.join': String$join,
        'Kind.highlight.end': Kind$highlight$end,
        'Maybe.extract': Maybe$extract,
        'Nat.is_zero': Nat$is_zero,
        'Nat.double': Nat$double,
        'Nat.pred': Nat$pred,
        'String.pad_right': String$pad_right,
        'String.pad_left': String$pad_left,
        'Either.left': Either$left,
        'Either.right': Either$right,
        'Nat.sub_rem': Nat$sub_rem,
        'Nat.div_mod.go': Nat$div_mod$go,
        'Nat.div_mod': Nat$div_mod,
        'Nat.to_base.go': Nat$to_base$go,
        'Nat.to_base': Nat$to_base,
        'Nat.mod.go': Nat$mod$go,
        'Nat.mod': Nat$mod,
        'Nat.lte': Nat$lte,
        'Nat.show_digit': Nat$show_digit,
        'Nat.to_string_base': Nat$to_string_base,
        'Nat.show': Nat$show,
        'Bool.not': Bool$not,
        'Kind.color': Kind$color,
        'Nat.eql': Nat$eql,
        'List.take': List$take,
        'Kind.highlight.tc': Kind$highlight$tc,
        'Kind.highlight': Kind$highlight,
        'Kind.Defs.read': Kind$Defs$read,
        'Kind.Synth.load.go': Kind$Synth$load$go,
        'Kind.Synth.files_of.make': Kind$Synth$files_of$make,
        'Char.eql': Char$eql,
        'String.starts_with': String$starts_with,
        'String.drop': String$drop,
        'String.length.go': String$length$go,
        'String.length': String$length,
        'String.split.go': String$split$go,
        'String.split': String$split,
        'Kind.Synth.files_of': Kind$Synth$files_of,
        'Kind.Synth.load': Kind$Synth$load,
        'Kind.Status.wait': Kind$Status$wait,
        'Kind.Check': Kind$Check,
        'Kind.Check.result': Kind$Check$result,
        'Kind.Error.undefined_reference': Kind$Error$undefined_reference,
        'Kind.Error.waiting': Kind$Error$waiting,
        'Kind.Error.indirect': Kind$Error$indirect,
        'Maybe.mapped': Maybe$mapped,
        'Kind.MPath.o': Kind$MPath$o,
        'Kind.MPath.i': Kind$MPath$i,
        'Kind.Error.patch': Kind$Error$patch,
        'Kind.MPath.to_bits': Kind$MPath$to_bits,
        'Kind.Error.type_mismatch': Kind$Error$type_mismatch,
        'Kind.Error.show_goal': Kind$Error$show_goal,
        'Kind.Term.normalize': Kind$Term$normalize,
        'List.tail': List$tail,
        'Kind.SmartMotive.vals.cont': Kind$SmartMotive$vals$cont,
        'Kind.SmartMotive.vals': Kind$SmartMotive$vals,
        'Kind.SmartMotive.nams.cont': Kind$SmartMotive$nams$cont,
        'Kind.SmartMotive.nams': Kind$SmartMotive$nams,
        'List.zip': List$zip,
        'Nat.gte': Nat$gte,
        'Nat.sub': Nat$sub,
        'Kind.Term.serialize.name': Kind$Term$serialize$name,
        'Kind.Term.serialize': Kind$Term$serialize,
        'Bits.eql': Bits$eql,
        'Kind.Term.identical': Kind$Term$identical,
        'Kind.SmartMotive.replace': Kind$SmartMotive$replace,
        'Kind.SmartMotive.make': Kind$SmartMotive$make,
        'Kind.Term.desugar_cse.motive': Kind$Term$desugar_cse$motive,
        'String.is_empty': String$is_empty,
        'Kind.Term.desugar_cse.argument': Kind$Term$desugar_cse$argument,
        'Maybe.or': Maybe$or,
        'Kind.Term.desugar_cse.cases': Kind$Term$desugar_cse$cases,
        'Kind.Term.desugar_cse': Kind$Term$desugar_cse,
        'Kind.Error.cant_infer': Kind$Error$cant_infer,
        'Set.has': Set$has,
        'Set.mut.has': Set$mut$has,
        'Kind.Term.equal.extra_holes.funari': Kind$Term$equal$extra_holes$funari,
        'Bool.or': Bool$or,
        'Kind.Term.has_holes': Kind$Term$has_holes,
        'Kind.Term.equal.hole': Kind$Term$equal$hole,
        'Kind.Term.equal.extra_holes.filler': Kind$Term$equal$extra_holes$filler,
        'Kind.Term.equal.extra_holes': Kind$Term$equal$extra_holes,
        'Set.set': Set$set,
        'Set.mut.set': Set$mut$set,
        'Bool.eql': Bool$eql,
        'Kind.Term.equal': Kind$Term$equal,
        'Set.new': Set$new,
        'Set.mut.new': Set$mut$new,
        'Kind.Term.check': Kind$Term$check,
        'Kind.Path.nil': Kind$Path$nil,
        'Kind.MPath.nil': Kind$MPath$nil,
        'List.is_empty': List$is_empty,
        'Kind.Term.patch_at': Kind$Term$patch_at,
        'Kind.Synth.fix': Kind$Synth$fix,
        'Kind.Status.fail': Kind$Status$fail,
        'Kind.Synth.one': Kind$Synth$one,
        'Map.map': Map$map,
        'Kind.Term.inline.names': Kind$Term$inline$names,
        'Kind.Term.inline.reduce': Kind$Term$inline$reduce,
        'Kind.Term.inline': Kind$Term$inline,
        'Map.values.go': Map$values$go,
        'Map.values': Map$values,
        'Kind.Core.var_name': Kind$Core$var_name,
        'Kind.Name.show': Kind$Name$show,
        'Bits.to_nat': Bits$to_nat,
        'U16.show_hex': U16$show_hex,
        'Kind.escape.char': Kind$escape$char,
        'Kind.escape.go': Kind$escape$go,
        'Kind.escape': Kind$escape,
        'Kind.Core.show': Kind$Core$show,
        'Kind.Defs.core': Kind$Defs$core,
        'Kind.to_core.io.one': Kind$to_core$io$one,
        'IO.put_string': IO$put_string,
        'IO.print': IO$print,
        'Maybe.bind': Maybe$bind,
        'Maybe.monad': Maybe$monad,
        'Kind.Term.show.as_nat.go': Kind$Term$show$as_nat$go,
        'Kind.Term.show.as_nat': Kind$Term$show$as_nat,
        'Kind.Term.show.is_ref': Kind$Term$show$is_ref,
        'Kind.Term.show.app.done': Kind$Term$show$app$done,
        'Kind.Term.show.app': Kind$Term$show$app,
        'Map.to_list.go': Map$to_list$go,
        'Map.to_list': Map$to_list,
        'Bits.chunks_of.go': Bits$chunks_of$go,
        'Bits.chunks_of': Bits$chunks_of,
        'Word.from_bits': Word$from_bits,
        'Kind.Name.from_bits': Kind$Name$from_bits,
        'Kind.Term.show.go': Kind$Term$show$go,
        'Kind.Term.show': Kind$Term$show,
        'Kind.Defs.report.types': Kind$Defs$report$types,
        'Map.keys.go': Map$keys$go,
        'Map.keys': Map$keys,
        'Kind.Error.relevant': Kind$Error$relevant,
        'Kind.Context.show': Kind$Context$show,
        'Kind.Term.expand_at': Kind$Term$expand_at,
        'Kind.Term.expand_ct': Kind$Term$expand_ct,
        'Kind.Term.expand': Kind$Term$expand,
        'Kind.Error.show': Kind$Error$show,
        'Kind.Error.origin': Kind$Error$origin,
        'Kind.Defs.report.errors': Kind$Defs$report$errors,
        'Kind.Defs.report': Kind$Defs$report,
        'Kind.checker.io.one': Kind$checker$io$one,
        'Kind.Synth.many': Kind$Synth$many,
        'Kind.Synth.file': Kind$Synth$file,
        'Kind.checker.io.file': Kind$checker$io$file,
        'IO.purify': IO$purify,
        'Kind.checker.code': Kind$checker$code,
        'Kind.Term.read': Kind$Term$read,
        'Lsp.Report.new': Lsp$Report$new,
        'List.pure': List$pure,
        'List.append': List$append,
        'List.map': List$map,
        'Lsp.diagnostics.make_report.go': Lsp$diagnostics$make_report$go,
        'Lsp.diagnostics.make_report': Lsp$diagnostics$make_report,
        'Lsp.Diagnostic.new': Lsp$Diagnostic$new,
        'U32.new': U32$new,
        'U32.inc': U32$inc,
        'U32.zero': U32$zero,
        'Nat.to_u32': Nat$to_u32,
        'Lsp.DiagnosticSeverity.Error': Lsp$DiagnosticSeverity$Error,
        'Lsp.DiagnosticSeverity.Warning': Lsp$DiagnosticSeverity$Warning,
        'Lsp.DiagnosticSeverity.Information': Lsp$DiagnosticSeverity$Information,
        'Lsp.severity': Lsp$severity,
        'Lsp.diagnostics': Lsp$diagnostics,
        'List.filter': List$filter,
        'Lsp.defs': Lsp$defs,
        'Map.delete': Map$delete,
        'Map.union': Map$union,
        'Lsp.on_change': Lsp$on_change,
        'Lsp.Ref.new': Lsp$Ref$new,
        'Lsp.refs.go': Lsp$refs$go,
        'Lsp.refs': Lsp$refs,
        'Lsp.definition': Lsp$definition,
        'Lsp.Completion.new': Lsp$Completion$new,
        'CompletionItemKind.Function': CompletionItemKind$Function,
        'Lsp.on_completions': Lsp$on_completions,
        'Kind': Kind,
    };
})();