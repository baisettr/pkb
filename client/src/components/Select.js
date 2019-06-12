import React from 'react';
import { deburr } from 'lodash';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

function renderInputComponent(inputProps) {
    const { classes, inputRef = () => { }, ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth
            required
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input,
                },
            }}
            {...other}
        />
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.description, query);
    const parts = parse(suggestion.description, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map(part => (
                    <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
                        {part.text}
                    </span>
                ))}
            </div>
        </MenuItem>
    );
}


async function fetchSug(place) {
    return new Promise((resolve, reject) => {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + place + '&types=geocode&key=' + 'AIzaSyDiFYXE3HoT8ux5MqVFaeYLDLQcZvhAqqs';
        fetch(proxyUrl + url)
            .then(response => response.json())
            .then(data => {
                //console.log(data);
                resolve(data.predictions)
            });
    })
}


async function getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    if (inputLength === 0) {
        return []
    }
    else {
        let x = await fetchSug(inputValue);
        //console.log(x, inputValue);
        return x;
    }

    /*  return inputLength === 0
         ? []
         : await fetchSug(inputValue) */

    /* suggestions.filter(suggestion => {
        const keep =
            count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
            count += 1;
        }

        return keep;
    }); */
}

function getSuggestionValue(suggestion) {
    return suggestion.description;
}

const useStyles = makeStyles(theme => ({
    root: {
        margin: '10px',
        flexGrow: 1,
    },
    container: {
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {
        height: theme.spacing(2),
    },
}));

export default function IntegrationAutosuggest(props) {

    const classes = useStyles();
    const [state, setState] = React.useState({
        single: ''
    });

    const [stateSuggestions, setSuggestions] = React.useState([]);

    const handleSuggestionsFetchRequested = async ({ value }) => {
        setSuggestions(await getSuggestions(value));
    };

    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const handleChange = name => (event, { newValue }) => {
        setState({
            ...state,
            [name]: newValue,
        });
        //console.log(stateSuggestions, stateSuggestions.filter(e => e.description === newValue))
        let geometry = {
            homeAddr: newValue
        }
        let x = stateSuggestions.filter(e => e.description === newValue)
        if (x.length) {
            geometry['place_id'] = x[0].place_id;
        }
        props.handleHomeAddrChange(geometry);
    };

    const autosuggestProps = {
        renderInputComponent,
        suggestions: stateSuggestions,
        onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
        onSuggestionsClearRequested: handleSuggestionsClearRequested,
        getSuggestionValue,
        renderSuggestion,
    };

    return (
        <div className={classes.root}>
            <Autosuggest
                {...autosuggestProps}
                inputProps={{
                    classes,
                    id: 'react-autosuggest-simple',
                    label: 'Enter the home address',
                    placeholder: 'Search a country (start with a)',
                    value: state.single,
                    onChange: handleChange('single')
                }}
                theme={{
                    container: classes.container,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                renderSuggestionsContainer={options => (
                    <Paper {...options.containerProps} square>
                        {options.children}
                    </Paper>
                )}
            />
            <div className={classes.divider} />
        </div>
    );
}
