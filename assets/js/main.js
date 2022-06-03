'use strict';

//buttons 
let callBtn = $("#callBtn");


let pc;
let sendTo = callBtn.data('user');
let localStream;

//video element 
const localVideo = document.querySelector("#localVideo");
const remoteVideo = document.querySelector("#remoteVideo");

//meida info
const mediaConst = {
    video: true
};

function getConn(){
    if (!pc) {
        pc = new RTCPeerConnection();
    }
}

// ask for media inout from the user browser
async function getCam(){
    let mediaStream
    try {
        if (!pc) {
            await getConn();
        }
        mediaStream = await navigator.mediaDevices.getUserMedia(mediaConst);
        localVideo.srcObject = mediaStream
        localStream = mediaStream
        localStream.getTracks().forEach( track => pc.addTrack(track, localStream));
    } catch (error) {
        console.log(error);
    }
}

$('#callBtn').on('click', ()=>{
    getCam();
})

conn.onopen = e => {
    console.log("connected to web socket ");
}

conn.onmessage = e => {
    
}

const send = (type, data, sendTo)=>{
    conn.send(JSON.stringify({
        sendTo: sendTo,
        type: type,
        data: data
    }));
}

