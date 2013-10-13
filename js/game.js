var HighFive = {};

    (function (root) {

        function Game() {
            this.boardSize = 24;
            this.matrix = new Array(this.boardSize);
            this.tmpMatrix = new Array();
            this.nextNodesStack = new Array();
            this.currentNodesList = new Array();
            this.gameInProgress = false;
            this.gameScore = 0;
            this.recordScore = 0;
			this.alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "R", "S", "T", "U", "W", "X", "Y", "Z" ]
			this.benahcmark = false;
        }

        function FastPlayer(n, e, s, w) {
            this.north = n;
            this.east = e;
            this.south = s;
            this.west = w;
        }

        function Player(n, e, s, w) {
            Object.defineProperty(this, "north", {
                get: function () { return nVal; },
                set: function (value) { nVal = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(this, "east", {
                get: function () { return eVal; },
                set: function (value) { eVal = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(this, "south", {
                get: function () { return sVal; },
                set: function (value) { sVal = value; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(this, "west", {
                get: function () { return wVal; },
                set: function (value) { wVal = value; },
                enumerable: true,
                configurable: true
            });
            var nVal = n;
            var eVal = e;
            var sVal = s;
            var wVal = w;
        }

        function Jodi(n, e, s, w) {
            FastPlayer.apply(this, arguments);
            this.name = "Jodi";
        }
        Jodi.prototype = new FastPlayer();

        function Mia(n, e, s, w) {
            FastPlayer.apply(this, arguments);
            this.name = "Mia";
        }
        Mia.prototype = new FastPlayer();

        Game.prototype.initialize = function () {
            // Allocate the game board array
            this.grid = document.getElementById('grid');
            this.grid.style.width = 16 * this.boardSize + 'px';
            //this.grid.style.height = 16 * this.boardSize;

            for (var i = 0; i < this.boardSize; i++) {
                this.matrix[i] = new Array(this.boardSize);
            }
			
        }

        Game.prototype.copyBenchMatrix = function () {
            // For stress testing, fill the board with a known pattern that can generate a fixed number of moves
            var basicMatrix = JSON.parse("[[[1,1,0,0],[0,1,1,0],[0,1,1,0],[0,1,1,0],[1,0,0,1],[0,0,1,1],[1,1,0,0],[1,0,0,1],[1,0,0,1],[1,1,0,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[0,1,1,0],[1,1,0,0],[0,0,1,1],[1,1,0,0],[0,1,1,0],[0,1,1,0],[0,1,1,0],[1,0,0,1],[0,0,1,1],[1,1,0,0],[1,0,0,1],[1,0,0,1],[1,1,0,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[0,1,1,0],[1,1,0,0],[0,0,1,1]],[[1,0,0,1],[1,1,0,0],[1,1,0,0],[0,1,1,0],[0,0,1,1],[1,0,0,1],[0,0,1,1],[1,1,0,0],[1,0,0,1],[1,0,0,1],[0,1,1,0],[0,0,1,1],[0,1,1,0],[1,0,0,1],[0,0,1,1],[1,1,0,0],[1,0,0,1],[1,1,0,0],[1,1,0,0],[0,1,1,0],[0,0,1,1],[1,0,0,1],[0,0,1,1],[1,1,0,0],[1,0,0,1],[1,0,0,1],[0,1,1,0],[0,0,1,1],[0,1,1,0],[1,0,0,1],[0,0,1,1],[1,1,0,0]],[[0,0,1,1],[1,1,0,0],[0,0,1,1],[1,1,0,0],[0,0,1,1],[0,0,1,1],[1,0,0,1],[0,0,1,1],[0,0,1,1],[0,1,1,0],[0,1,1,0],[1,1,0,0],[1,0,0,1],[1,1,0,0],[1,1,0,0],[1,0,0,1],[0,0,1,1],[1,1,0,0],[0,0,1,1],[1,1,0,0],[0,0,1,1],[0,0,1,1],[1,0,0,1],[0,0,1,1],[0,0,1,1],[0,1,1,0],[0,1,1,0],[1,1,0,0],[1,0,0,1],[1,1,0,0],[1,1,0,0],[1,0,0,1]],[[0,1,1,0],[0,0,1,1],[1,1,0,0],[1,1,0,0],[1,1,0,0],[1,0,0,1],[0,0,1,1],[0,0,1,1],[1,0,0,1],[1,0,0,1],[0,1,1,0],[1,1,0,0],[0,0,1,1],[1,1,0,0],[1,0,0,1],[1,1,0,0],[0,1,1,0],[0,0,1,1],[1,1,0,0],[1,1,0,0],[1,1,0,0],[1,0,0,1],[0,0,1,1],[0,0,1,1],[1,0,0,1],[1,0,0,1],[0,1,1,0],[1,1,0,0],[0,0,1,1],[1,1,0,0],[1,0,0,1],[1,1,0,0]],[[1,1,0,0],[1,0,0,1],[0,1,1,0],[1,1,0,0],[1,1,0,0],[1,1,0,0],[0,0,1,1],[1,1,0,0],[1,1,0,0],[0,1,1,0],[1,0,0,1],[0,1,1,0],[0,0,1,1],[0,0,1,1],[1,1,0,0],[1,1,0,0],[1,1,0,0],[1,0,0,1],[0,1,1,0],[1,1,0,0],[1,1,0,0],[1,1,0,0],[0,0,1,1],[1,1,0,0],[1,1,0,0],[0,1,1,0],[1,0,0,1],[0,1,1,0],[0,0,1,1],[0,0,1,1],[1,1,0,0],[1,1,0,0]],[[0,1,1,0],[1,0,0,1],[0,0,1,1],[1,1,0,0],[0,1,1,0],[1,0,0,1],[0,1,1,0],[0,1,1,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[0,1,1,0],[0,0,1,1],[0,0,1,1],[0,1,1,0],[1,1,0,0],[0,1,1,0],[1,0,0,1],[0,0,1,1],[1,1,0,0],[0,1,1,0],[1,0,0,1],[0,1,1,0],[0,1,1,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[0,1,1,0],[0,0,1,1],[0,0,1,1],[0,1,1,0],[1,1,0,0]],[[1,1,0,0],[1,1,0,0],[0,0,1,1],[0,1,1,0],[1,1,0,0],[1,0,0,1],[1,1,0,0],[1,1,0,0],[1,1,0,0],[0,1,1,0],[0,0,1,1],[1,0,0,1],[0,1,1,0],[0,0,1,1],[0,0,1,1],[0,1,1,0],[1,1,0,0],[1,1,0,0],[0,0,1,1],[0,1,1,0],[1,1,0,0],[1,0,0,1],[1,1,0,0],[1,1,0,0],[1,1,0,0],[0,1,1,0],[0,0,1,1],[1,0,0,1],[0,1,1,0],[0,0,1,1],[0,0,1,1],[0,1,1,0]],[[1,1,0,0],[1,0,0,1],[1,1,0,0],[0,1,1,0],[0,0,1,1],[0,0,1,1],[1,1,0,0],[1,1,0,0],[1,1,0,0],[0,1,1,0],[0,0,1,1],[0,0,1,1],[1,1,0,0],[0,1,1,0],[0,1,1,0],[0,0,1,1],[1,1,0,0],[1,0,0,1],[1,1,0,0],[0,1,1,0],[0,0,1,1],[0,0,1,1],[1,1,0,0],[1,1,0,0],[1,1,0,0],[0,1,1,0],[0,0,1,1],[0,0,1,1],[1,1,0,0],[0,1,1,0],[0,1,1,0],[0,0,1,1]],[[1,1,0,0],[0,0,1,1],[1,1,0,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[0,1,1,0],[0,0,1,1],[1,0,0,1],[0,1,1,0],[0,0,1,1],[0,0,1,1],[1,1,0,0],[1,1,0,0],[0,1,1,0],[1,0,0,1],[1,1,0,0],[0,0,1,1],[1,1,0,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[0,1,1,0],[0,0,1,1],[1,0,0,1],[0,1,1,0],[0,0,1,1],[0,0,1,1],[1,1,0,0],[1,1,0,0],[0,1,1,0],[1,0,0,1]],[[0,0,1,1],[1,1,0,0],[0,1,1,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[1,1,0,0],[1,1,0,0],[1,0,0,1],[1,1,0,0],[0,0,1,1],[1,1,0,0],[1,1,0,0],[0,0,1,1],[1,0,0,1],[0,1,1,0],[0,0,1,1],[1,1,0,0],[0,1,1,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[1,1,0,0],[1,1,0,0],[1,0,0,1],[1,1,0,0],[0,0,1,1],[1,1,0,0],[1,1,0,0],[0,0,1,1],[1,0,0,1],[0,1,1,0]],[[1,0,0,1],[1,1,0,0],[1,0,0,1],[0,0,1,1],[1,0,0,1],[1,0,0,1],[1,1,0,0],[1,1,0,0],[1,0,0,1],[1,1,0,0],[1,0,0,1],[0,0,1,1],[0,1,1,0],[0,1,1,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[1,1,0,0],[1,0,0,1],[0,0,1,1],[1,0,0,1],[1,0,0,1],[1,1,0,0],[1,1,0,0],[1,0,0,1],[1,1,0,0],[1,0,0,1],[0,0,1,1],[0,1,1,0],[0,1,1,0],[1,0,0,1],[0,1,1,0]],[[0,0,1,1],[1,1,0,0],[0,1,1,0],[0,0,1,1],[0,1,1,0],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,1,0,0],[0,1,1,0],[1,0,0,1],[0,0,1,1],[1,0,0,1],[0,1,1,0],[0,1,1,0],[0,0,1,1],[1,1,0,0],[0,1,1,0],[0,0,1,1],[0,1,1,0],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,1,0,0],[0,1,1,0],[1,0,0,1],[0,0,1,1],[1,0,0,1],[0,1,1,0],[0,1,1,0]],[[1,0,0,1],[0,1,1,0],[0,1,1,0],[0,0,1,1],[1,0,0,1],[1,1,0,0],[1,0,0,1],[1,0,0,1],[0,0,1,1],[1,1,0,0],[1,1,0,0],[1,0,0,1],[0,1,1,0],[1,1,0,0],[1,1,0,0],[1,1,0,0],[1,0,0,1],[0,1,1,0],[0,1,1,0],[0,0,1,1],[1,0,0,1],[1,1,0,0],[1,0,0,1],[1,0,0,1],[0,0,1,1],[1,1,0,0],[1,1,0,0],[1,0,0,1],[0,1,1,0],[1,1,0,0],[1,1,0,0],[1,1,0,0]],[[0,0,1,1],[0,1,1,0],[0,1,1,0],[1,1,0,0],[0,1,1,0],[1,0,0,1],[1,1,0,0],[0,1,1,0],[0,1,1,0],[1,1,0,0],[1,0,0,1],[0,0,1,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[0,0,1,1],[0,1,1,0],[0,1,1,0],[1,1,0,0],[0,1,1,0],[1,0,0,1],[1,1,0,0],[0,1,1,0],[0,1,1,0],[1,1,0,0],[1,0,0,1],[0,0,1,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1]],[[1,1,0,0],[1,0,0,1],[1,1,0,0],[0,0,1,1],[1,0,0,1],[1,1,0,0],[0,1,1,0],[1,1,0,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[1,0,0,1],[0,1,1,0],[0,1,1,0],[1,1,0,0],[1,0,0,1],[1,1,0,0],[0,0,1,1],[1,0,0,1],[1,1,0,0],[0,1,1,0],[1,1,0,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[1,0,0,1],[0,1,1,0],[0,1,1,0]],[[0,0,1,1],[0,1,1,0],[0,1,1,0],[0,0,1,1],[0,1,1,0],[1,0,0,1],[1,1,0,0],[1,1,0,0],[1,1,0,0],[1,0,0,1],[0,0,1,1],[1,1,0,0],[1,1,0,0],[0,0,1,1],[1,1,0,0],[1,1,0,0],[0,0,1,1],[0,1,1,0],[0,1,1,0],[0,0,1,1],[0,1,1,0],[1,0,0,1],[1,1,0,0],[1,1,0,0],[1,1,0,0],[1,0,0,1],[0,0,1,1],[1,1,0,0],[1,1,0,0],[0,0,1,1],[1,1,0,0],[1,1,0,0]],[[1,1,0,0],[0,1,1,0],[0,1,1,0],[0,1,1,0],[1,0,0,1],[0,0,1,1],[1,1,0,0],[1,0,0,1],[1,0,0,1],[1,1,0,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[0,1,1,0],[1,1,0,0],[0,0,1,1],[1,1,0,0],[0,1,1,0],[0,1,1,0],[0,1,1,0],[1,0,0,1],[0,0,1,1],[1,1,0,0],[1,0,0,1],[1,0,0,1],[1,1,0,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[0,1,1,0],[1,1,0,0],[0,0,1,1]],[[1,0,0,1],[1,1,0,0],[1,1,0,0],[0,1,1,0],[0,0,1,1],[1,0,0,1],[0,0,1,1],[1,1,0,0],[1,0,0,1],[1,0,0,1],[0,1,1,0],[0,0,1,1],[0,1,1,0],[1,0,0,1],[0,0,1,1],[1,1,0,0],[1,0,0,1],[1,1,0,0],[1,1,0,0],[0,1,1,0],[0,0,1,1],[1,0,0,1],[0,0,1,1],[1,1,0,0],[1,0,0,1],[1,0,0,1],[0,1,1,0],[0,0,1,1],[0,1,1,0],[1,0,0,1],[0,0,1,1],[1,1,0,0]],[[0,0,1,1],[1,1,0,0],[0,0,1,1],[1,1,0,0],[0,0,1,1],[0,0,1,1],[1,0,0,1],[0,0,1,1],[0,0,1,1],[0,1,1,0],[0,1,1,0],[1,1,0,0],[1,0,0,1],[1,1,0,0],[1,1,0,0],[1,0,0,1],[0,0,1,1],[1,1,0,0],[0,0,1,1],[1,1,0,0],[0,0,1,1],[0,0,1,1],[1,0,0,1],[0,0,1,1],[0,0,1,1],[0,1,1,0],[0,1,1,0],[1,1,0,0],[1,0,0,1],[1,1,0,0],[1,1,0,0],[1,0,0,1]],[[0,1,1,0],[0,0,1,1],[1,1,0,0],[1,1,0,0],[1,1,0,0],[1,0,0,1],[0,0,1,1],[0,0,1,1],[1,0,0,1],[1,0,0,1],[0,1,1,0],[1,1,0,0],[0,0,1,1],[1,1,0,0],[1,0,0,1],[1,1,0,0],[0,1,1,0],[0,0,1,1],[1,1,0,0],[1,1,0,0],[1,1,0,0],[1,0,0,1],[0,0,1,1],[0,0,1,1],[1,0,0,1],[1,0,0,1],[0,1,1,0],[1,1,0,0],[0,0,1,1],[1,1,0,0],[1,0,0,1],[1,1,0,0]],[[1,1,0,0],[1,0,0,1],[0,1,1,0],[1,1,0,0],[1,1,0,0],[1,1,0,0],[0,0,1,1],[1,1,0,0],[1,1,0,0],[0,1,1,0],[1,0,0,1],[0,1,1,0],[0,0,1,1],[0,0,1,1],[1,1,0,0],[1,1,0,0],[1,1,0,0],[1,0,0,1],[0,1,1,0],[1,1,0,0],[1,1,0,0],[1,1,0,0],[0,0,1,1],[1,1,0,0],[1,1,0,0],[0,1,1,0],[1,0,0,1],[0,1,1,0],[0,0,1,1],[0,0,1,1],[1,1,0,0],[1,1,0,0]],[[0,1,1,0],[1,0,0,1],[0,0,1,1],[1,1,0,0],[0,1,1,0],[1,0,0,1],[0,1,1,0],[0,1,1,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[0,1,1,0],[0,0,1,1],[0,0,1,1],[0,1,1,0],[1,1,0,0],[0,1,1,0],[1,0,0,1],[0,0,1,1],[1,1,0,0],[0,1,1,0],[1,0,0,1],[0,1,1,0],[0,1,1,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[0,1,1,0],[0,0,1,1],[0,0,1,1],[0,1,1,0],[1,1,0,0]],[[1,1,0,0],[1,1,0,0],[0,0,1,1],[0,1,1,0],[1,1,0,0],[1,0,0,1],[1,1,0,0],[1,1,0,0],[1,1,0,0],[0,1,1,0],[0,0,1,1],[1,0,0,1],[0,1,1,0],[0,0,1,1],[0,0,1,1],[0,1,1,0],[1,1,0,0],[1,1,0,0],[0,0,1,1],[0,1,1,0],[1,1,0,0],[1,0,0,1],[1,1,0,0],[1,1,0,0],[1,1,0,0],[0,1,1,0],[0,0,1,1],[1,0,0,1],[0,1,1,0],[0,0,1,1],[0,0,1,1],[0,1,1,0]],[[1,1,0,0],[1,0,0,1],[1,1,0,0],[0,1,1,0],[0,0,1,1],[0,0,1,1],[1,1,0,0],[1,1,0,0],[1,1,0,0],[0,1,1,0],[0,0,1,1],[0,0,1,1],[1,1,0,0],[0,1,1,0],[0,1,1,0],[0,0,1,1],[1,1,0,0],[1,0,0,1],[1,1,0,0],[0,1,1,0],[0,0,1,1],[0,0,1,1],[1,1,0,0],[1,1,0,0],[1,1,0,0],[0,1,1,0],[0,0,1,1],[0,0,1,1],[1,1,0,0],[0,1,1,0],[0,1,1,0],[0,0,1,1]],[[1,1,0,0],[0,0,1,1],[1,1,0,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[0,1,1,0],[0,0,1,1],[1,0,0,1],[0,1,1,0],[0,0,1,1],[0,0,1,1],[1,1,0,0],[1,1,0,0],[0,1,1,0],[1,0,0,1],[1,1,0,0],[0,0,1,1],[1,1,0,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[0,1,1,0],[0,0,1,1],[1,0,0,1],[0,1,1,0],[0,0,1,1],[0,0,1,1],[1,1,0,0],[1,1,0,0],[0,1,1,0],[1,0,0,1]],[[0,0,1,1],[1,1,0,0],[0,1,1,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[1,1,0,0],[1,1,0,0],[1,0,0,1],[1,1,0,0],[0,0,1,1],[1,1,0,0],[1,1,0,0],[0,0,1,1],[1,0,0,1],[0,1,1,0],[0,0,1,1],[1,1,0,0],[0,1,1,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[1,1,0,0],[1,1,0,0],[1,0,0,1],[1,1,0,0],[0,0,1,1],[1,1,0,0],[1,1,0,0],[0,0,1,1],[1,0,0,1],[0,1,1,0]],[[1,0,0,1],[1,1,0,0],[1,0,0,1],[0,0,1,1],[1,0,0,1],[1,0,0,1],[1,1,0,0],[1,1,0,0],[1,0,0,1],[1,1,0,0],[1,0,0,1],[0,0,1,1],[0,1,1,0],[0,1,1,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[1,1,0,0],[1,0,0,1],[0,0,1,1],[1,0,0,1],[1,0,0,1],[1,1,0,0],[1,1,0,0],[1,0,0,1],[1,1,0,0],[1,0,0,1],[0,0,1,1],[0,1,1,0],[0,1,1,0],[1,0,0,1],[0,1,1,0]],[[0,0,1,1],[1,1,0,0],[0,1,1,0],[0,0,1,1],[0,1,1,0],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,1,0,0],[0,1,1,0],[1,0,0,1],[0,0,1,1],[1,0,0,1],[0,1,1,0],[0,1,1,0],[0,0,1,1],[1,1,0,0],[0,1,1,0],[0,0,1,1],[0,1,1,0],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,1,0,0],[0,1,1,0],[1,0,0,1],[0,0,1,1],[1,0,0,1],[0,1,1,0],[0,1,1,0]],[[1,0,0,1],[0,1,1,0],[0,1,1,0],[0,0,1,1],[1,0,0,1],[1,1,0,0],[1,0,0,1],[1,0,0,1],[0,0,1,1],[1,1,0,0],[1,1,0,0],[1,0,0,1],[0,1,1,0],[1,1,0,0],[1,1,0,0],[1,1,0,0],[1,0,0,1],[0,1,1,0],[0,1,1,0],[0,0,1,1],[1,0,0,1],[1,1,0,0],[1,0,0,1],[1,0,0,1],[0,0,1,1],[1,1,0,0],[1,1,0,0],[1,0,0,1],[0,1,1,0],[1,1,0,0],[1,1,0,0],[1,1,0,0]],[[0,0,1,1],[0,1,1,0],[0,1,1,0],[1,1,0,0],[0,1,1,0],[1,0,0,1],[1,1,0,0],[0,1,1,0],[0,1,1,0],[1,1,0,0],[1,0,0,1],[0,0,1,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[0,0,1,1],[0,1,1,0],[0,1,1,0],[1,1,0,0],[0,1,1,0],[1,0,0,1],[1,1,0,0],[0,1,1,0],[0,1,1,0],[1,1,0,0],[1,0,0,1],[0,0,1,1],[1,0,0,1],[1,0,0,1],[1,0,0,1],[1,0,0,1]],[[1,1,0,0],[1,0,0,1],[1,1,0,0],[0,0,1,1],[1,0,0,1],[1,1,0,0],[0,1,1,0],[1,1,0,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[1,0,0,1],[0,1,1,0],[0,1,1,0],[1,1,0,0],[1,0,0,1],[1,1,0,0],[0,0,1,1],[1,0,0,1],[1,1,0,0],[0,1,1,0],[1,1,0,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[0,1,1,0],[1,0,0,1],[1,0,0,1],[0,1,1,0],[0,1,1,0]],[[0,0,1,1],[0,1,1,0],[0,1,1,0],[0,0,1,1],[0,1,1,0],[1,0,0,1],[1,1,0,0],[1,1,0,0],[1,1,0,0],[1,0,0,1],[0,0,1,1],[1,1,0,0],[1,1,0,0],[0,0,1,1],[1,1,0,0],[1,1,0,0],[0,0,1,1],[0,1,1,0],[0,1,1,0],[0,0,1,1],[0,1,1,0],[1,0,0,1],[1,1,0,0],[1,1,0,0],[1,1,0,0],[1,0,0,1],[0,0,1,1],[1,1,0,0],[1,1,0,0],[0,0,1,1],[1,1,0,0],[1,1,0,0]]]");
            var letter, number, elID, turn;
            
            for (var i = 0; i < this.boardSize; i++)
                for (var j = 0; j < this.boardSize; j++) {
                    letter = String.fromCharCode(j + 65);
                    number = i;
                    elID = '#' + letter + number;
                    var x = $(elID);
                    newClass = '';
                    oldClass = '';
                    turn = true;
                    if((basicMatrix[j][i][0]) && (basicMatrix[j][i][1])) {
                        if($(elID).hasClass('imageClass1')){
                            turn = false;
                        } else if ($(elID).hasClass('imageClass2')){
                            var newClass = 'imageClass1';
                            var oldClass = 'imageClass2';
                        } else if ($(elID).hasClass('imageClass3')){
                            var newClass = 'imageClass1';
                            var oldClass = 'imageClass3';
                        } else if ($(elID).hasClass('imageClass4')){
                            var newClass = 'imageClass1';
                            var oldClass = 'imageClass4';
                        } 
                    } else if((basicMatrix[j][i][1]) && (basicMatrix[j][i][2])) {
                        if($(elID).hasClass('imageClass1')){
                            var newClass = 'imageClass2';
                            var oldClass = 'imageClass1';
                        } else if ($(elID).hasClass('imageClass2')){
                            turn = false;
                        } else if ($(elID).hasClass('imageClass3')){
                            var newClass = 'imageClass2';
                            var oldClass = 'imageClass3';
                        } else if ($(elID).hasClass('imageClass4')){
                            var newClass = 'imageClass2';
                            var oldClass = 'imageClass4';
                        } 
                    } else if((basicMatrix[j][i][2]) && (basicMatrix[j][i][3])) {
                        if($(elID).hasClass('imageClass1')){
                            var newClass = 'imageClass3';
                            var oldClass = 'imageClass1';
                        } else if ($(elID).hasClass('imageClass2')){
                            var newClass = 'imageClass3';
                            var oldClass = 'imageClass2';
                        } else if ($(elID).hasClass('imageClass3')){
                            turn = false;
                        } else if ($(elID).hasClass('imageClass4')){
                            var newClass = 'imageClass3';
                            var oldClass = 'imageClass4';
                        } 
                    } else if((basicMatrix[j][i][3]) && (basicMatrix[j][i][0])) {
                        if($(elID).hasClass('imageClass1')){
                            var newClass = 'imageClass4';
                            var oldClass = 'imageClass1';
                        } else if ($(elID).hasClass('imageClass2')){
                            var newClass = 'imageClass4';
                            var oldClass = 'imageClass2';
                        } else if ($(elID).hasClass('imageClass3')){
                            var newClass = 'imageClass4';
                            var oldClass = 'imageClass3';
                        } else if ($(elID).hasClass('imageClass4')){
                            turn = false;
                        } 
                    }
                    if (turn)
                        $(elID).removeClass(oldClass).addClass(newClass);
                    
                    if (j % 2 == 0) {
                        this.matrix[j][i] = new Jodi(basicMatrix[j][i][0], basicMatrix[j][i][1], basicMatrix[j][i][2], basicMatrix[j][i][3]);
                    } else {
                        this.matrix[j][i] = new Mia(basicMatrix[j][i][0], basicMatrix[j][i][1], basicMatrix[j][i][2], basicMatrix[j][i][3]);
                    }
                }
        }

        Game.prototype.fillDefaultBoard = function () {
            // Create player objects for each node of the game board array
            var tmp;
            for (var i = 0; i < this.boardSize; i++) {
                for (var j = 0; j < this.boardSize; j++) {
					this.el = document.createElement('img');
                    tmp = Math.floor(Math.random() * 4);
					if((tmp === 1) || (tmp === 2))
						this.el.setAttribute('src','images/0001_Jodi-NE.png');
					else
						this.el.setAttribute('src','images/Mia_NE.png');
					
					this.el.style.msGridRow = i + 1
					this.el.style.msGridColumn = j + 1;
					this.el.id = this.alpha[i] + j;
					classTmp = tmp + 1;
					var classVal = 'imageClass' + classTmp;
					var idSearch = '#' + this.alpha[i] + j
					this.grid.appendChild(this.el);
					$(idSearch).addClass(classVal);
					this.el.addEventListener('click', root.game.onTouch);
					
                    if (tmp == 0) {
                        this.matrix[j][i] = new Jodi(1, 1, 0, 0);
                    }
                    if (tmp == 1) {
                        this.matrix[j][i] = new Jodi(0, 1, 1, 0);
                    }
                    if (tmp == 2) {
                        this.matrix[j][i] = new Mia(0, 0, 1, 1);
                    }
                    if (tmp == 3) {
                        this.matrix[j][i] = new Mia(1, 0, 0, 1);
                    }

                }
            }
        }

        Game.prototype.onTouch = function () {
            // Add the x, y co-ordinates of the nodes touched to nextNodesStack
            // Hard coded below for stress perf measurement

            if(root.game.benchmarkMode == true){
//                root.game.copyBenchMatrix();
                root.game.nextNodesStack.push([Math.floor(Math.random() * root.game.boardSize), Math.floor(Math.random() * root.game.boardSize)]);

                root.game.gameInProgress = true;
                root.game.gameScore = 1;
                root.game.runGame();
            } else {
                root.game.nextNodesStack.push([this.style.msGridRow - 1, this.style.msGridColumn - 1]);
                root.game.gameScore = 1;
                root.game.runGame();
            }
        }

        Game.prototype.runGame = function () {
            // Transfer objects to be moved to currentNodesList to rotate chains of neighbors together
            while (root.game.nextNodesStack[0]) {
                root.game.currentNodesList.push(root.game.nextNodesStack.pop());
            }
            //Check neighbors to be rotated 
            root.game.currentNodesList.forEach(root.game.checkNeighbors);

            // Rotate and animate
            root.game.currentNodesList.forEach(root.game.rotateFast);
            root.game.commitRotationFast();
            root.game.fireAnimation(root.game.currentNodesList);

            // Logic for continuing or finishing the game
			if(root.game.benchmarkMode == false){
				if (root.game.nextNodesStack[0]) {
					timeout(root.game.runGame);
				} else {
					root.game.gameInProgress = true;
				}
			} else {
				if(root.game.nextNodesStack[0])
					timeout(root.game.runGame);
				else {
					root.game.gameScore = 0;
					root.game.nextNodesStack.push([Math.floor(Math.random() * root.game.boardSize), Math.floor(Math.random() * root.game.boardSize)]);
					timeout(root.game.runGame);
				}
			}

            $("#gameScore").text(root.game.gameScore);
        }

        function timeout(animate) {
            requestAnimationFrame(animate);
            //animate();
        }	

        Game.prototype.checkNeighbors = function (node) {
            var x = node[0]; //represents the x co-ordinate of the player
            var y = node[1]; //represents the y co-ordinate of the player

            //North & West arms exist for the player and the player on it's right resp.
            if (((x + 1) < root.game.boardSize) && (root.game.matrix[x][y].north && root.game.matrix[x + 1][y].west) && !root.game.alreadyInStack(x + 1, y)) {

                root.game.nextNodesStack.push([x + 1, y]);
                root.game.gameScore++;
            }
            //East & North arms exist for the player and the player below it resp.  
            if (((y + 1) < root.game.boardSize) && (root.game.matrix[x][y].east && root.game.matrix[x][y + 1].north) && !root.game.alreadyInStack(x, y + 1)) {
                root.game.nextNodesStack.push([x, y + 1]);
                root.game.gameScore++;
            }
            //South & East arms exist for the player and the player on it's left resp.
            if (((x - 1) >= 0) && (root.game.matrix[x][y].south && root.game.matrix[x - 1][y].east) && !root.game.alreadyInStack(x - 1, y)) {
                root.game.nextNodesStack.push([x - 1, y]);
                root.game.gameScore++;
            }
            //West & South arms exist on the element and element above it resp.  
            if (((y - 1) >= 0) && (root.game.matrix[x][y].west && root.game.matrix[x][y - 1].south) && !root.game.alreadyInStack(x, y - 1)) {
                root.game.nextNodesStack.push([x, y - 1]);
                root.game.gameScore++;
            }
        }

        Game.prototype.alreadyInStack = function (x, y) {
            // Check if a neighbor is already in stack
            var present = false;
            this.nextNodesStack.forEach(function (node) {
                if ((node[0] == x) && (node[1] == y))
                    present = true;
            });
            return present;
        }

        Game.prototype.rotate = function (node) {
            //Generate the data for 90 degree shifts and add it to tmpMatrix
            var x = node[0];
            var y = node[1];
            if (root.game.matrix[x][y]["north"] && root.game.matrix[x][y]["east"]) {
                root.game.tmpMatrix.push([x, y, "ES", 1]);
            } else if (root.game.matrix[x][y]["east"] && root.game.matrix[x][y]["south"]) {
                root.game.tmpMatrix.push([x, y, "SW", 1]);
            } else if (root.game.matrix[x][y]["south"] && root.game.matrix[x][y]["west"]) {
                root.game.tmpMatrix.push([x, y, "WN", 1]);
            } else if (root.game.matrix[x][y]["west"] && root.game.matrix[x][y]["north"]) {
                root.game.tmpMatrix.push([x, y, "NE", 1]);
            }
        }

        Game.prototype.rotateFast = function (node) {
            //Generate the data for 90 degree shifts and add it to tmpMatrix
            var x = node[0];
            var y = node[1];
            if (root.game.matrix[x][y].north && root.game.matrix[x][y].east) {
                root.game.tmpMatrix.push([x, y, "north", 0]);
                root.game.tmpMatrix.push([x, y, "south", 1]);
            } else if (root.game.matrix[x][y].east && root.game.matrix[x][y].south) {
                root.game.tmpMatrix.push([x, y, "east", 0]);
                root.game.tmpMatrix.push([x, y, "west", 1]);
            } else if (root.game.matrix[x][y].south && root.game.matrix[x][y].west) {
                root.game.tmpMatrix.push([x, y, "south", 0]);
                root.game.tmpMatrix.push([x, y, "north", 1]);
            } else if (root.game.matrix[x][y].west && root.game.matrix[x][y].north) {
                root.game.tmpMatrix.push([x, y, "west", 0]);
                root.game.tmpMatrix.push([x, y, "east", 1]);
            }
        }

        Game.prototype.commitRotation = function () {
            // Commit the rotation by updating the co-ordinates
            var node = this.tmpMatrix.pop();
            while (node) {
                if (node[2] == "NE") {
                    if (this.matrix[node[0]][node[1]].name == "Jodi") {
                        this.matrix[node[0]][node[1]] = new Jodi(1, 1, 0, 0);
                    } else {
                        this.matrix[node[0]][node[1]] = new Mia(1, 1, 0, 0);
                    }
                } else if (node[2] == "ES") {
                    if (this.matrix[node[0]][node[1]].name == "Jodi") {
                        this.matrix[node[0]][node[1]] = new Jodi(0, 1, 1, 0);
                    } else {
                        this.matrix[node[0]][node[1]] = new Mia(0, 1, 1, 0);
                    }
                } else if (node[2] == "SW") {
                    if (this.matrix[node[0]][node[1]].name == "Jodi") {
                        this.matrix[node[0]][node[1]] = new Jodi(0, 0, 1, 1);
                    } else {
                        this.matrix[node[0]][node[1]] = new Mia(0, 0, 1, 1);
                    }
                } else if (node[2] == "WN") {
                    if (this.matrix[node[0]][node[1]].name == "Jodi") {
                        this.matrix[node[0]][node[1]] = new Jodi(1, 0, 0, 1);
                    } else {
                        this.matrix[node[0]][node[1]] = new Mia(1, 0, 0, 1);
                    }
                }
                node = this.tmpMatrix.pop();
            }
        }

        Game.prototype.commitRotationFast = function () {
            // Commit the rotation by updating the co-ordinates
            var node = this.tmpMatrix.pop();
            while (node) {
                if (node[2] == "north") {
                    this.matrix[node[0]][node[1]].north = node[3];
                } else if (node[2] == "east") {
                    this.matrix[node[0]][node[1]].east = node[3];
                } else if (node[2] == "south") {
                    this.matrix[node[0]][node[1]].south = node[3];
                } else if (node[2] == "west") {
                    this.matrix[node[0]][node[1]].west = node[3];
                }
                node = this.tmpMatrix.pop();
            }
        }

        Game.prototype.fireAnimation = function (nodeList) {
            var node = nodeList.pop();
            var letter, number, elID, turn;
            while (node) {
                letter = String.fromCharCode(node[0] + 65);
                number = node[1];
                elID = '#' + letter + number;
                var x = $(elID);
                newClass = '';
                oldClass = '';
                turn = true;
                // CSS animations stripped out
                if((this.matrix[node[0]][node[1]].north) && (this.matrix[node[0]][node[1]].east)) {
                    if($(elID).hasClass('imageClass1')){
                        turn = false;
                    } else if ($(elID).hasClass('imageClass2')){
                        var newClass = 'imageClass1';
                        var oldClass = 'imageClass2';
                    } else if ($(elID).hasClass('imageClass3')){
                        var newClass = 'imageClass1';
                        var oldClass = 'imageClass3';
                    } else if ($(elID).hasClass('imageClass4')){
                        var newClass = 'imageClass1';
                        var oldClass = 'imageClass4';
                    } 
                } else if((this.matrix[node[0]][node[1]].east) && (this.matrix[node[0]][node[1]].south)) {
                    if($(elID).hasClass('imageClass1')){
                        var newClass = 'imageClass2';
                        var oldClass = 'imageClass1';
                    } else if ($(elID).hasClass('imageClass2')){
                        turn = false;
                    } else if ($(elID).hasClass('imageClass3')){
                        var newClass = 'imageClass2';
                        var oldClass = 'imageClass3';
                    } else if ($(elID).hasClass('imageClass4')){
                        var newClass = 'imageClass2';
                        var oldClass = 'imageClass4';
                    } 
                } else if((this.matrix[node[0]][node[1]].south) && (this.matrix[node[0]][node[1]].west)) {
                    if($(elID).hasClass('imageClass1')){
                        var newClass = 'imageClass3';
                        var oldClass = 'imageClass1';
                    } else if ($(elID).hasClass('imageClass2')){
                        var newClass = 'imageClass3';
                        var oldClass = 'imageClass2';
                    } else if ($(elID).hasClass('imageClass3')){
                        turn = false;
                    } else if ($(elID).hasClass('imageClass4')){
                        var newClass = 'imageClass3';
                        var oldClass = 'imageClass4';
                    } 
                } else if((this.matrix[node[0]][node[1]].west) && (this.matrix[node[0]][node[1]].north)) {
                    if($(elID).hasClass('imageClass1')){
                        var newClass = 'imageClass4';
                        var oldClass = 'imageClass1';
                    } else if ($(elID).hasClass('imageClass2')){
                        var newClass = 'imageClass4';
                        var oldClass = 'imageClass2';
                    } else if ($(elID).hasClass('imageClass3')){
                        var newClass = 'imageClass4';
                        var oldClass = 'imageClass3';
                    } else if ($(elID).hasClass('imageClass4')){
                        turn = false;
                    } 
                }
                if (turn)
                    $(elID).removeClass(oldClass).addClass(newClass);
                node = nodeList.pop();
            }
            //Update record score
            if (this.gameScore > this.recordScore) {
                this.recordScore = this.gameScore;
            }
        }

        root.game = new Game();

    })(HighFive);