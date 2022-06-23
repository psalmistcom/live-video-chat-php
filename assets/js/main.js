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

// what to receive from other client 
const options = {
    offerToReceiveVideo: 1,

}

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


async function createOffer(sendTo){
    await sendIceCandidate(sendTo);
    await pc.createOffer(options);
    await pc.setLocalDescription(pc.localDescription);
    send('client-offer', pc.localDescription, sendTo);
}

function sendIceCandidate(sendTo) {
    pc.onicecandidate = e => {
        if (e.candidate !== null) {
            //send ice candidate to other client
            send('client-candidate', e.candidate, sendTo);
        }
    }
}

$('#callBtn').on('click', ()=>{
    getCam();
    send('is-client-ready', null, sendTo);
})

conn.onopen = e => {
    console.log("connected to web socket ");
}

conn.onmessage = e => {
    let message = JSON.parse(e.data);
    let by = message.by;
    let data = message.data;
    let type = message.type;
    let profileImage = message.profileImage;
    let username = message.username;

}

function send(type, data, sendTo) {
     conn.send(JSON.stringify({
        sendTo: sendTo,
        type: type,
        data: data
    }));
}



