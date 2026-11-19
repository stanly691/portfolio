import json,pathlib,subprocess,time,os,hashlib
import numpy as np,soundfile as sf,imageio_ffmpeg
from kokoro_onnx import Kokoro
os.environ['OMP_NUM_THREADS']='4'
root=pathlib.Path.cwd();cache=root/'.cache/voice';cache.mkdir(parents=True,exist_ok=True);out=root/'itcs/public/assets/alison/voice';out.mkdir(parents=True,exist_ok=True)
lines=json.loads(subprocess.check_output(['node','--input-type=module','-e',"import {conversations} from './itcs/src/conversations.js';console.log(JSON.stringify(conversations.flatMap((c,i)=>c.flatMap((e,j)=>e.map((l,k)=>({id:i+'-'+j+'-'+k,text:l[0]}))))));"],text=True,encoding='utf-8'))
lines.insert(0,{"id":"welcome-0","text":'Hello, I’m Alison. I can help your team with customer enquiries, sales follow-ups and everyday tasks. Choose a business and a conversation to see how we could work together.'})
model=Kokoro(str(cache/'kokoro.onnx'),str(cache/'voices.bin'));ffmpeg=imageio_ffmpeg.get_ffmpeg_exe();manifest={}
for i,line in enumerate(lines):
 target=out/(line['id']+'.mp3');env=out/(line['id']+'.json')
 key=hashlib.sha256(json.dumps({'text':line['text'],'voice':'bf_emma','lang':'en-gb','speed':1.0},sort_keys=True).encode()).hexdigest()
 if target.exists() and env.exists():
  saved=json.loads(env.read_text())
  if saved.get('contentHash')==key:manifest[line['id']]=saved;continue
 audio,sr=model.create(line['text'],voice='bf_emma',lang='en-gb',speed=1.0)
 wav=cache/(line['id']+'.wav');sf.write(wav,audio,sr)
 subprocess.run([ffmpeg,'-loglevel','error','-y','-i',str(wav),'-codec:a','libmp3lame','-b:a','80k',str(target)],check=True)
 hop=int(sr*.04);levels=np.array([np.sqrt(np.mean(audio[j:j+hop]**2)) for j in range(0,len(audio),hop)]);denom=max(float(np.percentile(levels,92)),.001);levels=np.clip(levels/denom,0,1);info={'contentHash':key,'duration':round(len(audio)/sr,3),'interval':.04,'levels':[round(float(x),3) for x in levels]};env.write_text(json.dumps(info,separators=(',',':')));manifest[line['id']]=info
 print(f'{i+1}/49 {line["id"]} {len(audio)/sr:.1f}s',flush=True)
(out/'manifest.json').write_text(json.dumps(manifest,separators=(',',':')))
print('Complete',len(manifest),'clips',flush=True)
