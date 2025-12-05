const fileInput = document.getElementById("file")
const ctx = new AudioContext()
const p = document.getElementById("data")

fileInput.addEventListener("change",async e=>{
    let dataString = ""
    const buffer = await e.target.files[0].arrayBuffer()

    const converted = await ctx.decodeAudioData(buffer)

  

    for(let j=0;j<converted.numberOfChannels;j++){
        const buffer = converted.getChannelData(j);

        for(let i=0;i<buffer.length;i++){
            dataString += `\\x` + String.fromCharCode((Math.max(Math.min(buffer[i],1),-1)*128+127.5|0)).charCodeAt(0).toString(16).padStart(2,"0").substring(0,2)
        }
    }

    p.textContent = dataString
})