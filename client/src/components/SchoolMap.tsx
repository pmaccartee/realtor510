import { useState, useEffect, useRef } from "react";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;

// ============================================================
// WALNUT CREEK ELEMENTARY SCHOOL LOOKUP
// Source: Walnut Creek School District Street Listing, Dec 2025
// BV=Buena Vista, IV=Indian Valley, MW=Murwood, PM=Parkmead, WH=Walnut Heights
// All middle school: WCI (Walnut Creek Intermediate)
// ============================================================

// Walnut Creek street lookup data
const wcStreetData: Array<{street: string, low: number, high: number, school: string}> = [
  { street: "ABINGTON CT", low: 1, high: 10000, school: "MW" },
  { street: "ACORN CT", low: 1, high: 10000, school: "PM" },
  { street: "ADAMS RANCH RD", low: 1, high: 10000, school: "PM" },
  { street: "ADELINE DR", low: 1, high: 10000, school: "WH" },
  { street: "AHWAHNEE CT", low: 1, high: 10000, school: "WH" },
  { street: "ALAMO VIEW PL", low: 1, high: 10000, school: "PM" },
  { street: "ALBERTA TER", low: 1, high: 10000, school: "WH" },
  { street: "ALDER AVE", low: 1, high: 10000, school: "PM" },
  { street: "ALDERWOOD CT", low: 1, high: 10000, school: "IV" },
  { street: "ALDERWOOD LN", low: 1, high: 10000, school: "IV" },
  { street: "ALDERWOOD RD", low: 1, high: 10000, school: "IV" },
  { street: "ALEGRA CT", low: 1, high: 10000, school: "IV" },
  { street: "ALEGRA LN", low: 1, high: 10000, school: "IV" },
  { street: "ALFRED AVE", low: 1, high: 10000, school: "BV" },
  { street: "ALICE AVE", low: 1, high: 10000, school: "MW" },
  { street: "ALLENDALE CT", low: 1, high: 10000, school: "PM" },
  { street: "ALMA AVE", low: 1, high: 10000, school: "PM" },
  { street: "ALMOND AVE", low: 1, high: 10000, school: "PM" },
  { street: "ALMOND CT", low: 1, high: 10000, school: "PM" },
  { street: "ALOYSE CT", low: 1, high: 10000, school: "MW" },
  { street: "ALPINE RD", low: 1, high: 10000, school: "PM" },
  { street: "ALTA HILL WAY", low: 1, high: 10000, school: "PM" },
  { street: "ALTA VISTA CT", low: 1, high: 10000, school: "WH" },
  { street: "ALTA VISTA DR", low: 1, high: 10000, school: "WH" },
  { street: "ALVARADO AVE", low: 1, high: 10000, school: "BV" },
  { street: "ALWIN RD", low: 1, high: 10000, school: "WH" },
  { street: "AMESBURY CT", low: 1, high: 10000, school: "MW" },
  { street: "AMIGO LN", low: 1, high: 10000, school: "WH" },
  { street: "ANALISA LN", low: 10, high: 100, school: "WH" },
  { street: "ANDERSON CIR", low: 20, high: 40, school: "PM" },
  { street: "ANDREA DR", low: 1, high: 10000, school: "MW" },
  { street: "ANZA CT", low: 1, high: 10000, school: "BV" },
  { street: "ARBOL GRANDE CT", low: 1, high: 10000, school: "MW" },
  { street: "ARBOR DR", low: 1, high: 10000, school: "WH" },
  { street: "ARBUTUS CT", low: 1, high: 10000, school: "PM" },
  { street: "ARBUTUS DR", low: 1, high: 10000, school: "PM" },
  { street: "ARLENE CT", low: 1, high: 10000, school: "PM" },
  { street: "ARLENE DR", low: 1, high: 10000, school: "PM" },
  { street: "ARLENE LN", low: 1, high: 10000, school: "PM" },
  { street: "ARROYO WAY", low: 1100, high: 1400, school: "WH" },
  { street: "ASHLEY LN", low: 810, high: 836, school: "IV" },
  { street: "AUGELLO CT", low: 1, high: 10000, school: "IV" },
  { street: "AUTUMN TRAIL LN", low: 1, high: 10000, school: "PM" },
  { street: "AUTUMNWOOD DR", low: 1, high: 10000, school: "PM" },
  { street: "AVALON CT", low: 1, high: 10000, school: "MW" },
  { street: "AVENIDA SEVILLA", low: 1, high: 10000, school: "PM" },
  { street: "AVONDALE CT", low: 1, high: 10000, school: "MW" },
  { street: "AZALEA DR", low: 1, high: 10000, school: "PM" },
  { street: "BAJA LN", low: 1, high: 10000, school: "PM" },
  { street: "BALES DR", low: 1, high: 10000, school: "WH" },
  { street: "BALL RD", low: 1, high: 10000, school: "WH" },
  { street: "BANDO CT", low: 1, high: 10000, school: "MW" },
  { street: "BARKLEY AVE", low: 1, high: 10000, school: "BV" },
  { street: "BASALT CT", low: 1, high: 10000, school: "PM" },
  { street: "BEECH CT", low: 1, high: 10000, school: "WH" },
  { street: "BEECH DR", low: 1, high: 10000, school: "WH" },
  { street: "BEISHEIM LN", low: 1, high: 10000, school: "PM" },
  { street: "BELLFLOWER CT", low: 1, high: 10000, school: "WH" },
  { street: "BELLFLOWER PL", low: 1, high: 10000, school: "WH" },
  { street: "BELLOWS CT", low: 1, high: 10000, school: "WH" },
  { street: "BENHAM CT", low: 1, high: 10000, school: "MW" },
  { street: "BIG OAK CT", low: 1, high: 10000, school: "WH" },
  { street: "BIRCH DR", low: 1, high: 10000, school: "IV" },
  { street: "BISHOP LN", low: 1, high: 10000, school: "MW" },
  { street: "BLACK OAK KNOLLS", low: 1, high: 10000, school: "WH" },
  { street: "BLACKWOOD CT", low: 1, high: 10000, school: "MW" },
  { street: "BLACKWOOD DR", low: 1, high: 10000, school: "MW" },
  { street: "BLADE CT", low: 1, high: 10000, school: "PM" },
  { street: "BLADE WAY", low: 1, high: 10000, school: "PM" },
  { street: "BOLBONES CT", low: 1, high: 10000, school: "PM" },
  { street: "BONANZA ST", low: 1, high: 1999, school: "PM" },
  { street: "BONITA CT", low: 1, high: 10000, school: "PM" },
  { street: "BONITA LN", low: 1, high: 10000, school: "PM" },
  { street: "BONT LN", low: 1, high: 10000, school: "PM" },
  { street: "BOTELHO DR", low: 1, high: 10000, school: "PM" },
  { street: "BOULEVARD CIR", low: 1, high: 10000, school: "BV" },
  { street: "BOULEVARD CT", low: 1, high: 10000, school: "PM" },
  { street: "BOULEVARD WAY", low: 1, high: 10000, school: "PM" },
  { street: "BRADLEY AVE", low: 1, high: 10000, school: "WH" },
  { street: "BRANTFORD CT", low: 1, high: 10000, school: "MW" },
  { street: "BRASERO LN", low: 1, high: 10000, school: "WH" },
  { street: "BRENTWOOD CT", low: 1, high: 10000, school: "PM" },
  { street: "BRIA CT", low: 1, high: 10000, school: "BV" },
  { street: "BRIARWOOD CT", low: 11, high: 70, school: "IV" },
  { street: "BRIARWOOD WAY", low: 1165, high: 1199, school: "IV" },
  { street: "BRIDGE RD", low: 1, high: 10000, school: "PM" },
  { street: "BROADWAY NORTH", low: 1200, high: 1999, school: "WH" },
  { street: "BROADWAY NORTH", low: 2000, high: 2299, school: "BV" },
  { street: "BROADWAY SOUTH", low: 600, high: 899, school: "WH" },
  { street: "BROADWAY LN", low: 1, high: 10000, school: "WH" },
  { street: "BROADWAY PLZ", low: 1, high: 10000, school: "WH" },
  { street: "BROMFIELD CT", low: 1, high: 10000, school: "MW" },
  { street: "BRONSON LN", low: 1, high: 10000, school: "WH" },
  { street: "BROOKDALE AVE", low: 1, high: 10000, school: "MW" },
  { street: "BROOKDALE CT", low: 1, high: 10000, school: "MW" },
  { street: "BROOKS ST", low: 1, high: 10000, school: "PM" },
  { street: "BRUBAKER CT", low: 1, high: 10000, school: "WH" },
  { street: "BRUBAKER DR", low: 1, high: 10000, school: "WH" },
  { street: "BUENA VISTA AVE", low: 2200, high: 2591, school: "BV" },
  { street: "BUENA VISTA PL", low: 700, high: 781, school: "BV" },
  { street: "BURL HOLLOW CT", low: 1, high: 10000, school: "WH" },
  { street: "CACTUS CT", low: 1, high: 10000, school: "PM" },
  { street: "CALDER LN", low: 1, high: 10000, school: "IV" },
  { street: "CALIFORNIA BLVD NORTH", low: 1300, high: 1899, school: "PM" },
  { street: "CALIFORNIA BLVD NORTH", low: 1900, high: 10000, school: "BV" },
  { street: "CALIFORNIA BLVD SOUTH", low: 1, high: 10000, school: "BV" },
  { street: "CALVIN CT", low: 1, high: 10000, school: "PM" },
  { street: "CAMEL LN", low: 1, high: 10000, school: "MW" },
  { street: "CAMELIA LN", low: 1, high: 10000, school: "PM" },
  { street: "CAMINAR WAY", low: 1, high: 10000, school: "WH" },
  { street: "CAMINO DIABLO", low: 2500, high: 2750, school: "BV" },
  { street: "CAMINO POSADA", low: 1, high: 10000, school: "PM" },
  { street: "CAMINO POSADA CT", low: 1, high: 10000, school: "PM" },
  { street: "CAMINO VERDE", low: 1295, high: 1295, school: "BV" },
  { street: "CAMINO VERDE CIR", low: 1, high: 10000, school: "BV" },
  { street: "CAMROSE PL", low: 1, high: 10000, school: "WH" },
  { street: "CANDLEWOOD PL", low: 1, high: 10000, school: "PM" },
  { street: "CAPWELL ST", low: 1, high: 10000, school: "WH" },
  { street: "CARA CT", low: 1, high: 10000, school: "WH" },
  { street: "CARDIGAN CT", low: 1, high: 10000, school: "WH" },
  { street: "CARDIGAN DR", low: 1, high: 10000, school: "MW" },
  { street: "CARLBACK AVE", low: 1, high: 10000, school: "WH" },
  { street: "CARMEL CT", low: 1, high: 10000, school: "WH" },
  { street: "CARMEL DR", low: 1, high: 10000, school: "WH" },
  { street: "CARMELLO RD", low: 1, high: 10000, school: "BV" },
  { street: "CARROL RD", low: 1, high: 10000, school: "MW" },
  { street: "CASA WAY", low: 1, high: 10000, school: "BV" },
  { street: "CASTLE GATE RD", low: 1, high: 10000, school: "PM" },
  { street: "CASTLE GLEN RD", low: 1, high: 10000, school: "PM" },
  { street: "CASTLE HILL CT", low: 1, high: 10000, school: "PM" },
  { street: "CASTLE HILL RANCH RD", low: 1, high: 10000, school: "MW" },
  { street: "CASTLE HILL RD", low: 1500, high: 1698, school: "PM" },
  { street: "CASTLE HILL RD", low: 1501, high: 1699, school: "MW" },
  { street: "CASTLE HILL RD", low: 1700, high: 1900, school: "PM" },
  { street: "CASTLE OAKS CT", low: 1, high: 10000, school: "PM" },
  { street: "CEDARBROOK CT", low: 1, high: 10000, school: "IV" },
  { street: "CELESTE AVE", low: 1, high: 10000, school: "MW" },
  { street: "CENTER CT", low: 1, high: 10000, school: "PM" },
  { street: "CENTER ST", low: 1, high: 10000, school: "PM" },
  { street: "CENTRAL RD", low: 1, high: 10000, school: "BV" },
  { street: "CHANDON CT", low: 1, high: 10000, school: "BV" },
  { street: "CHAPARRO CT", low: 1, high: 10000, school: "WH" },
  { street: "CHAPEL VIEW", low: 1, high: 10000, school: "BV" },
  { street: "CHARMSTONE CT", low: 1, high: 10000, school: "PM" },
  { street: "CHARTER OAK CIR", low: 1, high: 10000, school: "BV" },
  { street: "CHATSWOOD CT", low: 1, high: 10000, school: "MW" },
  { street: "CHERRY LN", low: 1, high: 10000, school: "IV" },
  { street: "CHERRY WAY", low: 1, high: 10000, school: "IV" },
  { street: "CHESTERTON CT", low: 1, high: 10000, school: "MW" },
  { street: "CHESTERTON DR", low: 1, high: 10000, school: "MW" },
  { street: "CHESTERTON WAY", low: 1, high: 10000, school: "MW" },
  { street: "CHEVAL LN", low: 1, high: 10000, school: "MW" },
  { street: "CHILTERN DR", low: 1, high: 10000, school: "MW" },
  { street: "CHIVES WAY", low: 1, high: 10000, school: "PM" },
  { street: "CHRISTMAS TREE CT", low: 1, high: 10000, school: "WH" },
  { street: "CHRISTOPHER LN", low: 1, high: 10000, school: "MW" },
  { street: "CHURCHILL DOWNS CT", low: 1, high: 10000, school: "BV" },
  { street: "CIRCLE DR", low: 1, high: 10000, school: "PM" },
  { street: "CIVIC DR NORTH", low: 140, high: 640, school: "BV" },
  { street: "CIVIC DR", low: 1100, high: 1499, school: "WH" },
  { street: "CIVIC DR", low: 1500, high: 1599, school: "PM" },
  { street: "CLARK LN", low: 1, high: 10000, school: "BV" },
  { street: "CLARKIN CT", low: 1, high: 10000, school: "WH" },
  { street: "CLIFF LN", low: 1, high: 10000, school: "MW" },
  { street: "CLIFTON CT", low: 1, high: 10000, school: "PM" },
  { street: "CLOVER LN", low: 1, high: 10000, school: "PM" },
  { street: "COCO LN", low: 1, high: 10000, school: "IV" },
  { street: "COLE AVE", low: 1, high: 10000, school: "PM" },
  { street: "COMMERCIAL LN", low: 1, high: 10000, school: "PM" },
  { street: "CORA CT", low: 1, high: 10000, school: "IV" },
  { street: "CORNWALL CT", low: 1, high: 10000, school: "BV" },
  { street: "CORONADO CT", low: 1, high: 10000, school: "WH" },
  { street: "COTTAGE CT", low: 1, high: 10000, school: "PM" },
  { street: "COTTAGE LN", low: 1, high: 10000, school: "PM" },
  { street: "COULTER PINE CT", low: 1, high: 10000, school: "PM" },
  { street: "COUNTRY LN", low: 1, high: 10000, school: "WH" },
  { street: "COUNTRYSIDE CT", low: 1, high: 10000, school: "PM" },
  { street: "COVENTRY CT", low: 1, high: 10000, school: "PM" },
  { street: "COVINGTON CT", low: 1, high: 10000, school: "MW" },
  { street: "CRADDOCK CT", low: 1, high: 10000, school: "WH" },
  { street: "CRAGMONT CT", low: 1, high: 10000, school: "IV" },
  { street: "CRAGMONT DR", low: 1, high: 10000, school: "IV" },
  { street: "CRAWFORD CT", low: 1, high: 10000, school: "PM" },
  { street: "CREEKDALE RD", low: 1, high: 10000, school: "PM" },
  { street: "CREEKSIDE DR", low: 1, high: 10000, school: "MW" },
  { street: "CROKAERTS RD", low: 1, high: 10000, school: "BV" },
  { street: "CROSS CREEK RD", low: 1, high: 10000, school: "MW" },
  { street: "CROWLEY PL", low: 1, high: 10000, school: "BV" },
  { street: "CUESTA WAY", low: 1, high: 10000, school: "BV" },
  { street: "CULLEN CT", low: 1, high: 10000, school: "BV" },
  { street: "CYPRESS ST", low: 1401, high: 1499, school: "WH" },
  { street: "CYPRESS ST", low: 1500, high: 1699, school: "PM" },
  { street: "DANFORTH LN", low: 1, high: 10000, school: "IV" },
  { street: "DANTLEY WAY", low: 1, high: 10000, school: "IV" },
  { street: "DANVILLE BLVD", low: 1955, high: 2433, school: "MW" },
  { street: "DAPPLEGRAY LN", low: 2103, high: 2307, school: "MW" },
  { street: "DARBY CT", low: 1, high: 10000, school: "MW" },
  { street: "DECCA LN", low: 1, high: 10000, school: "BV" },
  { street: "DEERFIELD LN", low: 1, high: 10000, school: "PM" },
  { street: "DEL HAMBRE CIR", low: 1, high: 10000, school: "PM" },
  { street: "DEL HOMBRE LN", low: 1, high: 10000, school: "IV" },
  { street: "DEL MONTE CT", low: 1, high: 10000, school: "PM" },
  { street: "DEL MONTE DR", low: 1, high: 10000, school: "PM" },
  { street: "DEL ROSA CT", low: 1, high: 10000, school: "MW" },
  { street: "DEODORA WAY", low: 1, high: 10000, school: "BV" },
  { street: "DEVITA CT", low: 1, high: 10000, school: "MW" },
  { street: "DEVONSHIRE CT", low: 1, high: 10000, school: "MW" },
  { street: "DEWING LN", low: 1, high: 10000, school: "PM" },
  { street: "DON CIR", low: 1, high: 10000, school: "MW" },
  { street: "DORA AVE", low: 1, high: 10000, school: "PM" },
  { street: "DORIS AVE", low: 1, high: 10000, school: "MW" },
  { street: "DOS ROBLES CT", low: 1, high: 10000, school: "IV" },
  { street: "DRAKE CT", low: 1, high: 10000, school: "BV" },
  { street: "DUNCAN ST", low: 1, high: 10000, school: "WH" },
  { street: "DURANT CT", low: 1, high: 10000, school: "MW" },
  { street: "ECKLEY LN", low: 1, high: 10000, school: "WH" },
  { street: "ECKLEY PL", low: 1, high: 10000, school: "WH" },
  { street: "EDGEMONT CIR", low: 1, high: 10000, school: "MW" },
  { street: "EDMUND CT", low: 1, high: 10000, school: "WH" },
  { street: "EL CAMINITO CT", low: 1, high: 10000, school: "IV" },
  { street: "EL CAMINO CORTO", low: 1, high: 10000, school: "WH" },
  { street: "EL CAMINO TER", low: 1, high: 10000, school: "WH" },
  { street: "EL MIRADOR", low: 1, high: 10000, school: "MW" },
  { street: "EL PASEO CIR", low: 1, high: 10000, school: "BV" },
  { street: "EL VERANO DR", low: 1, high: 10000, school: "IV" },
  { street: "ELISE CT", low: 1, high: 10000, school: "WH" },
  { street: "ELIZABETH CT", low: 1, high: 10000, school: "MW" },
  { street: "ELLERY CT", low: 1, high: 10000, school: "PM" },
  { street: "ELMWOOD CT", low: 1, high: 10000, school: "IV" },
  { street: "ELMWOOD DR", low: 1, high: 10000, school: "IV" },
  { street: "ENCINAL DR", low: 1, high: 10000, school: "BV" },
  { street: "ENDICOTT CT", low: 1, high: 10000, school: "IV" },
  { street: "EUCALYPTUS CT", low: 1, high: 10000, school: "MW" },
  { street: "EXBOURNE CT", low: 1, high: 10000, school: "MW" },
  { street: "FAGES CT", low: 1, high: 10000, school: "PM" },
  { street: "FALLEN OAK CT", low: 1, high: 10000, school: "PM" },
  { street: "FERN DR", low: 1, high: 10000, school: "PM" },
  { street: "FIELDGATE LN", low: 1, high: 10000, school: "PM" },
  { street: "FLORA AVE", low: 1, high: 10000, school: "PM" },
  { street: "FLORA ST", low: 151, high: 173, school: "PM" },
  { street: "FOLEY CT", low: 1, high: 10000, school: "PM" },
  { street: "FOSS CT", low: 1, high: 10000, school: "IV" },
  { street: "FRANCES WAY", low: 1, high: 10000, school: "IV" },
  { street: "FRASER CT", low: 1, high: 10000, school: "WH" },
  { street: "FRASER DR", low: 1, high: 10000, school: "WH" },
  { street: "GABRIEL CT", low: 1, high: 10000, school: "BV" },
  { street: "GALEN DR", low: 1, high: 10000, school: "BV" },
  { street: "GARDEN CT", low: 1, high: 10000, school: "PM" },
  { street: "GARLAND CT", low: 1, high: 10000, school: "MW" },
  { street: "GARRON CT", low: 1, high: 10000, school: "MW" },
  { street: "GENTRY CT", low: 1, high: 10000, school: "IV" },
  { street: "GERRY CT", low: 1, high: 10000, school: "WH" },
  { street: "GIAMMONA DR", low: 1, high: 10000, school: "PM" },
  { street: "GLADWIN CT", low: 1, high: 10000, school: "MW" },
  { street: "GLADWIN DR", low: 1, high: 10000, school: "MW" },
  { street: "GLEN CT", low: 1, high: 10000, school: "PM" },
  { street: "GLEN VIEW DR", low: 1, high: 10000, school: "PM" },
  { street: "GLENCREEK LN", low: 1, high: 10000, school: "PM" },
  { street: "GLENGARRY DR", low: 1, high: 10000, school: "MW" },
  { street: "GLENGARRY LN", low: 1, high: 10000, school: "MW" },
  { street: "GLENHAVEN AVE", low: 1, high: 10000, school: "PM" },
  { street: "GLENMORE WAY", low: 1, high: 10000, school: "WH" },
  { street: "GOLDEN HILL CT", low: 1, high: 10000, school: "WH" },
  { street: "GOLDEN HILL PL", low: 1, high: 10000, school: "WH" },
  { street: "GORDON RD", low: 1, high: 10000, school: "IV" },
  { street: "GRANDVIEW PL", low: 1, high: 10000, school: "PM" },
  { street: "GRANGER ST", low: 1, high: 10000, school: "PM" },
  { street: "GRANT AVE", low: 1, high: 10000, school: "MW" },
  { street: "GREEN BAY CT", low: 1, high: 10000, school: "PM" },
  { street: "GREEN OAKS CT", low: 1, high: 10000, school: "WH" },
  { street: "GREEN VIEW CT", low: 1, high: 10000, school: "WH" },
  { street: "GREEN VIEW DR", low: 1, high: 10000, school: "WH" },
  { street: "GREENWAY DR", low: 1, high: 10000, school: "WH" },
  { street: "GREGG WAY", low: 1, high: 10000, school: "WH" },
  { street: "GROVER CT", low: 1, high: 10000, school: "MW" },
  { street: "GROVER LN", low: 1, high: 10000, school: "MW" },
  { street: "HACIENDA DR", low: 1, high: 10000, school: "IV" },
  { street: "HADDEN RD", low: 1, high: 10000, school: "MW" },
  { street: "HAMMERSMITH CT", low: 1, high: 10000, school: "PM" },
  { street: "HANSON LN", low: 1, high: 10000, school: "WH" },
  { street: "HARD WAY", low: 1, high: 10000, school: "MW" },
  { street: "HARVARD CIR", low: 1, high: 10000, school: "BV" },
  { street: "HARVARD WAY", low: 1, high: 10000, school: "BV" },
  { street: "HARVEY DR", low: 0, high: 10000, school: "IV" },
  { street: "HAVEN LN", low: 1, high: 10000, school: "IV" },
  { street: "HAWTHORNE CT", low: 1, high: 10000, school: "WH" },
  { street: "HAWTHORNE DR", low: 1, high: 10000, school: "WH" },
  { street: "HAZELWOOD DR", low: 1, high: 10000, school: "WH" },
  { street: "HEATHER LN", low: 1, high: 10000, school: "IV" },
  { street: "HERITAGE CT", low: 1, high: 10000, school: "BV" },
  { street: "HERMINE AVE", low: 1, high: 10000, school: "MW" },
  { street: "HERMINE CT", low: 1, high: 10000, school: "MW" },
  { street: "HERRON AVE", low: 1, high: 10000, school: "MW" },
  { street: "HILLCROFT WAY", low: 1, high: 10000, school: "BV" },
  { street: "HILLENDALE CT", low: 1, high: 10000, school: "MW" },
  { street: "HILLGRADE AVE", low: 1, high: 10000, school: "MW" },
  { street: "HILLSIDE AVE", low: 2000, high: 2099, school: "PM" },
  { street: "HILLSIDE AVE", low: 2100, high: 2299, school: "BV" },
  { street: "HILLSIDE CT", low: 1, high: 10000, school: "BV" },
  { street: "HILLTOP CRESCENT", low: 1, high: 10000, school: "BV" },
  { street: "HILLVIEW DR", low: 1, high: 10000, school: "MW" },
  { street: "HILLVIEW TER", low: 1, high: 10000, school: "WH" },
  { street: "HOLCOMB CT", low: 1, high: 10000, school: "WH" },
  { street: "HOLLY HILL CT", low: 1, high: 10000, school: "WH" },
  { street: "HOLLY HILL DR", low: 1, high: 10000, school: "WH" },
  { street: "HOLLY ST WEST", low: 1, high: 1000, school: "IV" },
  { street: "HOLTON CT", low: 1, high: 10000, school: "IV" },
  { street: "HOMESTEAD AVE", low: 1, high: 1000, school: "WH" },
  { street: "HOMESTEAD AVE", low: 1001, high: 10000, school: "IV" },
  { street: "HONEY LOCUST CT", low: 1, high: 10000, school: "PM" },
  { street: "HONEY TRAIL", low: 1, high: 10000, school: "IV" },
  { street: "HOWARD CT", low: 1, high: 10000, school: "IV" },
  { street: "HUNTINGTON WAY", low: 1, high: 10000, school: "WH" },
  { street: "HUNTOON CT", low: 1, high: 10000, school: "WH" },
  { street: "IRIS LN", low: 1, high: 10000, school: "PM" },
  { street: "ISLAND CT", low: 1, high: 10000, school: "PM" },
  { street: "IVY CT", low: 1, high: 10000, school: "PM" },
  { street: "JEANETTE CT", low: 1, high: 10000, school: "MW" },
  { street: "JEFFREY LN", low: 1, high: 10000, school: "IV" },
  { street: "JEROME CT", low: 1, high: 10000, school: "WH" },
  { street: "JOANN CT", low: 1, high: 10000, school: "IV" },
  { street: "JOCELYN PL", low: 1, high: 99, school: "BV" },
  { street: "JONES PL", low: 1, high: 10000, school: "BV" },
  { street: "JONES RD", low: 1, high: 10000, school: "BV" },
  { street: "JULIANNE CT", low: 1, high: 10000, school: "PM" },
  { street: "JUNIPER LN", low: 1, high: 10000, school: "BV" },
  { street: "KAREN CT", low: 1, high: 10000, school: "IV" },
  { street: "KAREN LN", low: 1, high: 10000, school: "IV" },
  { street: "KAYSER CT", low: 1, high: 10000, school: "MW" },
  { street: "KAZEBEER RD", low: 1, high: 10000, school: "IV" },
  { street: "KEAVENY CT", low: 1, high: 10000, school: "BV" },
  { street: "KENDALL CT", low: 1, high: 10000, school: "PM" },
  { street: "KENDALL RD", low: 1, high: 10000, school: "PM" },
  { street: "KENILWORTH CT", low: 1, high: 10000, school: "MW" },
  { street: "KENTON CT", low: 1, high: 10000, school: "MW" },
  { street: "KEVIN CT", low: 1, high: 10000, school: "WH" },
  { street: "KEYS CT", low: 1, high: 10000, school: "BV" },
  { street: "KING DR", low: 300, high: 300, school: "PM" },
  { street: "KINGRIDGE CT", low: 1, high: 10000, school: "MW" },
  { street: "KINGS OAK PL", low: 1, high: 10000, school: "IV" },
  { street: "KINGSDALE CT", low: 1, high: 10000, school: "MW" },
  { street: "KINGSDALE DR", low: 1, high: 10000, school: "MW" },
  { street: "KINGSTON PL", low: 1, high: 10000, school: "IV" },
  { street: "KINGSTON WAY", low: 1, high: 10000, school: "BV" },
  { street: "KNIGHTWOOD CT", low: 1, high: 10000, school: "MW" },
  { street: "KOALA CT", low: 1, high: 10000, school: "MW" },
  { street: "KRISTIN WAY", low: 1, high: 10000, school: "MW" },
  { street: "KUHL CT", low: 1, high: 10000, school: "BV" },
  { street: "LA BOLSA RD", low: 1, high: 10000, school: "IV" },
  { street: "LA MESA LN", low: 1, high: 10000, school: "IV" },
  { street: "LA VISTA CT", low: 1, high: 10000, school: "IV" },
  { street: "LA VISTA RD", low: 1, high: 10000, school: "IV" },
  { street: "LACASSIE AVE", low: 1, high: 10000, school: "PM" },
  { street: "LACASSIE CT", low: 1, high: 10000, school: "PM" },
  { street: "LAKE PL", low: 1, high: 10000, school: "IV" },
  { street: "LAKE WAY", low: 1, high: 10000, school: "IV" },
  { street: "LAKEWOOD CIR", low: 1, high: 10000, school: "IV" },
  { street: "LAKEWOOD RD", low: 1, high: 10000, school: "IV" },
  { street: "LAMOUR LN", low: 1, high: 10000, school: "WH" },
  { street: "LANCASTER CT", low: 1, high: 10000, school: "PM" },
  { street: "LANCASTER RD", low: 1, high: 10000, school: "PM" },
  { street: "LARKEY LN", low: 2278, high: 2499, school: "BV" },
  { street: "LATE HORIZON PL", low: 1, high: 10000, school: "PM" },
  { street: "LATIMER PL", low: 1, high: 10000, school: "WH" },
  { street: "LAUREL DR", low: 1, high: 10000, school: "WH" },
  { street: "LAUREL OAK LN", low: 1, high: 10000, school: "PM" },
  { street: "LAWRENCE WAY", low: 1, high: 10000, school: "BV" },
  { street: "LAYMAN CT", low: 1, high: 10000, school: "MW" },
  { street: "LEE ST", low: 1, high: 10000, school: "PM" },
  { street: "LEIGH CT", low: 1, high: 10000, school: "IV" },
  { street: "LEROY LN", low: 1, high: 10000, school: "BV" },
  { street: "LESNICK LN", low: 1, high: 10000, school: "BV" },
  { street: "LILAC DR", low: 1, high: 10000, school: "PM" },
  { street: "LILY CT", low: 1, high: 10000, school: "PM" },
  { street: "LILY ST", low: 1, high: 10000, school: "PM" },
  { street: "LINCOLN AVE", low: 1, high: 10000, school: "WH" },
  { street: "LINDELL DR", low: 1124, high: 1199, school: "WH" },
  { street: "LINDELL DR", low: 1200, high: 10000, school: "MW" },
  { street: "LIVE OAK WAY", low: 1, high: 10000, school: "WH" },
  { street: "LOCUST ST", low: 1100, high: 1299, school: "BV" },
  { street: "LOCUST ST", low: 1300, high: 1766, school: "PM" },
  { street: "LOMA VISTA", low: 1, high: 10000, school: "BV" },
  { street: "LOMBARDI CIR", low: 1, high: 10000, school: "IV" },
  { street: "LOMMEL CT", low: 1, high: 10000, school: "IV" },
  { street: "LONDONDERRY CT", low: 1, high: 10000, school: "MW" },
  { street: "LORIE CT", low: 1, high: 10000, school: "BV" },
  { street: "LUCY LN", low: 2500, high: 2601, school: "PM" },
  { street: "LUCY LN", low: 3622, high: 3622, school: "PM" },
  { street: "MADONNA LN", low: 1, high: 10000, school: "BV" },
  { street: "MAGNOLIA CT", low: 1, high: 10000, school: "PM" },
  { street: "MAGNOLIA WAY", low: 1, high: 10000, school: "PM" },
  { street: "MAIN NORTH", low: 1200, high: 1998, school: "WH" },
  { street: "MAIN NORTH", low: 1201, high: 1999, school: "PM" },
  { street: "MAIN NORTH", low: 2000, high: 10000, school: "BV" },
  { street: "MAIN SOUTH", low: 1198, high: 1400, school: "WH" },
  { street: "MAIN SOUTH", low: 1199, high: 1399, school: "PM" },
  { street: "MAIN SOUTH", low: 1400, high: 2031, school: "MW" },
  { street: "MANDALA CT", low: 1, high: 10000, school: "WH" },
  { street: "MAPLE LN", low: 1, high: 10000, school: "PM" },
  { street: "MARBI LN", low: 1, high: 10000, school: "BV" },
  { street: "MARGARET DR", low: 1, high: 10000, school: "MW" },
  { street: "MARGARIDO DR", low: 1, high: 10000, school: "WH" },
  { street: "MARIA LN", low: 1, high: 10000, school: "MW" },
  { street: "MARIPOSA WAY", low: 1, high: 10000, school: "IV" },
  { street: "MARLO CT", low: 1, high: 10000, school: "PM" },
  { street: "MARSHALL CT", low: 1, high: 10000, school: "IV" },
  { street: "MARSHALL DR", low: 1, high: 10000, school: "IV" },
  { street: "MATTHEW CT", low: 900, high: 920, school: "WH" },
  { street: "MAZDA DR", low: 1, high: 10000, school: "BV" },
  { street: "MCCONNELL LN", low: 1, high: 10000, school: "WH" },
  { street: "MCGUIRE DR", low: 1, high: 10000, school: "WH" },
  { street: "MEADOW CREEK CT", low: 1, high: 10000, school: "WH" },
  { street: "MEADOW CREST LN", low: 1, high: 10000, school: "MW" },
  { street: "MEADOW CT", low: 1, high: 10000, school: "PM" },
  { street: "MEADOW LN", low: 1, high: 10000, school: "PM" },
  { street: "MEADOW RD", low: 1900, high: 1990, school: "MW" },
  { street: "MEADOW RD", low: 1901, high: 1989, school: "PM" },
  { street: "MELISSA CT", low: 1, high: 10000, school: "IV" },
  { street: "MELROSE CT", low: 1, high: 10000, school: "PM" },
  { street: "MERIWEATHER CT", low: 1, high: 10000, school: "MW" },
  { street: "MIDVALE CT", low: 1, high: 10000, school: "BV" },
  { street: "MILLER CT", low: 1, high: 10000, school: "MW" },
  { street: "MILTON AVE", low: 1, high: 10000, school: "MW" },
  { street: "MIRAMONTE CT", low: 1, high: 10000, school: "BV" },
  { street: "MIRAMONTE RD", low: 1, high: 10000, school: "BV" },
  { street: "MIRKO LN", low: 1, high: 10000, school: "MW" },
  { street: "MOCKINGBIRD HILL RD", low: 1, high: 10000, school: "BV" },
  { street: "MOLLY WAY", low: 1, high: 10000, school: "PM" },
  { street: "MONTANYA CT", low: 1, high: 10000, school: "BV" },
  { street: "MONTCLAIR CIR", low: 1, high: 10000, school: "BV" },
  { street: "MONTCLAIR CT", low: 1, high: 10000, school: "BV" },
  { street: "MONTCLAIR DR", low: 1, high: 10000, school: "BV" },
  { street: "MONTE CREST CT", low: 1, high: 10000, school: "PM" },
  { street: "MONTECILLO CT", low: 1, high: 10000, school: "PM" },
  { street: "MONTECILLO DR", low: 1, high: 10000, school: "PM" },
  { street: "MONTECITO CRES", low: 1, high: 10000, school: "BV" },
  { street: "MOUNTAIN VIEW BLVD", low: 1014, high: 1251, school: "WH" },
  { street: "MOUNTAIN VIEW BLVD", low: 1261, high: 1299, school: "MW" },
  { street: "MOUNTAIN VIEW BLVD", low: 1280, high: 1298, school: "WH" },
  { street: "MOUNTAIN VIEW BLVD", low: 1300, high: 2252, school: "MW" },
  { street: "MT DIABLO BLVD", low: 1100, high: 1499, school: "WH" },
  { street: "MT DIABLO BLVD", low: 1500, high: 2099, school: "PM" },
  { street: "MT PISGAH RD", low: 1, high: 10000, school: "WH" },
  { street: "MULBERRY LN", low: 1, high: 10000, school: "BV" },
  { street: "MULLER RD", low: 1, high: 10000, school: "IV" },
  { street: "MURWOOD CT", low: 1, high: 10000, school: "MW" },
  { street: "MURWOOD DR", low: 1, high: 10000, school: "MW" },
  { street: "MYNAH CT", low: 1, high: 10000, school: "WH" },
  { street: "MYRA DELL RD", low: 1, high: 10000, school: "BV" },
  { street: "NATOMA CT", low: 1, high: 10000, school: "WH" },
  { street: "NEWCASTLE CT", low: 1, high: 10000, school: "PM" },
  { street: "NEWELL AVE", low: 1200, high: 1400, school: "WH" },
  { street: "NEWELL AVE", low: 1201, high: 1399, school: "MW" },
  { street: "NEWELL AVE", low: 1400, high: 1967, school: "PM" },
  { street: "NEWELL HILL PL", low: 1, high: 10000, school: "MW" },
  { street: "NICHOLSON RD", low: 1, high: 10000, school: "PM" },
  { street: "NOB HILL DR", low: 1, high: 10000, school: "WH" },
  { street: "NORLYN DR", low: 1, high: 10000, school: "WH" },
  { street: "NORMAN CT", low: 1, high: 10000, school: "PM" },
  { street: "NORRIS RD", low: 1, high: 10000, school: "MW" },
  { street: "NURSERY LN", low: 1, high: 10000, school: "MW" },
  { street: "OAK CIR", low: 1, high: 10000, school: "BV" },
  { street: "OAK KNOLL CT", low: 1, high: 10000, school: "WH" },
  { street: "OAK KNOLL LOOP", low: 1, high: 233, school: "WH" },
  { street: "OAK RD", low: 2520, high: 2860, school: "IV" },
  { street: "OAK RD", low: 2521, high: 2861, school: "BV" },
  { street: "OAKDENE CT", low: 1, high: 10000, school: "WH" },
  { street: "OAKLAND BLVD", low: 1, high: 10000, school: "PM" },
  { street: "OAKLAND CT", low: 1, high: 10000, school: "PM" },
  { street: "OAKVALE CT", low: 1, high: 10000, school: "BV" },
  { street: "OAKVALE RD", low: 1, high: 10000, school: "BV" },
  { street: "OAKVALE TER", low: 1, high: 10000, school: "BV" },
  { street: "OLD OAK DR", low: 1, high: 10000, school: "PM" },
  { street: "OLYMPIC BLVD", low: 1517, high: 2299, school: "PM" },
  { street: "OPAL ST", low: 1, high: 10000, school: "MW" },
  { street: "ORCHARD LN", low: 1, high: 10000, school: "PM" },
  { street: "ORINDA LN", low: 1, high: 10000, school: "BV" },
  { street: "ORO VALLEY CIR", low: 1, high: 10000, school: "WH" },
  { street: "ORO VALLEY CT", low: 1, high: 10000, school: "WH" },
  { street: "OVERLOOK CT", low: 1, high: 10000, school: "BV" },
  { street: "OVERLOOK DR", low: 1, high: 10000, school: "BV" },
  { street: "PALANA CT", low: 1, high: 10000, school: "PM" },
  { street: "PALMER RD", low: 1, high: 10000, school: "WH" },
  { street: "PANORAMIC WAY", low: 1, high: 10000, school: "PM" },
  { street: "PARK AVE", low: 1, high: 10000, school: "PM" },
  { street: "PARK CT EAST", low: 1, high: 10000, school: "BV" },
  { street: "PARK CT WEST", low: 1, high: 10000, school: "BV" },
  { street: "PARK TERRACE CT", low: 1, high: 10000, school: "BV" },
  { street: "PARK VIEW CT", low: 1, high: 10000, school: "BV" },
  { street: "PARKMEAD CT", low: 1, high: 10000, school: "PM" },
  { street: "PARKSIDE DR", low: 1, high: 10000, school: "BV" },
  { street: "PARNELL CT", low: 1, high: 10000, school: "IV" },
  { street: "PARROT CT", low: 1, high: 10000, school: "WH" },
  { street: "PASEO CIMA", low: 1, high: 10000, school: "IV" },
  { street: "PASEO ROBLE CT", low: 1, high: 10000, school: "BV" },
  { street: "PASTO CT", low: 1, high: 10000, school: "PM" },
  { street: "PAULSON LN", low: 1, high: 10000, school: "PM" },
  { street: "PEBBLEBROOK CT", low: 1, high: 10000, school: "MW" },
  { street: "PETERSON PL", low: 1, high: 10000, school: "PM" },
  { street: "PETTICOAT LN", low: 1, high: 10000, school: "PM" },
  { street: "PICNIC LN", low: 1, high: 10000, school: "BV" },
  { street: "PIMLICO CT", low: 1, high: 10000, school: "BV" },
  { street: "PIMLICO DR", low: 1, high: 10000, school: "BV" },
  { street: "PINE GROVE CT", low: 1, high: 10000, school: "IV" },
  { street: "PINE ST", low: 1, high: 10000, school: "BV" },
  { street: "PINO CREST", low: 1, high: 10000, school: "IV" },
  { street: "PLACER RIDGE RD", low: 1, high: 10000, school: "BV" },
  { street: "POCO LN", low: 1, high: 10000, school: "PM" },
  { street: "POPLAR CT", low: 1, high: 10000, school: "PM" },
  { street: "POPLAR DR", low: 1, high: 10000, school: "PM" },
  { street: "POPPY CT", low: 1, high: 10000, school: "MW" },
  { street: "PREAKNESS CT", low: 1, high: 10000, school: "BV" },
  { street: "PREAKNESS DR", low: 1, high: 10000, school: "BV" },
  { street: "PRINGLE AVE", low: 1, high: 10000, school: "BV" },
  { street: "PROVIDENCE CT", low: 1, high: 10000, school: "MW" },
  { street: "RACHELE RD", low: 1, high: 10000, school: "BV" },
  { street: "RAINBOW VIEW DR", low: 1, high: 10000, school: "PM" },
  { street: "RAMSAY CIR", low: 1, high: 10000, school: "BV" },
  { street: "RANDALL RD", low: 1, high: 10000, school: "BV" },
  { street: "RAVENWOOD DR", low: 1, high: 10000, school: "IV" },
  { street: "RAYMOND CT", low: 1, high: 10000, school: "PM" },
  { street: "REBECCA CT", low: 1, high: 10000, school: "BV" },
  { street: "REDDINGTON CT", low: 1, high: 10000, school: "MW" },
  { street: "REGENCY CT", low: 1, high: 10000, school: "BV" },
  { street: "RICE WAY", low: 1, high: 10000, school: "PM" },
  { street: "RICHARD LN", low: 1, high: 10000, school: "PM" },
  { street: "RIDER CT", low: 1, high: 10000, school: "PM" },
  { street: "RIDGEPOINTE CT", low: 2185, high: 2229, school: "MW" },
  { street: "RIVIERA AVE", low: 1, high: 10000, school: "BV" },
  { street: "ROBB RD", low: 1, high: 10000, school: "MW" },
  { street: "ROBLE RD", low: 1, high: 10000, school: "IV" },
  { street: "ROCKSPRING PL", low: 1, high: 10000, school: "WH" },
  { street: "RODRIGUES LN", low: 1, high: 10000, school: "BV" },
  { street: "ROSE ARBOR LN", low: 1, high: 10000, school: "WH" },
  { street: "ROSE ST", low: 1, high: 10000, school: "PM" },
  { street: "ROSEMONT CT", low: 1, high: 10000, school: "BV" },
  { street: "ROSEWOOD CT", low: 1, high: 10000, school: "WH" },
  { street: "ROSEWOOD DR", low: 1, high: 10000, school: "WH" },
  { street: "ROYAL CT", low: 1, high: 10000, school: "PM" },
  { street: "ROYAL GLEN CT", low: 1, high: 10000, school: "PM" },
  { street: "ROYAL GLEN DR", low: 1, high: 10000, school: "PM" },
  { street: "ROYAL VIEW DR", low: 1, high: 10000, school: "IV" },
  { street: "RUDGEAR DR", low: 1, high: 10000, school: "MW" },
  { street: "RUDGEAR RD", low: 1, high: 10000, school: "MW" },
  { street: "RULE CT", low: 1, high: 10000, school: "PM" },
  { street: "RUSSELL CT", low: 1, high: 10000, school: "IV" },
  { street: "RUSSELL DR", low: 1, high: 10000, school: "IV" },
  { street: "S.O.S. DR", low: 1, high: 10000, school: "BV" },
  { street: "SADDLE OAKS CT", low: 1, high: 10000, school: "WH" },
  { street: "SADDLE RD", low: 1, high: 10000, school: "MW" },
  { street: "SAGE CT", low: 1, high: 10000, school: "BV" },
  { street: "SALLY LN", low: 1, high: 10000, school: "PM" },
  { street: "SAN JUAN AVE", low: 1, high: 10000, school: "BV" },
  { street: "SANDRA CT", low: 1, high: 10000, school: "PM" },
  { street: "SANDY LN", low: 1, high: 10000, school: "BV" },
  { street: "SAN MIGUEL DR", low: 1600, high: 1822, school: "WH" },
  { street: "SAN MIGUEL DR", low: 1823, high: 2095, school: "MW" },
  { street: "SAN MIGUEL DR", low: 1824, high: 2094, school: "WH" },
  { street: "SAN MIGUEL DR", low: 2100, high: 2299, school: "WH" },
  { street: "SAN MIGUEL DR", low: 2300, high: 2560, school: "MW" },
  { street: "SAN SOUCI", low: 1, high: 10000, school: "IV" },
  { street: "SANTA RITA CT", low: 1, high: 10000, school: "MW" },
  { street: "SANTA RITA DR", low: 1, high: 10000, school: "MW" },
  { street: "SANTOS LN", low: 1, high: 10000, school: "IV" },
  { street: "SARANAP AVE", low: 173, high: 211, school: "PM" },
  { street: "SARANAP AVE", low: 1104, high: 1195, school: "PM" },
  { street: "SCHOOL LN", low: 1, high: 10000, school: "BV" },
  { street: "SCOTS CT", low: 1, high: 10000, school: "WH" },
  { street: "SCOTS LN", low: 1, high: 10000, school: "WH" },
  { street: "SEQUOIA AVE", low: 1, high: 10000, school: "PM" },
  { street: "SEQUOIA LN", low: 1, high: 10000, school: "PM" },
  { street: "SEQUOIA TERR", low: 1, high: 10000, school: "PM" },
  { street: "SERENA GARDENS", low: 1, high: 10000, school: "WH" },
  { street: "SERVICE RD", low: 1, high: 10000, school: "BV" },
  { street: "SEVEN HILLS RANCH RD", low: 1, high: 10000, school: "IV" },
  { street: "SHADY GLEN RD", low: 1, high: 10000, school: "WH" },
  { street: "SHADY LN", low: 1, high: 10000, school: "BV" },
  { street: "SHAMROCK DR", low: 1, high: 10000, school: "MW" },
  { street: "SHARENE LN", low: 1, high: 10000, school: "WH" },
  { street: "SHARPE AVE", low: 1, high: 10000, school: "PM" },
  { street: "SHERWOOD WAY", low: 1, high: 10000, school: "BV" },
  { street: "SHORT ST", low: 1, high: 10000, school: "BV" },
  { street: "SHUEY AVE", low: 1, high: 10000, school: "PM" },
  { street: "SIERRA DR", low: 1, high: 10000, school: "WH" },
  { street: "SIERRA LN", low: 1, high: 10000, school: "WH" },
  { street: "SIMPSON CT", low: 1, high: 10000, school: "WH" },
  { street: "SIMPSON DR", low: 1, high: 10000, school: "WH" },
  { street: "SKY RD", low: 1, high: 10000, school: "BV" },
  { street: "SKYCREST DR", low: 1, high: 10000, school: "PM" },
  { street: "SLEIGH LN", low: 1, high: 10000, school: "WH" },
  { street: "SOAPROOT CT", low: 1, high: 10000, school: "PM" },
  { street: "SOBRANTE CT", low: 1, high: 10000, school: "PM" },
  { street: "SOLVEIG DR", low: 1, high: 10000, school: "MW" },
  { street: "SOUSA DR", low: 1, high: 10000, school: "BV" },
  { street: "SOUTHDOWN CT", low: 1, high: 10000, school: "MW" },
  { street: "SPRINGBROOK CT", low: 1, high: 10000, school: "BV" },
  { street: "SPRINGBROOK RD", low: 1267, high: 1600, school: "BV" },
  { street: "SPRINGSIDE RD", low: 1, high: 10000, school: "BV" },
  { street: "SPYROCK CT", low: 1, high: 10000, school: "PM" },
  { street: "ST JOHNS CT", low: 1, high: 10000, school: "BV" },
  { street: "STEDING CT", low: 1, high: 10000, school: "WH" },
  { street: "STEELE CT", low: 1, high: 10000, school: "PM" },
  { street: "STEWART AVE", low: 1, high: 10000, school: "MW" },
  { street: "STOW AVE", low: 1, high: 10000, school: "PM" },
  { street: "STRAND RD", low: 1, high: 10000, school: "MW" },
  { street: "SUENEN CT", low: 1, high: 10000, school: "PM" },
  { street: "SUGARLOAF CT", low: 1, high: 10000, school: "MW" },
  { street: "SUMMIT CIR", low: 1, high: 10000, school: "IV" },
  { street: "SUMMIT RD", low: 1, high: 10000, school: "IV" },
  { street: "SUNBURST CT", low: 1, high: 10000, school: "MW" },
  { street: "SUNNE LN", low: 1, high: 10000, school: "IV" },
  { street: "SUNNY CT", low: 1, high: 10000, school: "PM" },
  { street: "SUTHERLAND DR", low: 1, high: 10000, school: "WH" },
  { street: "SUTTERS MILL CT", low: 1, high: 10000, school: "WH" },
  { street: "SYLVAN RD", low: 1, high: 10000, school: "WH" },
  { street: "TAHOE CT", low: 1, high: 10000, school: "WH" },
  { street: "TERRA BELLA DR", low: 1, high: 10000, school: "WH" },
  { street: "TERRACE RD", low: 1, high: 10000, school: "BV" },
  { street: "TERRACE WAY", low: 1, high: 10000, school: "BV" },
  { street: "TIBURON CT", low: 1, high: 10000, school: "BV" },
  { street: "TICE HOLLOW CT", low: 1, high: 10000, school: "PM" },
  { street: "TICE VALLEY BLVD", low: 1600, high: 2300, school: "PM" },
  { street: "TICE VALLEY BLVD", low: 2310, high: 2380, school: "PM" },
  { street: "TICE VALLEY BLVD", low: 2311, high: 2419, school: "MW" },
  { street: "TICE VALLEY BLVD", low: 2420, high: 2475, school: "MW" },
  { street: "TICE VALLEY LN", low: 1, high: 10000, school: "PM" },
  { street: "TORTOISE PL", low: 1, high: 10000, school: "PM" },
  { street: "TREAT BLVD", low: 1100, high: 1575, school: "IV" },
  { street: "TREECREST PL", low: 1, high: 10000, school: "WH" },
  { street: "TRENTON CT", low: 1, high: 10000, school: "MW" },
  { street: "TRINA CT", low: 1, high: 10000, school: "WH" },
  { street: "TRINITY AVE", low: 1700, high: 1999, school: "PM" },
  { street: "TWIN OAKS LN", low: 401, high: 431, school: "WH" },
  { street: "TWIN PEAKS DR", low: 1, high: 10000, school: "PM" },
  { street: "UKIAH CT", low: 1, high: 10000, school: "PM" },
  { street: "VAL AIRE PL", low: 1, high: 10000, school: "WH" },
  { street: "VALEROSA PL", low: 1, high: 10000, school: "IV" },
  { street: "VALLECITO CT", low: 1, high: 10000, school: "WH" },
  { street: "VALLECITO LN", low: 1, high: 10000, school: "WH" },
  { street: "VALLETON LN", low: 1, high: 10000, school: "WH" },
  { street: "VAN CLEAVE LN", low: 1, high: 10000, school: "WH" },
  { street: "VANDERSLICE AVE", low: 1, high: 10000, school: "MW" },
  { street: "VANDERSLICE CT", low: 1, high: 10000, school: "MW" },
  { street: "VIA LOS NINOS", low: 1, high: 10000, school: "BV" },
  { street: "VIA ROYAL", low: 1, high: 10000, school: "BV" },
  { street: "VIEW LN", low: 1, high: 10000, school: "WH" },
  { street: "VILLA WAY NORTH", low: 1, high: 10000, school: "PM" },
  { street: "VILLA WAY SOUTH", low: 1, high: 10000, school: "PM" },
  { street: "VILLAGE CT", low: 1, high: 10000, school: "WH" },
  { street: "VIRGINIA CT", low: 1, high: 10000, school: "WH" },
  { street: "VISTA HERMOSA", low: 1, high: 10000, school: "BV" },
  { street: "VISTA LN", low: 1, high: 10000, school: "MW" },
  { street: "WALDALE CT", low: 1, high: 10000, school: "BV" },
  { street: "WALDEN RD", low: 1270, high: 1334, school: "IV" },
  { street: "WALDEN RD", low: 1350, high: 1425, school: "BV" },
  { street: "WALKER AVE", low: 1090, high: 1299, school: "WH" },
  { street: "WALLER RD", low: 1, high: 10000, school: "PM" },
  { street: "WALNUT BLVD", low: 2011, high: 2500, school: "IV" },
  { street: "WALNUT BLVD", low: 2500, high: 2598, school: "IV" },
  { street: "WALNUT BLVD", low: 2501, high: 2599, school: "WH" },
  { street: "WALNUT BLVD", low: 2600, high: 4590, school: "WH" },
  { street: "WALNUT CT", low: 1, high: 10000, school: "WH" },
  { street: "WARD DR", low: 1, high: 10000, school: "MW" },
  { street: "WARM SPRINGS CT", low: 1, high: 10000, school: "PM" },
  { street: "WARREN LN", low: 1, high: 10000, school: "BV" },
  { street: "WARREN RD", low: 1, high: 10000, school: "PM" },
  { street: "WATKINS LN", low: 1, high: 10000, school: "WH" },
  { street: "WEBB LN", low: 1, high: 10000, school: "PM" },
  { street: "WESTBOROUGH LN", low: 1, high: 10000, school: "MW" },
  { street: "WESTCLIFFE CIR", low: 1, high: 10000, school: "IV" },
  { street: "WESTCLIFFE LN", low: 1, high: 10000, school: "IV" },
  { street: "WESTCLIFFE PL", low: 1, high: 10000, school: "IV" },
  { street: "WESTMORELAND CIR", low: 1, high: 10000, school: "MW" },
  { street: "WESTMORELAND CT", low: 1, high: 10000, school: "MW" },
  { street: "WESTWOOD CT", low: 1, high: 10000, school: "PM" },
  { street: "WHITE HORSE CT", low: 1, high: 10000, school: "PM" },
  { street: "WHITECLIFF CT", low: 1, high: 10000, school: "MW" },
  { street: "WHITECLIFF WAY", low: 1, high: 10000, school: "MW" },
  { street: "WHYTE PARK AVE", low: 1, high: 10000, school: "PM" },
  { street: "WILD OAK CT", low: 1, high: 10000, school: "WH" },
  { street: "WILKIE DR", low: 1, high: 10000, school: "IV" },
  { street: "WILLOW AVE", low: 1, high: 10000, school: "PM" },
  { street: "WILLOWBROOK LN", low: 1, high: 10000, school: "PM" },
  { street: "WILMINGTON DR", low: 1, high: 10000, school: "MW" },
  { street: "WILSON LN", low: 1, high: 10000, school: "WH" },
  { street: "WINFIELD LN", low: 1, high: 10000, school: "MW" },
  { street: "WOODBURY CT", low: 1, high: 10000, school: "MW" },
  { street: "WOODHAVEN LN", low: 1, high: 10000, school: "PM" },
  { street: "WOODPECKER CT", low: 1, high: 10000, school: "PM" },
  { street: "WOOTTEN DR", low: 1, high: 10000, school: "BV" },
  { street: "WORCHESTER CT", low: 1, high: 10000, school: "MW" },
  { street: "YETTA DR", low: 1, high: 10000, school: "MW" },
  { street: "YGNACIO CT", low: 1, high: 10000, school: "IV" },
  { street: "YGNACIO VALLEY RD", low: 100, high: 498, school: "BV" },
  { street: "YGNACIO VALLEY RD", low: 101, high: 499, school: "PM" },
  { street: "YGNACIO VALLEY RD", low: 500, high: 699, school: "WH" },
  { street: "YGNACIO VALLEY RD", low: 700, high: 799, school: "WH" },
  { street: "YGNACIO VALLEY RD", low: 800, high: 1130, school: "IV" },
  { street: "YOUNGS CT", low: 1, high: 10000, school: "MW" },
  { street: "YOUNGS VALLEY RD", low: 1, high: 10000, school: "MW" },
];

const wcSchoolNames: Record<string, string> = {
  BV: "Buena Vista Elementary",
  IV: "Indian Valley Elementary", 
  MW: "Murwood Elementary",
  PM: "Parkmead Elementary",
  WH: "Walnut Heights Elementary",
};

const wcSchoolRatings: Record<string, number> = {
  BV: 8, IV: 8, MW: 9, PM: 9, WH: 9,
};

const wcSchoolDescriptions: Record<string, string> = {
  BV: "Serves eastern Walnut Creek neighborhoods. Strong community involvement and academics.",
  IV: "Serves the Indian Valley area. Well-regarded elementary with strong parent engagement.",
  MW: "Serves central Walnut Creek. One of the district's highest-rated elementaries.",
  PM: "Serves the Parkmead neighborhood. Consistently strong academic performance.",
  WH: "Serves Walnut Heights area. Top-rated elementary in the Walnut Creek district.",
};

function lookupWCStreet(streetName: string, houseNumber: number): string | null {
  const normalized = streetName.toUpperCase().trim();
  const matches = wcStreetData.filter(entry => {
    return entry.street === normalized && houseNumber >= entry.low && houseNumber <= entry.high;
  });
  if (matches.length > 0) return matches[0].school;
  // Try partial match (remove Ct/Dr/Ln/etc suffix variations)
  const baseName = normalized.replace(/\s+(CT|DR|LN|RD|AVE|BLVD|WAY|PL|CIR|ST|TER|TERR)$/i, '').trim();
  const partial = wcStreetData.filter(entry => {
    const entryBase = entry.street.replace(/\s+(CT|DR|LN|RD|AVE|BLVD|WAY|PL|CIR|ST|TER|TERR)$/i, '').trim();
    return entryBase === baseName && houseNumber >= entry.low && houseNumber <= entry.high;
  });
  if (partial.length > 0) return partial[0].school;
  return null;
}


// ============================================================
// DISTRICT METADATA
// Geometry (paths) is fetched at runtime from the US Census TIGERweb API
// (see the boundary-fetch useEffect below). `census` is the Census BASENAME
// used to match each metadata entry to its returned boundary polygon.
// ============================================================
const districtMeta = [
  {
    name: "Piedmont Unified",
    census: "Piedmont",
    color: "#B22222",
    description: "Independent city district. All Piedmont addresses attend Piedmont Unified schools — one of California's top-ranked public school districts.",
    finderUrl: "https://www.piedmont.k12.ca.us",
    finderLabel: "Piedmont Unified Website",
  },
  {
    name: "Albany Unified",
    census: "Albany",
    color: "#2255B2",
    description: "City of Albany. All Albany addresses attend Albany Unified schools — exceptional K–12 outcomes at a value price point.",
    finderUrl: "https://www.ausdk8.org",
    finderLabel: "Albany Unified Website",
  },
  {
    name: "Berkeley Unified",
    census: "Berkeley",
    color: "#228B22",
    description: "City of Berkeley. School assignment varies by neighborhood — use Berkeley's enrollment finder for your specific address.",
    finderUrl: "https://www.berkeleyschools.net/enrollment/",
    finderLabel: "Berkeley Unified Enrollment",
  },
  {
    name: "Alameda Unified",
    census: "Alameda",
    color: "#8B5CF6",
    description: "City of Alameda (island). All Alameda addresses attend Alameda Unified schools.",
    finderUrl: "https://www.alamedausd.net",
    finderLabel: "Alameda Unified Website",
  },
  {
    name: "Oakland Unified",
    census: "Oakland",
    color: "#D97706",
    description: "City of Oakland. School assignment within OUSD is highly address-specific — use the district's official interactive map for accurate assignment.",
    finderUrl: "https://ousd.maps.arcgis.com/apps/View/index.html?appid=e2d956e81eaf4a45b24b705e76b7871e",
    finderLabel: "OUSD School Finder Map →",
  },
  {
    name: "Walnut Creek Elementary",
    census: "Walnut Creek",
    color: "#059669",
    description: "Walnut Creek has 5 elementary schools with attendance zones by street. Enter your address below for an exact school assignment based on the district's official December 2025 street listing.",
    finderUrl: "https://www.walnutcreekschooldistrict.org",
    finderLabel: "Walnut Creek School District",
  },
  {
    name: "Orinda (Acalanes Union HS)",
    census: "Orinda",
    color: "#0891B2",
    description: "Orinda feeds into Miramonte High — Acalanes Union, one of California's top-ranked high school districts. Elementary is handled by the Orinda Union School District.",
    finderUrl: "https://www.acalanes.k12.ca.us",
    finderLabel: "Acalanes Union Website",
  },
  {
    name: "Lafayette (Acalanes Union HS)",
    census: "Lafayette",
    color: "#0E7490",
    description: "Lafayette feeds into Acalanes High — Acalanes Union, one of California's top-ranked high school districts. Elementary is handled by the Lafayette School District.",
    finderUrl: "https://www.acalanes.k12.ca.us",
    finderLabel: "Acalanes Union Website",
  },
  {
    name: "Moraga (Acalanes Union HS)",
    census: "Moraga",
    color: "#155E75",
    description: "Moraga feeds into Campolindo High — Acalanes Union, one of California's top-ranked high school districts. Elementary is handled by the Moraga School District.",
    finderUrl: "https://www.acalanes.k12.ca.us",
    finderLabel: "Acalanes Union Website",
  },
];

// ============================================================
// SCHOOLS DATA
// ============================================================
const schools: Record<string, Array<{name: string, district: string, rating: number, lat: number, lng: number, description: string}>> = {
  elementary: [
    { name: "Piedmont Elementary", district: "Piedmont Unified", rating: 10, lat: 37.8244, lng: -122.2330, description: "Top-ranked elementary in Piedmont Unified." },
    { name: "Beach Elementary", district: "Piedmont Unified", rating: 10, lat: 37.8228, lng: -122.2310, description: "Piedmont Unified elementary serving the heart of Piedmont." },
    { name: "Marin Elementary", district: "Albany Unified", rating: 9, lat: 37.8897, lng: -122.2977, description: "Albany Unified's top-rated elementary." },
    { name: "Cornell Elementary", district: "Albany Unified", rating: 9, lat: 37.8872, lng: -122.2999, description: "Strong academics and tight community feel." },
    { name: "Emerson Elementary", district: "Berkeley Unified", rating: 8, lat: 37.8596, lng: -122.2523, description: "Serves Berkeley's Elmwood and Claremont neighborhoods." },
    { name: "Thornhill Elementary", district: "Oakland Unified", rating: 8, lat: 37.8178, lng: -122.2105, description: "Oakland Hills elementary serving Montclair." },
    { name: "Montclair Elementary", district: "Oakland Unified", rating: 7, lat: 37.8215, lng: -122.2150, description: "Montclair neighborhood elementary." },
    { name: "Crocker Highlands Elementary", district: "Oakland Unified", rating: 8, lat: 37.8118, lng: -122.2218, description: "Serves Crocker Highlands and Grand Lake." },
    { name: "Rockridge/Peralta Elementary", district: "Oakland Unified", rating: 7, lat: 37.8376, lng: -122.2524, description: "Serves the Rockridge neighborhood." },
    { name: "Edison Elementary", district: "Alameda Unified", rating: 8, lat: 37.7746, lng: -122.2580, description: "Alameda Unified elementary." },
    { name: "Sleepy Hollow Elementary", district: "Orinda Union", rating: 10, lat: 37.8793, lng: -122.1773, description: "Top-rated elementary in Orinda. Feeds into Acalanes Union." },
    { name: "Burton Valley Elementary", district: "Lafayette", rating: 10, lat: 37.8868, lng: -122.1185, description: "Lafayette elementary feeding into the Acalanes district." },
    { name: "Buena Vista Elementary", district: "Walnut Creek", rating: 8, lat: 37.8947, lng: -122.0502, description: "Serves eastern Walnut Creek neighborhoods." },
    { name: "Indian Valley Elementary", district: "Walnut Creek", rating: 8, lat: 37.8980, lng: -122.0350, description: "Serves the Indian Valley area of Walnut Creek." },
    { name: "Murwood Elementary", district: "Walnut Creek", rating: 9, lat: 37.9020, lng: -122.0600, description: "Serves central Walnut Creek. One of the district's highest-rated elementaries." },
    { name: "Parkmead Elementary", district: "Walnut Creek", rating: 9, lat: 37.8920, lng: -122.0680, description: "Serves the Parkmead neighborhood of Walnut Creek." },
    { name: "Walnut Heights Elementary", district: "Walnut Creek", rating: 9, lat: 37.8850, lng: -122.0480, description: "Serves Walnut Heights. Top-rated in the Walnut Creek district." },
  ],
  middle: [
    { name: "Piedmont Middle School", district: "Piedmont Unified", rating: 10, lat: 37.8236, lng: -122.2285, description: "Exceptional middle school. Direct feeder to Piedmont High." },
    { name: "Albany Middle School", district: "Albany Unified", rating: 9, lat: 37.8869, lng: -122.2988, description: "Albany Unified's sole middle school — tight-knit and high-performing." },
    { name: "Claremont Middle School", district: "Berkeley Unified", rating: 8, lat: 37.8574, lng: -122.2496, description: "Serves Berkeley Hills and Elmwood." },
    { name: "Montera Middle School", district: "Oakland Unified", rating: 7, lat: 37.8198, lng: -122.2089, description: "Serves Montclair and the Oakland Hills." },
    { name: "Edna Brewer Middle School", district: "Oakland Unified", rating: 7, lat: 37.8298, lng: -122.2398, description: "Serves Rockridge and Temescal." },
    { name: "Lincoln Middle School", district: "Alameda Unified", rating: 8, lat: 37.7731, lng: -122.2521, description: "Alameda Unified middle school." },
    { name: "Orinda Intermediate", district: "Acalanes Union", rating: 10, lat: 37.8776, lng: -122.1796, description: "Feeds directly into Miramonte High." },
    { name: "Stanley Middle School", district: "Lafayette", rating: 10, lat: 37.8833, lng: -122.1229, description: "Highly regarded Lafayette middle school." },
    { name: "Walnut Creek Intermediate (WCI)", district: "Walnut Creek", rating: 9, lat: 37.8960, lng: -122.0580, description: "All Walnut Creek Elementary District students attend WCI for middle school." },
  ],
  high: [
    { name: "Piedmont High School", district: "Piedmont Unified", rating: 10, lat: 37.8222, lng: -122.2267, description: "Top 1–2% of California public high schools. The single strongest argument for buying in Piedmont." },
    { name: "Albany High School", district: "Albany Unified", rating: 9, lat: 37.8863, lng: -122.2979, description: "Consistently high-performing. Albany USD's crown jewel." },
    { name: "Berkeley High School", district: "Berkeley Unified", rating: 8, lat: 37.8694, lng: -122.2686, description: "One of California's most distinctive public high schools. Broadest course catalog in the region." },
    { name: "Skyline High School", district: "Oakland Unified", rating: 7, lat: 37.8089, lng: -122.1923, description: "Serves the Oakland Hills. OUSD's highest-rated comprehensive high school." },
    { name: "Alameda High School", district: "Alameda Unified", rating: 8, lat: 37.7697, lng: -122.2428, description: "Well-regarded Alameda Unified high school." },
    { name: "Encinal High School", district: "Alameda Unified", rating: 7, lat: 37.7741, lng: -122.2609, description: "Alameda's second high school." },
    { name: "Miramonte High School", district: "Acalanes Union", rating: 10, lat: 37.8788, lng: -122.1742, description: "Orinda's premier high school in the Acalanes district." },
    { name: "Campolindo High School", district: "Acalanes Union", rating: 10, lat: 37.8927, lng: -122.1156, description: "Moraga's high school in the Acalanes district." },
    { name: "Acalanes High School", district: "Acalanes Union", rating: 10, lat: 37.8947, lng: -122.1218, description: "Lafayette's high school. Top college preparation in the region." },
    { name: "Las Lomas High School", district: "Acalanes Union", rating: 9, lat: 37.9109, lng: -122.0618, description: "Walnut Creek's Acalanes district high school." },
    { name: "Northgate High School", district: "Mount Diablo Unified", rating: 8, lat: 37.9150, lng: -122.0480, description: "Serves northern Walnut Creek and Concord." },
  ]
};

const levelColors: Record<string, string> = {
  elementary: "#B22222",
  middle: "#2255B2",
  high: "#228B22"
};

const levelLabels: Record<string, string> = {
  elementary: "Elementary Schools",
  middle: "Middle Schools",
  high: "High Schools"
};

type LatLng = { lat: number; lng: number };

// Convert one GeoJSON ring ([lng, lat] pairs) to Google Maps {lat, lng} points.
function ringToPath(ring: number[][]): LatLng[] {
  return ring.map(([lng, lat]) => ({ lat, lng }));
}

// Convert a GeoJSON Polygon or MultiPolygon into an array of rings (paths).
function geometryToPaths(geom: any): LatLng[][] {
  if (!geom) return [];
  if (geom.type === "Polygon") return geom.coordinates.map(ringToPath);
  if (geom.type === "MultiPolygon") return geom.coordinates.flat().map(ringToPath);
  return [];
}

// Ray-casting point-in-ring test.
function pointInRing(lat: number, lng: number, ring: LatLng[]) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i].lng, yi = ring[i].lat;
    const xj = ring[j].lng, yj = ring[j].lat;
    const intersect = ((yi > lat) !== (yj > lat)) && (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Even-odd across all rings: islands count as inside, holes as outside.
function pointInPaths(lat: number, lng: number, paths: LatLng[][]) {
  let inside = false;
  for (const ring of paths) {
    if (pointInRing(lat, lng, ring)) inside = !inside;
  }
  return inside;
}

function findDistrict(lat: number, lng: number, districts: any[]) {
  for (const district of districts) {
    if (district.paths && pointInPaths(lat, lng, district.paths)) return district;
  }
  return null;
}

function getRatingColor(rating: number) {
  if (rating >= 9) return "#228B22";
  if (rating >= 7) return "#B8860B";
  return "#B22222";
}

export default function SchoolMap() {
  const [activeLevel, setActiveLevel] = useState<"elementary" | "middle" | "high">("high");
  const [selectedSchool, setSelectedSchool] = useState<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
  const [address, setAddress] = useState("");
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const polygonsRef = useRef<any[]>([]);
  const geocoderRef = useRef<any>(null);
  const [districts, setDistricts] = useState<any[]>([]);
  const districtsRef = useRef<any[]>([]);

  useEffect(() => {
    if ((window as any).google) { initMap(); return; }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current) updateMarkers();
  }, [activeLevel]);

  // Fetch real city/district boundary polygons from the US Census TIGERweb API.
  // Layer 4 = Incorporated Places; BASENAME is the clean city name (the NAME
  // field carries a legal suffix, e.g. "Berkeley city").
  useEffect(() => {
    const where = `STATE='06' AND BASENAME IN (${districtMeta.map(m => `'${m.census}'`).join(",")})`;
    const url =
      "https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/Places_CouSub_ConCity_SubMCD/MapServer/4/query" +
      `?where=${encodeURIComponent(where)}&outFields=BASENAME&f=geojson&outSR=4326`;
    fetch(url)
      .then(r => r.json())
      .then(geo => {
        const pathsByCity: Record<string, LatLng[][]> = {};
        (geo.features || []).forEach((f: any) => {
          pathsByCity[f.properties.BASENAME] = geometryToPaths(f.geometry);
        });
        const merged = districtMeta
          .map(m => ({ ...m, paths: pathsByCity[m.census] }))
          .filter(d => d.paths && d.paths.length > 0);
        districtsRef.current = merged;
        setDistricts(merged);
        if (mapInstanceRef.current) drawDistrictBoundaries();
      })
      .catch(() => { /* network/API failure: map still renders without boundary overlays */ });
  }, []);

  function initMap() {
    if (!mapRef.current) return;
    mapInstanceRef.current = new (window as any).google.maps.Map(mapRef.current, {
      center: { lat: 37.845, lng: -122.18 },
      zoom: 11,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });
    geocoderRef.current = new (window as any).google.maps.Geocoder();
    drawDistrictBoundaries();
    updateMarkers();
  }

  function drawDistrictBoundaries() {
    polygonsRef.current.forEach(p => p.setMap(null));
    polygonsRef.current = [];
    districtsRef.current.forEach(district => {
      const polygon = new (window as any).google.maps.Polygon({
        paths: district.paths,
        strokeColor: district.color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: district.color,
        fillOpacity: 0.12,
        map: mapInstanceRef.current,
      });
      polygon.addListener("click", () => { setSelectedDistrict(district); setSelectedSchool(null); });
      polygonsRef.current.push(polygon);
    });
  }

  function updateMarkers() {
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];
    const currentSchools = schools[activeLevel];
    const color = levelColors[activeLevel];
    currentSchools.forEach(school => {
      const marker = new (window as any).google.maps.Marker({
        position: { lat: school.lat, lng: school.lng },
        map: mapInstanceRef.current,
        title: school.name,
        icon: {
          path: (window as any).google.maps.SymbolPath.CIRCLE,
          scale: 11,
          fillColor: color,
          fillOpacity: 0.95,
          strokeColor: "#fff",
          strokeWeight: 2,
        },
        label: { text: school.rating.toString(), color: "#fff", fontSize: "10px", fontWeight: "bold" }
      });
      marker.addListener("click", () => { setSelectedSchool(school); setSelectedDistrict(null); });
      markersRef.current.push(marker);
    });
  }

  async function lookupAddress() {
    if (!address.trim() || !geocoderRef.current) return;
    setLoading(true);
    setReport(null);

    geocoderRef.current.geocode({ address: `${address}, CA` }, (results: any, status: any) => {
      setLoading(false);
      if (status !== "OK" || !results[0]) {
        setReport({ error: "Address not found. Try a full address like '123 Main St, Walnut Creek CA'." });
        return;
      }

      const loc = results[0].geometry.location;
      const lat = loc.lat();
      const lng = loc.lng();
      const formattedAddress = results[0].formatted_address;

      mapInstanceRef.current.panTo({ lat, lng });
      mapInstanceRef.current.setZoom(15);

      // LaMorinda high school lookup by city
      const addrLower = formattedAddress.toLowerCase();
      const lamorindaHS = addrLower.includes("orinda") ? 
        { name: "Miramonte High School", rating: 10, description: "Orinda's premier high school. Acalanes Union is one of California's top public school districts.", finderUrl: "https://www.acalanes.k12.ca.us" } :
        addrLower.includes("moraga") ?
        { name: "Campolindo High School", rating: 10, description: "Moraga's high school in the Acalanes district. Exceptional academics and strong community.", finderUrl: "https://www.acalanes.k12.ca.us" } :
        addrLower.includes("lafayette") ?
        { name: "Acalanes High School", rating: 10, description: "Lafayette's high school. Consistently one of California's top schools for college preparation.", finderUrl: "https://www.acalanes.k12.ca.us" } :
        null;

      // Check if it's a Walnut Creek address
      const isWalnutCreek = addrLower.includes("walnut creek");
      
      if (isWalnutCreek) {
        // Parse street number and name from address
        const match = formattedAddress.match(/^(\d+)\s+(.+?),/);
        if (match) {
          const houseNum = parseInt(match[1]);
          const streetName = match[2].trim();
          const schoolCode = lookupWCStreet(streetName, houseNum);
          
          if (schoolCode && wcSchoolNames[schoolCode]) {
            setReport({
              address: formattedAddress,
              type: "walnut_creek",
              elementary: {
                name: wcSchoolNames[schoolCode],
                code: schoolCode,
                rating: wcSchoolRatings[schoolCode],
                description: wcSchoolDescriptions[schoolCode],
              },
              middle: { name: "Walnut Creek Intermediate (WCI)", rating: 9, description: "All Walnut Creek Elementary District students attend WCI for middle school." },
              high: { name: "Las Lomas High School", rating: 9, description: "Most Walnut Creek addresses feed into Las Lomas High (Acalanes Union). Northern Walnut Creek may feed into Northgate (Mt. Diablo Unified). Verify with Acalanes district.", finderUrl: "https://www.acalanes.k12.ca.us" },
            });
            return;
          }
        }
      }

      // For all other addresses, use district polygon lookup
      const district = findDistrict(lat, lng, districtsRef.current);
      setReport({ address: formattedAddress, type: "district", district });
    });
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "900px", margin: "0 auto", padding: "0 16px" }}>
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "28px", fontWeight: 400, color: "#1A1A1A", marginBottom: "8px" }}>
        East Bay School Explorer
      </h2>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "8px", lineHeight: 1.6 }}>
        Colored zones show approximate school district boundaries. Numbers on markers show GreatSchools ratings (1–10). Click any zone or marker for details. Enter a Walnut Creek address for an exact elementary school assignment.
      </p>
      <p style={{ fontSize: "11px", color: "#aaa", marginBottom: "20px" }}>
        ⚠️ District boundaries shown are approximate and for general reference only. Walnut Creek elementary assignments are sourced from the district's official December 2025 street listing. Always verify with the district before purchasing.
      </p>

      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "16px" }}>
        {districts.map(d => (
          <div key={d.name} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#555" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "2px", background: d.color, opacity: 0.8 }} />
            {d.name}
          </div>
        ))}
      </div>

      {/* Level Tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {(["elementary", "middle", "high"] as const).map(level => (
          <button key={level} onClick={() => { setActiveLevel(level); setSelectedSchool(null); }}
            style={{
              padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer",
              fontSize: "13px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase",
              background: activeLevel === level ? levelColors[level] : "#F0F0F0",
              color: activeLevel === level ? "#fff" : "#555",
            }}>
            {levelLabels[level]}
          </button>
        ))}
      </div>

      {/* Map */}
      <div ref={mapRef} style={{ width: "100%", height: "500px", borderRadius: "8px", border: "1px solid #EBEBEB", marginBottom: "16px" }} />

      {/* Selected School Info */}
      {selectedSchool && (
        <div style={{ background: "#FAFAFA", border: `2px solid ${levelColors[activeLevel]}`, borderRadius: "8px", padding: "16px 20px", marginBottom: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}>{selectedSchool.name}</h3>
              <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#888", textTransform: "uppercase", letterSpacing: "0.1em" }}>{selectedSchool.district}</p>
              <p style={{ margin: 0, fontSize: "13px", color: "#555", lineHeight: 1.6 }}>{selectedSchool.description}</p>
            </div>
            <div style={{ textAlign: "center", minWidth: "60px", marginLeft: "16px" }}>
              <div style={{ fontSize: "32px", fontWeight: 700, color: getRatingColor(selectedSchool.rating), lineHeight: 1 }}>{selectedSchool.rating}</div>
              <div style={{ fontSize: "10px", color: "#999", textTransform: "uppercase", letterSpacing: "0.1em" }}>GreatSchools</div>
            </div>
          </div>
        </div>
      )}

      {/* Selected District Info */}
      {selectedDistrict && !selectedSchool && (
        <div style={{ background: "#FAFAFA", border: `2px solid ${selectedDistrict.color}`, borderRadius: "8px", padding: "16px 20px", marginBottom: "16px" }}>
          <h3 style={{ margin: "0 0 8px 0", fontSize: "18px", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, color: selectedDistrict.color }}>{selectedDistrict.name}</h3>
          <p style={{ margin: "0 0 12px 0", fontSize: "13px", color: "#555", lineHeight: 1.6 }}>{selectedDistrict.description}</p>
          <a href={selectedDistrict.finderUrl} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-block", padding: "8px 16px", background: selectedDistrict.color, color: "#fff", borderRadius: "4px", fontSize: "12px", fontWeight: 600, textDecoration: "none", letterSpacing: "0.05em", textTransform: "uppercase" }}>
            {selectedDistrict.finderLabel}
          </a>
        </div>
      )}

      {/* Address Lookup */}
      <div style={{ background: "#fff", border: "1px solid #EBEBEB", borderRadius: "8px", padding: "20px", marginTop: "8px" }}>
        <h3 style={{ margin: "0 0 4px 0", fontSize: "16px", fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}>Find Your School</h3>
        <p style={{ margin: "0 0 12px 0", fontSize: "13px", color: "#888" }}>
          Enter a Walnut Creek address for an exact elementary school assignment. For other cities, we'll show you which district you're in and link to their official finder.
        </p>
        <div style={{ display: "flex", gap: "8px" }}>
          <input type="text" value={address} onChange={e => setAddress(e.target.value)}
            onKeyDown={e => e.key === "Enter" && lookupAddress()}
            placeholder="e.g. 1234 Parkside Dr, Walnut Creek CA"
            style={{ flex: 1, padding: "10px 14px", border: "1px solid #EBEBEB", borderRadius: "4px", fontSize: "14px", outline: "none" }} />
          <button onClick={lookupAddress} disabled={loading}
            style={{ padding: "10px 20px", background: "#B22222", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "13px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            {loading ? "Looking up..." : "Look Up"}
          </button>
        </div>

        {report && (
          <div style={{ marginTop: "16px" }}>
            {report.error ? (
              <p style={{ color: "#B22222", fontSize: "13px" }}>{report.error}</p>
            ) : report.type === "walnut_creek" ? (
              <div>
                <p style={{ fontSize: "12px", color: "#888", margin: "0 0 12px 0" }}>Results for: <strong>{report.address}</strong></p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                  {/* Elementary */}
                  <div style={{ background: "#FAFAFA", border: "2px solid #B22222", borderRadius: "6px", padding: "12px" }}>
                    <div style={{ fontSize: "10px", color: "#B22222", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>Elementary</div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "#1A1A1A", marginBottom: "4px" }}>{report.elementary.name}</div>
                    <div style={{ fontSize: "11px", color: "#888", marginBottom: "6px" }}>Walnut Creek School District</div>
                    <div style={{ fontSize: "20px", fontWeight: 700, color: getRatingColor(report.elementary.rating) }}>{report.elementary.rating}<span style={{ fontSize: "11px", color: "#aaa", fontWeight: 400 }}>/10</span></div>
                  </div>
                  {/* Middle */}
                  <div style={{ background: "#FAFAFA", border: "2px solid #2255B2", borderRadius: "6px", padding: "12px" }}>
                    <div style={{ fontSize: "10px", color: "#2255B2", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>Middle School</div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "#1A1A1A", marginBottom: "4px" }}>{report.middle.name}</div>
                    <div style={{ fontSize: "11px", color: "#888", marginBottom: "6px" }}>Walnut Creek School District</div>
                    <div style={{ fontSize: "20px", fontWeight: 700, color: getRatingColor(report.middle.rating) }}>{report.middle.rating}<span style={{ fontSize: "11px", color: "#aaa", fontWeight: 400 }}>/10</span></div>
                  </div>
                  {/* High */}
                  <div style={{ background: "#FAFAFA", border: "2px solid #228B22", borderRadius: "6px", padding: "12px" }}>
                    <div style={{ fontSize: "10px", color: "#228B22", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>High School</div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#1A1A1A", marginBottom: "4px" }}>{report.high.name}</div>
                    <div style={{ fontSize: "11px", color: "#888", marginBottom: "6px" }}>Mount Diablo Unified</div>
                    <a href={report.high.finderUrl} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: "11px", color: "#228B22", textDecoration: "none", fontWeight: 600 }}>Verify assignment →</a>
                  </div>
                </div>
              </div>
            ) : report.district ? (
              <div>
                <p style={{ fontSize: "12px", color: "#888", margin: "0 0 12px 0" }}>Results for: <strong>{report.address}</strong></p>
                <div style={{ background: "#FAFAFA", border: `2px solid ${report.district.color}`, borderRadius: "8px", padding: "16px 20px" }}>
                  <h4 style={{ margin: "0 0 6px 0", fontSize: "16px", color: report.district.color }}>{report.district.name}</h4>
                  <p style={{ margin: "0 0 12px 0", fontSize: "13px", color: "#555", lineHeight: 1.6 }}>{report.district.description}</p>
                  <a href={report.district.finderUrl} target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-block", padding: "8px 16px", background: report.district.color, color: "#fff", borderRadius: "4px", fontSize: "12px", fontWeight: 600, textDecoration: "none", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    {report.district.finderLabel}
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: "12px", color: "#888", margin: "0 0 8px 0" }}>Results for: <strong>{report.address}</strong></p>
                <p style={{ fontSize: "13px", color: "#555" }}>This address falls outside our mapped district boundaries. Contact the relevant school district directly for enrollment information.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
