/*
* Copyright (c) 2011 piluke <pikingqwerty@gmail.com>
* You can find the GitHub repository at https://github.com/piluke/GameMaker-HTML5-Player
* 
* This file is part of GameMaker HTML5 Player (GHP).
* GHP is free software and comes with ABSOLUTELY NO WARANTY.
* See LICENSE for more details.
*/

//If mobile
if (navigator.userAgent.match(/(alcatel|amoi|android|avantgo|blackberry|benq|cell|cricket|docomo|elaine|htc|iemobile|iphone|ipad|ipaq|ipod|j2me|java|midp|mini|mmp|mobi|motorola|nec-|nokia|palm|panasonic|philips|phone|sagem|sharp|sie-|smartphone|sony|symbian|t-mobile|telus|up\.browser|up\.link|vodafone|wap|webos|wireless|xda|xoom|zte)/i))
{
	throw "No debugging for mobile.";
}

var de = document.createElement("div");
de.setAttribute("id", "de");
de.setAttribute("style", "border: 3px solid black; border-radius: 4px; background: #336699; position: fixed; top: 9px; left: 10px;");
de.style.width = (document.getElementById("maincan").width/2)+"px";
de.style.height = document.getElementById("maincan").height+"px";
document.body.appendChild(de);
load();
var rs = false;
var mv = false;

function clear()
{
	if ((arguments.length > 0)&&(arguments[0] == undefined))
	{
		return false;
	}
	ce.value = "";
	return true;
}
function help()
{
	if (arguments.length == 0)
	{
		print("Use this to debug your application.\n");
		print("Make sure to disable this in GHPC\n  or by deleting the inclusing tag.\n");
		print("Keeping it may make your site\n  vulnerable to cross-site scripting.\n");
		print("Use help(\"f\") for function list.\n");
	}
	else if (arguments[0] == undefined)
	{
		return false;
	}
	else if (arguments[0].indexOf("f") >= 0)
	{
		print("Functions:\n");
		print("  help() - shows this help\n");
		print("  clear() - clears this box\n");
		print("  print(str) - prints the given string\n");
		print("  eval(str) - evalutes Javascript contained in the given string\n");
		print("Execute any other valid Javascript.");
	}
	return true;
}
function print(s)
{
	ce.value += s;
	ce.scrollTop = ce.scrollHeight;
}
function rnm(e)
{
	if (e != undefined)
	{
		if (rs)
		{
			de.style.width = e.pageX-de.offsetLeft+"px";
			de.style.height = e.pageY-de.offsetTop+"px";
		}
		else if (mv)
		{
			de.style.left = e.pageX+dx-x+"px";
			de.style.top = e.pageY+dy-y+"px";
		}
		ce.setAttribute("cols", ""+Math.round(de.style.width.substring(0, de.style.width.length-2)/5*4/8));
		ce.setAttribute("rows", ""+Math.round((de.style.height.substring(0, de.style.height.length-2)-25)/18));
		te.style.width = Math.round(de.style.width.substring(0, de.style.width.length-2)/5*4)+"px";
		me.style.width = de.style.width;
	}
}
function resize(e)
{
	if (e != undefined)
	{
		mv = false;
		rs = !rs;
	}
}
function move(e)
{
	if (e != undefined)
	{
		rs = false;
		mv = !mv;
		x = e.pageX;
		y = e.pageY;
		dx = parseInt(de.style.left);
		dy = parseInt(de.style.top);
	}
}
function ots(t)
{
	var str = "";
	for (var i=0;i<t.length;i++)
	{
		while (t.hasOwnProperty(i))
		{
			str += "	"+p+t[p]+"\n";
		}
	}
	return str;
}
function teChange(t)
{
	if (t.value === "")
	{
		print("\""+t.value.toString()+"\" is not defined.\n");
		te.value = "";
		return;
	}
	else if (!isDefined(t.value))
	{
		try
		{
			if (t.value.toString().indexOf("=") > 0)
			{
				print(t.value.toString()+"\n");
				eval(t.value);
			}
			else if (t.value.toString().indexOf("(") > 0)
			{
				eval(t.value);
			}
			else
			{
				try
				{
					if (eval(t.value+"(undefined)").toString().length = 0)
					{
						print(eval(t.value))+"\n";
					}
					else
					{
						eval(t.value+"()");
					}
				}
				catch (err)
				{
					print(t.value.toString()+" = "+eval(t.value)+"\n");
				}
			}
		}
		catch (err)
		{
			print("\""+t.value.toString()+"\" is not defined.\n");
		}
	}
	else
	{
		if (typeof t.value === "undefined")
		{
			ce += "Undefined\n";
			return;
		}
		else
		{
			temp = eval(t.value);
		}
		if (typeof temp === "object")
		{
			print(Object.prototype.toString.call(temp)+"\n");
			print(ots(temp));
		}
		else if (typeof temp === null)
		{
			print("Null\n");
		}
		else if (typeof temp === "undefined")
		{
			print("Undefined\n");
		}
		else
		{
			print(temp+"\n");
		}
	}
	te.value = "";
}
function save()
{
	localStorage.deX = de.style.left;
	localStorage.deY = de.style.top;
	localStorage.deWidth = de.style.width;
	localStorage.deHeight = de.style.height;
}
function load()
{
	if (localStorage.deX)
	{
		de.style.left = localStorage.deX;
	}
	if (localStorage.deY)
	{
		de.style.top = localStorage.deY;
	}
	if (localStorage.deWidth)
	{
		de.style.width = localStorage.deWidth;
	}
	if (localStorage.deHeight)
	{
		de.style.height = localStorage.deHeight;
	}
}

var ce = document.createElement("textarea");
ce.setAttribute("cols", ""+Math.round(de.style.width.substring(0, de.style.width.length-2)/5*4/8));
ce.setAttribute("rows", ""+Math.round((de.style.height.substring(0, de.style.height.length-2)-25)/18));
ce.setAttribute("readonly", "readonly");
ce.setAttribute("wrap", "off");
ce.setAttribute("style", "border: 1px solid black; background: #FFFFD0; position: absolute; top: 5px; left: 5px; resize: none;");
de.appendChild(ce);
var te = document.createElement("input");
te.setAttribute("type", "text");
te.setAttribute("name", "query");
te.setAttribute("autocomplete", "off");
te.setAttribute("onchange", "teChange(this);");
te.setAttribute("style", "border: 1px solid black; background: #FFFFD0; position: absolute; bottom: 5px; left: 5px;");
te.style.width = Math.round(de.style.width.substring(0, de.style.width.length-2)/5*4)+"px";
de.appendChild(te);
var me = document.createElement("div");
me.setAttribute("style", "margin: 0px; border: 0px; border-radius: 4px; padding: 0px; height: 5px; position: absolute; top: 0px; left: 0px; background: black; cursor: move;");
me.style.width = de.style.width;
me.setAttribute("onmousedown", "move(event)");
de.appendChild(me);
var he = document.createElement("div");
he.setAttribute("style", "margin: 0px; border: 0px; padding: 0px; width: 10px; height: 10px; position: absolute; bottom: 0px; right: 0px; background: black; cursor: se-resize;");
he.setAttribute("onmousedown", "resize(event)");
de.appendChild(he);
document.onmousemove = rnm;
window.onunload = save;
