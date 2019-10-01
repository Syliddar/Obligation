function shuffle(sourceArray) {
  for (var i = 0; i < sourceArray.length - 1; i++) {
    var j = i + Math.floor(Math.random() * (sourceArray.length - i));

    var temp = sourceArray[j];
    sourceArray[j] = sourceArray[i];
    sourceArray[i] = temp;
  }
  return sourceArray;
}

$(document).ready(function() {
  $.getJSON("./data/data.json", function(data) {
    LoadData(data);
  });
});

function LoadData(data) {
  let totalCurrentObligation = 0;
  $.each(shuffle(data), function(key, value) {
    if (value != undefined) {
        console.log(value.CharacterName)
        console.log(value.Obligation)
      let characterName = value.CharacterName;
      let characterObligation = value.Obligation;
      let obligationStart = totalCurrentObligation + 1;
      let obligationEnd = totalCurrentObligation + characterObligation;
      totalCurrentObligation += characterObligation;
      let row =
        '<tr id="' +
        characterName +
        '"> <td> <input type="hidden" id="ObligationStart" value="' +
        obligationStart +
        '"/> <input type="hidden" id="ObligationEnd" value="' +
        obligationEnd +
        '"/>' +
        characterName +
        "</td> <td>" +
        characterObligation +
        "</td> <td>" +
        obligationStart +
        " - " +
        obligationEnd +
        "</td> </tr>";
      let editRow =
        '<div class="row char form-group"><div class="col"> <input type="text" class="form-control" value="' +
        characterName +
        '"/></div><div class="col"><input type="number" value="' +
        characterObligation +
        '" class="form-control" /></div></div>';
      $("#CharTable").append(row);
      $("#EditData").append(editRow);
    }
  });
}

function SaveData() {
    let characters = [];
    console.log(characters);
    $(".char").each(function(){
        let name = this.children[0].children[0].value;
        let obligation = parseInt(this.children[1].children[0].value, 10);
        let character = {CharacterName: name, Obligation: obligation};
        characters.push(character);
        console.log(characters);
    });
    console.log(characters);    
    $("#CharTable > tbody").empty();
    $("#EditData").empty();
    LoadData(characters);
}

function AddRow(){
  let editRow =
        '<div class="row char form-group"><div class="col"> <input type="text" class="form-control" value=""/></div><div class="col"><input type="number" value="" class="form-control" /></div></div>';
  $("#EditData").append(editRow);
}
function DelRow(){
  $("#EditData").children().last().remove();
}
function RollObligation() {
  clearStyles();
  var roll = Math.floor(Math.random() * 100) + 1;
  var obligationTriggered = false;
  $("#CharTable > tbody  > tr").each(function() {
    var start = $(this)
      .find("#ObligationStart")
      .val();
    var end = $(this)
      .find("#ObligationEnd")
      .val();
    if (roll >= start && roll <= end) {
      obligationTriggered = true;
      if (isCritical(roll)) {
        var Name = $(this).attr("id");
        if (Name == "MJ-12") {
          $("#Message").text(Name + " has a CRITICAL Toebligation!");
        } else {
          $("#Message").text(Name + " has a CRITICAL Obligation!");
        }
        $(this).addClass("table-danger");
      } else {
        $("#Message").text($(this).attr("id") + " has Obligation!");
        $(this).addClass("table-warning");
      }
    }
  });
  if (obligationTriggered == false) {
    $("#Message").text("Safe!");
  }
  $("#roll").text(": " + roll);
}

function clearTables(){
}


function clearStyles() {
  $("#CharTable > tbody  > tr").each(function() {
    $(this).removeClass("table-warning");
    $(this).removeClass("table-danger");
  });
}

function isCritical(roll) {
  if (
    roll == 11 ||
    roll == 22 ||
    roll == 33 ||
    roll == 44 ||
    roll == 55 ||
    roll == 66 ||
    roll == 77 ||
    roll == 88 ||
    roll == 99
  ) {
    return true;
  } else {
    return false;
  }
}
