import express from 'express';
import path from 'path';

const app = express();
const port = Number.parseInt(process.env.PORT) || 5000;

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'admin/build')));

app.get('/teste', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
	res.sendFile(path.join(__dirname+'/admin/build/index.html'));
});
  
app.listen(port, err => {
  console.log('teste');
  if (err) {
    return console.error(err);
  }
  return console.log(`server is listening on ${port}`);
});