import { debugMode } from './debug.js'
{
    const DEBUG = true;
    
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
        'v5s':['5-dan','verb'],
        'v5r':['5-dan','verb'],
        'v5y':['5-dan','verb'],
        'v5m':['5-dan','verb'],
        'v5h':['5-dan','verb'],
        'v5f':['5-dan','verb'],
        'v5b':['5-dan','verb'],
        'v5n':['5-dan','verb'],
        'v5t':['5-dan','verb'],
        'v5s':['5-dan','verb'],
        'v5k':['5-dan','verb'],
        'v5u':['5-dan','verb'],
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
        let origin = fetchFrom;
        let newElem = document.createElement(tag);
        if (origin !== null) {
            newElem.innerHTML = origin.innerHTML;
            
            if (DEBUG) console.log('Successfully fetched ', newElem);
            return newElem;
        }
        else {
            if (DEBUG) console.log('Fetch from',fetchFrom,'failed')
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
        let count = Math.min(appendWhat1.length, appendWhat2.length, max);
        for (let i = 0; i<count; i++){
            simpleAppend(appendWhat1[i], appendToWho);
            simpleAppend(appendWhat2[i], appendToWho);
        }
    }

    // SECTION: UTILITY - FETCH + APPEND

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
        children = toArray(children);

        if (DEBUG) console.log ('Children of ',element,children);
        return children;
    }

    // SECTION: UTILITY - MISC

    /**
     * Tries to break down an element's contents into different divs, 
     * separated by line-breaks (<br>)
     * @param {Object} element 
     * @returns 
     */
    const convertLineBreaksToDivs = (element) => {
        if (DEBUG) console.log('Separating',element,'into divs');
        try {
            let newHTML = element.innerHTML;
            newHTML = '<div>'+newHTML.replaceAll('<br>','</div><div>')+'</div>'
            element.innerHTML = newHTML;
            return element;
        } catch (error) {
            if (DEBUG) console.log('Failed to split, error:', error);
            return element;
        }
    }

    const restyleSentences = (sentences) => {
        if (DEBUG) console.log('Restyling',sentences);
        try {
            sentences.forEach(element => {
                element.style.fontSize ='';
                let span = element.getElementsByTagName('span')[0];
                let html = span.innerHTML;
                let newElem = newElement('span', CLASS_HIGHLIGHT);
                newElem.innerHTML = html;            
                element.replaceChild(newElem, span);
            })
            return sentences;
        } catch (error) {
            if (DEBUG) console.log('Failed to restyle, error:', error);
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

        convertLineBreaksToDivs(sentences);
        convertLineBreaksToDivs(sentencesTranslated);
        
        let customSentences = getChildren(sentences);
        let customSentencesTrans = getChildren(sentencesTranslated);
        let customSentencesAmount = customSentences.length;

        for (let i = 0; i<customSentencesAmount; i++){
            let sentence = simpleAppend(customSentences[i], CONTAINER_SENTENCE);
            modifyClasses(sentence, 'sentence front-sentence')
            modifyClassesByTag('rt', CLASS_HIDDEN, 'add', sentence);
        }

        // getting sentences from dictionary and replacing their formatting
        let dictSentences = fetchByAttribute(ATTRIBUTE_CONTENT, SENTENCE_DATA_PREFIX+'-a', CONTAINER_HIDDEN_MEANING)
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

        let tagElements = fetchByAttribute(ATTRIBUTE_TAG, '', CONTAINER_HIDDEN_MEANING) ?? [];
        let tagList = [];
        tagElements.forEach(element => {
            let attribute = element.getAttribute(ATTRIBUTE_TAG);
            let tags = TAGS[attribute][0].split(" ") ?? [];
            let superTag = TAGS[attribute][1];
            
            if (!tagList.includes(superTag)){
                let elem = newElement('div', 'tag '+superTag);
                elem.innerText = superTag;
                tagList.push(superTag);
                simpleAppend(elem, CONTAINER_TAB_NOTES_TAGS);
            }
            tags.forEach(tag =>{
                if(tagList.includes(tag)){
                    return;
                } else {
                    let elem = newElement('div', 'tag '+attribute+' '+superTag);
                    elem.innerText = tag;
                    tagList.push(tag);
                    simpleAppend(elem, CONTAINER_TAB_NOTES_TAGS);
                }
            })
        })

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
    // DO NOT TOUCH
    debugMode();
    getKeyElements();

    // BUILDING - ENABLE ONLY THE RELEVANT ONE
    buildStandardCard();


    // HIDE BACK?
    // hideback();
}