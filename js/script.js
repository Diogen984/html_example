$(function(){
	var list = $('#list'),
		input = $('#namevalue'),
		add = $('#add'),
		remove = $('#delete'),
        sort_value = $('#sort-value'),
        sort_name = $('#sort-name'),
        xml_button = $('#xml');
			
	function Item() {
		this.data = []; // items collection
	}
	
	function Template() {
		this.name = undefined;
		this.value = undefined;
	}
	
	Item.prototype.add = function () {
		var self = this;
		add.click(function(e) {
			e.preventDefault();
			if(self.check(input.val())) {
				list.append('<li><a href="#">' + input.val().replace(/\s+/g, '') + '</a></li>');
				self.refresh();
			}
		});
	};
	
	Item.prototype.remove = function() {
		var self = this;
		remove.on('click', function(e) {
			e.preventDefault();
			list.find('.selected').remove();
			self.refresh();
		});
	};
	
	Item.prototype.refresh = function () {
		var self = this;
		
		self.data.length = 0;
		for( var i = 0 ; i < this.data.length ; i++) {
			self.data[i] = undefined;
		}
		list.find('li').each(function(i){
			if(self.check($(this).text())) {
				var str_m = $(this).text().replace(/\s+/g, '').split('=');
				var new_item = new Template(i);

				new_item.value = str_m[1];
				new_item.name = str_m[0];
				self.data.push(new_item);
			} else {
				$(this).remove();
			}
		});
	};

	Item.prototype.validateCode = function(item) {
		var tcode = item;
		if( /[^a-zA-Z0-9]/.test( tcode ) ) {
		   return false;
		}
		return true;
	};

	Item.prototype.check = function(str) {
		var self = this;
			str = str.replace(/\s+/g, '');

		var str_m = str.split('=');
		if((str_m.length > 1) && (str_m.length <= 2)) {
			if((self.validateCode(str_m[0]) == true) && (self.validateCode(str_m[1]) == true)) {
				return true;
			}
		}
		return false;
	};

	Item.prototype.sortName = function() {
        var self = this;
        sort_name.on('click', function(e) {
            e.preventDefault();
            var a = self.data;
            var f1 = function(a, b) {
                var v1 = a.name;
                var v2 = b.name;

                if (v1 === v2) {
                    return 0;
                } else if(v1 > v2) {
                    return 1;
                } else {
                    return -1;
                }
            };
            var b = a.sort(f1);
            self.renewSelect();
        });
	};

	Item.prototype.sortValue = function() {
        var self = this;
        sort_value.on('click', function(e) {
            e.preventDefault();
            var a = self.data;
			//comparison data
            var f1 = function(a, b) {
                var v1 = a.value;
                var v2 = b.value;

                if (v1 === v2) {
                    return 0;
                } else if(v1 > v2) {
                    return 1;
                } else {
                    return -1;
                }
            };
            a.sort(f1);
            self.renewSelect();
        });
	};

    Item.prototype.renewSelect = function() {
        var self = this;
        list.html('');
        for(var i = 0 ; i < self.data.length ; i++) {
            list.append('<li><a href="#">' + self.data[i].name + '=' + self.data[i].value + ' </a></li>');
        }
        self.refresh();
    };

    Item.prototype.XML = function () {
        var self = this;
        xml_button.on('click', function(e) {
            e.preventDefault();

            var xml = '<dataBlock>\t\n';
            for(var key in self.data) {
                var item = self.data[key];
                xml = xml.concat('<data>\t\n<name>' + item.name + '</name>\t\n<value>' + item.value + '</value>\t\n</data>\t\n');
            }
            xml = xml.concat('</dataBlock>\t\n');
            alert(xml);
        });
    };
	
	Item.prototype.select = function() {
		var self = this;
		list.on('click', 'a', function(e) {
			e.preventDefault();
			$(this).closest('li').toggleClass('selected');
		});
	};
	Item.prototype.init = function() {
		this.select();
		this.refresh();
		base.add();
		base.remove();
		base.sortName();
		base.sortValue();
		base.XML();
	};
	/* start */
	var base = new Item();
	base.init();
});
