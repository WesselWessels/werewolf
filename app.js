angular.module('gameApp', ['ngDialog'])
  .controller('GameController', function(ngDialog) {
    var gameControl = this;
    gameControl.testVariable = "HIHI"
    gameControl.showStart = true;
    gameControl.showGame = false;
    gameControl.players = [{name: "Wessel", role: "", selected: true}, {name: "Nina", role: "", selected: true}];
    
    gameControl.addPlayer = function(){
        if (gameControl.newPlayer != null){
             gameControl.players.push({name: gameControl.newPlayer, role: "", selected: true});
            gameControl.newPlayer = "";
        } 
    };
    
    gameControl.firstCard = "";
    gameControl.secondCard = "";
    gameControl.thirdCard = "";
    
    gameControl.roles = [{name: "Werewolf", selected: false},{name: "Werewolf", selected: false}, {name: "Minion", selected: false}, {name: "Mason", selected: false}, {name: "Mason", selected: false}, {name: "Seer", selected: false}, {name: "Robber", selected: false}, {name: "Troublemaker", selected: false}, {name: "Drunk", selected: false}, {name: "Insomniac", selected: false}, {name: "Villager", selected: false}, {name: "Villager", selected: false}, {name: "Villager", selected: false}, {name: "Hunter", selected: false}, {name: "Tanner", selected: false}];
    
    gameControl.selectedRoles = function(){
      var count = 0;
      angular.forEach(gameControl.roles, function(role){
         count += role.selected ? 1 : 0;
      });
      return count;    
    };
    
    gameControl.requiredRoles = function(){
        var count = 3;
        angular.forEach(gameControl.players, function(player){
           count += player.selected ? 1 : 0; 
        });
        return count;
    };
    
    gameControl.isReady = function(){
        if (gameControl.selectedRoles() == gameControl.requiredRoles()){
            return true;
        }
        else{
            return false;
        }
    };
    
    gameControl.actualPlayers = []
    
    gameControl.getSelectedRoles = function(){
        var roles = [];
        var players = [];
        var playerSplice = gameControl.players.slice(0);
        console.log(playerSplice);
        angular.forEach(gameControl.roles, function(role){
           if (role.selected == true){
               roles.push(role);
           } 
        });
        angular.forEach(playerSplice, function(player){
           if (player.selected == true){
               players.push({name:player.name, role: player.role, selected: false});
           } 
        });
        for (var i = 0; i < roles.length; i++){
            var ind = Math.floor(Math.random() * roles.length);
            var swap = roles[i];
            roles[i] = roles[ind];
            roles[ind] = swap;
        }
        for (var i = 0; i < players.length; i++){
            players[i].role = roles[i].name; 
           // players[i].selected = false;
        }
        console.log(roles[roles.length -1].name);
        console.log(roles[roles.length -2].name);
        console.log(roles[roles.length -3].name);
        players.push({name: "First Card", role: roles[roles.length -1].name, selected: false});
        players.push({name: "Second Card", role: roles[roles.length -2].name, selected: false});
        players.push({name: "Third Card", role: roles[roles.length -3].name, selected: false});
        gameControl.firstCard = roles[roles.length - 1];
        gameControl.secondCard = roles[roles.length - 2];
        gameControl.thirdCard = roles[roles.length - 3];

        return players;
    };
    
    gameControl.startGame = function(){
        if (gameControl.selectedRoles() == gameControl.requiredRoles()){
            gameControl.showStart = false;
            gameControl.showGame = true;
            gameControl.actualPlayers = gameControl.getSelectedRoles();
        }
      
       // console.log(gameControl.getSelectedRoles());
    
    };
    
    gameControl.getButtonClass = function(index){
      if (gameControl.actualPlayers[index].selected == true){
          return "btn-success";
      }  
        else{
            return "btn-warning";
        }
    };
    
    gameControl.selectPlayer = function(data){
        gameControl.actualPlayers[data].selected = !gameControl.actualPlayers[data].selected
        console.log(data);
    };
    
    gameControl.stopGame = function(){
        gameControl.showStart = true;
        gameControl.showGame = false;
    };
    
    gameControl.showButton = function(){
      var count = 0;
        angular.forEach(gameControl.actualPlayers, function(player){
           count += player.selected ? 1 : 0;
        });
        if (count > 0){
            return true;
        }
        else{
            return false;
        }              
    };
    
    gameControl.showSwitch = function(){
      var count = 0;
        angular.forEach(gameControl.actualPlayers, function(player){
           count += player.selected ? 1 : 0;
        });
        if (count == 2){
            return true;
        }
        else{
            return false;
        }         
    };
    
    gameControl.showButtonPressed = function(){
        var tempString = "";
        angular.forEach(gameControl.actualPlayers, function(player){
            if (player.selected == true){
                tempString += player.name + " is: " + player.role +"<br>";
            }
        });
       console.log("pressed");
        var dialog = ngDialog.open({
            template: '<p>'+tempString+'</p>',
            plain: true
        });
        dialog.closePromise.then(function(data){
           console.log("Dismissed"); 
            clearSelection();
        });
    };
    gameControl.switchButtonPressed = function(){
        var temp = [];
        var tempString = "";
        angular.forEach(gameControl.actualPlayers, function(player){
            if (player.selected == true){
                //tempString += player.name + " is: " + player.role +"<br>";
                temp.push(player);
            }
        });
        var tempRole = temp[0].role;
        temp[0].role = temp[1].role;
        temp[1].role = tempRole;
        tempString = "Switched " + temp[0].name +" and " + temp[1].name;
        var dialog = ngDialog.open({
            template: '<p>'+tempString+'</p>',
            plain: true
        });
        
         dialog.closePromise.then(function(data){
           console.log("Dismissed"); 
             clearSelection();
        });
    };
    
    function clearSelection(){
        console.log("pressed clear");
        angular.forEach(gameControl.actualPlayers, function(player){
            player.selected = false;
        });
    }
    
    gameControl.getRoleButtonClass = function(index){
        if (gameControl.roles[index].selected == true){
          return "btn-success";
      }  
        else{
            return "btn-warning";
        }
    };
    
     gameControl.roleButtonClicked = function(index){
        gameControl.roles[index].selected = !gameControl.roles[index].selected
       // console.log(data);
    };
    
  });