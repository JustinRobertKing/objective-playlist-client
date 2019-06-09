import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ResultBox from './ResultBox'

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    display: 'flex',
    justifyContent: 'center',
    alignSelft: 'center',
    width: '95%',
    margin: 'auto'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Playlist(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
  	<div>
	    <Card className={classes.card}>
	      <CardContent style={{width: '100%'}} >
	        <Typography variant="h5" component="h2">
	          Listen to this nonsense:
	        </Typography>
	        <hr />
	        <ResultBox results={props.results} allTracks={props.allTracks} />
	      </CardContent>
	    </Card>
    </div>
  );
}