(function($) {
	'use strict';
		let ModuleName = 'banner';
	
		let Module = function ( ele, options ) {
			this.ele = ele;
			this.$ele = $(ele);
			this.option = options;
		};
	
		Module.DEFAULTS = {
			// 設定一開始是否為開或合
			openAtStart: true, // [boolean] true | false
			// 設定啟動後是否要自動開或合，若設為false，就不要自勳開合；若為true是馬上自動開合；若為數字是幾毫秒之後開合
			autoToggle: true, // [boolean|number] true | false | 3000
			autoToggleTime: 3000,
			// 設定收合展開按鈕
			button: {
				closeText: '收合', // [string]
				openText: '展開', // [string]
				class: 'btn' // [string]
			},
			// 設定模組在各狀態時的class
			class: {
				closed: 'closed', // [string]
				closing: 'closing', // [string]
				opened: 'opened', // [string]
				opening: 'opening' // [string]
			},
			// 是否要有transition效果
			transition: true,
			transitionTime: 600,
			// 當有transition時，要執行的callback function
			callbackTime: 30,
			whenTransition: function() {
				console.log('whenTransition');
			}
		};

		Module.prototype.open = function () {
			$(this.$ele).removeClass('closed').addClass('opened');
			$(this.$ele).removeClass(this.option.class.closed).addClass(this.option.class.opening);
			$(this.$ele).children("button").html(this.option.button.closeText).toggleClass('show');
			for (let i=0;i<this.option.transitionTime;i+=this.option.transitionTime/this.option.callbackTime)
				setTimeout(() => { this.option.whenTransition() },i);
			setTimeout(() => { 
				$(this.$ele).removeClass(this.option.class.opening).addClass(this.option.class.opened) 
			},this.option.transitionTime);

			// console.log('this is a prototype open!!!');
			return;
		};
		
		Module.prototype.close = function () {
			$(this.$ele).removeClass('opened').addClass('closed');
			$(this.$ele).removeClass(this.option.class.opened).addClass(this.option.class.closing);
			$(this.$ele).children("button").html(this.option.button.openText).toggleClass('show');
			for (let i=0;i<this.option.transitionTime;i+=this.option.transitionTime/this.option.callbackTime)
				setTimeout(() => { this.option.whenTransition() },i);
			setTimeout(() => { 
				$(this.$ele).removeClass(this.option.class.closing).addClass(this.option.class.closed);
			},this.option.transitionTime);

			// console.log('this is a prototype close!!!');
			return;
		};

		Module.prototype.toggle = function () {
			// console.log(this);
			if ($(this.$ele).hasClass('opened')){
				this.close();
				return;
			}
			else ($(this.$ele).hasClass('closed'))
				this.open();
			// console.log('this is a prototype toggle!!!');
		};
	

		Module.prototype.set = function () {
			$(this.$ele).append('<button class="'+this.option.button.class+' "></button>');
			$(this.$ele).children("button").attr("onclick","$('.banner').banner('toggle')");
			
			if (typeof this.option.openAtStart === 'boolean'){
				$(this.$ele).addClass(this.option.openAtStart ? 'opened' : 'closed');
				$(this.$ele).children("button").html((this.option.openAtStart ? this.option.button.closeText  : this.option.button.openText ));
			}
				
			if (typeof this.option.autoToggle === 'boolean' && (this.option.autoToggle === true))
				setTimeout(() => { 
					this.toggle();
				},this.option.autoToggleTime);
			else if (typeof this.option.autoToggle === 'number')
				setTimeout(() => { 
					this.toggle();
				},this.option.autoToggle);

			if (typeof this.option.transitionTime === 'number' && this.option.transition){
				setTimeout(() => { 
					$(this.$ele).css("transition-duration",this.option.transitionTime+'ms');
					$(this.$ele).children("a").children("img").css("transition-duration",this.option.transitionTime+'ms');
				},1);	
			}
			else 
				Module.DEFAULTS.transitionTime = null;

			$(this.$ele).addClass(this.option.openAtStart ? this.option.class.opened : this.option.class.closed);

				
			
			
		};
	
		$.fn[ModuleName] = function (methods) {
			return this.each(function() {
				// console.log(Module, Module.DEFAULTS);
				Module.DEFAULTS = $.extend( {}, Module.DEFAULTS, ( typeof methods === 'object' && methods ));
				let module = new Module(this, Module.DEFAULTS);
				// console.log(module);
				// Do something to each element here.
				if ( !!module ) {
					if ( typeof methods === 'string') {
						module[methods]();
					} else if ( typeof methods === 'object' || typeof methods === 'undefined') {
						module.set();
					} else {
						// console.log('unsupported options!');
						// throw 'unsupported options!';
					}
				}
			});
		};
	
	})(jQuery);

//-----------------

$('.banner').banner({
	// openAtStart: false,
	autoToggle: 1000, 
	// class: {
	// 	closed: 'cccced', // [string]
	// 	closing: 'ccccing', // [string]
	// 	opened: 'ooooed', // [string]
	// 	opening: 'ooooing' // [string]
	// },
	
	// button: {
	// 	closeText: '閉', // [string]
	// 	openText: '開', // [string]
	// 	class: 'bbubbb' // [string]
	// },
	// transition: false,
	transitionTime: 600,
	callbackTime: 100,

});

// $('.banner').banner('toggle');

// $('.banner').banner('open');

// $('.banner').banner('close');