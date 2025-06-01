//import { debugMode } from './debug.js'
{
    const DEBUG = false;
    const DEBUG_FUNCTION = false;
    
    const ID_VOCAB = 'vocab';
    const ID_FRONT = 'front';
    const ID_BACK = 'answer';

    const ID_BTN_FURIGANA = 'btn-furigana';
    const ID_BTN_SENTENCES = 'btn-sentences';

    const ID_HIDDEN_MEANING = 'hidden-meaning';
    const ID_HIDDEN_NOTES = 'hidden-notes';
    const ID_HIDDEN_FORM = 'hidden-form';

    const ID_TAB_DICT = 'tab-dictionary';
    const ID_TAB_NOTES = 'tab-notes';
    const ID_TAB_FORM = 'tab-form';

    const CLASS_HIDDEN = 'hidden';
    const CLASS_HIGHLIGHT = 'highlighted';
    const CLASS_VOCAB = 'vocab';
    const CLASS_ACTIVE = 'active';

    const SENTENCE_MAX = 4;
    const SENTENCE_DATA_PREFIX = 'example-sentence';
    const ATTRIBUTE_CONTENT = 'data-sc-content';
    const ATTRIBUTE_TAG = 'data-sc-code';


    const TAGS = {
        'adj-no':['の adjective','adj'],
        'adj-na':['な adjective','adj'],
        'adj-i':['い adjective','adj'],
        'adj-f':['adjectival', 'adj'],
        'adv':['adverb','adv'],
        'uk':['かな','misc'],
        'n':['noun','noun'],
        'exp':['expression','misc'],
        'v1':['1-dan verb','verb'],
        'vi':['intranstive verb','verb'],
        'vt':['transtive verb','verb'],
        'vs':['する verb','verb'],
        'vs-i':['する verb','verb'],
        'vs-s':['する verb','verb'],
        'v5s':['5-dan verb','verb'],
        'v5r':['5-dan verb','verb'],
        'v5y':['5-dan verb','verb'],
        'v5m':['5-dan verb','verb'],
        'v5h':['5-dan verb','verb'],
        'v5f':['5-dan verb','verb'],
        'v5b':['5-dan verb','verb'],
        'v5n':['5-dan verb','verb'],
        'v5t':['5-dan verb','verb'],
        'v5s':['5-dan verb','verb'],
        'v5k':['5-dan verb','verb'],
        'v5u':['5-dan verb','verb'],
        'aux-v':['auxiliary verb','verb'],
        'col':['colloquial','misc'],
        'n-suf':['suffix','su-prefix'],
        'suf':['suffix','su-prefix'],
        'pref':['prefix','su-prefix'],
        'prt':['particle','particle'],
        'conj':['conjunction', 'misc'],
        'forms':['hidden','hidden'],
        'int':['interjection','misc'],
        'adj-pn':['adjectival','adj'],
        'aux':['auxiliary', 'misc'],
        'auxiliary':['auxiliary', 'misc']
    }
    
    const FUNCTION_CLASS = {
        'adverb':'adv',
        'adjective':'adj',
        'verb':'verb',
        'particle':'particle',
        'expression':'misc',
        'noun':'noun'
    }

    const ATTACH_CLASS = {
        'as-is':['as is', 'as-is'],
        'as is':['as is', 'as-is'],
        'stem':['stem', 'stem'],
        'attributive':['attributive', 'attributive'],
        'a':['あ', 'a'],
        'ta':['た', 'ta'],
        'da':['だ', 'da'],
        'だ':['だ', 'da'],
        'た':['た', 'ta'],
        'て':['て', 'te'],
        'te':['て', 'te'],
        'e':['え', 'e'],
        'え':['え', 'e'],
        'nai':['ない', 'nai'],
        'nai stem':['ない stem', 'nai-stem'],
        'misc':['misc', 'misc'],
        'particle':['particle','particle'],
        'nominalized':['nominalized','nominalized'],
        'o':['お', 'o'],
        'お':['お', 'o'],
        'ou':['おう', 'ou'],
        'おう':['おう', 'ou'],
        undefined:[undefined,undefined]
    }

    // SECTION: CREATION

    const newElement = (tag='div', customClasses='', id='') => {
        let newElem = document.createElement(tag);
        modifyClasses(newElem,customClasses,'add');
        setID(newElem,id);
        return newElem;
    }

    const newButton = (text, customClasses='', id='') => {
        let newBtn = newElement('button', customClasses, id);
        newBtn.innerHTML = '<span>'+text+'</span>';
        return newBtn;
    }

    // SECTION: UTILITY - FETCH

    const getByID = (id) => {
        return document.getElementById(id);
    }

    /**
     * Fetches the content of the given element and gives it back in a new div
     * @param {Object} fetchFrom 
     * @param {string} tag 
     * @returns new Element
     */
    const simpleFetch = (fetchFrom, tag='div') => {
        let origin = fetchFrom.cloneNode(true);
        if (DEBUG) console.log('Fetching from',fetchFrom, 'clone:', origin);
        if (origin !== null) {
            let newElem = document.createElement(tag);
            newElem.innerHTML = origin.innerHTML;
            if (DEBUG) console.log('Successfully fetched ', newElem);
            return newElem;
        }
        else {
            if (DEBUG) console.log('Fetch failed');
            return '';
        }
    }

    /**
     * Returns elements inside a given element with a certain attribute
     * @param {string} attributeName 
     * @param {string} attributeValue 
     * @param {Object} searchIn 
     * @returns 
     */
    function fetchByAttribute(attributeName, attributeValue, searchIn) {
        if (DEBUG) console.log('Searching for attribute',attributeName,attributeValue,'in',searchIn);
        let copyToSearch = searchIn.cloneNode(true);
        let search;
        if (attributeValue!==''){
            search = copyToSearch.querySelectorAll('['+attributeName+'='+attributeValue+']');
            search = toArray(search);
        } else {
            search = copyToSearch.querySelectorAll('['+attributeName+']');
            search = toArray(search);
        }
        if (DEBUG) console.log('Returning: ', search);
        return search;
    }

    /**
     * Gets the meanings from the yomitan dictionary and formats them in an ordered list
     * @returns Ol
     */
    const getMeanings = (className = '') => {
        let meaningCollection = document.querySelectorAll('['+ATTRIBUTE_CONTENT+'='+'glossary'+']');
        let meaningList = toArray(meaningCollection);
        
        let finalOl = document.createElement('ol');

        // console.log(meaningList);
        meaningList.forEach(ul => {
            let currentItem = ''
            let children = ul.querySelectorAll('li');
            children = toArray(children);
            children.forEach(li => {
                currentItem += li.innerText+', ';
            })
            currentItem = currentItem.slice(0,-2); //removing the extra comma
            let newLi = document.createElement('li');
            newLi.innerText = currentItem;
            finalOl.appendChild(newLi);            
        })
        finalOl.classList = className;
        return finalOl;
    }   

    // SECTION: UTILITY - APPEND

    /**
     * 
     * @param {Object} appendWhat 
     * @param {Object} appendToWho 
     * @returns appendWhat
     */
    const simpleAppend = (appendWhat, appendToWho) => {
        try {
            appendToWho.appendChild(appendWhat);
            if (DEBUG) console.log('Attaching',appendWhat,'to',appendToWho);
        } catch (error) {
            if (DEBUG) console.log('Attach failed:',error);
        }
        return appendWhat;
    }

    const alternatedAppend = (appendWhat1, appendWhat2, appendToWho, max=99) => {
        if (DEBUG) console.log('Alternated append of',appendWhat1,appendWhat2, ' to',appendToWho)
        let count = Math.min(appendWhat1.length, appendWhat2.length, max);
        for (let i = 0; i<count; i++){
            if (DEBUG) console.log('Appending pair:',appendWhat1[i], appendWhat2[i]);
            simpleAppend(appendWhat1[i], appendToWho);
            simpleAppend(appendWhat2[i], appendToWho);
        }
    }

    // SECTION: UTILITY - FETCH + APPEND

    /**
     * Fetches attribute tags from the dictionary
     * and appends them to the given element with
     * the suitable formatting
     * @param {Object} appendTo 
     */
    const appendTagsFromDictionary = (appendTo) => {
        if (DEBUG) console.log('APPENDING TAGS FROM DICTIONARY')
        let tagElements = fetchByAttribute(ATTRIBUTE_TAG, '', CONTAINER_HIDDEN_MEANING) ?? [];
        let tagList = [];
        tagElements.forEach(element => {
            if (DEBUG) console.log('Current tag:',element);
            let attribute = element.getAttribute(ATTRIBUTE_TAG);
            let tagBundle = TAGS[attribute] ?? [attribute,'misc'];
            let tags = tagBundle[0].split(" ") ?? [];
            let superTag = tagBundle[1] ?? 'misc';
            
            
            if (!tagList.includes(superTag)){
                let elem = newElement('div', 'tag '+superTag);
                elem.innerText = superTag;
                tagList.push(superTag);
                simpleAppend(elem, appendTo);
            }
            tags.forEach(tag =>{
                if(tagList.includes(tag)){
                    return;
                } else {
                    let elem = newElement('div', 'tag '+attribute+' '+superTag);
                    elem.innerText = tag;
                    tagList.push(tag);
                    simpleAppend(elem, appendTo);
                }
            })
        })
    }

    /**
         * Fetches the readings from the given element,
         * separates them by comma and appends them
         * to the other given element as divs
         * @param {Object} hiddenElement 
         * @param {Object} appendTo 
         */
        const splitAndAppendReadings = (hiddenElement, appendTo, classes='reading') => {
            let readings = hiddenElement;
            let readingsText = readings.innerText.split(", ") ?? [];
            readingsText.forEach(element => {
                let el = newElement('div', classes);
                el.innerText = element;
                simpleAppend(el, appendTo);
            })
        }

    // SECTION: UTILITY - CLASS MANIPULATION

    /**
     * Adds or removes new classes to the given element, space-separated
     * @param {Object} element 
     * @param {string} modifyingClasses 
     */
    const modifyClasses = (element, modifyingClasses, action='add') => {
        if (DEBUG) console.log('Modifying',element,'with "',modifyingClasses,'" (',action,')');
        if (modifyingClasses === '') {
            return;
        }
        if (element === undefined) {
            return;
        }
        let classes = modifyingClasses.split(' ');
        switch (action) {
            case 'remove':
                classes.forEach(classItem => element.classList.remove(classItem));
                break;
            case 'add':
                classes.forEach(classItem => element.classList.add(classItem));
                break;
            default:
                break;
        }
    }

    const modifyClassesByTag = (tag, classes, action='add', searchIn=document) => {
        if (DEBUG) console.log('modifyClassByTag:',tag,classes,action,searchIn)
        let elemList = searchIn.querySelectorAll(tag);
        for (let i = 0; i < elemList.length; i++) {
            modifyClasses(elemList[i], classes, action)
        }
    }

    const modifyClassesInArray = (array, classes, action='add') => {
        array.forEach (element => {
            modifyClasses(element, classes, action);
        })
    }

    // SECTION: UTILITY - ID MANIPULATION
    const setID = (elem, newID) => {
        elem.id = newID;
    }

    // SECTION: UTILITY - ITERABLES
    /**
     * Takes an HTMLCollection or NodeList and turns it into an array
     * @param {Object} iterable 
     * @returns 
     */
    const toArray = (iterable) => {
        let type = Object.prototype.toString.call(iterable);
        let array = []
        switch (type){
            case '[object HTMLCollection]':
                for (let i = 0; i < iterable.length; i++){
                    array.push(iterable[i]);
                }
                break;
            case '[object NodeList]':
                iterable.forEach((element) => {
                    array.push(element);
                })
                break;
            default:
                throw new Error('Unable to convert '+type+' into an iterable')
        }
        return array;
    }

    // SECTION: UTILITY - CHILDREN
    /**
     * Returns the children of an element in an array
     * @param {Object} element 
     * @returns 
     */
    const getChildren = (element) => {
        let copy = element.cloneNode(true);
        let children = copy.childNodes;
        children = toArray(children) ?? [];

        if (DEBUG) console.log ('Children of ',element,children);
        return children;
    }

    // SECTION: UTILITY - MISC

    /**
     * Tries to break down an element's contents into different divs, 
     * separated by line-breaks (<br>)
     * @param {Object} element 
     * @returns div
     */
    const convertLineBreaksToDivs = (element) => {
        if (DEBUG) console.log('Separating',element,'into divs');
        try {
            let result = document.createElement('div');
            let source = element.innerHTML;
            let splitSource = source.split('<br>');
            if (DEBUG) console.log('Separated: ', result,'| children',result.childNodes,'| now appending to new element');
            splitSource.forEach(txt => {
                let elem = document.createElement('div');
                elem.innerHTML = txt;
                simpleAppend(elem, result);
            })
            return result;
        } catch (error) {
            if (DEBUG) console.log('Failed to split, error:', error);
            return element;
        }
    }

    /**
     * Searches for a word in an element and wraps every instance of that word in a span tag 
     * @param {String} word Word to wrap inside span
     * @param {Object} searchIn Element to search in
     * @param {Array.<String>} className Classes to be added to the span, separated by spaces
     */
    const addClassAroundWord = (
        word,
        searchIn,
        className=''
    ) => {
        // adding span tag:
        let innerContent = searchIn;
        innerContent.innerHTML = innerContent.innerHTML.replaceAll(word, '<span>'+word+'</span>');

        // selecting ALL span tags
        let spanList = innerContent.querySelectorAll('span');
        
        // narrowing it down to only the ones with the right content
        let elementList = [];
        spanList.forEach(span => {
            if (span.innerHTML === word){
                elementList.push(span);
            }
        })

        if (className !== ''){
            modifyClassesInArray(elementList, className);
        }
    }


    /**
     * Re-styles span (or other) elements in the array
     * to have their highlights with the proper formatting
     * @param {array} sentences 
     * @param {string} styleBy 
     * @returns 
     */
    const restyleSentences = (sentences, styleBy = 'span') => {
        if (DEBUG) console.log('Restyling',sentences);
        try {
            sentences.forEach(element => {
                if (DEBUG) console.log('Restyling element: ',element)
                element.style.fontSize ='';
                let span = element.getElementsByTagName(styleBy)[0];
                if (DEBUG) console.log('elements to restyle: ', span)
                if (span !== undefined){
                    let html = span.innerHTML;
                    let newElem = newElement('span', CLASS_HIGHLIGHT);
                    newElem.innerHTML = html;            
                    if (DEBUG) console.log('restyled element',newElem,'will replace', span);
                    span.replaceWith(newElem);
                }
            })
            return sentences;
        } catch (error) {
            if (DEBUG) console.log('Failed to restyle,',sentences, '| error:', error);
        }
    }

    // SECTION: INITIALIZER 
    let CONTAINER_FRONT;
    let CONTAINER_BACK;
    let CONTAINER_HIDDEN_MEANING;
    let CONTAINER_HIDDEN_NOTES;
    let CONTAINER_HIDDEN_FORM;
    const getKeyElements = () => {
        CONTAINER_FRONT = getByID(ID_FRONT);
        CONTAINER_BACK = getByID(ID_BACK);
        CONTAINER_HIDDEN_MEANING = getByID(ID_HIDDEN_MEANING);
        CONTAINER_HIDDEN_NOTES = getByID(ID_HIDDEN_NOTES);
        CONTAINER_HIDDEN_FORM = getByID(ID_HIDDEN_FORM);
    }
    

    // SECTION - BUILDERS
    const hideback = () => {
        modifyClasses(CONTAINER_BACK, 'hidden', 'add');
    }

    const buildStandardCard = () => {
        // FRONT
        // TEXT: VOCAB
        let vocab = simpleFetch(document.getElementById('hidden-vocab'));
        setID(vocab, ID_VOCAB);
        simpleAppend(vocab, document.getElementById(ID_FRONT));
        modifyClassesByTag('rt',CLASS_HIDDEN,'add',vocab);
        modifyClasses(vocab,
            CLASS_HIGHLIGHT+' '+CLASS_VOCAB);
        
        // CONTAINER: buttons
        const CONTAINER_BUTTONS = newElement('div', 'container container-buttons');
        simpleAppend(CONTAINER_BUTTONS, CONTAINER_FRONT)

        // BUTTON: furigana
        const BTN_FURIGANA = newButton('furigana');
        setID(BTN_FURIGANA,ID_BTN_FURIGANA);
        modifyClasses(BTN_FURIGANA,
            'button'
        );
        simpleAppend(BTN_FURIGANA, CONTAINER_BUTTONS);

        // BUTTON: sentences
        const BTN_SENTENCES = newButton('sentences');
        setID(BTN_SENTENCES,ID_BTN_SENTENCES);
        modifyClasses(BTN_SENTENCES,
            'button'
        );
        simpleAppend(BTN_SENTENCES, CONTAINER_BUTTONS);

        // CONTAINER: sentences
        const CONTAINER_SENTENCE = newElement('div', 'container container-sentences');
        simpleAppend(CONTAINER_SENTENCE, CONTAINER_FRONT);
        modifyClasses(CONTAINER_SENTENCE, 'hidden');

        const ID_HIDDEN_SENTENCE = 'hidden-sentence';
        const CONTAINER_HIDDEN_SENTENCE = getByID(ID_HIDDEN_SENTENCE);
        const ID_HIDDEN_SENTENCE_TRANS = 'hidden-sentence-translated';
        const CONTAINER_HIDDEN_SENTENCE_TRANS = getByID(ID_HIDDEN_SENTENCE_TRANS); 
        let sentences = simpleFetch(CONTAINER_HIDDEN_SENTENCE);
        let sentencesTranslated = simpleFetch(CONTAINER_HIDDEN_SENTENCE_TRANS);

        sentences = convertLineBreaksToDivs(sentences);
        sentencesTranslated = convertLineBreaksToDivs(sentencesTranslated);
        
        let customSentences = getChildren(sentences);
        let customSentencesTrans = getChildren(sentencesTranslated);
        let customSentencesAmount = customSentences.length;

        for (let i = 0; i<customSentencesAmount; i++){
            let sentence = simpleAppend(customSentences[i], CONTAINER_SENTENCE);
            if (DEBUG) console.log('Current sentence:', sentence);
            modifyClasses(sentence, 'sentence front-sentence')
            modifyClassesByTag('rt', CLASS_HIDDEN, 'add', sentence);
        }

        // getting sentences from dictionary and replacing their formatting
        let dictSentences = fetchByAttribute(ATTRIBUTE_CONTENT, SENTENCE_DATA_PREFIX+'-a', CONTAINER_HIDDEN_MEANING) ?? [];
        let dictSentenceAmount = Math.min(SENTENCE_MAX, dictSentences.length);
        restyleSentences(dictSentences);
        modifyClassesInArray(dictSentences, 'sentence front-sentence');        

        for (let i = 0; i<dictSentenceAmount; i++){
            let sentence = simpleAppend(dictSentences[i], CONTAINER_SENTENCE);
            modifyClassesByTag('rt',CLASS_HIDDEN,'add',sentence);
        }

        // BACK
        // NAVIGATION
        const CONTAINER_NAVIGATION = newElement('div','navigation-list', 'navigation');
        simpleAppend(CONTAINER_NAVIGATION, CONTAINER_BACK);

        const NAVI_DICT = newElement('div','navigation-item', 'navi-dictionary');
        NAVI_DICT.innerText = 'Dictionary';
        simpleAppend(NAVI_DICT, CONTAINER_NAVIGATION);

        const NAVI_NOTES = newElement('div','navigation-item '+CLASS_ACTIVE, 'navi-notes');
        NAVI_NOTES.innerText = 'notes';
        simpleAppend(NAVI_NOTES, CONTAINER_NAVIGATION);

        const NAVI_FORM = newElement('div','navigation-item', 'navi-form');
        NAVI_FORM.innerText = 'Forming';
        simpleAppend(NAVI_FORM, CONTAINER_NAVIGATION);

        // CONTAINER: tabs
        const CONTAINER_TAB = newElement('div','container-tab', 'container-tab');
        simpleAppend(CONTAINER_TAB, CONTAINER_BACK);

        // TABS
        const CONTAINER_TAB_DICT = newElement('div','tab '+CLASS_HIDDEN, ID_TAB_DICT);
        simpleAppend(CONTAINER_TAB_DICT, CONTAINER_TAB);
        const CONTAINER_TAB_NOTES = newElement('div','tab', ID_TAB_NOTES);
        simpleAppend(CONTAINER_TAB_NOTES, CONTAINER_TAB);
        const CONTAINER_TAB_FORM = newElement('div','tab '+CLASS_HIDDEN, ID_TAB_FORM);
        simpleAppend(CONTAINER_TAB_FORM, CONTAINER_TAB);
        
        // TABS: Dictionary
        let meaning = simpleFetch(CONTAINER_HIDDEN_MEANING);        
        simpleAppend(meaning, CONTAINER_TAB_DICT);

        // TABS: Notes
        const CONTAINER_SENTENCE_BACK = newElement('div', 'container-sentence-back', 'container-sentence-back');
        simpleAppend(CONTAINER_SENTENCE_BACK, CONTAINER_TAB_NOTES);

        customSentences = getChildren(sentences); // re-calling the function to make another copy
        restyleSentences(customSentences, 'b');
        customSentencesTrans = getChildren(sentencesTranslated);
        customSentencesAmount = customSentences.length;

        for (let i = 0; i<customSentencesAmount; i++){
            let sentence = simpleAppend(customSentences[i], CONTAINER_SENTENCE_BACK);
            modifyClasses(sentence, 'sentence')
            modifyClassesByTag('rt', CLASS_HIDDEN, 'add', sentence);
            let sentenceTrans = simpleAppend(customSentencesTrans[i], CONTAINER_SENTENCE_BACK);
            modifyClasses(sentenceTrans, 'sentence-translated');
        }

        // getting sentences from dictionary and replacing their formatting
        dictSentences = fetchByAttribute(ATTRIBUTE_CONTENT, SENTENCE_DATA_PREFIX+'-a', CONTAINER_HIDDEN_MEANING)
        restyleSentences(dictSentences);
        modifyClassesInArray(dictSentences, 'sentence');
        dictSentences.forEach(element => {
            modifyClassesByTag('rt',CLASS_HIDDEN,'add',element);
        })

        let dictSentencesTrans = fetchByAttribute(ATTRIBUTE_CONTENT, SENTENCE_DATA_PREFIX+'-b', CONTAINER_HIDDEN_MEANING)
        restyleSentences(dictSentencesTrans);
        modifyClassesInArray(dictSentencesTrans, 'sentence-translated');

        alternatedAppend(dictSentences, dictSentencesTrans, CONTAINER_SENTENCE_BACK, SENTENCE_MAX);       

        // TABS: Notes - Tags
        const CONTAINER_TAB_NOTES_TAGS = newElement('div', 'container-tags', 'container-tags');
        simpleAppend(CONTAINER_TAB_NOTES_TAGS, CONTAINER_TAB_NOTES);

        appendTagsFromDictionary(CONTAINER_TAB_NOTES_TAGS);

        // TABS: Notes - Notes
        let notes = simpleFetch(CONTAINER_HIDDEN_NOTES);
        simpleAppend(notes, CONTAINER_TAB_NOTES);                

        // TABS: Form
        let form = simpleFetch(CONTAINER_HIDDEN_FORM);
        simpleAppend(form, CONTAINER_TAB_FORM);

        // EVENT LISTENENERS        
        BTN_FURIGANA.addEventListener('click', function(event){
            modifyClassesByTag('rt', CLASS_HIDDEN, 'remove', vocab);
            modifyClassesByTag('rt', CLASS_HIDDEN, 'remove', CONTAINER_SENTENCE);
            modifyClassesByTag('rt', CLASS_HIDDEN, 'remove', CONTAINER_SENTENCE_BACK);
            this.style.display = 'none';
            event.preventDefault();
        })

        BTN_SENTENCES.addEventListener('click', function(event){
            modifyClasses(CONTAINER_SENTENCE, CLASS_HIDDEN, 'remove');
            this.style.display = 'none';
            event.preventDefault();
        })

        NAVI_DICT.addEventListener('click', function(event){
            modifyClasses(CONTAINER_TAB_DICT, CLASS_HIDDEN, 'remove');
            modifyClasses(CONTAINER_TAB_NOTES, CLASS_HIDDEN, 'add');
            modifyClasses(CONTAINER_TAB_FORM, CLASS_HIDDEN, 'add')
            
            modifyClasses(NAVI_DICT, CLASS_ACTIVE, 'add');
            modifyClasses(NAVI_NOTES, CLASS_ACTIVE, 'remove');
            modifyClasses(NAVI_FORM, CLASS_ACTIVE, 'remove');
            event.preventDefault();
        })
        NAVI_NOTES.addEventListener('click', function(event){
            modifyClasses(CONTAINER_TAB_DICT, CLASS_HIDDEN, 'add');
            modifyClasses(CONTAINER_TAB_NOTES, CLASS_HIDDEN, 'remove');
            modifyClasses(CONTAINER_TAB_FORM, CLASS_HIDDEN, 'add');

            modifyClasses(NAVI_DICT, CLASS_ACTIVE, 'remove');
            modifyClasses(NAVI_NOTES, CLASS_ACTIVE, 'add');
            modifyClasses(NAVI_FORM, CLASS_ACTIVE, 'remove');
            event.preventDefault();
        })
        NAVI_FORM.addEventListener('click', function(event){
            modifyClasses(CONTAINER_TAB_DICT, CLASS_HIDDEN, 'add');
            modifyClasses(CONTAINER_TAB_NOTES, CLASS_HIDDEN, 'add');
            modifyClasses(CONTAINER_TAB_FORM, CLASS_HIDDEN, 'remove');
            
            modifyClasses(NAVI_DICT, CLASS_ACTIVE, 'remove');
            modifyClasses(NAVI_NOTES, CLASS_ACTIVE, 'remove');
            modifyClasses(NAVI_FORM, CLASS_ACTIVE, 'add');
            event.preventDefault();
        })
    }

    const buildFillInCard = () => {
        // FRONT
        const CONTAINER_SENTENCE_DEFINITIONS = newElement('div', 'container container-sentence-meaning');
        simpleAppend(CONTAINER_SENTENCE_DEFINITIONS, CONTAINER_FRONT);

        // CONTAINER: sentences
        const CONTAINER_SENTENCE = newElement('div', 'container container-sentences');
        simpleAppend(CONTAINER_SENTENCE, CONTAINER_SENTENCE_DEFINITIONS);
        modifyClasses(CONTAINER_SENTENCE, 'redacted');

        const ID_HIDDEN_SENTENCE = 'hidden-sentence';
        const CONTAINER_HIDDEN_SENTENCE = getByID(ID_HIDDEN_SENTENCE);
        const ID_HIDDEN_SENTENCE_TRANS = 'hidden-sentence-translated';
        const CONTAINER_HIDDEN_SENTENCE_TRANS = getByID(ID_HIDDEN_SENTENCE_TRANS); 
        if (DEBUG) console.log('================== FETCHING CUSTOM SENTENCES')
        let sentences = simpleFetch(CONTAINER_HIDDEN_SENTENCE);
        let sentencesTranslated = simpleFetch(CONTAINER_HIDDEN_SENTENCE_TRANS);

        sentences = convertLineBreaksToDivs(sentences);
        sentencesTranslated = convertLineBreaksToDivs(sentencesTranslated);
        
        let customSentences = getChildren(sentences);
        restyleSentences(customSentences, 'b');
        
        let customSentencesTrans = getChildren(sentencesTranslated);
        let customSentencesAmount = customSentences.length;

        for (let i = 0; i<customSentencesAmount; i++){
            let sentence = simpleAppend(customSentences[i], CONTAINER_SENTENCE);
            modifyClasses(sentence, 'sentence front-sentence')
            modifyClassesByTag('rt', CLASS_HIDDEN, 'add', sentence);
            let sentenceTrans = simpleAppend(customSentencesTrans[i], CONTAINER_SENTENCE);
            modifyClasses(sentenceTrans, 'sentence-translated');
        }

        // getting sentences from dictionary and replacing their formatting
        if (DEBUG) console.log('================== FETCHING DICTIONARY SENTENCES')
        let dictSentences = fetchByAttribute(ATTRIBUTE_CONTENT, SENTENCE_DATA_PREFIX+'-a', CONTAINER_HIDDEN_MEANING)
        let dictSentenceAmount = Math.min(SENTENCE_MAX, dictSentences.length);
        restyleSentences(dictSentences);
        modifyClassesInArray(dictSentences, 'sentence front-sentence');        

        let dictSentencesTrans = fetchByAttribute(ATTRIBUTE_CONTENT, SENTENCE_DATA_PREFIX+'-b', CONTAINER_HIDDEN_MEANING)
        restyleSentences(dictSentencesTrans);
        modifyClassesInArray(dictSentencesTrans, 'sentence-translated');


        for (let i = 0; i<dictSentenceAmount; i++){
            let sentence = simpleAppend(dictSentences[i], CONTAINER_SENTENCE);
            modifyClassesByTag('rt',CLASS_HIDDEN,'add',sentence);
            let sentenceTrans = simpleAppend(dictSentencesTrans[i], CONTAINER_SENTENCE);
            modifyClasses(sentenceTrans, 'sentence-translated');
        }

        // CONTAINER: DEFINITIONS
        const CONTAINER_DEFINITIONS = newElement('div', 'container container-sentences');
        simpleAppend(CONTAINER_DEFINITIONS, CONTAINER_SENTENCE_DEFINITIONS);
        let dictMeanings = getMeanings('front-meaning');
        simpleAppend(dictMeanings, CONTAINER_DEFINITIONS)

        // BACK
        // NAVIGATION
        const CONTAINER_NAVIGATION = newElement('div','navigation-list', 'navigation');
        simpleAppend(CONTAINER_NAVIGATION, CONTAINER_BACK);

        const NAVI_DICT = newElement('div','navigation-item', 'navi-dictionary');
        NAVI_DICT.innerText = 'Dictionary';
        simpleAppend(NAVI_DICT, CONTAINER_NAVIGATION);

        const NAVI_NOTES = newElement('div','navigation-item '+CLASS_ACTIVE, 'navi-notes');
        NAVI_NOTES.innerText = 'notes';
        simpleAppend(NAVI_NOTES, CONTAINER_NAVIGATION);

        const NAVI_FORM = newElement('div','navigation-item', 'navi-form');
        NAVI_FORM.innerText = 'Forming';
        simpleAppend(NAVI_FORM, CONTAINER_NAVIGATION);

        // CONTAINER: tabs
        const CONTAINER_TAB = newElement('div','container-tab', 'container-tab');
        simpleAppend(CONTAINER_TAB, CONTAINER_BACK);

        // TABS
        const CONTAINER_TAB_DICT = newElement('div','tab '+CLASS_HIDDEN, ID_TAB_DICT);
        simpleAppend(CONTAINER_TAB_DICT, CONTAINER_TAB);
        const CONTAINER_TAB_NOTES = newElement('div','tab', ID_TAB_NOTES);
        simpleAppend(CONTAINER_TAB_NOTES, CONTAINER_TAB);
        const CONTAINER_TAB_FORM = newElement('div','tab '+CLASS_HIDDEN, ID_TAB_FORM);
        simpleAppend(CONTAINER_TAB_FORM, CONTAINER_TAB);
        
        // TABS: Dictionary
        let meaning = simpleFetch(CONTAINER_HIDDEN_MEANING);        
        simpleAppend(meaning, CONTAINER_TAB_DICT);

        // TABS: Notes
        // NOTES: vocab
        let vocab = simpleFetch(document.getElementById('hidden-vocab'));
        setID(vocab, ID_VOCAB);
        simpleAppend(vocab, CONTAINER_TAB_NOTES);
        modifyClasses(vocab,
            CLASS_HIGHLIGHT+' '+CLASS_VOCAB);

        // NOTES: sentences
        const CONTAINER_SENTENCE_BACK = newElement('div', 'container-sentence-back', 'container-sentence-back');
        simpleAppend(CONTAINER_SENTENCE_BACK, CONTAINER_TAB_NOTES);

        customSentences = getChildren(sentences); // re-calling the function to make another copy
        restyleSentences(customSentences, 'b');
        customSentencesTrans = getChildren(sentencesTranslated);
        customSentencesAmount = customSentences.length;

        for (let i = 0; i<customSentencesAmount; i++){
            let sentence = simpleAppend(customSentences[i], CONTAINER_SENTENCE_BACK);
            modifyClasses(sentence, 'sentence')
            modifyClassesByTag('rt', CLASS_HIDDEN, 'add', sentence);
            let sentenceTrans = simpleAppend(customSentencesTrans[i], CONTAINER_SENTENCE_BACK);
            modifyClasses(sentenceTrans, 'sentence-translated');
        }

        // getting sentences from dictionary and replacing their formatting
        dictSentences = fetchByAttribute(ATTRIBUTE_CONTENT, SENTENCE_DATA_PREFIX+'-a', CONTAINER_HIDDEN_MEANING)
        restyleSentences(dictSentences);
        modifyClassesInArray(dictSentences, 'sentence');
        dictSentences.forEach(element => {
            modifyClassesByTag('rt',CLASS_HIDDEN,'add',element);
        })

        dictSentencesTrans = fetchByAttribute(ATTRIBUTE_CONTENT, SENTENCE_DATA_PREFIX+'-b', CONTAINER_HIDDEN_MEANING)
        restyleSentences(dictSentencesTrans);
        modifyClassesInArray(dictSentencesTrans, 'sentence-translated');

        alternatedAppend(dictSentences, dictSentencesTrans, CONTAINER_SENTENCE_BACK, SENTENCE_MAX);       

        // TABS: Notes - Tags
        const CONTAINER_TAB_NOTES_TAGS = newElement('div', 'container-tags', 'container-tags');
        simpleAppend(CONTAINER_TAB_NOTES_TAGS, CONTAINER_TAB_NOTES);

        appendTagsFromDictionary(CONTAINER_TAB_NOTES_TAGS);

        // TABS: Notes - Notes
        let notes = simpleFetch(CONTAINER_HIDDEN_NOTES);
        simpleAppend(notes, CONTAINER_TAB_NOTES);                

        // TABS: Form
        let form = simpleFetch(CONTAINER_HIDDEN_FORM);
        simpleAppend(form, CONTAINER_TAB_FORM);

        NAVI_DICT.addEventListener('click', function(event){
            modifyClasses(CONTAINER_TAB_DICT, CLASS_HIDDEN, 'remove');
            modifyClasses(CONTAINER_TAB_NOTES, CLASS_HIDDEN, 'add');
            modifyClasses(CONTAINER_TAB_FORM, CLASS_HIDDEN, 'add')
            
            modifyClasses(NAVI_DICT, CLASS_ACTIVE, 'add');
            modifyClasses(NAVI_NOTES, CLASS_ACTIVE, 'remove');
            modifyClasses(NAVI_FORM, CLASS_ACTIVE, 'remove');
            event.preventDefault();
        })
        NAVI_NOTES.addEventListener('click', function(event){
            modifyClasses(CONTAINER_TAB_DICT, CLASS_HIDDEN, 'add');
            modifyClasses(CONTAINER_TAB_NOTES, CLASS_HIDDEN, 'remove');
            modifyClasses(CONTAINER_TAB_FORM, CLASS_HIDDEN, 'add');

            modifyClasses(NAVI_DICT, CLASS_ACTIVE, 'remove');
            modifyClasses(NAVI_NOTES, CLASS_ACTIVE, 'add');
            modifyClasses(NAVI_FORM, CLASS_ACTIVE, 'remove');
            event.preventDefault();
        })
        NAVI_FORM.addEventListener('click', function(event){
            modifyClasses(CONTAINER_TAB_DICT, CLASS_HIDDEN, 'add');
            modifyClasses(CONTAINER_TAB_NOTES, CLASS_HIDDEN, 'add');
            modifyClasses(CONTAINER_TAB_FORM, CLASS_HIDDEN, 'remove');
            
            modifyClasses(NAVI_DICT, CLASS_ACTIVE, 'remove');
            modifyClasses(NAVI_NOTES, CLASS_ACTIVE, 'remove');
            modifyClasses(NAVI_FORM, CLASS_ACTIVE, 'add');
            event.preventDefault();
        })

    }

    const buildKanjiCard = () => {
        // FRONT
        // TEXT: VOCAB
        let character = simpleFetch(document.getElementById('hidden-character'));
        setID(character, ID_VOCAB);
        simpleAppend(character, CONTAINER_FRONT);
        modifyClassesByTag('rt',CLASS_HIDDEN,'add',character);
        modifyClasses(character,
            CLASS_HIGHLIGHT+' '+CLASS_VOCAB);

        // BACK

        // BACK - navigation
        // NAVIGATION
        const CONTAINER_NAVIGATION = newElement('div','navigation-list two', 'navigation');
        simpleAppend(CONTAINER_NAVIGATION, CONTAINER_BACK);

        const NAVI_MAIN = newElement('div','navigation-item '+CLASS_ACTIVE, 'navi-dictionary');
        NAVI_MAIN.innerText = 'main';
        simpleAppend(NAVI_MAIN, CONTAINER_NAVIGATION);

        const NAVI_LOOKALIKES = newElement('div','navigation-item', 'navi-form');
        NAVI_LOOKALIKES.innerText = 'lookalikes';
        simpleAppend(NAVI_LOOKALIKES, CONTAINER_NAVIGATION);

        // CONTAINER: tabs
        const CONTAINER_TAB = newElement('div','container-tab two', 'container-tab');
        simpleAppend(CONTAINER_TAB, CONTAINER_BACK);

        // move
        const ID_TAB_MAIN = 'tab-main';
        const ID_TAB_LOOKALIKES = 'tab-lookalikes'

        // TABS
        const CONTAINER_TAB_MAIN = newElement('div','tab', ID_TAB_MAIN);
        simpleAppend(CONTAINER_TAB_MAIN, CONTAINER_TAB);
        const CONTAINER_TAB_LOOKALIKES = newElement('div','tab '+CLASS_HIDDEN, ID_TAB_LOOKALIKES); //
        simpleAppend(CONTAINER_TAB_LOOKALIKES, CONTAINER_TAB);

        // MAIN - meaning
        const CONTAINER_TAB_MAIN_MEANING = newElement('div', 'container-meaning');
        simpleAppend(CONTAINER_TAB_MAIN_MEANING, CONTAINER_TAB_MAIN);

        // make divs out of each meaning and dunk them into CONTAINER_TAB_MAIN_MEANING
        let meaningOriginal = simpleFetch(document.getElementsByClassName('yomitan-glossary')[0]);
        
        // will return a <ol> if multiple meanings,
        // plain text if it doesn't

        let meanings = [];

        if (meaningOriginal.childNodes[0].childNodes.length === 0) { // if single meaning
            let elem = document.createElement('div');
            if (DEBUG) console.log('KANJI MEANING: single meaning from ', meaningOriginal, ':', meaningOriginal.innerText);            
            elem.innerText = meaningOriginal.innerText;
            meanings = [elem];
            if (DEBUG) console.log('KANJI MEANING: gotten meanings', meanings);            
        } else {
            let list = meaningOriginal.childNodes[0].childNodes;
            list = toArray(list);
            list.forEach(element => {
                let elem = document.createElement('div');
                elem.innerText = element.innerText;
                meanings.push(elem);
            })
        }

        meanings.forEach(meaning => {
            modifyClasses(meaning, 'kanji-meaning-item');
            simpleAppend(meaning, CONTAINER_TAB_MAIN_MEANING);
        })

        // MAIN - radicals
        let radicals = simpleFetch(getByID('hidden-radicals'));
        let radicalCharacters = radicals.getElementsByClassName('radical');
        radicalCharacters = toArray(radicalCharacters);
        let radicalMeaning = radicals.getElementsByClassName('radical-meaning');
        radicalMeaning = toArray(radicalMeaning);

        let CONTAINER_RADICALS = newElement('div', 'container-radicals');
        simpleAppend(CONTAINER_RADICALS, CONTAINER_TAB_MAIN);

        alternatedAppend(radicalCharacters, radicalMeaning, CONTAINER_RADICALS);

        // MAIN - mnemonics
        let mnem = simpleFetch(getByID('hidden-notes'));
        let CONTAINER_MNEM = newElement('div', 'container-mnem');
        simpleAppend(CONTAINER_MNEM, CONTAINER_TAB_MAIN);
        simpleAppend(mnem, CONTAINER_MNEM);


        // MAIN - readings
        let CONTAINER_READINGS = newElement('div', 'container-readings');
        simpleAppend(CONTAINER_READINGS, CONTAINER_TAB_MAIN);
        
        let CONTAINER_KUN = newElement('div', 'container kun')
        simpleAppend(CONTAINER_KUN, CONTAINER_READINGS);
        let CONTAINER_TITLE_KUN = newElement('div', 'title');
        CONTAINER_TITLE_KUN.innerText = 'kun';
        simpleAppend(CONTAINER_TITLE_KUN, CONTAINER_KUN);
        let CONTAINER_READINGS_KUN = newElement('div', 'readings');
        simpleAppend(CONTAINER_READINGS_KUN, CONTAINER_KUN);

        let CONTAINER_ON = newElement('div', 'container on')
        simpleAppend(CONTAINER_ON, CONTAINER_READINGS);
        let CONTAINER_TITLE_ON = newElement('div', 'title');
        CONTAINER_TITLE_ON.innerText = 'on';
        simpleAppend(CONTAINER_TITLE_ON, CONTAINER_ON);            
        let CONTAINER_READINGS_ON = newElement('div', 'readings');
        simpleAppend(CONTAINER_READINGS_ON, CONTAINER_ON);
        
        splitAndAppendReadings(simpleFetch(getByID('hidden-kun')), CONTAINER_READINGS_KUN, 'reading');
        splitAndAppendReadings(simpleFetch(getByID('hidden-on')), CONTAINER_READINGS_ON, 'reading');

        // MAIN - vocab
        const CONTAINER_VOCAB = newElement('div','container-vocab');
        simpleAppend(CONTAINER_VOCAB, CONTAINER_TAB_MAIN);

        let examples;
        let examplesMeaning;

        try {
            examples = simpleFetch(getByID('hidden-kanji-examples'));
            examples = convertLineBreaksToDivs(examples);
            examples = toArray(examples.childNodes);
            examples.forEach(element => {
                addClassAroundWord(character.innerText, element, CLASS_HIGHLIGHT);
            })
            modifyClassesInArray(examples, 'vocab-example');
            examplesMeaning = simpleFetch(getByID('hidden-kanji-examples-meaning'));
            examplesMeaning = convertLineBreaksToDivs(examplesMeaning);
            examplesMeaning = toArray(examplesMeaning.childNodes);
            modifyClassesInArray(examplesMeaning, 'vocab-example-meaning');
        } catch (error) {
            if (DEBUG) console.log('Failed to get examples:',error);
        }
        let examples_title = newElement('div','title');
        examples_title.innerText = 'examples';
        simpleAppend(examples_title, CONTAINER_VOCAB);
        
        let examples_title_meaning = newElement('div','title');
        examples_title_meaning.innerText = 'meaning';
        simpleAppend(examples_title_meaning, CONTAINER_VOCAB);
        
        try {
            alternatedAppend(examples, examplesMeaning, CONTAINER_VOCAB);
        } catch (error) {
            if (DEBUG) console.log('Failed to append examples:',error);
        }
        // LOOKALIKES - lookalikes
        let CONTAINER_LOOKALIKES = newElement('div', 'container-lookalikes');
        simpleAppend(CONTAINER_LOOKALIKES, CONTAINER_TAB_LOOKALIKES)

        let lookalikes;
        let lookalikesMeaning;
        try {
            lookalikes = simpleFetch(getByID('hidden-lookalikes'));
            lookalikes = convertLineBreaksToDivs(lookalikes);
            lookalikes = toArray(lookalikes.childNodes);
            modifyClassesInArray(lookalikes, 'vocab-example');
            lookalikesMeaning = simpleFetch(getByID('hidden-lookalikes-meaning'));
            lookalikesMeaning = convertLineBreaksToDivs(lookalikesMeaning);
            lookalikesMeaning = toArray(lookalikesMeaning.childNodes);
            modifyClassesInArray(lookalikesMeaning, 'vocab-example-meaning');
        } catch(error) {
            if (DEBUG) console.log('Failed to get lookalikes:',error);
        }

        let lookalikes_title = newElement('div','title');
        lookalikes_title.innerText = 'lookalikes';
        simpleAppend(lookalikes_title, CONTAINER_LOOKALIKES);
        
        let lookalikes_title_meaning = newElement('div','title');
        lookalikes_title_meaning.innerText = 'meaning';
        simpleAppend(lookalikes_title_meaning, CONTAINER_LOOKALIKES);
        
        try {
            alternatedAppend(lookalikes, lookalikesMeaning, CONTAINER_LOOKALIKES);
        } catch (error) {
            if (DEBUG) console.log('Failed to append lookalikes:',error);
        }
        // EVENT LISTENERS
        NAVI_MAIN.addEventListener('click', function(event){
            modifyClasses(CONTAINER_TAB_MAIN, CLASS_HIDDEN, 'remove');
            modifyClasses(CONTAINER_TAB_LOOKALIKES, CLASS_HIDDEN, 'add')
            
            modifyClasses(NAVI_MAIN, CLASS_ACTIVE, 'add');
            modifyClasses(NAVI_LOOKALIKES, CLASS_ACTIVE, 'remove');
            event.preventDefault();
        })
        NAVI_LOOKALIKES.addEventListener('click', function(event){
            modifyClasses(CONTAINER_TAB_MAIN, CLASS_HIDDEN, 'add');
            modifyClasses(CONTAINER_TAB_LOOKALIKES, CLASS_HIDDEN, 'remove')
            
            modifyClasses(NAVI_MAIN, CLASS_ACTIVE, 'remove');
            modifyClasses(NAVI_LOOKALIKES, CLASS_ACTIVE, 'add');
            event.preventDefault();
        })
    }





    // DO NOT TOUCH
    if (DEBUG_FUNCTION){
        debugMode();
    }
    getKeyElements();

    // BUILDING - ENABLE ONLY THE RELEVANT ONE
    buildStandardCard();
    //buildFillInCard();
    //buildKanjiCard();


    // HIDE BACK?
    // hideback();
}