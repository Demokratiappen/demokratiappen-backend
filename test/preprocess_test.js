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

var assert = require("assert")

var preprocess = require('../parse/cloud/preprocess');

// Grundläggande funktionalitet
describe('Preprocess', function(){
  describe('expandParties()', function(){
    it('should replace party signature with party name', function(){
      // Lite oklart, men unit.js verkar vilja ha actual först, och expected sist
      assert.equal(preprocess.expandParties('Lite text med (FP) etc'), 
                                            'Lite text med (Folkpartiet) etc');
    })
  })
})

// Grundläggande funktionalitet, inte skilja på stora och små bokstäver.
describe('Preprocess', function(){
  describe('expandParties()', function(){
    it('should replace party signature with party name (case insensitive', function(){
      assert.equal(preprocess.expandParties('Lite text med (fp) etc'), 
                                           'Lite text med (Folkpartiet) etc');
    })
  })
})
// Parti med konstig beteckning
describe('Preprocess', function(){
  describe('expandParties()', function(){
    it('should replace (odd) party signature with party name', function(){
      assert.equal(preprocess.expandParties('Lite text med (F!) etc'), 
                                            'Lite text med (Feministiskt initiativ) etc');
    })
  })
})
// Första partiet [Intern kunskap om listan i funktionen]
describe('Preprocess', function(){
  describe('expandParties()', function(){
    it('should replace first party signature in list with party name', function(){
      assert.equal(preprocess.expandParties('Lite text med (S) etc'), 
                                            'Lite text med (Socialdemokraterna) etc');
    })
  })
})
// Sista partiet [Intern kunskap om listan i funktionen]
describe('Preprocess', function(){
  describe('expandParties()', function(){
    it('should replace last party signature in list with party name', function(){
      assert.equal(preprocess.expandParties('Lite text med (VägV) etc'), 
                                            'Lite text med (Vägvalet) etc');
    })
  })
})
// Flera partier flera gånger
describe('Preprocess', function(){
  describe('expandParties()', function(){
    it('should replace several party signature with party names', function(){
      assert.equal(preprocess.expandParties('Lite text med (MP), (C) och (PP), sen tillkommer (C)'), 
                                            'Lite text med (Miljöpartiet), (Centerpartiet) och (Piratpartiet), sen tillkommer (Centerpartiet)');
    })
  })
})
