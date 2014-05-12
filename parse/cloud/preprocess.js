/* Copyright (C) 2014 Demokratiappen.
 *
 * This file is part of Demokratiappen.
 *
 * Demokratiappen is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Demokratiappen is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Demokratiappen.  If not, see <http://www.gnu.org/licenses/>.
 */

// Require paths are relative to root path of parse (but only code in cloud
// can be used).

// -----------------------------------------------------------------------
function expandParties( text ) {
  var parties = [
    //     Must escape parentheses in keys since we use regular expressions :)
    //     And for simplicity add the rexex's parenthesis around the actual key

    // Riksdagspartier
    { key: '(\\(S\\))',     value: '(Socialdemokraterna)' }, 
    { key: '(\\(M\\))',     value: '(Moderaterna)' }, 
    { key: '(\\(MP\\))',    value: '(Miljöpartiet)' }, 
    { key: '(\\(FP\\))',    value: '(Folkpartiet)' }, 
    { key: '(\\(C\\))',     value: '(Centerpartiet)' }, 
    { key: '(\\(SD\\))',    value: '(Sverigedemokraterna)' }, 
    { key: '(\\(V\\))',     value: '(Vänsterpartiet)' }, 
    { key: '(\\(KD\\))',    value: '(Kristdemokraterna)' }, 

    // Andra stora partier
    { key: '(\\(PP\\))',    value: '(Piratpartiet)' },
    { key: '(\\(JL\\))',    value: '(Junilistan)' },
    { key: '(\\(FI\\))',    value: '(Feministiskt initiativ)' }, 
    { key: '(\\(F!\\))',    value: '(Feministiskt initiativ)' },

    // Övriga partier som kondiderar till riksdagen (och som har förkortningar)
    { key: '(\\(ALP\\))',   value: '(Allianspartiet/Medborgarens röst)' }, // Arlöv
    { key: '(\\(ENH\\))',   value: '(Enhet)' }, // Skokloster
    { key: '(\\(EAP\\))',   value: '(Europeiska Arbetarpartiet)' }, // Hägersten
    { key: '(\\(K\\))',     value: '(Kommunistiska Partiet)' }, // Göteborg
    { key: '(\\(LBPO\\))',  value: '(Landsbygdspartiet Oberoende)' }, // Knutby
    { key: '(\\(ND\\))',    value: '(Nationaldemokraterna)' }, // Stockholm
    { key: '(\\(NorrS\\))', value: '(Norrländska Samlingspartiet)' }, // Östersund
    { key: '(\\(NYF\\))',   value: '(Ny Framtid)' }, // Hultsfred
    { key: '(\\(Riksh\\))', value: '(Rikshushållarna)' }, // Nynäshamn
    { key: '(\\(RS\\))',    value: '(Rättvisepartiet Socialisterna)' }, // Farsta
    { key: '(\\(SJP\\))',   value: '(Sjöbopartiet)' }, // Lövestad
    { key: '(\\(Sref\\))',  value: '(Skattereformisterna)' }, // Lidingö
    { key: '(\\(SKÅ\\))',   value: '(Skånepartiet)' }, // Svedala
    { key: '(\\(SOC.P\\))', value: '(Socialistiska Partiet)' }, // Johanneshov
    { key: '(\\(SPI\\))',   value: '(SPI Välfärden)' }, // Halmstad
    { key: '(\\(SVP\\))',   value: '(Svenskarnas parti)' }, // Stockholm
    { key: '(\\(VägV\\))',  value: '(Vägvalet)' } // Hisings Backa
  ];
  
  for( var i = 0; i < parties.length; ++i ) {
    // g: Global, ersätt alla förekonster (behöver vi egentligen inte för taggningen)
    // i: Case insensitive
    text = text.replace( new RegExp(parties[i].key, 'gi'), parties[i].value );
  }

  return text;
}  // expandParties

// -----------------------------------------------------------------------


exports.expandParties = expandParties;
