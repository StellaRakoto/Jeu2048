(function($){
    $.fn.jeu2048 = function(){
        
        function createTable(){
    
            table = $("<table></table>");
            var rows = new Number($("#rowcount").val());
            var cols = new Number ($("#columncount").val());
        
            for(var i=0; i<rows; i++){
        
                var row = $("<tr></tr>").appendTo(table);
        
                for(var j=0; j<cols; j++){
                    $("<td></td>").attr({x: j, y: i}).appendTo(row).attr("value", "0").attr("attr", "empty").attr("merge", "off");
                }
            }
            table.appendTo(".genereJeu");
        }

        function color(){
            
            for(var j=0; j<4; j++){          
                for(var i=0; i<4; i++){

                    var cell = $("td[x="+i+"][y="+j+"]"); 
                    var cell_value = parseInt(cell.attr("value")); 

                    if (cell_value == 2){cell.css({"background" : "#e0e0eb"})} //tons bleu/gris
                    if (cell_value == 4){cell.css({"background" : "#c1c1d7"})} 
                    if (cell_value == 8){cell.css({"background" : "#9292b9"})} 
                    if (cell_value == 16){cell.css({"background" : "#fff2cc"})}//tons rose gold 
                    if (cell_value == 32){cell.css({"background" : "#ffe699"})} 
                    if (cell_value == 64){cell.css({"background" : "#ffd966"})} 
                    if (cell_value == 128){cell.css({"background" : "#ffeb99"})} //tons jaune
                    if (cell_value == 256){cell.css({"background" : "#ffe066"})} 
                    if (cell_value == 512){cell.css({"background" : "#ffd11a"})} 
                    if (cell_value == 1024){cell.css({"background" : "#28283e", "color" : "#e0e0eb"})} // tons bleu marine
                    if (cell_value == 2048){cell.css({"background" : "#000000", "color" : "#e0e0eb"})} 
                }
            } 
        }

        // function gameOver(){
        //     for(var j=0; j<4; j++){          
        //         for(var i=0; i<4; i++){

        //             var cell = $("td[x="+i+"][y="+j+"]"); //catch cell
        //             var cell_value = parseInt(cell.attr("value")); //catch value of cell 

        //             if (cell_value !== 0 && cell.attr("attr") === "full"){
        //                 console.log("gameOver");
        //             }
                    
                    
        //         }
        //     }
        // }


        function resetMerge(){ //réinitialise toute les cases qui ont merge après chaque mouvement
            
            for(var j=0; j<4; j++){          
                for(var i=0; i<4; i++){
                    ($("td[x="+i+"][y="+j+"]")).attr("merge", "off").css({"background" : "#ffe6ee"});
                }
            }
        }
        
        function valueRandom(){// REMPLIT CASE VIDE DE MANIERE ALEATOIRE
            
            var value = [2, 2, 2, 2, 2, 2, 2, 4, 4, 4];
            var randomValueIndex = Math.floor(Math.random() * value.length);  // EGALE A MA VALEUR RANDOM  //console.log(value[randomValueIndex]);
            
            var empty = $("td:empty"); //collection d'objet de <td> = empty
            var randomIdIndex = Math.floor(Math.random() * empty.length); // EGALE A MA DIV VIDE RANDOM // console.log(empty[randomIdIndex]);
            // $("td:empty").each(function(){ 
            //     console.log($(this).attr("id"));
            // });
                $(empty[randomIdIndex]).text(value[randomValueIndex]).attr("value", value[randomValueIndex]).attr("attr", "full"); //remplie div empty avec value random ET modif son attribut "empty" en "full"
        }


        //POSSIBILITES DE FACTORISER
        var score = 0;
        $(document).keydown(function(event){
            //  $("div").html("Key: " + event.which);
            //  console.log(event.which);
        
            var movement = false;
        
            if (event.which === 40){ //si touch vers le haut est pressée 

                for (var i=0; i<4; i++){

                    for (var j=3; j>=0; j--){ 

                        for(var z=j+1; z < 4; z++){

                            var cell = $("td[x="+i+"][y="+j+"]"); //catch cell
                            var cell_value = parseInt(cell.attr("value")); //catch value of cell 
                            
                            //COLLISION                           
                            if ((parseInt($("td[x="+i+"][y="+z+"]").attr("value"))) === 0 && (cell_value !== 0)){ //si z est vide et que i = valeur
                        
                                $("td[x="+i+"][y="+z+"]").text(cell_value).attr("value", cell_value).attr("attr", "full");
                                cell.text("").attr("value", 0).attr("attr", "empty");
                                j++;
                                cell = $("td[x="+i+"][y="+j+"]"); //recatch nvelle cell
                                cell_value = parseInt(cell.attr("value"));

                                movement = true;
                            }

                            // MERGE
                            else if(z === j+1 && (parseInt($("td[x="+i+"][y="+z+"]").attr("value"))) !== 0 && (cell_value === (parseInt($("td[x="+i+"][y="+z+"]").attr("value")))) && (($("td[x="+i+"][y="+z+"]").attr("merge")) === "off")){

                                var new_value = cell_value * 2;// console.log("new value =", new_value);

                                $("td[x="+i+"][y="+z+"]").text(new_value).attr("value", new_value).attr("attr", "full").attr("merge", "on");
                                cell.text("").attr("value", 0).attr("attr", "empty");   
                                
                                movement = true;
                                score += new_value;
                            }
                        }
                    }       
                }
                resetMerge();
                if (movement === true){
                    valueRandom(); 
                }
                
            }

            else if (event.which === 38){ //si touch vers le bas 

                for (var i=0; i<4; i++){
                    
                    for (var j=1; j<4; j++){ 

                        for(var z=j-1; z > -1; z--){

                            var cell = $("td[x="+i+"][y="+j+"]"); //catch cell
                            var cell_value = parseInt(cell.attr("value")); //catch value of cell 
                            
                            //COLLISION                           
                            if ((parseInt($("td[x="+i+"][y="+z+"]").attr("value"))) === 0 && (cell_value !== 0)){ //si z est vide et que i = valeur
                        
                                $("td[x="+i+"][y="+z+"]").text(cell_value).attr("value", cell_value).attr("attr", "full");
                                cell.text("").attr("value", 0).attr("attr", "empty");
                                j--;
                                cell = $("td[x="+i+"][y="+j+"]"); //recatch nvelle cell
                                cell_value = parseInt(cell.attr("value"));

                                movement = true;
                            }

                            // MERGE
                            else if(z === j-1 && (parseInt($("td[x="+i+"][y="+z+"]").attr("value"))) !== 0 && (cell_value === (parseInt($("td[x="+i+"][y="+z+"]").attr("value")))) && (($("td[x="+i+"][y="+z+"]").attr("merge")) === "off")){

                                var new_value = cell_value * 2;

                                $("td[x="+i+"][y="+z+"]").text(new_value).attr("value", new_value).attr("attr", "full").attr("merge", "on");
                                cell.text("").attr("value", 0).attr("attr", "empty");   
                                
                                movement = true;
                                score += new_value;
                            }
                        }
                    }       
                }
                resetMerge();

                if (movement === true){
                    valueRandom(); 
                } 
            }

            else if (event.which === 39){ //si touch vers la droite
                
                for (var j=0; j<4; j++){
                    
                    for (var i=3; i>=0; i--){ 

                        for(var z=i+1; z < 4; z++){

                            var cell = $("td[x="+i+"][y="+j+"]"); //catch cell
                            var cell_value = parseInt(cell.attr("value")); //catch value of cell 
                            
                            //COLLISION                           
                            if ((parseInt($("td[x="+z+"][y="+j+"]").attr("value"))) === 0 && (cell_value !== 0)){ 
                        
                                $("td[x="+z+"][y="+j+"]").text(cell_value).attr("value", cell_value).attr("attr", "full");
                                cell.text("").attr("value", 0).attr("attr", "empty");
                                i++;
                                cell = $("td[x="+i+"][y="+j+"]"); //recatch nvelle cell
                                cell_value = parseInt(cell.attr("value"));

                                movement = true;
                            }

                            // MERGE
                            else if(z === i+1 && (parseInt($("td[x="+z+"][y="+j+"]").attr("value"))) !== 0 && (cell_value === (parseInt($("td[x="+z+"][y="+j+"]").attr("value")))) && (($("td[x="+z+"][y="+j+"]").attr("merge")) === "off")){

                                var new_value = cell_value * 2;

                                $("td[x="+z+"][y="+j+"]").text(new_value).attr("value", new_value).attr("attr", "full").attr("merge", "on");
                                cell.text("").attr("value", 0).attr("attr", "empty");  
                                
                                movement = true;
                                score += new_value;
                            }
                        }
                    }       
                }
                resetMerge(); 

                if (movement === true){
                    valueRandom(); 
                }
            }

            else if (event.which === 37){ //si touch vers la gauche 
 
                for (var j=0; j<4; j++){//compteur qui parcours ligne; j=y;
                    
                    for (var i=1; i<4; i++){ //compteur qui parcours colonne; i=x
                        
                        for(var z=i-1; z > -1; z--){//compteur qui parcours colonne à l'envers; z=i

                            var cell = $("td[x="+i+"][y="+j+"]"); //catch cell
                            var cell_value = parseInt(cell.attr("value")); //catch value of cell 
                            
                            //COLLISION                           
                            if ((parseInt($("td[x="+z+"][y="+j+"]").attr("value"))) === 0 && (cell_value !== 0)){ //si z est vide et que i = valeur
                        
                                $("td[x="+z+"][y="+j+"]").text(cell_value).attr("value", cell_value).attr("attr", "full");
                                cell.text("").attr("value", 0).attr("attr", "empty");
                                i--;
                                cell = $("td[x="+i+"][y="+j+"]"); //recatch nvelle cell
                                cell_value = parseInt(cell.attr("value"));

                                movement = true;
                            }

                            // MERGE
                            else if(z === i-1 && (parseInt($("td[x="+z+"][y="+j+"]").attr("value"))) !== 0 && (cell_value === (parseInt($("td[x="+z+"][y="+j+"]").attr("value")))) && (($("td[x="+z+"][y="+j+"]").attr("merge")) === "off")){

                                var new_value = cell_value * 2;//console.log("new value =", new_value);

                                $("td[x="+z+"][y="+j+"]").text(new_value).attr("value", new_value).attr("attr", "full").attr("merge", "on");
                                cell.text("").attr("value", 0).attr("attr", "empty");   
                                
                                movement = true;
                                score += new_value;  
                            }                        
                        }
                    }       
                }
                resetMerge();

                if (movement === true){
                    valueRandom(); 
                }
            }
            $(".score").text("Score "+score+"");
            color();

            // if ($("table td[attr]" === "full")){
            //     console.log("game over");
            // }
        });

        $("#create").click(function(){
            createTable();
            valueRandom();
            valueRandom();
            color();
        });

        return this;
    };
})(jQuery);

