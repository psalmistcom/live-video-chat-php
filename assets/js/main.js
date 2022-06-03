'use strict';

//buttons 
let callBtn = $("#callBtn");


let pc;
let sendTo = callBtn.data('user');
let localStream;

//video element 
const localVideo = document.querySelector("#localVideo");
const remoteVideo = document.querySelector("#remoteVideo");


function getConn(){
    if (!pc) {
        pc = new RTCPeerConnection();
    }
}