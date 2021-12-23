
(function( $ ){
	
    function qetQuerys(){
    let queryDict ={};
    location.search
    .substring(1)
    .split('&')
    .forEach((item) => {
            let param = item.split('=');
            queryDict[param[0]] = param[1];
    
});
    var all = new Object();
    all.ShopName;
    all.crt = queryDict.crt;
    all.code = queryDict.code;
    all.nominal = queryDict.nominal;
    all.NamePerson = queryDict.name;
        
        if(all.crt){
           var crt = all.crt.split('%');
      //  console.log(crt[1]);
        all.ShopName = crt[0];
        all.nominal = crt[1];  
            
            $('.error_img').remove();
            
        }else{
          $('.main_content').remove();
        }
        
        $('.NamePerson').text(all.NamePerson);
        $('.nominal').text(all.nominal + ' ');
//**********************ASHAN***************************
        if(all.ShopName == 'A'){
           
             if(all.ShopName == 'A'){
                 
              $('.novus').remove();
            $('.epic').remove();
            $('.wats').remove();

            }
            
            
            
            
            
//        ****************ГЕНЕРАІЯ QR************************************
            $.fn.qrcode = function(options) {
		// if options is string, 
		if( typeof options === 'string' ){
			options	= { text: all.code };
		}

		// set default values
		// typeNumber < 1 for automatic calculation
		options	= $.extend( {}, {
			render		: "canvas",
			width		: 156,
			height		: 156,
			typeNumber	: -1,
			correctLevel	: QRErrorCorrectLevel.H,
                        background      : "#ffffff",
                        foreground      : "#000000"
		}, options);

		var createCanvas	= function(){
			// create the qrcode itself
			var qrcode	= new QRCode(options.typeNumber, options.correctLevel);
			qrcode.addData(all.code);
			qrcode.make();

			// create canvas element
			var canvas	= document.createElement('canvas');
			canvas.width	= options.width;
			canvas.height	= options.height;
			var ctx		= canvas.getContext('2d');

			// compute tileW/tileH based on options.width/options.height
			var tileW	= options.width  / qrcode.getModuleCount();
			var tileH	= options.height / qrcode.getModuleCount();

			// draw in the canvas
			for( var row = 0; row < qrcode.getModuleCount(); row++ ){
				for( var col = 0; col < qrcode.getModuleCount(); col++ ){
					ctx.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background;
					var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW));
					var h = (Math.ceil((row+1)*tileH) - Math.floor(row*tileH));
					ctx.fillRect(Math.round(col*tileW),Math.round(row*tileH), w, h);  
				}	
			}
			// return just built canvas
			return canvas;
		}

		// from Jon-Carlos Rivera (https://github.com/imbcmdth)
		var createTable	= function(){
			// create the qrcode itself
			var qrcode	= new QRCode(options.typeNumber, options.correctLevel);
			qrcode.addData(options.text);
			qrcode.make();
			
			// create table element
			var $table	= $('<table></table>')
				.css("width", options.width+"px")
				.css("height", options.height+"px")
				.css("border", "0px")
				.css("border-collapse", "collapse")
				.css('background-color', options.background);
		  
			// compute tileS percentage
			var tileW	= options.width / qrcode.getModuleCount();
			var tileH	= options.height / qrcode.getModuleCount();

			// draw in the table
			for(var row = 0; row < qrcode.getModuleCount(); row++ ){
				var $row = $('<tr></tr>').css('height', tileH+"px").appendTo($table);
				
				for(var col = 0; col < qrcode.getModuleCount(); col++ ){
					$('<td></td>')
						.css('width', tileW+"px")
						.css('background-color', qrcode.isDark(row, col) ? options.foreground : options.background)
						.appendTo($row);
				}	
			}
			// return just built canvas
			return $table;
		}
  

		return this.each(function(){
			var element	= options.render == "canvas" ? createCanvas() : createTable();
			$(element).appendTo(this);
		});
	};
        }else{
           
            $.fn.qrcode = function() {
                 $('.ashan').css({
                'display':'none'
            });
            
            };
            
        }
        
        
        
        
        
        
        
        
        
        
    if( all.ShopName == 'W' || all.ShopName == 'N' || all.ShopName == 'E'){
        
        function generateBarcode(){
             all.code =all.code.substr(1,17);
               // console.log(all.code);
        var value = all.code;
            var btype;
            if(all.ShopName == 'W'){
              
            $('.novus').remove();
            $('.ashan').remove();
            $('.epic').remove();
                
                btype ='ean13';
            }else if (all.ShopName == 'N'){
                  $('.epic').remove();
            $('.ashan').remove();
            $('.wats').remove();
                btype = 'code128';
            }else if(all.ShopName == 'E'){
            $('.novus').remove();
            $('.ashan').remove();
            $('.wats').remove();
                btype = 'code128';};
         
        var renderer ='svg';

        var settings = {
          output:renderer,
          bgColor: '#FFFFFF',
          color: '#000000',
          barWidth: '2',
          barHeight: '30',
//          moduleSize: $("#moduleSize").val(),
//          posX: $("#posX").val(),
//          posY: $("#posY").val(),
          addQuietZone: $("#quietZoneSize").val()
        };
        if ($("#rectangular").is(':checked') || $("#rectangular").attr('checked')){
          value = {code:value, rect: true};
        }
        if (renderer == 'canvas'){
        //  clearCanvas();
          $("#barcodeTarget").hide();
          $("#canvasTarget").show().barcode(value, btype, settings);
        } else {
          $("#canvasTarget").hide();
          $("#barcodeTarget").html("").show().barcode(value, btype, settings);
        }
      }
          
      function showConfig1D(){
        $('.config .barcode1D').show();
        $('.config .barcode2D').hide();
      }
      
//      function showConfig2D(){
//        $('.config .barcode1D').hide();
//        $('.config .barcode2D').show();
//      }
      
//      function clearCanvas(){
//        var canvas = $('#canvasTarget');
//        var ctx = canvas.getContext('2d');
//        ctx.lineWidth = 1;
//        ctx.lineCap = 'butt';
//        ctx.fillStyle = '#FFFFFF';
//        ctx.strokeStyle  = '#000000';
//        ctx.clearRect (0, 0, canvas.width, canvas.height);
//        ctx.strokeRect (0, 0, canvas.width, canvas.height);
//      }
      
      $(function(){
        $(function(){
          if ($('.canvas').attr('id') == 'datamatrix') showConfig2D(); else showConfig1D();
        });
        $(function(){
          if ($('.canvas').attr('id') == 'canvas') $('#miscCanvas').show(); 
        });
        generateBarcode();
      });
        
  
  
    }

   
    return all;

    
}

qetQuerys()
    
    //************************штрих-код***********************************
     
  
})( jQuery );


 




