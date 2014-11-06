(function($){
/*
    @object config : {
        packType : int (0为黑客，1为公司)
        packSize : int (包的卡数)
    }
*/

function Pack(box,config){
    if(config == undefined || box == undefined){
        return false;
    }
    this.box = $(box);
    this.config = $.extend({},config||{});
    this.packType = config.packType || 0; //0为黑客，1为公司
    this.packSize = config.packSize || 20;
    this.cardList = [];
    this.init();
}
$.extend(Pack.prototype,{
    init : function(){
        //抽取卡片
        this.getCards();

    },
    getCards : function(){
        //从牌池中抽卡
        //拓展包数量
        var setNum = cardPool.length;
        var packSize = this.packSize;
        var packType = this.packType;
        var cardList = this.cardList;
        //抽卡
        for(var i=0; i<packSize; i++){
            //随机一个卡包
            var ran_set = Math.floor(Math.random() * setNum)
            var setLength = cardPool[ran_set].setCardList.length;
            //随机一张卡
            var ran_card = Math.floor(Math.random() * setLength);
            var card = cardPool[ran_set].setCardList[ran_card];
            if(card.type == packType){
                cardList.push(card);
            }
            else{
                i--;
            }
        }
        
    },
    viewCards : function(){
        //查看抽到的卡牌
        var cardList = [];
        var _cardList = this.cardList;
        for(var i=0; i<_cardList.length; i++){
            cardList.push(_cardList[i]);
        }
        //console.log(cardList)
        return cardList;
    },
    listCards : function(){
        //加载抽到的卡片
        var $box = this.box
        var tbody = $box.find("tbody");
        var cardList = this.cardList
        var html = "";
        for(var i=0; i < cardList.length; i++){
            html += '<tr cardId="' + i + '">'
                + '<td class="td_cardName">' + cardList[i].cardName + '</td>'
                + '<td>' + cardList[i].group + '</td>'
                + '<td>' + cardList[i].force + '</td>'
                + '<td><button class="deleteCard">选择</button></td>'
                + '</tr>'
        }
        tbody.html(html); 
    }

});

/*
    这里对外提供调用接口，对外提供接口方法

*/
$.Pack = function(box,config){
    var pack = new Pack(box,config);
    return {//对外提供接口
        viewCards : function(){pack.viewCards();},
        listCards : function(){pack.listCards();}
    }
}
})(Zepto)